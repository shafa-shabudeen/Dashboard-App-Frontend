import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import TopicBanner from '../partials/dashboard/TopicBanner';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard14 from '../partials/dashboard/DashboardCard14';


function TopicPage() {

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

            {/* Welcome banner */}
            <TopicBanner />

            {/* Cards */}
            <div className="grid grid-cols-5 gap-6">

              {/* Bar chart (impact vs likelihood based upon topic) */}
              <DashboardCard04 />
              {/* Pie chart (swot Analysis) */}
              <DashboardCard05 />
              {/* Doughnut chart (pestle analysis) */}
              <DashboardCard06 />
              {/* Line chart (start,end,added years based upon topic) */}
              <DashboardCard08 />
              {/* Title, Source And Insight based upon topic */}
              <DashboardCard14 />
              
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default TopicPage;