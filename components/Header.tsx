
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center my-8 md:my-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
        E10 vs. E20 Fuel Cost Calculator
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
        Analyze the financial impact of using E20 fuel based on your vehicle's mileage and daily commute. Enter your data below to see the daily extra costs.
      </p>
    </header>
  );
};

export default Header;
