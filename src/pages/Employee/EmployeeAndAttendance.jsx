import React, { useEffect, useState } from "react";
import Employee from "./Employee";
import AttendanceLog from "../Attendance/AttendanceLog";
import LateCome from "../LateComers/LateCome";
import { Icon } from "@iconify/react/dist/iconify.js";

function EmployeeAndAttendance() {
  const [viewTab, setViewTab] = useState("Employee");

  const handleChange = (data) => {
    setViewTab(data);
  };
  const getButtonClass = (tab) => {
    return viewTab === tab
      ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex gap-2"
      : "bg-slate-200 text-black px-4 py-2 rounded hover:bg-slate-300 flex gap-2";
  };
  return (
    <div className=" w-full h-full gap-2">
      <div className="w-full h-fit p-2 flex gap-2">
        <button
          onClick={() => handleChange("Attendance")}
          className={getButtonClass("Attendance")}
        >
          {" "}
          <Icon icon="fluent:person-clock-24-regular" width="24" height="24" />
          Attendance
        </button>
        <button
          onClick={() => handleChange("Employee")}
          className={getButtonClass("Employee")}
        >
          <Icon
            icon="fluent:people-community-32-regular"
            width="24"
            height="24"
          />
          Employee
        </button>

        <button
          onClick={() => handleChange("LateCome")}
          className={getButtonClass("LateCome")}
        >
          {" "}
          <Icon
            icon="fluent:person-available-24-regular"
            width="24"
            height="24"
          />
          Manual Entry
        </button>
      </div>

      <div className="bg -yellow-400 w-full h-5/6">
        {viewTab == "Employee" ? (
          <Employee />
        ) : viewTab == "Attendance" ? (
          <AttendanceLog />
        ) : (
          <LateCome />
        )}
      </div>
    </div>
  );
}

export default EmployeeAndAttendance;

// import React from "react";
// import Employee from "./Employee";
// import AttendanceLog from "../Attendance/AttendanceLog";

// function EmployeeAndAttendance() {
//   return (
//     <div className=" w-full h-full gap-2 flex">
//       <div className=" w-1/2"> <Employee/></div>
//       <div className=" w-1/2"><AttendanceLog/></div>
//     </div>
//   );
// }

// export default EmployeeAndAttendance;
