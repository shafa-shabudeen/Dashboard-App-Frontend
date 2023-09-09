import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';


// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard01() {
   
  const [sectorAndTitle, setSectorAndTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSectorAndTitle = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/sectorAndTitle');
        const data = await response.json();
        setSectorAndTitle(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchSectorAndTitle();
  }, []);
  
  const label = Object.keys(sectorAndTitle);
  const value = Object.values(sectorAndTitle);

  const chartData = {
    labels:  label,
    datasets: [
      // Indigo line
      {
        data: value,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
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
      
      
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Title</h2>
        
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        {isLoading ? (
        <div>Loading...</div> // Render a loading indicator while data is being fetched
      ) : (
        <LineChart data={chartData} width={389} height={110} />
      )}
      </div>
    </div>
  );
}

export default DashboardCard01;
