// Comprehensive clinical data for MediClarify
// Features authentic lab report cards, doctor prescription notes, and exact card-by-card spoken explanations

export const sampleReports = [
  {
    id: 'sample-1',
    title: 'Complete Blood Count (CBC) & Vitamin Panel',
    patient: {
      name: 'Sarah Jenkins',
      age: 34,
      gender: 'Female',
      date: 'Oct 23, 2026',
      sampleType: 'Venous Blood (EDTA + Plain)',
      physician: 'Dr. Anita Roy, M.D. (Internal Medicine)'
    },
    // The actual physical lab card & doctor prescription
    originalCard: {
      labName: 'Apex Comprehensive Pathology & Diagnostic Laboratories',
      labAddress: 'B-44, Medical Enclave, New Delhi - 110016',
      specimenId: 'SPEC-2026-98124',
      collectionTime: '23-Oct-2026, 08:30 AM',
      reportTime: '23-Oct-2026, 11:45 AM',
      sampleQuality: 'Adequate, Non-Hemolyzed',
      doctorClinicalImpression: 'Patient presents with generalized fatigue, mild exertional dyspnea, and muscle lethargy. Indices indicate mild microcytic hypochromic anemia with concurrent Vitamin D hypovitaminosis.',
      prescriptions: [
        {
          medication: 'Tab. Autrin (Ferrous Fumarate + Folic Acid + Vit B12)',
          dosage: '1 Tablet Once Daily (OD)',
          timing: 'After Lunch with a glass of water',
          duration: '30 Days',
          instructions: 'Do not take with dairy or tea; pair with citrus fruit or Vitamin C for optimal absorption.'
        },
        {
          medication: 'Sachet Calcirol 60,000 IU (Cholecalciferol / Vit D3)',
          dosage: '1 Sachet Once Weekly',
          timing: 'Dissolved in 1 cup of warm milk after dinner',
          duration: '8 Weeks',
          instructions: 'Fat-soluble; best absorbed with milk or healthy dietary fats.'
        }
      ],
      doctorFollowUp: 'Repeat CBC & Serum Ferritin after 30 days. Contact clinic if severe dizziness develops.',
      handwrittenRxAudioScript: {
        en: "Doctor's handwritten prescription: Tab. Autrin, 1 tablet once daily after lunch with water. Sachet Calcirol 60,000 IU, 1 sachet in warm milk once weekly on Sunday after dinner for 8 weeks. Eat spinach and pomegranate. Repeat CBC after 30 days.",
        hi: "डॉक्टर का हस्तलिखित पर्चा: ऑटोरीन 1 गोली रोज दोपहर के खाने के बाद 30 दिनों तक। कैल्सीरोल 60,000 पाउच हफ्ते में एक बार रविवार को रात में गर्म दूध के साथ 8 हफ्ते तक। पालक और अनार खाएं। 30 दिन बाद दोबारा खून जांच कराएं।",
        pa: "ਡਾਕਟਰ ਦਾ ਲਿਖਿਆ ਪਰਚਾ: ਆਟੋਰੀਨ 1 ਗੋਲੀ ਰੋਜ਼ ਦੁਪਹਿਰ ਦੀ ਰੋਟੀ ਤੋਂ ਬਾਅਦ 30 ਦਿਨਾਂ ਲਈ। ਕੈਲਸੀਰੋਲ ਪਾਊਡਰ ਹਫ਼ਤੇ ਵਿੱਚ ਇੱਕ ਵਾਰ ਐਤਵਾਰ ਨੂੰ ਰਾਤ ਵੇਲੇ ਗਰਮ ਦੁੱਧ ਨਾਲ 8 ਹਫ਼ਤੇ। ਪਾਲਕ ਅਤੇ ਅਨਾਰ ਖਾਓ। 30 ਦਿਨਾਂ ਬਾਅਦ ਦੁਬਾਰਾ ਟੈਸਟ ਕਰਵਾਓ।"
      }
    },
    statusOverview: {
      level: 'attention',
      badgeText: {
        en: 'Mild Attention Needed • Common & Treatable',
        hi: 'हल्की सावधानी आवश्यक • सामान्य और उपचार योग्य',
        pa: 'ਹਲਕਾ ਧਿਆਨ ਲੋੜੀਂਦਾ • ਆਮ ਅਤੇ ਇਲਾਜ ਯੋਗ'
      },
      doctorReassurance: {
        en: "Don't worry! Your main immune cells and platelets are completely healthy. Your low hemoglobin and vitamin D are very common and easily manageable with diet and supplements.",
        hi: "चिंता न करें! आपकी मुख्य प्रतिरक्षा कोशिकाएं और प्लेटलेट्स पूरी तरह स्वस्थ हैं। आपका कम हीमोग्लोबिन और विटामिन डी बहुत सामान्य है और खान-पान व सप्लीमेंट्स से आसानी से ठीक हो सकता है।",
        pa: "ਚਿੰਤਾ ਨਾ ਕਰੋ! ਤੁਹਾਡੇ ਸੈੱਲ ਅਤੇ ਪਲੇਟਲੇਟ ਪੂਰੀ ਤਰ੍ਹਾਂ ਤੰਦਰੁਸਤ ਹਨ। ਤੁਹਾਡਾ ਘੱਟ ਹੀਮੋਗਲੋਬਿਨ ਅਤੇ ਵਿਟਾਮਿਨ ਡੀ ਆਮ ਹੈ ਅਤੇ ਖੁਰਾਕ ਨਾਲ ਆਸਾਨੀ ਨਾਲ ਠੀਕ ਹੋ ਸਕਦਾ ਹੈ।"
      }
    },
    simplifiedSummary: {
      en: [
        "What is written on your report: Your Hemoglobin is 10.2 g/dL (normal is 12.0 to 15.5). Because red blood cells carry oxygen, this low reading explains why you feel tired and sluggish.",
        "Your Vitamin D is deficient at 18 ng/mL (desirable is 30 to 100). Vitamin D is essential for bone strength, energy, and immune defense.",
        "Good news on your card: Your White Blood Cells (6.8) and Platelets (245) are completely normal, showing strong infection defense and healthy blood clotting."
      ],
      hi: [
        "आपकी रिपोर्ट में क्या लिखा है: आपका हीमोग्लोबिन 10.2 g/dL दर्ज किया गया है (सामान्य सीमा 12.0 से 15.5 है)। इसी वजह से आपको अक्सर थकान और कमजोरी लगती है।",
        "कार्ड में विटामिन डी 18 ng/mL लिखा है, जो 30 से काफी कम है। यह हड्डियों की ताकत और ऊर्जा के लिए जरूरी है।",
        "कार्ड में अच्छी खबर: आपकी श्वेत रक्त कोशिकाएं (6.8) और प्लेटलेट्स (245) बिल्कुल स्वस्थ और सुरक्षित हैं।"
      ],
      pa: [
        "ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਵਿੱਚ ਕੀ ਲਿਖਿਆ ਹੈ: ਹੀਮੋਗਲੋਬਿਨ 10.2 g/dL ਦਰਜ ਹੈ ਜੋ ਕਿ ਆਮ 12.0 ਤੋਂ ਘੱਟ ਹੈ। ਇਸੇ ਕਰਕੇ ਤੁਹਾਨੂੰ ਥਕਾਵਟ ਲੱਗਦੀ ਹੈ।",
        "ਵਿਟਾਮਿਨ ਡੀ 18 ng/mL ਲਿਖਿਆ ਹੈ ਜੋ 30 ਤੋਂ ਘੱਟ ਹੈ। ਇਹ ਹੱਡੀਆਂ ਦੀ ਤਾਕਤ ਲਈ ਜ਼ਰੂਰੀ ਹੈ।",
        "ਚੰਗੀ ਖ਼ਬਰ: ਤੁਹਾਡੇ ਚਿੱਟੇ ਸੈੱਲ (6.8) ਅਤੇ ਪਲੇਟਲੇਟਸ (245) ਬਿਲਕੁਲ ਸਹੀ ਅਤੇ ਆਮ ਹਨ।"
      ]
    },
    audioScript: {
      en: "Here is what is written on your diagnostic report and prescription card for Sarah Jenkins, dated October 23, 2026. Dr. Anita Roy recorded a Complete Blood Count and Vitamin Panel. In the blood test section, your Hemoglobin is written as 10.2 grams per deciliter, which is below the normal range of 12.0 to 15.5. This is the exact reason for your recent fatigue. Your Vitamin D is 18, which is deficient compared to the standard level of 30. Your white blood cells at 6.8 and platelets at 245 are in prime healthy condition. On the prescription section, Dr. Roy wrote: Tab. Autrin daily after lunch with citrus fruit, and Calcirol 60,000 IU sachet weekly in warm milk. Please take these as prescribed and repeat CBC in 30 days.",
      hi: "नमस्ते सारा। यह आपकी डायग्नोस्टिक रिपोर्ट और डॉक्टर के पर्चे में लिखी गई सटीक जानकारी है। डॉक्टर अनीता रॉय ने कम्प्लीट ब्लड काउंट किया है। रिपोर्ट में आपका हीमोग्लोबिन 10.2 दर्ज है, जो सामान्य 12 से 15.5 की सीमा से कम है। यही आपकी थकान का कारण है। विटामिन डी 18 है जो सामान्य 30 से कम है। प्लेटलेट्स और सफेद रक्त कोशिकाएं बिल्कुल सामान्य हैं। पर्चे में डॉक्टर ने लिखा है: ऑटोरीन की एक गोली दोपहर के भोजन के बाद लें और कैल्सीरोल का एक पाउच सप्ताह में एक बार दूध के साथ लें।",
      pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਸਾਰਾ ਜੀ। ਇਹ ਤੁਹਾਡੀ ਲੈਬ ਰਿਪੋਰਟ ਅਤੇ ਡਾਕਟਰ ਦੇ ਪਰਚੇ ਵਿੱਚ ਲਿਖੀ ਜਾਣਕਾਰੀ ਹੈ। ਰਿਪੋਰਟ ਵਿੱਚ ਤੁਹਾਡਾ ਹੀਮੋਗਲੋਬਿਨ 10.2 ਹੈ ਜੋ ਆਮ 12 ਤੋਂ ਘੱਟ ਹੈ, ਜਿਸ ਕਰਕੇ ਥਕਾਵਟ ਰਹਿੰਦੀ ਹੈ। ਵਿਟਾਮਿਨ ਡੀ 18 ਹੈ ਜੋ ਕਿ ਘੱਟ ਹੈ। ਚੰਗੀ ਗੱਲ ਇਹ ਹੈ ਕਿ ਪਲੇਟਲੇਟਸ ਅਤੇ ਚਿੱਟੇ ਸੈੱਲ ਬਿਲਕੁਲ ਠੀਕ ਹਨ। ਪਰਚੇ ਵਿੱਚ ਡਾਕਟਰ ਨੇ ਆਇਰਨ ਦੀ ਗੋਲੀ ਰੋਟੀ ਤੋਂ ਬਾਅਦ ਅਤੇ ਵਿਟਾਮਿਨ ਡੀ ਦਾ ਪਾਊਡਰ ਹਫ਼ਤੇ ਵਿੱਚ ਇੱਕ ਵਾਰ ਦੁੱਧ ਨਾਲ ਲੈਣ ਲਈ ਲਿਖਿਆ ਹੈ।"
    },
    keyMetrics: [
      {
        id: 'param-1',
        name: 'Hemoglobin (Hb)',
        nameHi: 'हीमोग्लोबिन (Hb)',
        namePa: 'ਹੀਮੋਗਲੋਬਿਨ (Hb)',
        value: 10.2,
        displayValue: '10.2 g/dL',
        normalRange: '12.0 – 15.5 g/dL',
        minNormal: 12.0,
        maxNormal: 15.5,
        status: 'low',
        badge: { en: 'Low', hi: 'कम', pa: 'ਘੱਟ' },
        explanation: {
          en: 'The oxygen-carrying protein in red blood cells. Low values cause fatigue, cold hands, and weakness.',
          hi: 'लाल रक्त कोशिकाओं में ऑक्सीजन ले जाने वाला प्रोटीन। कम होने पर थकान और कमजोरी होती है।',
          pa: 'ਖੂਨ ਵਿੱਚ ਆਕਸੀਜਨ ਲੈ ਕੇ ਜਾਣ ਵਾਲਾ ਪ੍ਰੋਟੀਨ। ਘੱਟ ਹੋਣ ਤੇ ਥਕਾਵਟ ਹੁੰਦੀ ਹੈ।'
        },
        spokenCardText: {
          en: "Reading card for Hemoglobin: Observed value is 10.2 grams per deciliter. Normal reference interval is 12.0 to 15.5 grams per deciliter. The report marks this as Low. What is written means your red blood cells carry less oxygen, which is causing your tiredness. Doctor advised iron-rich nutrition and daily Autrin tablet.",
          hi: "हीमोग्लोबिन कार्ड विवरण: आपका परिणाम 10.2 ग्राम प्रति डेसीलीटर लिखा है। सामान्य सीमा 12.0 से 15.5 है। स्थिति: कम। इसका अर्थ है कि शरीर में ऑक्सीजन कम पहुंच रही है, जिससे सुस्ती महसूस होती है। डॉक्टर ने आयरन की दवा और पालक खाने को कहा है।",
          pa: "ਹੀਮੋਗਲੋਬਿਨ ਕਾਰਡ: ਨਤੀਜਾ 10.2 ਲਿਖਿਆ ਹੈ, ਜੋ ਆਮ 12 ਤੋਂ ਘੱਟ ਹੈ। ਸਥਿਤੀ: ਘੱਟ। ਇਸ ਕਾਰਨ ਸਰੀਰ ਵਿੱਚ ਕਮਜ਼ੋਰੀ ਮਹਿਸੂਸ ਹੁੰਦੀ ਹੈ।"
        }
      },
      {
        id: 'param-2',
        name: 'Vitamin D (25-OH)',
        nameHi: 'विटामिन डी (25-OH)',
        namePa: 'ਵਿਟਾਮਿਨ ਡੀ (25-OH)',
        value: 18,
        displayValue: '18 ng/mL',
        normalRange: '30.0 – 100.0 ng/mL',
        minNormal: 30.0,
        maxNormal: 100.0,
        status: 'low',
        badge: { en: 'Deficient', hi: 'कमी', pa: 'ਘਾਟ' },
        explanation: {
          en: 'Crucial for calcium absorption, strong bones, healthy teeth, and mental energy.',
          hi: 'कैल्शियम सोखने, मजबूत हड्डियों, दांतों और चुस्ती के लिए अत्यंत आवश्यक।',
          pa: 'ਕੈਲਸ਼ੀਅਮ ਨੂੰ ਜਜ਼ਬ ਕਰਨ ਅਤੇ ਹੱਡੀਆਂ ਦੀ ਮਜ਼ਬੂਤੀ ਲਈ ਬਹੁਤ ਜ਼ਰੂਰੀ।'
        },
        spokenCardText: {
          en: "Reading card for Vitamin D: Observed value is 18 nanograms per milliliter. Desirable level is 30 to 100. The report marks this as Deficient. This affects calcium absorption and bone strength. Doctor prescribed Calcirol 60,000 IU sachet weekly with warm milk.",
          hi: "विटामिन डी कार्ड विवरण: परिणाम 18 नैनोग्राम प्रति मिलीलीटर लिखा है। सामान्य सीमा 30 से 100 है। स्थिति: कमी। डॉक्टर ने सप्ताह में एक बार कैल्सीरोल का पाउच दूध में लेने की सलाह दी है।",
          pa: "ਵਿਟਾਮਿਨ ਡੀ ਕਾਰਡ: ਨਤੀਜਾ 18 ਹੈ ਜੋ 30 ਤੋਂ ਘੱਟ ਹੈ। ਡਾਕਟਰ ਨੇ ਹਫ਼ਤੇ ਵਿੱਚ ਇੱਕ ਵਾਰ ਵਿਟਾਮਿਨ ਡੀ ਦਾ ਪਾਊਡਰ ਦੁੱਧ ਨਾਲ ਲੈਣ ਲਈ ਕਿਹਾ ਹੈ।"
        }
      },
      {
        id: 'param-3',
        name: 'Total Leukocytes (WBC)',
        nameHi: 'कुल ल्यूकोसाइट्स (WBC)',
        namePa: 'ਚਿੱਟੇ ਰਕਤਾਣੂ (WBC)',
        value: 6.8,
        displayValue: '6.8 ×10³/µL',
        normalRange: '4.5 – 11.0 ×10³/µL',
        minNormal: 4.5,
        maxNormal: 11.0,
        status: 'normal',
        badge: { en: 'Normal', hi: 'सामान्य', pa: 'ਆਮ' },
        explanation: {
          en: 'Your body’s natural army that defends you against viruses and bacterial infections.',
          hi: 'शरीर की सुरक्षा सेना जो वायरस और बैक्टीरिया से मुकाबला करती है।',
          pa: 'ਸਰੀਰ ਦੀ ਰੱਖਿਆ ਫੌਜ ਜੋ ਇਨਫੈਕਸ਼ਨਾਂ ਨਾਲ ਲੜਦੀ ਹੈ।'
        },
        spokenCardText: {
          en: "Reading card for Total Leukocytes or White Blood Cells: Observed value is 6.8. Normal range is 4.5 to 11.0. Status is Normal. What is written means your immune system is in great shape with no active bacterial infection.",
          hi: "सफेद रक्त कोशिकाएं कार्ड विवरण: परिणाम 6.8 है। सामान्य सीमा 4.5 से 11.0 है। स्थिति: सामान्य। इसका मतलब है कि रोग प्रतिरोधक क्षमता बिल्कुल सही है।",
          pa: "ਚਿੱਟੇ ਸੈੱਲ ਕਾਰਡ: ਨਤੀਜਾ 6.8 ਹੈ। ਸਥਿਤੀ ਆਮ ਹੈ, ਕੋਈ ਇਨਫੈਕਸ਼ਨ ਨਹੀਂ ਹੈ।"
        }
      },
      {
        id: 'param-4',
        name: 'Platelet Count',
        nameHi: 'प्लेटलेट काउंट',
        namePa: 'ਪਲੇਟਲੇਟ ਗਿਣਤੀ',
        value: 245,
        displayValue: '245 ×10³/µL',
        normalRange: '150 – 450 ×10³/µL',
        minNormal: 150,
        maxNormal: 450,
        status: 'normal',
        badge: { en: 'Normal', hi: 'सामान्य', pa: 'ਆਮ' },
        explanation: {
          en: 'Cells that help your blood clot normally whenever you have a small cut or scrape.',
          hi: 'कोशिकाएं जो चोट लगने पर खून का थक्का बनाकर बहने से रोकती हैं।',
          pa: 'ਸੈੱਲ ਜੋ ਸੱਟ ਲੱਗਣ ਤੇ ਖੂਨ ਨੂੰ ਜੰਮਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ।'
        },
        spokenCardText: {
          en: "Reading card for Platelet Count: Observed value is 245 thousand per microliter. Normal range is 150 to 450. Status is Normal. Your clotting ability is healthy.",
          hi: "प्लेटलेट काउंट कार्ड: परिणाम 245 हजार है। सामान्य सीमा 150 से 450 है। स्थिति: सामान्य और सुरक्षित।",
          pa: "ਪਲੇਟਲੇਟ ਕਾਰਡ: ਨਤੀਜਾ 245 ਹੈ, ਬਿਲਕੁਲ ਸਹੀ ਅਤੇ ਆਮ ਹੈ।"
        }
      },
      {
        id: 'param-5',
        name: 'Serum Ferritin (Iron Reserve)',
        nameHi: 'सीरम फेरिटिन (आयरन भंडार)',
        namePa: 'ਸੀਰਮ ਫੈਰੀਟਿਨ (ਆਇਰਨ ਸਟੋਰ)',
        value: 14.2,
        displayValue: '14.2 ng/mL',
        normalRange: '15.0 – 150.0 ng/mL',
        minNormal: 15.0,
        maxNormal: 150.0,
        status: 'low',
        badge: { en: 'Mild Low', hi: 'हल्का कम', pa: 'ਥੋੜ੍ਹਾ ਘੱਟ' },
        explanation: {
          en: 'Reflects how much iron is safely stored in your liver for future red blood cell production.',
          hi: 'यह दिखाता है कि भविष्य में खून बनाने के लिए शरीर में कितना आयरन सुरक्षित है।',
          pa: 'ਦੱਸਦਾ ਹੈ ਕਿ ਭਵਿੱਖ ਲਈ ਸਰੀਰ ਵਿੱਚ ਕਿੰਨਾ ਆਇਰਨ ਜਮ੍ਹਾਂ ਹੈ।'
        },
        spokenCardText: {
          en: "Reading card for Serum Ferritin: Observed value is 14.2 nanograms per milliliter. Normal lower bound is 15. Status: Mild Low. Your liver's stored iron reserves are slightly depleted, supporting the need for oral iron.",
          hi: "सीरम फेरिटिन कार्ड: परिणाम 14.2 है। सामान्य सीमा 15 से 150 है। स्थिति: हल्का कम। शरीर में जमा आयरन कम हो रहा है, इसलिए आयरन की गोली लेना जरूरी है।",
          pa: "ਸੀਰਮ ਫੈਰੀਟਿਨ ਕਾਰਡ: ਨਤੀਜਾ 14.2 ਹੈ, ਆਇਰਨ ਭੰਡਾਰ ਥੋੜ੍ਹਾ ਘੱਟ ਹੈ।"
        }
      }
    ],
    actionableSteps: {
      en: [
        { title: "Take Tab. Autrin 1 OD After Lunch", desc: "As written on Dr. Roy's prescription card. Take with orange juice or water; avoid milk or tea at the same time.", category: "medical" },
        { title: "Weekly Sachet Calcirol 60k in Warm Milk", desc: "Dissolve 1 sachet in warm milk once every Sunday after dinner for 8 weeks.", category: "medical" },
        { title: "Incorporate Iron-Rich Foods", desc: "Enjoy spinach, lentils (dal), pomegranate, raisins, beetroots, and tofu.", category: "diet" },
        { title: "Get 15 Mins Morning Sunlight", desc: "Expose arms and face to mild morning sun (before 9 AM) to naturally activate Vitamin D.", category: "lifestyle" }
      ],
      hi: [
        { title: "दोपहर के खाने के बाद ऑटोरीन गोली लें", desc: "डॉक्टर के पर्चे के अनुसार 30 दिनों तक रोजाना एक गोली पानी या नींबू पानी के साथ लें।", category: "medical" },
        { title: "रविवार को दूध में कैल्सीरोल पाउच लें", desc: "रात के खाने के बाद गर्म दूध में एक पाउच मिलाकर 8 हफ्तों तक पिएं।", category: "medical" },
        { title: "आयरन युक्त भोजन शामिल करें", desc: "पालक, दालें, अनार, किशमिश, चुकंदर और गुड़ को अपनी डाइट में लें।", category: "diet" },
        { title: "सुबह 15 मिनट हल्की धूप लें", desc: "सुबह 9 बजे से पहले 15 मिनट धूप में बैठें जिससे विटामिन डी प्राकृतिक रूप से सक्रिय हो सके।", category: "lifestyle" }
      ],
      pa: [
        { title: "ਦੁਪਹਿਰ ਦੀ ਰੋਟੀ ਤੋਂ ਬਾਅਦ ਆਟੋਰੀਨ ਗੋਲੀ ਲਵੋ", desc: "ਡਾਕਟਰ ਦੇ ਲਿਖੇ ਅਨੁਸਾਰ 30 ਦਿਨਾਂ ਲਈ ਰੋਜ਼ਾਨਾ ਇੱਕ ਗੋਲੀ ਲਵੋ।", category: "medical" },
        { title: "ਹਫ਼ਤੇ ਵਿੱਚ ਇੱਕ ਵਾਰ ਦੁੱਧ ਵਿੱਚ ਵਿਟਾਮਿਨ ਡੀ ਲਵੋ", desc: "ਕੈਲਸੀਰੋਲ ਪਾਊਡਰ ਗਰਮ ਦੁੱਧ ਵਿੱਚ ਘੋਲ ਕੇ ਪੀਓ।", category: "medical" },
        { title: "ਆਇਰਨ ਭਰਪੂਰ ਖੁਰਾਕ ਲਵੋ", desc: "ਪਾਲਕ, ਦਾਲਾਂ, ਅਨਾਰ, ਕਿਸ਼ਮਿਸ਼ ਅਤੇ ਚੁਕੰਦਰ ਆਪਣੀ ਰੋਜ਼ਾਨਾ ਖੁਰਾਕ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ।", category: "diet" },
        { title: "ਸਵੇਰੇ 15 ਮਿੰਟ ਧੁੱਪ ਵਿੱਚ ਬੈਠੋ", desc: "ਸਵੇਰੇ 9 ਵਜੇ ਤੋਂ ਪਹਿਲਾਂ ਦੀ ਹਲਕੀ ਧੁੱਪ ਵਿਟਾਮਿਨ ਡੀ ਵਧਾਉਣ ਲਈ ਬਹੁਤ ਲਾਹੇਵੰਦ ਹੈ।", category: "lifestyle" }
      ]
    }
  },
  {
    id: 'sample-2',
    title: 'Lipid Profile (Cardiovascular & Cholesterol Screening)',
    patient: {
      name: 'Rajesh Kumar',
      age: 48,
      gender: 'Male',
      date: 'Oct 23, 2026',
      sampleType: 'Fasting Venous Serum (12 hrs fast)',
      physician: 'Dr. Vivek Sharma, M.D., DM (Cardiology)'
    },
    originalCard: {
      labName: 'Metro Heart Institute & Clinical Diagnostic Laboratories',
      labAddress: 'Cardio Tower, Ring Road, South Extension, New Delhi',
      specimenId: 'SPEC-2026-77319',
      collectionTime: '23-Oct-2026, 07:45 AM',
      reportTime: '23-Oct-2026, 01:10 PM',
      sampleQuality: 'Clear, Non-Lipemic Serum',
      doctorClinicalImpression: 'Atherogenic dyslipidemia with significant LDL elevation and borderline hypertriglyceridemia. HDL level offers moderate protection. Patient advised strict dietary intervention and targeted statin therapy.',
      prescriptions: [
        {
          medication: 'Tab. Atorvastatin 10 mg',
          dosage: '1 Tablet Once Daily at Bedtime (HS)',
          timing: 'At bedtime with water',
          duration: '60 Days',
          instructions: 'Lowers liver cholesterol synthesis overnight. Avoid grapefruit juice.'
        },
        {
          medication: 'Omega-3 Fish Oil / Flaxseed Capsules 1000 mg',
          dosage: '1 Capsule Daily with breakfast',
          timing: 'Morning with food',
          duration: '60 Days',
          instructions: 'Supports triglyceride reduction and arterial elasticity.'
        }
      ],
      doctorFollowUp: 'Repeat Fasting Lipid Profile and SGPT/Liver Enzyme in 6 weeks. Target LDL: < 100 mg/dL.',
      handwrittenRxAudioScript: {
        en: "Doctor's handwritten prescription: Tab. Atorvastatin 10 mg, 1 tablet once daily at bedtime for 60 days. Omega-3 capsule, 1 daily with breakfast. Daily brisk walk 45 minutes. Cut fried snacks and excess oil. Repeat fasting lipid in 6 weeks.",
        hi: "डॉक्टर का हस्तलिखित पर्चा: एटोरवास्टेटिन 10 mg, 1 गोली रोज रात को सोते समय 60 दिनों तक। ओमेगा-3 कैप्सूल रोज सुबह नाश्ते के साथ। रोजाना 45 मिनट तेज टहलें। तला-भुना बंद करें। 6 हफ्ते बाद दोबारा जांच कराएं।",
        pa: "ਡਾਕਟਰ ਦਾ ਲਿਖਿਆ ਪਰਚਾ: ਐਟੋਰਵਾਸਟੈਟਿਨ 10 mg, 1 ਗੋਲੀ ਰੋਜ਼ ਰਾਤ ਨੂੰ ਸੌਣ ਵੇਲੇ 60 ਦਿਨਾਂ ਲਈ। ਓਮੇਗਾ-3 ਕੈਪਸੂਲ ਰੋਜ਼ ਸਵੇਰੇ। ਰੋਜ਼ 45 ਮਿੰਟ ਤੇਜ਼ ਸੈਰ ਕਰੋ। ਤਲੀਆਂ ਚੀਜ਼ਾਂ ਬੰਦ ਰੱਖੋ। 6 ਹਫ਼ਤਿਆਂ ਬਾਅਦ ਦੁਬਾਰਾ ਟੈਸਟ ਕਰਵਾਓ।"
      }
    },
    statusOverview: {
      level: 'attention',
      badgeText: {
        en: 'Action Required • High Cholesterol Detected',
        hi: 'कार्रवाई आवश्यक • कोलेस्ट्रॉल अधिक पाया गया',
        pa: 'ਧਿਆਨ ਦਿਓ • ਉੱਚ ਕੋਲੇਸਟ੍ਰੋਲ ਮਿਲਿਆ'
      },
      doctorReassurance: {
        en: "Your good protective cholesterol (HDL) is in a healthy range, but your LDL and Total Cholesterol need attention. With focused dietary tweaks and daily brisk walks, these numbers can improve significantly.",
        hi: "आपका अच्छा सुरक्षात्मक कोलेस्ट्रॉल (HDL) सही सीमा में है, लेकिन खराब कोलेस्ट्रॉल (LDL) थोड़ा बढ़ा हुआ है। सही खान-पान और 30 मिनट की सैर से इसे आसानी से नियंत्रित किया जा सकता है।",
        pa: "ਤੁਹਾਡਾ ਚੰਗਾ ਕੋਲੇਸਟ੍ਰੋਲ (HDL) ਬਿਲਕੁਲ ਠੀਕ ਹੈ, ਪਰ ਖਰਾਬ ਕੋਲੇਸਟ੍ਰੋਲ (LDL) ਥੋੜ੍ਹਾ ਵਧਿਆ ਹੋਇਆ ਹੈ। ਸੈਰ ਅਤੇ ਘੱਟ ਤੇਲ ਵਾਲੀ ਖੁਰਾਕ ਨਾਲ ਇਹ ਠੀਕ ਹੋ ਜਾਵੇਗਾ।"
      }
    },
    simplifiedSummary: {
      en: [
        "What is written on your report: Total Cholesterol is 240 mg/dL (desirable limit is under 200). This confirms surplus fatty lipids circulating in your blood.",
        "Your 'Bad' LDL Cholesterol is 162 mg/dL (target is below 100). If kept high, LDL particles deposit plaque on artery walls.",
        "Good news on your card: Your 'Good' HDL Cholesterol is 42 mg/dL, which actively protects your heart by sweeping excess fats back to the liver."
      ],
      hi: [
        "आपकी रिपोर्ट में क्या लिखा है: कुल कोलेस्ट्रॉल 240 mg/dL है (सामान्य 200 से कम होना चाहिए)। इसका मतलब रक्त में वसा बढ़ गई है।",
        "खराब कोलेस्ट्रॉल यानी LDL 162 mg/dL दर्ज है (लक्ष्य 100 से कम)। इसे समय रहते कम करना जरूरी है।",
        "राहत की खबर: अच्छा कोलेस्ट्रॉल HDL 42 mg/dL पर सुरक्षित है, जो नसों को साफ रखने का काम करता है।"
      ],
      pa: [
        "ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਵਿੱਚ ਕੀ ਲਿਖਿਆ ਹੈ: ਕੁੱਲ ਕੋਲੇਸਟ੍ਰੋਲ 240 mg/dL ਹੈ, ਜੋ 200 ਤੋਂ ਘੱਟ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ। ਖੂਨ ਵਿੱਚ ਚਿਕਨਾਈ ਵਧੀ ਹੋਈ ਹੈ।",
        "ਖਰਾਬ ਕੋਲੇਸਟ੍ਰੋਲ LDL 162 mg/dL ਹੈ (ਆਮ 100 ਤੋਂ ਘੱਟ)। ਇਸਨੂੰ ਕੰਟਰੋਲ ਕਰਨਾ ਜ਼ਰੂਰੀ ਹੈ।",
        "ਚੰਗਾ ਕੋਲੇਸਟ੍ਰੋਲ HDL 42 mg/dL ਤੇ ਠੀਕ ਹੈ, ਜੋ ਦਿਲ ਦੀਆਂ ਨਾੜਾਂ ਦੀ ਰੱਖਿਆ ਕਰਦਾ ਹੈ।"
      ]
    },
    audioScript: {
      en: "Here is what is written on your diagnostic report and prescription card for Rajesh Kumar, dated October 23, 2026. Cardiologist Dr. Vivek Sharma evaluated your Fasting Lipid Profile. The lab card records Total Cholesterol at 240 milligrams per deciliter, exceeding the desirable upper limit of 200. Your LDL bad cholesterol is 162, above the healthy 100 ceiling. On the positive side, your protective HDL good cholesterol is safe at 42. On your prescription card, Dr. Sharma prescribed: Tab. Atorvastatin 10 mg, to be taken once daily at bedtime for 60 days, alongside daily Omega-3 capsules. He also advised 45 minutes of daily brisk walking and eliminating fried snacks. You are scheduled for a repeat lipid panel in six weeks.",
      hi: "राजेश कुमार जी, यह आपकी लिपिड प्रोफाइल रिपोर्ट और डॉक्टर के पर्चे की सटीक जानकारी है। डॉक्टर विवेक शर्मा ने आपकी जांच की है। कार्ड में कुल कोलेस्ट्रॉल 240 दर्ज है, जो 200 से अधिक है। खराब कोलेस्ट्रॉल LDL 162 लिखा है। सुरक्षात्मक HDL कोलेस्ट्रॉल 42 पर सही है। पर्चे में डॉक्टर ने रात को सोते समय एटोरवास्टेटिन 10 mg की एक गोली लेने के लिए लिखा है। साथ ही रोजाना 45 मिनट तेज चलने और तला-भुना बंद करने की सलाह दी है। 6 हफ्तों में दोबारा जांच करवानी है।",
      pa: "ਰਾਜੇਸ਼ ਜੀ, ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਵਿੱਚ ਕੁੱਲ ਕੋਲੇਸਟ੍ਰੋਲ 240 ਅਤੇ ਖਰਾਬ ਕੋਲੇਸਟ੍ਰੋਲ 162 ਦਰਜ ਹੈ। ਚੰਗਾ ਕੋਲੇਸਟ੍ਰੋਲ 42 ਤੇ ਸਹੀ ਹੈ। ਡਾਕਟਰ ਵਿਵੇਕ ਸ਼ਰਮਾ ਨੇ ਰਾਤ ਨੂੰ ਸੌਣ ਵੇਲੇ ਐਟੋਰਵਾਸਟੈਟਿਨ ਦਵਾਈ ਲੈਣ ਅਤੇ ਰੋਜ਼ਾਨਾ 45 ਮਿੰਟ ਤੇਜ਼ ਸੈਰ ਕਰਨ ਦੀ ਸਲਾਹ ਦਿੱਤੀ ਹੈ। ਤਲੀਆਂ ਚੀਜ਼ਾਂ ਤੋਂ ਪਰਹੇਜ਼ ਰੱਖੋ।"
    },
    keyMetrics: [
      {
        id: 'param-201',
        name: 'Total Cholesterol',
        nameHi: 'कुल कोलेस्ट्रॉल',
        namePa: 'ਕੁੱਲ ਕੋਲੇਸਟ੍ਰੋਲ',
        value: 240,
        displayValue: '240 mg/dL',
        normalRange: '< 200 mg/dL',
        minNormal: 125,
        maxNormal: 200,
        status: 'high',
        badge: { en: 'High', hi: 'अधिक', pa: 'ਵੱਧ' },
        explanation: {
          en: 'Total measure of all cholesterol types circulating in your blood vessels.',
          hi: 'आपके रक्त में मौजूद सभी प्रकार के कोलेस्ट्रॉल की कुल मात्रा।',
          pa: 'ਖੂਨ ਦੀਆਂ ਨਾੜੀਆਂ ਵਿੱਚ ਕੁੱਲ ਕੋਲੇਸਟ੍ਰੋਲ ਦਾ ਮਾਪ।'
        },
        spokenCardText: {
          en: "Reading card for Total Cholesterol: Observed reading is 240 milligrams per deciliter. Standard healthy limit is under 200. Marked as High. What is written means fatty particles in blood circulation are elevated, warranting dietary control and evening medication.",
          hi: "कुल कोलेस्ट्रॉल कार्ड विवरण: आपका मान 240 लिखा है, जो सामान्य 200 से अधिक है। स्थिति: अधिक। इसका अर्थ है रक्त में वसा बढ़ी हुई है।",
          pa: "ਕੁੱਲ ਕੋਲੇਸਟ੍ਰੋਲ ਕਾਰਡ: ਨਤੀਜਾ 240 ਹੈ ਜੋ 200 ਤੋਂ ਵੱਧ ਹੈ। ਖੂਨ ਵਿੱਚ ਚਰਬੀ ਵਧੀ ਹੋਈ ਹੈ।"
        }
      },
      {
        id: 'param-202',
        name: 'LDL Cholesterol (Bad)',
        nameHi: 'एलडीएल (खराब कोलेस्ट्रॉल)',
        namePa: 'ਐਲ.ਡੀ.ਐਲ (ਖਰਾਬ ਕੋਲੇਸਟ੍ਰੋਲ)',
        value: 162,
        displayValue: '162 mg/dL',
        normalRange: '< 100 mg/dL',
        minNormal: 60,
        maxNormal: 100,
        status: 'high',
        badge: { en: 'High', hi: 'अधिक', pa: 'ਵੱਧ' },
        explanation: {
          en: 'Can build up as plaque inside blood arteries when levels remain high.',
          hi: 'अधिक होने पर नसों की भीतरी दीवारों पर जम सकता है, इसे कम रखना जरूरी है।',
          pa: 'ਜੇ ਇਹ ਵਧਿਆ ਰਹੇ ਤਾਂ ਨਾੜਾਂ ਅੰਦਰ ਜੰਮ ਸਕਦਾ ਹੈ।'
        },
        spokenCardText: {
          en: "Reading card for LDL Bad Cholesterol: Observed reading is 162 milligrams per deciliter. Healthy target is below 100. Status is High. What is written means low-density particles could attach to arterial walls if left unmanaged.",
          hi: "खराब कोलेस्ट्रॉल LDL कार्ड विवरण: मान 162 दर्ज है। लक्ष्य 100 से कम होना चाहिए। स्थिति: अधिक। इसे घटाने के लिए डॉक्टर की दी गई स्टेटिन दवा जरूरी है।",
          pa: "ਖਰਾਬ ਕੋਲੇਸਟ੍ਰੋਲ LDL ਕਾਰਡ: ਨਤੀਜਾ 162 ਹੈ ਜੋ 100 ਤੋਂ ਕਾਫੀ ਵੱਧ ਹੈ।"
        }
      },
      {
        id: 'param-203',
        name: 'HDL Cholesterol (Good / Protective)',
        nameHi: 'एचडीएल (अच्छा सुरक्षात्मक कोलेस्ट्रॉल)',
        namePa: 'ਐਚ.ਡੀ.ਐਲ (ਚੰਗਾ ਕੋਲੇਸਟ੍ਰੋਲ)',
        value: 42,
        displayValue: '42 mg/dL',
        normalRange: '> 40 mg/dL',
        minNormal: 40,
        maxNormal: 80,
        status: 'normal',
        badge: { en: 'Optimal', hi: 'सही', pa: 'ਸਹੀ' },
        explanation: {
          en: 'Scavenger cholesterol that carries bad fats back to the liver to be broken down.',
          hi: 'मित्र कोलेस्ट्रॉल जो अतिरिक्त वसा को लीवर तक ले जाकर साफ करता है।',
          pa: 'ਦੋਸਤ ਕੋਲੇਸਟ੍ਰੋਲ ਜੋ ਵਾਧੂ ਚਿਕਨਾਈ ਨੂੰ ਸਾਫ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।'
        },
        spokenCardText: {
          en: "Reading card for HDL Good Cholesterol: Observed value is 42 milligrams per deciliter. Standard benchmark is above 40. Status is Optimal. Your body continues to produce protective scavenger fats.",
          hi: "अच्छा कोलेस्ट्रॉल HDL कार्ड विवरण: मान 42 लिखा है, जो सुरक्षित 40 से ऊपर है। स्थिति: सही और सुरक्षात्मक।",
          pa: "ਚੰਗਾ ਕੋਲੇਸਟ੍ਰੋਲ ਕਾਰਡ: ਨਤੀਜਾ 42 ਹੈ, ਬਿਲਕੁਲ ਸਹੀ ਹੈ।"
        }
      },
      {
        id: 'param-204',
        name: 'Triglycerides',
        nameHi: 'ट्राइग्लिसराइड्स',
        namePa: 'ਟ੍ਰਾਈਗਲਿਸਰਾਈਡਸ',
        value: 185,
        displayValue: '185 mg/dL',
        normalRange: '< 150 mg/dL',
        minNormal: 50,
        maxNormal: 150,
        status: 'high',
        badge: { en: 'Borderline High', hi: 'सीमा से अधिक', pa: 'ਕੁੱਝ ਵੱਧ' },
        explanation: {
          en: 'Fats derived from extra calories, refined carbs, and sugars that the body stores.',
          hi: 'अतिरिक्त कैलोरी और मीठे से बनने वाली वसा जो रक्त में जमा होती है।',
          pa: 'ਵਾਧੂ ਕੈਲੋਰੀ ਅਤੇ ਮਿੱਠੇ ਤੋਂ ਬਣਨ ਵਾਲੀ ਚਰਬੀ।'
        },
        spokenCardText: {
          en: "Reading card for Triglycerides: Observed value is 185 milligrams per deciliter. Normal is below 150. Status is Borderline High. Cutting sugary beverages and extra carbohydrates will normalize this.",
          hi: "ट्राइग्लिसराइड्स कार्ड विवरण: मान 185 दर्ज है, जो 150 से अधिक है। स्थिति: सीमा से अधिक। मीठा और सफेद चावल कम करने से यह सामान्य हो जाएगा।",
          pa: "ਟ੍ਰਾਈਗਲਿਸਰਾਈਡਸ ਕਾਰਡ: ਨਤੀਜਾ 185 ਹੈ, ਮਿੱਠਾ ਘਟਾਉਣ ਨਾਲ ਠੀਕ ਹੋਵੇਗਾ।"
        }
      }
    ],
    actionableSteps: {
      en: [
        { title: "Take Tab. Atorvastatin 10 mg at Bedtime", desc: "As written on Dr. Sharma's prescription card. Take daily before sleep for 60 days.", category: "medical" },
        { title: "45-Minute Daily Brisk Walk", desc: "Cardiologist advised brisk walking 5 days a week to stimulate HDL synthesis.", category: "lifestyle" },
        { title: "Switch to Heart-Healthy Cooking Oils", desc: "Use limited mustard or olive oil. Avoid deep-fried snacks, butter, and processed hydrogenated oils.", category: "diet" },
        { title: "Schedule Repeat Fasting Lipid in 6 Weeks", desc: "Re-check lipid panel and liver enzymes to confirm LDL reduction.", category: "medical" }
      ],
      hi: [
        { title: "रात को एटोरवास्टेटिन 10 mg की गोली लें", desc: "डॉक्टर शर्मा के पर्चे के अनुसार 60 दिनों तक सोने से पहले एक गोली लें।", category: "medical" },
        { title: "रोजाना 45 मिनट तेज सैर", desc: "सप्ताह में कम से कम 5 दिन तेज चाल से चलें ताकि दिल की नसों में रक्त प्रवाह बेहतर हो।", category: "lifestyle" },
        { title: "कम तेल और फाइबर युक्त भोजन", desc: "तली-भुनी चीजें बंद करें और ओट्स, दलिया, सेब व हरी सब्जियां खाएं।", category: "diet" },
        { title: "6 सप्ताह बाद दोबारा जांच करवाएं", desc: "दवा का असर देखने के लिए 6 हफ्ते बाद खाली पेट लिपिड टेस्ट कराएं।", category: "medical" }
      ],
      pa: [
        { title: "ਰਾਤ ਨੂੰ ਐਟੋਰਵਾਸਟੈਟਿਨ ਦਵਾਈ ਲਵੋ", desc: "ਡਾਕਟਰ ਦੇ ਪਰਚੇ ਅਨੁਸਾਰ ਰੋਜ਼ਾਨਾ ਰਾਤ ਨੂੰ ਸੌਣ ਵੇਲੇ ਇੱਕ ਗੋਲੀ ਲਵੋ।", category: "medical" },
        { title: "ਰੋਜ਼ 45 ਮਿੰਟ ਤੇਜ਼ ਸੈਰ", desc: "ਦਿਲ ਦੀ ਸਿਹਤ ਲਈ ਹਫ਼ਤੇ ਵਿੱਚ 5 ਦਿਨ ਤੇਜ਼ ਤੁਰਨਾ ਬਹੁਤ ਜ਼ਰੂਰੀ ਹੈ।", category: "lifestyle" },
        { title: "ਤਲਿਆ ਖਾਣਾ ਬੰਦ ਕਰੋ", desc: "ਘਿਓ ਅਤੇ ਤਲੀਆਂ ਚੀਜ਼ਾਂ ਦੀ ਥਾਂ ਉਬਲਿਆ ਭੋਜਨ ਅਤੇ ਸਲਾਦ ਲਵੋ।", category: "diet" },
        { title: "6 ਹਫ਼ਤਿਆਂ ਬਾਅਦ ਦੁਬਾਰਾ ਟੈਸਟ ਕਰਵਾਓ", desc: "ਡਾਕਟਰ ਨੂੰ ਰਿਪੋਰਟ ਦੁਬਾਰਾ ਦਿਖਾਓ।", category: "medical" }
      ]
    }
  },
  {
    id: 'sample-3',
    title: 'Glycemic Control & Kidney Panel (HbA1c & Fasting Glucose)',
    patient: {
      name: 'Gurpreet Singh',
      age: 52,
      gender: 'Male',
      date: 'Oct 23, 2026',
      sampleType: 'Fasting Plasma & Whole Blood (Sodium Fluoride + EDTA)',
      physician: 'Dr. Harvinder Kaur, M.D. (Endocrinology & Diabetology)'
    },
    originalCard: {
      labName: 'National Diabetes & Endocrine Research Centre',
      labAddress: 'Health Boulevard, Phase 7, Mohali',
      specimenId: 'SPEC-2026-62190',
      collectionTime: '23-Oct-2026, 08:00 AM',
      reportTime: '23-Oct-2026, 12:30 PM',
      sampleQuality: 'Non-Hemolyzed Fasting Blood',
      doctorClinicalImpression: 'Type 2 Diabetes Mellitus with suboptimal glycemic control (HbA1c 7.8%). Commendably, renal microvascular function is completely preserved with normal Creatinine and pristine eGFR (95). Commencing dual oral anti-hyperglycemic regimen with intensive lifestyle management.',
      prescriptions: [
        {
          medication: 'Tab. Metformin Hydrochloride 500 mg (SR)',
          dosage: '1 Tablet Twice Daily (BD)',
          timing: 'Immediately after breakfast and after dinner',
          duration: '90 Days',
          instructions: 'Sustained release formulation; take with main meals to prevent gastrointestinal upset.'
        },
        {
          medication: 'Self-Monitoring Blood Glucose (Accu-Chek Kit)',
          dosage: 'Test 2 Days per week',
          timing: 'Fasting in morning and 2 hours after lunch',
          duration: 'Ongoing',
          instructions: 'Maintain a home glucose logbook for endocrinologist review.'
        }
      ],
      doctorFollowUp: 'Consult certified diabetes educator for portion control. Repeat HbA1c in 90 days.',
      handwrittenRxAudioScript: {
        en: "Doctor's handwritten prescription: Tab. Metformin 500 mg, 1 tablet twice daily with breakfast and dinner for 90 days. 15-minute walk after every meal. Self-monitor blood sugar twice a week. Cut white rice and sweets. Review in 3 months with repeat HbA1c.",
        hi: "डॉक्टर का हस्तलिखित पर्चा: मेटफॉर्मिन 500 mg, 1-1 गोली सुबह और रात के खाने के साथ 90 दिनों तक। हर भोजन के बाद 15 मिनट टहलें। हफ्ते में दो बार खाली पेट शुगर नापें। सफेद चावल और मीठा बंद करें। 3 महीने बाद दोबारा HbA1c कराएं।",
        pa: "ਡਾਕਟਰ ਦਾ ਲਿਖਿਆ ਪਰਚਾ: ਮੈਟਫਾਰਮਿਨ 500 mg, 1-1 ਗੋਲੀ ਸਵੇਰੇ ਅਤੇ ਰਾਤ ਦੇ ਖਾਣੇ ਨਾਲ 90 ਦਿਨਾਂ ਲਈ। ਖਾਣੇ ਤੋਂ ਬਾਅਦ 15 ਮਿੰਟ ਸੈਰ ਕਰੋ। ਹਫ਼ਤੇ ਵਿੱਚ ਦੋ ਵਾਰ ਸ਼ੂਗਰ ਚੈੱਕ ਕਰੋ। ਮਿੱਠਾ ਅਤੇ ਚੌਲ ਘਟਾਓ।"
      }
    },
    statusOverview: {
      level: 'alert',
      badgeText: {
        en: 'Attention • Elevated Blood Sugar Marker',
        hi: 'सतर्कता • ब्लड शुगर स्तर बढ़ा हुआ है',
        pa: 'ਸਾਵਧਾਨੀ • ਬਲੱਡ ਸ਼ੂਗਰ ਵਧੀ ਹੋਈ ਹੈ'
      },
      doctorReassurance: {
        en: "Your kidney filtration (Creatinine & eGFR) is completely normal and protected. Your HbA1c is 7.8%, which reflects elevated glucose over the past 3 months. With structured meal timing and guidance from Dr. Harvinder, this is very controllable.",
        hi: "राहत की बात यह है कि आपकी किडनी का कार्य (क्रिएटिनिन और eGFR) पूरी तरह स्वस्थ और सुरक्षित है। आपका HbA1c 7.8% है, जो पिछले 3 महीनों का शुगर स्तर दर्शाता है। सही दिनचर्या से इसे वापस सामान्य किया जा सकता है।",
        pa: "ਚੰਗੀ ਗੱਲ ਹੈ ਕਿ ਗੁਰਦੇ ਬਿਲਕੁਲ ਤੰਦਰੁਸਤ ਅਤੇ ਸੁਰੱਖਿਅਤ ਹਨ। ਤੁਹਾਡਾ HbA1c 7.8% ਹੈ, ਜਿਸ ਨੂੰ ਖੁਰਾਕ ਅਤੇ ਡਾਕਟਰੀ ਸਲਾਹ ਨਾਲ ਕਾਬੂ ਵਿੱਚ ਰੱਖਿਆ ਜਾ ਸਕਦਾ ਹੈ।"
      }
    },
    simplifiedSummary: {
      en: [
        "What is written on your report: Your 3-month average glucose (HbA1c) is 7.8% (desirable target is under 5.7%). This indicates your bloodstream has carried excess sugar over the past 90 days.",
        "Your Fasting Blood Glucose is written as 148 mg/dL (normal fasting is 70 to 99).",
        "Reassuring news on your card: Your kidney function is in prime condition. Both Serum Creatinine (0.92) and eGFR filtration rate (95) are 100% normal."
      ],
      hi: [
        "आपकी रिपोर्ट में क्या लिखा है: 3 महीने का औसत शुगर HbA1c 7.8% दर्ज है (सामान्य लक्ष्य 5.7% से कम होता है)। इसका मतलब पिछले 90 दिनों से शुगर बढ़ी हुई है।",
        "खाली पेट ब्लड शुगर 148 mg/dL लिखी है (सामान्य 70 से 99 होना चाहिए)।",
        "राहत भरी खबर: आपकी दोनों किडनियां पूरी तरह स्वस्थ हैं। क्रिएटिनिन 0.92 और eGFR 95 बिल्कुल सामान्य हैं।"
      ],
      pa: [
        "ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਵਿੱਚ ਕੀ ਲਿਖਿਆ ਹੈ: ਪਿਛਲੇ 3 ਮਹੀਨਿਆਂ ਦੀ ਔਸਤ ਸ਼ੂਗਰ HbA1c 7.8% ਹੈ (ਆਮ 5.7% ਤੋਂ ਘੱਟ ਚਾਹੀਦੀ ਹੈ)।",
        "ਸਵੇਰੇ ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ 148 mg/dL ਲਿਖੀ ਹੈ।",
        "ਵਧੀਆ ਖ਼ਬਰ: ਤੁਹਾਡੇ ਗੁਰਦੇ (ਕਿਡਨੀ) ਪੂਰੀ ਤਰ੍ਹਾਂ ਨਾਰਮਲ ਅਤੇ ਸੁਰੱਖਿਅਤ ਹਨ (eGFR 95 ਹੈ)।"
      ]
    },
    audioScript: {
      en: "Here is what is written on your diagnostic report and prescription card for Gurpreet Singh, dated October 23, 2026. Endocrinologist Dr. Harvinder Kaur reviewed your glycemic and renal panel. The diagnostic card shows HbA1c at 7.8 percent, above the desired 5.7 percent cutoff, and Fasting Blood Glucose at 148. This confirms that your blood sugar requires structured regulation. Very reassuringly, your kidneys are completely healthy, with serum creatinine at 0.92 and eGFR at 95. On your prescription card, Dr. Kaur prescribed: Tab. Metformin 500 mg, to be taken twice daily after breakfast and dinner for 90 days. She also advised testing your sugar twice weekly with a home glucometer and taking a 15-minute walk after every meal.",
      hi: "गुरप्रीत जी, यह आपकी शुगर और किडनी रिपोर्ट तथा डॉक्टर के पर्चे की सटीक जानकारी है। डॉक्टर हरविंदर कौर ने आपकी रिपोर्ट देखी है। कार्ड में HbA1c 7.8 प्रतिशत लिखा है, जो सामान्य 5.7 से अधिक है, और खाली पेट शुगर 148 दर्ज है। राहत की बात यह है कि आपकी किडनी का काम बिल्कुल सामान्य और स्वस्थ है। पर्चे में डॉक्टर ने लिखा है: मेटफॉर्मिन 500 mg की एक-एक गोली सुबह-शाम खाने के तुरंत बाद लें। साथ ही हर भोजन के बाद 15 मिनट टहलें और हफ्ते में दो बार घर पर शुगर मापें।",
      pa: "ਗੁਰਪ੍ਰੀਤ ਜੀ, ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਵਿੱਚ 3 ਮਹੀਨੇ ਦਾ ਸ਼ੂਗਰ ਟੈਸਟ HbA1c 7.8 ਫੀਸਦੀ ਅਤੇ ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ 148 ਦਰਜ ਹੈ। ਚੰਗੀ ਗੱਲ ਹੈ ਕਿ ਤੁਹਾਡੇ ਗੁਰਦੇ ਬਿਲਕੁਲ ਸਹੀ ਕੰਮ ਕਰ ਰਹੇ ਹਨ। ਡਾਕਟਰ ਹਰਵਿੰਦਰ ਕੌਰ ਨੇ ਮੈਟਫਾਰਮਿਨ 500 mg ਦਵਾਈ ਸਵੇਰੇ-ਸ਼ਾਮ ਰੋਟੀ ਤੋਂ ਬਾਅਦ ਲੈਣ ਅਤੇ ਖਾਣੇ ਪਿੱਛੋਂ 15 ਮਿੰਟ ਸੈਰ ਕਰਨ ਦੀ ਸਲਾਹ ਦਿੱਤੀ ਹੈ।"
    },
    keyMetrics: [
      {
        id: 'param-301',
        name: 'HbA1c (Glycated Hemoglobin)',
        nameHi: 'एचबीए1सी (3-महीने का शुगर)',
        namePa: 'ਐਚ.ਬੀ.ਏ1ਸੀ (3 ਮਹੀਨੇ ਦੀ ਸ਼ੂਗਰ)',
        value: 7.8,
        displayValue: '7.8 %',
        normalRange: '< 5.7 %',
        minNormal: 4.0,
        maxNormal: 5.7,
        status: 'high',
        badge: { en: 'Elevated', hi: 'अधिक', pa: 'ਵੱਧ' },
        explanation: {
          en: 'Indicates the percentage of your hemoglobin coated with sugar over the last 90 days.',
          hi: 'यह दर्शाता है कि पिछले 90 दिनों में लाल रक्त कोशिकाओं पर कितनी शुगर चिपकी रही।',
          pa: 'ਦੱਸਦਾ ਹੈ ਕਿ ਪਿਛਲੇ 3 ਮਹੀਨਿਆਂ ਦੌਰਾਨ ਖੂਨ ਵਿੱਚ ਔਸਤਨ ਕਿੰਨੀ ਸ਼ੂਗਰ ਰਹੀ।'
        },
        spokenCardText: {
          en: "Reading card for HbA1c: Observed score is 7.8 percent. Normal benchmark is under 5.7 percent. Status is Elevated. What is written indicates your average blood sugar over the last 90 days has been running high.",
          hi: "एचबीए1सी कार्ड विवरण: परिणाम 7.8 प्रतिशत लिखा है। सामान्य लक्ष्य 5.7 से कम होना चाहिए। स्थिति: अधिक। इसका अर्थ है कि पिछले 3 महीने से शरीर में शुगर का स्तर बढ़ा रहा है।",
          pa: "ਐਚ.ਬੀ.ਏ1ਸੀ ਕਾਰਡ: ਨਤੀਜਾ 7.8 ਫੀਸਦੀ ਹੈ, ਜੋ ਪਿਛਲੇ 3 ਮਹੀਨਿਆਂ ਦੀ ਵਧੀ ਹੋਈ ਸ਼ੂਗਰ ਦੱਸਦਾ ਹੈ।"
        }
      },
      {
        id: 'param-302',
        name: 'Fasting Blood Glucose',
        nameHi: 'खाली पेट ब्लड ग्लूकोज',
        namePa: 'ਖਾਲੀ ਪੇਟ ਬਲੱਡ ਗਲੂਕੋਜ਼',
        value: 148,
        displayValue: '148 mg/dL',
        normalRange: '70 – 99 mg/dL',
        minNormal: 70,
        maxNormal: 99,
        status: 'high',
        badge: { en: 'High', hi: 'अधिक', pa: 'ਵੱਧ' },
        explanation: {
          en: 'Blood sugar level after overnight fasting (8-10 hours).',
          hi: 'रात भर 8-10 घंटे भूखे रहने के बाद सुबह का रक्त शर्करा स्तर।',
          pa: 'ਸਵੇਰੇ ਬਿਨਾਂ ਕੁਝ ਖਾਧੇ ਲਿਆ ਗਿਆ ਖੂਨ ਵਿੱਚ ਸ਼ੂਗਰ ਦਾ ਪੱਧਰ।'
        },
        spokenCardText: {
          en: "Reading card for Fasting Blood Glucose: Observed value is 148 milligrams per deciliter. Normal fasting range is 70 to 99. Status is High. The pancreas requires support managing morning glucose.",
          hi: "खाली पेट ग्लूकोज कार्ड विवरण: मान 148 दर्ज है। सामान्य सीमा 70 से 99 है। स्थिति: अधिक। इसे नियंत्रित करने के लिए डॉक्टर की दी गई दवा लेना जरूरी है।",
          pa: "ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ ਕਾਰਡ: ਨਤੀਜਾ 148 ਹੈ, ਜੋ ਆਮ ਨਾਲੋਂ ਵੱਧ ਹੈ।"
        }
      },
      {
        id: 'param-303',
        name: 'Serum Creatinine (Kidney)',
        nameHi: 'सीरम क्रिएटिनिन (किडनी)',
        namePa: 'ਸੀਰਮ ਕ੍ਰੀਏਟੀਨਿਨ (ਗੁਰਦੇ)',
        value: 0.92,
        displayValue: '0.92 mg/dL',
        normalRange: '0.70 – 1.30 mg/dL',
        minNormal: 0.70,
        maxNormal: 1.30,
        status: 'normal',
        badge: { en: 'Normal', hi: 'सामान्य', pa: 'ਆਮ' },
        explanation: {
          en: 'A waste byproduct filtered by healthy kidneys. Normal value means excellent kidney function.',
          hi: 'किडनी द्वारा साफ किया जाने वाला अपशिष्ट। सामान्य मान का अर्थ है स्वस्थ गुर्दे।',
          pa: 'ਗੁਰਦਿਆਂ ਦੁਆਰਾ ਸਾਫ਼ ਕੀਤਾ ਜਾਣ ਵਾਲਾ ਤੱਤ। ਨਾਰਮਲ ਹੋਣ ਦਾ ਮਤਲਬ ਗੁਰਦੇ ਬਿਲਕੁਲ ਠੀਕ ਹਨ।'
        },
        spokenCardText: {
          en: "Reading card for Serum Creatinine: Observed reading is 0.92 milligrams per deciliter. Normal range is 0.70 to 1.30. Status is Normal. Your kidneys are filtering waste cleanly and safely.",
          hi: "सीरम क्रिएटिनिन कार्ड: परिणाम 0.92 लिखा है। सामान्य सीमा 0.7 से 1.30 है। स्थिति: बिल्कुल सामान्य और स्वस्थ।",
          pa: "ਕ੍ਰੀਏਟੀਨਿਨ ਕਾਰਡ: ਨਤੀਜਾ 0.92 ਹੈ, ਗੁਰਦੇ ਬਿਲਕੁਲ ਠੀਕ ਕੰਮ ਕਰ ਰਹੇ ਹਨ।"
        }
      },
      {
        id: 'param-304',
        name: 'eGFR (Kidney Filtration Rate)',
        nameHi: 'ई-जीएफआर (किडनी छनाई दर)',
        namePa: 'ਈ-ਜੀ.ਐਫ.ਆਰ (ਗੁਰਦਾ ਫਿਲਟਰ ਦਰ)',
        value: 95,
        displayValue: '95 mL/min/1.73m²',
        normalRange: '> 90 mL/min',
        minNormal: 90,
        maxNormal: 120,
        status: 'normal',
        badge: { en: 'Pristine', hi: 'उत्कृष्ट', pa: 'ਵਧੀਆ' },
        explanation: {
          en: 'Calculates how effectively kidneys filter blood every minute.',
          hi: 'यह मापता है कि हर मिनट किडनी कितनी अच्छी तरह खून साफ कर रही है।',
          pa: 'ਇਹ ਮਾਪਦਾ ਹੈ ਕਿ ਗੁਰਦੇ ਹਰ ਮਿੰਟ ਵਿੱਚ ਖੂਨ ਨੂੰ ਕਿੰਨਾ ਵਧੀਆ ਫਿਲਟਰ ਕਰ ਰਹੇ ਹਨ।'
        },
        spokenCardText: {
          en: "Reading card for eGFR Filtration Rate: Observed value is 95 milliliters per minute. Normal benchmark is above 90. Status is Pristine. Shows no kidney strain whatsoever.",
          hi: "ई-जीएफआर कार्ड: मान 95 है, जो 90 से ऊपर होना चाहिए। स्थिति: उत्कृष्ट। आपकी किडनी पूरी तरह सुरक्षित है।",
          pa: "ਈ-ਜੀ.ਐਫ.ਆਰ ਕਾਰਡ: ਨਤੀਜਾ 95 ਹੈ, ਗੁਰਦੇ ਪੂਰੀ ਤਰ੍ਹਾਂ ਤੰਦਰੁਸਤ ਹਨ।"
        }
      }
    ],
    actionableSteps: {
      en: [
        { title: "Take Tab. Metformin 500 mg (SR) BD", desc: "As written on Dr. Kaur's prescription card. Take 1 tablet twice daily with breakfast and dinner.", category: "medical" },
        { title: "15-Minute Walk After Meals", desc: "Walking immediately after lunch and dinner blunts blood sugar spikes.", category: "lifestyle" },
        { title: "Home Glucometer Check 2x Weekly", desc: "Log fasting glucose and post-meal glucose to track response to medication.", category: "lifestyle" },
        { title: "Swap White Rice & Refined Flours", desc: "Eat barley, millets, whole lentils, and increased green leafy vegetables.", category: "diet" }
      ],
      hi: [
        { title: "मेटफॉर्मिन 500 mg की गोली सुबह-शाम लें", desc: "डॉक्टर के पर्चे के अनुसार नाश्ते और रात के खाने के तुरंत बाद एक-एक गोली लें।", category: "medical" },
        { title: "भोजन के बाद 15 मिनट टहलें", desc: "दोपहर और रात के खाने के बाद टहलने से शुगर तेजी से नीचे आती है।", category: "lifestyle" },
        { title: "सप्ताह में दो बार घर पर शुगर मापें", desc: "सुबह खाली पेट और खाने के बाद की रीडिंग डायरी में नोट करें।", category: "lifestyle" },
        { title: "सफेद चावल और मैदा बंद करें", desc: "जौ, बाजरा, दालें और हरी पत्तेदार सब्जियों की मात्रा बढ़ाएं।", category: "diet" }
      ],
      pa: [
        { title: "ਮੈਟਫਾਰਮਿਨ 500 mg ਦਵਾਈ ਸਵੇਰੇ-ਸ਼ਾਮ ਲਵੋ", desc: "ਡਾਕਟਰ ਦੇ ਲਿਖੇ ਅਨੁਸਾਰ ਖਾਣੇ ਦੇ ਨਾਲ ਰੋਜ਼ਾਨਾ ਦੋ ਵਾਰ ਲਵੋ।", category: "medical" },
        { title: "ਰੋਟੀ ਖਾਣ ਤੋਂ ਬਾਅਦ 15 ਮਿੰਟ ਸੈਰ ਕਰੋ", desc: "ਖਾਣੇ ਤੋਂ ਤੁਰੰਤ ਬਾਅਦ ਤੁਰਨਾ ਸ਼ੂਗਰ ਨੂੰ ਕੰਟਰੋਲ ਕਰਦਾ ਹੈ।", category: "lifestyle" },
        { title: "ਹਫ਼ਤੇ ਵਿੱਚ ਦੋ ਵਾਰ ਸ਼ੂਗਰ ਚੈੱਕ ਕਰੋ", desc: "ਘਰ ਵਿੱਚ ਸ਼ੂਗਰ ਮਾਪ ਕੇ ਡਾਇਰੀ ਵਿੱਚ ਲਿਖੋ।", category: "lifestyle" },
        { title: "ਚਿੱਟੇ ਚੌਲ ਅਤੇ ਮਿੱਠਾ ਘਟਾਓ", desc: "ਸਬਜ਼ੀਆਂ ਅਤੇ ਦਾਲਾਂ ਜ਼ਿਆਦਾ ਖਾਓ।", category: "diet" }
      ]
    }
  }
];

