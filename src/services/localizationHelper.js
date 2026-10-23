// Medical report localization engine for dynamic multi-language translation
// Supports English (en), Hindi (hi), Punjabi (pa), Bengali (bn), Marathi (mr), Spanish (es)

export function translateTiming(timingText, lang) {
  if (!timingText) return '';
  const lower = timingText.toLowerCase();

  if (lang === 'hi') {
    if (lower.includes('once') || lower.includes('od') || lower.includes('1 od')) return 'दिन में 1 बार (OD) - भोजन के बाद';
    if (lower.includes('twice') || lower.includes('bd') || lower.includes('bid')) return 'दिन में 2 बार (BD) - सुबह व शाम';
    if (lower.includes('thrice') || lower.includes('tds') || lower.includes('tid')) return 'दिन में 3 बार (TDS) - सुबह, दोपहर व रात';
    if (lower.includes('bedtime') || lower.includes('night') || lower.includes('hs')) return 'रात को सोने से पहले (HS)';
    if (lower.includes('before')) return 'भोजन से पहले (खाली पेट)';
    if (lower.includes('after')) return 'भोजन के बाद पानी के साथ';
    return 'पर्चे पर लिखे निर्देशानुसार लें';
  }

  if (lang === 'pa') {
    if (lower.includes('once') || lower.includes('od') || lower.includes('1 od')) return 'ਦਿਨ ਵਿੱਚ 1 ਵਾਰ (OD) - ਰੋਟੀ ਤੋਂ ਬਾਅਦ';
    if (lower.includes('twice') || lower.includes('bd') || lower.includes('bid')) return 'ਦਿਨ ਵਿੱਚ 2 ਵਾਰ (BD) - ਸਵੇਰੇ ਤੇ ਸ਼ਾਮ';
    if (lower.includes('thrice') || lower.includes('tds') || lower.includes('tid')) return 'ਦਿਨ ਵਿੱਚ 3 ਵਾਰ (TDS) - ਸਵੇਰੇ, ਦੁਪਹਿਰ ਤੇ ਰਾਤ';
    if (lower.includes('bedtime') || lower.includes('night') || lower.includes('hs')) return 'ਰਾਤ ਨੂੰ ਸੌਣ ਵੇਲੇ (HS)';
    if (lower.includes('before')) return 'ਰੋਟੀ ਤੋਂ ਪਹਿਲਾਂ (ਖਾਲੀ ਪੇਟ)';
    if (lower.includes('after')) return 'ਰੋਟੀ ਤੋਂ ਬਾਅਦ ਪਾਣੀ ਨਾਲ';
    return 'ਡਾਕਟਰ ਦੇ ਨਿਰਦੇਸ਼ ਅਨੁਸਾਰ ਲਵੋ';
  }

  if (lang === 'bn') {
    if (lower.includes('once') || lower.includes('od')) return 'দিনে ১ বার (OD) - খাবারের পর';
    if (lower.includes('twice') || lower.includes('bd')) return 'দিনে ২ বার (BD) - সকাল ও রাতে';
    if (lower.includes('thrice') || lower.includes('tds')) return 'দিনে ৩ বার (TDS)';
    if (lower.includes('bedtime') || lower.includes('night')) return 'রাতে ঘুমানোর আগে';
    if (lower.includes('before')) return 'খাবারের আগে';
    if (lower.includes('after')) return 'খাবারের পর জল দিয়ে';
    return 'প্রেসক্রিপশন অনুযায়ী গ্রহণ করুন';
  }

  if (lang === 'mr') {
    if (lower.includes('once') || lower.includes('od')) return 'दिवसातून १ वेळ (OD) - जेवणानंतर';
    if (lower.includes('twice') || lower.includes('bd')) return 'दिवसातून २ वेळा (BD) - सकाळ व संध्याकाळ';
    if (lower.includes('thrice') || lower.includes('tds')) return 'दिवसातून ३ वेळा (TDS)';
    if (lower.includes('bedtime') || lower.includes('night')) return 'रात्री झोपण्यापूर्वी';
    if (lower.includes('before')) return 'जेवणापूर्वी (उपाशी पोटी)';
    if (lower.includes('after')) return 'जेवणानंतर पाण्यासोबत';
    return 'प्रिस्क्रिप्शनवरील सूचनेनुसार घ्या';
  }

  if (lang === 'es') {
    if (lower.includes('once') || lower.includes('od')) return 'Una vez al día (OD) - después del almuerzo';
    if (lower.includes('twice') || lower.includes('bd')) return 'Dos veces al día (BD) - mañana y noche';
    if (lower.includes('thrice') || lower.includes('tds')) return 'Tres veces al día (TDS)';
    if (lower.includes('bedtime') || lower.includes('night')) return 'Antes de dormir (HS)';
    if (lower.includes('before')) return 'Antes de comer';
    if (lower.includes('after')) return 'Después de comer con agua';
    return 'Tomar según las indicaciones médicas';
  }

  return timingText;
}

