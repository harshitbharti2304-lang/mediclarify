import { extractTextFromImage, buildReportFromOcr, cleanPatientName } from './ocrService';

export async function parseMedicalReport({ file, fileDataUrl, textContent = '', preferredLanguage = 'en', onOcrProgress }) {
  try {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('mediclarify_gemini_key') || '';
    const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem('mediclarify_openai_key') || '';

    let ocrExtractedText = '';

    // 1. Run Real Tesseract.js OCR if image data URL is provided
    if (fileDataUrl && fileDataUrl.startsWith('data:image')) {
      try {
        ocrExtractedText = await extractTextFromImage(fileDataUrl, onOcrProgress);
      } catch (e) {
        console.warn('OCR processing error safely caught:', e);
      }
    }

    // 2. If Gemini API Key is available, attempt real Multimodal LLM extraction
    if (geminiApiKey && geminiApiKey.trim().length > 15) {
      try {
        const result = await callGeminiVision({
          apiKey: geminiApiKey,
          fileDataUrl,
          textContent: (textContent || '') + (ocrExtractedText ? `\nOCR Extracted Text:\n${ocrExtractedText}` : ''),
          preferredLanguage
        });
        if (result) {
          result.uploadedImageUrl = fileDataUrl;
          result.rawExtractedText = ocrExtractedText;
          if (result.patient) result.patient.name = cleanPatientName(result.patient.name);
          return result;
        }
      } catch (err) {
        console.warn('Real Gemini extraction failed, falling back to local OCR engine:', err);
      }
    }

    // 3. If OpenAI API Key is available, attempt GPT-4o-mini Vision extraction
    if (openAiApiKey && openAiApiKey.trim().length > 15) {
      try {
        const result = await callOpenAiVision({
          apiKey: openAiApiKey,
          fileDataUrl,
          textContent: (textContent || '') + (ocrExtractedText ? `\nOCR Extracted Text:\n${ocrExtractedText}` : ''),
          preferredLanguage
        });
        if (result) {
          result.uploadedImageUrl = fileDataUrl;
          result.rawExtractedText = ocrExtractedText;
          if (result.patient) result.patient.name = cleanPatientName(result.patient.name);
          return result;
        }
      } catch (err) {
        console.warn('OpenAI extraction failed, falling back to local OCR engine:', err);
      }
    }

    // 4. Grounded client-side extraction - strictly uses text from uploaded image
    const report = buildReportFromOcr({
      rawText: ocrExtractedText,
      fileName: file?.name || 'Uploaded Document',
      fileDataUrl,
      preferredLanguage
    });
    if (report && report.patient) {
      report.patient.name = cleanPatientName(report.patient.name);
    }
    return report;
  } catch (fatalErr) {
    console.error('Fatal medical report extraction error caught safely:', fatalErr);
    const fallbackReport = buildReportFromOcr({
      rawText: '',
      fileName: file?.name || 'Uploaded Document',
      fileDataUrl,
      preferredLanguage
    });
    if (fallbackReport && fallbackReport.patient) {
      fallbackReport.patient.name = cleanPatientName(fallbackReport.patient.name);
    }
    return fallbackReport;
  }
}

