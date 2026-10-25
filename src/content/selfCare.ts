export interface SelfCareItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName?: string;
  image?: string;
  bullets?: string[];
  passportQuestion?: string;
  isUrgent?: boolean;
}

export interface SelfCareSectionContent {
  sectionTitle: string;
  sectionSubtitle: string;
  items: SelfCareItem[];
}

export interface SelfCareLocalizedContent {
  eatingWell: SelfCareSectionContent;
  restMovement: SelfCareSectionContent;
  comfort: SelfCareSectionContent;
  whenToSeekCare: SelfCareSectionContent;
  generalDisclaimer: string;
}

export const SELF_CARE_CONTENT: Record<'en' | 'hi' | 'mr', SelfCareLocalizedContent> = {
  en: {
    generalDisclaimer: 'General information. A doctor or dietitian can personalise this.',
    eatingWell: {
      sectionTitle: 'Eating well',
      sectionSubtitle: 'Nourishing choices for your everyday meals.',
      items: [
        {
          id: 'iron_friendly',
          title: 'Iron-friendly foods',
          subtitle: 'Dal, rajma, chana, ragi, leafy greens (palak, methi), til and more.',
          description: 'Familiar kitchen staples rich in non-heme iron can support healthy energy levels over your cycle.',
          bullets: ['Moong dal, masoor dal, rajma & chole', 'Ragi, bajra and jowar rotis', 'Palak, methi and mustard greens', 'Til (sesame seeds) and dry dates']
        },
        {
          id: 'pair_it_well',
          title: 'Pair it well',
          subtitle: 'Vitamin C-rich foods like lemon, amla, guava and oranges can help your body absorb iron better.',
          description: 'Squeezing fresh lemon over your dal or having an amla or orange near mealtime helps iron absorption.',
          bullets: ['Fresh lemon juice on warm dal', 'Amla in chutney or raw slices', 'Seasonal guava or oranges as snacks']
        },
        {
          id: 'low_energy_days',
          title: 'Easy on low-energy days',
          subtitle: 'Simple meals, regular nourishment, hydration, and protein can help you feel more steady.',
          description: 'When fatigue is high, uncomplicated meals give steady nourishment without taking much effort to cook.',
          bullets: ['Warm khichdi with a spoon of ghee', 'Curd rice or dalia with steamed vegetables', 'Sattu drink or roasted chana snack', 'Warm water infused with jeera or ajwain']
        },
        {
          id: 'mindful_habits',
          title: 'Things to be mindful of',
          subtitle: 'Tea or coffee with meals can reduce iron absorption. Very salty or processed foods may add to bloating.',
          description: 'Spacing your chai or coffee 1 hour before or after meals helps your body absorb the iron from your food.',
          bullets: ['Enjoy chai 1 hour away from main meals', 'Keep packaged, high-sodium foods moderate', 'Stay consistently hydrated throughout the day']
        }
      ]
    },
    restMovement: {
      sectionTitle: 'Rest & movement',
      sectionSubtitle: 'Small steps for more comfort and balance.',
      items: [
        {
          id: 'better_sleep',
          title: 'Better sleep',
          subtitle: 'A calm bedtime routine and rest can support better rest.',
          description: 'Dimming screens 30 minutes before bed, warm feet, and steady sleep hours help your body recharge.',
          bullets: ['Keep a consistent sleep & wake rhythm', 'Sip warm water or milk before bed', 'Gentle breathing to quiet nighttime racing thoughts']
        },
        {
          id: 'gentle_movement',
          title: 'Gentle movement',
          subtitle: 'Short walks or light stretching may help with mood, energy and menstrual comfort.',
          description: 'Gentle movement increases blood circulation, which can ease pelvic cramping and lighten your mental load.',
          bullets: ['10–15 minute unhurried morning walk', 'Gentle butterfly pose (Baddha Konasana)', 'Child’s pose (Balasana) for lower back comfort']
        },
        {
          id: 'calm_break',
          title: 'A calm break',
          subtitle: 'Make time for activities that feel good, even if it’s just a few minutes.',
          description: 'Permit yourself to step away from chores or screens. A 5-minute pause is productive self-care.',
          bullets: ['Listen to soothing instrumental music', 'Sitting quietly with a warm cup of herbal tea', '3 long, unhurried belly breaths']
        }
      ]
    },
    comfort: {
      sectionTitle: 'Comfort',
      sectionSubtitle: 'Everyday care for your body and mind.',
      items: [
        {
          id: 'period_products',
          title: 'Period products',
          subtitle: 'Explore pads, tampons, menstrual cups and choose what feels comfortable for you.',
          description: 'Every body is shaped differently. Change pads every 4–6 hours or cups every 8–10 hours according to product guidelines.',
          bullets: ['Cotton or breathable disposable pads', 'Medical-grade silicone menstrual cups', 'Clean water and mild soap for personal hygiene']
        },
        {
          id: 'managing_cramps',
          title: 'Managing cramps',
          subtitle: 'Warm fluids, gentle movement and a heat pad may help.',
          description: 'Applying a comfortable heat pad or warm water bottle to your lower abdomen relaxes uterine muscles safely.',
          bullets: ['Wrap heating pads in a cloth to protect your skin', 'Sip warm ginger or tulsi tea', 'Rest in a side-lying fetal position with a pillow']
        },
        {
          id: 'mood_emotions',
          title: 'Mood and emotions',
          subtitle: 'Mood changes are common. Talk to someone you trust and make space to rest.',
          description: 'Shifting hormones can influence emotional resilience. Acknowledging feelings without self-blame brings ease.',
          bullets: ['Write freely in your private diary', 'Share how you feel with a trusted friend or sister', 'Lower your daily task expectations on high-fatigue days']
        }
      ]
    },
    whenToSeekCare: {
      sectionTitle: 'When to seek care',
      sectionSubtitle: 'Self-care is important, but sometimes it’s right to get medical advice.',
      items: [
        {
          id: 'heavy_bleeding',
          title: 'Heavy bleeding',
          subtitle: 'Soaking a pad every hour for several hours consecutively.',
          description: 'Very heavy flow or large blood clots can lead to anemia and needs prompt clinical assessment.',
          isUrgent: true
        },
        {
          id: 'severe_pain',
          title: 'Severe pain',
          subtitle: 'Very strong pelvic or abdominal pain, especially with fever.',
          description: 'Sharp, debilitating pain that prevents standing or is accompanied by chills warrants immediate care.',
          isUrgent: true
        },
        {
          id: 'fainting',
          title: 'Fainting or dizziness',
          subtitle: 'Feeling very weak, lightheaded or passing out.',
          description: 'Sudden dizziness upon standing or fainting can indicate low hemoglobin or internal blood loss.',
          isUrgent: true
        },
        {
          id: 'prolonged_bleeding',
          title: 'Prolonged bleeding',
          subtitle: 'Bleeding for many more days than usual (more than 7–8 days).',
          description: 'Continuous spotting or bleeding beyond normal cycle bounds should be evaluated by a gynecologist.',
          isUrgent: false
        },
        {
          id: 'pregnancy_postpartum',
          title: 'Pregnancy or postpartum',
          subtitle: 'Urgent concerns during pregnancy or after childbirth.',
          description: 'Sudden swelling, vision changes, severe headache, or unusual fluid leakage need prompt hospital visit.',
          isUrgent: true
        },
        {
          id: 'emotional_distress',
          title: 'Emotional distress',
          subtitle: 'If you are feeling very low or having thoughts of self-harm, reach out for support.',
          description: 'You are never alone. Tele-MANAS is free, 24/7, confidential psychological support across India.',
          isUrgent: true
        }
      ]
    }
  },
  hi: {
    generalDisclaimer: 'सामान्य जानकारी। डॉक्टर या आहार विशेषज्ञ इसे आपके अनुसार तय कर सकते हैं।',
    eatingWell: {
      sectionTitle: 'पौष्टिक आहार',
      sectionSubtitle: 'दैनिक भोजन के लिए स्वास्थ्यवर्धक और पौष्टिक विकल्प।',
      items: [
        {
          id: 'iron_friendly',
          title: 'आयरन युक्त आहार',
          subtitle: 'दाल, राजमा, चना, रागी, पालक, मेथी, तिल और बहुत कुछ।',
          description: 'घरेलू पौष्टिक खाद्य पदार्थ आपके शरीर में ऊर्जा और खून की मात्रा बनाए रखने में मदद करते हैं।',
          bullets: ['मूंग दाल, मसूर दाल, राजमा और छोले', 'रागी, बाजरा और ज्वार की रोटी', 'पालक, मेथी और हरी सब्जियां', 'तिल के लड्डू और खजूर']
        },
        {
          id: 'pair_it_well',
          title: 'विटामिन सी का साथ',
          subtitle: 'नींबू, आंवला, अमरूद और संतरा आयरन को सोखने में मदद करते हैं।',
          description: 'भोजन पर ताज़ा नींबू निचोड़ने या आंवला खाने से शरीर आयरन को बेहतर तरीके से सोख पाता है।',
          bullets: ['दाल पर ताज़ा नींबू का रस', 'आंवले की चटनी या मुरब्बा', 'अमरूद या संतरा नाश्ते में लें']
        },
        {
          id: 'low_energy_days',
          title: 'कम ऊर्जा वाले दिनों में',
          subtitle: 'सादा भोजन, हल्का आहार और पर्याप्त पानी आपको स्थिर महसूस कराएंगे।',
          description: 'जब थकान अधिक हो, तब साधारण खिचड़ी या दलिया बिना ज़्यादा मेहनत के अच्छा पोषण देते हैं।',
          bullets: ['गरम खिचड़ी थोड़ी सी घी के साथ', 'दही-चावल या सादा दलिया', 'सत्तू का शरबत या भुना चना', 'जीरा या अजवाइन का गुनगुना पानी']
        },
        {
          id: 'mindful_habits',
          title: 'ध्यान रखने योग्य बातें',
          subtitle: 'भोजन के तुरंत साथ चाय-कॉफ़ी से बचें। बहुत नमकीन खाने से सूजन हो सकती है।',
          description: 'चाय या कॉफ़ी को खाने से 1 घंटा पहले या बाद में लें ताकि शरीर को पूरा पोषण मिल सके।',
          bullets: ['खाने के 1 घंटे बाद ही चाय लें', 'अत्यधिक नमक और पैकेज्ड खाने से बचें', 'दिन भर नियमित पानी पीते रहें']
        }
      ]
    },
    restMovement: {
      sectionTitle: 'आराम और चलना-फिरना',
      sectionSubtitle: 'शरीर को सहज और संतुलित रखने के छोटे उपाय।',
      items: [
        {
          id: 'better_sleep',
          title: 'अच्छी और गहरी नींद',
          subtitle: 'सोने से पहले शांत माहौल और आराम नींद को बेहतर बनाते हैं।',
          description: 'सोने से 30 मिनट पहले स्क्रीन बंद करने और पैरों को गर्म रखने से शरीर अच्छी तरह तरोताज़ा होता है।',
          bullets: ['सोने और जागने का नियमित समय रखें', 'सोने से पहले गुनगुना पानी या दूध लें', 'धीमी और गहरी सांसें लें']
        },
        {
          id: 'gentle_movement',
          title: 'हल्का व्यायाम व टहलना',
          subtitle: 'छोटी सैर या हल्का खिंचाव मूड और मासिक धर्म की बेचैनी में आराम दे सकता है।',
          description: 'हल्के खिंचाव से रक्त संचार बढ़ता है और कमर व पेट के दर्द में राहत मिलती है।',
          bullets: ['10–15 मिनट की सहज सुबह की सैर', 'तितली आसन (बद्ध कोणासन)', 'पीठ के आराम के लिए बालासन']
        },
        {
          id: 'calm_break',
          title: 'अपने लिए एक पल',
          subtitle: 'ऐसी गतिविधियों के लिए समय निकालें जो आपको अच्छा महसूस कराएं।',
          description: 'घर के कामों से 5 मिनट का विराम लेना भी आत्म-देखभाल का एक जरूरी हिस्सा है।',
          bullets: ['मधुर शांत संगीत सुनें', 'हर्बल चाय का आनंद लें', '3 गहरी, आरामदेह सांसें लें']
        }
      ]
    },
    comfort: {
      sectionTitle: 'सुविधा और स्वच्छता',
      sectionSubtitle: 'आपके शरीर और मन की दैनिक देखभाल।',
      items: [
        {
          id: 'period_products',
          title: 'माहवारी उत्पाद',
          subtitle: 'पैड, टैम्पोन या मेंस्ट्रुअल कप में से वह चुनें जो आपके लिए सहज हो।',
          description: 'स्वच्छता बनाए रखने के लिए पैड को हर 4–6 घंटे में बदलना जरूरी है।',
          bullets: ['सूती या आरामदायक सैनिटरी पैड', 'मेडिकल ग्रेड सिलिकॉन कप', 'स्वच्छ पानी से नियमित सफाई']
        },
        {
          id: 'managing_cramps',
          title: 'ऐंठन और दर्द में राहत',
          subtitle: 'गर्म पेय, हल्का चलना और गर्म सिकाई दर्द कम करने में मदद कर सकते हैं।',
          description: 'पेट के निचले हिस्से पर गर्म पानी की थैली या हीटिंग पैड से गर्भाशय की मांसपेशियां शिथिल होती हैं।',
          bullets: ['त्वचा की सुरक्षा के लिए हीटिंग पैड पर कपड़ा लपेटें', 'अदरक या तुलसी की गरम चाय पिएं', 'करवट लेकर घुटने मोड़कर आराम करें']
        },
        {
          id: 'mood_emotions',
          title: 'मन और भावनाएं',
          subtitle: 'मन में उतार-चढ़ाव होना स्वाभाविक है। किसी अपने से बात करें।',
          description: 'हार्मोनल बदलाव से मनोदशा प्रभावित हो सकती है। अपनी भावनाओं को बिना किसी अपराधबोध के स्वीकार करें।',
          bullets: ['अपनी निजी डायरी में दिल की बात लिखें', 'किसी करीबी दोस्त या बहन से बात साझा करें', 'थकान के दिन काम का बोझ कम रखें']
        }
      ]
    },
    whenToSeekCare: {
      sectionTitle: 'डॉक्टर से कब मिलें',
      sectionSubtitle: 'स्वयं की देखभाल अच्छी है, पर कुछ स्थितियों में चिकित्सकीय सलाह जरूरी है।',
      items: [
        {
          id: 'heavy_bleeding',
          title: 'अत्यधिक रक्तस्राव',
          subtitle: 'हर घंटे पैड पूरी तरह भीग जाना (लगातार कई घंटों तक)।',
          description: 'बहुत अधिक खून बहने या बड़े थक्के आने से एनीमिया हो सकता है, डॉक्टर को तुरंत दिखाएं।',
          isUrgent: true
        },
        {
          id: 'severe_pain',
          title: 'असहनीय पेट या कमर दर्द',
          subtitle: 'तीव्र दर्द, खासकर यदि साथ में बुखार भी हो।',
          description: 'अत्यधिक दर्द जिसके कारण खड़ा होना भी मुश्किल हो, तुरंत अस्पताल जाने की आवश्यकता होती है।',
          isUrgent: true
        },
        {
          id: 'fainting',
          title: 'चक्कर आना या बेहोशी',
          subtitle: 'बहुत कमजोरी लगना या चक्कर खाकर गिर जाना।',
          description: 'हीमोग्लोबिन की कमी या आंतरिक रक्तस्राव का संकेत हो सकता है।',
          isUrgent: true
        },
        {
          id: 'prolonged_bleeding',
          title: 'लंबे समय तक रक्तस्राव',
          subtitle: 'सामान्य से कई दिन अधिक रक्तस्राव होना (7–8 दिनों से अधिक)।',
          description: 'यदि रक्तस्राव सामान्य चक्र से ज़्यादा समय तक चले, तो स्त्री रोग विशेषज्ञ से जांच कराएं।',
          isUrgent: false
        },
        {
          id: 'pregnancy_postpartum',
          title: 'गर्भावस्था या प्रसव बाद',
          subtitle: 'गर्भावस्था या प्रसव के बाद अचानक होने वाली गंभीर समस्याएं।',
          description: 'चेहरे या पैरों पर अचानक सूजन, तेज़ सिरदर्द या असामान्य स्राव में तुरंत डॉक्टर से संपर्क करें।',
          isUrgent: true
        },
        {
          id: 'emotional_distress',
          title: 'मानसिक परेशानी या उदासी',
          subtitle: 'यदि आप बहुत अकेला या उदास महसूस कर रही हैं, तो बेझिझक मदद लें।',
          description: 'आप अकेली नहीं हैं। टेली-मानस (14416) भारत भर में 24/7 निःशुल्क और गोपनीय मानसिक सहायता प्रदान करता है।',
          isUrgent: true
        }
      ]
    }
  },
  mr: {
    generalDisclaimer: 'सामान्य माहिती. डॉक्टर किंवा आहारतज्ज्ञ तुमच्या गरजेनुसार योग्य सल्ला देऊ शकतात.',
    eatingWell: {
      sectionTitle: 'सकस आहार',
      sectionSubtitle: 'दैनंदिन आहारासाठी पोषक आणि आरोग्यदायी पर्याय.',
      items: [
        {
          id: 'iron_friendly',
          title: 'लोहयुक्त (आयर्न) पदार्थ',
          subtitle: 'डाळी, राजमा, चणे, नाचणी, पालक, मेथी, तीळ आणि इतर पदार्थ.',
          description: 'घरातील परिचयाचे पदार्थ शरीरातील ऊर्जेची आणि रक्ताची पातळी टिकवून ठेवण्यास मदत करतात.',
          bullets: ['मूग डाळ, मसूर डाळ, राजमा आणि चणे', 'नाचणी, बाजरी आणि ज्वारीची भाकरी', 'पालक, मेथी आणि शेपूची भाजी', 'तिळाचे लाडू आणि सुके खजूर']
        },
        {
          id: 'pair_it_well',
          title: 'व्हिटॅमिन सी सोबत जोडा',
          subtitle: 'लिंबू, आवळा, पेरू आणि संत्री यांसारखी फळे शरीराला लोह शोषून घेण्यास मदत करतात.',
          description: 'वरणावर ताजे लिंबू पिळल्याने किंवा जेवणासोबत आवळा घेतल्याने अन्नातील लोह सहज शोषले जाते.',
          bullets: ['गरम वरणावर ताजे लिंबू', 'आवळ्याची चटणी किंवा कच्चा आवळा', 'पेरू किंवा संत्री खाणे']
        },
        {
          id: 'low_energy_days',
          title: 'थकव्याच्या दिवसांत सोपे जेवण',
          subtitle: 'साधे, पौष्टिक जेवण आणि पुरेसे पाणी तुम्हाला ताजेतवाने ठेवेल.',
          description: 'थकवा जास्त असेल तेव्हा साधी मऊ खिचडी किंवा कढी-भात कमी श्रमात चांगले पोषण देतात.',
          bullets: ['गरम मऊ खिचडी थोड्या तुपासह', 'दही-भात किंवा दलिया', 'सत्तूचे पेय किंवा भाजलेले चणे', 'जिरे किंवा ओव्याचे कोमट पाणी']
        },
        {
          id: 'mindful_habits',
          title: 'लक्षात ठेवण्यासारख्या गोष्टी',
          subtitle: 'जेवणासोबत चहा-कॉफी टाळा. जास्त खारट अन्नामुळे पोट फुगण्याची शक्यता असते.',
          description: 'चहा किंवा कॉफी जेवणानंतर १ तासाने घेतल्यास शरीराला अन्नातील पूर्ण पोषण मिळते.',
          bullets: ['जेवणानंतर १ तासानेच चहा घ्या', 'अति खारट आणि प्रक्रिया केलेले अन्न कमी खा', 'दिवसभर पुरेसे पाणी प्या']
        }
      ]
    },
    restMovement: {
      sectionTitle: 'विश्रांती आणि हालचाल',
      sectionSubtitle: 'शरीराला शांत आणि संतुलित ठेवण्यासाठी सोप्या सवयी.',
      items: [
        {
          id: 'better_sleep',
          title: 'शांत आणि गाढ झोप',
          subtitle: 'झोपण्यापूर्वी शांत वातावरण आणि विश्रांती शरीराला आराम देतात.',
          description: 'झोपण्यापूर्वी मोबाईल स्क्रीन बाजूला ठेवल्याने आणि पाय स्वच्छ धुतल्याने चांगली झोप येते.',
          bullets: ['झोपण्याची आणि उठण्याची नियमित वेळ पाळा', 'झोपण्यापूर्वी कोमट पाणी किंवा दूध घ्या', 'दीर्घ आणि शांत श्वास घ्या']
        },
        {
          id: 'gentle_movement',
          title: 'हलकी हालचाल व चालणे',
          subtitle: 'थोड्या वेळ चालणे किंवा हलके स्ट्रेचिंग मासिक पाळीतील वेदना कमी करण्यास मदत करते.',
          description: 'रक्ताभिसरण सुधारल्याने कंबर आणि ओटीपोटातील पेटके कमी होतात.',
          bullets: ['१०–१५ मिनिटे सकाळी शांतपणे चालणे', 'फुलपाखरू आसन (बद्ध कोणासन)', 'पाठीच्या आरामासाठी बालासन']
        },
        {
          id: 'calm_break',
          title: 'स्वतःसाठी थोडा वेळ',
          subtitle: 'तुम्हाला आनंद देणाऱ्या गोष्टींसाठी ५ मिनिटे वेळ काढा.',
          description: 'घरातील कामांमधून थोडा वेळ थांबणे हे देखील आरोग्यासाठी तितकेच महत्त्वाचे आहे.',
          bullets: ['शांत संगीत ऐका', 'गरम हर्बल चहाचा आस्वाद घ्या', '३ दीर्घ, शांत श्वास घ्या']
        }
      ]
    },
    comfort: {
      sectionTitle: 'आराम आणि स्वच्छता',
      sectionSubtitle: 'तुमच्या शरीराची आणि मनाची दैनंदिन काळजी.',
      items: [
        {
          id: 'period_products',
          title: 'मासिक पाळीची उत्पादने',
          subtitle: 'पॅड, टॅम्पॉन किंवा मेंस्ट्रुअल कप यापैकी जे सोयीचे वाटेल ते निवडा.',
          description: 'स्वच्छतेसाठी पॅड दर ४–६ तासांनी किंवा कप उत्पादक सूचनांनुसार बदलावा.',
          bullets: ['सुती व आरामदायक सॅनिटरी पॅड्स', 'वैद्यकीय सिलिकॉन कप', 'स्वच्छ पाण्याने नियमित स्वच्छता']
        },
        {
          id: 'managing_cramps',
          title: 'पोटदुखी व पेटक्यांवर आराम',
          subtitle: 'गरम पेये, शेकणे आणि विश्रांती वेदना कमी करतात.',
          description: 'ओटीपोटावर गरम पाण्याची पिशवी किंवा हीटिंग पॅड ठेवल्याने स्नायूंना आराम मिळतो.',
          bullets: ['त्वचेचे रक्षण करण्यासाठी हीटिंग पॅडवर कापड गुंडाळा', 'आले किंवा तुळशीचा गरम काढा घ्या', 'कुशीवर झोपून गुडघे पोटाजवळ घेऊन विश्रांती घ्या']
        },
        {
          id: 'mood_emotions',
          title: 'भावना आणि मनःस्थिती',
          subtitle: 'मनात चढ-उतार होणे सामान्य आहे. विश्वासू व्यक्तीशी बोला.',
          description: 'हार्मोन्सच्या बदलांमुळे मन अस्वस्थ होऊ शकते. स्वतःला दोष न देता शांत राहा.',
          bullets: ['खाजगी डायरीत मनमोकळे लिहा', 'मैत्रीण किंवा बहिणीशी मन हलके करा', 'थकवा असताना कामाचा ताण कमी ठेवा']
        }
      ]
    },
    whenToSeekCare: {
      sectionTitle: 'डॉक्टरांचा सल्ला कधी घ्यावा',
      sectionSubtitle: 'स्वतःची काळजी घेणे चांगले आहे, पण काही वेळेस वैद्यकीय सल्ला आवश्यक असतो.',
      items: [
        {
          id: 'heavy_bleeding',
          title: 'अति रक्तस्राव',
          subtitle: 'सलग काही तास दर तासाला पॅड पूर्णपणे भिजणे.',
          description: 'खूप जास्त रक्तस्राव किंवा मोठ्या गाठी पडल्यास ॲनिमियाचा धोका असतो, त्वरित डॉक्टरकडे जा.',
          isUrgent: true
        },
        {
          id: 'severe_pain',
          title: 'अतिशय तीव्र पोटदुखी',
          subtitle: 'असह्य वेदना, विशेषतः ताप असल्यास.',
          description: 'उभे राहणेही कठीण होणाऱ्या तीव्र वेदनेमध्ये तात्काळ रुग्णालयात तपासणी आवश्यक आहे.',
          isUrgent: true
        },
        {
          id: 'fainting',
          title: 'चक्कर येणे किंवा बेशुद्ध पडणे',
          subtitle: 'अतिशय अशक्तपणा वाटणे किंवा डोळ्यांसमोर अंधारी येणे.',
          description: 'रक्तातील हिमोग्लोबिन अचानक कमी झाल्याचे किंवा इतर अंतर्गत समस्येचे हे लक्षण असू शकते.',
          isUrgent: true
        },
        {
          id: 'prolonged_bleeding',
          title: 'दीर्घकाळ रक्तस्राव',
          subtitle: 'नेहमीपेक्षा जास्त दिवस रक्तस्राव होणे (७–८ दिवसांपेक्षा जास्त).',
          description: 'मासिक पाळीचा कालावधी ठरलेल्या दिवसांपेक्षा खूप जास्त लांबल्यास तज्ज्ञ स्त्रीरोगतज्ज्ञांचा सल्ला घ्या.',
          isUrgent: false
        },
        {
          id: 'pregnancy_postpartum',
          title: 'गरोदरपण किंवा बाळंतपणानंतर',
          subtitle: 'गरोदरपणात किंवा प्रसूतीनंतर अचानक होणारा त्रास.',
          description: 'चेहऱ्यावर अचानक सूज, तीव्र डोकेदुखी किंवा असामान्य स्त्राव झाल्यास लगेच डॉक्टरांना भेटा.',
          isUrgent: true
        },
        {
          id: 'emotional_distress',
          title: 'मानसिक ताण व अस्वस्थता',
          subtitle: 'खूप जास्त नैराश्य किंवा अस्वस्थता वाटत असल्यास लगेच मदत मिळवा.',
          description: 'तुम्ही एकट्या नाही आहात. टेली-मानस (१४४१६) ही संपूर्ण भारतात २४/७ मोफत आणि खाजगी मानसिक मदत सेवा आहे.',
          isUrgent: true
        }
      ]
    }
  }
};
