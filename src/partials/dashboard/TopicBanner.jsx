import React from 'react';

function SectorBanner() {
  return (
    <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Background illustration */}
      <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true"></div>

      {/* Content */}
      <div className="relative">
        <h2 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">Here, data is visualized based on topics.</h2>
        <p className="dark:text-indigo-200"></p>
      </div>
    </div>
  );
}

export default SectorBanner;
