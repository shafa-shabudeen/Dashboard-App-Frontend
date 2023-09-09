import React ,{useState,useEffect,useRef}from 'react';

import Transition from '../../utils/Transition';

function DashboardCard16 ({
  align
}) {
  
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryAndData, setCountryAndData] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/dashboard/country`);
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchTopic();
  }, []);

  useEffect(() => {
    const fetchTitleAndSource = async () => {
      try {
        const titleAndUrlResponse = await fetch(`http://localhost:8080/api/v1/dashboard/allData/${encodeURIComponent(selectedCountry)}`);
        const titleAndUrlData = await titleAndUrlResponse.json();
        setCountryAndData(titleAndUrlData);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };
    
    if (selectedCountry) {
     fetchTitleAndSource();
     } else {
      setCountryAndData([]);
     }
    }, [selectedCountry]);
  
  

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const handleSectorSelect = (sector) => {
    setSelectedCountry(sector);
  };
  console.log(selectedCountry);
  

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 transition-colors duration-300"> 
      <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Data Based on Country </h2>
      <div className="flex justify-start"> 
      <button
        ref={trigger}
        className="btn bg-white dark:bg-slate-800 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 "
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        style={{ float: 'right' }}
      >
        <span className="sr-only">Topic</span>
        <wbr />
        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
          <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
        </svg>
      </button>
      <Transition
      show={dropdownOpen}
      tag="div"
      className={`origin-top-right z-10 absolute  right-0  min-w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${
        align === 'right' ? 'md:left-auto md:right-0' : 'md:left-0 md:right-auto'
      }`} 
      enter="transition ease-out duration-200 transform"
      enterStart="opacity-0 -translate-y-2"
      enterEnd="opacity-100 translate-y-0"
      leave="transition ease-out duration-200"
      leaveStart="opacity-100"
      leaveEnd="opacity-0">
       <div ref={dropdown} className="max-h-48 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">Topics</div>
          <ul className="mb-4">
          {country.slice(1).map((item, index) => (
          <li key={index} className="py-1 px-3">
            <label className="flex items-center">
              <input type="radio" name="sector" className="form-radio" value={item} onChange={(e) => setSelectedCountry(e.target.value)} />
              <span className="text-sm font-medium ml-2">{item}</span>
            </label>
          </li>
             ))}
          </ul>
          <div className="py-2 px-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/20">
            <ul className="flex items-center justify-between">
            <li>
                <button
                  className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => {
                    setDropdownOpen(false);
                    handleSectorSelect(selectedSector);
                  }}
                  onBlur={() => setDropdownOpen(false)}
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
      </div>
    </header>
    <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr className="p-2 height: 10px">
                <th className="p-2">
                  <div className="font-semibold text-left">Topic</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Title</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Source</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Sector</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">insight</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Url</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Start Year</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">End Year</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Published</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Added</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Region</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">City</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Pestle</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Relevance</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Intensity</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Impact</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Likelihood</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Swot</div>
                </th>
              </tr>
            </thead>
           {countryAndData.map((values, index) => (
                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                <tr className="p-2 ">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100 ">
                         {values.topic}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center  ">{values.title}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.source}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.sector}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.insight}</div>
                  </td>
                  <td className="p-2 ">
                  <div className="shrink-0 self-end ml-2">
                    <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href={values.url}>
                      View<span className="hidden sm:inline"> -&gt;</span>
                    </a>
                  </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.start_year}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.end_year}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.published}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.added}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.region}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.city}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.pestle}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.relevance}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.intensity}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.impact}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.likelihood}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{values.swot}</div>
                  </td>
                </tr> 
                </tbody> 
         ))} 
              </table>
            </div>
      </div>
    
    </div>
)
};

export default DashboardCard16;
  
    


