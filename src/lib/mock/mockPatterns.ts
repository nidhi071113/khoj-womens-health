import { Checkin, Pattern } from '../types';

export function analyzePatternsMock(checkins: Checkin[]): Pattern[] {
  const patterns: Pattern[] = [];
  if (!checkins || checkins.length === 0) return patterns;

  // Track symptom occurrences and associated checkin IDs
  const symptomOccurrences: { [code: string]: { count: number; entryIds: string[]; maxSeverity: number } } = {};

  checkins.forEach(chk => {
    chk.symptoms.forEach(s => {
      if (!symptomOccurrences[s.code]) {
        symptomOccurrences[s.code] = { count: 0, entryIds: [], maxSeverity: 0 };
      }
      symptomOccurrences[s.code].count += 1;
      symptomOccurrences[s.code].entryIds.push(chk.id);
      if (s.severity > symptomOccurrences[s.code].maxSeverity) {
        symptomOccurrences[s.code].maxSeverity = s.severity;
      }
    });

    if (chk.flow === 'heavy' || chk.flow === 'very_heavy') {
      if (!symptomOccurrences['heavy_bleeding']) {
        symptomOccurrences['heavy_bleeding'] = { count: 0, entryIds: [], maxSeverity: 2 };
      }
      symptomOccurrences['heavy_bleeding'].count += 1;
      if (!symptomOccurrences['heavy_bleeding'].entryIds.includes(chk.id)) {
        symptomOccurrences['heavy_bleeding'].entryIds.push(chk.id);
      }
    }
  });

  const heavyCount = symptomOccurrences['heavy_bleeding']?.count || 0;
  const fatigueCount = symptomOccurrences['fatigue']?.count || 0;
  const fatigueSeverity = symptomOccurrences['fatigue']?.maxSeverity || 0;
  const dizzinessCount = symptomOccurrences['dizziness']?.count || 0;
  const hairfallCount = symptomOccurrences['hair_fall']?.count || 0;
  const irregularCount = symptomOccurrences['irregular_cycle']?.count || 0;
  const crampsCount = symptomOccurrences['cramps']?.count || 0;
  const crampsSeverity = symptomOccurrences['cramps']?.maxSeverity || 0;

  // Pattern 1: Possible Iron Deficiency / Anemia Concern
  if ((heavyCount >= 2 && fatigueCount >= 2) || (heavyCount >= 1 && (fatigueSeverity >= 2 || dizzinessCount >= 1))) {
    const combinedEntryIds = Array.from(new Set([
      ...(symptomOccurrences['heavy_bleeding']?.entryIds || []),
      ...(symptomOccurrences['fatigue']?.entryIds || []),
      ...(symptomOccurrences['dizziness']?.entryIds || [])
    ]));

    patterns.push({
      id: 'pattern-iron-deficiency',
      title: 'Pattern worth discussing: possible iron-related concern',
      summary: 'Heavy menstrual bleeding accompanied by recurring tiredness or lightheadedness often reflects diminished iron reserves over time.',
      evidenceStrength: heavyCount >= 3 ? 'stronger' : 'moderate',
      evidence: [
        {
          symptom: 'Heavy bleeding',
          occurrences: heavyCount,
          period: 'Across multiple logged cycles',
          entryIds: symptomOccurrences['heavy_bleeding']?.entryIds || []
        },
        {
          symptom: 'Fatigue / low energy',
          occurrences: fatigueCount,
          period: 'Recurring on high-flow and post-flow days',
          entryIds: symptomOccurrences['fatigue']?.entryIds || []
        },
        ...(dizzinessCount > 0 ? [{
          symptom: 'Occasional dizziness',
          occurrences: dizzinessCount,
          period: 'Intermittent episodes',
          entryIds: symptomOccurrences['dizziness']?.entryIds || []
        }] : [])
      ],
      missingInformation: [
        'No recent complete blood count (CBC) or serum ferritin lab test on record.',
        'Dietary iron and absorption history not yet documented.'
      ],
      topicsToDiscuss: [
        'How many sanitary pads/tampons are soaked during your heaviest days',
        'Feeling breathlessness or weakness when climbing stairs',
        'Whether iron supplements or dietary adjustments are suitable for you'
      ],
      routeTo: 'Gynecologist or General Physician',
      suggestedSpecialist: 'Gynecologist or General Physician',
      suggestedTests: ['Complete Blood Count (CBC)', 'Serum Ferritin', 'Total Iron Binding Capacity (TIBC)'],
      otherPossibilities: [
        'Thyroid level variations',
        'Temporary sleep deficit or chronic lifestyle stress',
        'Vitamin B12 or Vitamin D insufficiency'
      ],
      notADiagnosis: true
    });
  }

  // Pattern 2: Hormonal / Metabolic factors (e.g., PCOS / Thyroid)
  if ((hairfallCount >= 1 && irregularCount >= 1) || (hairfallCount >= 2 && fatigueCount >= 2)) {
    const combinedEntryIds = Array.from(new Set([
      ...(symptomOccurrences['hair_fall']?.entryIds || []),
      ...(symptomOccurrences['fatigue']?.entryIds || []),
      ...(symptomOccurrences['irregular_cycle']?.entryIds || [])
    ]));

    patterns.push({
      id: 'pattern-hormonal-metabolic',
      title: 'Pattern worth discussing: hormonal or metabolic factors',
      summary: 'Noticeable hair thinning coupled with energy drops and menstrual variations can be associated with thyroid shifts or androgenic sensitivity.',
      evidenceStrength: 'moderate',
      evidence: [
        {
          symptom: 'Hair thinning / shedding',
          occurrences: hairfallCount,
          period: 'Persistent across check-ins',
          entryIds: symptomOccurrences['hair_fall']?.entryIds || []
        },
        {
          symptom: 'Energy fluctuations',
          occurrences: fatigueCount,
          period: 'Intermittent across weeks',
          entryIds: symptomOccurrences['fatigue']?.entryIds || []
        }
      ],
      missingInformation: [
        'No pelvic ultrasound (USG) report recorded.',
        'Hormone profile (TSH, free testosterone, LH:FSH) not yet available.'
      ],
      topicsToDiscuss: [
        'Cycle regularity and length variations over the past 6 months',
        'Acne, hair growth changes, or sudden weight shifts',
        'Stress triggers and sleep patterns'
      ],
      routeTo: 'Gynecologist or Endocrinologist',
      suggestedSpecialist: 'Gynecologist or Endocrinologist',
      suggestedTests: ['Pelvic Ultrasound (USG)', 'Thyroid Profile (TSH, Free T4)', 'Fasting Glucose / HbA1c', 'Total Testosterone'],
      otherPossibilities: [
        'Seasonal or nutritional shedding (telogen effluvium)',
        'Scalp health or environmental water hardness',
        'Post-viral fatigue'
      ],
      notADiagnosis: true
    });
  }

  // Pattern 3: Persistent Pelvic Discomfort
  if (crampsCount >= 2 && crampsSeverity >= 2) {
    patterns.push({
      id: 'pattern-pelvic-pain',
      title: 'Pattern worth discussing: recurring pelvic discomfort',
      summary: 'Menstrual cramping reaching moderate-to-severe levels across several cycles warrants a focused clinical review to investigate causes and provide effective pain management.',
      evidenceStrength: crampsSeverity === 3 ? 'stronger' : 'moderate',
      evidence: [
        {
          symptom: 'Severe cramps / pelvic ache',
          occurrences: crampsCount,
          period: 'Occurring repeatedly around cycle onset',
          entryIds: symptomOccurrences['cramps']?.entryIds || []
        }
      ],
      missingInformation: [
        'Pelvic imaging (ultrasound) has not been reviewed.',
        'Response to first-line anti-inflammatory medication not logged.'
      ],
      topicsToDiscuss: [
        'Whether pain radiates into lower back, thighs, or causes nausea',
        'How much standard over-the-counter painkillers help or fail to help',
        'Exploration of causes such as adenomyosis, fibroids, or endometriosis'
      ],
      routeTo: 'Gynecologist',
      suggestedSpecialist: 'Gynecologist',
      suggestedTests: ['High-resolution Pelvic Ultrasound', 'Clinical Pelvic Examination'],
      otherPossibilities: [
        'Primary dysmenorrhea (natural prostaglandin surge)',
        'Cervical canal sensitivity',
        'Digestive cramping overlapping with cycle'
      ],
      notADiagnosis: true
    });
  }

  return patterns;
}
