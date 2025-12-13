"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function HeartRateCalculator() {
  const [method, setMethod] = useState<'rr' | 'squares'>('rr');
  const [rrInterval, setRrInterval] = useState("");
  const [largeSquares, setLargeSquares] = useState("");

  const calculateHeartRate = () => {
    if (method === 'rr') {
      if (!rrInterval) return null;
      const rr = parseFloat(rrInterval);
      if (rr <= 0) return null;
      return Math.round(60 / rr);
    } else {
      if (!largeSquares) return null;
      const squares = parseFloat(largeSquares);
      if (squares <= 0) return null;
      return Math.round(300 / squares);
    }
  };

  const getInterpretation = (hr: number) => {
    if (hr < 60) {
      return { text: "Bradycardia - heart rate below normal range", color: 'yellow' as const };
    } else if (hr <= 100) {
      return { text: "Normal heart rate", color: 'green' as const };
    } else if (hr <= 150) {
      return { text: "Tachycardia - heart rate above normal range", color: 'yellow' as const };
    } else {
      return { text: "Severe tachycardia - requires immediate evaluation", color: 'red' as const };
    }
  };

  const heartRate = calculateHeartRate();
  const interpretation = heartRate ? getInterpretation(heartRate) : null;

  return (
    <CalculatorLayout
      title="Heart Rate Calculator"
      description="Calculate heart rate from RR interval or ECG paper squares using standard methods"
      icon="❤️"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Calculation Method</h3>
        
        <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setMethod('rr')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              method === 'rr' 
                ? 'bg-white shadow text-blue-600' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            RR Interval Method
          </button>
          <button
            onClick={() => setMethod('squares')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              method === 'squares' 
                ? 'bg-white shadow text-blue-600' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Large Squares Method
          </button>
        </div>

        {method === 'rr' ? (
          <>
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
              <h4 className="font-semibold text-blue-900 mb-2">RR Interval Method:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Measure time between consecutive R waves</li>
                <li>• Formula: Heart Rate = 60 ÷ RR interval (seconds)</li>
                <li>• Most accurate for irregular rhythms</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <InputField
              label="Number of Large Squares"
              value={largeSquares}
              onChange={setLargeSquares}
              unit="squares"
              placeholder="4"
              step="0.1"
              min="0.5"
              max="15"
            />
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Large Squares Method:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Count large squares between R waves</li>
                <li>• Formula: Heart Rate = 300 ÷ number of large squares</li>
                <li>• Each large square = 0.2 seconds at 25mm/s</li>
                <li>• Quick method for regular rhythms</li>
              </ul>
            </div>
          </>
        )}
      </div>

      {heartRate && interpretation && (
        <ResultCard
          title="Heart Rate"
          value={heartRate}
          unit="bpm"
          interpretation={interpretation.text}
          color={interpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Normal Heart Rate Ranges:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• Adults: 60-100 bpm (resting)</div>
          <div>• Athletes: 40-60 bpm (resting)</div>
          <div>• Elderly: 50-100 bpm</div>
          <div>• Children (1-10 years): 70-120 bpm</div>
          <div>• Infants: 100-160 bpm</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Additional Methods:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <div><strong>6-second method:</strong> Count complexes in 6 seconds × 10</div>
          <div><strong>Small squares method:</strong> 1500 ÷ small squares between R waves</div>
          <div><strong>Sequence method:</strong> 300, 150, 100, 75, 60, 50 (for 1, 2, 3, 4, 5, 6 large squares)</div>
        </div>
      </div>
    </CalculatorLayout>
  );
}