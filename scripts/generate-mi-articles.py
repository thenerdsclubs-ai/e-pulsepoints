import json
import os
from datetime import datetime

# MI Types with their folder paths and descriptions
mi_types = {
    "Anterior_wall_MI": {
        "title_base": "Anterior Wall Myocardial Infarction",
        "short_name": "Anterior MI",
        "description": "Complete guide to recognizing Anterior Wall MI on ECG - the most common and often most severe type of myocardial infarction",
        "significance": "Anterior MI typically results from LAD occlusion, affecting the anterior wall of the left ventricle with high risk of complications",
        "leads": "V1-V4, aVL",
        "artery": "Left Anterior Descending (LAD) artery",
        "complications": "High risk of pump failure, cardiogenic shock, ventricular aneurysm formation",
        "ecg_criteria": ["ST elevation in V1-V4", "Reciprocal ST depression in inferior leads (II, III, aVF)", "New Q waves in anterior leads", "T wave inversion in V1-V4 during evolution"],
        "emergency_management": "Immediate reperfusion therapy (primary PCI preferred, thrombolytics if PCI unavailable within 120 min), dual antiplatelet therapy, anticoagulation, beta-blockers, ACE inhibitors",
        "mortality": "15-20% in-hospital mortality if untreated, significantly improved with early reperfusion",
        "images": ["AMI.png", "AMI1.png", "AMI2.png", "AMI3.png", "AMI5.png", "AMI6.png"]
    },
    "Anterolateral_MI": {
        "title_base": "Anterolateral Myocardial Infarction",
        "short_name": "Anterolateral MI",
        "description": "Comprehensive guide to Anterolateral MI - ECG recognition, clinical significance, and emergency management strategies",
        "significance": "Anterolateral MI involves both anterior and lateral walls, indicating proximal LAD or diagonal branch occlusion with extensive myocardial damage",
        "leads": "V1-V6, I, aVL",
        "artery": "Proximal LAD or diagonal branch",
        "complications": "Large infarct size, increased risk of heart failure, cardiogenic shock, mechanical complications",
        "ecg_criteria": ["ST elevation in V1-V6, I, aVL", "Reciprocal changes in inferior leads", "Deep Q waves in anterior and lateral leads", "Extensive ST segment changes indicating large area of involvement"],
        "emergency_management": "Urgent coronary angiography and PCI, aggressive antiplatelet and anticoagulation therapy, hemodynamic monitoring, early risk stratification",
        "mortality": "20-25% in-hospital mortality due to extensive myocardial involvement",
        "images": ["ANTEROLATERAL.png"]
    },
    "Inferior_wall_MI": {
        "title_base": "Inferior Wall Myocardial Infarction",
        "short_name": "Inferior MI",
        "description": "Essential guide to Inferior Wall MI recognition and management - understand ECG patterns, associated complications, and evidence-based treatment",
        "significance": "Inferior MI results from RCA or LCx occlusion, often associated with bradyarrhythmias and right ventricular involvement",
        "leads": "II, III, aVF",
        "artery": "Right Coronary Artery (RCA) 80% or Left Circumflex (LCx) 20%",
        "complications": "AV blocks (especially high-degree), bradycardia, RV infarction (30-50% of cases), hypotension",
        "ecg_criteria": ["ST elevation in II, III, aVF", "Reciprocal ST depression in I, aVL", "ST elevation greater in III than II suggests RCA occlusion", "Right-sided leads (V4R) positive if RV involvement"],
        "emergency_management": "Reperfusion therapy, AVOID beta-blockers and nitrates if RV involvement suspected, adequate fluid resuscitation for hypotension, temporary pacing if high-degree AV block",
        "mortality": "Lower than anterior MI (5-10%) but increases significantly with RV involvement or cardiogenic shock",
        "images": ["IWMI.png", "IWMI1.png", "IWMI2.png", "IWMI3.png"]
    },
    "Lateral_wall_MI": {
        "title_base": "Lateral Wall Myocardial Infarction",
        "short_name": "Lateral MI",
        "description": "Expert guide to recognizing Lateral Wall MI on ECG - clinical pearls, diagnostic criteria, and modern management approaches",
        "significance": "Lateral MI indicates LCx occlusion, often missed or underdiagnosed due to subtle ECG changes, may occur in isolation or with other infarcts",
        "leads": "I, aVL, V5, V6",
        "artery": "Left Circumflex artery (LCx)",
        "complications": "Often smaller infarcts but can cause significant arrhythmias, may be part of larger inferolateral or anterolateral MI",
        "ecg_criteria": ["ST elevation in I, aVL, V5, V6", "Reciprocal ST depression in inferior leads", "High lateral (I, aVL) vs low lateral (V5, V6) patterns", "Tall R waves and upright T waves initially, followed by Q waves and T inversion"],
        "emergency_management": "Standard STEMI protocol with reperfusion therapy, careful evaluation for extent of infarction, assessment for concomitant posterior or inferior involvement",
        "mortality": "Generally lower mortality (5-10%) when isolated, higher if extensive or combined with other territories",
        "images": []  # Will use generic MI images
    },
    "Posterior_wall_MI": {
        "title_base": "Posterior Wall Myocardial Infarction",
        "short_name": "Posterior MI",
        "description": "Master the diagnosis of Posterior MI - the most commonly missed STEMI. Learn mirror image ECG patterns and critical management strategies",
        "significance": "Posterior MI often goes unrecognized because standard 12-lead shows reciprocal changes rather than direct ST elevation - must recognize mirror image",
        "leads": "V1-V3 (reciprocal changes), posterior leads V7-V9 (direct changes)",
        "artery": "Posterior descending artery (PDA) from RCA or LCx",
        "complications": "Frequently combined with inferior MI, risk of complete heart block, papillary muscle dysfunction",
        "ecg_criteria": ["Tall R waves in V1-V3 (mirror image of Q waves)", "ST depression in V1-V3 (reciprocal to posterior ST elevation)", "Upright tall T waves in V1-V3", "ST elevation in posterior leads V7-V9 if obtained"],
        "emergency_management": "HIGH INDEX OF SUSPICION required, obtain posterior leads V7-V9, immediate reperfusion therapy, often requires coronary angiography for diagnosis",
        "mortality": "Similar to inferior MI (5-15%), higher if extensive or combined territories",
        "images": []  # Will use generic MI images
    },
    "Post_MI_evolved_MI": {
        "title_base": "Post-MI Evolved ECG Patterns",
        "short_name": "Evolved MI",
        "description": "Comprehensive guide to recognizing evolved MI patterns on ECG - chronic changes, Q waves, aneurysm formation, and long-term management",
        "significance": "Understanding evolved MI patterns is crucial for distinguishing old from new infarction, assessing extent of myocardial damage, and predicting complications",
        "leads": "Depends on original MI location",
        "artery": "Previous infarct-related artery",
        "complications": "Ventricular aneurysm (persistent ST elevation), arrhythmias, heart failure, recurrent MI",
        "ecg_criteria": ["Pathologic Q waves (>0.04s duration, >25% of R wave height)", "Persistent ST elevation suggesting aneurysm", "Loss of R wave progression", "T wave inversions in affected leads", "No acute hyperacute T waves or acute injury pattern"],
        "emergency_management": "Careful comparison with old ECGs essential, assess for new vs old changes, echocardiography to evaluate wall motion and aneurysm, optimize medical therapy for secondary prevention",
        "mortality": "Depends on extent of chronic LV dysfunction, presence of aneurysm, and optimization of medical therapy",
        "images": []  # Will use generic MI images
    }
}

