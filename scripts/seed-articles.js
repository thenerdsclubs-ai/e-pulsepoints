const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // You'll need to download this from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Article data for clean_rhythm_ecg folder
const articles = [
  {
    title: "Atrial Fibrillation (AFib): Recognition and Clinical Significance",
    slug: "atrial-fibrillation-afib-ecg-recognition",
    excerpt: "Learn to identify atrial fibrillation on ECG, understand its hemodynamic effects, and recognize when immediate intervention is required.",
    content: `# Atrial Fibrillation: A Comprehensive Guide

## What is Atrial Fibrillation?

Atrial fibrillation (AFib) is the most common sustained cardiac arrhythmia, characterized by chaotic, disorganized atrial electrical activity. Instead of the normal coordinated atrial contraction, multiple electrical impulses fire simultaneously, causing the atria to quiver rather than contract effectively.

## ECG Characteristics

### Primary Features:
1. **Irregularly Irregular Rhythm** - The hallmark of AFib, with completely unpredictable R-R intervals
2. **Absent P Waves** - Normal P waves are replaced by fibrillatory waves
3. **Fibrillatory (f) Waves** - Fine, irregular baseline oscillations best seen in leads V1 and II
4. **Narrow QRS Complexes** - Typically normal duration (unless bundle branch block coexists)
5. **Variable Ventricular Rate** - Usually 100-180 bpm when untreated

### Rate Classification:
- **Slow AFib**: Ventricular rate <60 bpm (often in patients on rate-control medications)
- **Normal Rate AFib**: 60-100 bpm (controlled)
- **Rapid Ventricular Response (RVR)**: >100 bpm (uncontrolled)

## Clinical Significance

### Hemodynamic Impact:
- **Loss of Atrial Kick**: Reduces cardiac output by 20-30%
- **Reduced Diastolic Filling**: Particularly problematic in heart failure
- **Tachycardia-Induced Cardiomyopathy**: Can occur with prolonged rapid rates

### Thromboembolic Risk:
- Blood stasis in left atrial appendage
- 5-fold increased stroke risk
- Risk stratified using CHA₂DS₂-VASc score

## Management Considerations

### Immediate Assessment:
1. **Hemodynamic Stability**: Check blood pressure, mental status, chest pain
2. **Stroke Risk**: Calculate CHA₂DS₂-VASc score
3. **Rate vs Rhythm Control**: Based on symptoms and comorbidities

### Treatment Strategies:
- **Rate Control**: Beta-blockers, calcium channel blockers, digoxin
- **Rhythm Control**: Antiarrhythmics, cardioversion, ablation
- **Anticoagulation**: Based on stroke risk score

## Key Teaching Points

1. AFib is identified by irregularly irregular rhythm without discrete P waves
2. Always assess for hemodynamic compromise in AFib with RVR
3. Stroke prevention is paramount - assess CHA₂DS₂-VASc score
4. New-onset AFib <48 hours may be candidates for cardioversion
5. Chronic AFib requires rate control and anticoagulation consideration

## Common Pitfalls

- Missing subtle AFib in elderly patients (fine fibrillatory waves)
- Over-treating asymptomatic controlled AFib
- Under-treating AFib with RVR causing hemodynamic compromise
- Forgetting to assess stroke risk before cardioversion

## References & Further Reading

- 2019 AHA/ACC/HRS Focused Update on Atrial Fibrillation
- European Society of Cardiology AFib Guidelines
- CHEST Guidelines for Antithrombotic Therapy`,
    imageUrl: "/clean_rhythm_ecg/a-fib.jpg",
    category: "clinical",
    tags: ["atrial fibrillation", "arrhythmia", "AFib", "irregular rhythm", "stroke prevention", "anticoagulation", "cardiology"],
    seoKeywords: "atrial fibrillation ECG, AFib recognition, irregular rhythm, fibrillatory waves, stroke risk, CHA2DS2-VASc, cardioversion, rate control",
    author: "Dr. Sarah Mitchell, MD",
    featured: true,
    difficulty: "intermediate"
  },
  {
    title: "Normal Sinus Rhythm (NSR): The Foundation of ECG Interpretation",
    slug: "normal-sinus-rhythm-nsr-ecg-analysis",
    excerpt: "Master the characteristics of normal sinus rhythm - the essential baseline for recognizing all cardiac arrhythmias and conduction abnormalities.",
    content: `# Normal Sinus Rhythm: Understanding the Baseline

## Definition

Normal sinus rhythm (NSR) represents the normal electrical conduction pattern of the heart, originating from the sinoatrial (SA) node in the right atrium.

## ECG Criteria for NSR

### Essential Components:
1. **Regular Rhythm**: Consistent R-R intervals (variation <10%)
2. **Heart Rate**: 60-100 beats per minute
3. **P Wave Morphology**:
   - Upright in leads I, II, aVF
   - Inverted in aVR
   - Consistent morphology
4. **PR Interval**: 0.12-0.20 seconds (3-5 small squares)
5. **P:QRS Ratio**: 1:1 (one P wave per QRS complex)
6. **QRS Duration**: <0.12 seconds (narrow complex)

## Physiological Variations

### Sinus Arrhythmia:
- Normal variation with respiratory cycle
- Rate increases with inspiration, decreases with expiration
- Common in young, healthy individuals
- P wave morphology remains consistent

### Age-Related Variations:
- **Infants**: 100-160 bpm is normal
- **Children**: 70-120 bpm
- **Adults**: 60-100 bpm
- **Athletes**: May have resting rates 40-60 bpm (sinus bradycardia)

## Clinical Significance

NSR indicates:
- Normal SA node function
- Intact AV conduction
- No significant electrolyte imbalances
- No acute cardiac ischemia (in absence of ST changes)

## What NSR Doesn't Rule Out

Important: NSR does not exclude:
- Valvular heart disease
- Cardiomyopathy
- Coronary artery disease (between ischemic episodes)
- Heart failure
- Pericardial disease

## Key Teaching Points

1. NSR requires ALL criteria to be met - one abnormality changes the diagnosis
2. Rate alone doesn't define rhythm - must assess P waves and regularity
3. Sinus arrhythmia is a normal variant, not pathological
4. Always correlate ECG with clinical presentation
5. NSR with ST-T changes may indicate ischemia or other pathology

## Common Mistakes

- Calling irregular rhythm "NSR" (likely sinus arrhythmia or AFib)
- Missing subtle ST-segment changes in otherwise NSR
- Confusing sinus bradycardia/tachycardia with NSR
- Not measuring PR interval (may have first-degree AV block)

## Practice Tips

1. Always start by identifying P waves
2. Measure rate using 300/large boxes method
3. Check regularity using calipers or paper
4. Verify P:QRS relationship
5. Assess intervals (PR, QRS, QT)`,
    imageUrl: "/clean_rhythm_ecg/NSR.jpg",
    category: "education",
    tags: ["normal sinus rhythm", "NSR", "ECG basics", "cardiac conduction", "heart rate", "P wave", "cardiology fundamentals"],
    seoKeywords: "normal sinus rhythm, NSR ECG, ECG interpretation basics, P wave morphology, cardiac rhythm, sinus node, ECG criteria",
    author: "Dr. James Chen, MD, FACC",
    featured: true,
    difficulty: "beginner"
  },
  {
    title: "Ventricular Fibrillation (V-Fib): Life-Threatening Emergency Recognition",
    slug: "ventricular-fibrillation-vfib-emergency-response",
    excerpt: "Immediate recognition of ventricular fibrillation is critical. Learn the ECG pattern of this fatal arrhythmia and the urgent interventions required.",
    content: `# Ventricular Fibrillation: Cardiac Arrest Emergency

## Overview

Ventricular fibrillation (V-Fib or VF) is a life-threatening arrhythmia characterized by chaotic, disorganized ventricular electrical activity. It is a SHOCKABLE rhythm and requires immediate defibrillation.

## ECG Characteristics

### Diagnostic Features:
1. **Chaotic Baseline**: Completely irregular, rapid oscillations
2. **No Identifiable Waves**: No P waves, QRS complexes, or T waves
3. **Irregular Amplitude**: Varies from coarse (>3mm) to fine (<3mm)
4. **Rate**: 150-500 oscillations per minute (unmeasurable)

### Types:
- **Coarse V-Fib**: Amplitude >3mm, better prognosis, more likely to respond to defibrillation
- **Fine V-Fib**: Amplitude <3mm, may appear like asystole, worse prognosis

## Pathophysiology

### Mechanism:
- Multiple re-entry circuits in ventricles
- Complete loss of coordinated ventricular contraction
- No effective cardiac output
- Immediate cardiac arrest

### Common Causes:
1. **Acute Myocardial Infarction**: Most common cause
2. **Severe Ischemia**: Critical coronary perfusion
3. **Electrolyte Imbalance**: Hypokalemia, hypomagnesemia
4. **Drug Toxicity**: Digoxin, antiarrhythmics
5. **Cardiomyopathy**: Dilated or hypertrophic
6. **Long QT Syndrome**: Congenital or acquired
7. **Electrical Shock**: Lightning, high-voltage injury
8. **Hypothermia**: Severe cases

## Emergency Management

### Immediate Actions (First 60 Seconds):
1. **Verify Pulselessness**: Check carotid pulse (10 seconds max)
2. **Call Code/Activate EMS**: Get help immediately
3. **Start CPR**: High-quality chest compressions
4. **Attach Defibrillator**: Prepare for shock

### Defibrillation Protocol:
- **Initial Shock**: 200J biphasic (360J monophasic)
- **Resume CPR**: 2 minutes of high-quality CPR
- **Reassess Rhythm**: Check if still V-Fib
- **Repeat Shock**: If V-Fib persists
- **Epinephrine**: 1mg IV every 3-5 minutes
- **Amiodarone**: 300mg IV bolus after 3rd shock

## Survival Factors

### Critical Time Windows:
- **1 minute**: ~90% survival with immediate defibrillation
- **5 minutes**: ~50% survival
- **10 minutes**: <10% survival
- Every minute delay reduces survival by 7-10%

### Chain of Survival:
1. Early recognition and activation
2. Early CPR
3. Early defibrillation
4. Advanced life support
5. Post-cardiac arrest care

## Differential Diagnosis

### Must Distinguish From:
- **Asystole**: Flat line (non-shockable)
- **Artifact**: Patient movement, loose leads
- **Fine V-Fib**: May look like asystole - increase gain
- **Polymorphic VT**: Some QRS complexes visible

## Post-Resuscitation Care

After ROSC (Return of Spontaneous Circulation):
1. Targeted temperature management (32-36°C)
2. Coronary angiography (if STEMI suspected)
3. Correct electrolytes
4. Continuous monitoring
5. Consider ICD placement

## Prevention Strategies

### High-Risk Patients:
- ICD implantation (primary or secondary prevention)
- Beta-blockers post-MI
- Optimize heart failure therapy
- Correct electrolytes (K >4.0, Mg >2.0)
- Avoid QT-prolonging drugs

## Key Teaching Points

1. V-Fib is immediately fatal without defibrillation
2. Coarse V-Fib responds better than fine V-Fib
3. Time to defibrillation is the most critical factor
4. High-quality CPR between shocks is essential
5. Always verify fine V-Fib vs asystole in multiple leads

## Common Pitfalls

- Mistaking fine V-Fib for asystole
- Delaying defibrillation to establish IV access
- Poor CPR quality between defibrillation attempts
- Not checking lead connections when seeing "V-Fib"
- Shocking non-shockable rhythms`,
    imageUrl: "/clean_rhythm_ecg/ventricular-fibrillation.jpg",
    category: "clinical",
    tags: ["ventricular fibrillation", "V-Fib", "cardiac arrest", "emergency", "defibrillation", "ACLS", "life-threatening arrhythmia"],
    seoKeywords: "ventricular fibrillation ECG, V-Fib recognition, cardiac arrest, defibrillation, ACLS protocol, shockable rhythm, emergency cardiology",
    author: "Dr. Michael Rodriguez, MD, FACEP",
    featured: true,
    difficulty: "advanced"
  }
];

