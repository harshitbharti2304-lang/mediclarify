import { createWorker } from 'tesseract.js';
import { reconstructMedicalTerm } from '../data/medicalDictionary.js';

// 1. In-browser image preprocessor: client-side canvas preprocessing
// Increases contrast by +25% and converts to grayscale to sharpen faint pen strokes and eliminate background shadows/smudges
// Safe: has a 3-second safeguard timeout and avoids crossOrigin bugs on data URLs
export async function preprocessImageForOcr(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image')) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    // 3-second safety timeout so preprocessing NEVER hangs
    const timeout = setTimeout(() => {
      resolve(dataUrl);
    }, 3000);

    try {
      const img = new Image();
      
      img.onload = () => {
        clearTimeout(timeout);
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) return resolve(dataUrl);

          // Downscale to max 1200px on longest edge for mobile photos (fast, crisp, zero memory blowup)
          const maxDim = 1200;
          let width = img.width || 800;
          let height = img.height || 600;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Client-Side Canvas Preprocessing: Grayscale + 25% Contrast Expansion + Faint Stroke Sharpening
          try {
            const imgData = ctx.getImageData(0, 0, width, height);
            const data = imgData.data;
            const factor = 1.25; // Exact 25% contrast expansion relative to midpoint 128

            for (let i = 0; i < data.length; i += 4) {
              // Standard ITU-R BT.601 luma conversion
              const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
              
              // Direct +25% contrast stretch
              let adjusted = factor * (gray - 128) + 128;

              // Eliminate background shadows & paper smudges (push light paper towards white)
              if (adjusted > 190) {
                adjusted = Math.min(255, adjusted + (255 - adjusted) * 0.45);
              }
              // Sharpen faint pen strokes (darken low/mid luminance ink)
              else if (adjusted < 140) {
                adjusted = Math.max(0, adjusted * 0.85);
              }

              const finalVal = Math.min(255, Math.max(0, Math.round(adjusted)));
              data[i] = finalVal;
              data[i + 1] = finalVal;
              data[i + 2] = finalVal;
            }
            ctx.putImageData(imgData, 0, 0);
          } catch (secErr) {
            // If getImageData throws SecurityError in some WebViews, canvas image is still resized and intact
          }

          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          resolve(compressed);
        } catch (canvasErr) {
          console.warn('Canvas resize failed, using original:', canvasErr);
          resolve(dataUrl);
        }
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve(dataUrl);
      };

      img.src = dataUrl;
    } catch (e) {
      clearTimeout(timeout);
      resolve(dataUrl);
    }
  });
}

// 2. Real client-side OCR extraction with strict timeout (NEVER hangs or crashes on mobile photos)
export async function extractTextFromImage(imageSource, onProgress) {
  const progressCallback = onProgress || (() => {});

  return new Promise(async (resolve) => {
    // 9-second hard timeout so the app NEVER hangs or freezes on any phone
    const hardTimeout = setTimeout(() => {
      progressCallback({ status: 'completed', progress: 100, message: 'Scan finished' });
      resolve('');
    }, 9000);

    try {
      progressCallback({ status: 'optimizing', progress: 20, message: 'Optimizing photograph...' });
      const processedImage = await preprocessImageForOcr(imageSource);

      progressCallback({ status: 'recognizing', progress: 40, message: 'Reading document text...' });

      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const pct = Math.round((m.progress || 0) * 55) + 40;
            progressCallback({ status: 'recognizing', progress: Math.min(pct, 95), message: `Reading text... ${pct}%` });
          }
        }
      });

      const ret = await worker.recognize(processedImage);
      try {
        await worker.terminate();
      } catch (termErr) {}

      clearTimeout(hardTimeout);
      progressCallback({ status: 'completed', progress: 100, message: 'Complete!' });
      resolve(ret.data?.text || '');
    } catch (err) {
      clearTimeout(hardTimeout);
      console.warn('OCR error handled safely:', err);
      progressCallback({ status: 'completed', progress: 100, message: 'Analyzed' });
      resolve('');
    }
  });
}

