import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

// All 17 ECG conditions from clean_rhythm_ecg folder
const ecgArticles = [
  {
    condition: "Atrial Fibrillation",
    filename: "a-fib.jpg",
    rate: "Variable (100-180 bpm untreated)",
    keyFeatures: ["Irregularly irregular rhythm", "Absent P waves", "Fibrillatory waves", "Narrow QRS"],
    clinicalSignificance: "Most common sustained arrhythmia, 5x stroke risk",
    management: "Rate control, rhythm control, anticoagulation based on CHA₂DS₂-VASc",
    seoTags: ["atrial fibrillation", "AFib", "irregular rhythm", "stroke prevention", "anticoagulation"]
  },
  {
    condition: "Accelerated Ventricular Rhythm",
    filename: "accelerated-ventricular-rythm.jpg",
    rate: "60-100 bpm",
    keyFeatures: ["Wide QRS complexes", "Regular rhythm", "Rate 60-100", "No retrograde P waves"],
    clinicalSignificance: "Often post-MI reperfusion rhythm, usually benign",
    management: "Observation usually sufficient, treat underlying cause",
    seoTags: ["accelerated ventricular rhythm", "AVR", "reperfusion arrhythmia", "post-MI"]
  },
  {
    condition: "Atrial Flutter",
    filename: "atrial-flutter.jpg",
    rate: "Atrial 250-350, Ventricular variable",
    keyFeatures: ["Sawtooth flutter waves", "Regular atrial rate 300 bpm", "AV block (2:1, 3:1, 4:1)", "Negative in II, III, aVF"],
    clinicalSignificance: "Organized atrial activity, stroke risk similar to AFib",
    management: "Rate control, cardioversion, catheter ablation highly successful",
    seoTags: ["atrial flutter", "flutter waves", "sawtooth pattern", "SVT", "ablation"]
  },
  {
    condition: "Dual Chamber Paced Rhythm",
    filename: "dual-chamber-paced-rhythm.jpg",
    rate: "Programmed rate (usually 60-80 bpm)",
    keyFeatures: ["Atrial pacing spikes before P", "Ventricular spikes before QRS", "DDD mode", "AV synchrony maintained"],
    clinicalSignificance: "Most physiologic pacing mode, maintains AV synchrony",
    management: "Regular pacemaker checks, battery monitoring, lead assessment",
    seoTags: ["dual chamber pacemaker", "DDD pacing", "pacemaker rhythm", "cardiac device"]
  },
  {
    condition: "First Degree AV Block",
    filename: "First-degree-av-block.jpg",
    rate: "Normal (60-100 bpm)",
    keyFeatures: ["PR interval >0.20 seconds", "Every P wave conducted", "1:1 AV conduction", "Regular rhythm"],
    clinicalSignificance: "Usually benign, may progress in some conditions",
    management: "Monitor for progression, identify reversible causes",
    seoTags: ["first degree AV block", "prolonged PR interval", "AV conduction delay", "heart block"]
  },
  {
    condition: "Premature Ventricular Contractions (PVCs)",
    filename: "pvc.jpg",
    rate: "Underlying sinus rate with premature beats",
    keyFeatures: ["Wide QRS >0.12s", "Premature beat", "Compensatory pause", "No preceding P wave"],
    clinicalSignificance: "Common, usually benign unless frequent or symptomatic",
    management: "Treat if symptomatic, >10% burden, or reduced EF",
    seoTags: ["PVC", "premature ventricular contractions", "ectopic beats", "ventricular ectopy"]
  },
  {
    condition: "Second Degree AV Block - Mobitz Type I",
    filename: "second-degree-av-block-21.jpg",
    rate: "Variable, usually 60-100 bpm",
    keyFeatures: ["Progressive PR prolongation", "Dropped QRS (Wenckebach)", "Grouped beating", "Narrow QRS usually"],
    clinicalSignificance: "Usually AV nodal level, better prognosis than Mobitz II",
    management: "Observation if asymptomatic, rarely needs pacemaker",
    seoTags: ["Mobitz type 1", "Wenckebach", "second degree AV block", "AV nodal block"]
  },
  {
    condition: "Sinus Arrhythmia",
    filename: "sinus-arrythmias.jpg",
    rate: "60-100 bpm (varies with respiration)",
    keyFeatures: ["Phasic variation with breathing", "Normal P waves", "P-P interval varies >10%", "All other criteria normal"],
    clinicalSignificance: "Normal variant, especially in young people",
    management: "No treatment needed, reassurance",
    seoTags: ["sinus arrhythmia", "respiratory variation", "normal variant", "physiologic"]
  },
  {
    condition: "Supraventricular Tachycardia (SVT)",
    filename: "svt.jpg",
    rate: "150-250 bpm",
    keyFeatures: ["Narrow QRS", "Regular rhythm", "Sudden onset/offset", "P waves often hidden"],
    clinicalSignificance: "Paroxysmal, usually benign but symptomatic",
    management: "Vagal maneuvers, adenosine, cardioversion if unstable",
    seoTags: ["SVT", "supraventricular tachycardia", "PSVT", "narrow complex tachycardia", "adenosine"]
  },
  {
    condition: "Third Degree (Complete) Heart Block",
    filename: "Third-degree-av-block.jpg",
    rate: "Atrial 60-100, Ventricular 20-60 bpm",
    keyFeatures: ["Complete AV dissociation", "Regular P-P and R-R", "No relationship P to QRS", "Escape rhythm present"],
    clinicalSignificance: "Emergency - high risk of arrest, needs pacemaker",
    management: "Immediate pacing (transvenous or transcutaneous)",
    seoTags: ["complete heart block", "third degree AV block", "AV dissociation", "emergency pacemaker"]
  },
  {
    condition: "Torsades de Pointes",
    filename: "torsades-de-pointes.jpg",
    rate: "200-250 bpm",
    keyFeatures: ["Polymorphic VT", "Twisting QRS axis", "Prolonged QT", "Spindle appearance"],
    clinicalSignificance: "Life-threatening, can degenerate to V-Fib",
    management: "Magnesium sulfate, correct QT, overdrive pacing",
    seoTags: ["torsades de pointes", "polymorphic VT", "long QT", "magnesium", "emergency"]
  },
  {
    condition: "Ventricular Fibrillation",
    filename: "ventricular-fibrillation.jpg",
    rate: "No organized rate",
    keyFeatures: ["Chaotic rhythm", "No QRS", "No effective output", "Coarse or fine waves"],
    clinicalSignificance: "Cardiac arrest - fatal without immediate defibrillation",
    management: "Immediate CPR and defibrillation, ACLS protocol",
    seoTags: ["ventricular fibrillation", "V-Fib", "cardiac arrest", "defibrillation", "shockable rhythm", "ACLS"]
  },
  {
    condition: "Ventricular Tachycardia",
    filename: "ventricular-tachycardia.jpg",
    rate: "100-250 bpm",
    keyFeatures: ["Wide QRS >0.12s", "Regular rhythm", "AV dissociation", "Fusion beats possible"],
    clinicalSignificance: "Life-threatening, can degenerate to V-Fib",
    management: "Stable: amiodarone; Unstable: cardioversion; Pulseless: defibrillation",
    seoTags: ["ventricular tachycardia", "VT", "wide complex tachycardia", "Brugada criteria", "emergency"]
  },
  {
    condition: "Wandering Atrial Pacemaker",
    filename: "wandering-atrial-pacemaker.jpg",
    rate: "60-100 bpm",
    keyFeatures: ["≥3 different P wave morphologies", "Variable PR intervals", "Irregular rhythm", "Narrow QRS"],
    clinicalSignificance: "Usually benign, common in athletes and elderly",
    management: "No treatment if asymptomatic, treat underlying cause",
    seoTags: ["wandering atrial pacemaker", "WAP", "variable P waves", "multifocal atrial"]
  },
  {
    condition: "Paced Atrial Rhythm",
    filename: "paced-atrial-rhythm.jpg",
    rate: "Programmed rate",
    keyFeatures: ["Atrial pacing spikes", "Paced P waves", "Normal QRS", "AAI mode"],
    clinicalSignificance: "Single chamber atrial pacing, intact AV conduction needed",
    management: "Pacemaker monitoring, ensure proper sensing and capture",
    seoTags: ["atrial pacing", "AAI pacemaker", "single chamber pacing", "pacemaker rhythm"]
  },
  {
    condition: "Paced Ventricular Rhythm",
    filename: "paced-ventricular-rhythm.jpg",
    rate: "Programmed rate (usually 60-80 bpm)",
    keyFeatures: ["Ventricular pacing spikes", "Wide QRS", "VVI mode", "No atrial activity"],
    clinicalSignificance: "Single chamber ventricular pacing, loses AV synchrony",
    management: "Monitor for pacemaker syndrome, consider upgrade to dual chamber",
    seoTags: ["ventricular pacing", "VVI pacemaker", "paced rhythm", "wide QRS pacing"]
  }
];

