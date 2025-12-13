"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function AnionGapCalculator() {
  const [sodium, setSodium] = useState("");
  const [chloride, setChloride] = useState("");
  const [bicarbonate, setBicarbonate] = useState("");
  const [albumin, setAlbumin] = useState("");

  const calculateAnionGap = () => {
    if (!sodium || !chloride || !bicarbonate) return null;
    
    const na = parseFloat(sodium);
    const cl = parseFloat(chloride);
    const hco3 = parseFloat(bicarbonate);
    
    if (na <= 0 || cl <= 0 || hco3 <= 0) return null;
    
    return na - (cl + hco3);
  };

  const calculateCorrectedAnionGap = () => {
    const ag = calculateAnionGap();
    if (!ag || !albumin) return null;
    
    const albValue = parseFloat(albumin);
    if (albValue <= 0) return null;
    
    // Correction: Add 2.5 for each g/dL that albumin is below 4.0
    const correction = (4.0 - albValue) * 2.5;
    return ag + correction;
  };

  const getInterpretation = (anionGap: number, isCorrected: boolean = false) => {
    if (anionGap < 8) {
      return { 
        text: isCorrected ? "Low corrected anion gap" : "Low anion gap - consider laboratory error, hypoalbuminemia, or multiple myeloma", 
        color: 'yellow' as const 
      };
    } else if (anionGap <= 16) {
      return { 
        text: isCorrected ? "Normal corrected anion gap" : "Normal anion gap", 
        color: 'green' as const 
      };
    } else {
      return { 
        text: isCorrected ? "Elevated corrected anion gap acidosis" : "Elevated anion gap acidosis - investigate MUDPILES causes", 
        color: 'red' as const 
      };
    }
  };

  const anionGap = calculateAnionGap();
  const correctedAnionGap = calculateCorrectedAnionGap();
  const interpretation = anionGap ? getInterpretation(anionGap) : null;
  const correctedInterpretation = correctedAnionGap ? getInterpretation(correctedAnionGap, true) : null;

  return (
    <CalculatorLayout
      title="Anion Gap Calculator"
      description="Calculate anion gap and classify high-gap vs normal-gap metabolic acidosis"
      icon="🔬"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Enter Laboratory Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Sodium (Na⁺)"
            value={sodium}
            onChange={setSodium}
            unit="mEq/L"
            placeholder="140"
            step="1"
            min="120"
            max="160"
          />
          
          <InputField
            label="Chloride (Cl⁻)"
            value={chloride}
            onChange={setChloride}
            unit="mEq/L"
            placeholder="100"
            step="1"
            min="80"
            max="120"
          />
          
          <InputField
            label="Bicarbonate (HCO₃⁻)"
            value={bicarbonate}
            onChange={setBicarbonate}
            unit="mEq/L"
            placeholder="24"
            step="1"
            min="5"
            max="40"
          />
          
          <InputField
            label="Albumin (optional)"
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
          <h4 className="font-semibold text-blue-900 mb-2">Formula & Normal Values:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div><strong>Anion Gap =</strong> Na⁺ - (Cl⁻ + HCO₃⁻)</div>
            <div><strong>Normal Range:</strong> 8-16 mEq/L</div>
            <div><strong>Albumin Correction:</strong> Add 2.5 for each g/dL below 4.0</div>
          </div>
        </div>
      </div>

      {anionGap && interpretation && (
        <ResultCard
          title="Anion Gap"
          value={anionGap}
          unit="mEq/L"
          interpretation={interpretation.text}
          color={interpretation.color}
        />
      )}

      {correctedAnionGap && correctedInterpretation && (
        <ResultCard
          title="Corrected Anion Gap"
          value={Math.round(correctedAnionGap * 10) / 10}
          unit="mEq/L"
          interpretation={correctedInterpretation.text}
          color={correctedInterpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">High Anion Gap Causes (MUDPILES):</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• <strong>M</strong>ethanol, Metformin</div>
          <div>• <strong>U</strong>remia</div>
          <div>• <strong>D</strong>iabetic ketoacidosis, Alcoholic ketoacidosis</div>
          <div>• <strong>P</strong>ropylene glycol, Phenformin</div>
          <div>• <strong>I</strong>soniazid, Iron, Ibuprofen</div>
          <div>• <strong>L</strong>actic acidosis</div>
          <div>• <strong>E</strong>thylene glycol</div>
          <div>• <strong>S</strong>alicylates, Starvation ketosis</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Significance:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            The anion gap helps distinguish between different types of metabolic acidosis 
            and guides diagnostic workup and treatment decisions.
          </p>
          <p>
            Albumin correction is important because hypoalbuminemia can mask an elevated 
            anion gap, leading to missed diagnoses of serious conditions.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}