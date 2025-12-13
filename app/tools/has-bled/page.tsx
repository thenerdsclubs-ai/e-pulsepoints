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
  { id: 'hypertension', label: 'Hypertension', points: 1, description: 'Uncontrolled BP >160 mmHg systolic' },
  { id: 'renal', label: 'Abnormal Renal Function', points: 1, description: 'Dialysis, transplant, or Cr >2.26 mg/dL' },
  { id: 'liver', label: 'Abnormal Liver Function', points: 1, description: 'Chronic hepatic disease or bilirubin >2x normal + ALT/AST >3x normal' },
  { id: 'stroke', label: 'Previous Stroke', points: 1, description: 'History of stroke' },
  { id: 'bleeding', label: 'Prior Major Bleeding', points: 1, description: 'Previous bleeding history or predisposition' },
  { id: 'labile', label: 'Labile INR', points: 1, description: 'Unstable/high INRs, time in therapeutic range <60%' },
  { id: 'elderly', label: 'Age >65 years', points: 1, description: 'Elderly patients have increased bleeding risk' },
  { id: 'drugs', label: 'Drugs/Alcohol', points: 1, description: 'Antiplatelet agents, NSAIDs, or alcohol abuse ≥8 drinks/week' }
];

export default function HASBLEDCalculator() {
  const [selectedFactors, setSelectedFactors] = useState<Set<string>>(new Set());

  const handleFactorChange = (factorId: string, checked: boolean) => {
    const newSelected = new Set(selectedFactors);
    
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
    if (score <= 2) {
      return {
        text: "Low bleeding risk - anticoagulation benefits likely outweigh bleeding risks",
        color: 'green' as const,
        riskLevel: "Low Risk",
        yearlyRisk: score === 0 ? "1.13%" : score === 1 ? "1.02%" : "1.88%",
        recommendation: "Anticoagulation recommended if CHA₂DS₂-VASc ≥1 (men) or ≥2 (women)"
      };
    } else if (score === 3) {
      return {
        text: "Moderate bleeding risk - caution advised, consider modifiable risk factors",
        color: 'yellow' as const,
        riskLevel: "Moderate Risk",
        yearlyRisk: "3.74%",
        recommendation: "Caution recommended - address modifiable risk factors, frequent monitoring"
      };
    } else {
      return {
        text: "High bleeding risk - regular review recommended, consider alternatives",
        color: 'red' as const,
        riskLevel: "High Risk",
        yearlyRisk: score === 4 ? "8.70%" : "12.50%",
        recommendation: "High bleeding risk - frequent monitoring, consider alternatives to anticoagulation"
      };
    }
  };

  const score = calculateScore();
  const interpretation = getInterpretation(score);

  return (
    <CalculatorLayout
      title="HAS-BLED Score Calculator"
      description="Assess bleeding risk in patients on anticoagulation therapy to guide clinical decisions"
      icon="⚠️"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Bleeding Risk Factors Assessment</h3>
        
        <div className="space-y-3">
          {riskFactors.map((factor) => (
            <div key={factor.id} className="border border-slate-200 rounded-lg p-4">
              <CheckboxField
                label={`${factor.label} (+${factor.points} point)`}
                checked={selectedFactors.has(factor.id)}
                onChange={(checked) => handleFactorChange(factor.id, checked)}
                description={factor.description}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">HAS-BLED Acronym:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div><strong>H</strong>ypertension (1 point)</div>
            <div><strong>A</strong>bnormal renal/liver function (1 point each)</div>
            <div><strong>S</strong>troke (1 point)</div>
            <div><strong>B</strong>leeding history or predisposition (1 point)</div>
            <div><strong>L</strong>abile INR (1 point)</div>
            <div><strong>E</strong>lderly (age {'>'}65) (1 point)</div>
            <div><strong>D</strong>rugs/alcohol concomitantly (1 point)</div>
          </div>
        </div>
      </div>

      <ResultCard
        title="HAS-BLED Score"
        value={score}
        unit="points"
        interpretation={`${interpretation.riskLevel} (${interpretation.yearlyRisk} yearly bleeding risk): ${interpretation.text}`}
        color={interpretation.color}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h4 className="font-semibold text-slate-700 mb-3">Clinical Recommendation</h4>
        <div className={`p-4 rounded-lg ${
          score <= 2 
            ? 'bg-green-50 border border-green-200' 
            : score === 3
            ? 'bg-yellow-50 border border-yellow-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="font-semibold mb-2">{interpretation.recommendation}</div>
          <div className="text-sm">
            Score ≥3 suggests caution and more frequent monitoring, but is not a contraindication to anticoagulation.
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Risk Stratification:</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• Score 0-2: Low risk (1.02-1.88% yearly)</div>
          <div>• Score 3: Moderate risk (3.74% yearly)</div>
          <div>• Score ≥4: High risk (8.70-12.50% yearly)</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Clinical Application:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            The HAS-BLED score helps identify patients at high risk of bleeding who require 
            more careful monitoring and consideration of modifiable risk factors when on anticoagulation.
          </p>
          <div className="mt-3">
            <strong>Key Points:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Not intended to exclude patients from anticoagulation</li>
              <li>• Helps identify patients needing closer monitoring</li>
              <li>• Address modifiable risk factors (BP control, avoid NSAIDs)</li>
              <li>• Compare with thromboembolic risk (CHA₂DS₂-VASc)</li>
              <li>• Consider patient preferences and quality of life</li>
            </ul>
          </div>
          <p className="mt-3">
            <strong>Modifiable Risk Factors:</strong> Uncontrolled hypertension, 
            labile INR, concomitant drugs (especially NSAIDs), alcohol excess.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}