export function translateDosage(dosageText, lang) {
  if (!dosageText) return '';
  if (lang === 'hi') {
    if (dosageText.toLowerCase().includes('standard')) return 'मानक खुराक';
    return dosageText.replace(/tablets?/gi, 'गोली').replace(/capsules?/gi, 'कैप्सूल').replace(/sachets?/gi, 'पाउच');
  }
  if (lang === 'pa') {
    if (dosageText.toLowerCase().includes('standard')) return 'ਸਹੀ ਖੁਰਾਕ';
    return dosageText.replace(/tablets?/gi, 'ਗੋਲੀ').replace(/capsules?/gi, 'ਕੈਪਸੂਲ').replace(/sachets?/gi, 'ਪਾਊਡਰ ਪੈਕੇਟ');
  }
  if (lang === 'bn') {
    return dosageText.replace(/tablets?/gi, 'ট্যাবলেট').replace(/capsules?/gi, 'ক্যাপসুল').replace(/sachets?/gi, 'স্যাচেট');
  }
  if (lang === 'mr') {
    return dosageText.replace(/tablets?/gi, 'गोळी').replace(/capsules?/gi, 'कॅप्सूल').replace(/sachets?/gi, 'पाउच');
  }
  if (lang === 'es') {
    return dosageText.replace(/tablets?/gi, 'comprimido').replace(/capsules?/gi, 'cápsula').replace(/sachets?/gi, 'sobre');
  }
  return dosageText;
}

export function translateDuration(durationText, lang) {
  if (!durationText) return '';
  const match = durationText.match(/(\d+)\s*(days?|weeks?|months?)/i);
  if (match) {
    const num = match[1];
    const unit = match[2].toLowerCase();
    if (lang === 'hi') {
      if (unit.startsWith('day')) return `${num} दिनों तक`;
      if (unit.startsWith('week')) return `${num} हफ्तों तक`;
      if (unit.startsWith('month')) return `${num} महीनों तक`;
    }
    if (lang === 'pa') {
      if (unit.startsWith('day')) return `${num} ਦਿਨਾਂ ਲਈ`;
      if (unit.startsWith('week')) return `${num} ਹਫ਼ਤਿਆਂ ਲਈ`;
      if (unit.startsWith('month')) return `${num} ਮਹੀਨਿਆਂ ਲਈ`;
    }
    if (lang === 'bn') {
      if (unit.startsWith('day')) return `${num} দিনের জন্য`;
      if (unit.startsWith('week')) return `${num} সপ্তাহের জন্য`;
      if (unit.startsWith('month')) return `${num} মাসের জন্য`;
    }
    if (lang === 'mr') {
      if (unit.startsWith('day')) return `${num} दिवसांसाठी`;
      if (unit.startsWith('week')) return `${num} आठवड्यांसाठी`;
      if (unit.startsWith('month')) return `${num} महिन्यांसाठी`;
    }
    if (lang === 'es') {
      if (unit.startsWith('day')) return `Por ${num} días`;
      if (unit.startsWith('week')) return `Por ${num} semanas`;
      if (unit.startsWith('month')) return `Por ${num} meses`;
    }
  }
  if (lang === 'hi') return 'पर्चे पर लिखे अनुसार';
  if (lang === 'pa') return 'ਪਰਚੇ ਅਨੁਸਾਰ';
  if (lang === 'bn') return 'প্রেসক্রিপশন অনুযায়ী';
  if (lang === 'mr') return 'प्रिस्क्रिप्शननुसार';
  if (lang === 'es') return 'Según indicación';
  return durationText;
}

