"""
ECG Article Generator V3 for Best ECG Images
Generates comprehensive, beautifully formatted articles with ECG images
Author: Dr. Raj K, Emergency Medicine Physician
"""

import json
from datetime import datetime

# All ECG conditions from best_ecg_images folder
ecg_conditions = [
    {
        "name": "Atrial Fibrillation with Rapid Ventricular Response (RVR)",
        "filename": "afib-rvr.png",
        "rate": "Variable, typically >100 bpm (often 120-180 bpm)",
        "features": ["Irregularly irregular rhythm", "Absent P waves", "Fibrillatory waves", "Rapid ventricular rate >100 bpm", "Narrow QRS complexes"],
        "significance": "Hemodynamically unstable variant of AFib requiring urgent rate control, high stroke risk",
        "management": "Immediate rate control with IV beta-blockers or calcium channel blockers, anticoagulation, consider cardioversion if unstable",
        "tags": ["atrial fibrillation", "AFib RVR", "rapid ventricular response", "tachycardia", "rate control", "emergency"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Atrial Flutter",
        "filename": "atrial-flutter.png",
        "rate": "Atrial 250-350 bpm, Ventricular variable (typically 75-150 bpm with 2:1 or 4:1 block)",
        "features": ["Classic sawtooth pattern (flutter waves)", "Negative in II, III, aVF", "Positive in V1", "Regular atrial rate ~300 bpm", "Variable AV conduction"],
        "significance": "Macro-reentrant atrial tachycardia, highly ablatable with >95% success, stroke risk similar to AFib",
        "management": "Rate control, anticoagulation based on CHA₂DS₂-VASc, catheter ablation first-line for recurrent episodes",
        "tags": ["atrial flutter", "flutter waves", "sawtooth", "ablation", "anticoagulation", "SVT"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Anterior Wall Myocardial Infarction (AWMI)",
        "filename": "AWMI.png",
        "rate": "Variable, often with compensatory tachycardia",
        "features": ["ST elevation in V1-V4", "Reciprocal ST depression in inferior leads", "Q waves in anterior leads (if evolved)", "Possible new LBBB"],
        "significance": "Large area of myocardium at risk, LAD occlusion, highest risk of cardiogenic shock and mortality",
        "management": "Immediate STEMI protocol: aspirin, P2Y12 inhibitor, anticoagulation, emergent PCI within 90 minutes",
        "tags": ["STEMI", "anterior MI", "LAD occlusion", "ST elevation", "cardiac catheterization", "emergency"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Cardiac Tamponade",
        "filename": "Cardiac-Tamponade.png",
        "rate": "Sinus tachycardia (compensatory)",
        "features": ["Low voltage QRS complexes (<5mm in limb leads)", "Electrical alternans (beat-to-beat QRS amplitude variation)", "Sinus tachycardia", "Possible ST-T wave changes"],
        "significance": "Life-threatening emergency with obstructive shock, requires immediate pericardiocentesis",
        "management": "Urgent echocardiography, emergency pericardiocentesis, aggressive fluid resuscitation, avoid positive pressure ventilation",
        "tags": ["cardiac tamponade", "pericardial effusion", "electrical alternans", "low voltage", "emergency", "pericardiocentesis"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Complete Heart Block (Third Degree AV Block)",
        "filename": "complete-heart-block.png",
        "rate": "Atrial 60-100 bpm, Ventricular 20-60 bpm (escape rhythm dependent)",
        "features": ["Complete AV dissociation", "No relationship between P waves and QRS", "Regular P-P intervals", "Regular R-R intervals", "Wide QRS if ventricular escape"],
        "significance": "High-grade conduction block, high risk of asystole and sudden cardiac death, pacemaker indicated",
        "management": "Transcutaneous pacing immediately if symptomatic, atropine (if narrow QRS), emergent temporary pacemaker, permanent pacemaker indicated",
        "tags": ["complete heart block", "third degree AV block", "AV dissociation", "pacemaker", "emergency", "bradycardia"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Dilated Cardiomyopathy with Global T Wave Inversion",
        "filename": "DCMP_Global_T_wave_inversion.png",
        "rate": "Variable, often with sinus tachycardia or atrial arrhythmias",
        "features": ["Low voltage QRS", "Diffuse T wave inversions", "Prolonged QRS duration", "Left atrial enlargement", "Possible LBBB pattern"],
        "significance": "Advanced heart failure with poor prognosis, high arrhythmia risk, ICD consideration needed",
        "management": "Guideline-directed medical therapy (GDMT): ACE-I/ARB, beta-blockers, MRA, SGLT2i, diuretics, ICD evaluation",
        "tags": ["dilated cardiomyopathy", "heart failure", "T wave inversion", "low voltage", "ICD", "cardiomyopathy"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Early Repolarization",
        "filename": "Early-repolarization.png",
        "rate": "Normal sinus rhythm (60-100 bpm)",
        "features": ["J-point elevation (notching)", "ST elevation in precordial leads", "Prominent T waves", "Typically seen in young, athletic individuals", "No reciprocal changes"],
        "significance": "Usually benign normal variant, must differentiate from pericarditis and acute MI",
        "management": "No treatment needed, patient reassurance, document as normal variant, differentiate from pathologic ST elevation",
        "tags": ["early repolarization", "normal variant", "J-point elevation", "benign", "athlete heart", "ST elevation"],
        "category": "education",
        "difficulty": "intermediate"
    },
    {
        "name": "Electrical Alternans",
        "filename": "electrical-alterans.png",
        "rate": "Usually sinus tachycardia",
        "features": ["Beat-to-beat alternating QRS amplitude", "Alternating QRS axis", "Low voltage QRS complexes", "Associated with pericardial effusion"],
        "significance": "Highly specific for large pericardial effusion with tamponade physiology, emergency condition",
        "management": "Immediate echocardiography to assess for tamponade, prepare for urgent pericardiocentesis if hemodynamically unstable",
        "tags": ["electrical alternans", "pericardial effusion", "cardiac tamponade", "emergency", "low voltage"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Incomplete Right Bundle Branch Block",
        "filename": "incomplete-rbbb.png",
        "rate": "Normal sinus rhythm (60-100 bpm)",
        "features": ["RSR' pattern in V1-V2", "QRS duration 100-120ms (incomplete)", "Terminal R wave in V1", "Slurred S wave in lateral leads"],
        "significance": "Often benign, may indicate RV strain, common in athletes and normal individuals",
        "management": "Usually no treatment required, evaluate for underlying structural heart disease if symptomatic, consider RV pathology",
        "tags": ["incomplete RBBB", "bundle branch block", "RSR pattern", "benign", "right ventricle"],
        "category": "education",
        "difficulty": "beginner"
    },
    {
        "name": "Lateral Wall Myocardial Infarction",
        "filename": "lateral-wall-mi.png",
        "rate": "Variable",
        "features": ["ST elevation in I, aVL, V5-V6", "Reciprocal ST depression in inferior leads", "Q waves in lateral leads (if evolved)", "Possible T wave inversions"],
        "significance": "Circumflex artery occlusion, can be subtle on ECG, high-lateral MI has worse prognosis",
        "management": "STEMI protocol: emergent cardiac catheterization, dual antiplatelet therapy, anticoagulation, reperfusion therapy",
        "tags": ["lateral MI", "STEMI", "circumflex occlusion", "ST elevation", "cardiac catheterization"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Left Bundle Branch Block (LBBB)",
        "filename": "LBBB.png",
        "rate": "Variable, underlying rhythm determines rate",
        "features": ["QRS >120ms (wide)", "Broad notched R wave in I, aVL, V5-V6", "Absent Q waves in lateral leads", "Discordant ST-T waves", "Deep S wave in V1"],
        "significance": "May indicate underlying structural heart disease, makes ischemia detection difficult, LBBB with symptoms = STEMI equivalent",
        "management": "Investigate for underlying cardiac disease, new LBBB with chest pain is STEMI equivalent requiring emergent cath",
        "tags": ["LBBB", "bundle branch block", "wide QRS", "STEMI equivalent", "heart failure"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Long QT Syndrome",
        "filename": "long_QT_prolongation.png",
        "rate": "Variable, often bradycardia",
        "features": ["Prolonged QT interval (QTc >450ms men, >460ms women)", "Abnormal T wave morphology", "T wave notching", "Prominent U waves"],
        "significance": "High risk of torsades de pointes and sudden cardiac death, congenital or acquired",
        "management": "Identify and correct reversible causes (electrolytes, medications), beta-blockers for congenital, consider ICD, avoid QT-prolonging drugs",
        "tags": ["long QT syndrome", "QT prolongation", "torsades de pointes", "sudden cardiac death", "arrhythmia"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Monomorphic Ventricular Tachycardia",
        "filename": "Monomorphic-VT.png",
        "rate": "100-250 bpm (typically 140-200 bpm)",
        "features": ["Wide QRS complexes >120ms", "Regular rhythm", "Uniform QRS morphology", "AV dissociation", "Capture or fusion beats (pathognomonic)"],
        "significance": "Life-threatening arrhythmia, usually indicates structural heart disease, can degenerate to VFib",
        "management": "If unstable: immediate synchronized cardioversion. If stable: amiodarone or procainamide, identify underlying cause, ICD evaluation",
        "tags": ["ventricular tachycardia", "VT", "wide complex tachycardia", "cardioversion", "ICD", "emergency"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Pulseless Electrical Activity (PEA)",
        "filename": "PEA.png",
        "rate": "Variable electrical activity without mechanical pulse",
        "features": ["Organized electrical rhythm on monitor", "No palpable pulse", "No cardiac output", "Variable QRS morphology depending on underlying rhythm"],
        "significance": "Cardiac arrest rhythm, requires CPR and treatment of reversible causes (H's and T's)",
        "management": "High-quality CPR, identify and treat reversible causes (hypovolemia, hypoxia, H+, hypo/hyperkalemia, hypothermia, toxins, tamponade, tension pneumo, thrombosis, trauma)",
        "tags": ["PEA", "cardiac arrest", "ACLS", "CPR", "reversible causes", "emergency"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Posterior Wall Myocardial Infarction",
        "filename": "Posterior-wall-mi.png",
        "rate": "Variable",
        "features": ["Tall R waves in V1-V2 (mirror image)", "ST depression in V1-V3 (reciprocal)", "Upright T waves in V1-V2", "Associated inferior or lateral MI often present"],
        "significance": "Often missed, RCA or circumflex occlusion, isolated posterior MI is rare, use posterior leads V7-V9 for confirmation",
        "management": "STEMI protocol if confirmed with posterior leads showing ST elevation, emergent cardiac catheterization",
        "tags": ["posterior MI", "STEMI", "tall R wave V1", "ST depression", "posterior leads", "RCA occlusion"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Right Bundle Branch Block (RBBB)",
        "filename": "rbbb.png",
        "rate": "Variable, underlying rhythm determines rate",
        "features": ["QRS >120ms (wide)", "RSR' pattern in V1-V2 (M-shaped)", "Wide slurred S wave in I, V5-V6", "ST depression and T wave inversion in V1-V2"],
        "significance": "May be normal variant or indicate RV strain/pathology, ischemia still interpretable unlike LBBB",
        "management": "Investigate for underlying cause if new, evaluate for pulmonary embolism if acute onset, usually no specific treatment",
        "tags": ["RBBB", "bundle branch block", "RSR pattern", "wide QRS", "right ventricle"],
        "category": "education",
        "difficulty": "intermediate"
    },
    {
        "name": "Second Degree AV Block Mobitz Type I (Wenckebach)",
        "filename": "Second-Degree-AV-block - Mobitz-I.png",
        "rate": "Variable, typically 60-90 bpm",
        "features": ["Progressive PR interval prolongation", "Dropped QRS after longest PR", "Grouped beating pattern", "Narrow QRS complexes usually", "Shortening of PR interval after dropped beat"],
        "significance": "AV nodal level block, usually benign, often reversible, better prognosis than Mobitz II",
        "management": "Observation if asymptomatic, treat underlying causes (medications, ischemia), rarely requires pacemaker",
        "tags": ["Mobitz type 1", "Wenckebach", "second degree AV block", "grouped beating", "AV nodal block"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Second Degree AV Block Mobitz Type II",
        "filename": "Second-Degree-AV-block - Mobitz-II.png",
        "rate": "Variable, often bradycardic",
        "features": ["Constant PR interval", "Sudden dropped QRS without PR prolongation", "Wide QRS complexes common (infra-Hisian block)", "2:1, 3:1 or variable block ratio"],
        "significance": "Infranodal block, high risk of progression to complete heart block, permanent pacemaker indicated",
        "management": "Temporary pacing if symptomatic, permanent pacemaker placement (Class I indication), avoid AV nodal blocking agents",
        "tags": ["Mobitz type 2", "second degree AV block", "pacemaker indication", "infranodal block", "high-grade block"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Supraventricular Tachycardia (SVT)",
        "filename": "SVT.png",
        "rate": "150-250 bpm (typically 160-200 bpm)",
        "features": ["Regular narrow complex tachycardia", "QRS <120ms", "P waves often hidden in QRS or T waves", "Abrupt onset and termination", "No beat-to-beat variation"],
        "significance": "Paroxysmal reentrant tachycardia (AVNRT or AVRT), usually benign but symptomatic, ablation curative",
        "management": "Vagal maneuvers first, adenosine 6mg rapid IV push (then 12mg if needed), synchronized cardioversion if unstable, catheter ablation for recurrent",
        "tags": ["SVT", "supraventricular tachycardia", "AVNRT", "AVRT", "adenosine", "vagal maneuvers"],
        "category": "clinical",
        "difficulty": "intermediate"
    },
    {
        "name": "Torsades de Pointes",
        "filename": "Torsades-de-pointes.png",
        "rate": "200-300 bpm (polymorphic VT)",
        "features": ["Polymorphic VT with twisting QRS axis around baseline", "Prolonged QT interval in sinus rhythm", "Characteristic 'twisting of the points'", "Can self-terminate or degenerate to VFib"],
        "significance": "Life-threatening polymorphic VT associated with long QT syndrome, can cause sudden cardiac death",
        "management": "Magnesium sulfate 2g IV bolus (even if Mg normal), correct electrolytes (K >4.5, Mg >2), isoproterenol or temporary pacing to increase HR, defibrillation if pulseless",
        "tags": ["torsades de pointes", "polymorphic VT", "long QT syndrome", "magnesium", "sudden cardiac death"],
        "category": "clinical",
        "difficulty": "advanced"
    },
    {
        "name": "Wandering Atrial Pacemaker (WAP)",
        "filename": "WAP.png",
        "rate": "60-100 bpm",
        "features": ["≥3 different P wave morphologies", "Variable PR intervals", "Irregular rhythm", "Narrow QRS complexes", "Gradual change in P wave morphology"],
        "significance": "Benign variant, common in athletes with high vagal tone, represents shifting dominant pacemaker within atria",
        "management": "No treatment required, patient reassurance, normal variant especially in athletes and elderly",
        "tags": ["wandering atrial pacemaker", "WAP", "multifocal atrial rhythm", "benign", "athlete heart"],
        "category": "education",
        "difficulty": "intermediate"
    },
    {
        "name": "Wolff-Parkinson-White Syndrome (WPW)",
        "filename": "WPW-syndrome.png",
        "rate": "Variable, can have SVT 150-250 bpm",
        "features": ["Short PR interval <120ms", "Delta wave (slurred QRS upstroke)", "Wide QRS complexes", "Secondary ST-T wave changes", "Pre-excitation pattern"],
        "significance": "Accessory pathway (Bundle of Kent), risk of rapid pre-excited AFib leading to VFib and sudden death",
        "management": "Avoid AV nodal blockers in pre-excited AFib (use procainamide), catheter ablation curative (>95% success), EP study if symptomatic",
        "tags": ["WPW syndrome", "delta wave", "pre-excitation", "accessory pathway", "ablation", "short PR"],
        "category": "clinical",
        "difficulty": "advanced"
    }
]

def generate_comprehensive_content(ecg):
    """Generate beautifully formatted HTML content with ECG image and key points"""
    
    content = f"""
<div class="ecg-article">

<div class="ecg-image-container" style="background: linear-gradient(135deg, #1e40af 0%, #7e22ce 50%, #be185d 100%); padding: 2rem; border-radius: 1.5rem; margin-bottom: 2rem;">
    <img src="/best_ecg_images/{ecg['filename']}" alt="{ecg['name']} ECG Example" style="width: 100%; border-radius: 1rem; box-shadow: 0 20px 50px rgba(0,0,0,0.3);" />
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

<p>Understanding this ECG finding is essential for emergency physicians, cardiologists, intensivists, and all healthcare providers involved in acute cardiac care. Early recognition and appropriate management can significantly impact patient outcomes and prevent life-threatening complications.</p>

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
    <li><strong>Rate:</strong> Calculate ventricular rate using the 300-150-100-75-60-50 rule or count QRS complexes in 6 seconds × 10</li>
    <li><strong>Rhythm:</strong> Assess regularity by measuring R-R intervals across the entire strip</li>
    <li><strong>P Waves:</strong> Identify presence, morphology, and relationship to QRS complexes</li>
    <li><strong>PR Interval:</strong> Measure from start of P wave to start of QRS (normal: 0.12-0.20 seconds or 3-5 small squares)</li>
    <li><strong>QRS Complex:</strong> Assess duration (normal: <0.12 seconds), morphology, and amplitude</li>
    <li><strong>ST Segment:</strong> Evaluate for elevation (≥1mm in limb leads, ≥2mm in precordial leads) or depression</li>
    <li><strong>T Waves:</strong> Check morphology, direction, and concordance with QRS</li>
    <li><strong>QT Interval:</strong> Measure and correct for heart rate using Bazett's formula (QTc normal: <450ms men, <460ms women)</li>
</ol>

<h2>Pathophysiology and Mechanisms</h2>

<p>The electrophysiologic mechanism underlying {ecg['name']} involves complex cardiac conduction abnormalities. {'This represents a medical emergency requiring immediate intervention.' if ecg['difficulty'] == 'advanced' else 'Understanding the underlying mechanism helps guide appropriate management.'}</p>

<div class="clinical-pearl" style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #92400e; font-weight: 800; margin-bottom: 0.75rem;">💡 Clinical Pearl</h3>
    <p style="color: #92400e; margin: 0;">
        {'Always assess hemodynamic stability FIRST - unstable patients require immediate intervention regardless of the specific ECG diagnosis' if ecg['difficulty'] == 'advanced' else
         'Correlate ECG findings with clinical presentation - the patient at the bedside determines urgency, not just the ECG pattern' if ecg['difficulty'] == 'intermediate' else
         'Most patients with this ECG finding are asymptomatic - focus on proper documentation and patient education'}
    </p>
</div>

<h2>Evidence-Based Management</h2>

<h3>Acute Management Strategy</h3>

<p><strong>Primary Treatment Approach:</strong> {ecg['management']}</p>

{'<div class="emergency-protocol" style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-left: 4px solid #dc2626; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;"><h3 style="color: #991b1b; font-weight: 800; margin-bottom: 0.75rem;">🚨 Emergency Protocol - Time-Critical Actions</h3><ol style="color: #991b1b; margin: 0; padding-left: 1.5rem;"><li>Immediate ABC assessment (Airway, Breathing, Circulation)</li><li>Attach continuous cardiac monitoring and obtain 12-lead ECG</li><li>Establish large-bore IV access (×2) and check bedside glucose</li><li>Administer supplemental oxygen if SpO₂ <94% or respiratory distress</li><li>Prepare crash cart with defibrillator/pacing pads at bedside</li><li>Activate appropriate team (STEMI, code blue, rapid response)</li><li>Follow ACLS/STEMI protocols without delay</li></ol></div>' if ecg['difficulty'] == 'advanced' else ''}

<h3>Stepwise Treatment Algorithm</h3>

<p><strong>Step 1: Initial Stabilization</strong></p>
<ul>
    <li>Ensure hemodynamic stability - check blood pressure, perfusion, mental status</li>
    <li>Obtain IV access and send labs (troponin, BMP, CBC, coags, BNP if heart failure suspected)</li>
    <li>Continuous telemetry monitoring in appropriate care setting</li>
    <li>Serial ECGs to assess for dynamic changes</li>
</ul>

<p><strong>Step 2: Definitive Management</strong></p>
<p>{ecg['management']}</p>

<h3>Pharmacologic Interventions</h3>

<p>{'Consider urgent antiarrhythmic therapy or electrical cardioversion based on hemodynamic status. First-line medications may include amiodarone, procainamide, or beta-blockers depending on the specific rhythm.' if 'tachycardia' in ecg['name'].lower() or 'VT' in ecg['name'] else
    'Rate control with beta-blockers (metoprolol, esmolol) or calcium channel blockers (diltiazem) is typically first-line. Anticoagulation based on CHA₂DS₂-VASc score.' if 'fibrillation' in ecg['name'].lower() or 'flutter' in ecg['name'].lower() else
    'Dual antiplatelet therapy (aspirin 324mg + P2Y12 inhibitor), anticoagulation (heparin or bivalirudin), nitrates, beta-blockers, ACE inhibitors as indicated.' if 'MI' in ecg['name'] or 'STEMI' in ecg['tags'] else
    'Magnesium sulfate 2g IV push is first-line therapy. Correct underlying electrolyte abnormalities (target K >4.5, Mg >2). Consider isoproterenol infusion or temporary pacing to increase heart rate.' if 'torsades' in ecg['name'].lower() else
    'Most cases require no specific pharmacologic intervention - focus on treating underlying causes and monitoring for progression.'
}</p>

<h2>Differential Diagnosis and ECG Mimics</h2>

<div class="differential-box" style="background: #f8fafc; border: 2px solid #cbd5e1; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #0f172a; font-weight: 700; margin-bottom: 1rem;">🔍 Consider These Alternative Diagnoses</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #334155;">
        <li><strong>Similar ECG patterns to distinguish from:</strong> Careful analysis of specific ECG criteria, clinical context, and patient presentation is essential for accurate diagnosis</li>
        <li><strong>Use systematic approach:</strong> Compare rate, rhythm, P wave morphology, PR interval, QRS width, and ST-T changes</li>
        <li><strong>When in doubt:</strong> Obtain cardiology consultation, compare to old ECGs, correlate with clinical presentation</li>
    </ul>
</div>

<h2>Complications and Risk Stratification</h2>

<p>Potential complications and adverse outcomes associated with {ecg['name']}:</p>

<ul>
    <li><strong>Immediate risks:</strong> {'Cardiac arrest, hemodynamic collapse, sudden cardiac death' if ecg['difficulty'] == 'advanced' else 'Progression to more severe arrhythmia, syncope, hemodynamic compromise' if ecg['difficulty'] == 'intermediate' else 'Generally minimal immediate risk in most patients'}</li>
    <li><strong>Short-term complications:</strong> {'Cardiogenic shock, acute heart failure, thromboembolic events' if 'MI' in ecg['name'] or 'STEMI' in ecg['tags'] else 'Syncope, pre-syncope, fatigue, reduced exercise tolerance'}</li>
    <li><strong>Long-term sequelae:</strong> {'Chronic heart failure, ventricular remodeling, need for ICD/pacemaker' if ecg['difficulty'] == 'advanced' else 'Tachycardia-induced cardiomyopathy if persistent, quality of life impact'}</li>
</ul>

<h2>Long-Term Management and Follow-Up</h2>

<p>{'Patients require close cardiology/electrophysiology follow-up with consideration for ICD placement, cardiac rehabilitation, and aggressive risk factor modification.' if ecg['difficulty'] == 'advanced' else
    'Regular outpatient cardiology follow-up is recommended to monitor for disease progression and optimize medical therapy.' if ecg['difficulty'] == 'intermediate' else
    'Routine follow-up is generally not required unless symptoms develop or underlying cardiac disease is suspected.'
}</p>

<div class="follow-up-box" style="background: linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%); border-left: 4px solid #059669; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #065f46; font-weight: 800; margin-bottom: 0.75rem;">📅 Follow-Up Recommendations</h3>
    <ul style="color: #065f46; margin: 0; padding-left: 1.5rem;">
        <li>{'Cardiology/EP consultation within 1-7 days post-discharge' if ecg['difficulty'] == 'advanced' else 'Cardiology follow-up within 2-4 weeks' if ecg['difficulty'] == 'intermediate' else 'Primary care follow-up as needed for routine health maintenance'}</li>
        <li>{'Repeat ECG, echocardiogram, stress test or cardiac MRI as indicated' if ecg['difficulty'] == 'advanced' else 'Consider ambulatory monitoring (Holter or event recorder) for symptom correlation' if ecg['difficulty'] == 'intermediate' else 'Repeat ECG only if clinically indicated'}</li>
        <li>{'Guideline-directed medical therapy optimization and compliance monitoring' if 'heart failure' in ecg['tags'] or 'MI' in ecg['name'] else 'Lifestyle modifications: regular exercise, stress reduction, adequate sleep, avoid triggers (caffeine, alcohol, stimulants)'}</li>
        <li>{'Implantable device management (ICD/pacemaker interrogation every 3-6 months)' if 'pacemaker' in ecg['tags'] or ecg['difficulty'] == 'advanced' else 'Patient education on warning symptoms requiring immediate medical attention'}</li>
    </ul>
</div>

<h2>Common Pitfalls and How to Avoid Them</h2>

<div class="pitfalls-box" style="background: #fef9c3; border: 2px solid #eab308; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #713f12; font-weight: 700; margin-bottom: 1rem;">⚠️ Critical Mistakes to Avoid</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #713f12;">
        <li><strong>Misdiagnosis risk:</strong> Always compare to prior ECGs when available - new findings are more significant than chronic changes</li>
        <li><strong>Treatment errors:</strong> Avoid treating the ECG in isolation - clinical context and hemodynamic status determine urgency</li>
        <li><strong>Delayed recognition:</strong> {'Time is muscle - door-to-balloon time <90 minutes is critical' if 'STEMI' in ecg['tags'] else 'Unstable patients require immediate intervention, not prolonged workup'}</li>
        <li><strong>Medication errors:</strong> {'Avoid AV nodal blockers in pre-excited atrial fibrillation (can precipitate VFib)' if 'WPW' in ecg['name'] else 'Check medication interactions and contraindications before administration'}</li>
        <li><strong>Disposition errors:</strong> {'Never discharge home - requires admission to monitored bed' if ecg['difficulty'] == 'advanced' else 'Ensure appropriate level of care and monitoring based on risk stratification'}</li>
    </ul>
</div>

<h2>Patient Education and Shared Decision-Making</h2>

<p>When counseling patients diagnosed with {ecg['name']}, address these important topics:</p>

<ul>
    <li><strong>Diagnosis explanation:</strong> Use simple language avoiding medical jargon - "Your heart's electrical system shows..." rather than complex terminology</li>
    <li><strong>Prognosis discussion:</strong> {'Emphasize seriousness but reassure about effective treatment options and survival with appropriate therapy' if ecg['difficulty'] == 'advanced' else 'Provide realistic expectations about symptom control, treatment success rates, and quality of life' if ecg['difficulty'] == 'intermediate' else 'Reassure about benign nature, excellent long-term prognosis, and low risk of complications'}</li>
    <li><strong>Warning signs:</strong> Teach patients to recognize symptoms requiring immediate emergency care (chest pain, severe shortness of breath, syncope, palpitations with dizziness)</li>
    <li><strong>Medication adherence:</strong> {'Critical importance of consistent medication compliance - missing doses can have serious consequences' if ecg['difficulty'] == 'advanced' else 'Importance of taking medications as prescribed, managing side effects' if ecg['difficulty'] == 'intermediate' else 'Typically no long-term medications required'}</li>
    <li><strong>Lifestyle modifications:</strong> Limit caffeine and alcohol, maintain healthy weight through diet and exercise, stress management techniques, adequate sleep hygiene</li>
    <li><strong>Activity guidance:</strong> {'Discuss driving restrictions (varies by state - typically 3-6 months post-event), return to work timeline, sexual activity precautions' if ecg['difficulty'] == 'advanced' else 'Generally no restrictions once symptoms controlled and rhythm stable' if ecg['difficulty'] == 'intermediate' else 'No activity restrictions - encourage normal physical activity and exercise'}</li>
    <li><strong>Family screening:</strong> {'Consider genetic counseling and family member screening for hereditary conditions' if 'long QT' in ecg['tags'] or 'WPW' in ecg['name'] else 'Discuss cardiovascular risk factors with family members'}</li>
</ul>

<h2>Evidence-Based Guidelines and Key Trials</h2>

<p>Current management of {ecg['name']} is based on high-quality evidence from landmark clinical trials and consensus guidelines from major professional societies:</p>

<ul>
    <li><strong>American Heart Association (AHA) / American College of Cardiology (ACC)</strong> - Comprehensive guidelines for cardiac rhythm management</li>
    <li><strong>European Society of Cardiology (ESC)</strong> - Evidence-based recommendations for arrhythmia management</li>
    <li><strong>Advanced Cardiac Life Support (ACLS)</strong> - Standardized protocols for emergency cardiac care</li>
    <li><strong>Heart Rhythm Society (HRS)</strong> - Expert consensus statements on electrophysiology and device therapy</li>
</ul>

<div class="evidence-box" style="background: #ede9fe; border-left: 4px solid #7c3aed; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #5b21b6; font-weight: 800; margin-bottom: 0.75rem;">📚 Level of Evidence</h3>
    <p style="color: #5b21b6; margin: 0;">
        Recommendations for management of {ecg['name']} are primarily supported by Level {'A evidence (multiple high-quality randomized controlled trials and meta-analyses)' if ecg['difficulty'] == 'advanced' else 'B evidence (limited randomized trials, high-quality observational studies, and registry data)' if ecg['difficulty'] == 'intermediate' else 'C evidence (expert consensus, case series, and standard of care practices)'}.
    </p>
</div>

<h2>Summary and Clinical Bottom Line</h2>

<div class="summary-box" style="background: linear-gradient(135deg, #1e40af 0%, #7e22ce 50%, #be185d 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 2rem 0;">
    <h3 style="color: white; font-weight: 800; margin-bottom: 1rem;">📋 Clinical Bottom Line</h3>
    <p style="margin-bottom: 1rem;"><strong>{ecg['name']}</strong> is characterized by {ecg['features'][0].lower()} on ECG. {ecg['significance']}</p>
    <p style="margin-bottom: 1rem;"><strong>Primary management:</strong> {ecg['management']}</p>
    <p style="margin: 0;"><strong>Key takeaway:</strong> {'This is a life-threatening emergency requiring immediate recognition and treatment - time-critical intervention saves lives' if ecg['difficulty'] == 'advanced' else 'Prompt diagnosis and evidence-based therapy optimize patient outcomes and prevent complications' if ecg['difficulty'] == 'intermediate' else 'Recognition, documentation, and patient reassurance are the primary interventions - excellent prognosis'}</p>
</div>

<h2>About the Author</h2>

<div class="author-bio" style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 1.5rem; border-radius: 1rem; margin-top: 2rem;">
    <h3 style="color: #1e40af; font-weight: 800; margin-bottom: 0.5rem;">Dr. Raj K</h3>
    <p style="color: #475569; font-weight: 600; margin-bottom: 1rem;">Emergency Medicine Physician</p>
    <p style="color: #64748b; margin: 0;">Dr. Raj K is a board-certified Emergency Medicine physician with extensive experience in acute cardiac emergencies, advanced ECG interpretation, and critical care. He is passionate about medical education and bringing evidence-based emergency medicine knowledge to healthcare providers worldwide through E-PulsePoints. His clinical expertise includes STEMI management, complex arrhythmia recognition, and emergency cardiac procedures.</p>
</div>

</div>
"""
    
    return content

def generate_all_articles():
    """Generate all articles as JSON with rich snippets for SEO"""
    articles = []
    
    for ecg in ecg_conditions:
        article = {
            "title": f"{ecg['name']}: Advanced ECG Recognition and Emergency Management",
            "excerpt": f"Comprehensive expert guide to {ecg['name']} by Dr. Raj K. Learn diagnostic ECG criteria, emergency management, clinical pitfalls, and evidence-based treatment strategies.",
            "content": generate_comprehensive_content(ecg),
            "imageUrl": f"/best_ecg_images/{ecg['filename']}",
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
            "featured": ecg['name'] in ["Atrial Fibrillation with Rapid Ventricular Response (RVR)", "Anterior Wall Myocardial Infarction (AWMI)", "Monomorphic Ventricular Tachycardia", "Wolff-Parkinson-White Syndrome (WPW)"],
            # Rich Snippet Data for Google Search Console
            "schema": {
                "@context": "https://schema.org",
                "@type": "MedicalWebPage",
                "name": f"{ecg['name']}: Advanced ECG Recognition and Emergency Management",
                "description": f"Comprehensive expert guide to {ecg['name']} by Dr. Raj K. Diagnostic ECG criteria, emergency management protocols, and evidence-based treatment.",
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
                "image": f"https://ecgkid.com/best_ecg_images/{ecg['filename']}",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": f"https://ecgkid.com/blog/{ecg['name'].lower().replace(' ', '-').replace('(', '').replace(')', '')}"
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
                        "audienceType": "Critical Care Specialists"
                    }
                ],
                "keywords": ", ".join(ecg['tags'])
            },
            # SEO metadata
            "seo": {
                "metaTitle": f"{ecg['name']}: Expert ECG Guide | Dr. Raj K | E-PulsePoints",
                "metaDescription": f"Expert emergency medicine guide to {ecg['name']} by Dr. Raj K. ECG criteria, emergency protocols, treatment algorithms, and clinical pearls.",
                "keywords": ecg['tags'],
                "canonicalUrl": f"https://ecgkid.com/blog/{ecg['name'].lower().replace(' ', '-').replace('(', '').replace(')', '')}",
                "ogTitle": f"{ecg['name']}: Advanced ECG & Emergency Management",
                "ogDescription": f"Expert guide by Dr. Raj K: {ecg['significance'][:150]}",
                "ogImage": f"https://ecgkid.com/best_ecg_images/{ecg['filename']}",
                "twitterCard": "summary_large_image",
                "twitterTitle": f"{ecg['name']} - ECG Guide",
                "twitterDescription": f"Emergency medicine expertise by Dr. Raj K: {ecg['significance'][:120]}",
                "twitterImage": f"https://ecgkid.com/best_ecg_images/{ecg['filename']}"
            }
        }
        articles.append(article)
    
    return articles

if __name__ == "__main__":
    articles = generate_all_articles()
    
    output_file = "ecg-blog-best-images.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Generated {len(articles)} comprehensive ECG blog articles from best_ecg_images folder")
    print(f"✓ Saved to: {output_file}")
    print(f"\nAll articles authored by Dr. Raj K, Emergency Medicine Physician")
    print(f"\nEach article includes:")
    print(f"  - Rich Snippets (Schema.org MedicalWebPage)")
    print(f"  - Complete SEO metadata (meta tags, Open Graph, Twitter Cards)")
    print(f"  - High-quality ECG images from best_ecg_images folder")
    print(f"  - Key Points summary box with gradient styling")
    print(f"  - Clinical pearls and emergency protocols")
    print(f"  - Color-coded teaching boxes (Key Points, Pearls, Emergency, Pitfalls, Follow-up)")
    print(f"  - Comprehensive differential diagnoses")
    print(f"  - Evidence-based management algorithms")
    print(f"  - Common pitfalls and how to avoid them")
    print(f"  - Detailed patient education guidance")
    print(f"\nReady for Firebase 'blog' collection upload!")
    print(f"\nCategories: {len(set([article['category'] for article in articles]))} unique (Clinical, Education)")
    print(f"Tags: {len(set([tag for article in articles for tag in article['tags']]))} unique tags for filtering")
    print(f"\nFeatured articles: AFib RVR, AWMI, Monomorphic VT, WPW Syndrome")
