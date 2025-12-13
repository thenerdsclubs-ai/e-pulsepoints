interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'number' | 'text';
  placeholder?: string;
  unit?: string;
  step?: string;
  min?: string;
  max?: string;
}

export default function InputField({ 
  label, 
  value, 
  onChange, 
  type = 'number', 
  placeholder, 
  unit,
  step,
  min,
  max
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
        {unit && <span className="text-slate-500 ml-1">({unit})</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium"
        />
        {unit && (
          <span className="absolute right-3 top-3 text-slate-500 font-medium">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export function CheckboxField({ label, checked, onChange, description }: CheckboxFieldProps) {
  return (
    <label className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
      />
      <div>
        <div className="font-medium text-slate-900">{label}</div>
        {description && (
          <div className="text-sm text-slate-600">{description}</div>
        )}
      </div>
    </label>
  );
}

interface ResultCardProps {
  title: string;
  value: string | number;
  unit?: string;
  interpretation?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export function ResultCard({ title, value, unit, interpretation, color = 'blue' }: ResultCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    gray: 'from-slate-500 to-slate-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-3">{title}</h3>
      <div className={`bg-gradient-to-r ${colorClasses[color]} text-white rounded-lg p-4 mb-4`}>
        <div className="text-3xl font-black">
          {value}
          {unit && <span className="text-xl font-semibold ml-1">{unit}</span>}
        </div>
      </div>
      {interpretation && (
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="font-semibold text-slate-700 mb-1">Interpretation:</div>
          <div className="text-slate-600">{interpretation}</div>
        </div>
      )}
    </div>
  );
}