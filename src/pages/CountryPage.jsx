import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import CountryBanner from '../partials/dashboard/CountryBanner';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard15 from '../partials/dashboard/DashboardCard15';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard16 from '../partials/dashboard/DashboardCard16';



function CountryPage() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value = 'country';

  return (
    <div className="flex h-screen overflow-hidden">

     {/* Sidebar */}
     <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

           
            {/* sector banner */}
            <CountryBanner />

            {/* Cards */}
            <div className="grid grid-cols-6 gap-6">

              {/* Line chart (relevance and intensity based upon city) */}
              <DashboardCard02 />
              
              {/* Line chart (title and sector based upon region) */}
              <DashboardCard03 />
              
              {/* Bar chart (pestle vs swot) */}
              <DashboardCard15 />
             
             {/*all data based upon country */}
              <DashboardCard16 />

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default CountryPage;