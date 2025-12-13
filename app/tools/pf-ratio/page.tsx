"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function PfRatioCalculator() {
  const [pao2, setPao2] = useState("");
  const [fio2, setFio2] = useState("");

  const calculatePfRatio = () => {
    if (!pao2 || !fio2) return null;
    
    const pao2Value = parseFloat(pao2);
    let fio2Value = parseFloat(fio2);
    
    if (pao2Value <= 0 || fio2Value <= 0) return null;
    
    // Convert FiO2 percentage to decimal if needed
    if (fio2Value > 1) {
      fio2Value = fio2Value / 100;
    }
    
    if (fio2Value > 1) return null;
    
    return Math.round(pao2Value / fio2Value);
  };

  const getInterpretation = (pfRatio: number) => {
    if (pfRatio >= 400) {
      return { 
        text: "Normal oxygenation - No acute lung injury", 
        color: 'green' as const,
        severity: "Normal"
      };
    } else if (pfRatio >= 300) {
      return { 
        text: "Mild acute lung injury - Monitor closely", 
        color: 'yellow' as const,
        severity: "Mild ALI"
      };
    } else if (pfRatio >= 200) {
      return { 
        text: "Moderate ARDS - Requires intensive monitoring and treatment", 
        color: 'yellow' as const,
        severity: "Moderate ARDS"
      };
    } else if (pfRatio >= 100) {
      return { 
        text: "Severe ARDS - Critical condition requiring immediate intervention", 
        color: 'red' as const,
        severity: "Severe ARDS"
      };
    } else {
      return { 
        text: "Critical oxygenation failure - Life-threatening condition", 
        color: 'red' as const,
        severity: "Critical"
      };
    }
  };

  const pfRatio = calculatePfRatio();
  const interpretation = pfRatio ? getInterpretation(pfRatio) : null;

  return (
    <CalculatorLayout
      title="PaO₂ / FiO₂ Ratio"
      description="Assess oxygenation status and classify ARDS severity"
      icon="🫁"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Enter Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="PaO₂ (Arterial Oxygen Pressure)"
            value={pao2}
            onChange={setPao2}
            unit="mmHg"
            placeholder="100"
            step="1"
            min="30"
            max="600"
          />
          
          <InputField
            label="FiO₂ (Fraction of Inspired Oxygen)"
            value={fio2}
            onChange={setFio2}
            unit="(0.21-1.0 or 21-100%)"
            placeholder="0.21 or 21"
            step="0.01"
            min="0.21"
            max="100"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">How to measure:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div>• <strong>PaO₂:</strong> From arterial blood gas analysis</div>
            <div>• <strong>FiO₂:</strong> Set oxygen concentration (21% = room air, 100% = pure oxygen)</div>
            <div>• <strong>Formula:</strong> P/F Ratio = PaO₂ ÷ FiO₂</div>
            <div>• <strong>Normal:</strong> {'>'}400 mmHg (on room air ≈ 400-500)</div>
          </div>
        </div>
      </div>

      {pfRatio && interpretation && (
        <ResultCard
          title="P/F Ratio"
          value={pfRatio}
          unit="mmHg"
          interpretation={`${interpretation.severity}: ${interpretation.text}`}
          color={interpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">ARDS Classification (Berlin Definition):</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• <strong>Normal:</strong> {'>'} 400 mmHg</div>
          <div>• <strong>Mild ALI:</strong> 300-399 mmHg</div>
          <div>• <strong>Mild ARDS:</strong> 201-300 mmHg</div>
          <div>• <strong>Moderate ARDS:</strong> 101-200 mmHg</div>
          <div>• <strong>Severe ARDS:</strong> ≤ 100 mmHg</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Significance:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            The P/F ratio is a key indicator of oxygenation efficiency and lung function. 
            It helps classify severity of acute respiratory distress syndrome (ARDS) and guides treatment decisions.
          </p>
          <p>
            Lower ratios indicate more severe impairment and may require advanced interventions 
            such as high PEEP, prone positioning, or ECMO therapy.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}