import React , {useState,useEffect}from 'react';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';


// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard02() {

  const [cityAndRelevance, setCityAndRelevance] = useState([]);
  const [CityAndIntensity, setCityAndIntensity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCityAndRelevance = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/relevanceCityCount');
        const data = await response.json();
        setCityAndRelevance(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchCityAndRelevance();
  }, []);
  useEffect(() => {
    const fetchCityAndIntensity = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/intensityCityCount');
        const data = await response.json();
        setCityAndIntensity(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchCityAndIntensity();
  }, []);

  const label = Object.keys(cityAndRelevance);
  const value1 = Object.values(cityAndRelevance);
  const value2 = Object.values(CityAndIntensity);


  const chartData = {
    labels: label,
    datasets: [
      // Indigo line
      {
        data: value1,
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
      // Gray line
      {
        data: value2,
        borderColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.slate[500])}, 0.25)`,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.slate[500])}, 0.25)`,
        pointHoverBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.slate[500])}, 0.25)`,
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
          <img src={Icon} width="32" height="32" alt="Icon 02" />
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Intensity And Relevance</h2>
        <p>Based upon City</p>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] max-h-[128px]">
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

export default DashboardCard02;
