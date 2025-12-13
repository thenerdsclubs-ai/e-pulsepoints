"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function CreatinineClearanceCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const calculateCrCl = () => {
    if (!age || !weight || !creatinine) return null;
    
    const ageValue = parseFloat(age);
    const weightValue = parseFloat(weight);
    const crValue = parseFloat(creatinine);
    
    if (ageValue <= 0 || weightValue <= 0 || crValue <= 0) return null;
    
    // Cockcroft-Gault equation
    let crCl = ((140 - ageValue) * weightValue) / (72 * crValue);
    
    // Multiply by 0.85 for females
    if (gender === 'female') {
      crCl = crCl * 0.85;
    }
    
    return Math.round(crCl * 10) / 10;
  };

  const getInterpretation = (crCl: number) => {
    if (crCl >= 90) {
      return { 
        text: "Normal kidney function", 
        color: 'green' as const,
        stage: "Stage 1 (if other kidney damage present)"
      };
    } else if (crCl >= 60) {
      return { 
        text: "Mild decrease in kidney function", 
        color: 'green' as const,
        stage: "Stage 2 (if other kidney damage present)"
      };
    } else if (crCl >= 45) {
      return { 
        text: "Mild to moderate decrease in kidney function", 
        color: 'yellow' as const,
        stage: "Stage 3a CKD"
      };
    } else if (crCl >= 30) {
      return { 
        text: "Moderate to severe decrease in kidney function", 
        color: 'yellow' as const,
        stage: "Stage 3b CKD"
      };
    } else if (crCl >= 15) {
      return { 
        text: "Severe decrease in kidney function", 
        color: 'red' as const,
        stage: "Stage 4 CKD"
      };
    } else {
      return { 
        text: "Kidney failure - dialysis or transplant needed", 
        color: 'red' as const,
        stage: "Stage 5 CKD (End-stage)"
      };
    }
  };

  const crCl = calculateCrCl();
  const interpretation = crCl ? getInterpretation(crCl) : null;

  return (
    <CalculatorLayout
      title="Creatinine Clearance"
      description="Estimate renal function using the Cockcroft-Gault equation"
      icon="🏥"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Patient Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Age"
            value={age}
            onChange={setAge}
            unit="years"
            placeholder="65"
            step="1"
            min="18"
            max="120"
          />
          
          <InputField
            label="Weight"
            value={weight}
            onChange={setWeight}
            unit="kg"
            placeholder="70"
            step="1"
            min="30"
            max="200"
          />
          
          <InputField
            label="Serum Creatinine"
            value={creatinine}
            onChange={setCreatinine}
            unit="mg/dL"
            placeholder="1.2"
            step="0.1"
            min="0.3"
            max="15.0"
          />
          
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">Cockcroft-Gault Formula:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div><strong>Male:</strong> CrCl = ((140 - Age) × Weight) ÷ (72 × Creatinine)</div>
            <div><strong>Female:</strong> CrCl = ((140 - Age) × Weight) ÷ (72 × Creatinine) × 0.85</div>
            <div><strong>Normal Range:</strong> 90-120 mL/min</div>
          </div>
        </div>
      </div>

      {crCl && interpretation && (
        <ResultCard
          title="Creatinine Clearance"
          value={crCl}
          unit="mL/min"
          interpretation={`${interpretation.stage}: ${interpretation.text}`}
          color={interpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">CKD Stages:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• <strong>Stage 1:</strong> ≥90 mL/min (with kidney damage)</div>
          <div>• <strong>Stage 2:</strong> 60-89 mL/min (with kidney damage)</div>
          <div>• <strong>Stage 3a:</strong> 45-59 mL/min</div>
          <div>• <strong>Stage 3b:</strong> 30-44 mL/min</div>
          <div>• <strong>Stage 4:</strong> 15-29 mL/min</div>
          <div>• <strong>Stage 5:</strong> {'<'}15 mL/min or on dialysis</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Applications:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            Creatinine clearance is essential for medication dosing adjustments, 
            contrast media risk assessment, and monitoring kidney function progression.
          </p>
          <p>
            <strong>Limitations:</strong> Less accurate in extremes of age/weight, 
            muscle mass variations, or rapidly changing kidney function. 
            Consider eGFR (MDRD or CKD-EPI) for routine assessment.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}