export function translateFollowUp(followUpText, lang) {
  if (lang === 'hi') return 'दवाइयों को नियमित समय पर लें और 30 दिन बाद या आवश्यकतानुसार डॉक्टर से परामर्श लें।';
  if (lang === 'pa') return 'ਦਵਾਈਆਂ ਸਮੇਂ ਸਿਰ ਲਵੋ ਅਤੇ 30 ਦਿਨ ਬਾਅਦ ਜਾਂ ਲੋੜ ਪੈਣ ਤੇ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਜ਼ਰੂਰ ਲਵੋ।';
  if (lang === 'bn') return 'নিয়মিত ওষুধ সেবন করুন এবং ৩০ দিন পর বা প্রয়োজনে ডাক্তারের পরামর্শ নিন।';
  if (lang === 'mr') return 'औषधे वेळेवर घ्या आणि ३० दिवसांनंतर किंवा आवश्यकतेनुसार डॉक्टरांचा सल्ला घ्या.';
  if (lang === 'es') return 'Tome los medicamentos a tiempo y consulte a su médico según sea necesario.';
  return followUpText || 'Follow prescribed dosage and consult your physician.';
}

export function translateImpression(impressionText, lang, hasAbnormals) {
  if (lang === 'hi') {
    return hasAbnormals
      ? 'दस्तावेज़ में कुछ महत्वपूर्ण जांच मान सामान्य सीमा से भिन्न हैं। डॉक्टर द्वारा निर्देशित दवाएं और आहार नियम अपनाएं।'
      : 'दस्तावेज़ के सभी जांच परिणाम सामान्य संदर्भ सीमा के भीतर हैं।';
  }
  if (lang === 'pa') {
    return hasAbnormals
      ? 'ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਕੁਝ ਜਾਂਚਾਂ ਵਿੱਚ ਫ਼ਰਕ ਹੈ। ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਅਨੁਸਾਰ ਦਵਾਈਆਂ ਅਤੇ ਖੁਰਾਕ ਨਿਯਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ।'
      : 'ਦਸਤਾਵੇਜ਼ ਦੇ ਸਾਰੇ ਨਤੀਜੇ ਆਮ ਸੀਮਾ ਦੇ ਅੰਦਰ ਹਨ।';
  }
  if (lang === 'bn') {
    return hasAbnormals
      ? 'নথিতে কিছু পরীক্ষার ফলাফল স্বাভাবিক সীমার বাইরে রয়েছে। চিকিৎসকের পরামর্শ মেনে চলুন।'
      : 'নথির সমস্ত পরীক্ষার ফলাফল স্বাভাবিক সীমার মধ্যে রয়েছে।';
  }
  if (lang === 'mr') {
    return hasAbnormals
      ? 'दस्तऐवजातील काही चाचणी निकाल सामान्य मर्यादेपेक्षा वेगळे आहेत. डॉक्टरांचा सल्ला पाळा.'
      : 'दस्तऐवजातील सर्व चाचणी निकाल सामान्य मर्यादेत आहेत.';
  }
  if (lang === 'es') {
    return hasAbnormals
      ? 'El documento muestra algunas variaciones respecto a los rangos normales. Siga las indicaciones de su médico.'
      : 'Todos los resultados de las pruebas se encuentran dentro de los rangos normales de referencia.';
  }
  return impressionText;
}

