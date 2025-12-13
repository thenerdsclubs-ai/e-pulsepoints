"use client";

import { useState } from "react";
import CalculatorLayout from "@/app/components/calculators/CalculatorLayout";
import InputField, { ResultCard } from "@/app/components/calculators/InputField";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) return null;
    
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    
    if (weightKg <= 0 || heightCm <= 0) return null;
    
    // BMI formula: weight (kg) / (height (m))²
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return Math.round(bmi * 10) / 10;
  };

  const getInterpretation = (bmi: number) => {
    if (bmi < 16) {
      return { 
        text: "Severely underweight - may indicate malnutrition or eating disorders", 
        color: 'red' as const,
        category: "Severely Underweight"
      };
    } else if (bmi < 18.5) {
      return { 
        text: "Underweight - may benefit from weight gain under medical supervision", 
        color: 'yellow' as const,
        category: "Underweight"
      };
    } else if (bmi < 25) {
      return { 
        text: "Normal weight - maintain current lifestyle and healthy habits", 
        color: 'green' as const,
        category: "Normal Weight"
      };
    } else if (bmi < 30) {
      return { 
        text: "Overweight - consider lifestyle modifications for weight management", 
        color: 'yellow' as const,
        category: "Overweight"
      };
    } else if (bmi < 35) {
      return { 
        text: "Obese Class I - increased health risks, weight loss recommended", 
        color: 'red' as const,
        category: "Obese Class I"
      };
    } else if (bmi < 40) {
      return { 
        text: "Obese Class II - significant health risks, medical intervention may be needed", 
        color: 'red' as const,
        category: "Obese Class II"
      };
    } else {
      return { 
        text: "Obese Class III - severe health risks, immediate medical attention recommended", 
        color: 'red' as const,
        category: "Obese Class III"
      };
    }
  };

  const bmiResult = calculateBMI();
  const interpretation = bmiResult ? getInterpretation(bmiResult) : null;

  return (
    <CalculatorLayout
      title="Body Mass Index Calculator"
      description="Calculate BMI to assess body weight status and health risk categories"
      icon="⚖️"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Body Measurements</h3>
        
        <InputField
          label="Weight"
          value={weight}
          onChange={setWeight}
          unit="kg"
          placeholder="70"
          step="0.1"
          min="20"
          max="300"
        />
        
        <InputField
          label="Height"
          value={height}
          onChange={setHeight}
          unit="cm"
          placeholder="175"
          step="0.5"
          min="100"
          max="250"
        />

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Measurement tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Weigh yourself in the morning, without clothes</li>
            <li>• Measure height without shoes, standing straight</li>
            <li>• Use consistent measuring conditions</li>
            <li>• Formula: BMI = weight (kg) ÷ height (m)²</li>
          </ul>
        </div>
      </div>

      {bmiResult && interpretation && (
        <>
          <ResultCard
            title="Body Mass Index"
            value={bmiResult}
            unit="kg/m²"
            interpretation={`${interpretation.category}: ${interpretation.text}`}
            color={interpretation.color}
          />
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h4 className="font-semibold text-slate-700 mb-3">Your Category</h4>
            <div className={`inline-block px-4 py-2 rounded-full font-semibold ${
              interpretation.color === 'green' 
                ? 'bg-green-100 text-green-800' 
                : interpretation.color === 'yellow'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {interpretation.category}
            </div>
          </div>
        </>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">BMI Categories (WHO):</h4>
        <div className="text-sm text-amber-700 space-y-1">
          <div>• Severely underweight: &lt; 16.0 kg/m²</div>
          <div>• Underweight: 16.0 - 18.4 kg/m²</div>
          <div>• Normal weight: 18.5 - 24.9 kg/m²</div>
          <div>• Overweight: 25.0 - 29.9 kg/m²</div>
          <div>• Obese Class I: 30.0 - 34.9 kg/m²</div>
          <div>• Obese Class II: 35.0 - 39.9 kg/m²</div>
          <div>• Obese Class III: ≥ 40.0 kg/m²</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-700 mb-2">Important Considerations:</h4>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            BMI is a screening tool that estimates body fat based on weight and height. 
            It's widely used but has limitations and should be interpreted alongside other factors.
          </p>
          <div className="mt-3">
            <strong>Limitations:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Doesn't distinguish between muscle and fat mass</li>
              <li>• May not be accurate for athletes with high muscle mass</li>
              <li>• Different standards may apply for different ethnic groups</li>
              <li>• Age and sex variations not accounted for</li>
            </ul>
          </div>
          <p className="mt-3">
            Always consult healthcare professionals for comprehensive health assessment 
            and personalized weight management advice.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}