// Gemini 1.5 / 2.0 Flash Extraction
async function callGeminiVision({ apiKey, fileDataUrl, textContent, preferredLanguage }) {
  const prompt = `You are MediClarify, an empathetic medical report simplifier for patients.
PATIENT NAME EXTRACTION INSTRUCTION:
- Aggressively scan document banners, top header sections, and form blocks for the patient's name.
- Look specifically for common labels such as: "Patient Name:", "Name:", "Pt Name:", "Pt:", "Name of Patient:", "For:", or combined headers formatted like "Name / Age / Sex".
- Extract ONLY the full clean name string (e.g., "Pooja Sharma", "Mr. Rajesh Kumar").
- Strip out any surrounding form labels, age, gender (e.g. "34 Y / Female"), UHID/Patient IDs, or phone numbers from the "name" field.
- FALLBACK RULE: If no explicit patient name label or text is detected anywhere on the document, cleanly default "patient.name" to "Patient" (never return null, undefined, raw unparsed labels, or "[object Object]").

CRITICAL INSTRUCTION:
Extract ONLY the data that is physically visible, printed, or handwritten in the provided medical document image.
DO NOT invent, assume, or hallucinate any doctor names, lab names, test values, or prescriptions.
If a field is not present in the document, use an empty string or empty array.
DO NOT use placeholder, sample, or random data.

Analyze this medical lab report or prescription and return a valid JSON object strictly matching this schema:
{
  "title": "String (e.g. Lab Name or Document Title found on report)",
  "patient": {
    "name": "String (clean patient name, or 'Patient')",
    "age": "Number or string (or 'Not specified')",
    "gender": "String (or 'Not specified')",
    "date": "String (or 'Not specified')",
    "sampleType": "String",
    "physician": "String (exact doctor name from document or 'Not specified')"
  },
  "originalCard": {
    "labName": "String",
    "labAddress": "String",
    "specimenId": "String",
    "collectionTime": "String",
    "reportTime": "String",
    "sampleQuality": "String",
    "doctorClinicalImpression": "String",
    "prescriptions": [
      {
        "medication": "String",
        "dosage": "String",
        "timing": "String",
        "duration": "String",
        "instructions": "String"
      }
    ],
    "doctorFollowUp": "String",
    "handwrittenRxAudioScript": {
      "en": "String",
      "hi": "String",
      "pa": "String"
    }
  },
  "statusOverview": {
    "level": "normal | attention | alert",
    "badgeText": { "en": "...", "hi": "...", "pa": "..." },
    "doctorReassurance": { "en": "...", "hi": "...", "pa": "..." }
  },
  "simplifiedSummary": {
    "en": ["Bullet 1", "Bullet 2", "Bullet 3"],
    "hi": ["हिंदी बुलेट 1", "हिंदी बुलेट 2", "हिंदी बुलेट 3"],
    "pa": ["ਪੰਜਾਬੀ ਬੁਲੇਟ 1", "ਪੰਜਾਬੀ ਬੁਲੇਟ 2", "ਪੰਜਾਬੀ ਬੁਲੇਟ 3"]
  },
  "audioScript": {
    "en": "Exact narrative reading what is written on the document...",
    "hi": "दस्तावेज़ में लिखी गई सटीक जानकारी की ऑडियो स्क्रिप्ट...",
    "pa": "ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਲਿਖੀ ਜਾਣਕਾਰੀ ਦੀ ਆਡੀਓ ਸਕ੍ਰਿਪਟ..."
  },
  "keyMetrics": [
    {
      "id": "param-1",
      "name": "Exact Test Name found in document",
      "nameHi": "हिंदी नाम",
      "namePa": "ਪੰਜਾਬੀ ਨਾਮ",
      "value": 11.2,
      "displayValue": "Exact observed value from document",
      "normalRange": "Normal reference range from document",
      "minNormal": 12.0,
      "maxNormal": 15.5,
      "status": "low | normal | high",
      "badge": { "en": "Low", "hi": "कम", "pa": "ਘੱਟ" },
      "explanation": {
        "en": "Plain language explanation...",
        "hi": "सरल हिंदी व्याख्या...",
        "pa": "ਸਰਲ ਪੰਜਾਬੀ ਵਿਆਖਿਆ..."
      }
    }
  ],
  "actionableSteps": {
    "en": [{ "title": "...", "desc": "...", "category": "diet | lifestyle | medical" }],
    "hi": [{ "title": "...", "desc": "...", "category": "diet | lifestyle | medical" }],
    "pa": [{ "title": "...", "desc": "...", "category": "diet | lifestyle | medical" }]
  }
}
Return ONLY pure JSON.`;

  const contents = [];
  const parts = [{ text: prompt }];

  if (fileDataUrl && fileDataUrl.includes(',')) {
    const base64Data = fileDataUrl.split(',')[1];
    const mimeType = fileDataUrl.substring(fileDataUrl.indexOf(':') + 1, fileDataUrl.indexOf(';'));
    parts.push({
      inline_data: {
        mime_type: mimeType || 'image/jpeg',
        data: base64Data
      }
    });
  } else if (textContent) {
    parts.push({ text: `Report Text: ${textContent}` });
  }

  contents.push({ parts });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini HTTP Error: ${response.status}`);
  }

  const json = await response.json();
  const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty response from Gemini');

  const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJson);
  parsed.id = 'gemini-' + Date.now();
  if (parsed.patient) {
    parsed.patient.name = cleanPatientName(parsed.patient.name);
  } else {
    parsed.patient = { name: 'Patient' };
  }
  return parsed;
}

// OpenAI Vision Fallback
async function callOpenAiVision({ apiKey, fileDataUrl, textContent, preferredLanguage }) {
  const messages = [
    {
      role: 'system',
      content: 'You are MediClarify. Extract ONLY real data present in the document. Scan aggressively for patient names (Patient Name:, Pt Name:, Name:, For:) and extract only the clean name string without surrounding age or labels. Default to "Patient" if absent.'
    },
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Extract and simplify this medical report in JSON format matching MediClarify schema strictly using the provided image content.' },
        ...(fileDataUrl ? [{ type: 'image_url', image_url: { url: fileDataUrl } }] : [{ type: 'text', text: textContent }])
      ]
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) throw new Error(`OpenAI HTTP Error: ${response.status}`);
  const json = await response.json();
  const parsed = JSON.parse(json.choices[0].message.content);
  parsed.id = 'openai-' + Date.now();
  if (parsed.patient) {
    parsed.patient.name = cleanPatientName(parsed.patient.name);
  } else {
    parsed.patient = { name: 'Patient' };
  }
  return parsed;
}
