import React ,{useEffect,useState} from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06() {

  const [pestleAndTitle, setpestleAndTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSectorAndTitle = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/pestleAndTopic');
        const data = await response.json();
        setpestleAndTitle(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchSectorAndTitle();
  }, []);
  
  const label = Object.keys(pestleAndTitle);
  const value = Object.values(pestleAndTitle);

  const chartData = {
    labels: label,
    datasets: [
      {
        label: 'PESTLE Analysis',
        data: value,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.purple[500],
          tailwindConfig().theme.colors.pink[500],
          tailwindConfig().theme.colors.red[500],
          tailwindConfig().theme.colors.orange[500],
          tailwindConfig().theme.colors.yellow[500],
          tailwindConfig().theme.colors.green[500],
          tailwindConfig().theme.colors.teal[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.purple[500],
          tailwindConfig().theme.colors.pink[500],
          tailwindConfig().theme.colors.red[500],
          tailwindConfig().theme.colors.orange[500],
          tailwindConfig().theme.colors.yellow[500],
          tailwindConfig().theme.colors.green[500],
          tailwindConfig().theme.colors.teal[500],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">PESTLE Analysis</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {isLoading ? (
        <div>Loading...</div> // Render a loading indicator while data is being fetched
      ) : (
      <DoughnutChart data={chartData} width={389} height={260} />
      )}
    </div>
  );
}

export default DashboardCard06;
