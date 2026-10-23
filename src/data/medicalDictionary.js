// Medical Reference Dictionaries & Contextual Reconstruction Engine for MediClarify
// Step 2 Pipeline: FDA Approved Drug Indexes & Clinical Lab Reference Range Matching

// 1. Comprehensive FDA & Global Clinical Drug Index
export const FDA_DRUG_INDEX = [
  // Antibiotics & Antimicrobials
  {
    name: "Amoxicillin",
    brandNames: ["Amoxil", "Augmentin", "Moxikind", "Novamox", "Amoxyclav"],
    typicalDosage: "500mg",
    forms: ["Capsule", "Tablet", "Suspension"],
    category: "Antibiotic",
    aliases: ["amox", "amoxi", "amoxicil", "amoxicill", "amoxiclav", "augm", "augmentin"]
  },
  {
    name: "Azithromycin",
    brandNames: ["Zithromax", "Azee", "Azithral", "Zady"],
    typicalDosage: "500mg",
    forms: ["Tablet", "Suspension"],
    category: "Antibiotic",
    aliases: ["azith", "azithro", "azee", "azithral", "zithro"]
  },
  {
    name: "Ciprofloxacin",
    brandNames: ["Cipro", "Ciplox", "Cifran"],
    typicalDosage: "500mg",
    forms: ["Tablet", "Eye Drops"],
    category: "Antibiotic",
    aliases: ["cipro", "ciplox", "cifran"]
  },
  {
    name: "Cephalexin",
    brandNames: ["Keflex", "Phexin", "Sporidex"],
    typicalDosage: "500mg",
    forms: ["Capsule", "Tablet"],
    category: "Antibiotic",
    aliases: ["keflex", "phexin", "sporidex", "cepha", "cephalex"]
  },
  {
    name: "Doxycycline",
    brandNames: ["Vibramycin", "Doxypal", "Doxt"],
    typicalDosage: "100mg",
    forms: ["Capsule", "Tablet"],
    category: "Antibiotic",
    aliases: ["doxy", "doxycycl", "vibramycin", "doxt"]
  },
  {
    name: "Cefixime",
    brandNames: ["Suprax", "Zifi", "Taxim-O", "Cefolac"],
    typicalDosage: "200mg",
    forms: ["Tablet"],
    category: "Antibiotic",
    aliases: ["cefix", "zifi", "taxim-o", "cefolac"]
  },
  {
    name: "Metronidazole",
    brandNames: ["Flagyl", "Metrogyl"],
    typicalDosage: "400mg",
    forms: ["Tablet", "Gel"],
    category: "Antibiotic / Antiprotozoal",
    aliases: ["metro", "metrogyl", "flagyl", "metronid"]
  },

  // Analgesics & Anti-inflammatory (Pain / Fever)
  {
    name: "Paracetamol",
    brandNames: ["Tylenol", "Crocin", "Calpol", "Dolo", "Dolo 650", "Panadol", "Pacimol"],
    typicalDosage: "650mg",
    forms: ["Tablet", "Syrup"],
    category: "Analgesic / Antipyretic",
    aliases: ["pcm", "para", "paracet", "crocin", "calpol", "dolo", "dolo650", "panadol", "acetaminophen"]
  },
  {
    name: "Ibuprofen",
    brandNames: ["Advil", "Motrin", "Brufen", "Combiflam"],
    typicalDosage: "400mg",
    forms: ["Tablet"],
    category: "NSAID",
    aliases: ["ibup", "ibuprof", "brufen", "advil", "combiflam"]
  },
  {
    name: "Diclofenac",
    brandNames: ["Voltaren", "Voveran", "Dynapar"],
    typicalDosage: "50mg",
    forms: ["Tablet", "Gel"],
    category: "NSAID",
    aliases: ["diclo", "diclofen", "voveran", "voltaren", "dynapar"]
  },
  {
    name: "Naproxen",
    brandNames: ["Aleve", "Naprosyn"],
    typicalDosage: "500mg",
    forms: ["Tablet"],
    category: "NSAID",
    aliases: ["napro", "naprosyn", "aleve"]
  },
  {
    name: "Tramadol",
    brandNames: ["Ultram", "Tramazac"],
    typicalDosage: "50mg",
    forms: ["Tablet"],
    category: "Analgesic",
    aliases: ["tram", "tramad", "ultram", "tramazac"]
  },
  {
    name: "Aspirin",
    brandNames: ["Bayer", "Ecosprin", "Disprin"],
    typicalDosage: "75mg",
    forms: ["Tablet"],
    category: "Antiplatelet / Analgesic",
    aliases: ["asa", "ecosprin", "disprin", "aspir"]
  },

  // Cardiovascular & Antihypertensives (Blood Pressure & Cholesterol)
  {
    name: "Atorvastatin",
    brandNames: ["Lipitor", "Atorva", "Storvas", "Tonact"],
    typicalDosage: "20mg",
    forms: ["Tablet"],
    category: "Statin / Lipid Lowering",
    aliases: ["ator", "atorva", "atorvas", "lipitor", "storvas", "tonact"]
  },
  {
    name: "Rosuvastatin",
    brandNames: ["Crestor", "Rosuvas", "Rozavel"],
    typicalDosage: "10mg",
    forms: ["Tablet"],
    category: "Statin / Lipid Lowering",
    aliases: ["rosu", "rosuva", "crestor", "rosuvas", "rozavel"]
  },
  {
    name: "Amlodipine",
    brandNames: ["Norvasc", "Amlong", "Amlokind", "Stamlo"],
    typicalDosage: "5mg",
    forms: ["Tablet"],
    category: "Antihypertensive (CCB)",
    aliases: ["amlo", "amlog", "amlong", "norvasc", "stamlo"]
  },
  {
    name: "Telmisartan",
    brandNames: ["Micardis", "Telma", "Telmikind", "Telsartan"],
    typicalDosage: "40mg",
    forms: ["Tablet"],
    category: "Antihypertensive (ARB)",
    aliases: ["telma", "telmi", "telmisar", "micardis"]
  },
  {
    name: "Losartan",
    brandNames: ["Cozaar", "Losacar", "Repace"],
    typicalDosage: "50mg",
    forms: ["Tablet"],
    category: "Antihypertensive (ARB)",
    aliases: ["losa", "losart", "cozaar", "losacar", "repace"]
  },
  {
    name: "Lisinopril",
    brandNames: ["Prinivil", "Zestril", "Listril"],
    typicalDosage: "10mg",
    forms: ["Tablet"],
    category: "Antihypertensive (ACEi)",
    aliases: ["lisin", "lisinop", "zestril", "listril"]
  },
  {
    name: "Metoprolol",
    brandNames: ["Lopressor", "Toprol-XL", "Betaloc", "Metolar"],
    typicalDosage: "50mg",
    forms: ["Tablet"],
    category: "Beta Blocker",
    aliases: ["meto", "metopr", "betaloc", "metolar", "lopressor"]
  },
  {
    name: "Hydrochlorothiazide",
    brandNames: ["Microzide", "Aquazide"],
    typicalDosage: "12.5mg",
    forms: ["Tablet"],
    category: "Diuretic",
    aliases: ["hctz", "hydrochlor", "aquazide"]
  },

  // Diabetes & Endocrine
  {
    name: "Metformin",
    brandNames: ["Glucophage", "Glycomet", "Obimet"],
    typicalDosage: "500mg",
    forms: ["Tablet"],
    category: "Antidiabetic (Biguanide)",
    aliases: ["metf", "metfor", "glycomet", "glucophage", "obimet"]
  },
  {
    name: "Glimepiride",
    brandNames: ["Amaryl", "Glimisave", "Zoryl"],
    typicalDosage: "2mg",
    forms: ["Tablet"],
    category: "Antidiabetic (Sulfonylurea)",
    aliases: ["glim", "glimep", "amaryl", "glimisave", "zoryl"]
  },
  {
    name: "Gliclazide",
    brandNames: ["Diamicron", "Reclide", "Glycinorm"],
    typicalDosage: "80mg",
    forms: ["Tablet"],
    category: "Antidiabetic (Sulfonylurea)",
    aliases: ["glic", "gliclaz", "diamicron", "reclide"]
  },
  {
    name: "Sitagliptin",
    brandNames: ["Januvia", "Istavel"],
    typicalDosage: "100mg",
    forms: ["Tablet"],
    category: "Antidiabetic (DPP-4)",
    aliases: ["sita", "sitaglip", "januvia", "istavel"]
  },
  {
    name: "Dapagliflozin",
    brandNames: ["Farxiga", "Forxiga", "Oxra"],
    typicalDosage: "10mg",
    forms: ["Tablet"],
    category: "Antidiabetic (SGLT2)",
    aliases: ["dapa", "dapaglif", "forxiga", "farxiga"]
  },
  {
    name: "Levothyroxine",
    brandNames: ["Synthroid", "Thyronorm", "Eltroxin"],
    typicalDosage: "50mcg",
    forms: ["Tablet"],
    category: "Thyroid Hormone",
    aliases: ["thyronorm", "eltroxin", "synthroid", "levo", "levothy"]
  },

  // Gastrointestinal (Acidity / Reflux / Digestion)
  {
    name: "Pantoprazole",
    brandNames: ["Protonix", "Pan", "Pan 40", "Pantocid", "Pantodac"],
    typicalDosage: "40mg",
    forms: ["Tablet"],
    category: "Proton Pump Inhibitor (PPI)",
    aliases: ["panto", "pantop", "pan40", "pantocid", "protonix"]
  },
  {
    name: "Omeprazole",
    brandNames: ["Prilosec", "Omez", "Omez 20", "Ocid"],
    typicalDosage: "20mg",
    forms: ["Capsule"],
    category: "Proton Pump Inhibitor (PPI)",
    aliases: ["omez", "omep", "omepra", "prilosec", "ocid"]
  },
  {
    name: "Rabeprazole",
    brandNames: ["Aciphex", "Rablet", "Happi", "Veloz"],
    typicalDosage: "20mg",
    forms: ["Tablet"],
    category: "Proton Pump Inhibitor (PPI)",
    aliases: ["rabe", "rabep", "rablet", "happi", "veloz"]
  },
  {
    name: "Esomeprazole",
    brandNames: ["Nexium", "Nexpro", "Esomac"],
    typicalDosage: "40mg",
    forms: ["Tablet"],
    category: "Proton Pump Inhibitor (PPI)",
    aliases: ["eso", "esom", "esomep", "nexium", "nexpro"]
  },
  {
    name: "Domperidone",
    brandNames: ["Motilium", "Domstal", "Vomitstop"],
    typicalDosage: "10mg",
    forms: ["Tablet"],
    category: "Antiemetic / Prokinetic",
    aliases: ["dom", "domp", "domstal", "motilium"]
  },

  // Allergy, Cough & Respiratory
  {
    name: "Cetirizine",
    brandNames: ["Zyrtec", "Cetzine", "Alerid", "Okacet"],
    typicalDosage: "10mg",
    forms: ["Tablet"],
    category: "Antihistamine",
    aliases: ["cet", "ceti", "cetir", "cetzine", "zyrtec", "alerid", "okacet"]
  },
  {
    name: "Levocetirizine",
    brandNames: ["Xyzal", "Levocet", "Vozet"],
    typicalDosage: "5mg",
    forms: ["Tablet"],
    category: "Antihistamine",
    aliases: ["levocet", "levoceti", "xyzal", "vozet"]
  },
  {
    name: "Montelukast",
    brandNames: ["Singulair", "Montair", "Monticope"],
    typicalDosage: "10mg",
    forms: ["Tablet"],
    category: "Leukotriene Receptor Antagonist",
    aliases: ["mont", "monte", "montair", "singulair", "monticope"]
  },
  {
    name: "Salbutamol",
    brandNames: ["Ventolin", "Asthalin"],
    typicalDosage: "4mg",
    forms: ["Tablet", "Inhaler"],
    category: "Bronchodilator",
    aliases: ["albuterol", "salb", "asthalin", "ventolin"]
  },

  // Vitamins, Minerals & Supplements
  {
    name: "Cholecalciferol (Vitamin D3)",
    brandNames: ["Calcirol", "D3 Must", "Uprise D3"],
    typicalDosage: "60,000 IU",
    forms: ["Capsule", "Sachet"],
    category: "Vitamin Supplement",
    aliases: ["vit d3", "vitd3", "d3", "cholecalciferol", "calcirol", "uprise"]
  },
  {
    name: "Methylcobalamin (Vitamin B12)",
    brandNames: ["Neurobion", "Methycobal", "Nurokind"],
    typicalDosage: "1500mcg",
    forms: ["Tablet", "Injection"],
    category: "Vitamin Supplement",
    aliases: ["b12", "vit b12", "methylo", "neurobion", "nurokind", "cobalamin"]
  },
  {
    name: "Calcium Carbonate",
    brandNames: ["Shelcal", "Caltrate", "Gemcal"],
    typicalDosage: "500mg",
    forms: ["Tablet"],
    category: "Mineral Supplement",
    aliases: ["calcium", "shelcal", "caltrate", "gemcal"]
  },
  {
    name: "Ferrous Ascorbate (Iron)",
    brandNames: ["Orofer XT", "Livogen", "Fefol"],
    typicalDosage: "100mg",
    forms: ["Tablet"],
    category: "Hematinic / Mineral",
    aliases: ["iron", "orofer", "livogen", "ferrous"]
  }
];

