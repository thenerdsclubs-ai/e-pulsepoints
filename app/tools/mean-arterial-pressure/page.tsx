"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function MeanArterialPressureCalculator() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const calculateMAP = () => {
    if (!systolic || !diastolic) return null;
    
    const sbp = parseFloat(systolic);
    const dbp = parseFloat(diastolic);
    
    if (sbp <= 0 || dbp <= 0 || sbp <= dbp) return null;
    
    // MAP formula: (SBP + 2 × DBP) / 3
    const map = (sbp + 2 * dbp) / 3;
    return Math.round(map * 10) / 10;
  };

  const getInterpretation = (map: number) => {
    if (map < 60) {
      return { 
        text: "Low MAP - may indicate hypotension, risk of inadequate organ perfusion", 
        color: 'red' as const 
      };
    } else if (map <= 70) {
      return { 
        text: "Low-normal MAP - monitor closely, especially in critically ill patients", 
        color: 'yellow' as const 
      };
    } else if (map <= 100) {
      return { 
        text: "Normal MAP - adequate for organ perfusion in most patients", 
        color: 'green' as const 
      };
    } else if (map <= 110) {
      return { 
        text: "High-normal MAP - may be acceptable in certain conditions", 
        color: 'yellow' as const 
      };
    } else {
      return { 
        text: "High MAP - may indicate hypertension, consider treatment", 
        color: 'red' as const 
      };
    }
  };

  const mapResult = calculateMAP();
  const interpretation = mapResult ? getInterpretation(mapResult) : null;

  return (
    <CalculatorLayout
      title="Mean Arterial Pressure Calculator"
      description="Calculate MAP to assess perfusion pressure and cardiovascular status"
      icon="🩺"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Blood Pressure Measurements</h3>
        
        <InputField
          label="Systolic Blood Pressure"
          value={systolic}
          onChange={setSystolic}
          unit="mmHg"
          placeholder="120"
          step="1"
          min="70"
          max="250"
        />
        
        <InputField
          label="Diastolic Blood Pressure"
          value={diastolic}
          onChange={setDiastolic}
          unit="mmHg"
          placeholder="80"
          step="1"
          min="40"
          max="150"
        />

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">How to measure:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use properly sized blood pressure cuff</li>
            <li>• Patient should be seated and relaxed</li>
            <li>• Take measurement after 5 minutes of rest</li>
            <li>• Formula: MAP = (SBP + 2 × DBP) ÷ 3</li>
          </ul>
        </div>
      </div>

      {mapResult && interpretation && (
        <ResultCard
          title="Mean Arterial Pressure"
          value={mapResult}
          unit="mmHg"
          interpretation={interpretation.text}
          color={interpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">MAP Target Ranges:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• Normal adults: 70-100 mmHg</div>
          <div>• Critically ill: ≥65 mmHg (general target)</div>
          <div>• Septic shock: ≥65 mmHg initial target</div>
          <div>• Traumatic brain injury: 80-110 mmHg</div>
          <div>• Pregnancy: 70-100 mmHg</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Significance:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            Mean Arterial Pressure (MAP) represents the average pressure in arteries during 
            one cardiac cycle and is a key indicator of perfusion pressure to vital organs.
          </p>
          <p>
            MAP is more representative of perfusion pressure than systolic pressure alone 
            because diastole accounts for 2/3 of the cardiac cycle. A MAP ≥60-65 mmHg is 
            generally required for adequate organ perfusion.
          </p>
          <p>
            In critical care, MAP is often used as a target for vasopressor therapy and 
            hemodynamic management, particularly in shock states and organ dysfunction.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}