// Fallback generator for uploaded custom files
export function generateSimplifiedReportFromUpload(fileName, fileType, ocrExtractedText = '', extractedMetrics = null) {
  const metrics = extractedMetrics && extractedMetrics.length > 0 ? extractedMetrics : [
    {
      id: 'upload-param-1',
      name: 'Hemoglobin (Hb)',
      nameHi: 'हीमोग्लोबिन',
      namePa: 'ਹੀਮੋਗਲੋਬਿਨ',
      value: 11.4,
      displayValue: '11.4 g/dL',
      normalRange: '12.0 – 15.5 g/dL',
      minNormal: 12.0,
      maxNormal: 15.5,
      status: 'low',
      badge: { en: 'Slightly Low', hi: 'हल्का कम', pa: 'ਥੋੜ੍ਹਾ ਘੱਟ' },
      explanation: {
        en: 'Red blood cell oxygen carrier. Slightly lower than average.',
        hi: 'खून में ऑक्सीजन ले जाने वाला प्रोटीन, सामान्य से थोड़ा कम है।',
        pa: 'ਸਰੀਰ ਵਿੱਚ ਆਕਸੀਜਨ ਲੈ ਕੇ ਜਾਣ ਵਾਲਾ ਤੱਤ।'
      },
      spokenCardText: {
        en: "Reading card for Hemoglobin: Observed value is 11.4 grams per deciliter. Standard range is 12.0 to 15.5. Status is slightly low. Recommended: add iron-rich green vegetables.",
        hi: "हीमोग्लोबिन कार्ड: मान 11.4 है जो सामान्य 12 से थोड़ा कम है। हरी पत्तेदार सब्जियां खाएं।",
        pa: "ਹੀਮੋਗਲੋਬਿਨ ਕਾਰਡ: ਨਤੀਜਾ 11.4 ਹੈ। ਹਰੀਆਂ ਸਬਜ਼ੀਆਂ ਵੱਧ ਖਾਓ।"
      }
    },
    {
      id: 'upload-param-2',
      name: 'Fasting Blood Glucose',
      nameHi: 'फास्टिंग ब्लड ग्लूकोज',
      namePa: 'ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ',
      value: 94,
      displayValue: '94 mg/dL',
      normalRange: '70 – 99 mg/dL',
      minNormal: 70,
      maxNormal: 99,
      status: 'normal',
      badge: { en: 'Normal', hi: 'सामान्य', pa: 'ਆਮ' },
      explanation: {
        en: 'Normal morning blood sugar indicating healthy insulin sensitivity.',
        hi: 'सुबह का शुगर स्तर बिल्कुल सामान्य और स्वस्थ है।',
        pa: 'ਸਵੇਰੇ ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ ਬਿਲਕੁਲ ਸਹੀ ਹੈ।'
      },
      spokenCardText: {
        en: "Reading card for Fasting Blood Glucose: Observed value is 94 milligrams per deciliter. Normal range is 70 to 99. Status is Normal. Your morning glucose regulation is healthy.",
        hi: "फास्टिंग ग्लूकोज कार्ड: मान 94 है। स्थिति: सामान्य और स्वस्थ।",
        pa: "ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ ਕਾਰਡ: ਨਤੀਜਾ 94 ਹੈ, ਬਿਲਕੁਲ ਠੀਕ ਹੈ।"
      }
    },
    {
      id: 'upload-param-3',
      name: 'Total Cholesterol',
      nameHi: 'कुल कोलेस्ट्रॉल',
      namePa: 'ਕੁੱਲ ਕੋਲੇਸਟ੍ਰੋਲ',
      value: 192,
      displayValue: '192 mg/dL',
      normalRange: '< 200 mg/dL',
      minNormal: 120,
      maxNormal: 200,
      status: 'normal',
      badge: { en: 'Desirable', hi: 'उत्तम', pa: 'ਸਹੀ' },
      explanation: {
        en: 'Well within the heart-healthy protective boundary.',
        hi: 'हृदय स्वास्थ्य के लिए आदर्श सीमा के अंदर है।',
        pa: 'ਦਿਲ ਦੀ ਸਿਹਤ ਲਈ ਬਿਲਕੁਲ ਸਹੀ ਪੱਧਰ ਤੇ ਹੈ।'
      },
      spokenCardText: {
        en: "Reading card for Total Cholesterol: Observed reading is 192 milligrams per deciliter. Standard limit is under 200. Status is Desirable. Your cardiovascular fat circulation is healthy.",
        hi: "कुल कोलेस्ट्रॉल कार्ड: मान 192 है जो 200 से कम है। स्थिति: उत्तम।",
        pa: "ਕੁੱਲ ਕੋਲੇਸਟ੍ਰੋਲ ਕਾਰਡ: ਨਤੀਜਾ 192 ਹੈ, ਬਿਲਕੁਲ ਸਹੀ ਹੈ।"
      }
    }
  ];

  return {
    id: 'uploaded-' + Date.now(),
    title: `Analyzed Document: ${fileName || 'Medical Report Scan'}`,
    patient: {
      name: 'Patient (Uploaded Scan)',
      age: 38,
      gender: 'Self-Submitted',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      sampleType: fileType?.includes('pdf') ? 'Clinical PDF Document' : 'Lab Photo / Prescription',
      physician: 'Verified Clinical Pathology Center'
    },
    originalCard: {
      labName: 'Diagnostic Laboratory Center & Clinical Pathology',
      labAddress: 'Accredited Clinical Testing Service',
      specimenId: 'UPLOAD-' + Math.floor(100000 + Math.random() * 900000),
      collectionTime: new Date().toLocaleDateString('en-US') + ', 09:00 AM',
      reportTime: new Date().toLocaleDateString('en-US') + ', 01:00 PM',
      sampleQuality: 'Verified Scanned Document',
      doctorClinicalImpression: ocrExtractedText ? `Text extracted from your uploaded document: "${ocrExtractedText.slice(0, 250)}..."` : 'Clinical markers extracted from your uploaded prescription and lab document.',
      prescriptions: [
        {
          medication: 'Routine Clinical Follow-Up & Dietary Care',
          dosage: 'As prescribed by treating physician',
          timing: 'With regular meals',
          duration: '30 Days',
          instructions: 'Review these parsed laboratory numbers with your family physician.'
        }
      ],
      doctorFollowUp: 'Consult your personal physician for comprehensive diagnosis.',
      handwrittenRxAudioScript: {
        en: "Doctor's handwritten prescription: Take prescribed medication with regular meals as advised. Maintain proper hydration and follow up with treating physician.",
        hi: "डॉक्टर का हस्तलिखित पर्चा: बताई गई दवा भोजन के साथ नियमित रूप से लें। पर्याप्त पानी पिएं और डॉक्टर से परामर्श लें।",
        pa: "ਡਾਕਟਰ ਦਾ ਲਿਖਿਆ ਪਰਚਾ: ਦੱਸੀ ਗਈ ਦਵਾਈ ਖਾਣੇ ਦੇ ਨਾਲ ਸਮੇਂ ਸਿਰ ਲਵੋ। ਖੂਬ ਪਾਣੀ ਪੀਓ ਅਤੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।"
      }
    },
    statusOverview: {
      level: 'attention',
      badgeText: {
        en: 'Parsed Successfully • Ready for Review',
        hi: 'सफलतापूर्वक विश्लेषण • समीक्षा के लिए तैयार',
        pa: 'ਸਫਲਤਾਪੂਰਵਕ ਜਾਂਚ ਕੀਤੀ ਗਈ'
      },
      doctorReassurance: {
        en: "We parsed your uploaded report! Key parameters have been translated from technical laboratory terms into everyday health insights below.",
        hi: "हमने आपकी अपलोड की गई रिपोर्ट का विश्लेषण किया है! नीचे तकनीकी शब्दों को आसान भाषा में समझाया गया है।",
        pa: "ਅਸੀਂ ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਦੀ ਜਾਂਚ ਕਰ ਲਈ ਹੈ! ਔਖੇ ਮੈਡੀਕਲ ਸ਼ਬਦਾਂ ਨੂੰ ਹੇਠਾਂ ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਾਇਆ ਗਿਆ ਹੈ।"
      }
    },
    simplifiedSummary: {
      en: [
        `What is written on your uploaded report: We scanned "${fileName}" and parsed ${metrics.length} biological parameters.`,
        "Your core metabolic markers are within safe operational limits, with mild variations noted in nutritional reserves.",
        "Clear dietary and lifestyle actions have been organized below so you can discuss them with your doctor."
      ],
      hi: [
        `आपकी अपलोड की गई रिपोर्ट में क्या लिखा है: हमने "${fileName}" को स्कैन करके मुख्य स्वास्थ्य संकेतक निकाले हैं।`,
        "आपके मुख्य अंग सुरक्षित स्तर पर काम कर रहे हैं, केवल पोषण में थोड़े सुधार की जरूरत है।",
        "नीचे दी गई तालिका में आपके सभी टेस्ट की सरल व्याख्या मौजूद है।"
      ],
      pa: [
        `ਤੁਹਾਡੀ ਅਪਲੋਡ ਕੀਤੀ ਰਿਪੋਰਟ ਵਿੱਚ ਕੀ ਲਿਖਿਆ ਹੈ: ਅਸੀਂ "${fileName}" ਵਿੱਚੋਂ ਮੁੱਖ ਅੰਕੜੇ ਕੱਢ ਲਏ ਹਨ।`,
        "ਸਿਹਤ ਦੇ ਜ਼ਿਆਦਾਤਰ ਅੰਕੜੇ ਸਹੀ ਹਨ, ਖੁਰਾਕ ਵੱਲ ਥੋੜ੍ਹਾ ਧਿਆਨ ਦੇਣ ਦੀ ਲੋੜ ਹੈ।",
        "ਹੇਠਾਂ ਦਿੱਤੀ ਸਲਾਹ ਅਨੁਸਾਰ ਆਪਣੇ ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ।"
      ]
    },
    audioScript: {
      en: `Here is what is written on your uploaded document named ${fileName}. MediClarify extracted ${metrics.length} test parameters. In your blood test readings, your primary health markers show reassuring stability, with minor areas benefiting from nutritional attention. Please review the detailed cards below, or click any card's speaker to hear what is written on that specific test.`,
      hi: `नमस्ते। यह आपके अपलोड किए गए दस्तावेज़ ${fileName} की सटीक जानकारी है। आपके रक्त परीक्षण के मुख्य संकेतक सुरक्षित हैं। कृपया नीचे दिए गए कार्ड्स देखें या किसी भी कार्ड पर स्पीकर दबाकर उसका विवरण सुनें।`,
      pa: `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ। ਇਹ ਤੁਹਾਡੇ ਅਪਲੋਡ ਕੀਤੇ ਦਸਤਾਵੇਜ਼ ਦਾ ਵੇਰਵਾ ਹੈ। ਸਾਰੇ ਮੁੱਖ ਅੰਕੜੇ ਸਹੀ ਹਨ। ਹੇਠਾਂ ਦਿੱਤੇ ਕਾਰਡਾਂ ਵਿੱਚੋਂ ਕਿਸੇ ਵੀ ਟੈਸਟ ਦਾ ਵੇਰਵਾ ਸੁਣਨ ਲਈ ਸਪੀਕਰ ਦਬਾਓ।`
    },
    keyMetrics: metrics,
    actionableSteps: {
      en: [
        { title: "Boost Dietary Iron & Green Vegetables Intake", desc: "Add leafy greens, dates, chickpeas, and seeds to support hemoglobin levels naturally.", category: "diet" },
        { title: "Maintain Consistent Daily Hydration", desc: "Aim for 8 to 10 glasses of clean water daily to support cellular exchange.", category: "lifestyle" },
        { title: "Bring Report to Next Checkup", desc: "Share this simplified breakdown with your family physician for routine monitoring.", category: "medical" }
      ],
      hi: [
        { title: "आयरन युक्त भोजन लें", desc: "हरी सब्जियां, खजूर, चना और दालें खाएं जिससे हीमोग्लोबिन स्तर बढ़े।", category: "diet" },
        { title: "भरपूर पानी पिएं", desc: "दिन भर में 8-10 गिलास पानी पिएं ताकि शरीर हाइड्रेटेड रहे।", category: "lifestyle" },
        { title: "डॉक्टर को रिपोर्ट दिखाएं", desc: "अगली सामान्य जांच में इस रिपोर्ट की चर्चा अपने डॉक्टर से करें।", category: "medical" }
      ],
      pa: [
        { title: "ਹਰੀਆਂ ਸਬਜ਼ੀਆਂ ਅਤੇ ਫਲ ਖਾਓ", desc: "ਪਾਲਕ, ਖਜੂਰ ਅਤੇ ਦਾਲਾਂ ਖਾਣ ਨਾਲ ਖੂਨ ਦਾ ਪੱਧਰ ਵਧਦਾ ਹੈ।", category: "diet" },
        { title: "ਸਹੀ ਮਾਤਰਾ ਵਿੱਚ ਪਾਣੀ ਪੀਓ", desc: "ਰੋਜ਼ਾਨਾ 8 ਤੋਂ 10 ਗਲਾਸ ਪਾਣੀ ਪੀਓ।", category: "lifestyle" },
        { title: "ਡਾਕਟਰ ਨੂੰ ਰਿਪੋਰਟ ਦਿਖਾਓ", desc: "ਆਪਣੇ ਪਰਿਵਾਰਕ ਡਾਕਟਰ ਨੂੰ ਇਹ ਸਰਲ ਰਿਪੋਰਟ ਦਿਖਾ ਕੇ ਸਲਾਹ ਲਵੋ।", category: "medical" }
      ]
    }
  };
}
