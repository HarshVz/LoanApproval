import React, { useState } from 'react';
import usePrediction from '../Hooks/usePrediction';
import Navbar from '../Components/Navbar';

const loanApplications = [
  {
    bank_assest_value: 350000,
    cibil_score: 780,
    commercial_assets_value: 100000,
    education: 1,
    income_annum: 900000,
    loan_amount: 250000,
    loan_term: 10,
    luxury_assets_value: 50000,
    no_of_dependents: 2,
    residential_assets_value: 800000,
    self_employed: 0,
    actual: "accepted"
  },
  {
    bank_assest_value: 120000,
    cibil_score: 650,
    commercial_assets_value: 0,
    education: 0,
    income_annum: 300000,
    loan_amount: 100000,
    loan_term: 5,
    luxury_assets_value: 0,
    no_of_dependents: 4,
    residential_assets_value: 200000,
    self_employed: 1,
    actual: "rejected"
  },
  {
    bank_assest_value: 500000,
    cibil_score: 820,
    commercial_assets_value: 300000,
    education: 1,
    income_annum: 1500000,
    loan_amount: 500000,
    loan_term: 20,
    luxury_assets_value: 200000,
    no_of_dependents: 1,
    residential_assets_value: 1000000,
    self_employed: 0,
    actual: "accepted"
  },
  {
    bank_assest_value: 250000,
    cibil_score: 700,
    commercial_assets_value: 150000,
    education: 0,
    income_annum: 450000,
    loan_amount: 200000,
    loan_term: 12,
    luxury_assets_value: 100000,
    no_of_dependents: 3,
    residential_assets_value: 600000,
    self_employed: 1,
    actual: "accepted"
  },
  {
    bank_assest_value: 80000,
    cibil_score: 500,
    commercial_assets_value: 50000,
    education: 0,
    income_annum: 200000,
    loan_amount: 80000,
    loan_term: 3,
    luxury_assets_value: 10000,
    no_of_dependents: 5,
    residential_assets_value: 150000,
    self_employed: 1,
    actual: "rejected"
  }
];

export default function LoanPredictionPage() {
  const [results, setResults] = useState({});

  const handlePredict = async (index, application) => {
    const { actual, ...data } = application;

    try {
      await usePrediction(JSON.stringify(data)).then((res) => {
        const response = res.data.status == 0 ? "accepted" : "rejected";
        setResults(prev => ({ ...prev, [index]: response }));
      });
    } catch (error) {
      setResults(prev => ({ ...prev, [index]: "error" }));
    }
  };

  const formatKey = (key) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatValue = (key, value) => {
    if (key === 'education' || key === 'self_employed') {
      return value === 1 ? 'Yes' : 'No';
    }
    if (key.includes('amount') || key.includes('value') || key.includes('annum')) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value);
    }
    return value;
  };

  return (
    <div className="min-h-screen ">

      <div className="mx-auto">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
          {loanApplications.map((application, index) => (
            <div
              key={index}
              className="bg-neutral-900 rounded-lg p-5 shadow-lg border-2 border-neutral-800 drop-shadow-2xl transition-all duration-300 hover:shadow-neutral-700/40 hover:border-neutral-600 hover:-translate-y-1"
            >
                <div className='space-y-2 mb-4'>
                    <div className='flex justify-between text-neutral-300'>
                        {index+1}. Loan Application
                    </div>
                    <div className='divide divide-neutral-100 h-0.5 bg-neutral-700'></div>
                    </div>
              <div className="space-y-2 mb-4">
                {Object.entries(application).map(([key, value]) => (
                  key !== "actual" && (
                    <div key={key} className="flex justify-between">
                      <span className="text-neutral-400">{formatKey(key)}:</span>
                      <span className="text-neutral-100 font-medium">{formatValue(key, value)}</span>
                    </div>
                  )
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-700">
                <button
                  onClick={() => handlePredict(index, application)}
                  className="w-full bg-neutral-800 border-neutral-700 border-2 hover:border-neutral-600 hover:bg-neutral-900 text-neutral-100 px-4 py-2 rounded transition-all duration-300 cursor-pointer"
                >
                  Predict
                </button>

                {results[index] && (
                  <div className="mt-4 pt-4 border-t border-neutral-700 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-400">Predicted:</span>
                      <span className={results[index] === "accepted" ? "text-green-400" : "text-red-400"}>
                        {results[index]}
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-400">Actual:</span>
                      <span className={application.actual === "accepted" ? "text-green-400" : "text-red-400"}>
                        {application.actual}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Result:</span>
                      <span className={results[index] === application.actual ? "text-green-400" : "text-red-400"}>
                        {results[index] === application.actual ? '✓ Match' : '✗ Mismatch'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