def create_slug(title):
    """Convert title to URL-friendly slug"""
    slug = title.lower()
    slug = slug.replace(':', '').replace('(', '').replace(')', '').replace(',', '')
    slug = slug.replace(' ', '-').replace('--', '-')
    return slug.strip('-')[:100]

def create_mi_article(mi_type, mi_data, article_num):
    """Create a comprehensive MI article"""
    
    title_suffix = ""
    if article_num == 1:
        title_suffix = ": Complete ECG Recognition and Emergency Management Guide"
    else:
        title_suffix = ": Advanced ECG Patterns and Clinical Pearls"
    
    title = mi_data['title_base'] + title_suffix
    
    # Select images for this article
    available_images = mi_data['images']
    if article_num == 1 and len(available_images) >= 3:
        selected_images = available_images[:3]
    elif article_num == 2 and len(available_images) >= 3:
        selected_images = available_images[3:6] if len(available_images) >= 6 else available_images[-3:]
    elif len(available_images) > 0:
        selected_images = [available_images[0]]
    else:
        # Use a generic MI image path
        selected_images = [f"{mi_type}/example.png"]
    
    # Create comprehensive content
    content = f"""
<div class="ecg-article">

<div class="ecg-image-container" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%); padding: 2rem; border-radius: 1.5rem; margin-bottom: 2rem;">
    <img src="/MI_ecg_database/{mi_type}/{selected_images[0]}" alt="{mi_data['short_name']} ECG Example" style="width: 100%; border-radius: 1rem; box-shadow: 0 20px 50px rgba(0,0,0,0.3);" />
    <p style="text-align: center; color: white; margin-top: 1rem; font-size: 0.875rem; font-weight: 600;">
        Figure 1: {mi_data['short_name']} - Characteristic ECG Pattern
    </p>
</div>

<div class="key-points-box" style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-left: 4px solid #dc2626; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem;">
    <h3 style="color: #991b1b; font-weight: 800; margin-bottom: 1rem; font-size: 1.25rem;">🚨 Critical Key Points</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #991b1b;">
        <li><strong>Affected Territory:</strong> {mi_data['short_name']}</li>
        <li><strong>ECG Leads Involved:</strong> {mi_data['leads']}</li>
        <li><strong>Culprit Artery:</strong> {mi_data['artery']}</li>
        <li><strong>Primary Emergency Management:</strong> Immediate reperfusion therapy within 90-120 minutes</li>
        <li><strong>Mortality Risk:</strong> {mi_data['mortality']}</li>
    </ul>
</div>

<h2>Overview and Clinical Significance</h2>

<p><strong>{mi_data['short_name']}</strong> is a life-threatening emergency requiring immediate recognition and treatment. {mi_data['significance']}</p>

<p>Early recognition through systematic ECG analysis and prompt intervention with reperfusion therapy (primary PCI or thrombolytics) significantly reduces mortality and improves long-term outcomes. Every minute of delay increases myocardial damage - "Time is Muscle."</p>

<h2>Systematic ECG Recognition</h2>

<div class="diagnostic-criteria" style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0; border: 2px solid #fecaca;">
    <h3 style="color: #991b1b; font-weight: 700; margin-bottom: 1rem;">📊 Diagnostic ECG Criteria for {mi_data['short_name']}</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #7f1d1d;">
        {''.join(f'<li><strong>{criterion}</strong></li>' for criterion in mi_data['ecg_criteria'])}
    </ul>
</div>

<h3>Step-by-Step ECG Analysis</h3>

<p>When evaluating any suspected STEMI, follow this systematic approach:</p>

<ol>
    <li><strong>Rate:</strong> Assess heart rate - tachycardia may indicate pump failure, bradycardia common in inferior MI</li>
    <li><strong>Rhythm:</strong> Identify any arrhythmias - VT/VF are life-threatening complications requiring immediate defibrillation</li>
    <li><strong>Axis:</strong> Check QRS axis for any deviation suggesting prior infarction or conduction abnormalities</li>
    <li><strong>ST Segments:</strong> MOST CRITICAL - identify ST elevation ≥1mm in limb leads or ≥2mm in precordial leads in ≥2 contiguous leads</li>
    <li><strong>Reciprocal Changes:</strong> Look for ST depression in leads opposite to infarct territory (increases diagnostic certainty)</li>
    <li><strong>Q Waves:</strong> Pathologic Q waves indicate transmural infarction (>0.04s duration, >25% of R wave amplitude)</li>
    <li><strong>T Waves:</strong> Hyperacute T waves (tall, peaked) in early STEMI; inverted T waves in evolved/subacute phase</li>
    <li><strong>Compare to Prior ECGs:</strong> Essential to differentiate acute vs chronic changes, aneurysm, or LBBB</li>
</ol>
"""

    # Add multiple ECG images if available
    if len(selected_images) > 1:
        content += f"""
<h3>ECG Pattern Variations</h3>

<p>The following images demonstrate different presentations and evolutionary stages of {mi_data['short_name']}:</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
"""
        for idx, img in enumerate(selected_images[1:], 2):
            content += f"""
    <div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); padding: 1rem; border-radius: 1rem;">
        <img src="/MI_ecg_database/{mi_type}/{img}" alt="{mi_data['short_name']} Variation {idx}" style="width: 100%; border-radius: 0.5rem; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" />
        <p style="text-align: center; color: #991b1b; margin-top: 0.5rem; font-size: 0.75rem; font-weight: 600;">
            Figure {idx}: Alternative ECG Pattern
        </p>
    </div>
"""
        content += """
</div>
"""

    content += f"""
<h2>Pathophysiology and Mechanisms</h2>

<p>{mi_data['short_name']} occurs when there is complete occlusion of the {mi_data['artery']}, leading to transmural myocardial ischemia and necrosis. The ischemic cascade progresses rapidly:</p>

<ul>
    <li><strong>0-20 minutes:</strong> Reversible ischemia, metabolic changes, diastolic dysfunction</li>
    <li><strong>20-40 minutes:</strong> Irreversible cell injury begins, systolic dysfunction develops</li>
    <li><strong>2-4 hours:</strong> Transmural necrosis, ST elevation on ECG, troponin release</li>
    <li><strong>6-12 hours:</strong> Inflammatory response, increased risk of arrhythmias and mechanical complications</li>
    <li><strong>Days to weeks:</strong> Healing, scar formation, ventricular remodeling</li>
</ul>

<div class="clinical-pearl" style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #92400e; font-weight: 800; margin-bottom: 0.75rem;">💡 Clinical Pearl</h3>
    <p style="color: #92400e; margin: 0;">
        In STEMI, the "golden hour" is critical - mortality increases 1% for every 30-minute delay in reperfusion. Door-to-balloon time goal is &lt;90 minutes for primary PCI, door-to-needle time &lt;30 minutes for thrombolytics.
    </p>
</div>

<h2>Evidence-Based Emergency Management</h2>

<h3>Immediate Life-Saving Interventions</h3>

<div class="emergency-protocol" style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-left: 4px solid #dc2626; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #991b1b; font-weight: 800; margin-bottom: 0.75rem;">🚨 STEMI Emergency Protocol - First 10 Minutes</h3>
    <ol style="color: #991b1b; margin: 0; padding-left: 1.5rem;">
        <li><strong>Activate STEMI team immediately</strong> - do not delay for troponin results</li>
        <li>Obtain 12-lead ECG within 10 minutes of arrival (prehospital ECG ideal)</li>
        <li>Administer aspirin 162-325mg chewed (unless contraindicated)</li>
        <li>Provide supplemental oxygen if SpO₂ &lt;90% (avoid hyperoxia)</li>
        <li>Establish large-bore IV access (×2) and obtain stat labs (troponin, CBC, BMP, coags, lipid panel)</li>
        <li>Administer sublingual nitroglycerin for chest pain (avoid in RV infarct, inferior MI with hypotension)</li>
        <li>Morphine 2-4mg IV for refractory chest pain (use cautiously - may mask symptoms)</li>
        <li>Decide reperfusion strategy: Primary PCI (preferred) vs thrombolytics</li>
    </ol>
</div>

<h3>Reperfusion Therapy</h3>

<p><strong>Primary Strategy:</strong> {mi_data['emergency_management']}</p>

<p><strong>Primary PCI (Preferred Method):</strong></p>
<ul>
    <li>Goal: Door-to-balloon time &lt;90 minutes (60 minutes for cardiogenic shock)</li>
    <li>Superior to thrombolytics - lower mortality, reduced reinfarction and stroke rates</li>
    <li>Radial access preferred over femoral (reduced bleeding complications)</li>
    <li>Routine thrombus aspiration NOT recommended</li>
    <li>Drug-eluting stents are standard of care</li>
</ul>

<p><strong>Fibrinolytic Therapy (if PCI unavailable within 120 minutes):</strong></p>
<ul>
    <li>Goal: Door-to-needle time &lt;30 minutes</li>
    <li>Best if given within 3 hours of symptom onset (diminishing benefit after 12 hours)</li>
    <li>Agents: Tenecteplase (TNK), Alteplase (tPA), Reteplase (preferred: TNK for ease of use)</li>
    <li>Transfer to PCI-capable center after lysis for angiography (pharmacoinvasive strategy)</li>
</ul>

<h3>Adjunctive Pharmacotherapy</h3>

<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
    <thead>
        <tr style="background: #fee2e2;">
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #fecaca;">Medication</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #fecaca;">Dosing</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #fecaca;">Indication</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;"><strong>Aspirin</strong></td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">162-325mg chewed, then 81mg daily</td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">All STEMI patients (Class I)</td>
        </tr>
        <tr style="background: #fef2f2;">
            <td style="padding: 0.75rem; border: 1px solid #fecaca;"><strong>P2Y12 Inhibitor</strong></td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">Ticagrelor 180mg load OR Prasugrel 60mg OR Clopidogrel 600mg</td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">Dual antiplatelet therapy (Class I)</td>
        </tr>
        <tr>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;"><strong>Anticoagulation</strong></td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">Heparin or Bivalirudin during PCI</td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">Prevent thrombosis (Class I)</td>
        </tr>
        <tr style="background: #fef2f2;">
            <td style="padding: 0.75rem; border: 1px solid #fecaca;"><strong>Beta-blocker</strong></td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">Metoprolol 25-50mg PO (avoid if shock/HF)</td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">Reduce arrhythmias, reduce mortality (Class I)</td>
        </tr>
        <tr>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;"><strong>ACE Inhibitor</strong></td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">Lisinopril 2.5-5mg PO within 24h</td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">Prevent remodeling, reduce mortality (Class I)</td>
        </tr>
        <tr style="background: #fef2f2;">
            <td style="padding: 0.75rem; border: 1px solid #fecaca;"><strong>Statin</strong></td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">Atorvastatin 80mg PO</td>
            <td style="padding: 0.75rem; border: 1px solid #fecaca;">High-intensity statin (Class I)</td>
        </tr>
    </tbody>
</table>

<h2>Complications and Risk Stratification</h2>

<p><strong>Common Complications of {mi_data['short_name']}:</strong></p>

<p>{mi_data['complications']}</p>

<p><strong>Additional life-threatening complications requiring vigilance:</strong></p>

<ul>
    <li><strong>Cardiogenic shock:</strong> 5-10% of STEMI patients, 50% mortality despite treatment - requires intra-aortic balloon pump or mechanical circulatory support</li>
    <li><strong>Ventricular free wall rupture:</strong> Usually 3-5 days post-MI, sudden hemodynamic collapse, requires emergency pericardiocentesis and surgery</li>
    <li><strong>Ventricular septal defect:</strong> New harsh holosystolic murmur, biventricular failure - emergency surgical repair</li>
    <li><strong>Acute mitral regurgitation:</strong> Papillary muscle rupture or dysfunction - pulmonary edema, new murmur - may require emergent surgery</li>
    <li><strong>Malignant arrhythmias:</strong> VT/VF in first 48 hours (common), complete heart block (especially inferior MI), atrial fibrillation with rapid rate</li>
</ul>

<div class="follow-up-box" style="background: linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%); border-left: 4px solid #059669; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #065f46; font-weight: 800; margin-bottom: 0.75rem;">📅 Post-STEMI Management and Follow-Up</h3>
    <ul style="color: #065f46; margin: 0; padding-left: 1.5rem;">
        <li><strong>Hospital stay:</strong> CCU monitoring for 24-48 hours minimum, telemetry until stable</li>
        <li><strong>Risk stratification:</strong> Echocardiogram to assess EF, wall motion abnormalities, complications</li>
        <li><strong>Cardiac rehabilitation:</strong> Enrollment prior to discharge - improves outcomes and quality of life</li>
        <li><strong>Cardiology follow-up:</strong> Within 7-14 days post-discharge for medication optimization</li>
        <li><strong>Lifestyle modifications:</strong> Smoking cessation (most important!), diet, exercise, weight loss, stress management</li>
        <li><strong>Secondary prevention:</strong> Lifelong DAPT (minimum 12 months), statin, beta-blocker, ACE-I/ARB, aspirin</li>
    </ul>
</div>

<h2>Common Pitfalls and How to Avoid Them</h2>

<div class="pitfalls-box" style="background: #fef9c3; border: 2px solid #eab308; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #713f12; font-weight: 700; margin-bottom: 1rem;">⚠️ Critical Mistakes That Cost Lives</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #713f12;">
        <li><strong>Waiting for troponin results before activating cath lab</strong> - ECG is diagnostic, troponins lag behind injury by hours</li>
        <li><strong>Dismissing atypical presentations</strong> - women, elderly, diabetics often present without chest pain (dyspnea, nausea, fatigue)</li>
        <li><strong>Missing LBBB-associated STEMI</strong> - use Sgarbossa criteria (concordant ST elevation ≥1mm, concordant ST depression ≥1mm in V1-V3, or discordant ST elevation ≥5mm)</li>
        <li><strong>Giving beta-blockers in RV infarction</strong> - can precipitate profound hypotension and cardiovascular collapse</li>
        <li><strong>Under-treating pain with inadequate analgesia</strong> - pain increases sympathetic tone, worsening ischemia</li>
        <li><strong>Delaying reperfusion for "stable" patients</strong> - even asymptomatic STEMI requires urgent intervention</li>
        <li><strong>Failing to recognize cardiogenic shock early</strong> - signs: SBP &lt;90mmHg, cool extremities, altered mentation, oliguria</li>
    </ul>
</div>

<h2>Patient Education and Discharge Instructions</h2>

<p>Comprehensive patient counseling is essential for secondary prevention and long-term success:</p>

<ul>
    <li><strong>Warning signs of recurrent MI:</strong> Chest pain/pressure, shortness of breath, diaphoresis, nausea - call 911 immediately, do NOT drive yourself</li>
    <li><strong>Medication adherence:</strong> Emphasize critical importance of DAPT - stopping early dramatically increases stent thrombosis risk (often fatal)</li>
    <li><strong>Activity progression:</strong> Gradual return to normal activities as tolerated, cardiac rehab participation strongly encouraged</li>
    <li><strong>Sexual activity:</strong> Generally safe to resume 1-2 weeks post-MI if able to climb 2 flights of stairs without symptoms</li>
    <li><strong>Driving restrictions:</strong> Typically 1 week for stable patients, longer if complications or ICD placement</li>
    <li><strong>Return to work:</strong> Usually 2-6 weeks depending on occupation and cardiac function</li>
    <li><strong>Psychological support:</strong> Post-MI depression is common (30%), screening and treatment improve outcomes</li>
</ul>

<h2>Evidence-Based Guidelines</h2>

<p>Current STEMI management is supported by high-quality evidence from landmark trials and consensus guidelines:</p>

<ul>
    <li><strong>ACC/AHA STEMI Guidelines (2023)</strong> - Comprehensive evidence-based recommendations</li>
    <li><strong>European Society of Cardiology (ESC) STEMI Guidelines</strong> - International perspective and evidence</li>
    <li><strong>DANAMI-2 Trial</strong> - Demonstrated superiority of primary PCI over fibrinolysis</li>
    <li><strong>HORIZONS-AMI Trial</strong> - Bivalirudin vs heparin in STEMI</li>
    <li><strong>TRITON-TIMI 38</strong> - Prasugrel vs clopidogrel in ACS</li>
    <li><strong>PLATO Trial</strong> - Ticagrelor vs clopidogrel showing mortality benefit</li>
</ul>

<div class="evidence-box" style="background: #ede9fe; border-left: 4px solid #7c3aed; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0;">
    <h3 style="color: #5b21b6; font-weight: 800; margin-bottom: 0.75rem;">📚 Level of Evidence</h3>
    <p style="color: #5b21b6; margin: 0;">
        Primary PCI for STEMI is supported by <strong>Level A evidence</strong> (multiple high-quality randomized controlled trials and meta-analyses). Door-to-balloon time &lt;90 minutes is a <strong>Class I recommendation</strong> (should be performed).
    </p>
</div>

<h2>Summary and Clinical Bottom Line</h2>

<div class="summary-box" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 2rem 0;">
    <h3 style="color: white; font-weight: 800; margin-bottom: 1rem;">📋 Clinical Bottom Line</h3>
    <p style="margin-bottom: 1rem;"><strong>{mi_data['short_name']}</strong> is a life-threatening emergency characterized by ST elevation in {mi_data['leads']} indicating acute occlusion of the {mi_data['artery']}.</p>
    <p style="margin-bottom: 1rem;"><strong>Immediate Action:</strong> Activate STEMI team, give aspirin and P2Y12 inhibitor, proceed to emergency coronary angiography with primary PCI (goal door-to-balloon &lt;90 minutes).</p>
    <p style="margin-bottom: 1rem;"><strong>Key Complication:</strong> {mi_data['complications']}</p>
    <p style="margin: 0;"><strong>Remember:</strong> Time is muscle - every minute counts. Early recognition and rapid reperfusion save lives and preserve cardiac function.</p>
</div>

<h2>About the Author</h2>

<div class="author-bio" style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 1.5rem; border-radius: 1rem; margin-top: 2rem;">
    <h3 style="color: #1e40af; font-weight: 800; margin-bottom: 0.5rem;">Dr. Raj K</h3>
    <p style="color: #475569; font-weight: 600; margin-bottom: 1rem;">Emergency Medicine Physician</p>
    <p style="color: #64748b; margin: 0;">Dr. Raj K is a board-certified Emergency Medicine physician with extensive experience in acute cardiac emergencies, STEMI management, and advanced ECG interpretation. He has managed hundreds of STEMI cases and is passionate about teaching evidence-based emergency cardiology through E-PulsePoints. His expertise includes primary PCI coordination, mechanical circulatory support, and complex coronary interventions.</p>
</div>

</div>
"""

    # Create article object
    article = {
        "title": title,
        "slug": create_slug(title),
        "excerpt": f"{mi_data['description']}. Learn diagnostic ECG criteria, emergency protocols, complications to watch for, and evidence-based treatment strategies from Dr. Raj K, Emergency Medicine Physician.",
        "content": content,
        "imageUrl": f"/MI_ecg_database/{mi_type}/{selected_images[0]}",
        "category": "clinical",
        "tags": [
            mi_data['short_name'],
            "STEMI",
            "myocardial infarction",
            "ECG diagnosis",
            "emergency cardiology",
            "reperfusion therapy",
            "primary PCI",
            mi_data['artery'].split()[0].lower()
        ],
        "author": {
            "name": "Dr. Raj K",
            "title": "Emergency Medicine Physician",
            "avatar": "https://ui-avatars.com/api/?name=Dr+Raj+K&background=dc2626&color=fff&size=200&bold=true"
        },
        "publishedAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat(),
        "views": 0,
        "featured": True,
        "schema": {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": title,
            "description": mi_data['description'],
            "author": {
                "@type": "Person",
                "name": "Dr. Raj K",
                "jobTitle": "Emergency Medicine Physician"
            },
            "datePublished": datetime.now().isoformat(),
            "medicalAudience": {
                "@type": "MedicalAudience",
                "audienceType": "Healthcare professionals, Emergency physicians, Cardiologists, Medical students"
            },
            "about": {
                "@type": "MedicalCondition",
                "name": mi_data['short_name']
            }
        },
        "seo": {
            "metaTitle": f"{title} | E-PulsePoints ECG Learning",
            "metaDescription": mi_data['description'][:155],
            "keywords": [mi_data['short_name'], "STEMI", "myocardial infarction", "ECG", "emergency medicine"],
            "canonicalUrl": f"https://ecgkid.com/blog/{create_slug(title)}",
            "ogTitle": title,
            "ogDescription": mi_data['description'],
            "ogImage": f"https://ecgkid.com/MI_ecg_database/{mi_type}/{selected_images[0]}",
            "twitterCard": "summary_large_image",
            "twitterTitle": title,
            "twitterDescription": mi_data['description'][:200],
            "twitterImage": f"https://ecgkid.com/MI_ecg_database/{mi_type}/{selected_images[0]}"
        }
    }
    
    return article

# Generate articles
all_articles = []

print("🚨 Generating MI ECG Articles...\n")

for mi_type, mi_data in mi_types.items():
    print(f"📊 Creating 2 articles for {mi_data['short_name']}...")
    
    for i in range(1, 3):  # Create 2 articles per MI type
        article = create_mi_article(mi_type, mi_data, i)
        all_articles.append(article)
        print(f"   ✅ Article {i}: {article['title'][:60]}...")

# Save to JSON file
output_file = '../public/scripts/mi-ecg-articles.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(all_articles, f, indent=2, ensure_ascii=False)

print(f"\n✅ Successfully generated {len(all_articles)} MI articles!")
print(f"📁 Saved to: {output_file}")
print(f"\n📈 Summary:")
print(f"   • Total articles: {len(all_articles)}")
print(f"   • MI types covered: {len(mi_types)}")
print(f"   • Articles per type: 2")
print(f"\n🎯 MI Types Covered:")
for mi_type, mi_data in mi_types.items():
    print(f"   • {mi_data['short_name']}")
