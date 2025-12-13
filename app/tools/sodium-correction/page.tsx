"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function SodiumCorrectionCalculator() {
  const [sodium, setSodium] = useState("");
  const [glucose, setGlucose] = useState("");

  const calculateCorrectedSodium = () => {
    if (!sodium || !glucose) return null;
    
    const naValue = parseFloat(sodium);
    const glucoseValue = parseFloat(glucose);
    
    if (naValue <= 0 || glucoseValue <= 0) return null;
    
    // Formula: Corrected Na = Measured Na + 0.016 × (Glucose - 100)
    // Alternative: Add 1.6 mEq/L for every 100 mg/dL glucose above 100
    const correction = 0.016 * (glucoseValue - 100);
    const correctedSodium = naValue + correction;
    
    return Math.round(correctedSodium * 10) / 10;
  };

  const getInterpretation = (sodium: number, isCorrected: boolean = false) => {
    const prefix = isCorrected ? "Corrected sodium" : "Measured sodium";
    
    if (sodium < 135) {
      return { 
        text: `${prefix}: Hyponatremia - Risk of cerebral edema, seizures`, 
        color: 'red' as const 
      };
    } else if (sodium <= 145) {
      return { 
        text: `${prefix}: Normal range`, 
        color: 'green' as const 
      };
    } else {
      return { 
        text: `${prefix}: Hypernatremia - Risk of dehydration, altered mental status`, 
        color: 'red' as const 
      };
    }
  };

  const correctedSodium = calculateCorrectedSodium();
  const measuredInterpretation = sodium ? getInterpretation(parseFloat(sodium)) : null;
  const correctedInterpretation = correctedSodium ? getInterpretation(correctedSodium, true) : null;

  return (
    <CalculatorLayout
      title="Sodium Correction in Hyperglycemia"
      description="Calculate corrected sodium levels in hyperglycemic states"
      icon="🍯"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Enter Laboratory Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Measured Serum Sodium"
            value={sodium}
            onChange={setSodium}
            unit="mEq/L"
            placeholder="140"
            step="1"
            min="120"
            max="160"
          />
          
          <InputField
            label="Serum Glucose"
            value={glucose}
            onChange={setGlucose}
            unit="mg/dL"
            placeholder="300"
            step="10"
            min="70"
            max="1000"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">Why Correction is Needed:</h4>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• High glucose draws water from cells, diluting sodium</p>
            <p>• Measured sodium appears falsely low in hyperglycemia</p>
            <p>• <strong>Formula:</strong> Corrected Na = Measured Na + 0.016 × (Glucose - 100)</p>
            <p>• <strong>Normal sodium:</strong> 135-145 mEq/L</p>
          </div>
        </div>
      </div>

      {sodium && measuredInterpretation && (
        <ResultCard
          title="Measured Serum Sodium"
          value={parseFloat(sodium)}
          unit="mEq/L"
          interpretation={measuredInterpretation.text}
          color={measuredInterpretation.color}
        />
      )}

      {correctedSodium && correctedInterpretation && (
        <ResultCard
          title="Corrected Sodium"
          value={correctedSodium}
          unit="mEq/L"
          interpretation={correctedInterpretation.text}
          color={correctedInterpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Clinical Examples:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• Patient with DKA: Glucose 400 mg/dL, Na 132 mEq/L</div>
          <div>• Correction: 132 + 0.016 × (400-100) = 136.8 mEq/L</div>
          <div>• True sodium status is normal, not hyponatremic</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Significance:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            Corrected sodium prevents misdiagnosis of hyponatremia in hyperglycemic patients 
            and guides appropriate fluid and electrolyte management.
          </p>
          <p>
            Essential in diabetic ketoacidosis (DKA) and hyperosmolar hyperglycemic state (HHS) 
            to avoid inappropriate treatment of pseudohyponatremia.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}