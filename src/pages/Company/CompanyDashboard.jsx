import React from "react";
import MasterBanner from "../../components/MasterBanner/MasterBanner";
import MasterChart1 from "../../components/Company/MasterChart1";
import MasterChart2 from "../../components/Company/MasterChart2";

function CompanyDashboard() {
  const navdata = [{ name: "Dashboard" }];

  return (
    <div className="w-full">
      <MasterBanner navdata={navdata} />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 p-4 w-full h-full ">
        {/* Chart 1 */}
        <div className="w-full lg:w-1/2 h-full">
          <h1 className="text-[--dark-blue] text-xl sm:text-2xl font-bold p-2">
            Total Sales Overview
          </h1>
          <div className="h-full">
            {" "}
            {/* Add this wrapper to control height */}
            <MasterChart1 />
          </div>
        </div>

        {/* Chart 2 */}
        <div className="w-full lg:w-1/2 md:h-full">
          <h1 className="text-[--dark-blue] text-xl sm:text-2xl font-bold p-2">
            Monthly Sales Report
          </h1>
          <MasterChart2 />
        </div>
      </div>
    </div>
  );
}

export default CompanyDashboard;
