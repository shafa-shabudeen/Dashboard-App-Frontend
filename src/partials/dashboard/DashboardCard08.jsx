import React ,{useState,useEffect} from 'react';
import LineChart from '../../charts/LineChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard08() {

  const [endYearTopic, setEndYearTopic] = useState([]);
  const [startYearTopic, setStartYearTopic] = useState([]);
  const [addedYearTopic, setAddedYearTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEndYear = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/endYearCount');
        const data = await response.json();
        setEndYearTopic(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchEndYear();
  }, []);
  useEffect(() => {
    const fetchStartYear = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/startYearCount');
        const data = await response.json();
        setStartYearTopic(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchStartYear();
  }, []);
  useEffect(() => {
    const fetchAddedYear = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/addedYearCount');
        const data = await response.json();
        setAddedYearTopic(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchAddedYear();
  }, []);

  const label = Object.keys(endYearTopic);
  const value1 = Object.values(endYearTopic);
  const value2 = Object.values(startYearTopic);
  const value3 = Object.values(addedYearTopic);

  const chartData = {
    labels: label,
    datasets: [
      // Indigo line
      {
        label: 'End Year',
        data: value1,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Blue line
      {
        label: 'Start Year',
        data: value2,
        borderColor: tailwindConfig().theme.colors.blue[400],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[400],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[400],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // emerald line
      {
        label: 'Added Year',
        data:  value3,
        borderColor: tailwindConfig().theme.colors.emerald[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Topics Over Years</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {isLoading ? (
        <div>Loading...</div> // Render a loading indicator while data is being fetched
      ) : (
      <LineChart data={chartData} width={595} height={248} />
      )}
    </div>
  );
}

export default DashboardCard08;
