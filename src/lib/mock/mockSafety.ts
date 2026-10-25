import redFlagsConfig from './redFlags.json';
import { SafetyResult, SymptomEntry, LifeStage } from '../types';

// DEMO RULES, not clinically reviewed.
export function assessSafetyMock(
  symptoms: SymptomEntry[],
  lifeStage: LifeStage,
  flow?: string
): SafetyResult {
  const codes = new Set(symptoms.map(s => s.code));

  // If flow is marked very heavy, treat as heavy bleeding or severe loss
  if (flow === 'very_heavy') {
    codes.add('heavy_bleeding');
  }

  for (const rule of redFlagsConfig.rules) {
    if (rule.lifeStage && rule.lifeStage !== lifeStage) {
      continue;
    }

    if (rule.requiresAll) {
      const allPresent = rule.symptomCodes.every(code => codes.has(code));
      if (allPresent) {
        return {
          level: rule.level as SafetyResult['level'],
          redFlag: true,
          matchedRuleId: rule.id,
          ruleVersion: redFlagsConfig.ruleVersion,
          message: rule.message,
          showSafetyScreen: rule.level === 'emergency' || rule.level === 'urgent',
          aiCanOverride: false,
          contactNumber: rule.contactNumber || '112',
          serviceName: rule.serviceName || 'Emergency Helpline',
          suggestedAction: 'Please seek direct medical evaluation immediately.'
        };
      }
    } else {
      const anyPresent = rule.symptomCodes.some(code => codes.has(code));
      if (anyPresent) {
        const isUrgentOrEmergency = rule.level === 'emergency' || rule.level === 'urgent';
        return {
          level: rule.level as SafetyResult['level'],
          redFlag: isUrgentOrEmergency,
          matchedRuleId: rule.id,
          ruleVersion: redFlagsConfig.ruleVersion,
          message: rule.message,
          showSafetyScreen: isUrgentOrEmergency,
          aiCanOverride: false,
          contactNumber: rule.contactNumber || '112',
          serviceName: rule.serviceName || 'Healthcare Provider',
          suggestedAction: isUrgentOrEmergency 
            ? 'Contact emergency services or visit the nearest hospital emergency room.'
            : 'Schedule a consultation with a healthcare provider this week.'
        };
      }
    }
  }

  // Check severe single symptom with severity 3
  const severeSymptoms = symptoms.filter(s => s.severity === 3);
  if (severeSymptoms.length >= 2) {
    return {
      level: 'soon',
      redFlag: false,
      ruleVersion: redFlagsConfig.ruleVersion,
      message: 'You have reported high-intensity symptoms affecting your daily routine. We recommend speaking with a healthcare professional soon.',
      showSafetyScreen: false,
      aiCanOverride: false,
      suggestedAction: 'Consult a primary physician or gynecologist within the next 3-5 days.'
    };
  }

  return {
    level: 'routine',
    redFlag: false,
    ruleVersion: redFlagsConfig.ruleVersion,
    message: 'Your recorded symptoms appear suitable for routine self-care and monitoring on your health timeline.',
    showSafetyScreen: false,
    aiCanOverride: false,
    suggestedAction: 'Keep logging how you feel to build a clear symptom timeline.'
  };
}