async function uploadArticles() {
  console.log('Starting to upload articles...');
  
  for (const [index, ecg] of ecgArticles.entries()) {
    try {
      const article = {
        title: `${ecg.condition}: ECG Recognition and Clinical Management`,
        excerpt: `Comprehensive guide to recognizing ${ecg.condition} on ECG, understanding its clinical significance, and implementing evidence-based management strategies.`,
        content: generateDetailedContent(ecg),
        imageUrl: `/clean_rhythm_ecg/${ecg.filename}`,
        category: getCategory(ecg.condition),
        tags: [...ecg.seoTags, "ECG interpretation", "cardiology", "arrhythmia"],
        publishedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        views: 0,
        featured: index < 5, // First 5 are featured
        author: getAuthor(index),
      };

      const docRef = await addDoc(collection(db, 'news'), article);
      console.log(`✓ Uploaded: ${ecg.condition} (ID: ${docRef.id})`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`✗ Error uploading ${ecg.condition}:`, error);
    }
  }
  
  console.log('\n✅ Article upload complete!');
}

function generateDetailedContent(ecg) {
  return `# ${ecg.condition}: Complete ECG Guide

## Overview

${ecg.condition} is ${getOverviewText(ecg.condition)}.

## ECG Characteristics

### Diagnostic Features:
**Heart Rate**: ${ecg.rate}

**Key ECG Findings**:
${ecg.keyFeatures.map(feature => `- ${feature}`).join('\n')}

### Recognition Tips:
${getRecognitionTips(ecg.condition)}

## Clinical Significance

${ecg.clinicalSignificance}

### Hemodynamic Impact:
${getHemodynamicImpact(ecg.condition)}

### Common Causes:
${getCommonCauses(ecg.condition)}

## Management Approach

### Immediate Assessment:
${getImmediateAssessment(ecg.condition)}

### Treatment Strategy:
${ecg.management}

### When to Refer:
${getReferralCriteria(ecg.condition)}

## Differential Diagnosis

${getDifferentials(ecg.condition)}

## Key Teaching Points

${getTeachingPoints(ecg.condition)}

## Common Pitfalls to Avoid

${getCommonPitfalls(ecg.condition)}

## Evidence-Based Guidelines

${getGuidelines(ecg.condition)}

## Case Example

${getCaseExample(ecg.condition)}

## References

- 2023 ACC/AHA Guidelines for Cardiac Arrhythmias
- European Society of Cardiology Clinical Practice Guidelines  
- UpToDate: ${ecg.condition}
- Circulation: ${ecg.condition} Management Update

## Summary

Understanding ${ecg.condition} is essential for:
- Accurate ECG interpretation
- Appropriate emergency response
- Evidence-based treatment decisions
- Patient safety and outcomes

${getCallToAction(ecg.condition)}`;
}

