import React ,{useState,useEffect,useRef}from 'react';

import Transition from '../../utils/Transition';

function DashboardCard12 ({
  align
}) {
  
  const [sector, setSector] = useState([]);
  const [selectedSector, setSelectedSector] = useState('');
  const [titleAndurl, settitleAndUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSector = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/dashboard/allSector`);
        const data = await response.json();
        setSector(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchSector();
  }, []);

  useEffect(() => {
    const fetchTitleAndUrl = async () => {
      try {
        const titleAndUrlResponse = await fetch(`http://localhost:8080/api/v1/dashboard/titleAndUrl/${encodeURIComponent(selectedSector)}`);
        const titleAndUrlData = await titleAndUrlResponse.json();
        settitleAndUrl(titleAndUrlData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };
    if (selectedSector) {
     fetchTitleAndUrl();
     } else {
      settitleAndUrl([]);
     }
    }, [selectedSector]);

    
  const value1 = Object.keys(titleAndurl);
  const value2 = Object.values(titleAndurl);
  

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const handleSectorSelect = (sector) => {
    setSelectedSector(sector);
  };
  console.log(selectedSector);
  

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
      <h2 className="font-semibold text-slate-800 dark:text-slate-100">Title And Url</h2>
      <div className="flex justify-start"> 
      <button
        ref={trigger}
        className="btn bg-white dark:bg-slate-800 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 "
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        style={{ float: 'right' }}
      >
        <span className="sr-only">Sectors</span>
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
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">Sectors</div>
          <ul className="mb-4">
          {sector.slice(1).map((item, index) => (
          <li key={index} className="py-1 px-3">
            <label className="flex items-center">
              <input type="radio" name="sector" className="form-radio" value={item} onChange={(e) => setSelectedSector(e.target.value)} />
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
      <div className="p-3 transition-colors duration-300">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Topics
          </header>
          <ul className="my-1">
            {/* Item */}
            {value1.map((value1, index) => (
            <li className="flex px-2">
              <div key={index}>
              <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    {value1}
                  </div>
                  <div className="shrink-0 self-end ml-2">
                    <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href={value2[index]}>
                      View<span className="hidden sm:inline"> -&gt;</span>
                    </a>
                  </div>
                </div>
              </div>
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard12;