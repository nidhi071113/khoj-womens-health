import { Language } from './types';

export interface Translations {
  brand: {
    name: string;
    tagline: string;
    subTagline: string;
    notADiagnosis: string;
    demoChip: string;
  };
  stages: {
    suno: string;
    suraksha: string;
    jodo: string;
    raah: string;
    saath: string;
  };
  nav: {
    home: string;
    checkin: string;
    threads: string;
    care: string;
    passport: string;
    cycle: string;
    selfCare: string;
    diary: string;
    more: string;
    settings: string;
    discreetActive: string;
  };
  auth: {
    eyebrow: string;
    heroTitle: string;
    heroSub: string;
    signInTab: string;
    createAccountTab: string;
    welcomeBack: string;
    continueJourney: string;
    startJourney: string;
    fullName: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    forgotPassword: string;
    signInBtn: string;
    createAccountBtn: string;
    or: string;
    tryDemoBtn: string;
    demoSubtext: string;
    quote: string;
    privateNote: string;
    prototypeNote: string;
    sunoBadge: string;
    sunoDesc: string;
    jodoBadge: string;
    jodoDesc: string;
    raahBadge: string;
    raahDesc: string;
    saathBadge: string;
    saathDesc: string;
    errors: {
      nameRequired: string;
      emailInvalid: string;
      passwordMin: string;
      passwordMismatch: string;
    };
  };
  cycle: {
    title: string;
    subtitle: string;
    periodStartedToday: string;
    periodEndedToday: string;
    today: string;
    days: string;
    nextExpected: string;
    nextExpectedRange: string;
    estimateNote: string;
    avgCycleLength: string;
    avgPeriodLength: string;
    longestCycle: string;
    shortestCycle: string;
    cycleLengthChart: string;
    allCycles: string;
    irregularTitle: string;
    irregularBadge: string;
    irregularDesc: string;
    notADiagnosis: string;
    seeDetails: string;
    legendPeriod: string;
    legendPredicted: string;
    legendToday: string;
    legendSymptoms: string;
    logPeriodModalTitle: string;
    flowLabel: string;
    painLabel: string;
    moodLabel: string;
    notesLabel: string;
    saveLog: string;
    cancel: string;
    flows: {
      spotting: string;
      light: string;
      moderate: string;
      heavy: string;
    };
  };
  selfCare: {
    heroTag: string;
    heroTitle: string;
    heroSub: string;
    dailyThoughtTitle: string;
    dailyThoughtSub: string;
    writeInDiary: string;
    writeInDiaryDesc: string;
    openDiary: string;
    tabEatingWell: string;
    tabRestMovement: string;
    tabComfort: string;
    tabDiary: string;
    tabWhenToSeekCare: string;
    relatedToPattern: string;
    patternBannerDesc: string;
    saveToPassportBtn: string;
    foodsThatMayHelp: string;
    exploreAllIdeas: string;
    showLess: string;
    otherHelpfulIdeas: string;
    thingsToBeMindfulOf: string;
    whatFeelsRightToday: string;
    whatFeelsRightSub: string;
    options: {
      rest: string;
      stretch: string;
      walk: string;
      break: string;
    };
    comfortToday: string;
    seeAllGuidance: string;
    emergencyCallBtn: string;
    findCareBtn: string;
  };
  diary: {
    title: string;
    subtitle: string;
    lockNote: string;
    promptTitle: string;
    howFeeling: string;
    titleLabel: string;
    titlePlaceholder: string;
    bodyPlaceholder: string;
    linkCheckinLabel: string;
    saveEntryBtn: string;
    draftSaved: string;
    tabMyEntries: string;
    tabPrompts: string;
    searchPlaceholder: string;
    allMoods: string;
    noEntriesYet: string;
    writeFirstEntry: string;
    deleteConfirm: string;
    sensitiveTitle: string;
    sensitiveDesc: string;
    helplineText: string;
    promptsList: string[];
    moods: {
      calm: string;
      okay: string;
      low: string;
      anxious: string;
      tired: string;
      hopeful: string;
    };
  };
  tour: {
    welcomeTitle: string;
    welcomeDesc: string;
    quickTourBtn: string;
    exploreOwnBtn: string;
    steps: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
    };
    next: string;
    back: string;
    skip: string;
    finish: string;
  };
  landing: {
    eyebrow: string;
    heroTitle: string;
    heroSub: string;
    startBtn: string;
    seeHowBtn: string;
    privateNote: string;
    floatingPattern: string;
    guidanceHeading: string;
    sayItTitle: string;
    sayItDesc: string;
    seeThreadTitle: string;
    seeThreadDesc: string;
    knowStepTitle: string;
    knowStepDesc: string;
    preparedHeading: string;
    finalCtaHeading: string;
    footerDisclaimer: string;
  };
  onboarding: {
    step1Title: string;
    step1Sub: string;
    namePlaceholder: string;
    nameLabel: string;
    step2Title: string;
    step2Sub: string;
    step3Title: string;
    step3Sub: string;
    step4Title: string;
    step4Sub: string;
    skip: string;
    back: string;
    next: string;
    finish: string;
    reassurance: string;
    weavingThread: string;
  };
  safety: {
    title: string;
    urgentMessage: string;
    emergencyCallBtn: string;
    hospitalBtn: string;
    imOkayBtn: string;
    disclaimer: string;
  };
  home: {
    greeting: string;
    greetingSub: string;
    howFeeling: string;
    chipFine: string;
    chipTired: string;
    chipPain: string;
    chipMood: string;
    chipOther: string;
    todayInsight: string;
    whySeeingThis: string;
    cycleSnapshot: string;
    cycleRange: string;
    remindersTitle: string;
    dataPrivate: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    brand: {
      name: 'Khoj',
      tagline: 'Find what your body is trying to tell you.',
      subTagline: 'Connect your symptoms. Know your next step.',
      notADiagnosis: 'Patterns are possibilities, not a diagnosis. In emergencies, call 112.',
      demoChip: 'Demo Mode: Sample data, not medical advice'
    },
    stages: {
      suno: 'SUNO (Listen)',
      suraksha: 'SURAKSHA (Safety)',
      jodo: 'JODO (Connect)',
      raah: 'RAAH (Next Step)',
      saath: 'SAATH (Carry Forward)'
    },
    nav: {
      home: 'Home',
      checkin: 'Check-in',
      threads: 'Threads',
      care: 'Find Care',
      passport: 'Passport',
      cycle: 'Cycle',
      selfCare: 'Self-care',
      diary: 'Diary',
      more: 'More',
      settings: 'Settings & Privacy',
      discreetActive: 'Notes (Discreet Mode)'
    },
    auth: {
      eyebrow: "YOUR WOMEN'S HEALTH COMPANION",
      heroTitle: 'Find what your body is trying to tell you.',
      heroSub: 'Connect your symptoms over time, understand the pattern, and walk into the clinic knowing what to ask.',
      signInTab: 'Sign in',
      createAccountTab: 'Create account',
      welcomeBack: 'Welcome back',
      continueJourney: 'Continue your journey with KHOJ.',
      startJourney: 'Create your private account on KHOJ.',
      fullName: 'Full name',
      namePlaceholder: 'e.g. Priya Sharma',
      email: 'Email address',
      emailPlaceholder: 'you@example.com',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPassword: 'Confirm password',
      forgotPassword: 'Forgot password?',
      signInBtn: 'Sign in →',
      createAccountBtn: 'Create account →',
      or: 'or',
      tryDemoBtn: 'Try demo without signing up',
      demoSubtext: "Explore with Priya's demo data",
      quote: '"Because every woman deserves to be heard."',
      privateNote: 'Your data stays private (on this device in this demo)',
      prototypeNote: 'Educational prototype. Not a diagnosis. In an emergency call 112.',
      sunoBadge: 'SUNO',
      sunoDesc: 'Log your symptoms',
      jodoBadge: 'JODO',
      jodoDesc: 'See your patterns',
      raahBadge: 'RAAH',
      raahDesc: 'Get guidance',
      saathBadge: 'SAATH',
      saathDesc: 'Find the right care',
      errors: {
        nameRequired: 'Please enter your name',
        emailInvalid: 'Please enter a valid email address',
        passwordMin: 'Password must be at least 8 characters',
        passwordMismatch: 'Passwords do not match'
      }
    },
    cycle: {
      title: 'Your cycle, your story',
      subtitle: 'Track, understand and see the bigger picture.',
      periodStartedToday: 'Period started today',
      periodEndedToday: 'Period ended today',
      today: 'Today',
      days: 'days',
      nextExpected: 'Next period expected in about',
      nextExpectedRange: '8 – 12 days',
      estimateNote: 'Estimates vary based on your past cycles.',
      avgCycleLength: 'Avg. cycle length',
      avgPeriodLength: 'Avg. period length',
      longestCycle: 'Longest cycle',
      shortestCycle: 'Shortest cycle',
      cycleLengthChart: 'Cycle length (last 6 cycles)',
      allCycles: 'All cycles',
      irregularTitle: 'Your cycle seems a little irregular',
      irregularBadge: 'Medium',
      irregularDesc: 'Your last 3 cycle lengths vary by more than 7 days. This is worth mentioning to a doctor.',
      notADiagnosis: 'Not a diagnosis.',
      seeDetails: 'See details →',
      legendPeriod: 'Period day',
      legendPredicted: 'Predicted period',
      legendToday: 'Today',
      legendSymptoms: 'Symptoms',
      logPeriodModalTitle: 'Log cycle day',
      flowLabel: 'Flow',
      painLabel: 'Pain severity (0-3)',
      moodLabel: 'Mood',
      notesLabel: 'Notes (optional)',
      saveLog: 'Save day log',
      cancel: 'Cancel',
      flows: {
        spotting: 'Spotting',
        light: 'Light',
        moderate: 'Moderate',
        heavy: 'Heavy'
      }
    },
    selfCare: {
      heroTag: 'Self-care',
      heroTitle: 'A little care, just for you.',
      heroSub: 'Small, gentle ways to care for your body and mind, at your own pace.',
      dailyThoughtTitle: 'You deserve a moment for yourself today.',
      dailyThoughtSub: 'A calmer mind and a kinder body can make everyday life a little easier.',
      writeInDiary: 'Write in your diary',
      writeInDiaryDesc: 'Your thoughts matter. Take a moment to write, reflect and be kind to yourself.',
      openDiary: 'Open diary →',
      tabEatingWell: 'Eating well',
      tabRestMovement: 'Rest & movement',
      tabComfort: 'Comfort',
      tabDiary: 'Diary',
      tabWhenToSeekCare: 'When to seek care',
      relatedToPattern: 'Related to your pattern',
      patternBannerDesc: 'Your recent patterns suggest possible iron deficiency. These are general ideas to discuss with a clinician, not treatment. Do not start iron supplements unless a clinician advises it.',
      saveToPassportBtn: 'Save to my passport questions →',
      foodsThatMayHelp: 'Foods that may help',
      exploreAllIdeas: 'Explore all ideas →',
      showLess: 'Show less ↑',
      otherHelpfulIdeas: 'Other helpful ideas',
      thingsToBeMindfulOf: 'Things to be mindful of',
      whatFeelsRightToday: 'What feels right today?',
      whatFeelsRightSub: 'Choose one and see a gentle suggestion.',
      options: {
        rest: 'Rest',
        stretch: 'Stretch',
        walk: 'Walk',
        break: 'Take a break'
      },
      comfortToday: 'Comfort today',
      seeAllGuidance: 'See all guidance →',
      emergencyCallBtn: 'Emergency call (112)',
      findCareBtn: 'Find trusted doctors'
    },
    diary: {
      title: 'Your space to pause',
      subtitle: 'Write, reflect and be kind to yourself. Your thoughts matter.',
      lockNote: 'Only you can see this. Your diary is private and stays on this device.',
      promptTitle: 'What did your body ask for today?',
      howFeeling: 'How are you feeling today?',
      titleLabel: 'Title (optional)',
      titlePlaceholder: 'e.g. A better day',
      bodyPlaceholder: 'Write your thoughts here...',
      linkCheckinLabel: "Link to today's check-in (optional)",
      saveEntryBtn: 'Save entry →',
      draftSaved: 'Draft saved automatically',
      tabMyEntries: 'My entries',
      tabPrompts: 'Prompts',
      searchPlaceholder: 'Search your diary...',
      allMoods: 'All moods',
      noEntriesYet: 'No entries written yet. Take a moment to write today.',
      writeFirstEntry: 'Write your first thought',
      deleteConfirm: 'Are you sure you want to delete this diary entry?',
      sensitiveTitle: 'We care about your safety and wellbeing',
      sensitiveDesc: 'If you are feeling overwhelmed, hopeless, or having thoughts of self-harm, please know you do not have to carry this alone.',
      helplineText: 'National Tele-MANAS Mental Health Helpline: 14416 (24/7 Toll-free)',
      promptsList: [
        'What did my body ask for today?',
        'What helped me feel a little better today?',
        'What would I like to gently tell my future self?',
        'What boundary did I protect or need to protect this week?'
      ],
      moods: {
        calm: 'Calm',
        okay: 'Okay',
        low: 'Low',
        anxious: 'Anxious',
        tired: 'Tired',
        hopeful: 'Hopeful'
      }
    },
    tour: {
      welcomeTitle: 'Welcome to Khoj',
      welcomeDesc: "Let's explore how your health story connects.",
      quickTourBtn: 'Take a quick tour →',
      exploreOwnBtn: 'Explore on my own',
      steps: {
        step1Title: '1. Home & Check-in (SUNO)',
        step1Desc: 'Log symptoms in your own words in seconds. Khoj listens and organizes them safely.',
        step2Title: '2. Threads & Evidence (JODO)',
        step2Desc: 'Connect months of symptoms into clear clinical patterns with transparent reasons.',
        step3Title: '3. Cycle, Find Care & Passport',
        step3Desc: 'Track your menstrual calendar, locate verified doctors in Pune, and create doctor-ready PDFs.',
        step4Title: '4. Self-care & Private Diary',
        step4Desc: 'Culturally tailored Indian nourishment, gentle comfort ideas, and a private on-device journal.'
      },
      next: 'Next →',
      back: 'Back',
      skip: 'Skip tour',
      finish: 'Get started →'
    },
    landing: {
      eyebrow: "Your women's health companion",
      heroTitle: 'Find what your body is trying to tell you.',
      heroSub: 'Connect your symptoms over time, understand the pattern, and walk into the clinic knowing what to ask.',
      startBtn: 'Start in 60 seconds →',
      seeHowBtn: 'See how it works',
      privateNote: 'Private by default. No signup needed.',
      floatingPattern: 'Pattern worth discussing. Heavy periods and tiredness often show up together.',
      guidanceHeading: 'Not just tracking. Guidance.',
      sayItTitle: 'Say it your way',
      sayItDesc: 'Tap a body map, type or speak in your own words, even "chakkar aate hain" or "bahut thakaan".',
      seeThreadTitle: 'See your thread',
      seeThreadDesc: 'Months of small signs connected into one clear picture with the clinical reasons shown.',
      knowStepTitle: 'Know your next step',
      knowStepDesc: 'Which doctor, how soon, which tests, in which language, and at what approximate cost.',
      preparedHeading: 'Walk in prepared. Be heard.',
      finalCtaHeading: 'Start your first thread.',
      footerDisclaimer: 'Khoj shares patterns and possibilities, not diagnoses. In an emergency, call your local emergency number (112 / 108).'
    },
    onboarding: {
      step1Title: '1. Choose your language',
      step1Sub: "Select the language you're most comfortable with. You can change this anytime.",
      nameLabel: 'What should we call you? (Optional)',
      namePlaceholder: 'e.g. Priya',
      step2Title: '2. Your life stage',
      step2Sub: 'This helps us show you the most relevant health information.',
      step3Title: '3. Privacy and consent',
      step3Sub: 'Your privacy matters. You can change these anytime in Settings.',
      step4Title: '4. Optional details',
      step4Sub: 'This helps us give you more relevant insights. (You can skip this.)',
      skip: 'Skip',
      back: 'Back',
      next: 'Next →',
      finish: 'Complete Setup →',
      reassurance: 'You can change this anytime.',
      weavingThread: 'Weaving your first health thread...'
    },
    safety: {
      title: 'This warrants prompt medical care.',
      urgentMessage: 'We detected signs that need evaluation by a healthcare provider. Please contact an emergency helpline or visit your nearest hospital right away.',
      emergencyCallBtn: 'Call emergency services (112)',
      hospitalBtn: 'Find nearby emergency facilities',
      imOkayBtn: "I'm okay, take me back",
      disclaimer: 'This safety check is based on transparent, clinical triage rules.'
    },
    home: {
      greeting: 'Good evening',
      greetingSub: 'Take a calm breath. Your health matters.',
      howFeeling: 'How does your body feel today?',
      chipFine: 'Fine',
      chipTired: 'Tired',
      chipPain: 'In pain',
      chipMood: 'Low mood',
      chipOther: 'Other',
      todayInsight: "Today's health insight",
      whySeeingThis: 'Why am I seeing this? →',
      cycleSnapshot: 'Cycle snapshot',
      cycleRange: 'Next period expected in about 8–12 days (estimate range)',
      remindersTitle: 'Gentle reminders',
      dataPrivate: 'Your data stays private on this device.'
    }
  },
  hi: {
    brand: {
      name: 'खोज',
      tagline: 'जानिए आपका शरीर आपसे क्या कहना चाह रहा है।',
      subTagline: 'लक्षणों को जोड़ें। अपना अगला कदम जानें।',
      notADiagnosis: 'पैटर्न संभावनाएं हैं, कोई निदान नहीं। आपातकाल में 112 डायल करें।',
      demoChip: 'डेमो मोड: केवल नमूना डेटा'
    },
    stages: {
      suno: 'SUNO (सुनो)',
      suraksha: 'SURAKSHA (सुरक्षा)',
      jodo: 'JODO (जोड़ो)',
      raah: 'RAAH (राह)',
      saath: 'SAATH (साथ)'
    },
    nav: {
      home: 'होम',
      checkin: 'चेक-इन',
      threads: 'थ्रेड्स',
      care: 'डॉक्टर खोजें',
      passport: 'पासपोर्ट',
      cycle: 'पीरियड चक्र',
      selfCare: 'स्वयं की देखभाल',
      diary: 'डायरी',
      more: 'और देखें',
      settings: 'सेटिंग्स व गोपनीयता',
      discreetActive: 'नोट्स (गोपनीय मोड)'
    },
    auth: {
      eyebrow: 'महिलाओं के स्वास्थ्य का विश्वसनीय साथी',
      heroTitle: 'जानिए आपका शरीर आपसे क्या कहना चाह रहा है।',
      heroSub: 'लक्षणों को समय के साथ जोड़ें, पैटर्न समझें और डॉक्टर के पास पूरी तैयारी के साथ जाएं।',
      signInTab: 'साइन इन',
      createAccountTab: 'खाता बनाएं',
      welcomeBack: 'पुनः स्वागत है',
      continueJourney: 'खोज के साथ अपनी यात्रा जारी रखें।',
      startJourney: 'खोज पर अपना निजी खाता बनाएं।',
      fullName: 'पूरा नाम',
      namePlaceholder: 'उदा. प्रिया शर्मा',
      email: 'ईमेल पता',
      emailPlaceholder: 'you@example.com',
      password: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      signInBtn: 'साइन इन करें →',
      createAccountBtn: 'खाता बनाएं →',
      or: 'या',
      tryDemoBtn: 'बिना साइन अप किए डेमो देखें',
      demoSubtext: 'प्रिया के नमूना डेटा के साथ खोजें',
      quote: '"क्योंकि हर महिला की आवाज़ सुनी जानी चाहिए।"',
      privateNote: 'आपका डेटा केवल इसी डिवाइस पर सुरक्षित रहता है',
      prototypeNote: 'शैक्षणिक प्रोटोटाइप। यह कोई चिकित्सकीय निदान नहीं है। आपातकाल में 112 मिलाएं।',
      sunoBadge: 'SUNO (सुनो)',
      sunoDesc: 'अपने लक्षण दर्ज करें',
      jodoBadge: 'JODO (जोड़ो)',
      jodoDesc: 'पैटर्न और संबंध देखें',
      raahBadge: 'RAAH (राह)',
      raahDesc: 'सही मार्गदर्शन पाएं',
      saathBadge: 'SAATH (साथ)',
      saathDesc: 'सही डॉक्टर खोजें',
      errors: {
        nameRequired: 'कृपया अपना नाम दर्ज करें',
        emailInvalid: 'कृपया मान्य ईमेल दर्ज करें',
        passwordMin: 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए',
        passwordMismatch: 'पासवर्ड मेल नहीं खा रहे हैं'
      }
    },
    cycle: {
      title: 'आपका चक्र, आपकी कहानी',
      subtitle: 'ट्रैक करें, समझें और समग्र तस्वीर देखें।',
      periodStartedToday: 'माहवारी आज शुरू हुई',
      periodEndedToday: 'माहवारी आज समाप्त हुई',
      today: 'आज',
      days: 'दिन',
      nextExpected: 'अगली माहवारी अपेक्षित:',
      nextExpectedRange: 'लगभग 8 – 12 दिनों में',
      estimateNote: 'अनुमान पिछले चक्रों पर आधारित हैं और बदल सकते हैं।',
      avgCycleLength: 'औसत चक्र अवधि',
      avgPeriodLength: 'औसत माहवारी अवधि',
      longestCycle: 'सबसे लंबा चक्र',
      shortestCycle: 'सबसे छोटा चक्र',
      cycleLengthChart: 'चक्र अवधि (पिछले 6 चक्र)',
      allCycles: 'सभी चक्र',
      irregularTitle: 'आपका चक्र थोड़ा अनियमित प्रतीत होता है',
      irregularBadge: 'मध्यम',
      irregularDesc: 'आपके पिछले 3 चक्रों में 7 दिनों से अधिक का अंतर है। डॉक्टर से चर्चा करना उचित रहेगा।',
      notADiagnosis: 'यह कोई निदान नहीं है।',
      seeDetails: 'विवरण देखें →',
      legendPeriod: 'माहवारी का दिन',
      legendPredicted: 'अनुमानित दिन',
      legendToday: 'आज',
      legendSymptoms: 'लक्षण',
      logPeriodModalTitle: 'चक्र का दिन दर्ज करें',
      flowLabel: 'रक्तस्राव (Flow)',
      painLabel: 'दर्द की तीव्रता (0-3)',
      moodLabel: 'मनोदशा (Mood)',
      notesLabel: 'टिप्पणी (वैकल्पिक)',
      saveLog: 'सहेजें',
      cancel: 'रद्द करें',
      flows: {
        spotting: 'हल्के धब्बे (Spotting)',
        light: 'कम (Light)',
        moderate: 'मध्यम (Moderate)',
        heavy: 'अधिक (Heavy)'
      }
    },
    selfCare: {
      heroTag: 'स्वयं की देखभाल',
      heroTitle: 'थोड़ी सी देखभाल, सिर्फ आपके लिए।',
      heroSub: 'अपने शरीर और मन की सहज व शांत देखभाल के सरल उपाय।',
      dailyThoughtTitle: 'आज आप अपने लिए एक पल की हकदार हैं।',
      dailyThoughtSub: 'शांत मन और स्वस्थ शरीर दैनिक जीवन को थोड़ा आसान बना देते हैं।',
      writeInDiary: 'अपनी डायरी में लिखें',
      writeInDiaryDesc: 'आपके विचार महत्वपूर्ण हैं। थोड़ा समय निकालें और अपने प्रति दयालु रहें।',
      openDiary: 'डायरी खोलें →',
      tabEatingWell: 'पौष्टिक आहार',
      tabRestMovement: 'आराम और चलना',
      tabComfort: 'सुविधा और स्वच्छता',
      tabDiary: 'डायरी',
      tabWhenToSeekCare: 'डॉक्टर से कब मिलें',
      relatedToPattern: 'आपके लक्षणों से संबंधित',
      patternBannerDesc: 'आपके हालिया लक्षण संभावित आयरन की कमी का संकेत देते हैं। यह केवल सामान्य जानकारी है, इलाज नहीं। बिना डॉक्टर की सलाह के सप्लीमेंट शुरू न करें।',
      saveToPassportBtn: 'पासपोर्ट के सवालों में जोड़ें →',
      foodsThatMayHelp: 'मददगार खाद्य पदार्थ',
      exploreAllIdeas: 'सभी सुझाव देखें →',
      showLess: 'कम दिखाएं ↑',
      otherHelpfulIdeas: 'अन्य उपयोगी सुझाव',
      thingsToBeMindfulOf: 'ध्यान रखने योग्य बातें',
      whatFeelsRightToday: 'आज आपको क्या सहज लगता है?',
      whatFeelsRightSub: 'एक विकल्प चुनें और सुखद सुझाव देखें।',
      options: {
        rest: 'आराम करें',
        stretch: 'स्ट्रेचिंग',
        walk: 'टहलें',
        break: 'विराम लें'
      },
      comfortToday: 'आज का आराम',
      seeAllGuidance: 'सभी मार्गदर्शन देखें →',
      emergencyCallBtn: 'आपातकालीन कॉल (112)',
      findCareBtn: 'विश्वसनीय डॉक्टर खोजें'
    },
    diary: {
      title: 'रुकने और सोचने का आपका निजी कोना',
      subtitle: 'दिल की बात लिखें और खुद के प्रति सहज रहें। आपके विचार मायने रखते हैं।',
      lockNote: 'इसे केवल आप देख सकती हैं। आपकी डायरी इसी डिवाइस पर सुरक्षित है।',
      promptTitle: 'आज आपके शरीर ने क्या मांगा?',
      howFeeling: 'आज आप कैसा महसूस कर रही हैं?',
      titleLabel: 'शीर्षक (वैकल्पिक)',
      titlePlaceholder: 'उदा. एक अच्छा और शांत दिन',
      bodyPlaceholder: 'अपने विचार यहाँ लिखें...',
      linkCheckinLabel: 'आज के चेक-इन से जोड़ें (वैकल्पिक)',
      saveEntryBtn: 'डायरी सहेजें →',
      draftSaved: 'ड्राफ्ट अपने आप सहेज लिया गया',
      tabMyEntries: 'मेरी प्रविष्टियां',
      tabPrompts: 'विचार बिंदु',
      searchPlaceholder: 'डायरी में खोजें...',
      allMoods: 'सभी मनोदशाएं',
      noEntriesYet: 'अभी तक कोई डायरी नहीं लिखी गई। आज कुछ शब्द लिखें।',
      writeFirstEntry: 'पहला विचार लिखें',
      deleteConfirm: 'क्या आप वाकई इस प्रविष्टि को हटाना चाहती हैं?',
      sensitiveTitle: 'आपकी सुरक्षा और मानसिक स्वास्थ्य हमारे लिए महत्वपूर्ण है',
      sensitiveDesc: 'यदि आप बहुत अकेला, परेशान या उदास महसूस कर रही हैं, तो याद रखें कि आप अकेली नहीं हैं।',
      helplineText: 'राष्ट्रीय टेली-मानस मानसिक स्वास्थ्य हेल्पलाइन: 14416 (24/7 निःशुल्क)',
      promptsList: [
        'आज आपके शरीर ने क्या मांगा?',
        'आज किस बात से आपको थोड़ा बेहतर महसूस हुआ?',
        'आप अपने भविष्य के रूप को क्या समझाना चाहेंगी?',
        'इस सप्ताह आपने अपनी किस सीमा की रक्षा की?'
      ],
      moods: {
        calm: 'शांत',
        okay: 'ठीक',
        low: 'उदास',
        anxious: 'चिंतित',
        tired: 'थकावट',
        hopeful: 'आशावान'
      }
    },
    tour: {
      welcomeTitle: 'खोज में आपका स्वागत है',
      welcomeDesc: 'आइए समझें कि आपकी सेहत के संकेत आपस में कैसे जुड़ते हैं।',
      quickTourBtn: 'त्वरित टूर लें →',
      exploreOwnBtn: 'खुद से देखें',
      steps: {
        step1Title: '1. होम और चेक-इन (सुनो)',
        step1Desc: 'अपने शब्दों में आसानी से लक्षण दर्ज करें। खोज उन्हें सुरक्षित रूप से व्यवस्थित करता है।',
        step2Title: '2. थ्रेड्स और प्रमाण (जोड़ो)',
        step2Desc: 'महीनों के संकेतों को स्पष्ट चिकित्सकीय पैटर्न में जुड़ा हुआ देखें।',
        step3Title: '3. चक्र, डॉक्टर खोज और पासपोर्ट',
        step3Desc: 'मासिक कैलेंडर देखें, पुणे में सत्यापित डॉक्टर खोजें और डॉक्टर के लिए पीडीएफ बनाएं।',
        step4Title: '4. स्वयं की देखभाल और निजी डायरी',
        step4Desc: 'पारंपरिक भारतीय आहार, आराम के उपाय और गोपनीय ऑन-डिवाइस डायरी।'
      },
      next: 'आगे →',
      back: 'पीछे',
      skip: 'टूर छोड़ें',
      finish: 'शुरू करें →'
    },
    landing: {
      eyebrow: 'महिलाओं के स्वास्थ्य का विश्वसनीय साथी',
      heroTitle: 'जानिए आपका शरीर आपसे क्या कहना चाह रहा है।',
      heroSub: 'लक्षणों को समय के साथ जोड़ें, पैटर्न समझें और डॉक्टर के पास पूरी तैयारी के साथ जाएं।',
      startBtn: '60 सेकंड में शुरू करें →',
      seeHowBtn: 'यह कैसे काम करता है',
      privateNote: 'डिफ़ॉल्ट रूप से पूरी तरह निजी। साइनअप की आवश्यकता नहीं।',
      floatingPattern: 'महत्वपूर्ण पैटर्न: भारी माहवारी और अधिक थकान अक्सर साथ में दिखाई देते हैं।',
      guidanceHeading: 'सिर्फ ट्रैकिंग नहीं, सही मार्गदर्शन।',
      sayItTitle: 'अपनी भाषा में कहें',
      sayItDesc: 'बॉडी मैप पर टैप करें, अपनी भाषा में लिखें या बोलें—जैसे "चक्कर आते हैं" या "बहुत थकान"।',
      seeThreadTitle: 'अपना थ्रेड देखें',
      seeThreadDesc: 'महीनों के छोटे संकेत एक स्पष्ट तस्वीर में जुड़े हुए, चिकित्सकीय कारणों के साथ।',
      knowStepTitle: 'अपना अगला कदम जानें',
      knowStepDesc: 'कौन से डॉक्टर, कितने समय में, कौन से टेस्ट, और अनुमानित खर्च क्या होगा।',
      preparedHeading: 'तैयारी के साथ जाएं, अपनी बात रखें।',
      finalCtaHeading: 'अपना पहला थ्रेड शुरू करें।',
      footerDisclaimer: 'खोज केवल पैटर्न और संभावनाएं दिखाता है, यह कोई चिकित्सकीय निदान नहीं है। आपातकाल में 112 या 108 पर कॉल करें।'
    },
    onboarding: {
      step1Title: '1. अपनी भाषा चुनें',
      step1Sub: 'वह भाषा चुनें जिसमें आप सबसे अधिक सहज हैं। इसे कभी भी बदला जा सकता है।',
      nameLabel: 'हम आपको किस नाम से पुकारें? (वैकल्पिक)',
      namePlaceholder: 'उदा. प्रिया',
      step2Title: '2. आपका जीवन चरण (Life Stage)',
      step2Sub: 'इससे हमें आपको सबसे प्रासंगिक स्वास्थ्य जानकारी दिखाने में मदद मिलती है।',
      step3Title: '3. गोपनीयता और सहमति',
      step3Sub: 'आपकी गोपनीयता अत्यंत महत्वपूर्ण है। इसे सेटिंग्स में कभी भी बदला जा सकता है।',
      step4Title: '4. अतिरिक्त विवरण',
      step4Sub: 'इससे अधिक सटीक जानकारी मिलती है। (आप इसे छोड़ भी सकते हैं।)',
      skip: 'छोड़ें',
      back: 'पीछे',
      next: 'आगे →',
      finish: 'सेटअप पूरा करें →',
      reassurance: 'आप इसे कभी भी बदल सकते हैं।',
      weavingThread: 'आपका पहला स्वास्थ्य थ्रेड तैयार किया जा रहा है...'
    },
    safety: {
      title: 'इसके लिए तुरंत डॉक्टर की सलाह आवश्यक है।',
      urgentMessage: 'हमें ऐसे लक्षण मिले हैं जिनकी तुरंत स्वास्थ्य सेवा प्रदाता द्वारा जांच होनी चाहिए। कृपया आपातकालीन हेल्पलाइन पर संपर्क करें या नजदीकी अस्पताल जाएं।',
      emergencyCallBtn: 'आपातकालीन सेवाओं को कॉल करें (112)',
      hospitalBtn: 'नजदीकी अस्पताल के विकल्प देखें',
      imOkayBtn: 'मैं ठीक हूँ, वापस जाएं',
      disclaimer: 'यह सुरक्षा जांच पारदर्शी चिकित्सकीय नियमों पर आधारित है।'
    },
    home: {
      greeting: 'शुभ संध्या',
      greetingSub: 'एक गहरी शांत सांस लें। आपकी सेहत सबसे पहले है।',
      howFeeling: 'आज आपका शरीर कैसा महसूस कर रहा है?',
      chipFine: 'अच्छा',
      chipTired: 'थकान',
      chipPain: 'दर्द',
      chipMood: 'मन उदास',
      chipOther: 'अन्य',
      todayInsight: 'आज का थ्रेड इनसाइट',
      whySeeingThis: 'मुझे यह क्यों दिख रहा है? →',
      cycleSnapshot: 'पीरियड चक्र स्नैपशॉट',
      cycleRange: 'अगली माहवारी लगभग 8–12 दिनों में अपेक्षित (अनुमानित सीमा)',
      remindersTitle: 'सौम्य स्मरणपत्र',
      dataPrivate: 'आपका डेटा इस डिवाइस पर निजी रहता है।'
    }
  },
  mr: {
    brand: {
      name: 'खोज',
      tagline: 'जाणून घ्या तुमचं शरीर तुम्हाला काय सांगू पाहतंय.',
      subTagline: 'लक्षणे जोडा. पुढील पाऊल ओळखा.',
      notADiagnosis: 'पॅटर्न हे शक्यता दर्शवतात, हे निदान नाही. आणीबाणीत 112 डायल करा.',
      demoChip: 'डेमो मोड: केवळ नमुना डेटा'
    },
    stages: {
      suno: 'SUNO (ऐका)',
      suraksha: 'SURAKSHA (सुरक्षा)',
      jodo: 'JODO (जोडा)',
      raah: 'RAAH (दिशा)',
      saath: 'SAATH (सोबत)'
    },
    nav: {
      home: 'होम',
      checkin: 'चेक-इन',
      threads: 'थ्रेड्स',
      care: 'डॉक्टर शोधा',
      passport: 'पासपोर्ट',
      cycle: 'मासिक पाळी',
      selfCare: 'स्वतःची काळजी',
      diary: 'डायरी',
      more: 'आणखी',
      settings: 'सेटिंग्ज व गोपनीयता',
      discreetActive: 'नोट्स (सुरक्षित मोड)'
    },
    auth: {
      eyebrow: 'महिलांच्या आरोग्याचा विश्वासू साथीदार',
      heroTitle: 'जाणून घ्या तुमचं शरीर तुम्हाला काय सांगू पाहतंय.',
      heroSub: 'काळानुरूप लक्षणांची नोंद ठेवा, पॅटर्न समजून घ्या आणि डॉक्टरांकडे पूर्ण तयारीने जा.',
      signInTab: 'साइन इन',
      createAccountTab: 'खाते तयार करा',
      welcomeBack: 'पुन्हा स्वागत आहे',
      continueJourney: 'खोज सोबत तुमचा प्रवास सुरू ठेवा.',
      startJourney: 'खोज वर तुमचे खाजगी खाते उघडा.',
      fullName: 'पूर्ण नाव',
      namePlaceholder: 'उदा. प्रिया शर्मा',
      email: 'ईमेल पत्ता',
      emailPlaceholder: 'you@example.com',
      password: 'पासवर्ड',
      passwordPlaceholder: 'तुमचा पासवर्ड टाका',
      confirmPassword: 'पासवर्डची पुष्टी करा',
      forgotPassword: 'पासवर्ड विसरलात?',
      signInBtn: 'साइन इन करा →',
      createAccountBtn: 'खाते तयार करा →',
      or: 'किंवा',
      tryDemoBtn: 'नोंदणी न करता डेमो पहा',
      demoSubtext: 'प्रियाच्या नमुना डेटासह अनुभव घ्या',
      quote: '"कारण प्रत्येक महिलेचा आवाज ऐकला गेलाच पाहिजे."',
      privateNote: 'तुमचा डेटा फक्त याच फोनवर सुरक्षित राहतो',
      prototypeNote: 'शैक्षणिक प्रोटोटाइप. हे कोणतेही वैद्यकीय निदान नाही. आणीबाणीत 112 वर कॉल करा.',
      sunoBadge: 'SUNO (ऐका)',
      sunoDesc: 'तुमची लक्षणे नोंदवा',
      jodoBadge: 'JODO (जोडा)',
      jodoDesc: 'आरोग्य पॅटर्न समजून घ्या',
      raahBadge: 'RAAH (दिशा)',
      raahDesc: 'योग्य मार्गदर्शन मिळवा',
      saathBadge: 'SAATH (सोबत)',
      saathDesc: 'योग्य तज्ज्ञ डॉक्टर शोधा',
      errors: {
        nameRequired: 'कृपया तुमचे नाव टाका',
        emailInvalid: 'कृपया वैध ईमेल टाका',
        passwordMin: 'पासवर्ड किमान ८ अक्षरांचा असावा',
        passwordMismatch: 'पासवर्ड जुळत नाहीत'
      }
    },
    cycle: {
      title: 'तुमचे चक्र, तुमची गोष्ट',
      subtitle: 'नोंद ठेवा, समजून घ्या आणि शरीराचे संकेत ओळखा.',
      periodStartedToday: 'पाळी आज सुरू झाली',
      periodEndedToday: 'पाळी आज संपली',
      today: 'आज',
      days: 'दिवस',
      nextExpected: 'पुढील पाळी अपेक्षित:',
      nextExpectedRange: 'सुमारे ८ – १२ दिवसांत',
      estimateNote: 'अंदाज आधीच्या चक्रांवर आधारित असून बदलू शकतात.',
      avgCycleLength: 'सरासरी चक्र कालावधी',
      avgPeriodLength: 'सरासरी पाळी कालावधी',
      longestCycle: 'सर्वात मोठे चक्र',
      shortestCycle: 'सर्वात लहान चक्र',
      cycleLengthChart: 'चक्र कालावधी (मागील ६ चक्रे)',
      allCycles: 'सर्व चक्रे',
      irregularTitle: 'तुमचे चक्र थोडे अनियमित दिसते',
      irregularBadge: 'मध्यम',
      irregularDesc: 'तुमच्या मागील ३ चक्रांमध्ये ७ दिवसांपेक्षा जास्त फरक आहे. डॉक्टरांशी बोलणे योग्य ठरेल.',
      notADiagnosis: 'हे कोणतेही निदान नाही.',
      seeDetails: 'तपशील पहा →',
      legendPeriod: 'पाळीचा दिवस',
      legendPredicted: 'अंदाजित दिवस',
      legendToday: 'आज',
      legendSymptoms: 'लक्षणे',
      logPeriodModalTitle: 'चक्राचा दिवस नोंदवा',
      flowLabel: 'रक्तस्त्राव (Flow)',
      painLabel: 'वेदनेची तीव्रता (०-३)',
      moodLabel: 'मनःस्थिती (Mood)',
      notesLabel: 'टीप (पर्यायी)',
      saveLog: 'जतन करा',
      cancel: 'रद्द करा',
      flows: {
        spotting: 'हळुवार डाग (Spotting)',
        light: 'कमी (Light)',
        moderate: 'मध्यम (Moderate)',
        heavy: 'जास्त (Heavy)'
      }
    },
    selfCare: {
      heroTag: 'स्वतःची काळजी',
      heroTitle: 'थोडीशी काळजी, फक्त तुमच्यासाठी.',
      heroSub: 'तुमच्या शरीराची आणि मनाची शांतपणे काळजी घेण्याचे सोपे मार्ग.',
      dailyThoughtTitle: 'आज तुम्ही स्वतःसाठी एक क्षण काढण्यास पात्र आहात.',
      dailyThoughtSub: 'शांत मन आणि निरोगी शरीर दैनंदिन जीवन थोडे सोपे बनवतात.',
      writeInDiary: 'डायरीत मनमोकळे लिहा',
      writeInDiaryDesc: 'तुमचे विचार महत्त्वाचे आहेत. थोडा वेळ काढा आणि स्वतःवर प्रेम करा.',
      openDiary: 'डायरी उघडा →',
      tabEatingWell: 'सकस आहार',
      tabRestMovement: 'विश्रांती व हालचाल',
      tabComfort: 'आराम आणि स्वच्छता',
      tabDiary: 'डायरी',
      tabWhenToSeekCare: 'डॉक्टरांकडे कधी जावे',
      relatedToPattern: 'तुमच्या लक्षणांशी संबंधित',
      patternBannerDesc: 'तुमची अलीकडील लक्षणे रक्तातील लोहाच्या कमतरतेची शक्यता दर्शवतात. ही सामान्य माहिती आहे, उपचार नाही. डॉक्टरांच्या सल्ल्याशिवाय सप्लिमेंट्स सुरू करू नका.',
      saveToPassportBtn: 'पासपोर्टच्या प्रश्नांमध्ये जोडा →',
      foodsThatMayHelp: 'मदत करणारे अन्नपदार्थ',
      exploreAllIdeas: 'सर्व उपाय पहा →',
      showLess: 'कमी दाखवा ↑',
      otherHelpfulIdeas: 'इतर उपयुक्त टिप्स',
      thingsToBeMindfulOf: 'लक्षात ठेवण्याच्या गोष्टी',
      whatFeelsRightToday: 'आज तुम्हाला काय सोयीचे वाटते?',
      whatFeelsRightSub: 'एक पर्याय निवडा आणि शांत सल्ला पहा.',
      options: {
        rest: 'विश्रांती',
        stretch: 'स्ट्रेचिंग',
        walk: 'चालणे',
        break: 'थांबणे'
      },
      comfortToday: 'आजचा आराम',
      seeAllGuidance: 'सर्व माहिती पहा →',
      emergencyCallBtn: 'आणीबाणी कॉल (112)',
      findCareBtn: 'विश्वासू डॉक्टर शोधा'
    },
    diary: {
      title: 'स्वतःशी संवाद साधण्याची तुमची खाजगी जागा',
      subtitle: 'मनातले लिहा आणि स्वतःशी हळुवार राहा. तुमचे विचार महत्त्वाचे आहेत.',
      lockNote: 'हे फक्त तुम्ही पाहू शकता. तुमची डायरी याच डिव्हाइसवर खाजगी राहते.',
      promptTitle: 'आज तुमच्या शरीराने काय मागितले?',
      howFeeling: 'आज तुम्हाला कसे वाटत आहे?',
      titleLabel: 'शीर्षक (पर्यायी)',
      titlePlaceholder: 'उदा. एक छान आणि शांत दिवस',
      bodyPlaceholder: 'तुमचे विचार येथे लिहा...',
      linkCheckinLabel: 'आजच्या चेक-इनशी जोडा (पर्यायी)',
      saveEntryBtn: 'नोंद जतन करा →',
      draftSaved: 'ड्राफ्ट आपोआप सेव्ह झाला',
      tabMyEntries: 'माझ्या नोंदी',
      tabPrompts: 'विचार मुद्दे',
      searchPlaceholder: 'डायरीत शोधा...',
      allMoods: 'सर्व भावना',
      noEntriesYet: 'अद्याप कोणतीही नोंद नाही. आज काहीतरी लिहा.',
      writeFirstEntry: 'पहिली नोंद लिहा',
      deleteConfirm: 'तुम्हाला खात्री आहे की ही नोंद हटवायची आहे?',
      sensitiveTitle: 'तुमची सुरक्षा आणि मानसिक स्वास्थ्य आमच्यासाठी महत्त्वाचे आहे',
      sensitiveDesc: 'जर तुम्हाला खूप जास्त नैराश्य किंवा अस्वस्थ वाटत असेल, तर कृपया लक्षात ठेवा की तुम्ही एकट्या नाही आहात.',
      helplineText: 'राष्ट्रीय टेली-मानस मानसिक मदत हेल्पलाइन: 14416 (24/7 मोफत सेवा)',
      promptsList: [
        'आज तुमच्या शरीराने काय मागितले?',
        'आज कोणत्या गोष्टीमुळे तुम्हाला थोडे बरे वाटले?',
        'तुम्ही स्वतःला काय समजावू इच्छिता?',
        'या आठवड्यात तुम्ही स्वतःच्या कोणत्या सीमेचे रक्षण केले?'
      ],
      moods: {
        calm: 'शांत',
        okay: 'ठीक',
        low: 'उदास',
        anxious: 'काळजीत',
        tired: 'थकवा',
        hopeful: 'आशावादी'
      }
    },
    tour: {
      welcomeTitle: 'खोज मध्ये तुमचे स्वागत आहे',
      welcomeDesc: 'आरोग्याचे संकेत एकमेकांशी कसे जोडले जातात ते पाहूया.',
      quickTourBtn: 'झटपट फेरफटका मारा →',
      exploreOwnBtn: 'स्वतः पाहा',
      steps: {
        step1Title: '१. होम आणि चेक-इन (ऐका)',
        step1Desc: 'तुमच्या भाषेत लक्षणे नोंदवा. खोज ते सुरक्षितपणे सांभाळते.',
        step2Title: '२. थ्रेड्स आणि पुरावे (जोडा)',
        step2Desc: 'महिन्यांचे संकेत एका स्पष्ट वैद्यकीय पॅटर्नमध्ये जोडलेले पाहा.',
        step3Title: '३. पाळी चक्र, डॉक्टर शोध आणि पासपोर्ट',
        step3Desc: 'पाळीचे कॅलेंडर, पुण्यातले तपासलेले डॉक्टर आणि डॉक्टरसाठी सुटसुटीत अहवाल.',
        step4Title: '४. स्वतःची काळजी आणि खाजगी डायरी',
        step4Desc: 'पारंपारिक सकस आहार, विश्रांतीच्या सवयी आणि सुरक्षित ऑन-डिव्हाइस डायरी.'
      },
      next: 'पुढे →',
      back: 'मागे',
      skip: 'टूर वगळा',
      finish: 'सुरू करा →'
    },
    landing: {
      eyebrow: 'महिलांच्या आरोग्याचा विश्वासू साथीदार',
      heroTitle: 'जाणून घ्या तुमचं शरीर तुम्हाला काय सांगू पाहतंय.',
      heroSub: 'काळानुरूप लक्षणांची नोंद ठेवा, पॅटर्न समजून घ्या आणि डॉक्टरांकडे पूर्ण तयारीने जा.',
      startBtn: '60 सेकंदात सुरू करा →',
      seeHowBtn: 'कसे कार्य करते ते पहा',
      privateNote: 'पूर्णपणे खाजगी. कोणत्याही नोंदणीची गरज नाही.',
      floatingPattern: 'महत्त्वाचा पॅटर्न: जास्त रक्तस्त्राव आणि तीव्र थकवा अनेकदा एकत्र जाणवतात.',
      guidanceHeading: 'केवळ ट्रॅकिंग नाही, योग्य मार्गदर्शन.',
      sayItTitle: 'तुमच्या भाषेत सांगा',
      sayItDesc: 'बॉडी मॅपवर टॅप करा, लिहा किंवा बोला—उदा. "चक्कर येते" किंवा "खूप थकवा".',
      seeThreadTitle: 'तुमचा थ्रेड पहा',
      seeThreadDesc: 'महिन्यांचे छोटे संकेत एका स्पष्ट चित्रात जोडलेले, वैद्यकीय कारणांसोबत.',
      knowStepTitle: 'पुढील पाऊल ओळखा',
      knowStepDesc: 'कोणते डॉक्टर, किती दिवसात, कोणत्या तपासण्या, आणि अंदाजे खर्च किती.',
      preparedHeading: 'तयारीने जा, योग्य सल्ला मिळवा.',
      finalCtaHeading: 'तुमचा पहिला थ्रेड सुरू करा.',
      footerDisclaimer: 'खोज केवळ पॅटर्न आणि शक्यता दाखवतो, हे निदान नाही. आणीबाणीच्या वेळी 112 किंवा 108 डायल करा.'
    },
    onboarding: {
      step1Title: '1. तुमची भाषा निवडा',
      step1Sub: 'तुम्हाला सोयीस्कर वाटेल ती भाषा निवडा. तुम्ही ही नंतर कधीही बदलू शकता.',
      nameLabel: 'आम्ही तुम्हाला कोणत्या नावाने हाक मारावी? (पर्यायी)',
      namePlaceholder: 'उदा. प्रिया',
      step2Title: '2. तुमचा जीवन टप्पा (Life Stage)',
      step2Sub: 'यामुळे आम्हाला तुम्हाला सर्वात योग्य माहिती दाखवण्यात मदत होते.',
      step3Title: '3. गोपनीयता आणि संमती',
      step3Sub: 'तुमची गोपनीयता अत्यंत महत्त्वाची आहे. सेटिंग्जमध्ये कधीही बदला.',
      step4Title: '4. पर्यायी माहिती',
      step4Sub: 'यामुळे अधिक अचूक मार्गदर्शन मिळते. (तुम्ही हे वगळू शकता.)',
      skip: 'वगळा',
      back: 'मागे',
      next: 'पुढे जा →',
      finish: 'सेटअप पूर्ण करा →',
      reassurance: 'तुम्ही हे कधीही बदलू शकता.',
      weavingThread: 'तुमचा पहिला आरोग्य थ्रेड विणला जात आहे...'
    },
    safety: {
      title: 'यासाठी त्वरित वैद्यकीय मदत घेणे गरजेचे आहे.',
      urgentMessage: 'आम्हाला अशी लक्षणे आढळली आहेत ज्यांची त्वरित डॉक्टरांकडून तपासणी होणे आवश्यक आहे. कृपया आणीबाणीच्या नंबरवर संपर्क करा किंवा जवळच्या रुग्णालयात जा.',
      emergencyCallBtn: 'आणीबाणी सेवांना कॉल करा (112)',
      hospitalBtn: 'जवळच्या रुग्णालयांचे पर्याय पहा',
      imOkayBtn: 'मी ठीक आहे, मागे जा',
      disclaimer: 'हा सुरक्षा आढावा पूर्वनिर्धारित वैद्यकीय नियमांवर आधारित आहे.'
    },
    home: {
      greeting: 'शुभ संध्याकाळ',
      greetingSub: 'एक शांत क्षण स्वतःसाठी काढा. तुमचे आरोग्य महत्त्वाचे आहे.',
      howFeeling: 'आज तुम्हाला कसे वाटत आहे?',
      chipFine: 'छान',
      chipTired: 'थकवा',
      chipPain: 'वेदना',
      chipMood: 'मूड',
      chipOther: 'इतर',
      todayInsight: 'आजचा थ्रेड इनसाइट',
      whySeeingThis: 'मला हे का दिसत आहे? →',
      cycleSnapshot: 'मासिक पाळी स्नॅपशॉट',
      cycleRange: 'पुढील पाळी अंदाजे 8–12 दिवसांत अपेक्षित (अंदाजित कालावधी)',
      remindersTitle: 'काळजीपूर्वक स्मरणपत्रे',
      dataPrivate: 'तुमचा डेटा तुमच्या डिव्हाइसवर पूर्णपणे सुरक्षित राहतो.'
    }
  }
};
