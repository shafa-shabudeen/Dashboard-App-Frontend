import React , { useEffect, useState } from 'react';

function DashboardCard07() {
 
  const [sectorAndCountry, setSectorAndCountry] = useState([]);
  const [sectorAndPublished, setSectorAndPublished] = useState([]);
  const [sectorAndSwot, setSectorAndSwot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSectorAndCountry = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/countryAndSector');
        const data = await response.json();
        setSectorAndCountry(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchSectorAndCountry();
  }, []);
  useEffect(() => {
    const fetchSectorAndPublished = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/publishedAndSector');
        const data = await response.json();
        setSectorAndPublished(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchSectorAndPublished();
  }, []);
  useEffect(() => {
    const fetchSectorAndSwot = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/dashboard/swotAndSector');
        const data = await response.json();
        setSectorAndSwot(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchSectorAndSwot();
  }, []);

  const label = Object.keys(sectorAndCountry);
  const value1 = Object.values(sectorAndCountry);
  const value2 = Object.values(sectorAndPublished);
  const value3 = Object.values(sectorAndSwot);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Sectors</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Sector</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Country</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Published</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Swot</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {isLoading ? (
                <div>Loading...</div> // Render a loading indicator while data is being fetched
                  ) : (
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">
                       {label[0]}
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value1[0]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">{value2[0]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value3[0]}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">{label[1]}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value1[1]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">{value2[1]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value3[1]}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">{label[2]}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value1[2]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">{value2[2]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value3[2]}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">{label[3]}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value1[3]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">{value2[3]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value3[3]}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">{label[4]}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value1[4]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">{value2[4]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{value3[4]}</div>
                </td>
              </tr>
             </tbody> 
             )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
