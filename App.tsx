
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import InputRow from './components/InputRow';
import ResultsCard from './components/ResultsCard';
import CalculationDetails from './components/CalculationDetails';
import type { FuelCalculationResult } from './types';

const App: React.FC = () => {
  const [e10Mileage, setE10Mileage] = useState(20);
  const [e20Mileage, setE20Mileage] = useState(16);
  const [e10Cost, setE10Cost] = useState(100);
  const [e20Cost, setE20Cost] = useState(100);
  const [crudeCost, setCrudeCost] = useState(40);
  const [dailyDistance, setDailyDistance] = useState(60);
  const [showDetails, setShowDetails] = useState(false);

  const { e10Results, e20Results, extraConsumerCost, extraGovtCost, totalExtraCost } = useMemo(() => {
    const fuelNeededE10 = e10Mileage > 0 ? dailyDistance / e10Mileage : 0;
    const fuelNeededE20 = e20Mileage > 0 ? dailyDistance / e20Mileage : 0;

    const consumerCostE10 = fuelNeededE10 * e10Cost;
    const consumerCostE20 = fuelNeededE20 * e20Cost;

    const govtCostE10 = fuelNeededE10 * crudeCost;
    const govtCostE20 = fuelNeededE20 * crudeCost;

    const e10Res: FuelCalculationResult = { fuelNeeded: fuelNeededE10, consumerCost: consumerCostE10, govtCost: govtCostE10 };
    const e20Res: FuelCalculationResult = { fuelNeeded: fuelNeededE20, consumerCost: consumerCostE20, govtCost: govtCostE20 };

    const extraConsumer = consumerCostE20 - consumerCostE10;
    const extraGovt = govtCostE20 - govtCostE10;

    return {
      e10Results: e10Res,
      e20Results: e20Res,
      extraConsumerCost: extraConsumer,
      extraGovtCost: extraGovt,
      totalExtraCost: extraConsumer + extraGovt,
    };
  }, [e10Mileage, e20Mileage, e10Cost, e20Cost, crudeCost, dailyDistance]);

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setter(isNaN(value) ? 0 : value);
  };

  const ArrowDownIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 bg-slate-50">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Enter Your Details</h2>
                
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold text-slate-700">Vehicle Mileage and Travel Distance</h3>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <label htmlFor="e10Mileage" className="text-slate-600 font-medium">With E10</label>
                            <div className="flex items-center gap-2">
                                <input type="number" id="e10Mileage" value={e10Mileage} onChange={handleNumberChange(setE10Mileage)} className="w-24 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right sm:text-sm"/>
                                <span className="text-slate-500 w-12 text-left">kmpl</span>
                            </div>
                        </div>
                         <div className="flex items-center justify-between gap-4">
                            <label htmlFor="e20Mileage" className="text-slate-600 font-medium">With E20</label>
                            <div className="flex items-center gap-2">
                                <input type="number" id="e20Mileage" value={e20Mileage} onChange={handleNumberChange(setE20Mileage)} className="w-24 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right sm:text-sm"/>
                                <span className="text-slate-500 w-12 text-left">kmpl</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <label htmlFor="dailyDistance" className="text-slate-600 font-medium">Your daily travel distance</label>
                            <div className="flex items-center gap-2">
                                <input type="number" id="dailyDistance" value={dailyDistance} onChange={handleNumberChange(setDailyDistance)} className="w-24 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right sm:text-sm"/>
                                <span className="text-slate-500 w-12 text-left">kms</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                     <h3 className="text-lg font-semibold text-slate-700 mb-2">Cost Details</h3>
                    <InputRow label="E10 1ltr cost (consumer)" id="e10Cost" value={e10Cost} onChange={handleNumberChange(setE10Cost)} unit="₹" />
                    <InputRow label="E20 1ltr cost (consumer)" id="e20Cost" value={e20Cost} onChange={handleNumberChange(setE20Cost)} unit="₹" />
                    <InputRow label="Govt 1ltr crude import cost" id="crudeCost" value={crudeCost} onChange={handleNumberChange(setCrudeCost)} unit="₹" />
                </div>
            </div>

            <div className="p-8 bg-indigo-600 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Daily Financial Impact</h2>
                 <div className="space-y-4">
                    <ResultsCard label="Extra Cost to You" value={extraConsumerCost} />
                    <ResultsCard label="Extra Cost to Govt" value={extraGovtCost} />
                    <ResultsCard label="Total Extra Cost" value={totalExtraCost} isTotal={true} />
                </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
            <button
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
                {showDetails ? 'Hide' : 'Show'} Calculation Details
                <ArrowDownIcon className={`w-5 h-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>
        </div>

        {showDetails && <CalculationDetails e10Data={e10Results} e20Data={e20Results} />}
      </main>
    </div>
  );
}

export default App;