// Complete localized view builder for any medical report
export function getLocalizedReportData(report, lang = 'en') {
  if (!report) return null;

  const statusLevel = report.statusOverview?.level || 'normal';
  const abnormals = (report.keyMetrics || []).filter(m => m.status !== 'normal');

  // Localized Badge Text
  let badgeText = report.statusOverview?.badgeText?.[lang];
  if (!badgeText) {
    if (lang === 'hi') {
      badgeText = abnormals.length > 0 ? `${abnormals.length} ध्यान देने योग्य बदलाव` : 'सामान्य व स्वस्थ रिपोर्ट';
    } else if (lang === 'pa') {
      badgeText = abnormals.length > 0 ? `${abnormals.length} ਧਿਆਨ ਦੇਣ ਯੋਗ ਫ਼ਰਕ` : 'ਸਧਾਰਨ ਤੇ ਤੰਦਰੁਸਤ ਰਿਪੋਰਟ';
    } else if (lang === 'bn') {
      badgeText = abnormals.length > 0 ? `${abnormals.length}টি পরিবর্তন লক্ষ্য করা গেছে` : 'স্বাভাবিক ও সুস্থ রিপোর্ট';
    } else if (lang === 'mr') {
      badgeText = abnormals.length > 0 ? `${abnormals.length} लक्षणीय बदल आढळले` : 'सामान्य व निरोगी अहवाल';
    } else if (lang === 'es') {
      badgeText = abnormals.length > 0 ? `${abnormals.length} Variaciones Detectadas` : 'Informe Saludable / Normal';
    } else {
      badgeText = report.statusOverview?.badgeText?.en || (abnormals.length > 0 ? 'Requires Attention' : 'Healthy / Normal');
    }
  }

  // Localized Doctor Reassurance
  let doctorReassurance = report.statusOverview?.doctorReassurance?.[lang];
  if (!doctorReassurance) {
    if (lang === 'hi') {
      doctorReassurance = abnormals.length > 0
        ? 'चिंता न करें! अधिकांश लैब बदलाव सामान्य और आहार व दवाइयों से आसानी से ठीक हो जाते हैं।'
        : 'आपकी रिपोर्ट में सभी मुख्य घटक सुरक्षित और सामान्य सीमा के भीतर हैं।';
    } else if (lang === 'pa') {
      doctorReassurance = abnormals.length > 0
        ? 'ਚਿੰਤਾ ਨਾ ਕਰੋ! ਜ਼ਿਆਦਾਤਰ ਬਦਲਾਅ ਆਮ ਹੁੰਦੇ ਹਨ ਅਤੇ ਖੁਰਾਕ ਨਾਲ ਆਸਾਨੀ ਨਾਲ ਠੀਕ ਹੋ ਸਕਦੇ ਹਨ।'
        : 'ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਦੇ ਸਾਰੇ ਮੁੱਖ ਟੈਸਟ ਬਿਲਕੁਲ ਸਹੀ ਅਤੇ ਆਮ ਹਨ।';
    } else if (lang === 'bn') {
      doctorReassurance = abnormals.length > 0
        ? 'চিন্তার কিছু নেই! সঠিক খাবার ও ওষুধের মাধ্যমে এগুলো সহজেই নিয়ন্ত্রণ করা সম্ভব।'
        : 'আপনার প্রতিবেদনের সমস্ত প্রধান মান স্বাভাবিক ও স্বাস্থ্যকর রয়েছে।';
    } else if (lang === 'mr') {
      doctorReassurance = abnormals.length > 0
        ? 'काळजी करू नका! बहुतेक बदल सामान्य असतात आणि योग्य आहाराने सहज नियंत्रणात येतात.'
        : 'तुमच्या अहवालातील सर्व मुख्य बाबी सामान्य व सुरक्षित आहेत.';
    } else if (lang === 'es') {
      doctorReassurance = abnormals.length > 0
        ? '¡No se preocupe! La mayoría de las variaciones son comunes y se controlan fácilmente con dieta y suplementos.'
        : 'Todos los parámetros principales de su informe se encuentran en rangos saludables y normales.';
    } else {
      doctorReassurance = report.statusOverview?.doctorReassurance?.en || '';
    }
  }

  // Localized Simplified Summary Bullets
  let summaryBullets = report.simplifiedSummary?.[lang];
  if (!summaryBullets || !summaryBullets.length) {
    if (lang === 'hi') {
      summaryBullets = [
        `दस्तावेज़ मरीज ${report.patient?.name || 'मरीज'} के लिए है, दिनांक ${report.patient?.date || 'हाल ही का'}।`,
        abnormals.length > 0
          ? `रिपोर्ट में ${abnormals.length} टेस्ट में ध्यान देने योग्य बदलाव देखे गए हैं।`
          : 'सभी जांचे गए टेस्ट सामान्य संदर्भ सीमा के भीतर पाए गए हैं।',
        report.originalCard?.prescriptions?.length > 0
          ? `पर्चे में ${report.originalCard.prescriptions.length} दवाएं सुझाई गई हैं। डॉक्टर के निर्देशानुसार समय पर लें।`
          : 'अपने चिकित्सक के संपर्क में रहें और स्वस्थ दिनचर्या का पालन करें।'
      ];
    } else if (lang === 'pa') {
      summaryBullets = [
        `ਇਹ ਦਸਤਾਵੇਜ਼ ਮਰੀਜ਼ ${report.patient?.name || 'ਮਰੀਜ਼'} ਲਈ ਹੈ, ਮਿਤੀ ${report.patient?.date || 'ਹੁਣੇ ਦੀ'}।`,
        abnormals.length > 0
          ? `ਰਿਪੋਰਟ ਵਿੱਚ ${abnormals.length} ਟੈਸਟਾਂ ਵਿੱਚ ਫ਼ਰਕ ਦੇਖਿਆ ਗਿਆ ਹੈ।`
          : 'ਜਾਂਚੇ ਗਏ ਸਾਰੇ ਟੈਸਟ ਆਮ ਸੀਮਾ ਦੇ ਅੰਦਰ ਹਨ।',
        report.originalCard?.prescriptions?.length > 0
          ? `ਪਰਚੇ ਵਿੱਚ ${report.originalCard.prescriptions.length} ਦਵਾਈਆਂ ਲਿਖੀਆਂ ਗਈਆਂ ਹਨ। ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਅਨੁਸਾਰ ਲਵੋ।`
          : 'ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਅਨੁਸਾਰ ਸਿਹਤਮੰਦ ਜੀਵਨ ਸ਼ੈਲੀ ਅਪਣਾਓ।'
      ];
    } else if (lang === 'bn') {
      summaryBullets = [
        `নথিটি রোগী ${report.patient?.name || 'রোগী'}র জন্য, তারিখ: ${report.patient?.date || 'সাম্প্রতিক'}।`,
        abnormals.length > 0
          ? `রিপোর্টে ${abnormals.length}টি পরীক্ষায় তারতম্য লক্ষ্য করা গেছে।`
          : 'সমস্ত পরীক্ষিত সূচক স্বাভাবিক সীমার মধ্যে রয়েছে।',
        'চিকিৎসকের সাথে পরামর্শ করুন এবং স্বাস্থ্যকর খাদ্যাভ্যাস বজায় রাখুন।'
      ];
    } else if (lang === 'mr') {
      summaryBullets = [
        `हा दस्तऐवज रुग्ण ${report.patient?.name || 'रुग्ण'} यांच्यासाठी आहे, दिनांक: ${report.patient?.date || 'नुकतीच'}।`,
        abnormals.length > 0
          ? `अहवालात ${abnormals.length} चाचण्यांमध्ये लक्षणीय बदल आढळले आहेत.`
          : 'सर्व तपासलेले घटक सामान्य मर्यादेत आहेत.',
        'आपल्या डॉक्टरांचा सल्ला घ्या आणि निरोगी जीवनशैलीचे पालन करा.'
      ];
    } else if (lang === 'es') {
      summaryBullets = [
        `Documento para el paciente ${report.patient?.name || 'Paciente'}, con fecha ${report.patient?.date || 'Reciente'}.`,
        abnormals.length > 0
          ? `Se observaron variaciones en ${abnormals.length} parámetro(s) de prueba.`
          : 'Todos los parámetros analizados están dentro de los rangos normales de referencia.',
        'Siga las recomendaciones de su médico y mantenga hábitos saludables.'
      ];
    } else {
      summaryBullets = report.simplifiedSummary?.en || [];
    }
  }

  // Localized Audio Script
  let audioScript = report.audioScript?.[lang];
  if (!audioScript) {
    const patientName = report.patient?.name || 'Patient';
    const date = report.patient?.date || 'recent';
    const rxList = (report.originalCard?.prescriptions || []).map(p => p.medication).join(', ');

    if (lang === 'hi') {
      audioScript = `नमस्ते। यह ${patientName} की मेडिकल रिपोर्ट का सरल विवरण है, दिनांक ${date}। ${
        abnormals.length > 0
          ? `आपकी रिपोर्ट में ${abnormals.length} जांच मान सामान्य सीमा से भिन्न हैं, जिनमें ${abnormals.map(m => m.nameHi || m.name).join(', ')} शामिल हैं। चिंता न करें, ये आहार और नियमित देखभाल से ठीक हो जाते हैं।`
          : 'आपकी रिपोर्ट में सभी मुख्य जांच परिणाम सामान्य और स्वस्थ सीमा के भीतर हैं।'
      } ${
        rxList ? `पर्चे में सुझाई गई दवाएं हैं: ${rxList}। इन्हें डॉक्टर के निर्देशानुसार लें।` : ''
      } अधिक जानकारी के लिए अपने डॉक्टर से संपर्क करें।`;
    } else if (lang === 'pa') {
      audioScript = `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ। ਇਹ ${patientName} ਦੀ ਮੈਡੀਕਲ ਰਿਪੋਰਟ ਦੀ ਆਵਾਜ਼ ਵਿੱਚ ਜਾਣਕਾਰੀ ਹੈ, ਮਿਤੀ ${date}। ${
        abnormals.length > 0
          ? `ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਵਿੱਚ ${abnormals.length} ਟੈਸਟਾਂ ਵਿੱਚ ਫ਼ਰਕ ਹੈ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ${abnormals.map(m => m.namePa || m.name).join(', ')} ਸ਼ਾਮਲ ਹਨ। ਇਹ ਆਸਾਨੀ ਨਾਲ ਸੰਭਾਲਣਯੋਗ ਹਨ।`
          : 'ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਦੇ ਸਾਰੇ ਟੈਸਟ ਬਿਲਕੁਲ ਆਮ ਅਤੇ ਸਹੀ ਹਨ।'
      } ${
        rxList ? `ਪਰਚੇ ਵਿੱਚ ਲਿਖੀਆਂ ਦਵਾਈਆਂ: ${rxList}।` : ''
      } ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਜ਼ਰੂਰ ਲਵੋ।`;
    } else if (lang === 'bn') {
      audioScript = `নমস্কার। এটি ${patientName}-এর মেডিকেল রিপোর্টের সংক্ষিপ্ত বিবরণ, তারিখ ${date}। ${
        abnormals.length > 0
          ? `আপনার রিপোর্টে ${abnormals.length}টি পরীক্ষায় কিছুটা পরিবর্তন দেখা গেছে। যথাযথ পরামর্শের মাধ্যমে এটি নিয়ন্ত্রণ সম্ভব।`
          : 'আপনার রিপোর্টের সমস্ত সূচক স্বাভাবিক ও সুস্থ রয়েছে।'
      } সবসময় চিকিৎসকের পরামর্শ মেনে চলুন।`;
    } else if (lang === 'mr') {
      audioScript = `नमस्कार. हा ${patientName} यांच्या वैद्यकीय अहवालाचा ऑडिओ सारांश आहे, तारीख ${date}. ${
        abnormals.length > 0
          ? `आपल्या अहवालात ${abnormals.length} चाचण्यांमध्ये बदल दिसून आले आहेत. योग्य आहाराने हे सहज बरे होऊ शकते.`
          : 'आपल्या अहवालातील सर्व घटक सुरक्षित व सामान्य मर्यादेत आहेत.'
      } आपल्या डॉक्टरांचा सल्ला नक्की घ्या.`;
    } else if (lang === 'es') {
      audioScript = `Hola. Este es el resumen médico para ${patientName}, con fecha ${date}. ${
        abnormals.length > 0
          ? `Su informe muestra variaciones en ${abnormals.length} parámetro(s). Con el tratamiento adecuado, se controlan fácilmente.`
          : 'Todos los valores principales de su análisis se encuentran en rangos saludables.'
      } ${
        rxList ? `Medicamentos recetados: ${rxList}.` : ''
      } Consulte siempre a su médico tratante.`;
    } else {
      audioScript = report.audioScript?.en || '';
    }
  }

  // Localized Actionable Steps
  let actionableSteps = report.actionableSteps?.[lang];
  if (!actionableSteps || !actionableSteps.length) {
    if (lang === 'hi') {
      actionableSteps = [
        { title: 'संतुलित आहार व पोषण', desc: 'हरी पत्तेदार सब्जियां, फल और पर्याप्त पानी लें।', category: 'diet' },
        { title: 'दवाइयों का नियमित सेवन', desc: 'डॉक्टर द्वारा लिखी गई दवाएं समय पर लें।', category: 'medical' },
        { title: 'डॉक्टर से परामर्श', desc: 'आवश्यकतानुसार 30 दिनों में दोबारा जांच कराएं।', category: 'lifestyle' }
      ];
    } else if (lang === 'pa') {
      actionableSteps = [
        { title: 'ਸੰਤੁਲਿਤ ਖੁਰਾਕ', desc: 'ਹਰੀਆਂ ਸਬਜ਼ੀਆਂ ਅਤੇ ਫਲ ਖਾਓ ਅਤੇ ਪਾਣੀ ਵੱਧ ਪੀਓ।', category: 'diet' },
        { title: 'ਦਵਾਈਆਂ ਸਮੇਂ ਸਿਰ ਲਵੋ', desc: 'ਡਾਕਟਰ ਦੀਆਂ ਦੱਸੀਆਂ ਦਵਾਈਆਂ ਨਿਯਮਿਤ ਲਵੋ।', category: 'medical' },
        { title: 'ਡਾਕਟਰੀ ਸਲਾਹ', desc: 'ਲੋੜ ਅਨੁਸਾਰ ਦੁਬਾਰਾ ਜਾਂਚ ਕਰਵਾਓ।', category: 'lifestyle' }
      ];
    } else if (lang === 'bn') {
      actionableSteps = [
        { title: 'সুষম খাদ্য গ্রহণ', desc: 'পুষ্টিকর খাদ্য ও পর্যাপ্ত জল পান করুন।', category: 'diet' },
        { title: 'নিয়মিত ওষুধ সেবন', desc: 'প্রেসক্রিপশন অনুযায়ী ওষুধ খান।', category: 'medical' }
      ];
    } else if (lang === 'mr') {
      actionableSteps = [
        { title: 'संतुलित आहार', desc: 'हिरव्या पालेभाज्या व पुरेसे पाणी प्या.', category: 'diet' },
        { title: 'औषधांचे वेळेवर सेवन', desc: 'डॉक्टरांच्या सल्ल्यानुसार औषधे घ्या.', category: 'medical' }
      ];
    } else if (lang === 'es') {
      actionableSteps = [
        { title: 'Dieta Equilibrada', desc: 'Consuma alimentos ricos en nutrientes e hidrátese bien.', category: 'diet' },
        { title: 'Medicamentos a Tiempo', desc: 'Tome los medicamentos recetados puntualmente.', category: 'medical' }
      ];
    } else {
      actionableSteps = report.actionableSteps?.en || [];
    }
  }

  // Localized Key Metrics
  const keyMetrics = (report.keyMetrics || []).map((metric) => {
    let displayName = metric.name;
    if (lang === 'hi' && metric.nameHi) displayName = metric.nameHi;
    else if (lang === 'pa' && metric.namePa) displayName = metric.namePa;

    let explanationText = metric.explanation?.[lang] || metric.explanation?.en || '';
    let badgeLabel = metric.badge?.[lang] || metric.badge?.en;

    if (!badgeLabel) {
      if (metric.status === 'low') badgeLabel = lang === 'hi' ? 'कम' : lang === 'pa' ? 'ਘੱਟ' : lang === 'es' ? 'Bajo' : 'Low';
      else if (metric.status === 'high') badgeLabel = lang === 'hi' ? 'अधिक' : lang === 'pa' ? 'ਵੱਧ' : lang === 'es' ? 'Alto' : 'High';
      else badgeLabel = lang === 'hi' ? 'सामान्य' : lang === 'pa' ? 'ਆਮ' : lang === 'es' ? 'Normal' : 'Normal';
    }

    let spokenCardText = metric.spokenCardText?.[lang];
    if (!spokenCardText) {
      if (lang === 'hi') {
        spokenCardText = `${displayName}: आपका स्तर ${metric.displayValue} है। सामान्य स्तर ${metric.normalRange} है।`;
      } else if (lang === 'pa') {
        spokenCardText = `${displayName}: ਤੁਹਾਡਾ ਪੱਧਰ ${metric.displayValue} ਹੈ। ਆਮ ਸੀਮਾ ${metric.normalRange} ਹੈ।`;
      } else if (lang === 'bn') {
        spokenCardText = `${displayName}: ফলাফল ${metric.displayValue}। স্বাভাবিক সীমা ${metric.normalRange}।`;
      } else if (lang === 'mr') {
        spokenCardText = `${displayName}: निकाल ${metric.displayValue} आहे. सामान्य मर्यादा ${metric.normalRange} आहे.`;
      } else if (lang === 'es') {
        spokenCardText = `${displayName}: el resultado es ${metric.displayValue}, rango normal ${metric.normalRange}.`;
      } else {
        spokenCardText = `${metric.name}: observed value is ${metric.displayValue}, normal range ${metric.normalRange}.`;
      }
    }

    return {
      ...metric,
      displayName,
      explanationText,
      badgeLabel,
      spokenCardText
    };
  });

  return {
    badgeText,
    doctorReassurance,
    summaryBullets,
    audioScript,
    actionableSteps,
    keyMetrics
  };
}