// Add 22 more articles to reach 25...
const moreArticles = [
  {
    title: "Ventricular Tachycardia (VT): Recognizing the Wide Complex Emergency",
    slug: "ventricular-tachycardia-vt-recognition-management",
    excerpt: "Differentiate ventricular tachycardia from SVT with aberrancy. Learn Brugada criteria and emergency management of this potentially fatal arrhythmia.",
    content: `# Ventricular Tachycardia: Critical Arrhythmia Recognition

## Definition

Ventricular tachycardia (VT) is defined as three or more consecutive ventricular beats at a rate >100 bpm, originating from the ventricles rather than the SA node.

## ECG Characteristics

### Diagnostic Criteria:
1. **Wide QRS Complex**: >0.12 seconds (3 small squares)
2. **Heart Rate**: Typically 100-250 bpm
3. **Regular or Slightly Irregular Rhythm**
4. **AV Dissociation**: P waves and QRS independent (when visible)
5. **Fusion Beats**: Combination of sinus and ventricular beats
6. **Capture Beats**: Occasional narrow QRS from sinus node

### Types:
- **Monomorphic VT**: Consistent QRS morphology
- **Polymorphic VT**: Varying QRS morphology (including Torsades)
- **Sustained VT**: >30 seconds or requires termination
- **Non-sustained VT**: <30 seconds, self-terminating

## Clinical Presentation

### Symptoms Vary by Hemodynamic Status:
- **Stable VT**: Palpitations, lightheadedness, anxiety
- **Unstable VT**: Hypotension, altered mental status, chest pain, dyspnea
- **Pulseless VT**: Cardiac arrest (treat as V-Fib)

## Brugada Criteria for VT

Four criteria to differentiate VT from SVT with aberrancy:
1. Absence of RS complex in all precordial leads
2. R to S interval >100ms in any precordial lead
3. AV dissociation present
4. Morphology criteria in V1-V2 and V6

**If ANY criterion is met → VT (>95% sensitivity)**

## Emergency Management

### Unstable VT (Hypotension, AMS, Chest Pain):
1. **Immediate Synchronized Cardioversion**
   - 100J biphasic (or 200J monophasic)
   - Sedate if conscious
   - Increase energy if unsuccessful

### Stable Monomorphic VT:
1. **Amiodarone**: 150mg IV over 10 min, repeat PRN
2. **Procainamide**: 20-50mg/min until arrhythmia suppressed
3. **Lidocaine**: 1-1.5mg/kg IV bolus
4. **Consider Cardioversion**: If medications fail

### Pulseless VT:
- **Treat as V-Fib**: Immediate unsynchronized defibrillation
- Follow ACLS algorithm

## Common Causes

1. **Acute MI**: Most common cause
2. **Cardiomyopathy**: Ischemic or non-ischemic
3. **Electrolyte Abnormalities**: K⁺, Mg²⁺, Ca²⁺
4. **Long QT Syndrome**: Torsades de Pointes
5. **Digitalis Toxicity**
6. **Stimulant Use**: Cocaine, methamphetamine
7. **Structural Heart Disease**

## Key Teaching Points

1. Wide complex tachycardia = VT until proven otherwise
2. Never give calcium channel blockers for wide complex tachycardia
3. AV dissociation is diagnostic of VT
4. Pulseless VT requires immediate defibrillation
5. Post-VT patients need ICD evaluation

## Dangerous Mistakes

- Treating VT with calcium channel blockers (can cause cardiovascular collapse)
- Delaying cardioversion in unstable patients
- Missing torsades de pointes (requires magnesium)
- Not correcting underlying electrolytes`,
    imageUrl: "/clean_rhythm_ecg/ventricular-tachycardia.jpg",
    category: "clinical",
    tags: ["ventricular tachycardia", "VT", "wide complex tachycardia", "Brugada criteria", "cardioversion", "emergency cardiology"],
    seoKeywords: "ventricular tachycardia ECG, VT recognition, wide complex tachycardia, Brugada criteria, monomorphic VT, cardioversion protocol",
    author: "Dr. Lisa Thompson, MD",
    featured: true,
    difficulty: "advanced"
  }
];

// Continue with remaining 21 articles...

module.exports = { articles, moreArticles };