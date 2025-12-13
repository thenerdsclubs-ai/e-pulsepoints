"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function AbgInterpreter() {
  const [ph, setPh] = useState("");
  const [paco2, setPaco2] = useState("");
  const [hco3, setHco3] = useState("");
  const [na, setNa] = useState("");
  const [cl, setCl] = useState("");

  const interpretAbg = () => {
    if (!ph || !paco2 || !hco3) return null;
    
    const phValue = parseFloat(ph);
    const paco2Value = parseFloat(paco2);
    const hco3Value = parseFloat(hco3);
    
    if (phValue <= 0 || paco2Value <= 0 || hco3Value <= 0) return null;

    let interpretation = "";
    let color: 'green' | 'yellow' | 'red' = 'green';

    // Step 1: Determine primary disorder
    if (phValue < 7.35) {
      interpretation = "Acidemia - ";
      if (hco3Value < 22) {
        interpretation += "Primary Metabolic Acidosis";
        color = 'red';
      } else if (paco2Value > 45) {
        interpretation += "Primary Respiratory Acidosis";
        color = 'red';
      }
    } else if (phValue > 7.45) {
      interpretation = "Alkalemia - ";
      if (hco3Value > 26) {
        interpretation += "Primary Metabolic Alkalosis";
        color = 'yellow';
      } else if (paco2Value < 35) {
        interpretation += "Primary Respiratory Alkalosis";
        color = 'yellow';
      }
    } else {
      interpretation = "Normal pH";
      color = 'green';
    }

    // Step 2: Check for compensation
    if (phValue < 7.35 && hco3Value < 22) {
      const expectedPco2 = 1.5 * hco3Value + 8;
      if (Math.abs(paco2Value - expectedPco2) <= 2) {
        interpretation += " (Appropriately compensated)";
      } else if (paco2Value < expectedPco2) {
        interpretation += " (Overcompensated)";
      } else {
        interpretation += " (Undercompensated)";
      }
    }

    return { interpretation, color };
  };

  const calculateAnionGap = () => {
    if (!na || !cl || !hco3) return null;
    const naValue = parseFloat(na);
    const clValue = parseFloat(cl);
    const hco3Value = parseFloat(hco3);
    
    if (naValue <= 0 || clValue <= 0 || hco3Value <= 0) return null;
    
    return naValue - (clValue + hco3Value);
  };

  const result = interpretAbg();
  const anionGap = calculateAnionGap();

  return (
    <CalculatorLayout
      title="ABG Interpreter"
      description="Interpret acid-base disorders using pH, PaCO₂, and HCO₃⁻ with step-by-step logic"
      icon="💨"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Arterial Blood Gas Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="pH"
            value={ph}
            onChange={setPh}
            placeholder="7.40"
            step="0.01"
            min="6.8"
            max="7.8"
          />
          
          <InputField
            label="PaCO₂"
            value={paco2}
            onChange={setPaco2}
            unit="mmHg"
            placeholder="40"
            step="1"
            min="10"
            max="100"
          />
          
          <InputField
            label="HCO₃⁻"
            value={hco3}
            onChange={setHco3}
            unit="mEq/L"
            placeholder="24"
            step="1"
            min="5"
            max="50"
          />
          
          <InputField
            label="Sodium (Na⁺)"
            value={na}
            onChange={setNa}
            unit="mEq/L"
            placeholder="140"
            step="1"
            min="120"
            max="160"
          />
          
          <InputField
            label="Chloride (Cl⁻)"
            value={cl}
            onChange={setCl}
            unit="mEq/L"
            placeholder="100"
            step="1"
            min="80"
            max="120"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">Normal Values:</h4>
          <div className="text-sm text-blue-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div>• pH: 7.35-7.45</div>
            <div>• PaCO₂: 35-45 mmHg</div>
            <div>• HCO₃⁻: 22-26 mEq/L</div>
            <div>• Sodium: 135-145 mEq/L</div>
            <div>• Chloride: 98-107 mEq/L</div>
            <div>• Anion Gap: 8-16 mEq/L</div>
          </div>
        </div>
      </div>

      {result && (
        <ResultCard
          title="ABG Interpretation"
          value=""
          interpretation={result.interpretation}
          color={result.color}
        />
      )}

      {anionGap && (
        <ResultCard
          title="Anion Gap"
          value={anionGap}
          unit="mEq/L"
          interpretation={anionGap > 16 ? "Elevated anion gap" : anionGap < 8 ? "Low anion gap" : "Normal anion gap"}
          color={anionGap > 16 ? 'red' : anionGap < 8 ? 'yellow' : 'green'}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Systematic Approach:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>1. <strong>pH:</strong> Acidemia ({'<'}7.35), Normal (7.35-7.45), Alkalemia ({'>'}7.45)</div>
          <div>2. <strong>Primary disorder:</strong> Metabolic vs Respiratory</div>
          <div>3. <strong>Compensation:</strong> Appropriate, Over, or Under-compensated</div>
          <div>4. <strong>Anion gap:</strong> Normal (8-16) or High ({'>'}16) gap acidosis</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Context:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            Arterial blood gas interpretation is essential for evaluating acid-base status, 
            ventilation, and oxygenation in critically ill patients.
          </p>
          <p>
            Always correlate ABG results with clinical presentation, electrolytes, and 
            patient history for accurate diagnosis and management.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}