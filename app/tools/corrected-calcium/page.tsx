"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function CorrectedCalciumCalculator() {
  const [totalCalcium, setTotalCalcium] = useState("");
  const [albumin, setAlbumin] = useState("");

  const calculateCorrectedCalcium = () => {
    if (!totalCalcium || !albumin) return null;
    
    const ca = parseFloat(totalCalcium);
    const alb = parseFloat(albumin);
    
    if (ca <= 0 || alb <= 0) return null;
    
    // Formula: Corrected Ca = Total Ca + 0.8 × (4.0 - Albumin)
    const correctedCa = ca + 0.8 * (4.0 - alb);
    return Math.round(correctedCa * 100) / 100;
  };

  const getCalciumInterpretation = (calcium: number, isCorrected: boolean = false) => {
    const prefix = isCorrected ? "Corrected calcium" : "Total calcium";
    
    if (calcium < 8.5) {
      return { 
        text: `${prefix}: Hypocalcemia - Risk of tetany, seizures, cardiac arrhythmias`, 
        color: 'red' as const 
      };
    } else if (calcium <= 10.5) {
      return { 
        text: `${prefix}: Normal range`, 
        color: 'green' as const 
      };
    } else if (calcium <= 12.0) {
      return { 
        text: `${prefix}: Mild hypercalcemia - Monitor for symptoms`, 
        color: 'yellow' as const 
      };
    } else {
      return { 
        text: `${prefix}: Severe hypercalcemia - Risk of cardiac arrest, coma`, 
        color: 'red' as const 
      };
    }
  };

  const correctedCalcium = calculateCorrectedCalcium();
  const totalCaInterpretation = totalCalcium ? getCalciumInterpretation(parseFloat(totalCalcium)) : null;
  const correctedInterpretation = correctedCalcium ? getCalciumInterpretation(correctedCalcium, true) : null;

  return (
    <CalculatorLayout
      title="Corrected Calcium Calculator"
      description="Adjust serum calcium based on albumin level for accurate interpretation"
      icon="🦴"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Enter Laboratory Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Total Serum Calcium"
            value={totalCalcium}
            onChange={setTotalCalcium}
            unit="mg/dL"
            placeholder="10.0"
            step="0.1"
            min="5.0"
            max="15.0"
          />
          
          <InputField
            label="Serum Albumin"
            value={albumin}
            onChange={setAlbumin}
            unit="g/dL"
            placeholder="4.0"
            step="0.1"
            min="1.0"
            max="6.0"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">Why Correction is Needed:</h4>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• About 40% of serum calcium is bound to albumin</p>
            <p>• Low albumin leads to falsely low total calcium levels</p>
            <p>• <strong>Formula:</strong> Corrected Ca = Total Ca + 0.8 × (4.0 - Albumin)</p>
            <p>• <strong>Normal corrected calcium:</strong> 8.5 - 10.5 mg/dL</p>
          </div>
        </div>
      </div>

      {totalCalcium && totalCaInterpretation && (
        <ResultCard
          title="Total Serum Calcium"
          value={parseFloat(totalCalcium)}
          unit="mg/dL"
          interpretation={totalCaInterpretation.text}
          color={totalCaInterpretation.color}
        />
      )}

      {correctedCalcium && correctedInterpretation && (
        <ResultCard
          title="Corrected Calcium"
          value={correctedCalcium}
          unit="mg/dL"
          interpretation={correctedInterpretation.text}
          color={correctedInterpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Hypocalcemia Symptoms:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• Paresthesias (fingers, toes, perioral)</div>
          <div>• Muscle cramps and tetany</div>
          <div>• Chvostek and Trousseau signs</div>
          <div>• Seizures, laryngospasm</div>
          <div>• QT prolongation, cardiac arrhythmias</div>
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-rose-800 mb-2">Hypercalcemia Symptoms:</h4>
        <div className="text-sm text-rose-700 space-y-1">
          <div>• "Stones, bones, groans, psychiatric moans"</div>
          <div>• Kidney stones, bone pain</div>
          <div>• Nausea, vomiting, constipation</div>
          <div>• Confusion, depression, psychosis</div>
          <div>• QT shortening, cardiac arrhythmias</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Significance:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            Corrected calcium provides a more accurate assessment of calcium status, 
            especially in patients with hypoalbuminemia (liver disease, malnutrition, critical illness).
          </p>
          <p>
            When albumin is low, uncorrected calcium may appear normal while the patient 
            actually has hypocalcemia requiring treatment.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}