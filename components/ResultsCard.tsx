
import React from 'react';

interface ResultsCardProps {
  label: string;
  value: number;
  isTotal?: boolean;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ label, value, isTotal = false }) => {
  const cardClasses = isTotal
    ? "bg-indigo-700 text-white ring-2 ring-white/50"
    : "bg-white/20 text-white backdrop-blur-sm";
  const valueClasses = isTotal
    ? "text-white"
    : "text-white";
  const labelClasses = isTotal ? "text-indigo-200" : "text-indigo-100";

  return (
    <div className={`p-5 rounded-xl shadow-lg flex flex-col items-center justify-center text-center ${cardClasses}`}>
      <dt className={`text-sm font-medium ${labelClasses}`}>{label}</dt>
      <dd className={`mt-1 text-3xl font-bold tracking-tight ${valueClasses}`}>
        {value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </dd>
    </div>
  );
};

export default ResultsCard;
