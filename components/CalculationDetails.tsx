import React from 'react';
import type { FuelCalculationResult } from '../types';

interface CalculationDetailsProps {
  e10Data: FuelCalculationResult;
  e20Data: FuelCalculationResult;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
};

const CalculationDetails: React.FC<CalculationDetailsProps> = ({ e10Data, e20Data, dailyDistance }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-slate-200 animate-fade-in">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">Detailed Breakdown (For {dailyDistance} kms)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-slate-100 font-semibold text-slate-600 border-b border-slate-200 rounded-tl-lg">Fuel Type</th>
              <th className="py-3 px-4 bg-slate-100 font-semibold text-slate-600 border-b border-slate-200 text-right">Fuel Needed</th>
              <th className="py-3 px-4 bg-slate-100 font-semibold text-slate-600 border-b border-slate-200 text-right">Your Cost</th>
              <th className="py-3 px-4 bg-slate-100 font-semibold text-slate-600 border-b border-slate-200 text-right rounded-tr-lg">Govt. Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="py-3 px-4 font-semibold text-indigo-600">E10</td>
              <td className="py-3 px-4 text-right">{e10Data.fuelNeeded.toFixed(2)} ltrs</td>
              <td className="py-3 px-4 text-right">{formatCurrency(e10Data.consumerCost)}</td>
              <td className="py-3 px-4 text-right">{formatCurrency(e10Data.govtCost)}</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="py-3 px-4 font-semibold text-green-600">E20</td>
              <td className="py-3 px-4 text-right">{e20Data.fuelNeeded.toFixed(2)} ltrs</td>
              <td className="py-3 px-4 text-right">{formatCurrency(e20Data.consumerCost)}</td>
              <td className="py-3 px-4 text-right">{formatCurrency(e20Data.govtCost)}</td>
            </tr>
          </tbody>
        </table>
      </div>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
    `}</style>
    </div>
  );
};

export default CalculationDetails;
