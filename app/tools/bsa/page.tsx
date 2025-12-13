"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function BsaCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [formula, setFormula] = useState<'mosteller' | 'dubois' | 'haycock'>('mosteller');

  const calculateBSA = () => {
    if (!weight || !height) return null;
    
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (w <= 0 || h <= 0) return null;
    
    let bsa;
    
    switch (formula) {
      case 'mosteller':
        // BSA = √((height × weight) / 3600)
        bsa = Math.sqrt((h * w) / 3600);
        break;
      case 'dubois':
        // BSA = 0.007184 × height^0.725 × weight^0.425
        bsa = 0.007184 * Math.pow(h, 0.725) * Math.pow(w, 0.425);
        break;
      case 'haycock':
        // BSA = 0.024265 × height^0.3964 × weight^0.5378
        bsa = 0.024265 * Math.pow(h, 0.3964) * Math.pow(w, 0.5378);
        break;
      default:
        return null;
    }
    
    return Math.round(bsa * 100) / 100;
  };

  const getInterpretation = (bsa: number) => {
    if (bsa < 1.0) {
      return { 
        text: "Small body surface area - Pediatric or very small adult", 
        color: 'yellow' as const 
      };
    } else if (bsa <= 2.0) {
      return { 
        text: "Normal body surface area range for adults", 
        color: 'green' as const 
      };
    } else if (bsa <= 2.5) {
      return { 
        text: "Large body surface area - Tall or obese individual", 
        color: 'yellow' as const 
      };
    } else {
      return { 
        text: "Very large body surface area - Extreme obesity", 
        color: 'red' as const 
      };
    }
  };

  const bsa = calculateBSA();
  const interpretation = bsa ? getInterpretation(bsa) : null;

  const getFormulaName = () => {
    switch (formula) {
      case 'mosteller': return 'Mosteller Formula';
      case 'dubois': return 'DuBois & DuBois Formula';
      case 'haycock': return 'Haycock Formula';
      default: return '';
    }
  };

  return (
    <CalculatorLayout
      title="Body Surface Area (BSA) Calculator"
      description="Calculate body surface area using the Mosteller formula"
      icon="📏"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Enter Measurements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Weight"
            value={weight}
            onChange={setWeight}
            unit="kg"
            placeholder="70"
            step="1"
            min="5"
            max="300"
          />
          
          <InputField
            label="Height"
            value={height}
            onChange={setHeight}
            unit="cm"
            placeholder="170"
            step="1"
            min="50"
            max="250"
          />
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">Formula Selection</label>
          <div className="space-y-2">
            {[
              { value: 'mosteller', label: 'Mosteller (Recommended)', description: 'Most commonly used, simple and accurate' },
              { value: 'dubois', label: 'DuBois & DuBois', description: 'Historical formula, complex calculation' },
              { value: 'haycock', label: 'Haycock', description: 'Alternative formula for research' }
            ].map((option) => (
              <label key={option.value} className="flex items-start">
                <input
                  type="radio"
                  value={option.value}
                  checked={formula === option.value}
                  onChange={() => setFormula(option.value as any)}
                  className="mr-3 mt-1"
                />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-slate-600">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">{getFormulaName()}:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {formula === 'mosteller' && (
              <div><strong>BSA (m²) =</strong> √((Height × Weight) ÷ 3600)</div>
            )}
            {formula === 'dubois' && (
              <div><strong>BSA (m²) =</strong> 0.007184 × Height^0.725 × Weight^0.425</div>
            )}
            {formula === 'haycock' && (
              <div><strong>BSA (m²) =</strong> 0.024265 × Height^0.3964 × Weight^0.5378</div>
            )}
            <div><strong>Average Adult BSA:</strong> 1.7 m² (range 1.5-2.0 m²)</div>
          </div>
        </div>
      </div>

      {bsa && interpretation && (
        <ResultCard
          title="Body Surface Area"
          value={bsa}
          unit="m²"
          interpretation={`${getFormulaName()}: ${interpretation.text}`}
          color={interpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Clinical Applications:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• <strong>Chemotherapy dosing:</strong> Most cancer drugs dosed per m²</div>
          <div>• <strong>Cardiac index:</strong> CO/BSA for normalized cardiac output</div>
          <div>• <strong>Burn assessment:</strong> Percentage of BSA burned</div>
          <div>• <strong>Renal function:</strong> GFR normalized to 1.73 m²</div>
          <div>• <strong>Medication dosing:</strong> Pediatric and high-risk drugs</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Formula Comparison:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            <strong>Mosteller:</strong> Simplest and most widely used. Recommended by 
            most medical organizations for clinical use.
          </p>
          <p>
            <strong>DuBois:</strong> First published BSA formula (1916). More complex 
            but historically significant.
          </p>
          <p>
            <strong>Haycock:</strong> Alternative formula that may be more accurate 
            for very obese patients.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}