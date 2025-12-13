// Simple script to add test blog posts directly to Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Use the same config as your app
const firebaseConfig = {
  apiKey: "AIzaSyCNM5PqHhF7Qdy5_3yJJcLQy8Rdf5aAyGw",
  authDomain: "ecgkid-b68cb.firebaseapp.com",
  projectId: "ecgkid-b68cb",
  storageBucket: "ecgkid-b68cb.firebasestorage.app",
  messagingSenderId: "847583698006",
  appId: "1:847583698006:web:f13f1b5a8b7f3d5e1e8e5f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addTestPosts() {
  console.log('Adding test blog posts...');
  
  const posts = [
    {
      title: "Inferior Wall Myocardial Infarction: Advanced ECG Patterns and Clinical Pearls",
      slug: "inferior-wall-myocardial-infarction-advanced-ecg-patterns-and-clinical-pearls",
      excerpt: "Master the recognition of inferior wall STEMI on ECG with advanced pattern analysis, clinical correlation, and emergency management protocols.",
      content: `# Inferior Wall Myocardial Infarction: Advanced ECG Patterns and Clinical Pearls

## Overview

Inferior wall myocardial infarction represents one of the most common presentations of ST-elevation myocardial infarction (STEMI), typically involving the right coronary artery (RCA) or left circumflex artery (LCX).

## ECG Recognition

### Primary Features
- **ST elevation** in leads II, III, and aVF
- **Reciprocal ST depression** in leads I and aVL
- **Q waves** may develop in inferior leads

### Key Diagnostic Points
1. **Lead III > Lead II**: Suggests RCA occlusion
2. **Concurrent posterior changes**: Check V1-V2 for tall R waves
3. **Right heart involvement**: Obtain right-sided ECG (V4R)

## Clinical Management

### Emergency Protocol
1. **Immediate 12-lead ECG** within 10 minutes
2. **Activate cardiac catheterization lab**
3. **Consider right heart assessment**
4. **Monitor for complications**

### Common Complications
- **Bradycardia** (especially with RCA occlusion)
- **Heart block** (1st, 2nd, or 3rd degree)
- **Right ventricular infarction**
- **Posterior wall extension**

## Teaching Points

- Always check for posterior wall involvement
- Consider right-sided ECG in inferior STEMI
- Monitor closely for conduction abnormalities
- Early reperfusion therapy is crucial

## Case Study

A 65-year-old male presents with chest pain. ECG shows 3mm ST elevation in leads II, III, aVF with reciprocal changes in I, aVL. Management includes immediate catheterization and primary PCI.

---

*For comprehensive ECG training and more clinical cases, explore our medical education platform.*`,
      imageUrl: "/clean_rhythm_ecg/inferior-mi.jpg",
      category: "clinical",
      tags: ["inferior STEMI", "myocardial infarction", "ECG interpretation", "emergency cardiology", "RCA occlusion"],
      publishedAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 0,
      featured: true,
      author: {
        name: "Dr. Sarah Mitchell",
        title: "MD, FACC",
        avatar: "/logo/ecg_kid_logo.png"
      }
    },
    {
      title: "Inferior Wall Myocardial Infarction: Complete ECG Recognition and Emergency Management Guide",
      slug: "inferior-wall-myocardial-infarction-complete-ecg-recognition-and-emergency-management-guide",
      excerpt: "Comprehensive guide to inferior wall STEMI recognition, differential diagnosis, emergency protocols, and evidence-based management strategies.",
      content: `# Inferior Wall Myocardial Infarction: Complete ECG Recognition and Emergency Management Guide

## Introduction

Inferior wall myocardial infarction accounts for approximately 40% of all STEMIs and requires immediate recognition and treatment for optimal patient outcomes.

## Anatomical Correlation

### Arterial Supply
- **Right Coronary Artery (RCA)**: 85% of cases
- **Left Circumflex (LCX)**: 15% of cases
- **Posterior Descending Artery (PDA)**

### ECG Lead Correlation
- **Leads II, III, aVF**: Directly face inferior wall
- **Leads I, aVL**: Show reciprocal changes
- **V1-V2**: May show posterior involvement

## Diagnostic Criteria

### ST-Elevation Criteria
- **≥1mm ST elevation** in at least 2 inferior leads
- **Reciprocal depression** in lateral leads
- **New Q waves** (pathological if >0.04s wide)

### Pattern Recognition
1. **RCA vs LCX differentiation**
2. **Posterior wall extension**
3. **Right ventricular involvement**
4. **Conduction system effects**

## Emergency Management Protocol

### Initial Assessment
1. **Symptom evaluation** (chest pain, dyspnea, nausea)
2. **Vital signs** (BP, HR, O2 saturation)
3. **12-lead ECG** within 10 minutes
4. **Right-sided ECG** if indicated

### Treatment Pathway
1. **Dual antiplatelet therapy**
2. **Anticoagulation**
3. **Primary PCI** (goal: <90 minutes)
4. **Adjunctive medical therapy**

## Special Considerations

### Right Ventricular Infarction
- Occurs in 30-50% of inferior STEMIs
- Diagnosed with right-sided ECG (V4R)
- Requires careful fluid management

### Conduction Abnormalities
- **AV blocks** (1st, 2nd, 3rd degree)
- **Bradycardia**
- **Atrial fibrillation**

## Complications

### Acute Phase
- Cardiogenic shock
- Mechanical complications
- Arrhythmias
- Pericarditis

### Long-term
- Heart failure
- Ventricular remodeling
- Sudden cardiac death risk

## Evidence-Based Guidelines

Current ACC/AHA and ESC guidelines emphasize:
- Time-sensitive reperfusion
- Risk stratification
- Comprehensive post-MI care
- Secondary prevention measures

## Summary

Inferior wall STEMI requires rapid recognition and treatment. Key points include understanding the ECG patterns, recognizing complications, and implementing evidence-based emergency protocols for optimal patient outcomes.

---

*Enhance your ECG interpretation skills with our comprehensive training modules and clinical case studies.*`,
      imageUrl: "/clean_rhythm_ecg/inferior-stemi.jpg",
      category: "education",
      tags: ["STEMI", "inferior wall MI", "emergency medicine", "cardiology", "ECG patterns", "clinical guidelines"],
      publishedAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 0,
      featured: true,
      author: {
        name: "Dr. Michael Rodriguez",
        title: "MD, FACEP",
        avatar: "/logo/ecg_kid_logo.png"
      }
    }
  ];

  try {
    for (const post of posts) {
      const docRef = await addDoc(collection(db, 'blog'), post);
      console.log(`✓ Added post: ${post.title} (ID: ${docRef.id})`);
    }
    console.log('\n✅ Test posts added successfully!');
  } catch (error) {
    console.error('Error adding posts:', error);
  }
}

// Run the function
addTestPosts();