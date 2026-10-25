import { CareRecommendation, Pattern, Provider } from '../types';
import { SAMPLE_PUNE_PROVIDERS } from './mockProviders';

export function getCareRecommendationMock(
  patterns: Pattern[],
  filter?: {
    language?: string;
    costBand?: 'free' | 'low' | 'private' | 'all';
    facility?: 'public' | 'private' | 'all';
    femaleDoctorOnly?: boolean;
    area?: string;
  }
): CareRecommendation {
  let specialistType = 'Gynecologist';
  let urgency = 'Within 1–2 weeks';
  let reason = 'A gynecologist is the most appropriate first stop to review your cycle history, bleeding patterns, and investigate underlying causes.';
  let questionsToAsk = [
    'Are my heavy bleeding days and tiredness likely connected to low ferritin?',
    'Would a routine CBC and thyroid check be helpful right now?',
    'What pain or flow management options would you suggest for my daily routine?'
  ];

  if (patterns.length > 0) {
    const primary = patterns[0];
    if (primary.id === 'pattern-iron-deficiency') {
      specialistType = 'Gynecologist or General Physician';
      urgency = 'Within 1–2 weeks';
      reason = 'Your logged threads indicate heavy bleeding coinciding with energy drops. A clinician can review your iron levels and investigate the menstrual source.';
      questionsToAsk = [
        'Could heavy periods be lowering my hemoglobin or iron stores?',
        'Can you order a Complete Blood Count (CBC) and Serum Ferritin test?',
        'Do you recommend oral iron therapy, dietary changes, or flow-lightening treatment?'
      ];
    } else if (primary.id === 'pattern-hormonal-metabolic') {
      specialistType = 'Gynecologist or Endocrinologist';
      urgency = 'Within 2–3 weeks';
      reason = 'Evaluating hormonal balances and cycle regularity is best guided by an experienced reproductive specialist or endocrinologist.';
      questionsToAsk = [
        'Could my hair thinning and energy fluctuations relate to PCOS or thyroid activity?',
        'Is a pelvic ultrasound appropriate at this stage?',
        'What lifestyle or metabolic screenings do you advise?'
      ];
    } else if (primary.id === 'pattern-pelvic-pain') {
      specialistType = 'Gynecologist';
      urgency = 'Within 1 week';
      reason = 'Consistent severe pelvic cramping during your period deserves personalized clinical pain relief and ultrasound evaluation.';
      questionsToAsk = [
        'What could be causing pain that disrupts my normal daily activities?',
        'Can we rule out fibroids, adenomyosis, or endometriosis with an ultrasound?',
        'What targeted pain prevention strategy would you suggest?'
      ];
    }
  }

  // Filter providers based on user preferences
  let filteredProviders: Provider[] = [...SAMPLE_PUNE_PROVIDERS];

  if (filter) {
    if (filter.femaleDoctorOnly) {
      filteredProviders = filteredProviders.filter(p => p.femaleDoctorAvailable);
    }
    if (filter.costBand && filter.costBand !== 'all') {
      filteredProviders = filteredProviders.filter(p => p.costBand === filter.costBand);
    }
    if (filter.facility && filter.facility !== 'all') {
      filteredProviders = filteredProviders.filter(p => p.facility === filter.facility);
    }
    if (filter.language && filter.language !== 'all') {
      filteredProviders = filteredProviders.filter(p => 
        p.languages.some(l => l.toLowerCase() === filter.language?.toLowerCase())
      );
    }
    if (filter.area && filter.area !== 'all') {
      filteredProviders = filteredProviders.filter(p => 
        p.area.toLowerCase().includes(filter.area!.toLowerCase())
      );
    }
  }

  return {
    specialistType,
    urgency,
    reason,
    questionsToAsk,
    providers: filteredProviders,
    directoryNotice: 'Sample data for demo; verify independently. In an emergency, always call 112 or visit the nearest hospital.'
  };
}
