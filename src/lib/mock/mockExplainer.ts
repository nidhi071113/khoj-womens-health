import { Language } from '../types';

export interface SymptomMatch {
  code: string;
  label: string;
  category: 'period' | 'body' | 'skin_hair' | 'mood' | 'postpartum' | 'other';
  confidence: number;
}

// Maps colloquial phrases (English, Hindi, Marathi, Hinglish) to symptom codes
export function parseNaturalLanguageSymptoms(query: string): SymptomMatch[] {
  const q = query.toLowerCase().trim();
  const matches: SymptomMatch[] = [];

  const dictionaries: { keywords: string[]; match: SymptomMatch }[] = [
    {
      keywords: ['chakkar', 'dizzy', 'dizziness', 'head spinning', 'behosh', 'chakkar aate hain', 'faint'],
      match: { code: 'dizziness', label: 'Dizziness / Lightheadedness', category: 'body', confidence: 0.95 }
    },
    {
      keywords: ['thakaan', 'tired', 'fatigue', 'exhausted', 'bahut thakaan', 'lethargic', 'low energy', 'kamzori', 'sust'],
      match: { code: 'fatigue', label: 'Fatigue / Low energy', category: 'body', confidence: 0.95 }
    },
    {
      keywords: ['pet mein kheench', 'pet dard', 'cramp', 'cramps', 'pain', 'pelvic pain', 'kamar dard', 'dardi'],
      match: { code: 'cramps', label: 'Severe Cramps / Pelvic Pain', category: 'period', confidence: 0.92 }
    },
    {
      keywords: ['heavy bleeding', 'zyada bleeding', 'bahut bleeding', 'pad soak', 'clots', 'raktastrav', 'overbleed'],
      match: { code: 'heavy_bleeding', label: 'Heavy Bleeding', category: 'period', confidence: 0.96 }
    },
    {
      keywords: ['baal jhadna', 'hair fall', 'hair loss', 'bal girna', 'keshagalan', 'thinning'],
      match: { code: 'hair_fall', label: 'Hair Fall / Thinning', category: 'skin_hair', confidence: 0.93 }
    },
    {
      keywords: ['sar dard', 'headache', 'migraine', 'sar dukhna', 'doke dukhne'],
      match: { code: 'headache', label: 'Headache / Migraine', category: 'body', confidence: 0.90 }
    },
    {
      keywords: ['chiddchidahat', 'mood swing', 'irritability', 'mood', 'rona aana', 'ghabrahat', 'anxious'],
      match: { code: 'mood_swings', label: 'Mood Swings / Anxiety', category: 'mood', confidence: 0.88 }
    },
    {
      keywords: ['irregular', 'cycle late', 'period miss', 'time pe nahi', 'cycle upar neeche'],
      match: { code: 'irregular_cycle', label: 'Irregular Cycles', category: 'period', confidence: 0.91 }
    },
    {
      keywords: ['acne', 'pimples', 'muhase', 'phunsi'],
      match: { code: 'acne', label: 'Acne / Breakouts', category: 'skin_hair', confidence: 0.90 }
    },
    {
      keywords: ['bloating', 'pet phoolna', 'gas', 'heavy belly'],
      match: { code: 'bloating', label: 'Bloating / Heaviness', category: 'body', confidence: 0.89 }
    }
  ];

  for (const item of dictionaries) {
    if (item.keywords.some(kw => q.includes(kw))) {
      matches.push(item.match);
    }
  }

  return matches;
}

export function generateAppointmentScript(userName: string = 'Priya', topPattern?: string): string {
  if (topPattern && topPattern.includes('iron')) {
    return `"Doctor, thank you for seeing me. Over the past 4 months, I have noticed that on my heaviest period days, I feel severe fatigue and occasional dizziness that doesn't go away with resting. I brought my Khoj timeline summary. Could we check my hemoglobin and ferritin levels to see if iron deficiency is playing a role?"`;
  }
  return `"Doctor, I have been keeping track of how I feel over recent months. I’ve noticed recurring symptoms that affect my energy and day-to-day comfort. Here is my one-page health timeline summary so we can discuss the most effective steps."`;
}

export function getAppointmentRehearsalCards() {
  return [
    {
      dismissivePhrase: "It's just stress. Modern work is exhausting for everyone.",
      calmResponse: "I understand stress can play a role, doctor, but these symptoms specifically worsen during my heaviest flow days. Could we run a basic blood test (CBC and ferritin) to rule out physical causes before attributing it only to stress?"
    },
    {
      dismissivePhrase: "Everyone has painful or heavy periods; it's natural.",
      calmResponse: "I appreciate that some discomfort is common, but my check-ins show I'm needing to change pads every 2 hours and feeling lightheaded. I want to make sure we aren't overlooking anemia or other manageable conditions."
    },
    {
      dismissivePhrase: "Just take painkillers and come back if it continues for 6 more months.",
      calmResponse: "I've already logged 4 months of these symptoms, and simple painkillers aren't restoring my energy. What non-invasive tests or cycle adjustments can we explore today?"
    }
  ];
}

export function generateFamilyExplanation(lang: Language = 'en'): string {
  if (lang === 'hi') {
    return `नमस्ते। मैं पिछले कुछ महीनों से अपने स्वास्थ्य और पीरियड्स के संकेतों पर नज़र रख रही हूँ। मैंने देखा है कि पीरियड्स के दौरान ज़्यादा ब्लीडिंग की वजह से मुझे काफी कमज़ोरी और चक्कर महसूस होते हैं। डॉक्टर ने बेसिक ब्लड टेस्ट (CBC और आयरन) कराने की सलाह दी है। कृपया चिंता न करें, यह सिर्फ अपने स्वास्थ्य को बेहतर समझने और सही देखभाल के लिए है।`;
  }
  if (lang === 'mr') {
    return `नमस्कार. मी गेल्या काही महिन्यांपासून माझ्या आरोग्याची आणि मासिक पाळीची नोंद ठेवत आहे. मला जास्त रक्तस्त्रावामुळे अशक्तपणा आणि थकवा जाणवतो आहे. डॉक्टरांनी साधी रक्त तपासणी (CBC व आयर्न) करून घेण्याचा सल्ला दिला आहे. काळजीचे काही कारण नाही, हे केवळ आरोग्य चांगले राहण्यासाठी आणि वेळेवर काळजी घेण्यासाठी आहे.`;
  }
  return `Hi. I have been keeping track of my health and cycle symptoms over the past few months. I noticed that during heavy period days, I experience significant fatigue and occasional dizziness. I am planning a routine doctor check-up and simple blood test (CBC & Ferritin) to make sure my iron reserves are healthy. No need to worry—this is just proactive self-care.`;
}
