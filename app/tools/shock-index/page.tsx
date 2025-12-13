"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function ShockIndexCalculator() {
  const [heartRate, setHeartRate] = useState("");
  const [systolicBP, setSystolicBP] = useState("");

  const calculateShockIndex = () => {
    if (!heartRate || !systolicBP) return null;
    
    const hr = parseFloat(heartRate);
    const sbp = parseFloat(systolicBP);
    
    if (hr <= 0 || sbp <= 0) return null;
    
    return Math.round((hr / sbp) * 100) / 100;
  };

  const getInterpretation = (si: number) => {
    if (si < 0.5) {
      return { 
        text: "Low shock index - May indicate bradycardia or hypertension", 
        color: 'yellow' as const,
        risk: "Low",
        action: "Monitor for underlying causes"
      };
    } else if (si <= 0.7) {
      return { 
        text: "Normal shock index - Stable hemodynamics", 
        color: 'green' as const,
        risk: "Low",
        action: "Continue routine monitoring"
      };
    } else if (si <= 1.0) {
      return { 
        text: "Elevated shock index - Early shock or volume depletion", 
        color: 'yellow' as const,
        risk: "Moderate",
        action: "Consider fluid resuscitation, investigate causes"
      };
    } else if (si <= 1.3) {
      return { 
        text: "High shock index - Significant hemodynamic instability", 
        color: 'red' as const,
        risk: "High",
        action: "Immediate intervention required - IV access, fluids, vasopressors"
      };
    } else {
      return { 
        text: "Very high shock index - Severe shock state", 
        color: 'red' as const,
        risk: "Critical",
        action: "Emergency resuscitation - consider ICU transfer"
      };
    }
  };

  const shockIndex = calculateShockIndex();
  const interpretation = shockIndex ? getInterpretation(shockIndex) : null;

  return (
    <CalculatorLayout
      title="Shock Index Calculator"
      description="Assess hemodynamic instability using heart rate and systolic blood pressure"
      icon="⚡"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Enter Vital Signs</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Heart Rate"
            value={heartRate}
            onChange={setHeartRate}
            unit="bpm"
            placeholder="80"
            step="1"
            min="30"
            max="200"
          />
          
          <InputField
            label="Systolic Blood Pressure"
            value={systolicBP}
            onChange={setSystolicBP}
            unit="mmHg"
            placeholder="120"
            step="5"
            min="60"
            max="250"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">Shock Index Formula:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div><strong>Shock Index (SI) =</strong> Heart Rate ÷ Systolic Blood Pressure</div>
            <div><strong>Normal Range:</strong> 0.5 - 0.7</div>
            <div><strong>Clinical Significance:</strong> Early indicator of hemodynamic compromise</div>
          </div>
        </div>
      </div>

      {shockIndex && interpretation && (
        <>
          <ResultCard
            title="Shock Index"
            value={shockIndex}
            interpretation={`${interpretation.risk} Risk: ${interpretation.text}`}
            color={interpretation.color}
          />
          
          <div className={`rounded-lg p-4 mb-6 ${
            interpretation.color === 'red' ? 'bg-red-50 border border-red-200' :
            interpretation.color === 'yellow' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-green-50 border border-green-200'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              interpretation.color === 'red' ? 'text-red-800' :
              interpretation.color === 'yellow' ? 'text-yellow-800' :
              'text-green-800'
            }`}>Recommended Action:</h4>
            <p className={`text-sm ${
              interpretation.color === 'red' ? 'text-red-700' :
              interpretation.color === 'yellow' ? 'text-yellow-700' :
              'text-green-700'
            }`}>
              {interpretation.action}
            </p>
          </div>
        </>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Shock Index Categories:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• <strong>{'<'}0.5:</strong> Low SI - Possible bradycardia or hypertension</div>
          <div>• <strong>0.5-0.7:</strong> Normal SI - Stable hemodynamics</div>
          <div>• <strong>0.7-1.0:</strong> Elevated SI - Early shock, consider volume depletion</div>
          <div>• <strong>1.0-1.3:</strong> High SI - Significant instability, urgent intervention</div>
          <div>• <strong>{'>'}1.3:</strong> Very high SI - Severe shock, emergency care</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Applications:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            The shock index is a simple, rapid assessment tool for detecting early hemodynamic 
            compromise before blood pressure drops significantly.
          </p>
          <p>
            <strong>Advantages:</strong> Early detection of shock, useful in trauma, sepsis, 
            and hemorrhage. Can identify patients who need urgent intervention.
          </p>
          <p>
            <strong>Limitations:</strong> Not specific for cause of shock. Consider clinical 
            context, other vital signs, and patient symptoms for complete assessment.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}