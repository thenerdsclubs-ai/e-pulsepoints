"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import { CheckboxField, ResultCard } from "@/app/components/calculators/InputField";


interface RiskFactor {
  id: string;
  label: string;
  points: number;
  description?: string;
}

const riskFactors: RiskFactor[] = [
  { id: 'chf', label: 'Congestive Heart Failure', points: 1, description: 'History of heart failure' },
  { id: 'hypertension', label: 'Hypertension', points: 1, description: 'Blood pressure >140/90 mmHg or on treatment' },
  { id: 'age75', label: 'Age ≥75 years', points: 2, description: 'Advanced age increases stroke risk' },
  { id: 'diabetes', label: 'Diabetes Mellitus', points: 1, description: 'Type 1 or Type 2 diabetes' },
  { id: 'stroke', label: 'Previous Stroke/TIA/Thromboembolism', points: 2, description: 'History of cerebrovascular events' },
  { id: 'vascular', label: 'Vascular Disease', points: 1, description: 'MI, peripheral artery disease, or aortic plaque' },
  { id: 'age65', label: 'Age 65-74 years', points: 1, description: 'Moderate age-related risk' },
  { id: 'female', label: 'Female Sex', points: 1, description: 'Female sex category' }
];

export default function CHA2DS2VAScCalculator() {
  const [selectedFactors, setSelectedFactors] = useState<Set<string>>(new Set());

  const handleFactorChange = (factorId: string, checked: boolean) => {
    const newSelected = new Set(selectedFactors);
    
    // Handle age group exclusivity
    if (factorId === 'age65' && checked) {
      newSelected.delete('age75');
    } else if (factorId === 'age75' && checked) {
      newSelected.delete('age65');
    }
    
    if (checked) {
      newSelected.add(factorId);
    } else {
      newSelected.delete(factorId);
    }
    
    setSelectedFactors(newSelected);
  };

  const calculateScore = () => {
    return Array.from(selectedFactors).reduce((total, factorId) => {
      const factor = riskFactors.find(f => f.id === factorId);
      return total + (factor?.points || 0);
    }, 0);
  };

  const getInterpretation = (score: number) => {
    if (score === 0) {
      return {
        text: "Very low stroke risk - anticoagulation generally not recommended",
        color: 'green' as const,
        riskLevel: "Very Low Risk",
        yearlyRisk: "0%",
        recommendation: "No antithrombotic therapy recommended"
      };
    } else if (score === 1) {
      return {
        text: "Low stroke risk - consider anticoagulation based on individual factors",
        color: 'yellow' as const,
        riskLevel: "Low Risk",
        yearlyRisk: "1.3%",
        recommendation: "Consider oral anticoagulant (preferred) or aspirin"
      };
    } else {
      return {
        text: "Moderate to high stroke risk - anticoagulation recommended",
        color: 'red' as const,
        riskLevel: "Moderate-High Risk",
        yearlyRisk: score === 2 ? "2.2%" : score === 3 ? "3.2%" : score === 4 ? "4.0%" : score === 5 ? "6.7%" : score === 6 ? "9.8%" : score === 7 ? "9.6%" : score === 8 ? "6.7%" : "15.2%",
        recommendation: "Oral anticoagulation recommended (warfarin, DOAC)"
      };
    }
  };

  const score = calculateScore();
  const interpretation = getInterpretation(score);

  return (
    <CalculatorLayout
      title="CHA₂DS₂-VASc Score Calculator"
      description="Assess stroke risk in patients with atrial fibrillation to guide anticoagulation therapy"
      icon="🛡️"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Risk Factors Assessment</h3>
        
        <div className="space-y-3">
          {riskFactors.map((factor) => (
            <div key={factor.id} className="border border-slate-200 rounded-lg p-4">
              <CheckboxField
                label={`${factor.label} (+${factor.points} point${factor.points > 1 ? 's' : ''})`}
                checked={selectedFactors.has(factor.id)}
                onChange={(checked) => handleFactorChange(factor.id, checked)}
                description={factor.description}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Scoring System:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div><strong>C</strong>ongestive heart failure (1 point)</div>
            <div><strong>H</strong>ypertension (1 point)</div>
            <div><strong>A₂</strong>ge ≥75 years (2 points)</div>
            <div><strong>D</strong>iabetes mellitus (1 point)</div>
            <div><strong>S₂</strong>troke/TIA/thromboembolism (2 points)</div>
            <div><strong>V</strong>ascular disease (1 point)</div>
            <div><strong>A</strong>ge 65-74 years (1 point)</div>
            <div><strong>Sc</strong> (Sex category) - Female (1 point)</div>
          </div>
        </div>
      </div>

      <ResultCard
        title="CHA₂DS₂-VASc Score"
        value={score}
        unit="points"
        interpretation={`${interpretation.riskLevel} (${interpretation.yearlyRisk} yearly stroke risk): ${interpretation.text}`}
        color={interpretation.color}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h4 className="font-semibold text-slate-700 mb-3">Treatment Recommendation</h4>
        <div className={`p-4 rounded-lg ${
          score === 0 
            ? 'bg-green-50 border border-green-200' 
            : score === 1
            ? 'bg-yellow-50 border border-yellow-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="font-semibold mb-2">{interpretation.recommendation}</div>
          <div className="text-sm">
            Consider bleeding risk (HAS-BLED score) when making anticoagulation decisions.
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Risk Stratification:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• Score 0: Very low risk (0% yearly)</div>
          <div>• Score 1: Low risk (~1.3% yearly)</div>
          <div>• Score 2: Moderate risk (~2.2% yearly)</div>
          <div>• Score ≥3: High risk (3.2-15.2% yearly)</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Application:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            The CHA₂DS₂-VASc score is the recommended tool for stroke risk assessment 
            in non-valvular atrial fibrillation according to major guidelines (ESC, AHA/ACC/HRS).
          </p>
          <p>
            It's more sensitive than CHADS₂ score, particularly for identifying low-risk patients. 
            The score helps guide anticoagulation decisions but should be considered alongside 
            bleeding risk assessment and patient preferences.
          </p>
          <div className="mt-3">
            <strong>Key Points:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Applies to non-valvular atrial fibrillation only</li>
              <li>• Consider bleeding risk before starting anticoagulation</li>
              <li>• Regular reassessment recommended</li>
              <li>• Individual patient factors and preferences matter</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}