import React ,{useEffect,useState} from 'react';
import PieChart from '../../charts/PieChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard05() {

  const [swotAndTitle, setSwotAndTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSwotAndTitle = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/swotAndTopic');
        const data = await response.json();
        setSwotAndTitle(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchSwotAndTitle();
  }, []);
  
  const label = Object.keys(swotAndTitle);
  const value = Object.values(swotAndTitle);

  const chartData = {
    labels: label,
    datasets: [
      {
        label: 'SWOT Analysis',
        data: value,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.purple[500],
          tailwindConfig().theme.colors.teal[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.purple[500],
          tailwindConfig().theme.colors.teal[500],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">SWOT Analysis</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {isLoading ? (
        <div>Loading...</div> // Render a loading indicator while data is being fetched
      ) : (
      <PieChart data={chartData} width={389} height={260} />
      )}
    </div>
  );
}

export default DashboardCard05;