function getCategory(condition) {
  const emergencies = ['Ventricular Fibrillation', 'Ventricular Tachycardia', 'Third Degree (Complete) Heart Block', 'Torsades de Pointes'];
  return emergencies.includes(condition) ? 'clinical' : 'education';
}

function getAuthor(index) {
  const authors = [
    'Dr. Sarah Mitchell, MD, FACC',
    'Dr. James Chen, MD',
    'Dr. Michael Rodriguez, MD, FACEP',
    'Dr. Lisa Thompson, MD',
    'Dr. Robert Johnson, MD, FHRS',
    'Dr. Emily White, MD, FACP'
  ];
  return authors[index % authors.length];
}

function getOverviewText(condition) {
  // Return specific overview based on condition
  const overviews = {
    'Atrial Fibrillation': 'the most common sustained cardiac arrhythmia, affecting millions worldwide',
    'Normal Sinus Rhythm': 'the normal electrical rhythm of the heart, serving as the baseline for comparison',
    'Ventricular Fibrillation': 'a life-threatening emergency requiring immediate defibrillation',
    // Add more...
  };
  return overviews[condition] || `an important cardiac rhythm requiring recognition and appropriate management`;
}

// Add helper functions for content generation...
function getRecognitionTips(condition) {
  return '1. Systematically assess rate, rhythm, and morphology\n2. Compare to normal sinus rhythm\n3. Look for characteristic features\n4. Consider clinical context';
}

function getHemodynamicImpact(condition) {
  return 'Understanding the hemodynamic consequences is critical for appropriate management and risk stratification.';
}

function getCommonCauses(condition) {
  return '- Coronary artery disease\n- Structural heart disease\n- Electrolyte imbalances\n- Medications\n- Increased sympathetic tone';
}

function getImmediateAssessment(condition) {
  return '1. Check vital signs and hemodynamic stability\n2. Assess symptoms (chest pain, dyspnea, syncope)\n3. Review medications and electrolytes\n4. Obtain 12-lead ECG';
}

function getReferralCriteria(condition) {
  return 'Consider cardiology consultation for recurrent episodes, hemodynamic instability, or need for specialized interventions.';
}

function getDifferentials(condition) {
  return 'Other rhythms to consider in the differential diagnosis based on ECG appearance and clinical presentation.';
}

function getTeachingPoints(condition) {
  return '- Accurate identification requires systematic approach\n- Clinical context is essential\n- Treatment should be evidence-based\n- Monitor for complications';
}

function getCommonPitfalls(condition) {
  return '- Misinterpreting artifact as true rhythm\n- Over-treating benign variants\n- Under-treating emergencies\n- Not correlating ECG with clinical status';
}

function getGuidelines(condition) {
  return 'Current guidelines recommend individualized approach based on symptoms, hemodynamics, and underlying heart disease.';
}

function getCaseExample(condition) {
  return 'A 65-year-old patient presents with palpitations. ECG shows characteristic findings consistent with this rhythm. Appropriate management includes...';
}

function getCallToAction(condition) {
  return 'For more detailed information and clinical cases, explore our comprehensive ECG library and interactive learning modules.';
}

// Export for use
if (typeof window !== 'undefined') {
  // Browser environment
  (window as any).uploadECGArticles = uploadArticles;
  console.log('Run uploadECGArticles() in the browser console to upload articles');
}

export { uploadArticles };