// 2. Clinical Lab Parameter Standard Reference Dictionary
export const CLINICAL_LAB_DICTIONARY = [
  {
    canonicalName: "Hemoglobin (Hb)",
    nameHi: "हीमोग्लोबिन (Hb)",
    namePa: "ਹੀਮੋਗਲੋਬਿਨ (Hb)",
    nameBn: "হিমোগ্লোবিন (Hb)",
    nameMr: "हिमोग्लोबिन (Hb)",
    nameEs: "Hemoglobina (Hb)",
    aliases: ["hemoglobin", "haemoglobin", "hb", "hgb"],
    unit: "g/dL",
    minNormal: 12.0,
    maxNormal: 15.5,
    category: "Complete Blood Count",
    explanation: {
      en: "Oxygen-carrying protein in red blood cells. Low values indicate anemia or fatigue.",
      hi: "लाल रक्त कोशिकाओं में ऑक्सीजन ले जाने वाला प्रोटीन। कम होने पर थकान या एनीमिया होता है।",
      pa: "ਖੂਨ ਵਿੱਚ ਆਕਸੀਜਨ ਲਿਜਾਣ ਵਾਲਾ ਪ੍ਰੋਟੀਨ।",
      bn: "লোহিত রক্তকণিকায় অক্সিজেন বহনকারী প্রোটিন।",
      mr: "रक्तातील ऑक्सिजन वाहून नेणारे प्रथिन.",
      es: "Proteína en los glóbulos rojos que transporta oxígeno."
    }
  },
  {
    canonicalName: "Fasting Blood Glucose",
    nameHi: "फास्टिंग ब्लड शुगर (खाली पेट)",
    namePa: "ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ",
    nameBn: "ফাস্টিং ব্লাড গ্লুকোজ",
    nameMr: "उपाशी पोटी रक्तातील साखर",
    nameEs: "Glucosa en Ayunas",
    aliases: ["fasting blood glucose", "fasting blood sugar", "fbs", "fasting glucose", "glucose fasting", "f sugar"],
    unit: "mg/dL",
    minNormal: 70,
    maxNormal: 99,
    category: "Metabolic / Diabetes",
    explanation: {
      en: "Morning blood sugar level measured after an overnight fast (8-10 hours).",
      hi: "रात भर के उपवास के बाद सुबह मापा जाने वाला रक्त शर्करा स्तर।",
      pa: "ਸਵੇਰੇ ਖਾਲੀ ਪੇਟ ਖੂਨ ਦੀ ਸ਼ੂਗਰ ਦਾ ਪੱਧਰ।",
      bn: "সকালে খালি পেটে রক্তে শর্করার মাত্রা।",
      mr: "सकाळी उपाशी पोटी तपासलेली रक्तातील साखर.",
      es: "Nivel de glucosa en sangre medido tras 8 a 10 horas de ayuno."
    }
  },
  {
    canonicalName: "Post-Prandial Glucose (PP)",
    nameHi: "भोजन के बाद का शुगर (PPBS)",
    namePa: "ਖਾਣੇ ਤੋਂ ਬਾਅਦ ਦੀ ਸ਼ੂਗਰ",
    nameBn: "খাবারের পরের সুগার (PPBS)",
    nameMr: "जेवणानंतरची साखर (PPBS)",
    nameEs: "Glucosa Postprandial",
    aliases: ["post prandial", "ppbs", "pp glucose", "post meal sugar", "pp sugar"],
    unit: "mg/dL",
    minNormal: 70,
    maxNormal: 140,
    category: "Metabolic / Diabetes",
    explanation: {
      en: "Blood sugar level measured 2 hours after a meal.",
      hi: "भोजन के 2 घंटे बाद मापा गया रक्त शर्करा स्तर।",
      pa: "ਭੋਜਨ ਤੋਂ 2 ਘੰਟੇ ਬਾਅਦ ਸ਼ੂਗਰ ਦਾ ਪੱਧਰ।",
      bn: "খাওয়ার ২ ঘণ্টা পর রক্তে শর্করার মাত্রা।",
      mr: "जेवणानंतर २ तासांनी तपासलेली साखर.",
      es: "Nivel de azúcar en sangre 2 horas después de comer."
    }
  },
  {
    canonicalName: "HbA1c (Glycated Hemoglobin)",
    nameHi: "एचबीए1सी (3 माह का औसत शुगर)",
    namePa: "ਐਚਬੀਏ1ਸੀ (3 ਮਹੀਨਿਆਂ ਦੀ ਸ਼ੂਗਰ)",
    nameBn: "এইচবিএ১সি (৩ মাসের গড় সুগার)",
    nameMr: "एचबीए१सी (३ महिन्यांची सरासरी साखर)",
    nameEs: "Hemoglobina Glicosilada (HbA1c)",
    aliases: ["hba1c", "glycated hemoglobin", "glycosylated hemoglobin", "a1c"],
    unit: "%",
    minNormal: 4.0,
    maxNormal: 5.7,
    category: "Metabolic / Diabetes",
    explanation: {
      en: "Weighted average blood glucose concentration over the past 90 days.",
      hi: "पिछले 90 दिनों का औसत रक्त शर्करा स्तर।",
      pa: "ਪਿਛਲੇ 3 ਮਹੀਨਿਆਂ ਦੀ ਔਸਤ ਸ਼ੂਗਰ।",
      bn: "গত ৯০ দিনের গড় রক্তের গ্লুকোজ।",
      mr: "मागील ३ महिन्यांची सरासरी रक्तातील साखर.",
      es: "Promedio estimado del nivel de azúcar en sangre en los últimos 90 días."
    }
  },
  {
    canonicalName: "Total Leukocytes (WBC)",
    nameHi: "श्वेत रक्त कोशिकाएं (WBC)",
    namePa: "ਚਿੱਟੇ ਰਕਤਾਣੂ (WBC)",
    nameBn: "শ্বেত রক্তকণিকা (WBC)",
    nameMr: "पांढऱ्या रक्तपेशी (WBC)",
    nameEs: "Leucocitos Totales (WBC)",
    aliases: ["wbc", "tlc", "white blood cells", "total leukocyte count", "leukocytes"],
    unit: "×10³/µL",
    minNormal: 4.0,
    maxNormal: 11.0,
    category: "Complete Blood Count",
    explanation: {
      en: "Immune defense cells that protect the body against microbial infections.",
      hi: "संक्रमण और कीटाणुओं से लड़ने वाली प्रतिरक्षा प्रणाली की कोशिकाएं।",
      pa: "ਸਰੀਰ ਨੂੰ ਇਨਫੈਕਸ਼ਨਾਂ ਤੋਂ ਬਚਾਉਣ ਵਾਲੇ ਚਿੱਟੇ ਸੈੱਲ।",
      bn: "রোগ প্রতিরোধকারী শ্বেত রক্তকণিকা।",
      mr: "संसर्गाविरुद्ध लढणाऱ्या रोगप्रतिकारक पेशी.",
      es: "Células del sistema inmune que defienden el cuerpo de infecciones."
    }
  },
  {
    canonicalName: "Platelet Count",
    nameHi: "प्लेटलेट्स (रक्त का थक्का)",
    namePa: "ਪਲੇਟਲੇਟਸ",
    nameBn: "প্লেটলেট কাউন্ট",
    nameMr: "प्लेटलेट्स",
    nameEs: "Plaquetas",
    aliases: ["platelet", "platelets", "plt", "thrombocyte", "thrombocytes"],
    unit: "×10³/µL",
    minNormal: 150,
    maxNormal: 450,
    category: "Complete Blood Count",
    explanation: {
      en: "Blood cell fragments essential for normal blood clotting and stopping bleeding.",
      hi: "खून का थक्का बनाकर आंतरिक व बाहरी रक्तस्राव रोकने वाली कोशिकाएं।",
      pa: "ਖੂਨ ਜੰਮਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਵਾਲੇ ਸੈੱਲ।",
      bn: "রক্ত জমাট বাঁধতে সাহায্যকারী কোষ।",
      mr: "रक्त गोठण्यास मदत करणाऱ्या पेशी.",
      es: "Fragmentos celulares indispensables para la coagulación sanguínea."
    }
  },
  {
    canonicalName: "Serum Creatinine",
    nameHi: "सीरम क्रिएटिनिन (किडनी कार्य)",
    namePa: "ਸੀਰਮ ਕ੍ਰੀਏਟਿਨਿਨ",
    nameBn: "সিরাম ক্রিয়েটিনিন",
    nameMr: "सीरम क्रिएटिनिन",
    nameEs: "Creatinina Sérica",
    aliases: ["creatinine", "serum creatinine", "creat", "s creatinine"],
    unit: "mg/dL",
    minNormal: 0.6,
    maxNormal: 1.2,
    category: "Renal Function",
    explanation: {
      en: "Primary biochemical indicator of kidney blood filtration efficiency.",
      hi: "गुर्दे (किडनी) द्वारा रक्त छानने की कार्यक्षमता का मुख्य संकेतक।",
      pa: "ਗੁਰਦਿਆਂ ਦੀ ਕਾਰਜਪ੍ਰਣਾਲੀ ਦਾ ਮੁੱਖ ਸੂਚਕ।",
      bn: "কিডনির কার্যকারিতার প্রধান সূচক।",
      mr: "मूत्रपिंडाच्या (किडनी) कार्यक्षमतेचा मुख्य निर्देशक.",
      es: "Indicador clave de la capacidad de filtración de los riñones."
    }
  },
  {
    canonicalName: "Blood Urea",
    nameHi: "ब्लड यूरिया (किडनी अपशिष्ट)",
    namePa: "ਬਲੱਡ ਯੂਰੀਆ",
    nameBn: "ব্লাড ইউরিয়া",
    nameMr: "ब्लड युरिया",
    nameEs: "Urea en Sangre",
    aliases: ["blood urea", "urea", "bun", "blood urea nitrogen"],
    unit: "mg/dL",
    minNormal: 15,
    maxNormal: 40,
    category: "Renal Function",
    explanation: {
      en: "Waste product from protein breakdown filtered out of blood by kidneys.",
      hi: "प्रोटीन पाचन का अपशिष्ट उत्पाद जिसे स्वस्थ किडनी बाहर निकालती है।",
      pa: "ਗੁਰਦਿਆਂ ਦੁਆਰਾ ਸਾਫ਼ ਕੀਤਾ ਜਾਣ ਵਾਲਾ ਤੱਤ।",
      bn: "প্রোটিন বিপাকের বর্জ্য পদার্থ।",
      mr: "प्रथिनांचे विघटन झाल्यानंतर तयार होणारा उत्सर्जक पदार्थ.",
      es: "Producto residual del metabolismo que los riñones eliminan."
    }
  },
  {
    canonicalName: "Total Cholesterol",
    nameHi: "कुल कोलेस्ट्रॉल",
    namePa: "ਕੁੱਲ ਕੋਲੇਸਟ੍ਰੋਲ",
    nameBn: "মোট কোলেস্টেরল",
    nameMr: "एकूण कोलेस्टेरॉल",
    nameEs: "Colesterol Total",
    aliases: ["total cholesterol", "cholesterol", "chol", "serum cholesterol"],
    unit: "mg/dL",
    minNormal: 120,
    maxNormal: 200,
    category: "Lipid Profile",
    explanation: {
      en: "Overall circulating blood fats; essential to keep within limits for heart health.",
      hi: "रक्त में वसा की कुल मात्रा; हृदय स्वास्थ्य के लिए सामान्य रहना आवश्यक है।",
      pa: "ਖੂਨ ਵਿੱਚ ਕੋਲੇਸਟ੍ਰੋਲ ਦੀ ਕੁੱਲ ਮਾਤਰਾ।",
      bn: "রক্তে চর্বির মোট পরিমাণ।",
      mr: "रक्तातील चरबीचे एकूण प्रमाण; हृदयाच्या आरोग्यासाठी महत्त्वाचे.",
      es: "Grasa total circulante en sangre; fundamental para la salud cardiovascular."
    }
  },
  {
    canonicalName: "Triglycerides",
    nameHi: "ट्राइग्लिसराइड्स (रक्त वसा)",
    namePa: "ਟ੍ਰਾਈਗਲਿਸਰਾਈਡਸ",
    nameBn: "ট্রাইগ্লিসারাইডস",
    nameMr: "ट्रायग्लिसराइड्स",
    nameEs: "Triglicéridos",
    aliases: ["triglycerides", "triglyceride", "tg", "trig"],
    unit: "mg/dL",
    minNormal: 50,
    maxNormal: 150,
    category: "Lipid Profile",
    explanation: {
      en: "Fats stored from unused dietary calories circulating in bloodstream.",
      hi: "भोजन से प्राप्त अतिरिक्त कैलोरी जो रक्त में वसा के रूप में घूमती है।",
      pa: "ਸਰੀਰ ਵਿੱਚ ਜਮ੍ਹਾਂ ਚਰਬੀ ਦਾ ਪੱਧਰ।",
      bn: "খাদ্য থেকে প্রাপ্ত অতিরিক্ত চর্বি।",
      mr: "अतिरिक्त अन्नामधून रक्तामध्ये साठवली जाणारी चरबी.",
      es: "Tipo de grasa circulante derivada de calorías no quemadas."
    }
  },
  {
    canonicalName: "HDL (Good Cholesterol)",
    nameHi: "एचडीएल (अच्छा कोलेस्ट्रॉल)",
    namePa: "ਐਚ.ਡੀ.ਐਲ (ਚੰਗਾ ਕੋਲੇਸਟ੍ਰੋਲ)",
    nameBn: "এইচডিএল (ভালো কোলেস্টেরল)",
    nameMr: "एचडीएल (चांगले कोलेस्टेरॉल)",
    nameEs: "Colesterol HDL (Bueno)",
    aliases: ["hdl", "hdl cholesterol", "good cholesterol"],
    unit: "mg/dL",
    minNormal: 40,
    maxNormal: 60,
    category: "Lipid Profile",
    explanation: {
      en: "Cardioprotective lipid that carries bad fats away from arteries.",
      hi: "सुरक्षात्मक अच्छा कोलेस्ट्रॉल जो धमनियों से खराब वसा को हटाता है।",
      pa: "ਦਿਲ ਦੀ ਰੱਖਿਆ ਕਰਨ ਵਾਲਾ ਚੰਗਾ ਕੋਲੇਸਟ੍ਰੋਲ।",
      bn: "ভালো কোলেস্টেরল যা ধমনী পরিষ্কার রাখে।",
      mr: "धमन्या स्वच्छ ठेवणारे संरक्षक चांगले कोलेस्टेरॉल.",
      es: "Colesterol de alta densidad que retira el exceso de grasa de las arterias."
    }
  },
  {
    canonicalName: "LDL (Bad Cholesterol)",
    nameHi: "एलडीएल (हानिकारक कोलेस्ट्रॉल)",
    namePa: "ਐਲ.ਡੀ.ਐਲ (ਮਾੜਾ ਕੋਲੇਸਟ੍ਰੋਲ)",
    nameBn: "এলডিএল (খারাপ কোলেস্টেরল)",
    nameMr: "एलडीएल (वाईट कोलेस्टेरॉल)",
    nameEs: "Colesterol LDL (Malo)",
    aliases: ["ldl", "ldl cholesterol", "bad cholesterol"],
    unit: "mg/dL",
    minNormal: 50,
    maxNormal: 100,
    category: "Lipid Profile",
    explanation: {
      en: "Artery-clogging fat associated with cardiovascular strain when elevated.",
      hi: "धमनियों में जमा होने वाला खराब वसा जो हृदय पर दबाव डालता है।",
      pa: "ਧਮਣੀਆਂ ਵਿੱਚ ਰੁਕਾਵਟ ਪਾਉਣ ਵਾਲਾ ਮਾੜਾ ਕੋਲੇਸਟ੍ਰੋਲ।",
      bn: "খারাপ চর্বি যা ধমনীতে ব্লকেজ তৈরি করতে পারে।",
      mr: "धमन्यांमध्ये अडथळा निर्माण करणारे हानिकारक कोलेस्टेरॉल.",
      es: "Grasa perjudicial que puede acumularse en las paredes de las arterias."
    }
  },
  {
    canonicalName: "Total Bilirubin",
    nameHi: "कुल बिलीरुबिन (लिवर/पीलिया)",
    namePa: "ਕੁੱਲ ਬਿਲੀਰੂਬਿਨ",
    nameBn: "মোট বিলিরুবিন",
    nameMr: "एकूण बिलीरुबिन",
    nameEs: "Bilirrubina Total",
    aliases: ["bilirubin", "total bilirubin", "bili total", "t bili"],
    unit: "mg/dL",
    minNormal: 0.2,
    maxNormal: 1.2,
    category: "Liver Function",
    explanation: {
      en: "Yellowish bile pigment produced during normal red blood cell breakdown.",
      hi: "लिवर का पित्त वर्णक; अधिक होने पर पीलिया (जॉन्डिस) की संभावना होती है।",
      pa: "ਪੀਲੀਏ ਦੀ ਜਾਂਚ ਲਈ ਲਿਵਰ ਦਾ ਟੈਸਟ।",
      bn: "লিভারের পিত্ত উপাদান; বৃদ্ধি পেলে জন্ডিস হতে পারে।",
      mr: "यकृताचे पित्त रंगद्रव्य; वाढल्यास कावीळ होऊ शकते.",
      es: "Pigmento biliar amarillento cuyo aumento indica ictericia o afección hepática."
    }
  },
  {
    canonicalName: "SGPT (ALT)",
    nameHi: "एसजीपीटी (ALT - लिवर एंजाइम)",
    namePa: "ਐਸ.ਜੀ.ਪੀ.ਟੀ",
    nameBn: "এসজিপিটি (ALT)",
    nameMr: "एसजीपीटी (ALT)",
    nameEs: "SGPT (ALT)",
    aliases: ["sgpt", "alt", "alanine aminotransferase", "sgpt / alt"],
    unit: "U/L",
    minNormal: 7,
    maxNormal: 56,
    category: "Liver Function",
    explanation: {
      en: "Specific liver cell enzyme; elevated levels indicate liver cell stress or inflammation.",
      hi: "लिवर कोशिकाओं का मुख्य एंजाइम; बढ़ने पर लिवर सूजन का संकेत मिलता है।",
      pa: "ਲਿਵਰ ਦੀ ਕਾਰਜਪ੍ਰਣਾਲੀ ਦਾ ਐਂਜ਼ਾਈਮ।",
      bn: "লিভার কোষের মূল এনজাইম।",
      mr: "यकृताच्या आरोग्याशी संबंधित महत्त्वाचा एन्झाईम.",
      es: "Enzima hepática clave; valores altos reflejan inflamación o sobrecarga hepática."
    }
  },
  {
    canonicalName: "SGOT (AST)",
    nameHi: "एसजीओटी (AST - लिवर एंजाइम)",
    namePa: "ਐਸ.ਜੀ.ਓ.ਟੀ",
    nameBn: "এসজিওটি (AST)",
    nameMr: "एसजीओटी (AST)",
    nameEs: "SGOT (AST)",
    aliases: ["sgot", "ast", "aspartate aminotransferase", "sgot / ast"],
    unit: "U/L",
    minNormal: 10,
    maxNormal: 40,
    category: "Liver Function",
    explanation: {
      en: "Enzyme present in liver and muscle tissues.",
      hi: "लिवर और मांसपेशियों में पाया जाने वाला एंजाइम।",
      pa: "ਲਿਵਰ ਅਤੇ ਮਾਸਪੇਸ਼ੀਆਂ ਦਾ ਐਂਜ਼ਾਈਮ।",
      bn: "লিভার ও পেশির এনজাইম।",
      mr: "यकृत आणि स्नायूंमधील एन्झाईम.",
      es: "Enzima presente en hígado y tejido muscular."
    }
  },
  {
    canonicalName: "TSH (Thyroid Stimulating Hormone)",
    nameHi: "टी.एस.एच (थायराइड प्रेरक हार्मोन)",
    namePa: "ਟੀ.ਐਸ.ਐਚ (ਥਾਇਰਾਇਡ)",
    nameBn: "টিএসএইচ (থাইরয়েড)",
    nameMr: "टीएसएच (थायरॉईड संप्रेरक)",
    nameEs: "TSH (Hormona Estimulante de Tiroides)",
    aliases: ["tsh", "thyroid stimulating hormone", "s tsh", "serum tsh"],
    unit: "µIU/mL",
    minNormal: 0.4,
    maxNormal: 4.5,
    category: "Thyroid Profile",
    explanation: {
      en: "Pituitary hormone that regulates thyroid gland activity and metabolic speed.",
      hi: "थायराइड ग्रंथि और चयापचय (मेटाबॉलिज्म) को नियंत्रित करने वाला मुख्य हार्मोन।",
      pa: "ਥਾਇਰਾਇਡ ਨੂੰ ਕੰਟਰੋਲ ਕਰਨ ਵਾਲਾ ਹਾਰਮੋਨ।",
      bn: "থাইরয়েড গ্রন্থি নিয়ন্ত্রণকারী হরমোন।",
      mr: "थायरॉईड ग्रंथी व चयापचय नियंत्रित करणारे संप्रेरक.",
      es: "Hormona que regula la producción tiroidea y el ritmo metabólico general."
    }
  },
  {
    canonicalName: "Vitamin D (25-OH)",
    nameHi: "विटामिन डी (25-OH)",
    namePa: "ਵਿਟਾਮਿਨ ਡੀ",
    nameBn: "ভিটামিন ডি (২৫-OH)",
    nameMr: "व्हिटॅमिन डी",
    nameEs: "Vitamina D (25-OH)",
    aliases: ["vitamin d", "vit d", "25-oh vitamin d", "25-hydroxy vitamin d", "d3"],
    unit: "ng/mL",
    minNormal: 30.0,
    maxNormal: 100.0,
    category: "Vitamins & Minerals",
    explanation: {
      en: "Crucial for bone density, calcium absorption, and immune defenses.",
      hi: "हड्डियों की मजबूती, कैल्शियम सोखने और रोग प्रतिरोधक क्षमता के लिए आवश्यक।",
      pa: "ਹੱਡੀਆਂ ਦੀ ਮਜ਼ਬੂਤੀ ਅਤੇ ਕੈਲਸ਼ੀਅਮ ਲਈ ਜ਼ਰੂਰੀ ਵਿਟਾਮਿਨ।",
      bn: "হাড়ের ঘনত্ব ও ক্যালসিয়াম শোষণের জন্য অপরিহার্য।",
      mr: "हाडांची बळकटी आणि रोगप्रतिकारशक्तीसाठी अत्यंत आवश्यक व्हिटॅमिन.",
      es: "Vital para la fijación de calcio en huesos y la función inmunitaria."
    }
  },
  {
    canonicalName: "Vitamin B12",
    nameHi: "विटामिन बी12",
    namePa: "ਵਿਟਾਮਿਨ ਬੀ12",
    nameBn: "ভিটামিন বি১২",
    nameMr: "व्हिटॅमिन बी१२",
    nameEs: "Vitamina B12",
    aliases: ["vitamin b12", "vit b12", "b12", "cyanocobalamin"],
    unit: "pg/mL",
    minNormal: 200,
    maxNormal: 900,
    category: "Vitamins & Minerals",
    explanation: {
      en: "Essential for nervous system health, cognitive energy, and red blood cell creation.",
      hi: "तंत्रिका (नसों) के स्वास्थ्य और लाल रक्त कोशिकाओं के निर्माण के लिए आवश्यक।",
      pa: "ਨਾੜੀਆਂ ਦੀ ਤਾਕਤ ਅਤੇ ਖੂਨ ਦੇ ਨਿਰਮਾਣ ਲਈ ਜ਼ਰੂਰੀ।",
      bn: "স্নায়ুতন্ত্র ও রক্তকণিকা গঠনের জন্য অপরিহার্য।",
      mr: "मज्जासंस्थेचे आरोग्य व रक्तनिर्मितीसाठी आवश्यक जीवनसत्त्व.",
      es: "Esencial para el sistema nervioso y la síntesis de glóbulos rojos."
    }
  },
  {
    canonicalName: "Serum Calcium",
    nameHi: "सीरम कैल्शियम",
    namePa: "ਸੀਰਮ ਕੈਲਸ਼ੀਅਮ",
    nameBn: "সিরাম ক্যালসিয়াম",
    nameMr: "सीरम कॅल्शियम",
    nameEs: "Calcio Sérico",
    aliases: ["calcium", "serum calcium", "ca", "s ca"],
    unit: "mg/dL",
    minNormal: 8.5,
    maxNormal: 10.5,
    category: "Vitamins & Minerals",
    explanation: {
      en: "Essential mineral for bone strength, cardiac rhythm, and muscular contraction.",
      hi: "हड्डियों की दृढ़ता, मांसपेशियों और हृदय की धड़कन के लिए आवश्यक खनिज।",
      pa: "ਹੱਡੀਆਂ ਦੀ ਮਜ਼ਬੂਤੀ ਲਈ ਤੱਤ।",
      bn: "হাড়ের শক্তি ও পেশির জন্য জরুরি খনিজ।",
      mr: "हाडांची ताकद आणि हृदयाच्या ठोक्यांसाठी आवश्यक खनिज.",
      es: "Mineral fundamental para la densidad ósea y la contracción muscular."
    }
  }
];

