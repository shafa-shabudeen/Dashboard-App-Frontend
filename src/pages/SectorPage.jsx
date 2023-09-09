import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import SectorBanner from '../partials/dashboard/SectorBanner';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';


function SectorPage() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <SectorBanner />

            {/* Cards */}
            <div className="grid grid-cols-4 gap-6">
              {/* Line chart (title based upon sector) */}
              <DashboardCard01 />
    
              {/* Table (Top sectors) */}
              <DashboardCard07 />

              {/* Bar chart (relevance vs intensity) */}
              <DashboardCard10 />

              {/*Title and urls based upon sector*/}
              <DashboardCard12 />
             

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default SectorPage;