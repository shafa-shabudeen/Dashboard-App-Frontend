import React,{useState,useEffect} from 'react';
import BarChart from '../../charts/BarChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';


function DashboardCard09() {

  const [relevanceAndPestle, setRelevanceAndPestle] = useState([]);
  const [relevanceAndswot, setRelevanceAndSwot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelevanceAndPestle = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/pestleRelevanceCount');
        const data = await response.json();
        setRelevanceAndPestle(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchRelevanceAndPestle();
  }, []);
  useEffect(() => {
    const fetchRelevanceAndSwot = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/swotRelevanceCount');
        const data = await response.json();
        setRelevanceAndSwot(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchRelevanceAndSwot();
  }, []);

  const label = Object.keys(relevanceAndPestle);
  const value1 = Object.values(relevanceAndPestle);
  const value2 = Object.values(relevanceAndswot);

    const chartData = {
    labels: label,
    datasets: [
      // Light blue bars
      {
        label: 'Pestle',
        data:value1,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Swot',
        data:value2,
        backgroundColor: tailwindConfig().theme.colors.indigo[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Pestle VS Swot</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {isLoading ? (
        <div>Loading...</div> // Render a loading indicator while data is being fetched
      ) : (
        <BarChart data={chartData} width={595} height={248} />
      )}
      </div>
    </div>
  );
}

export default DashboardCard09;