// 3. String Distance & Normalization Helpers
export function normalizeOcrText(str) {
  if (!str) return "";
  return String(str)
    .toLowerCase()
    .replace(/[~`!@#$%^&*()_+=|{}[\]:;"'<>,.?/\\]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Levenshtein distance algorithm
export function levenshteinDistance(a, b) {
  if (!a || !b) return (a || b || "").length;
  const s1 = a.toLowerCase();
  const s2 = b.toLowerCase();
  
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[m][n];
}

// Normalized Similarity metric (0.0 to 1.0)
export function calculateSimilarity(s1, s2) {
  if (!s1 || !s2) return 0.0;
  const norm1 = normalizeOcrText(s1);
  const norm2 = normalizeOcrText(s2);
  if (norm1 === norm2) return 1.0;
  if (!norm1 || !norm2) return 0.0;

  // Prefix match boost for truncated doctor handwriting (e.g., "amox..." -> "amoxicillin")
  if (norm1.length >= 3 && norm2.startsWith(norm1)) {
    return Math.min(0.92, 0.70 + (norm1.length / norm2.length) * 0.25);
  }
  if (norm2.length >= 3 && norm1.startsWith(norm2)) {
    return Math.min(0.92, 0.70 + (norm2.length / norm1.length) * 0.25);
  }

  const maxLen = Math.max(norm1.length, norm2.length);
  const dist = levenshteinDistance(norm1, norm2);
  const sim = Math.max(0, 1.0 - (dist / maxLen));
  return parseFloat(sim.toFixed(2));
}

// 4. Intelligent Medical Reconstruction Engine
/**
 * Contextually reconstructs scribbled or partial doctor words using FDA drug & lab dictionaries.
 * @param {string} rawInput - Messy extracted text fragment
 * @param {'prescription'|'lab'|'auto'} type - Search scope
 * @returns {object} Reconstructed medical match with confidence score and verification guardrail
 */
export function reconstructMedicalTerm(rawInput, type = 'auto') {
  if (!rawInput || typeof rawInput !== 'string') {
    return {
      rawInput: rawInput || '',
      reconstructedName: rawInput || 'Unclear',
      confidence: 0.1,
      requiresVerification: true,
      matchType: 'empty',
      matchedEntry: null
    };
  }

  const cleanInput = normalizeOcrText(rawInput);
  if (cleanInput.length < 2) {
    return {
      rawInput,
      reconstructedName: rawInput,
      confidence: 0.2,
      requiresVerification: true,
      matchType: 'too_short',
      matchedEntry: null
    };
  }

  let bestMatch = null;
  let highestScore = 0;
  let matchCategory = 'unknown';

  // A. Search FDA Drug Index (if type is prescription or auto)
  if (type === 'prescription' || type === 'auto') {
    for (const drug of FDA_DRUG_INDEX) {
      // 1. Exact match on canonical name
      if (cleanInput === drug.name.toLowerCase()) {
        return {
          rawInput,
          reconstructedName: drug.name,
          confidence: 0.98,
          requiresVerification: false,
          matchType: 'exact_drug',
          matchedEntry: drug
        };
      }

      // 2. Check brand names
      for (const brand of drug.brandNames) {
        if (cleanInput === brand.toLowerCase()) {
          return {
            rawInput,
            reconstructedName: `${drug.name} (${brand})`,
            confidence: 0.95,
            requiresVerification: false,
            matchType: 'brand_exact',
            matchedEntry: drug
          };
        }
        const bSim = calculateSimilarity(cleanInput, brand);
        if (bSim > highestScore) {
          highestScore = bSim;
          bestMatch = {
            reconstructedName: `${drug.name} (${brand})`,
            entry: drug,
            category: 'brand_fuzzy'
          };
        }
      }

      // 3. Check aliases and generic name fuzzy
      for (const alias of drug.aliases) {
        if (cleanInput === alias.toLowerCase()) {
          const score = 0.92;
          if (score > highestScore) {
            highestScore = score;
            bestMatch = {
              reconstructedName: drug.name,
              entry: drug,
              category: 'alias_exact'
            };
          }
        }
        const aSim = calculateSimilarity(cleanInput, alias);
        if (aSim > highestScore) {
          highestScore = aSim;
          bestMatch = {
            reconstructedName: drug.name,
            entry: drug,
            category: 'alias_fuzzy'
          };
        }
      }

      const dSim = calculateSimilarity(cleanInput, drug.name);
      if (dSim > highestScore) {
        highestScore = dSim;
        bestMatch = {
          reconstructedName: drug.name,
          entry: drug,
          category: 'drug_fuzzy'
        };
      }
    }
  }

  // B. Search Clinical Lab Dictionary (if type is lab or auto)
  if (type === 'lab' || type === 'auto') {
    for (const lab of CLINICAL_LAB_DICTIONARY) {
      if (cleanInput === lab.canonicalName.toLowerCase()) {
        return {
          rawInput,
          reconstructedName: lab.canonicalName,
          confidence: 0.99,
          requiresVerification: false,
          matchType: 'exact_lab',
          matchedEntry: lab
        };
      }

      for (const alias of lab.aliases) {
        if (cleanInput === alias.toLowerCase()) {
          const score = 0.94;
          if (score > highestScore) {
            highestScore = score;
            bestMatch = {
              reconstructedName: lab.canonicalName,
              entry: lab,
              category: 'lab_alias_exact'
            };
          }
        }
        const lSim = calculateSimilarity(cleanInput, alias);
        if (lSim > highestScore) {
          highestScore = lSim;
          bestMatch = {
            reconstructedName: lab.canonicalName,
            entry: lab,
            category: 'lab_alias_fuzzy'
          };
        }
      }

      const labSim = calculateSimilarity(cleanInput, lab.canonicalName);
      if (labSim > highestScore) {
        highestScore = labSim;
        bestMatch = {
          reconstructedName: lab.canonicalName,
          entry: lab,
          category: 'lab_fuzzy'
        };
      }
    }
  }

  // Guardrail Threshold: confidence < 0.60 requires human verification
  const confidence = parseFloat(highestScore.toFixed(2));
  const requiresVerification = confidence < 0.60;

  if (highestScore >= 0.60 && bestMatch) {
    return {
      rawInput,
      reconstructedName: bestMatch.reconstructedName,
      confidence,
      requiresVerification: false,
      matchType: bestMatch.category,
      matchedEntry: bestMatch.entry
    };
  }

  // Unclear / Illegible handwriting fallback - strictly avoid hallucination!
  return {
    rawInput,
    reconstructedName: rawInput, // Preserve raw text so user can see what was detected
    confidence: Math.max(0.2, confidence),
    requiresVerification: true,
    matchType: 'unclear_handwriting',
    matchedEntry: bestMatch ? bestMatch.entry : null
  };
}