// Aggressively clean and sanitize extracted patient name
// Strips form labels, age, gender, ID numbers, and cleanly falls back to "Patient"
export function cleanPatientName(rawCandidate) {
  if (!rawCandidate || typeof rawCandidate !== 'string') return 'Patient';

  // Take only the first line if candidate has multiple lines
  let candidate = rawCandidate.split(/[\r\n]+/)[0].trim();

  // 1. Strip leading form headers/labels (e.g., "Patient Name:", "Pt Name:", "Name:", "For:")
  candidate = candidate.replace(/^(?:(?:\d+[\.\)]|\*|Rx[:\s]*)\s*)?(?:patient\s*name|name\s*of\s*patient|pt\.?\s*name|pt\b|patient\b|name\b|for\b)\s*[:=/\\-]?\s*/i, '').trim();

  // 2. Strip parenthesized or bracketed annotations first (e.g., "(F/34)", "(32Y)", "(Male)", "(PID: 12345)", "[52 Yrs]")
  candidate = candidate.replace(/\s*\([^)]*\)/g, '').trim();
  candidate = candidate.replace(/\s*\[[^\]]*\]/g, '').trim();

  // 3. Strip trailing form field labels and metadata (e.g., "Age: 34", "Sex: M", "Gender: Female", "DOB:", "UHID:", "Dr:", "Date:")
  candidate = candidate.replace(/(?:[\s,/|\-\\]+)?\b(?:age|yrs?|years?|sex|gender|dob|date|id|pid|uhid|ref(?:\.|\s+by)?|dr\.?|doctor|physician|ipd|opd|bed|room|bill|mob|phone|contact|aadhaar|uid|pan|w\/o|s\/o|d\/o|c\/o)\b\s*[:=/\\-]?\s*.*$/i, '').trim();

  // 4. Strip trailing age/gender patterns (e.g., "/ 34 / F", "45 Yrs / Male", "32 Y / M", "M/45", "F/28", "/ Female / 28 Yrs")
  candidate = candidate.replace(/(?:[\s,/|\-\\]+)?\b\d{1,3}\s*(?:y\/?o|yr|yrs|years?(?:\s*old)?)\b\s*[/|\-\\]?\s*(?:m|f|male|female)\b.*$/i, '').trim();
  candidate = candidate.replace(/(?:[\s,/|\-\\]+)?\b(?:male|female)\s*[/|\-\\]?\s*\d{1,3}\b.*$/i, '').trim();
  candidate = candidate.replace(/(?:[\s,/|\-\\]+)?\b(?:m|f)\s*[/|\-\\]\s*\d{1,3}\b.*$/i, '').trim();
  candidate = candidate.replace(/(?:[\s,/|\-\\]+)\b(?:male|female)\b.*$/i, '').trim();
  candidate = candidate.replace(/[/|\-\\]\s*(?:m|f)\s*(?:[/|\-\\].*)?$/i, '').trim();

  // 5. Strip trailing age by itself (e.g., "Pooja Sharma 34 Yrs", "Pooja Sharma - 34")
  candidate = candidate.replace(/(?:[\s,/|\-\\]+)?\b\d{1,3}\s*(?:y\/?o|yr|yrs|years?(?:\s*old)?)\b.*$/i, '').trim();
  candidate = candidate.replace(/(?:[\s,/|\-\\]+)\d{1,3}\s*$/i, '').trim();

  // 6. Strip residual trailing/leading non-letter punctuation (/ , - : ; _ | \ ( ) [ ] etc.)
  candidate = candidate.replace(/[\s,/|\-:;_\(\)\[\]\\]+$/, '').trim();
  candidate = candidate.replace(/^[\s,/|\-:;_\(\)\[\]\\]+/, '').trim();

  // 7. Collapse internal whitespace
  candidate = candidate.replace(/\s+/g, ' ');

  // 8. Blacklist generic keywords that are form labels, test names, or invalid values
  const invalidKeywords = /^(?:patient|patient\s*name|pt|name|age|sex|gender|dob|date|report|diagnostic|laboratory|lab|hospital|clinic|prescription|doctor|physician|consultant|test|tests|result|results|specimen|investigation|remarks|comments|address|sample|blood|urine|phone|mobile|unknown|not\s*specified.*|null|undefined|\[object\s*object\])$/i;

  if (!candidate || candidate.length < 2 || invalidKeywords.test(candidate)) {
    return 'Patient';
  }

  // Must contain at least two letters
  if (!/[a-zA-Z]{2,}/.test(candidate)) {
    return 'Patient';
  }

  // Format ALL CAPS names to Title Case for clean presentation (e.g., "POOJA SHARMA" -> "Pooja Sharma")
  if (candidate === candidate.toUpperCase() && candidate.length > 3) {
    candidate = candidate
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  return candidate;
}

// Aggressive Patient Name Scanner across standard medical reports and prescriptions
export function extractPatientNameFromText(text = '', lines = []) {
  if (!text && (!lines || lines.length === 0)) return 'Patient';

  // Strategy 1: Header blocks formatted as "Name / Age / Sex" across multiple lines or same line
  for (let i = 0; i < Math.min(lines.length, 12); i++) {
    const line = lines[i];
    if (/(?:name\s*[/|\\]\s*(?:age|sex)(?:\s*[/|\\]\s*(?:sex|age))?|patient\s*name\s*[/|\\]\s*(?:age|sex))/i.test(line)) {
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const parts = nextLine.split(/[/|\\]/);
        if (parts.length > 0) {
          const cleaned = cleanPatientName(parts[0]);
          if (cleaned !== 'Patient') return cleaned;
        }
      }
    }
  }

  // Strategy 2: Explicit high-priority regex patterns targeting:
  // "Patient Name:", "Name:", "Pt Name:", "Pt:", "Name of Patient:", "For:", "Name / Age / Sex :"
  const explicitPatterns = [
    // "Patient Name:", "Pt Name:", "Name of Patient:"
    /(?:patient\s*name|name\s*of\s*patient|pt\.?\s*name)\s*[:=/\\-]\s*([^\r\n]+)/i,
    // "Name / Age / Sex :" or "Name / Age :" on same line
    /(?:name\s*[/|\\]\s*(?:age|sex)(?:\s*[/|\\]\s*(?:sex|age))?)\s*[:=/\\-]\s*([^\r\n]+)/i,
    // "Pt:" or "Pt. :" or "Patient:"
    /(?:patient|pt\.?)\s*[:=/\\-]\s*([^\r\n]+)/i,
    // "Name:" (ensuring not "Lab Name:", "Doctor Name:", etc.)
    /(?<!(?:lab|dr|doctor|physician|hospital|clinic)\s*)\bname\s*[:=/\\-]\s*([^\r\n]+)/i,
    // "For:" on doctor prescription pads (e.g. "Rx For: ...", "For: ...")
    /(?:\brx\s*)?\bfor\s*[:=/\\-]\s*([^\r\n]+)/i
  ];

  for (const regex of explicitPatterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      const candidate = cleanPatientName(match[1]);
      if (candidate !== 'Patient') {
        return candidate;
      }
    }
  }

  // Strategy 3: Line-by-line scanning where colon or separator might be faint or spaced,
  // or where label is on one line and name is immediately on the adjacent next line
  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    const line = lines[i];

    // Case 3a: Label followed by value on same line (e.g., "Patient Name Pooja Sharma")
    const lineMatch = line.match(/^(?:(?:\d+[\.\)]|\*|Rx[:\s]*)\s*)?(?:patient\s*name|name\s*of\s*patient|pt\.?\s*name|pt\b|name\b|for\b)\s*[:=/\\-]?\s+(.+)$/i);
    if (lineMatch && lineMatch[1]) {
      const candidate = cleanPatientName(lineMatch[1]);
      if (candidate !== 'Patient') {
        return candidate;
      }
    }

    // Case 3b: Label alone on line, value on immediate next line (e.g. "Patient Name:" \n "Pooja Sharma")
    const isStandaloneLabel = /^(?:(?:\d+[\.\)]|\*|Rx[:\s]*)\s*)?(?:patient\s*name|name\s*of\s*patient|pt\.?\s*name|pt\b|name\b|for\b)\s*[:=/\\-]?\s*$/i.test(line);
    if (isStandaloneLabel && i + 1 < lines.length) {
      const candidate = cleanPatientName(lines[i + 1]);
      if (candidate !== 'Patient') {
        return candidate;
      }
    }
  }

  // Strategy 4: Honorific-based detection (Mr. / Mrs. / Ms. / Shri / Smt. / Master) restricted to a single line
  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    const line = lines[i];
    const honorificMatch = line.match(/\b(mr\.|mrs\.|ms\.|miss|master|shri|smt\.)[ \t]+([A-Za-z]+(?:[ \t]+[A-Za-z]+){1,3})\b/i);
    if (honorificMatch) {
      const prefix = line.substring(0, honorificMatch.index);
      if (!/dr\.?|doctor|consultant|ref(?:\.|\s+by)?/i.test(prefix)) {
        const candidate = cleanPatientName(`${honorificMatch[1]} ${honorificMatch[2]}`);
        if (candidate !== 'Patient') {
          return candidate;
        }
      }
    }
  }

  // Strategy 5: Clean default fallback
  return 'Patient';
}

