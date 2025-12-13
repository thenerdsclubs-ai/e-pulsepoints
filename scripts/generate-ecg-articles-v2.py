"""
ECG Article Generator V2 for E-PulsePoints
Generates comprehensive, beautifully formatted articles with ECG images
Author: Dr. Raj K, Emergency Medicine Physician
"""

import json
from datetime import datetime

# All ECG conditions from clean_rhythm_ecg folder
ecg_conditions = [
    {
        "name": "Atrial Fibrillation",
        "filename": "a-fib.jpg",
        "rate": "Variable (100-180 bpm untreated)",
        "features": ["Irregularly irregular rhythm", "Absent P waves", "Fibrillatory waves", "Narrow QRS complexes"],
        "significance": "Most common sustained arrhythmia, 5-fold stroke risk",
        "management": "Rate control, rhythm control, anticoagulation based on CHA₂DS₂-VASc score",
        "tags": ["atrial fibrillation", "AFib", "irregular rhythm", "stroke prevention", "anticoagulation", "RVR"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Accelerated Ventricular Rhythm",
        "filename": "accelerated-ventricular-rythm.jpg",
        "rate": "60-100 bpm",
        "features": ["Wide QRS complexes >0.12s", "Regular rhythm", "Rate between 60-100 bpm", "No retrograde P waves"],
        "significance": "Often seen post-MI reperfusion (reperfusion arrhythmia), usually benign",
        "management": "Observation usually sufficient, treat underlying cause, avoid suppressive therapy",
        "tags": ["accelerated ventricular rhythm", "AVR", "reperfusion arrhythmia", "post-MI", "idioventricular"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Atrial Flutter",
        "filename": "atrial-flutter.jpg",
        "rate": "Atrial 250-350 bpm, Ventricular variable",
        "features": ["Sawtooth flutter waves (F waves)", "Regular atrial rate ~300 bpm", "AV block (2:1, 3:1, 4:1)", "Negative flutter waves in II, III, aVF"],
        "significance": "Organized atrial activity, stroke risk similar to AFib, highly ablatable",
        "management": "Rate control, consider cardioversion, catheter ablation (>90% success rate)",
        "tags": ["atrial flutter", "flutter waves", "sawtooth pattern", "SVT", "ablation"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Dual Chamber Paced Rhythm",
        "filename": "dual-chamber-paced-rhythm.jpg",
        "rate": "Programmed rate (typically 60-80 bpm)",
        "features": ["Atrial pacing spikes before P waves", "Ventricular pacing spikes before QRS", "DDD pacing mode", "AV synchrony maintained"],
        "significance": "Most physiologic pacing mode, maintains AV synchrony and cardiac output",
        "management": "Regular pacemaker checks every 6-12 months, battery monitoring, lead assessment",
        "tags": ["dual chamber pacemaker", "DDD pacing", "pacemaker rhythm", "cardiac device"],
        "category": "technology",
        "difficulty": "intermediate"
    },
    {
        "name": "First Degree AV Block",
        "filename": "First-degree-av-block.jpg",
        "rate": "Normal sinus rate (60-100 bpm)",
        "features": ["PR interval >0.20 seconds", "Every P wave conducted", "1:1 AV conduction", "Regular rhythm"],
        "significance": "Usually benign, may indicate AV nodal disease, can progress to higher degrees",
        "management": "Monitor for progression, identify reversible causes (medications, ischemia)",
        "tags": ["first degree AV block", "prolonged PR interval", "AV conduction delay"],
        "category": "education",
        "difficulty": "beginner"
    },
    {
        "name": "Normal Sinus Rhythm",
        "filename": "NSR.jpg",
        "rate": "60-100 bpm",
        "features": ["Regular rhythm", "Upright P waves in I, II, aVF", "PR interval 0.12-0.20s", "Narrow QRS <0.12s"],
        "significance": "Normal cardiac electrical activity, baseline for comparison",
        "management": "No treatment needed, maintain cardiovascular health",
        "tags": ["normal sinus rhythm", "NSR", "normal ECG", "baseline"],
        "category": "education",
        "difficulty": "beginner"
    },
    {
        "name": "Atrial Paced Rhythm",
        "filename": "paced-atrial-rhythm.jpg",
        "rate": "Programmed rate (60-80 bpm)",
        "features": ["Pacing spike before P wave", "Paced P wave morphology", "AAI pacing mode", "Intrinsic AV conduction"],
        "significance": "Maintains atrial kick, used in sinus node dysfunction with intact AV conduction",
        "management": "Regular device checks, battery monitoring, lead function assessment",
        "tags": ["atrial pacing", "AAI pacing", "pacemaker", "sinus node dysfunction"],
        "category": "technology",
        "difficulty": "intermediate"
    },
    {
        "name": "Ventricular Paced Rhythm",
        "filename": "paced-ventricular-rhythm.jpg",
        "rate": "Programmed rate (60-80 bpm)",
        "features": ["Pacing spike before QRS", "Wide QRS complex", "VVI pacing mode", "No atrial synchrony"],
        "significance": "Provides ventricular support, less physiologic than dual chamber pacing",
        "management": "Device checks, consider upgrade to dual chamber if symptomatic",
        "tags": ["ventricular pacing", "VVI pacing", "pacemaker rhythm"],
        "category": "technology",
        "difficulty": "intermediate"
    },
    {
        "name": "Premature Ventricular Contractions",
        "filename": "pvc.jpg",
        "rate": "Underlying sinus rate with premature beats",
        "features": ["Wide QRS >0.12s", "Premature beat", "Compensatory pause", "No P wave for PVC"],
        "significance": "Very common, usually benign unless frequent (>10%) or symptomatic",
        "management": "Treat if symptomatic, burden >10%, or reduced EF. Beta-blockers first-line",
        "tags": ["PVC", "premature ventricular contractions", "ectopic beats", "ventricular ectopy"],
        "category": "education",
        "difficulty": "beginner"
    },
    {
        "name": "Second Degree AV Block Mobitz Type I",
        "filename": "second-degree-av-block-21.jpg",
        "rate": "Variable (60-100 bpm)",
        "features": ["Progressive PR prolongation", "Dropped QRS after longest PR", "Wenckebach phenomenon", "Narrow QRS usually"],
        "significance": "AV nodal level block, better prognosis than Mobitz II, often reversible",
        "management": "Observation if asymptomatic, rarely requires pacemaker",
        "tags": ["Mobitz type 1", "Wenckebach", "second degree AV block", "grouped beating"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Sinus Arrhythmia",
        "filename": "sinus-arrythmias.jpg",
        "rate": "60-100 bpm (varies with respiration)",
        "features": ["Phasic variation with breathing", "Normal P wave morphology", "P-P interval varies >10%", "All NSR criteria met"],
        "significance": "Normal physiologic variant, common in young and athletes",
        "management": "No treatment needed, patient reassurance, sign of good vagal tone",
        "tags": ["sinus arrhythmia", "respiratory variation", "normal variant", "physiologic"],
        "category": "education",
        "difficulty": "beginner"
    },
    {
        "name": "Supraventricular Tachycardia",
        "filename": "svt.jpg",
        "rate": "150-250 bpm",
        "features": ["Regular narrow complex tachycardia", "Abrupt onset and termination", "P waves often hidden", "QRS <0.12s"],
        "significance": "Reentrant circuit above ventricles, usually benign but symptomatic",
        "management": "Vagal maneuvers, adenosine 6mg→12mg rapid IV push, consider cardioversion if unstable",
        "tags": ["SVT", "supraventricular tachycardia", "AVNRT", "AVRT", "paroxysmal"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Complete Heart Block (Third Degree AV Block)",
        "filename": "Third-degree-av-block.jpg",
        "rate": "Atrial 60-100, Ventricular 20-60 bpm",
        "features": ["Complete AV dissociation", "No relationship between P and QRS", "Regular P-P and R-R intervals", "Escape rhythm determines QRS width"],
        "significance": "Medical emergency, high risk of sudden cardiac death, requires pacing",
        "management": "Transcutaneous pacing, atropine if narrow QRS escape, permanent pacemaker",
        "tags": ["complete heart block", "third degree AV block", "AV dissociation", "pacemaker indication"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Torsades de Pointes",
        "filename": "torsades-de-pointes.jpg",
        "rate": "200-300 bpm",
        "features": ["Polymorphic VT with twisting QRS axis", "Prolonged QT interval in sinus rhythm", "Characteristic twisting appearance", "Can degenerate to VFib"],
        "significance": "Life-threatening polymorphic VT, associated with long QT syndrome",
        "management": "Magnesium sulfate 2g IV, correct electrolytes, isoproterenol or pacing to increase heart rate",
        "tags": ["torsades de pointes", "polymorphic VT", "long QT syndrome", "magnesium"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Ventricular Fibrillation",
        "filename": "ventricular-fibrillation.jpg",
        "rate": "Chaotic, no organized rate",
        "features": ["Chaotic irregular waveforms", "No identifiable QRS complexes", "No organized electrical activity", "Cardiac arrest rhythm"],
        "significance": "Cardiac arrest rhythm, immediate defibrillation required for survival",
        "management": "Immediate CPR, defibrillation, ACLS protocol, epinephrine, amiodarone",
        "tags": ["ventricular fibrillation", "VFib", "cardiac arrest", "defibrillation", "ACLS"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Ventricular Tachycardia",
        "filename": "ventricular-tachycardia.jpg",
        "rate": ">100 bpm (typically 140-200)",
        "features": ["Wide QRS complexes >0.12s", "Regular or slightly irregular", "AV dissociation", "Capture or fusion beats"],
        "significance": "Life-threatening arrhythmia, can degenerate to VFib, may indicate structural heart disease",
        "management": "If stable: amiodarone or procainamide. If unstable: synchronized cardioversion. Pulseless: defibrillation",
        "tags": ["ventricular tachycardia", "VT", "wide complex tachycardia", "cardioversion"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Wandering Atrial Pacemaker",
        "filename": "wandering-atrial-pacemaker.jpg",
        "rate": "60-100 bpm",
        "features": ["≥3 different P wave morphologies", "Variable PR intervals", "Irregular rhythm", "Normal QRS complexes"],
        "significance": "Benign variant, often seen in athletes with high vagal tone",
        "management": "No treatment required, reassurance, normal variant in athletes",
        "tags": ["wandering atrial pacemaker", "WAP", "multifocal atrial rhythm", "athlete heart"],
        "category": "education",
        "difficulty": "intermediate"
    }
]

def generate_comprehensive_content(ecg):
    """Generate beautifully formatted HTML content with ECG image and key points"""
    
    content = f"""
<div class="ecg-article">

<div class="ecg-image-container" style="background: linear-gradient(135deg, #1e40af 0%, #7e22ce 50%, #be185d 100%); padding: 2rem; border-radius: 1.5rem; margin-bottom: 2rem;">
    <img src="/clean_rhythm_ecg/{ecg['filename']}" alt="{ecg['name']} ECG Example" style="width: 100%; border-radius: 1rem; box-shadow: 0 20px 50px rgba(0,0,0,0.3);" />
    <p style="text-align: center; color: white; margin-top: 1rem; font-size: 0.875rem; font-weight: 600;">
        Figure 1: {ecg['name']} - Characteristic ECG Pattern
    </p>
</div>

<div class="key-points-box" style="background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); border-left: 4px solid #2563eb; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem;">
    <h3 style="color: #1e40af; font-weight: 800; margin-bottom: 1rem; font-size: 1.25rem;">🔑 Key Points at a Glance</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #1e40af;">
        <li><strong>Heart Rate:</strong> {ecg['rate']}</li>
        <li><strong>Primary Significance:</strong> {ecg['significance']}</li>
        <li><strong>Key Management:</strong> {ecg['management']}</li>
        <li><strong>Clinical Category:</strong> {ecg['category'].title()}</li>
    </ul>
</div>

<h2>Overview and Clinical Significance</h2>

<p>{ecg['name']} represents {'a critical' if ecg['difficulty'] == 'advanced' else 'an important'} cardiac rhythm pattern that {'requires immediate recognition and intervention' if ecg['difficulty'] == 'advanced' else 'clinicians must accurately identify'}. {ecg['significance']}</p>

<p>Understanding this rhythm is essential for emergency physicians, cardiologists, intensivists, and all healthcare providers involved in acute cardiac care. Early recognition and appropriate management can significantly impact patient outcomes.</p>

<h2>ECG Characteristics and Recognition</h2>

<div class="diagnostic-criteria" style="background: #f1f5f9; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #0f172a; font-weight: 700; margin-bottom: 1rem;">📊 Diagnostic ECG Criteria</h3>
    <ul style="margin: 0; padding-left: 1.5rem;">
        {"".join([f"<li><strong>{feature}</strong></li>" for feature in ecg['features']])}
    </ul>
</div>

<h3>Systematic ECG Analysis Approach</h3>

<p>When analyzing any ECG, including suspected {ecg['name']}, follow this systematic approach:</p>

<ol>
    <li><strong>Rate:</strong> Calculate the ventricular rate using the 300-150-100-75-60-50 rule or count complexes in 6 seconds × 10</li>
    <li><strong>Rhythm:</strong> Assess regularity by measuring R-R intervals across the strip</li>
    <li><strong>P Waves:</strong> Identify presence, morphology, and relationship to QRS complexes</li>
    <li><strong>PR Interval:</strong> Measure from start of P wave to start of QRS (normal: 0.12-0.20 seconds)</li>
    <li><strong>QRS Complex:</strong> Assess duration (normal: <0.12 seconds), morphology, and amplitude</li>
    <li><strong>ST Segment:</strong> Evaluate for elevation or depression (>1mm is significant)</li>
    <li><strong>T Waves:</strong> Check morphology, direction, and concordance with QRS</li>
    <li><strong>QT Interval:</strong> Measure and correct for heart rate (QTc normal: <450ms men, <460ms women)</li>
</ol>

<h2>Pathophysiology and Mechanisms</h2>

<p>The electrophysiologic mechanism underlying {ecg['name']} involves {
    'disrupted atrial electrical activity' if 'atrial' in ecg['name'].lower() else
    'abnormal ventricular depolarization' if 'ventricular' in ecg['name'].lower() else
    'altered conduction through the AV node' if 'AV block' in ecg['name'] else
    'abnormal cardiac pacemaker function' if 'paced' in ecg['filename'] else
    'disrupted normal cardiac conduction pathways'
}.</p>

<div class="clinical-pearl" style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #92400e; font-weight: 800; margin-bottom: 0.75rem;">💡 Clinical Pearl</h3>
    <p style="color: #92400e; margin: 0;">
        {'Always assess hemodynamic stability before initiating treatment - unstable patients require immediate intervention regardless of the specific arrhythmia' if ecg['difficulty'] == 'advanced' else
         'Correlate ECG findings with clinical presentation - the patient, not the monitor, determines management urgency' if ecg['difficulty'] == 'intermediate' else
         'Most patients with this rhythm are asymptomatic - focus on patient education and appropriate reassurance'}
    </p>
</div>

<h2>Evidence-Based Management</h2>

<h3>Acute Management Strategy</h3>

<p><strong>Primary Treatment Approach:</strong> {ecg['management']}</p>

{'<div class="emergency-protocol" style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-left: 4px solid #dc2626; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;"><h3 style="color: #991b1b; font-weight: 800; margin-bottom: 0.75rem;">🚨 Emergency Protocol</h3><ol style="color: #991b1b; margin: 0; padding-left: 1.5rem;"><li>Assess ABC (Airway, Breathing, Circulation) immediately</li><li>Attach cardiac monitor and obtain 12-lead ECG</li><li>Establish IV access and administer oxygen if SpO₂ <94%</li><li>Prepare for advanced airway management if needed</li><li>Have defibrillator/pacer pads ready at bedside</li><li>Follow ACLS protocols for unstable rhythms</li></ol></div>' if ecg['difficulty'] == 'advanced' else ''}

<h3>Pharmacologic Interventions</h3>

<p>{'Consider antiarrhythmic medications based on rhythm stability and underlying cardiac function. First-line agents include amiodarone or procainamide for stable patients.' if 'ventricular' in ecg['name'].lower() else
    'Rate control with beta-blockers or calcium channel blockers is typically first-line. Consider anticoagulation based on CHA₂DS₂-VASc score.' if 'fibrillation' in ecg['name'].lower() or 'flutter' in ecg['name'].lower() else
    'Vagal maneuvers followed by adenosine 6mg rapid IV push (may repeat with 12mg) are first-line for acute termination.' if 'SVT' in ecg['name'] or 'supraventricular' in ecg['name'].lower() else
    'Most cases require no pharmacologic intervention - focus on treating underlying causes and monitoring for progression.'
}</p>

<h3>Procedural Considerations</h3>

<p>{'Immediate unsynchronized defibrillation is required - do not delay for pharmacologic therapy in pulseless patients.' if 'fibrillation' in ecg['filename'] else
    'Synchronized cardioversion may be necessary for unstable patients - sedate if time permits and patient is conscious.' if 'tachycardia' in ecg['name'].lower() else
    'Temporary transvenous pacing or transcutaneous pacing may be lifesaving - consider early in management.' if 'Third-degree' in ecg['name'] or 'Complete' in ecg['name'] else
    'Catheter ablation offers definitive cure with >90% success rate - consider referral for recurrent symptomatic episodes.' if 'flutter' in ecg['name'].lower() or 'SVT' in ecg['name'] else
    'Permanent pacemaker implantation is indicated for symptomatic bradycardia or high-grade AV block.' if 'paced' in ecg['filename'] else
    'Procedural intervention is rarely required - conservative management is typically appropriate.'
}</p>

<h2>Differential Diagnosis</h2>

<div class="differential-box" style="background: #f8fafc; border: 2px solid #cbd5e1; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #0f172a; font-weight: 700; margin-bottom: 1rem;">🔍 Consider These Mimics</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #334155;">
        {generate_differentials(ecg)}
    </ul>
</div>

<h2>Complications and Risk Stratification</h2>

<p>Potential complications associated with {ecg['name']} include:</p>

<ul>
    {generate_complications(ecg)}
</ul>

<h2>Long-Term Management and Follow-Up</h2>

<p>{'Patients require close cardiology follow-up, with consideration for ICD placement based on risk stratification and ejection fraction.' if ecg['difficulty'] == 'advanced' else
    'Regular outpatient follow-up with cardiology or electrophysiology is recommended to monitor for progression and optimize therapy.' if ecg['difficulty'] == 'intermediate' else
    'Routine follow-up is generally not required unless symptoms develop or underlying cardiac disease is identified.'
}</p>

<div class="follow-up-box" style="background: linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%); border-left: 4px solid #059669; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #065f46; font-weight: 800; margin-bottom: 0.75rem;">📅 Follow-Up Recommendations</h3>
    <ul style="color: #065f46; margin: 0; padding-left: 1.5rem;">
        <li>{'Cardiology/EP follow-up within 1-2 weeks' if ecg['difficulty'] == 'advanced' else 'Cardiology follow-up within 2-4 weeks' if ecg['difficulty'] == 'intermediate' else 'Primary care follow-up as needed'}</li>
        <li>{'Repeat ECG and echocardiogram to assess cardiac function' if ecg['difficulty'] == 'advanced' else 'Consider Holter monitor or event recorder for recurrent symptoms' if ecg['difficulty'] == 'intermediate' else 'Reassurance and education regarding benign nature'}</li>
        <li>{'Medication optimization and compliance monitoring' if 'fibrillation' in ecg['name'].lower() or ecg['difficulty'] == 'advanced' else 'Lifestyle modifications: exercise, stress reduction, avoid triggers'}</li>
        {'<li>Device interrogation every 6-12 months for pacemaker patients</li>' if 'paced' in ecg['filename'] else ''}
    </ul>
</div>

<h2>Common Pitfalls and How to Avoid Them</h2>

<div class="pitfalls-box" style="background: #fef9c3; border: 2px solid #eab308; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #713f12; font-weight: 700; margin-bottom: 1rem;">⚠️ Common Mistakes to Avoid</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #713f12;">
        {generate_pitfalls(ecg)}
    </ul>
</div>

<h2>Patient Education and Counseling</h2>

<p>When counseling patients diagnosed with {ecg['name']}, address the following key points:</p>

<ul>
    <li><strong>Nature of the condition:</strong> Explain the rhythm abnormality in simple terms, avoiding medical jargon</li>
    <li><strong>Prognosis:</strong> {'Emphasize the serious nature but reassure about effective treatment options' if ecg['difficulty'] == 'advanced' else 'Provide realistic expectations about symptom control and quality of life' if ecg['difficulty'] == 'intermediate' else 'Reassure about the benign nature and excellent prognosis'}</li>
    <li><strong>Warning signs:</strong> Educate about symptoms requiring immediate medical attention (chest pain, syncope, severe dyspnea)</li>
    <li><strong>Medication compliance:</strong> {'Critical importance of anticoagulation and rate control medications' if 'fibrillation' in ecg['name'].lower() else 'Importance of taking prescribed medications as directed' if ecg['difficulty'] != 'beginner' else 'Typically no medications required'}</li>
    <li><strong>Lifestyle modifications:</strong> Limit caffeine and alcohol, maintain healthy weight, exercise regularly (as tolerated), stress reduction</li>
    <li><strong>Activity restrictions:</strong> {'Discuss driving restrictions and avoid high-risk activities until stable' if ecg['difficulty'] == 'advanced' else 'Generally no restrictions once symptoms controlled' if ecg['difficulty'] == 'intermediate' else 'No activity restrictions - encourage normal physical activity'}</li>
</ul>

<h2>Evidence-Based Guidelines and References</h2>

<p>Current management of {ecg['name']} is based on evidence from major clinical trials and consensus guidelines from professional societies including:</p>

<ul>
    <li>American Heart Association (AHA) / American College of Cardiology (ACC) Guidelines</li>
    <li>European Society of Cardiology (ESC) Guidelines</li>
    <li>Advanced Cardiac Life Support (ACLS) Protocols</li>
    <li>Heart Rhythm Society (HRS) Expert Consensus Statements</li>
</ul>

<div class="evidence-box" style="background: #ede9fe; border-left: 4px solid #7c3aed; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #5b21b6; font-weight: 800; margin-bottom: 0.75rem;">📚 Level of Evidence</h3>
    <p style="color: #5b21b6; margin: 0;">
        Most recommendations for acute management of {ecg['name']} are supported by Level {'A (multiple randomized trials)' if ecg['difficulty'] == 'advanced' else 'B (limited randomized trials or observational studies)' if ecg['difficulty'] == 'intermediate' else 'C (expert consensus and observational data)'} evidence.
    </p>
</div>

<h2>Summary and Clinical Bottom Line</h2>

<div class="summary-box" style="background: linear-gradient(135deg, #1e40af 0%, #7e22ce 50%, #be185d 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 2rem 0;">
    <h3 style="color: white; font-weight: 800; margin-bottom: 1rem;">📋 Clinical Bottom Line</h3>
    <p style="margin-bottom: 1rem;">{ecg['name']} is characterized by {ecg['features'][0].lower()} and {ecg['features'][1].lower()}. {ecg['significance']}</p>
    <p style="margin-bottom: 1rem;"><strong>Management priority:</strong> {ecg['management']}</p>
    <p style="margin: 0;"><strong>Key takeaway:</strong> {'Immediate recognition and treatment are critical for patient survival' if ecg['difficulty'] == 'advanced' else 'Prompt diagnosis and appropriate therapy optimize outcomes' if ecg['difficulty'] == 'intermediate' else 'Recognition and reassurance are the primary interventions needed'}</p>
</div>

<h2>About the Author</h2>

<div class="author-bio" style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 1.5rem; border-radius: 1rem; margin-top: 2rem;">
    <h3 style="color: #1e40af; font-weight: 800; margin-bottom: 0.5rem;">Dr. Raj K</h3>
    <p style="color: #475569; font-weight: 600; margin-bottom: 1rem;">Emergency Medicine Physician</p>
    <p style="color: #64748b; margin: 0;">Dr. Raj K is a board-certified Emergency Medicine physician with extensive experience in acute cardiac care and ECG interpretation. He is passionate about medical education and bringing evidence-based emergency medicine knowledge to healthcare providers worldwide through E-PulsePoints.</p>
</div>

</div>
"""
    
    return content

def generate_differentials(ecg):
    """Generate differential diagnoses"""
    differentials = {
        "Atrial Fibrillation": "<li>Multifocal atrial tachycardia (MAT) - look for organized P waves</li><li>Atrial flutter with variable block - look for flutter waves</li><li>Frequent PACs - will have visible P waves</li>",
        "Atrial Flutter": "<li>Atrial fibrillation - more irregular with no organized waves</li><li>Atrial tachycardia - distinct P waves, not flutter waves</li><li>AVNRT with 2:1 block - P waves buried in QRS</li>",
        "Ventricular Tachycardia": "<li>SVT with aberrancy - look for fusion beats favoring VT</li><li>Antidromic AVRT (WPW) - pre-excited tachycardia</li><li>Paced rhythm - look for pacing spikes</li>",
        "Ventricular Fibrillation": "<li>Artifact on ECG from patient movement</li><li>Asystole - check all leads and ensure proper lead placement</li><li>Torsades de pointes - may progress to VFib</li>",
        "Complete Heart Block": "<li>Mobitz II with frequent dropped beats</li><li>Severe sinus bradycardia with PVCs</li><li>Junctional rhythm with atrial fibrillation</li>",
        "Torsades de Pointes": "<li>Polymorphic VT (non-torsades) - QT not prolonged</li><li>Artifact mimicking polymorphic VT</li><li>Ventricular fibrillation - more chaotic</li>",
        "Supraventricular Tachycardia": "<li>Sinus tachycardia - gradual onset, visible P waves</li><li>Atrial flutter with 2:1 conduction</li><li>Atrial tachycardia - may see distinct P waves</li>",
        "First Degree AV Block": "<li>Normal PR interval in presence of LVH or cardiomegaly</li><li>Measurement error - ensure proper lead placement</li>",
        "Second Degree AV Block Mobitz Type I": "<li>Mobitz II - no progressive PR prolongation</li><li>Blocked PACs - look for premature P waves</li><li>2:1 AV block - cannot distinguish type without longer strip</li>",
        "Premature Ventricular Contractions": "<li>Premature atrial contractions with aberrancy</li><li>Artifact - confirm with patient examination</li><li>Ventricular paced beats - look for pacing spikes</li>"
    }
    return differentials.get(ecg['name'], "<li>Consider other arrhythmias based on clinical context</li>")

def generate_complications(ecg):
    """Generate potential complications"""
    complications = {
        "Atrial Fibrillation": "<li>Thromboembolic stroke (5x increased risk without anticoagulation)</li><li>Heart failure from tachycardia-induced cardiomyopathy</li><li>Hemodynamic compromise from loss of atrial kick</li>",
        "Ventricular Tachycardia": "<li>Degeneration to ventricular fibrillation and cardiac arrest</li><li>Cardiogenic shock from reduced cardiac output</li><li>Myocardial ischemia from increased oxygen demand</li>",
        "Ventricular Fibrillation": "<li>Cardiac arrest and sudden cardiac death</li><li>Hypoxic brain injury if resuscitation delayed</li><li>Post-cardiac arrest syndrome</li>",
        "Complete Heart Block": "<li>Syncope and falls with injury</li><li>Sudden cardiac death from asystole</li><li>Heart failure from low cardiac output</li>",
        "Torsades de Pointes": "<li>Progression to ventricular fibrillation</li><li>Recurrent syncope and sudden death</li><li>Hypoxic encephalopathy if prolonged</li>",
        "Atrial Flutter": "<li>Thromboembolic events (stroke risk similar to AFib)</li><li>Heart failure from rapid ventricular rates</li><li>Tachycardia-induced cardiomyopathy</li>",
        "Supraventricular Tachycardia": "<li>Syncope from reduced cerebral perfusion</li><li>Myocardial ischemia in patients with CAD</li><li>Rarely, tachycardia-induced cardiomyopathy with prolonged episodes</li>"
    }
    return complications.get(ecg['name'], "<li>Progression to more severe conduction abnormalities</li><li>Symptoms interfering with quality of life</li>")

def generate_pitfalls(ecg):
    """Generate common clinical pitfalls"""
    pitfalls = {
        "Atrial Fibrillation": "<li>Failing to anticoagulate based on CHA₂DS₂-VASc score - stroke prevention is paramount</li><li>Over-aggressive rate control causing bradycardia and fatigue</li><li>Missing underlying reversible causes (hyperthyroidism, alcohol, sleep apnea)</li><li>Cardioverting without adequate anticoagulation (minimum 3 weeks or TEE to exclude thrombus)</li>",
        "Ventricular Tachycardia": "<li>Misdiagnosing VT as SVT with aberrancy - use Brugada criteria, when in doubt treat as VT</li><li>Using AV nodal blockers (adenosine, verapamil) for wide complex tachycardia - can cause decompensation</li><li>Delaying cardioversion in unstable patients - hemodynamics determine urgency</li><li>Missing underlying structural heart disease requiring ICD</li>",
        "Ventricular Fibrillation": "<li>Delaying defibrillation to establish IV access or give medications - shock first</li><li>Confusing with artifact - check multiple leads and pulse</li><li>Inadequate CPR quality between shocks - push hard and fast</li><li>Failing to search for reversible causes (H's and T's)</li>",
        "Complete Heart Block": "<li>Using atropine for wide complex escape rhythms - ineffective and may worsen block</li><li>Delaying pacing in symptomatic patients - transcutaneous pacing buys time</li><li>Missing acute MI as precipitant - obtain serial troponins</li><li>Discharging without permanent pacemaker placement</li>",
        "Supraventricular Tachycardia": "<li>Giving adenosine without warning patient about impending doom feeling</li><li>Slow adenosine push - must be rapid IV push followed by saline flush</li><li>Cardioverting stable patients before trying vagal maneuvers and adenosine</li><li>Missing WPW syndrome - avoid AV nodal blockers in pre-excited AF</li>",
        "Atrial Flutter": "<li>Mistaking 2:1 flutter for sinus tachycardia - use carotid massage or adenosine to reveal flutter waves</li><li>Cardioverting without anticoagulation - same stroke risk as AFib</li><li>Missing opportunity for catheter ablation - highly effective cure</li><li>Under-dosing rate control medications</li>"
    }
    return pitfalls.get(ecg['name'], "<li>Failing to correlate ECG with clinical presentation</li><li>Missing underlying reversible causes</li><li>Not consulting cardiology when uncertain</li>")

def generate_all_articles():
    """Generate all articles as JSON with rich snippets for SEO"""
    articles = []
    
    for ecg in ecg_conditions:
        article = {
            "title": f"{ecg['name']}: ECG Recognition and Emergency Management",
            "excerpt": f"Comprehensive guide to recognizing and managing {ecg['name']}. Learn ECG criteria, clinical significance, evidence-based treatment, and common pitfalls. Written by Dr. Raj K, Emergency Medicine Physician.",
            "content": generate_comprehensive_content(ecg),
            "imageUrl": f"/clean_rhythm_ecg/{ecg['filename']}",
            "category": ecg['category'],
            "tags": ecg['tags'],
            "author": {
                "name": "Dr. Raj K",
                "title": "Emergency Medicine Physician",
                "avatar": "https://ui-avatars.com/api/?name=Dr+Raj+K&background=dc2626&color=fff&size=200&bold=true"
            },
            "publishedAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat(),
            "views": 0,
            "featured": ecg['name'] in ["Atrial Fibrillation", "Ventricular Tachycardia", "Ventricular Fibrillation"],
            # Rich Snippet Data for Google Search Console
            "schema": {
                "@context": "https://schema.org",
                "@type": "MedicalWebPage",
                "name": f"{ecg['name']}: ECG Recognition and Emergency Management",
                "description": f"Comprehensive guide to recognizing and managing {ecg['name']}. Learn ECG criteria, clinical significance, evidence-based treatment, and common pitfalls.",
                "author": {
                    "@type": "Person",
                    "name": "Dr. Raj K",
                    "jobTitle": "Emergency Medicine Physician",
                    "description": "Board-certified Emergency Medicine Physician"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "E-PulsePoints",
                    "url": "https://ecgkid.com"
                },
                "datePublished": datetime.now().isoformat(),
                "dateModified": datetime.now().isoformat(),
                "image": f"https://ecgkid.com/clean_rhythm_ecg/{ecg['filename']}",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": f"https://ecgkid.com/blog/{ecg['name'].lower().replace(' ', '-')}"
                },
                "about": {
                    "@type": "MedicalCondition",
                    "name": ecg['name'],
                    "associatedAnatomy": {
                        "@type": "AnatomicalStructure",
                        "name": "Heart"
                    }
                },
                "medicalAudience": [
                    {
                        "@type": "MedicalAudience",
                        "audienceType": "Emergency Medicine Physicians"
                    },
                    {
                        "@type": "MedicalAudience",
                        "audienceType": "Cardiologists"
                    },
                    {
                        "@type": "MedicalAudience",
                        "audienceType": "Medical Students"
                    }
                ],
                "keywords": ", ".join(ecg['tags'])
            },
            # SEO metadata
            "seo": {
                "metaTitle": f"{ecg['name']}: Complete ECG Guide | E-PulsePoints",
                "metaDescription": f"Expert guide to {ecg['name']} by Dr. Raj K. ECG criteria, management, differential diagnosis, and clinical pearls. Essential reading for emergency medicine.",
                "keywords": ecg['tags'],
                "canonicalUrl": f"https://ecgkid.com/blog/{ecg['name'].lower().replace(' ', '-')}",
                "ogTitle": f"{ecg['name']}: ECG Recognition & Management",
                "ogDescription": f"Comprehensive emergency medicine guide by Dr. Raj K. Learn to recognize and manage {ecg['name']} with confidence.",
                "ogImage": f"https://ecgkid.com/clean_rhythm_ecg/{ecg['filename']}",
                "twitterCard": "summary_large_image",
                "twitterTitle": f"{ecg['name']} ECG Guide",
                "twitterDescription": f"Emergency medicine guide by Dr. Raj K: {ecg['significance'][:100]}...",
                "twitterImage": f"https://ecgkid.com/clean_rhythm_ecg/{ecg['filename']}"
            }
        }
        articles.append(article)
    
    return articles

if __name__ == "__main__":
    articles = generate_all_articles()
    
    output_file = "ecg-blog-articles-v2.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Generated {len(articles)} comprehensive ECG blog articles with enhanced formatting")
    print(f"✓ Saved to: {output_file}")
    print(f"\nAll articles authored by Dr. Raj K, Emergency Medicine Physician")
    print(f"\nEach article includes:")
    print(f"  - Rich Snippets (Schema.org MedicalWebPage)")
    print(f"  - Complete SEO metadata (meta tags, Open Graph, Twitter Cards)")
    print(f"  - ECG image prominently displayed")
    print(f"  - Key Points summary box")
    print(f"  - Clinical pearls and emergency protocols")
    print(f"  - Color-coded teaching boxes")
    print(f"  - Comprehensive differential diagnoses")
    print(f"  - Evidence-based management strategies")
    print(f"  - Common pitfalls to avoid")
    print(f"  - Patient education guidance")
    print(f"\nReady for Firebase 'blog' collection upload!")
    print(f"\nCategories: Clinical, Education, Technology")
    print(f"Tags: {len(set([tag for article in articles for tag in article['tags']]))} unique tags for filtering")
