
import React from 'react';

interface InputRowProps {
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
}

const InputRow: React.FC<InputRowProps> = ({ label, id, value, onChange, unit }) => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-slate-200 last:border-b-0">
      <label htmlFor={id} className="text-slate-600 font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          className="w-24 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right sm:text-sm"
          min="0"
        />
        <span className="text-slate-500 w-10 text-left">{unit}</span>
      </div>
    </div>
  );
};

export default InputRow;
