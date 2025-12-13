"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function QtcCalculator() {
  const [qtInterval, setQtInterval] = useState("");
  const [rrInterval, setRrInterval] = useState("");

  const calculateQtc = () => {
    if (!qtInterval || !rrInterval) return null;
    
    const qt = parseFloat(qtInterval);
    const rr = parseFloat(rrInterval);
    
    if (qt <= 0 || rr <= 0) return null;
    
    // Bazett formula: QTc = QT / √RR
    const qtc = qt / Math.sqrt(rr);
    return Math.round(qtc * 10) / 10;
  };

  const getInterpretation = (qtc: number) => {
    if (qtc < 350) {
      return { text: "Short QTc interval - may indicate hypercalcemia or other conditions", color: 'yellow' as const };
    } else if (qtc <= 440) {
      return { text: "Normal QTc interval", color: 'green' as const };
    } else if (qtc <= 470) {
      return { text: "Borderline prolonged QTc interval - monitor closely", color: 'yellow' as const };
    } else {
      return { text: "Prolonged QTc interval - increased risk of torsades de pointes", color: 'red' as const };
    }
  };

  const qtcResult = calculateQtc();
  const interpretation = qtcResult ? getInterpretation(qtcResult) : null;

  return (
    <CalculatorLayout
      title="QTc Calculator"
      description="Calculate corrected QT interval using the Bazett formula to assess cardiac repolarization"
      icon="📊"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Enter Measurements</h3>
        
        <InputField
          label="QT Interval"
          value={qtInterval}
          onChange={setQtInterval}
          unit="ms"
          placeholder="360"
          step="1"
          min="200"
          max="800"
        />
        
        <InputField
          label="RR Interval"
          value={rrInterval}
          onChange={setRrInterval}
          unit="seconds"
          placeholder="0.8"
          step="0.01"
          min="0.3"
          max="2.0"
        />

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">How to measure:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• QT interval: From start of QRS complex to end of T wave</li>
            <li>• RR interval: Time between consecutive R waves (in seconds)</li>
            <li>• Use lead II or V5 for best measurements</li>
          </ul>
        </div>
      </div>

      {qtcResult && interpretation && (
        <ResultCard
          title="QTc Result"
          value={qtcResult}
          unit="ms"
          interpretation={interpretation.text}
          color={interpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Reference Values:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• Normal: 350-440 ms (men), 350-460 ms (women)</div>
          <div>• Borderline: 441-470 ms (men), 461-480 ms (women)</div>
          <div>• Prolonged: {'>'}470 ms (men), {'>'}480 ms (women)</div>
          <div>• Short: {'<'}350 ms</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Significance:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            The QTc (corrected QT) interval represents the duration of ventricular 
            depolarization and repolarization, corrected for heart rate using the Bazett formula.
          </p>
          <p>
            Prolonged QTc intervals are associated with increased risk of torsades de pointes, 
            a potentially fatal ventricular arrhythmia. Common causes include medications, 
            electrolyte imbalances, and congenital long QT syndrome.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}