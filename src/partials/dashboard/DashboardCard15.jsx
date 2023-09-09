import React,{useState,useEffect} from 'react';
import BarChart from '../../charts/BarChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';


function DashboardCard15() {

  const [countryAndPestle, setcountryAndPestle] = useState([]);
  const [countryAndswot, setCountryAndSwot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountryAndPestle = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/countryPestleCount');
        const data = await response.json();
        setcountryAndPestle(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchCountryAndPestle();
  }, []);
  useEffect(() => {
    const fetchCountryAndSwot = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/countrySwotCount');
        const data = await response.json();
        setCountryAndSwot(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchCountryAndSwot();
  }, []);

  const label = Object.keys(countryAndPestle);
  const value1 = Object.values(countryAndPestle);
  const value2 = Object.values(countryAndswot);

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
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Pestle VS Swot</h2>
        
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

export default DashboardCard15;
