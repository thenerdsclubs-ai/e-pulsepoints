"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import { ResultCard } from "@/app/components/calculators/InputField";

export default function EcgAxisCalculator() {
  const [leadI, setLeadI] = useState<'positive' | 'negative' | 'equiphasic' | ''>('');
  const [leadAVF, setLeadAVF] = useState<'positive' | 'negative' | 'equiphasic' | ''>('');

  const calculateAxis = () => {
    if (!leadI || !leadAVF) return null;
    
    if (leadI === 'positive' && leadAVF === 'positive') {
      return {
        axis: 'Normal Axis',
        degrees: '0° to +90°',
        interpretation: 'Normal cardiac electrical axis',
        color: 'green' as const
      };
    } else if (leadI === 'positive' && leadAVF === 'negative') {
      return {
        axis: 'Left Axis Deviation',
        degrees: '-30° to -90°',
        interpretation: 'May indicate left anterior fascicular block, left ventricular hypertrophy, or inferior MI',
        color: 'yellow' as const
      };
    } else if (leadI === 'negative' && leadAVF === 'positive') {
      return {
        axis: 'Right Axis Deviation',
        degrees: '+90° to +180°',
        interpretation: 'May indicate right ventricular hypertrophy, pulmonary embolism, or lateral MI',
        color: 'yellow' as const
      };
    } else if (leadI === 'negative' && leadAVF === 'negative') {
      return {
        axis: 'Extreme Axis Deviation',
        degrees: '-90° to +180°',
        interpretation: 'Abnormal - consider lead misplacement, ventricular tachycardia, or severe conduction abnormalities',
        color: 'red' as const
      };
    } else if (leadI === 'equiphasic') {
      return {
        axis: 'Axis ≈ +90° or -90°',
        degrees: 'Perpendicular to Lead I',
        interpretation: leadAVF === 'positive' ? 'Right axis deviation' : 'Left axis deviation',
        color: 'yellow' as const
      };
    } else if (leadAVF === 'equiphasic') {
      return {
        axis: 'Axis ≈ 0°',
        degrees: 'Perpendicular to Lead aVF',
        interpretation: 'Normal horizontal axis',
        color: 'green' as const
      };
    }
    
    return null;
  };

  const result = calculateAxis();

  return (
    <CalculatorLayout
      title="ECG Heart Axis Calculator"
      description="Determine cardiac electrical axis using limb lead polarity"
      icon="🧭"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Lead Polarity Assessment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-slate-700 mb-3">Lead I QRS Polarity</label>
            <div className="space-y-2">
              {['positive', 'negative', 'equiphasic'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    value={option}
                    checked={leadI === option}
                    onChange={() => setLeadI(option as any)}
                    className="mr-3"
                  />
                  <span className="capitalize">{option}</span>
                  {option === 'equiphasic' && <span className="text-sm text-slate-500 ml-2">(equal positive/negative)</span>}
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-slate-700 mb-3">Lead aVF QRS Polarity</label>
            <div className="space-y-2">
              {['positive', 'negative', 'equiphasic'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    value={option}
                    checked={leadAVF === option}
                    onChange={() => setLeadAVF(option as any)}
                    className="mr-3"
                  />
                  <span className="capitalize">{option}</span>
                  {option === 'equiphasic' && <span className="text-sm text-slate-500 ml-2">(equal positive/negative)</span>}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">Quick Assessment Method:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div>1. Look at the main QRS deflection in Lead I</div>
            <div>2. Look at the main QRS deflection in Lead aVF</div>
            <div>3. Use the table below to determine axis</div>
          </div>
        </div>
      </div>

      {result && (
        <ResultCard
          title="Cardiac Axis"
          value={result.axis}
          interpretation={`${result.degrees} - ${result.interpretation}`}
          color={result.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Axis Interpretation Table:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• <strong>Normal:</strong> Lead I (+), aVF (+) → 0° to +90°</div>
          <div>• <strong>Left Deviation:</strong> Lead I (+), aVF (-) → -30° to -90°</div>
          <div>• <strong>Right Deviation:</strong> Lead I (-), aVF (+) → +90° to +180°</div>
          <div>• <strong>Extreme Deviation:</strong> Lead I (-), aVF (-) → -90° to +180°</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Significance:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            Cardiac axis reflects the overall direction of electrical depolarization 
            and can indicate various pathological conditions.
          </p>
          <p>
            <strong>Left axis deviation:</strong> Often seen in left anterior fascicular block, 
            left ventricular hypertrophy, or inferior wall MI.
          </p>
          <p>
            <strong>Right axis deviation:</strong> May indicate right heart strain, 
            pulmonary embolism, or lateral wall MI.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}