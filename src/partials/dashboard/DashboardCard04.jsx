import React, { useState , useEffect} from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {

  const [impactCount, setImpactCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likelihoodCount, setLikelihoodCount] = useState([]);

  useEffect(() => {
    const fetchimpact = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/impactCount');
        const data = await response.json();
        setImpactCount(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchimpact();
  }, []);

  useEffect(() => {
    const fetchLikelihood = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/likelihoodCount');
        const data = await response.json();
        setLikelihoodCount(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchLikelihood();
  }, []);
  
  const label = Object.keys(impactCount);
  const value1 = Object.values(impactCount);
  const value2= Object.values(likelihoodCount);

  const chartData = {
    labels: label,
    datasets: [
      // Light blue bars
      {
        label: 'Impact',
        data: value1,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Likelihood',
        data: value2,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">impact VS Likelihood</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {isLoading ? (
        <div>Loading...</div> // Render a loading indicator while data is being fetched
      ) : (
        <BarChart data={chartData} width={595} height={248} />
      )}
    </div>
  );
}

export default DashboardCard04;
