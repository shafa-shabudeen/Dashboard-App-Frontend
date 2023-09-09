import React ,{useState,useEffect,useRef}from 'react';

import Transition from '../../utils/Transition';

function DashboardCard14 ({
  align
}) {
  
  const [topic, setTopic] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [titleAndSource, settitleAndSource] = useState([]);
  const [titleAndInsight, settitleAndInsight] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/dashboard/topic`);
        const data = await response.json();
        setTopic(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };

    fetchTopic();
  }, []);

  useEffect(() => {
    const fetchTitleAndSource = async () => {
      try {
        const titleAndUrlResponse = await fetch(`http://localhost:8080/api/v1/dashboard/titleAndSource/${encodeURIComponent(selectedTopic)}`);
        const titleAndUrlData = await titleAndUrlResponse.json();
        settitleAndSource(titleAndUrlData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sector data:', error);
      }
    };
    
    if (selectedTopic) {
     fetchTitleAndSource();
     } else {
      settitleAndSource([]);
     }
    }, [selectedTopic]);

    useEffect(() => {
        const fetchTitleAndInsight = async () => {
            try {
              const titleAndUrlResponse = await fetch(`http://localhost:8080/api/v1/dashboard/titleAndInsight/${encodeURIComponent(selectedTopic)}`);
              const titleAndUrlData = await titleAndUrlResponse.json();
              settitleAndInsight(titleAndUrlData);
              setIsLoading(false);
            } catch (error) {
              console.error('Error fetching sector data:', error);
            }
          };
          if (selectedTopic) {
            fetchTitleAndInsight();
            } else {
             settitleAndInsight([]);
            }
        }, [selectedTopic]);

  const label = Object.keys(titleAndSource);
  const value1 = Object.values(titleAndSource);
  const value2 = Object.values(titleAndInsight);
  

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const handleSectorSelect = (sector) => {
    setSelectedTopic(sector);
  };
  console.log(selectedTopic);
  

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
      <h2 className="font-semibold text-slate-800 dark:text-slate-100">Title Source and Insight</h2>
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
          {topic.slice(1).map((item, index) => (
          <li key={index} className="py-1 px-3">
            <label className="flex items-center">
              <input type="radio" name="sector" className="form-radio" value={item} onChange={(e) => setSelectedTopic(e.target.value)} />
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
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Topic</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Source</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Insight</div>
                </th>
              </tr>
            </thead>
            {label.map((values, index) => (
                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {/* Row */}
                <tr>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100">
                         {values}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{value1[index]}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-emerald-500">{value2[index]}</div>
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

export default DashboardCard14;
  
    


