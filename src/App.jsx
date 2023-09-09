import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import SectorPage from './pages/SectorPage';
import TopicPage from './pages/TopicPage';
import CountryPage from './pages/CountryPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/Home" element={<Dashboard />} />
        <Route exact path="/sectorBased" element={<SectorPage />} />
        <Route exact path="/topicBased" element={<TopicPage />} />
        <Route exact path="/countryBased" element={<CountryPage />} />
      </Routes>
    </>
  );
}

export default App;