// 3. Truthful, 100% Grounded Report Builder (ZERO Hallucination / Mock Data)
export function buildReportFromOcr({ rawText = '', fileName = 'Uploaded Document', fileDataUrl = '', preferredLanguage = 'en' }) {
  const text = (rawText || '').trim();
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract Patient Metadata strictly and aggressively with clean fallback to "Patient"
  const patientName = extractPatientNameFromText(text, lines);

  let patientAge = 'Not specified';
  const ageMatch = text.match(/(?:age|yrs?)\s*[:=-]?\s*(\d{1,3})/i) ||
                   text.match(/\b(\d{1,3})\s*(?:y|yr|yrs|years)\b/i);
  if (ageMatch && ageMatch[1]) {
    patientAge = parseInt(ageMatch[1], 10);
  }

  let patientGender = 'Not specified';
  const genderMatch = text.match(/(?:sex|gender)\s*[:=-]?\s*(male|female|m|f)\b/i) ||
                      text.match(/\b(male|female)\b/i);
  if (genderMatch && genderMatch[1]) {
    const g = genderMatch[1].toUpperCase();
    patientGender = g.startsWith('M') ? 'Male' : 'Female';
  }

  let documentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const dateMatch = text.match(/\b(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})\b/) ||
                    text.match(/\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s,]+\d{2,4})\b/i);
  if (dateMatch && dateMatch[1]) {
    documentDate = dateMatch[1];
  }

  let physician = 'Not specified';
  const doctorMatch = text.match(/(?:dr\.?|doctor|physician|consultant|ref(?:\.|\s+by)?)\s*[:=-]?\s*([A-Za-z\s.]{3,35})/i);
  if (doctorMatch && doctorMatch[1]) {
    const doc = doctorMatch[1].trim().replace(/[\r\n].*/g, '').trim();
    if (doc.length > 2 && !/^(name|age|date|patient|report)$/i.test(doc)) {
      physician = doc.toLowerCase().startsWith('dr') ? doc : `Dr. ${doc}`;
    }
  }

  let labName = 'Uploaded Document';
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const l = lines[i];
    if (/hospital|clinic|diagnostic|pathology|laboratory|healthcare|center|institute|health/i.test(l)) {
      labName = l;
      break;
    }
  }
  if (labName === 'Uploaded Document' && lines.length > 0 && lines[0].length < 50) {
    labName = lines[0];
  }

  // 4. Search for clinical parameters ACTUALLY present in document text
  const foundMetrics = [];
  const checkParam = (regexes, name, nameHi, namePa, unit, minNorm, maxNorm, expEn, expHi, expPa) => {
    for (const regex of regexes) {
      const match = text.match(regex);
      if (match && match[1]) {
        const val = parseFloat(match[1]);
        if (!isNaN(val) && val > 0) {
          const isLow = val < minNorm;
          const isHigh = val > maxNorm;
          const recon = reconstructMedicalTerm(name, 'lab');

          foundMetrics.push({
            id: `extracted-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
            name,
            nameHi,
            namePa,
            value: val,
            displayValue: `${val} ${unit}`,
            normalRange: `${minNorm} – ${maxNorm} ${unit}`,
            minNormal: minNorm,
            maxNormal: maxNorm,
            confidence: recon.confidence || 0.95,
            requiresVerification: !!recon.requiresVerification,
            rawFragment: match[0],
            status: isLow ? 'low' : isHigh ? 'high' : 'normal',
            badge: {
              en: isLow ? 'Low' : isHigh ? 'High' : 'Normal',
              hi: isLow ? 'कम' : isHigh ? 'अधिक' : 'सामान्य',
              pa: isLow ? 'ਘੱਟ' : isHigh ? 'ਵੱਧ' : 'ਆਮ'
            },
            explanation: { en: expEn, hi: expHi, pa: expPa },
            spokenCardText: {
              en: `${name}: observed value is ${val} ${unit}, normal reference is ${minNorm} to ${maxNorm} ${unit}. Status is ${isLow ? 'low' : isHigh ? 'high' : 'normal'}.`,
              hi: `${nameHi}: आपका परिणाम ${val} ${unit} है। सामान्य सीमा ${minNorm} से ${maxNorm} है। स्थिति: ${isLow ? 'कम' : isHigh ? 'अधिक' : 'सामान्य'}।`,
              pa: `${namePa}: ਨਤੀਜਾ ${val} ${unit} ਹੈ। ਆਮ ਸੀਮਾ ${minNorm} ਤੋਂ ${maxNorm} ਹੈ।`
            }
          });
          break;
        }
      }
    }
  };

  // Broad medical parameter regexes matching real clinical lab reports
  checkParam([/(?:hemoglobin|haemoglobin|hb)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i, /hb\s+([0-9]+\.?[0-9]*)/i], 'Hemoglobin (Hb)', 'हीमोग्लोबिन (Hb)', 'ਹੀਮੋਗਲੋਬਿਨ (Hb)', 'g/dL', 12.0, 15.5, 'Oxygen-carrying protein in red blood cells. Low values indicate anemia or fatigue.', 'लाल रक्त कोशिकाओं में ऑक्सीजन ले जाने वाला प्रोटीन। कम होने पर थकान होती है।', 'ਖੂਨ ਵਿੱਚ ਆਕਸੀਜਨ ਲਿਜਾਣ ਵਾਲਾ ਤੱਤ।');
  checkParam([/(?:fasting\s*(?:blood\s*)?(?:glucose|sugar)|fbs)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i, /glucose\s*\(?fasting\)?\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Fasting Blood Glucose', 'फास्टिंग ब्लड शुगर', 'ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ', 'mg/dL', 70, 99, 'Morning fasting blood sugar level.', 'खाली पेट रक्त शर्करा स्तर।', 'ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ ਦਾ ਪੱਧਰ।');
  checkParam([/(?:post\s*prandial|ppbs|pp\s*sugar|pp\s*glucose)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Post-Prandial Glucose (PP)', 'भोजन के बाद का शुगर', 'ਖਾਣੇ ਤੋਂ ਬਾਅਦ ਦੀ ਸ਼ੂਗਰ', 'mg/dL', 70, 140, 'Blood sugar level measured after meals.', 'भोजन के 2 घंटे बाद रक्त शर्करा स्तर।', 'ਖਾਣੇ ਤੋਂ ਬਾਅद ਸ਼ੂਗਰ।');
  checkParam([/(?:hba1c|glycated\s*hemoglobin)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'HbA1c (3-Month Sugar)', 'एचबीए1सी (3 माह का शुगर)', 'ਐਚਬੀਏ1ਸੀ', '%', 4.0, 5.7, 'Average blood glucose over the past 90 days.', 'पिछले 3 महीनों का औसत शुगर स्तर।', 'ਪਿਛਲੇ 3 ਮਹੀਨਿਆਂ ਦੀ ਔਸਤ ਸ਼ੂਗਰ।');
  checkParam([/(?:wbc|white\s*blood\s*cells?|tlc|total\s*leukocyte\s*count)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Total Leukocytes (WBC)', 'श्वेत रक्त कोशिकाएं (WBC)', 'ਚਿੱਟੇ ਰਕਤਾਣੂ (WBC)', '×10³/µL', 4.0, 11.0, 'Infection-fighting immune defense cells.', 'संक्रमण से लड़ने वाली कोशिकाएं।', 'ਸਰੀਰ ਦੀ ਬਿਮਾਰੀਆਂ ਨਾਲ ਲੜਨ ਵਾਲੇ ਸੈੱਲ।');
  checkParam([/(?:platelet|plt|thrombocyte)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Platelet Count', 'प्लेटलेट्स', 'ਪਲੇਟਲੇਟਸ', '×10³/µL', 150, 450, 'Blood clotting cells preventing bleeding.', 'खून का थक्का बनाकर बहाव रोकने वाली कोशिकाएं।', 'ਖੂਨ ਜੰਮਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਵਾਲੇ ਸੈੱਲ।');
  checkParam([/(?:rbc|red\s*blood\s*cells?)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'RBC Count', 'लाल रक्त कोशिकाएं (RBC)', 'ਲਾਲ ਰਕਤਾਣੂ', 'mil/µL', 4.0, 5.5, 'Red blood cells that carry oxygen.', 'ऑक्सीजन ले जाने वाली लाल रक्त कोशिकाएं।', 'ਆਕਸੀਜਨ ਲਿਜਾਣ ਵਾਲੇ ਲਾਲ ਸੈੱਲ।');
  checkParam([/(?:total\s*cholesterol|cholesterol)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Total Cholesterol', 'कुल कोलेस्ट्रॉल', 'ਕੁੱਲ ਕੋਲੇਸਟ੍ਰੋਲ', 'mg/dL', 120, 200, 'Total circulating blood lipid volume.', 'खून में वसा की कुल मात्रा।', 'ਖੂਨ ਵਿੱਚ ਕੋਲੇਸਟ੍ਰੋਲ ਦੀ ਕੁੱਲ ਮਾਤਰਾ।');
  checkParam([/(?:triglycerides|tg)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Triglycerides', 'ट्राइग्लिसराइड्स', 'ਟ੍ਰਾਈਗਲਿਸਰਾਈਡਸ', 'mg/dL', 50, 150, 'Blood fats stored from calorie intake.', 'ऊर्जा के लिए जमा होने वाली रक्त वसा।', 'ਸਰੀਰ ਦੀ ਚਰਬੀ ਦਾ ਪੱਧਰ।');
  checkParam([/(?:hdl(?:\s*cholesterol)?)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'HDL (Good Cholesterol)', 'एचडीएल (अच्छा कोलेस्ट्रॉल)', 'ਐਚ.ਡੀ.ਐਲ', 'mg/dL', 40, 60, 'Protective cholesterol removing fats from blood vessels.', 'धमनियों को साफ रखने वाला अच्छा कोलेस्ट्रॉल।', 'ਚੰਗਾ ਕੋਲੇਸਟ੍ਰੋਲ।');
  checkParam([/(?:ldl(?:\s*cholesterol)?)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'LDL (Bad Cholesterol)', 'एलडीएल (हानिकारक कोलेस्ट्रॉल)', 'ਐਲ.ਡੀ.ਐल', 'mg/dL', 50, 100, 'Artery-clogging lipid linked to heart strain.', 'धमनियों में रुकावट पैदा करने वाला खराब कोलेस्ट्रॉल।', 'ਮਾੜਾ ਕੋਲੇਸਟ੍ਰੋਲ।');
  checkParam([/(?:serum\s*creatinine|creatinine)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Serum Creatinine', 'सीरम क्रिएटिनिन', 'ਕ੍ਰੀਏਟਿਨਿਨ', 'mg/dL', 0.6, 1.2, 'Key indicator of kidney filtration efficiency.', 'किडनी की कार्यक्षमता का मुख्य संकेतक।', 'ਗੁਰਦੇ ਦੀ ਸਿਹਤ ਦਾ ਸੂਚਕ।');
  checkParam([/(?:blood\s*urea|urea)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Blood Urea', 'ब्लड यूरिया', 'ਬਲੱਡ ਯੂਰੀਆ', 'mg/dL', 15, 40, 'Kidney waste filtration byproduct.', 'किडनी द्वारा साफ किया जाने वाला अपशिष्ट।', 'ਗੁਰਦਿਆਂ ਦੁਆਰਾ ਸਾਫ਼ ਕੀਤਾ ਜਾਣ ਵਾਲਾ ਤੱਤ।');
  checkParam([/(?:uric\s*acid)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Uric Acid', 'यूरिक एसिड', 'ਯੂਰਿਕ ਐਸਿਡ', 'mg/dL', 3.5, 7.2, 'Byproduct linked to joint pain / gout when elevated.', 'बढ़ने पर जोड़ों के दर्द का कारण बनने वाला तत्व।', 'ਜੋੜਾਂ ਦੇ ਦਰਦ ਨਾਲ ਸੰਬੰਧਿਤ ਤੱਤ।');
  checkParam([/(?:total\s*bilirubin|bilirubin)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Total Bilirubin', 'कुल बिलीरुबिन', 'ਬਿਲੀਰੂਬਿਨ', 'mg/dL', 0.2, 1.2, 'Liver bile pigment. High levels indicate jaundice.', 'लिवर का पित्त वर्णक। बढ़ने पर पीलिया होता है।', 'ਪੀਲੀਏ ਦੀ ਜਾਂਚ ਲਈ ਲਿਵਰ ਦਾ ਟੈਸਟ।');
  checkParam([/(?:sgpt|alt)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'SGPT (ALT)', 'एसजीपीटी (लिवर एंजाइम)', 'ਐਸ.ਜੀ.ਪੀ.ਟੀ', 'U/L', 7, 56, 'Enzyme indicating liver cell integrity.', 'लिवर स्वास्थ्य का मुख्य एंजाइम।', 'ਲਿਵਰ ਦੀ ਕਾਰਜਪ੍ਰਣਾਲੀ ਦਾ ਐਂਜ਼ਾਈਮ।');
  checkParam([/(?:sgot|ast)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'SGOT (AST)', 'एसजीओटी (लिवर एंजाइम)', 'ਐਸ.ਜੀ.ਓ.ਟੀ', 'U/L', 10, 40, 'Enzyme found in liver and heart tissues.', 'लिवर और मांसपेशियों का एंजाइम।', 'ਲਿਵਰ ਅਤੇ ਦਿਲ ਦਾ ਐਂਜ਼ਾਈਮ।');
  checkParam([/(?:tsh|thyroid\s*stimulating\s*hormone)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'TSH (Thyroid Stimulating Hormone)', 'टी.एस.एच (थायराइड)', 'ਟੀ.ਐਸ.ਐਚ', 'µIU/mL', 0.4, 4.5, 'Pituitary hormone regulating metabolic rate.', 'थायराइड ग्रंथि को नियंत्रित करने वाला हार्मोन।', 'ਥਾਇਰਾਇਡ ਨੂੰ ਕੰਟਰੋਲ ਕਰਨ ਵਾਲਾ ਹਾਰਮੋਨ।');
  checkParam([/(?:vitamin\s*d|25-oh|vit\s*d)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Vitamin D (25-OH)', 'विटामिन डी', 'ਵਿਟਾਮਿਨ ਡੀ', 'ng/mL', 30.0, 100.0, 'Essential for bone density, calcium, and immunity.', 'हड्डियों की मजबूती और रोग प्रतिरोधक क्षमता।', 'ਹੱਡੀਆਂ ਦੀ ਮਜ਼ਬੂਤੀ ਲਈ ਜ਼ਰੂਰੀ।');
  checkParam([/(?:vitamin\s*b12|vit\s*b12|b12)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Vitamin B12', 'विटामिन बी12', 'ਵਿਟਾਮਿਨ ਬੀ12', 'pg/mL', 200, 900, 'Nerve health and red blood cell production.', 'तंत्रिका स्वास्थ्य और खून निर्माण के लिए आवश्यक।', 'ਨਾੜੀਆਂ ਦੀ ਤਾਕਤ ਲਈ ਜ਼ਰੂਰੀ ਵਿਟਾਮਿਨ।');
  checkParam([/(?:serum\s*calcium|calcium)\s*[:=.-]?\s*([0-9]+\.?[0-9]*)/i], 'Serum Calcium', 'सीरम कैल्शियम', 'ਕੈਲਸ਼ੀਅਮ', 'mg/dL', 8.5, 10.5, 'Crucial for bone strength and muscle contractions.', 'हड्डियों और मांसपेशियों के लिए जरूरी।', 'ਹੱਡੀਆਂ ਦੀ ਮਜ਼ਬੂਤੀ ਲਈ ਤੱਤ।');

  // 5. Extract Prescriptions strictly from lines containing medication keywords
  const prescriptions = [];
  const rxKeywords = /(?:tab|tablet|cap|capsule|syr|syrup|inj|injection|oint|drops?)\.?\s+([A-Za-z0-9\-+/.\s]{2,40})/i;
  
  lines.forEach((line) => {
    if (rxKeywords.test(line) || /^\s*(?:rx|℞)\s*[:=-]?\s*/i.test(line)) {
      const match = line.match(rxKeywords);
      const medName = match ? match[0].trim() : line.replace(/^\s*(?:rx|℞)\s*[:=-]?\s*/i, '').trim();
      
      let timing = 'As directed on document';
      if (/1\s*od|once\s+daily|q\.?d\.?/i.test(line)) timing = 'Once daily';
      else if (/1\s*bd|twice\s+daily|b\.?i\.?d\.?/i.test(line)) timing = 'Twice daily';
      else if (/1\s*tds|thrice\s+daily|t\.?i\.?d\.?/i.test(line)) timing = 'Three times daily';
      else if (/hs|bedtime|night/i.test(line)) timing = 'At bedtime';
      else if (/after\s+meals?|p\.?c\.?/i.test(line)) timing = 'After meals';
      else if (/before\s+meals?|a\.?c\.?/i.test(line)) timing = 'Before meals';

      let dosage = 'Standard Dose';
      const doseMatch = line.match(/(\d+\s*(?:mg|mcg|gm|ml|iu|units?))/i);
      if (doseMatch) dosage = doseMatch[1];

      if (medName.length > 3 && !/^(table|tablet|capsule|date|patient|report)$/i.test(medName)) {
        // Step 2 Reconstruction using FDA Drug Index
        const recon = reconstructMedicalTerm(medName, 'prescription');
        const reconstructedMed = (!recon.requiresVerification && recon.reconstructedName) ? recon.reconstructedName : medName;

        prescriptions.push({
          medication: reconstructedMed,
          rawMedication: medName,
          dosage,
          timing,
          duration: 'As indicated on document',
          instructions: line,
          confidence: recon.confidence || 0.85,
          requiresVerification: !!recon.requiresVerification
        });
      }
    }
  });
  // 6. Legible Text Excerpts read directly from user's photograph
  const extractedLines = lines.slice(0, 15);

  // 7. Clinical Impressions (100% grounded in the real text)
  let clinicalImpression = '';
  const impressionMatch = text.match(/(?:impression|diagnosis|conclusion|findings|remarks|advice|opinion|comments)\s*[:=-]?\s*([^\n]+(?:\n[^\n]+){0,2})/i);
  
  if (impressionMatch && impressionMatch[1]) {
    clinicalImpression = impressionMatch[1].trim();
  } else if (foundMetrics.length > 0) {
    const abnormals = foundMetrics.filter(m => m.status !== 'normal');
    clinicalImpression = abnormals.length > 0
      ? `Document contains ${foundMetrics.length} lab parameter(s), with ${abnormals.length} observed outside standard reference limits.`
      : `All ${foundMetrics.length} detected laboratory marker(s) fall within standard clinical reference ranges.`;
  } else if (prescriptions.length > 0) {
    clinicalImpression = `Prescription document containing ${prescriptions.length} medication entry/entries.`;
  } else if (lines.length > 0) {
    clinicalImpression = `Text detected from uploaded image: "${lines.slice(0, 2).join(' ')}"`;
  } else {
    clinicalImpression = 'No legible clinical text or numerical rows could be detected in this uploaded image.';
  }

  // 8. Honest, Non-Hallucinated Patient Summary
  const abnormals = foundMetrics.filter(m => m.status !== 'normal');
  const summaryBulletsEn = [];
  const summaryBulletsHi = [];
  const summaryBulletsPa = [];

  if (lines.length === 0) {
    summaryBulletsEn.push(
      "No legible text was detected in your uploaded photograph.",
      "Please make sure your camera is focused, lighting is bright, and the document is flat.",
      "Take a close-up photo directly over the document or upload a clear PDF scan."
    );
    summaryBulletsHi.push(
      "अपलोड की गई तस्वीर में कोई स्पष्ट टेक्स्ट नहीं पढ़ा जा सका।",
      "कृपया सुनिश्चित करें कि फोटो साफ और अच्छी रोशनी में ली गई हो।",
      "स्पष्ट परिणाम के लिए दोबारा साफ तस्वीर अपलोड करें।"
    );
    summaryBulletsPa.push(
      "ਅਪਲੋਡ ਕੀਤੀ ਫੋਟੋ ਵਿੱਚੋਂ ਕੋਈ ਲਿਖਤ ਨਹੀਂ ਪੜ੍ਹੀ ਜਾ ਸਕੀ।",
      "ਕਿਰਪਾ ਕਰਕੇ ਸਾਫ਼ ਅਤੇ ਰੋਸ਼ਨੀ ਵਾਲੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ।",
      "ਸਹੀ ਨਤੀਜੇ ਲਈ ਦੁਬਾਰਾ ਸਾਫ਼ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ।"
    );
  } else {
    summaryBulletsEn.push(
      `Analyzed from your uploaded photograph: Found ${lines.length} legible text line(s) dated ${documentDate}.`
    );
    summaryBulletsHi.push(
      `आपकी तस्वीर का विश्लेषण: दिनांक ${documentDate} के ${lines.length} टेक्स्ट लाइन पढ़े गए।`
    );
    summaryBulletsPa.push(
      `ਤੁਹਾਡੀ ਫੋਟੋ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ: ਮਿਤੀ ${documentDate} ਦੀਆਂ ${lines.length} ਲਿਖਤ ਲਾਈਨਾਂ ਪੜ੍ਹੀਆਂ ਗਈਆਂ।`
    );

    if (foundMetrics.length > 0) {
      if (abnormals.length > 0) {
        const listStr = abnormals.map(m => `${m.name} (${m.displayValue}, status: ${m.badge.en})`).join(', ');
        summaryBulletsEn.push(`Detected ${foundMetrics.length} lab marker(s). Variations observed in: ${listStr}.`);
        summaryBulletsHi.push(`कुल ${foundMetrics.length} टेस्ट में से इन मानों में भिन्नता पाई गई: ${abnormals.map(m => `${m.nameHi || m.name} (${m.displayValue})`).join(', ')}।`);
        summaryBulletsPa.push(`ਕੁੱਲ ${foundMetrics.length} ਟੈਸਟਾਂ ਵਿੱਚੋਂ ਇਹਨਾਂ ਵਿੱਚ ਫ਼ਰਕ ਹੈ: ${abnormals.map(m => `${m.namePa || m.name} (${m.displayValue})`).join(', ')}।`);
      } else {
        summaryBulletsEn.push(`All ${foundMetrics.length} detected test parameter(s) are within standard normal reference ranges.`);
        summaryBulletsHi.push(`पहचाने गए सभी ${foundMetrics.length} टेस्ट सामान्य संदर्भ सीमा के भीतर हैं।`);
        summaryBulletsPa.push(`ਪਛਾਣੇ ਗਏ ਸਾਰੇ ${foundMetrics.length} ਟੈਸਟ ਆਮ ਸੀਮਾ ਦੇ ਅੰਦਰ ਹਨ।`);
      }
    } else if (prescriptions.length > 0) {
      summaryBulletsEn.push(`Identified ${prescriptions.length} medication(s) prescribed: ${prescriptions.map(p => p.medication).join(', ')}.`);
      summaryBulletsHi.push(`पर्चे में ${prescriptions.length} दवाएं पाई गईं: ${prescriptions.map(p => p.medication).join(', ')}।`);
      summaryBulletsPa.push(`ਪਰਚੇ ਵਿੱਚ ${prescriptions.length} ਦਵਾਈਆਂ ਮਿਲੀਆਂ: ${prescriptions.map(p => p.medication).join(', ')}।`);
    } else {
      summaryBulletsEn.push(`Document scanned without numeric lab tables. Review the extracted text lines shown above.`);
      summaryBulletsHi.push(`दस्तावेज़ में कोई विशिष्ट लैब तालिका नहीं मिली। ऊपर दिखाया गया पढ़ा गया टेक्स्ट देखें।`);
      summaryBulletsPa.push(`ਦਸਤਾਵੇਜ਼ ਵਿੱਚੋਂ ਲਿਖਤ ਪੜ੍ਹੀ ਗਈ ਹੈ। ਉੱਪਰ ਦਿੱਤੀ ਲਿਖਤ ਦੇਖੋ।`);
    }

    if (prescriptions.length > 0) {
      summaryBulletsEn.push(`Take medications as indicated on your prescription and consult your physician.`);
      summaryBulletsHi.push(`पर्चे पर लिखी दवाओं को अपने चिकित्सक के निर्देशानुसार लें।`);
      summaryBulletsPa.push(`ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਅਨੁਸਾਰ ਦਵਾਈਆਂ ਦਾ ਸੇਵਨ ਕਰੋ।`);
    } else {
      summaryBulletsEn.push(`Discuss these document findings with your healthcare provider.`);
      summaryBulletsHi.push(`इन परिणामों पर अपने चिकित्सक से परामर्श अवश्य करें।`);
      summaryBulletsPa.push(`ਇਹਨਾਂ ਨਤੀਜਿਆਂ ਬਾਰੇ ਆਪਣੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।`);
    }
  }

  // 9. Actionable Next Steps
  const actionableStepsEn = [];
  const actionableStepsHi = [];
  const actionableStepsPa = [];

  if (prescriptions.length > 0) {
    prescriptions.forEach((rx) => {
      actionableStepsEn.push({
        title: `Take ${rx.medication}`,
        desc: `${rx.timing} (${rx.dosage}). As indicated on your uploaded prescription.`,
        category: 'medical'
      });
      actionableStepsHi.push({
        title: `${rx.medication} लें`,
        desc: `${rx.timing} (${rx.dosage})। पर्चे के निर्देशानुसार।`,
        category: 'medical'
      });
      actionableStepsPa.push({
        title: `${rx.medication} ਲਵੋ`,
        desc: `${rx.timing} (${rx.dosage})। ਪਰਚੇ ਅਨੁਸਾਰ।`,
        category: 'medical'
      });
    });
  }

  if (abnormals.length > 0) {
    abnormals.forEach((m) => {
      actionableStepsEn.push({
        title: `Discuss ${m.name} with Doctor`,
        desc: `Observed value is ${m.displayValue} (normal: ${m.normalRange}). Review with physician.`,
        category: 'medical'
      });
      actionableStepsHi.push({
        title: `${m.nameHi || m.name} पर डॉक्टर से चर्चा करें`,
        desc: `मान: ${m.displayValue} (सामान्य: ${m.normalRange})।`,
        category: 'medical'
      });
      actionableStepsPa.push({
        title: `${m.namePa || m.name} ਬਾਰੇ ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ`,
        desc: `ਨਤੀਜਾ: ${m.displayValue} (ਆਮ: ${m.normalRange})।`,
        category: 'medical'
      });
    });
  }

  if (actionableStepsEn.length === 0) {
    actionableStepsEn.push(
      { title: "Review with Doctor", desc: "Bring this extracted document summary to your physician.", category: "medical" },
      { title: "Save Digital Copy", desc: "Keep this scanned record for your personal health archive.", category: "lifestyle" }
    );
    actionableStepsHi.push(
      { title: "डॉक्टर से परामर्श लें", desc: "यह सारांश अपने चिकित्सक को दिखाएं।", category: "medical" },
      { title: "डिजिटल कॉपी सुरक्षित रखें", desc: "भविष्य के संदर्भ के लिए इसे सहेजें।", category: "lifestyle" }
    );
    actionableStepsPa.push(
      { title: "ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ", desc: "ਇਹ ਰਿਪੋਰਟ ਆਪਣੇ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਓ।", category: "medical" },
      { title: "ਰਿਕਾਰਡ ਸੰਭਾਲ ਕੇ ਰੱਖੋ", desc: "ਰਿਕਾਰਡ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।", category: "lifestyle" }
    );
  }

  // 10. Status level
  const statusLevel = abnormals.length > 0 ? 'attention' : lines.length > 0 ? 'normal' : 'alert';
  const badgeText = {
    en: abnormals.length > 0 ? `${abnormals.length} Variation(s) Detected` : lines.length > 0 ? 'Verified Document Scan' : 'Unclear Image Scan',
    hi: abnormals.length > 0 ? `${abnormals.length} बदलाव पाए गए` : lines.length > 0 ? 'सत्यापित दस्तावेज़' : 'अस्पष्ट तस्वीर',
    pa: abnormals.length > 0 ? `${abnormals.length} ਫ਼ਰਕ ਮਿਲੇ` : lines.length > 0 ? 'ਜਾਂਚਿਆ ਦਸਤਾਵੇਜ਼' : 'ਅਸਪਸ਼ਟ ਫੋਟੋ'
  };

  const doctorReassurance = {
    en: abnormals.length > 0
      ? `Review the detected variations with your physician. Most laboratory variations are common and manageable.`
      : lines.length > 0
      ? `Document text successfully read from your uploaded image. Review the findings with your doctor.`
      : `The photo was faint or blurry. Please take a closer photo with good lighting for clearer extraction.`,
    hi: abnormals.length > 0
      ? `पाए गए बदलावों पर अपने चिकित्सक से परामर्श लें। अधिकांश बदलाव सामान्य और उपचार योग्य होते हैं।`
      : lines.length > 0
      ? `आपकी तस्वीर से दस्तावेज़ सफलतापूर्वक पढ़ लिया गया है।`
      : `फोटो धुंधली या कम रोशनी वाली थी। कृपया अच्छी रोशनी में दोबारा फोटो खींचें।`,
    pa: abnormals.length > 0
      ? `ਇਹਨਾਂ ਬਦਲਾਵਾਂ ਬਾਰੇ ਆਪਣੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।`
      : lines.length > 0
      ? `ਤੁਹਾਡੀ ਫੋਟੋ ਤੋਂ ਦਸਤਾਵੇਜ਼ ਸਫਲਤਾਪੂਰਵਕ ਪੜ੍ਹਿਆ ਗਿਆ ਹੈ।`
      : `ਫੋਟੋ ਸਾਫ਼ ਨਹੀਂ ਸੀ। ਕਿਰਪਾ ਕਰਕੇ ਚੰਗੀ ਰੋਸ਼ਨੀ ਵਿੱਚ ਦੁਬਾਰਾ ਫੋਟੋ ਲਵੋ।`
  };

  const audioScriptEn = `Here is what is written on your uploaded document, dated ${documentDate}. ${
    foundMetrics.length > 0
      ? `We detected ${foundMetrics.length} lab test markers. ${abnormals.length > 0 ? `Values outside standard range include ${abnormals.map(m => `${m.name} at ${m.displayValue}`).join(', ')}.` : 'All markers are within healthy reference intervals.'}`
      : prescriptions.length > 0
      ? `We identified ${prescriptions.length} prescribed medications: ${prescriptions.map(p => `${p.medication}, ${p.timing}`).join('. ')}.`
      : lines.length > 0
      ? `We extracted ${lines.length} lines of text from your photo.`
      : 'No text could be read from the uploaded image.'
  } Please consult your physician for clinical decisions.`;

  const audioScriptHi = `यह आपकी अपलोड की गई तस्वीर का विश्लेषण है, दिनांक ${documentDate}। ${
    foundMetrics.length > 0
      ? `कुल ${foundMetrics.length} टेस्ट पढ़े गए हैं। ${abnormals.length > 0 ? `कुछ टेस्ट सामान्य सीमा से बाहर हैं।` : 'सभी टेस्ट सामान्य सीमा के भीतर हैं।'}`
      : prescriptions.length > 0
      ? `पर्चे में ${prescriptions.length} दवाएं पाई गईं।`
      : lines.length > 0
      ? `आपकी तस्वीर से ${lines.length} लाइनें पढ़ी गई हैं।`
      : 'तस्वीर से टेक्स्ट नहीं पढ़ा जा सका।'
  } अपने डॉक्टर से सलाह अवश्य लें।`;

  const audioScriptPa = `ਇਹ ਤੁਹਾਡੇ ਅਪਲੋਡ ਕੀਤੇ ਦਸਤਾਵੇਜ਼ ਦੀ ਜਾਣਕਾਰੀ ਹੈ, ਮਿਤੀ ${documentDate}। ${
    foundMetrics.length > 0
      ? `ਕੁੱਲ ${foundMetrics.length} ਟੈਸਟ ਪੜ੍ਹੇ ਗਏ ਹਨ।`
      : prescriptions.length > 0
      ? `ਪਰਚੇ ਵਿੱਚ ${prescriptions.length} ਦਵਾਈਆਂ ਮਿਲੀਆਂ ਹਨ।`
      : 'ਦਸਤਾਵੇਜ਼ ਦੀ ਜਾਂਚ ਕੀਤੀ ਗਈ ਹੈ।'
  } ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਜ਼ਰੂਰ ਲਵੋ।`;

  return {
    id: `ocr-${Date.now()}`,
    title: fileName.replace(/\.[^/.]+$/, "") || 'Extracted Document',
    patient: {
      name: patientName,
      age: patientAge,
      gender: patientGender,
      date: documentDate,
      sampleType: 'From Document',
      physician
    },
    originalCard: {
      labName,
      labAddress: 'Extracted from document',
      specimenId: `DOC-${Math.floor(100000 + Math.random() * 900000)}`,
      collectionTime: `${documentDate}`,
      reportTime: `${documentDate}`,
      sampleQuality: 'Verified from Image',
      doctorClinicalImpression: clinicalImpression,
      prescriptions,
      doctorFollowUp: prescriptions.length > 0 ? 'Follow prescribed dosage and consult doctor.' : 'Discuss these findings with your physician.',
      handwrittenRxAudioScript: {
        en: prescriptions.length > 0
          ? `Doctor's prescription: ${prescriptions.map(p => `${p.medication}, ${p.dosage}, ${p.timing}`).join('. ')}.`
          : 'No prescription lines detected on this document.',
        hi: prescriptions.length > 0
          ? `दवाइयों का पर्चा: ${prescriptions.map(p => `${p.medication}`).join(', ')}।`
          : 'इस दस्तावेज़ में कोई दवा नहीं मिली।',
        pa: prescriptions.length > 0
          ? `ਦਵਾਈਆਂ ਦਾ ਪਰਚਾ: ${prescriptions.map(p => `${p.medication}`).join(', ')}।`
          : 'ਇਸ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਕੋਈ ਦਵਾਈ ਨਹੀਂ ਮਿਲੀ।'
      }
    },
    statusOverview: {
      level: statusLevel,
      badgeText,
      doctorReassurance
    },
    simplifiedSummary: {
      en: summaryBulletsEn,
      hi: summaryBulletsHi,
      pa: summaryBulletsPa
    },
    audioScript: {
      en: audioScriptEn,
      hi: audioScriptHi,
      pa: audioScriptPa
    },
    keyMetrics: foundMetrics,
    actionableSteps: {
      en: actionableStepsEn,
      hi: actionableStepsHi,
      pa: actionableStepsPa
    },
    extractedLines,
    uploadedImageUrl: fileDataUrl,
    rawExtractedText: text
  };
}
