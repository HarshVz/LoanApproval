import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown'
import usePrediction from './Hooks/usePrediction';
import PieChart from './Components/PieChart';
import { Link } from 'react-router-dom';
import Navbar from './Components/Navbar';

export default function App() {
  const [keys, setKeys] = useState([])
  const [chartData, setChartData] = useState({})
  const [values, setValues] = useState([])
  const [formData, setFormData] = useState({
    no_of_dependents: 3,
    education: 1,
    self_employed: 0,
    income_annum: 500000,
    loan_amount: 200000,
    loan_term: 15,
    cibil_score: 750,
    residential_assets_value: 500000,
    commercial_assets_value: 200000,
    luxury_assets_value: 100000,
    bank_assest_value: 300000
  });
  const diagramData = (formData) => {
    let keys = [];
    let values = [];

    // Loop through formData and extract keys and values
    for (let key in formData) {
      keys.push(key); // Add key to keys array
      values.push(formData[key]); // Parse each value as an integer and add to values array
    }

    // Create chart data object
    const data = {
      options: {
        labels: chartData.labels,
        chart: {
            type: 'donut',
            background: 'transparent',  // Set the background to transparent
            toolbar: { show: false },
          },
          theme: {
            mode: 'dark',  // Set dark theme
            palette: 'palette3', // Change to a dark palette if needed
          },
          dataLabels: { enabled: false },
          legend: {
            position: 'bottom',
            labels: {
              colors: '#fff',  // White text for better visibility
            },
          },
          tooltip: {
            enabled: true,  // Enable tooltip
            style: {
              fontSize: '14px',  // Set the font size
              color: '#000',     // Set tooltip text color to black
            },
            theme: 'dark',  // Keep dark mode for tooltip if desired
          },
          colors: [
            '#2C3E50',   // Dark Blue
            '#1F618D',   // Darker Blue
            '#27AE60',   // Dark Green
            '#1D8348',   // Darker Green
            '#C0392B',   // Dark Red
            '#9B59B6',   // Dark Purple
            '#8E44AD',   // Dark Violet
            '#F39C12',   // Dark Yellow
            '#D35400',   // Dark Orange
            '#E74C3C',   // Dark Crimson
            '#2980B9',   // Dark Cyan
            '#7F8C8D',   // Dark Gray
            '#34495E',   // Dark Slate Blue
            '#16A085',   // Dark Teal
            '#F39C12'    // Dark Gold
          ]
      },
      series: values, // Series should be the numeric values
      labels: keys,   // Labels should be the keys from formData
    };

    // Set chart data, keys, and values in your state
    setChartData(data);
    setKeys(keys);
    setValues(values);

    console.log(data); // Log the chart data for debugging
    return data;
  };


  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'self_employed' ? parseInt(value) : parseInt(value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    setIsLoading(true);
    // Simulate API call
    setTimeout(async () => {
      console.log(formData)
      await usePrediction(formData).then((res) => {
        console.log("Data: ", res.data)
        setResult(res.data)
        const response = diagramData(res.data.predictionImportance)
        console.log(response)
      })

      setIsLoading(false);
    }, 2000);
  };

  return (
    <div>
        <Navbar></Navbar>
    <div className="min-h-screen bg-neutral-950 py-8 pt-0 flex items-start justify-start">
      <div className="w-full mx-auto px-10 grid md:grid-cols-2 gap-5">
        <div className="bg-neutral-900 w-full rounded-lg shadow-xl overflow-hidden border border-neutral-800">
          <div className="p-6">
            <h1 className="text-xl font-medium text-neutral-100 mb-5 ">Loan Assessment</h1>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Loan Application"
                    className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 placeholder-neutral-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      CIBIL Score
                    </label>
                    <input
                      type="number"
                      name="cibil_score"
                      value={formData.cibil_score}
                      onChange={handleChange}
                      className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Loan Amount
                    </label>
                    <input
                      type="number"
                      name="loan_amount"
                      value={formData.loan_amount}
                      onChange={handleChange}
                      className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Term (Years)
                    </label>
                    <input
                      type="number"
                      name="loan_term"
                      value={formData.loan_term}
                      onChange={handleChange}
                      className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <p className="text-xs text-neutral-400">Assessment based on your financial profile and credit history</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Annual Income
                    </label>
                    <input
                      type="number"
                      name="income_annum"
                      value={formData.income_annum}
                      onChange={handleChange}
                      className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Dependents
                    </label>
                    <input
                      type="number"
                      name="no_of_dependents"
                      value={formData.no_of_dependents}
                      onChange={handleChange}
                      className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Employment Status
                  </label>
                  <div className="flex">
                    <button
                      type="button"
                      className={`px-4 py-2 flex-1 text-sm rounded-l-md ${formData.self_employed === 0 ? 'bg-blue-900 text-blue-100 border border-blue-700' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'}`}
                      onClick={() => setFormData({...formData, self_employed: 0})}
                    >
                      Employed
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 flex-1 text-sm rounded-r-md ${formData.self_employed === 1 ? 'bg-blue-900 text-blue-100 border border-blue-700' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'}`}
                      onClick={() => setFormData({...formData, self_employed: 1})}
                    >
                      Self-Employed
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Education
                  </label>
                  <div className="flex">
                    <button
                      type="button"
                      className={`px-4 py-2 flex-1 text-sm rounded-l-md ${formData.education === 0 ? 'bg-blue-900 text-blue-100 border border-blue-700' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'}`}
                      onClick={() => setFormData({...formData, education: 0})}
                    >
                      Non-Graduate
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 flex-1 text-sm rounded-r-md ${formData.education === 1 ? 'bg-blue-900 text-blue-100 border border-blue-700' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'}`}
                      onClick={() => setFormData({...formData, education: 1})}
                    >
                      Graduate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Assets
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">Residential</label>
                      <input
                        type="number"
                        name="residential_assets_value"
                        value={formData.residential_assets_value}
                        onChange={handleChange}
                        className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">Commercial</label>
                      <input
                        type="number"
                        name="commercial_assets_value"
                        value={formData.commercial_assets_value}
                        onChange={handleChange}
                        className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">Luxury</label>
                      <input
                        type="number"
                        name="luxury_assets_value"
                        value={formData.luxury_assets_value}
                        onChange={handleChange}
                        className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">Bank</label>
                      <input
                        type="number"
                        name="bank_assest_value"
                        value={formData.bank_assest_value}
                        onChange={handleChange}
                        className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Calculating...' : 'Calculate Approval Probability'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className='bg-neutral-900 w-full rounded-lg shadow-xl overflow-hidden border border-neutral-800'>
        {result && (
            <div className="border-t border-neutral-800 p-6 w-full">
              <h2 className="text-lg font-medium text-neutral-100 mb-4">Loan Analysis Results</h2>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium text-neutral-300">Approval Probability</div>
                  <div className="text-sm font-bold text-blue-400">
                    {Math.round(result.approvedProbability * 100)}%
                  </div>
                </div>
                <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    style={{ width: `${result.approvedProbability * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 prose dark:prose-invert min-w-full w-full">
              <Markdown>{result.insights}</Markdown>
              </div>
              <PieChart
            dataValues={chartData}
        />
            </div>
          )}
        </div>

      </div>
    </div>
    </div>
  );
}
