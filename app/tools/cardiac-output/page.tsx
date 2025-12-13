"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function CardiacOutputCalculator() {
  const [heartRate, setHeartRate] = useState("");
  const [strokeVolume, setStrokeVolume] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const calculateCardiacOutput = () => {
    if (!heartRate || !strokeVolume) return null;
    
    const hr = parseFloat(heartRate);
    const sv = parseFloat(strokeVolume);
    
    if (hr <= 0 || sv <= 0) return null;
    
    // CO = HR × SV (in L/min)
    return (hr * sv) / 1000;
  };

  const calculateBSA = () => {
    if (!weight || !height) return null;
    
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (w <= 0 || h <= 0) return null;
    
    // Mosteller formula: BSA = √((height × weight) / 3600)
    return Math.sqrt((h * w) / 3600);
  };

  const calculateCardiacIndex = () => {
    const co = calculateCardiacOutput();
    const bsa = calculateBSA();
    
    if (!co || !bsa) return null;
    
    return co / bsa;
  };

  const getCardiacOutputInterpretation = (co: number) => {
    if (co < 4.0) {
      return { 
        text: "Low cardiac output - May indicate heart failure, cardiogenic shock", 
        color: 'red' as const 
      };
    } else if (co <= 8.0) {
      return { 
        text: "Normal cardiac output", 
        color: 'green' as const 
      };
    } else {
      return { 
        text: "High cardiac output - May indicate hyperthyroidism, sepsis, anemia", 
        color: 'yellow' as const 
      };
    }
  };

  const getCardiacIndexInterpretation = (ci: number) => {
    if (ci < 2.5) {
      return { 
        text: "Low cardiac index - Cardiogenic shock or severe heart failure", 
        color: 'red' as const 
      };
    } else if (ci <= 4.0) {
      return { 
        text: "Normal cardiac index", 
        color: 'green' as const 
      };
    } else {
      return { 
        text: "High cardiac index - Hyperdynamic state", 
        color: 'yellow' as const 
      };
    }
  };

  const cardiacOutput = calculateCardiacOutput();
  const bsa = calculateBSA();
  const cardiacIndex = calculateCardiacIndex();
  
  const coInterpretation = cardiacOutput ? getCardiacOutputInterpretation(cardiacOutput) : null;
  const ciInterpretation = cardiacIndex ? getCardiacIndexInterpretation(cardiacIndex) : null;

  return (
    <CalculatorLayout
      title="Cardiac Output Calculator"
      description="Estimate cardiac output using heart rate and stroke volume"
      icon="❤️‍🔥"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Enter Measurements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Heart Rate"
            value={heartRate}
            onChange={setHeartRate}
            unit="bpm"
            placeholder="70"
            step="1"
            min="30"
            max="200"
          />
          
          <InputField
            label="Stroke Volume"
            value={strokeVolume}
            onChange={setStrokeVolume}
            unit="mL"
            placeholder="70"
            step="5"
            min="20"
            max="150"
          />
          
          <InputField
            label="Weight (for Cardiac Index)"
            value={weight}
            onChange={setWeight}
            unit="kg"
            placeholder="70"
            step="1"
            min="30"
            max="200"
          />
          
          <InputField
            label="Height (for Cardiac Index)"
            value={height}
            onChange={setHeight}
            unit="cm"
            placeholder="170"
            step="1"
            min="100"
            max="220"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-900 mb-2">Formulas:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div><strong>Cardiac Output (CO) =</strong> Heart Rate × Stroke Volume</div>
            <div><strong>Cardiac Index (CI) =</strong> Cardiac Output ÷ Body Surface Area</div>
            <div><strong>Normal CO:</strong> 4.0-8.0 L/min</div>
            <div><strong>Normal CI:</strong> 2.5-4.0 L/min/m²</div>
          </div>
        </div>
      </div>

      {cardiacOutput && coInterpretation && (
        <ResultCard
          title="Cardiac Output"
          value={Math.round(cardiacOutput * 100) / 100}
          unit="L/min"
          interpretation={coInterpretation.text}
          color={coInterpretation.color}
        />
      )}

      {bsa && (
        <ResultCard
          title="Body Surface Area"
          value={Math.round(bsa * 100) / 100}
          unit="m²"
          interpretation="Calculated using Mosteller formula"
          color="green"
        />
      )}

      {cardiacIndex && ciInterpretation && (
        <ResultCard
          title="Cardiac Index"
          value={Math.round(cardiacIndex * 100) / 100}
          unit="L/min/m²"
          interpretation={ciInterpretation.text}
          color={ciInterpretation.color}
        />
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Clinical Classifications:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• <strong>Low CO ({'<'}4.0 L/min):</strong> Heart failure, cardiogenic shock</div>
          <div>• <strong>Normal CO (4.0-8.0 L/min):</strong> Adequate circulation</div>
          <div>• <strong>High CO ({'>'}8.0 L/min):</strong> Hyperdynamic state, fever, sepsis</div>
          <div>• <strong>Low CI ({'<'}2.5 L/min/m²):</strong> Severe cardiac dysfunction</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Applications:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            Cardiac output assessment is crucial for hemodynamic monitoring, 
            heart failure management, and critical care decision making.
          </p>
          <p>
            Cardiac index normalizes for body size and is preferred for comparing 
            cardiac function between patients of different sizes.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}