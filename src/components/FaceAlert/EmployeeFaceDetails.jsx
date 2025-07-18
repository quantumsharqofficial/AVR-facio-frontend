import React, { useEffect, useState } from "react";
import NavData from "../NavDataComponent/NavData";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";

function EmployeeFaceDetails() {
  const navdata = [{ name: "Face alert System" }, { name: "Employee Details" }];

  const { id, date } = useParams();
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [employeeFaceDetails, setEmployeeFaceDetails] = useState(null);

  const dated = new Date();
  const today = dated.toISOString().split("T")[0];

  const faceAlertData = [
    {
      date: today,
      duration: "0h 45m",
      in_gate: "main",
      in_time: "08:00 AM",
      name: "sriram",
      out_gate: "main",
      out_time: "08:45 AM",
    },
    {
      date: today,
      duration: "03h 05m",
      in_gate: "side",
      in_time: "09:20 AM",
      name: "mugesh",
      out_gate: "side",
      out_time: "12:25 PM",
    },
    {
      date: today,
      duration: "01h 15m",
      in_gate: "front",
      in_time: "03:00 PM",
      name: "yuvaraj",
      out_gate: "front",
      out_time: "04:15 PM",
    },
    {
      date: today,
      duration: "01h 15m",
      in_gate: "main",
      in_time: "05:00 PM",
      name: "sakthi",
      out_gate: "main",
      out_time: "06:15 PM",
    },
    {
      date: today,
      duration: "00h 39m",
      in_gate: "main",
      in_time: "06:20 PM",
      name: "sakthi",
      out_gate: "main",
      out_time: "06:59 PM",
    },
  ];

  const fetchEmployeeDetails = async () => {
    try {
      const response = await AxiosInstance.post("/employee/get-employee", {
        e_vEmpId: id,
        e_vComId: userInfo.c_vComId,
      });
      setEmployeeDetails(response.data.response[0]);
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  };

  const convertInOutPairs = (data) => {
    const result = [];
    let lastIn = null;

    const parseTime = (dateStr, timeStr) => new Date(`${dateStr} ${timeStr}`);

    const formatDuration = (inTime, outTime) => {
      const diffMs = outTime - inTime;
      const totalMinutes = Math.floor(diffMs / 1000 / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours > 0) {
        return `${hours} h: ${minutes} m`;
      } else {
        return `${minutes} min`;
      }
    };

    data.forEach((entry) => {
      if (entry.ef_action === "IN") {
        if (lastIn) {
          result.push({
            name: lastIn.ef_vName,
            date: lastIn.ef_date,
            in_time: lastIn.ef_time,
            out_time: null,
            in_gate: lastIn.ef_vgate,
            out_gate: null,
            duration: null,
          });
        }
        lastIn = entry;
      } else if (entry.ef_action === "OUT") {
        if (lastIn) {
          const inTime = parseTime(lastIn.ef_date, lastIn.ef_time);
          const outTime = parseTime(entry.ef_date, entry.ef_time);
          const duration = formatDuration(inTime, outTime);

          result.push({
            name: lastIn.ef_vName,
            date: lastIn.ef_date,
            in_time: lastIn.ef_time,
            out_time: entry.ef_time,
            in_gate: lastIn.ef_vgate,
            out_gate: entry.ef_vgate,
            duration: duration,
          });

          lastIn = null;
        } else {
          result.push({
            name: entry.ef_vName,
            date: entry.ef_date,
            in_time: null,
            out_time: entry.ef_time,
            in_gate: null,
            out_gate: entry.ef_vgate,
            duration: null,
          });
        }
      }
    });

    if (lastIn) {
      result.push({
        name: lastIn.ef_vName,
        date: lastIn.ef_date,
        in_time: lastIn.ef_time,
        out_time: null,
        in_gate: lastIn.ef_vgate,
        out_gate: null,
        duration: null,
      });
    }

    return result;
  };

  const fetchLeave = async () => {
    const payload = {
      ef_vComID: userInfo.c_vComId, // Fix key name
      ef_vEmpID: id, // Fix key name
      ef_date: date instanceof Date ? date.toISOString().split("T")[0] : date, // Ensure proper date format
    };

    try {
      // const response = await AxiosInstance.post(
      //   `/face-alert/get-by-employee-date`,
      //   payload
      // );
      // // setEmployeeFaceDetails(response.data.response);
      // console.log(response.data.response);
      // let setdata = await convertInOutPairs(response.data.response);
      // console.log(setdata);
      // setEmployeeFaceDetails(setdata);
      setEmployeeFaceDetails(faceAlertData);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
    fetchLeave();
  }, []);

  function formatTimestamp(isoString) {
    return new Date(isoString).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // Enable 12-hour format
    });
  }
  // Example usage:
  function formatDatestamp(isoString) {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }
const [totalDuration, setTotalDuration] = useState("");
const [nonworking, setNonworking] = useState("");

// Total working time in minutes (11 hours)
const TOTAL_SHIFT_MINUTES = 11 * 60;

function getTotalDuration() {
  let totalMinutes = 0;

  faceAlertData.forEach(({ duration }) => {
    const [hPart, mPart] = duration.split(" ");
    const hours = parseInt(hPart.replace("h", ""));
    const minutes = parseInt(mPart.replace("m", ""));
    totalMinutes += hours * 60 + minutes;
  });

  // Calculate worked time
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  setTotalDuration(`${totalHours} hrs ${remainingMinutes} min`);

  // Calculate non-working time
  const freeMinutes = TOTAL_SHIFT_MINUTES - totalMinutes;
  const freeHours = Math.floor(freeMinutes / 60);
  const freeMins = freeMinutes % 60;
  setNonworking(`${freeHours} hrs ${freeMins} min`);
}

  useEffect(() => {
    getTotalDuration();
  }, []);
  return (
    <div>
      <div className="w-full mb-2">
        <NavData navdata={navdata} />
      </div>
      <div>
        <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-6">
          {/* Left Section: Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={employeeDetails?.e_vProfileImg || "/default-avatar.png"}
              alt={employeeDetails?.e_vName}
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
            />
            <h2 className="mt-3 text-xl font-bold text-gray-800">
              {employeeDetails?.e_vName}
            </h2>
            <p className="text-gray-600 text-sm">
              {employeeDetails?.e_vDesignation}
            </p>
          </div>

          {/* Right Section: Employee Details */}
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-4 \\gap-x-8 gap-y-4 text-gray-700">
              <p className="flex items-center gap-2">
                <span className="font-semibold">🆔 Employee ID:</span>{" "}
                {employeeDetails?.e_vEmpId}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">📞 Phone:</span>{" "}
                {employeeDetails?.e_vPhone}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">📧 Email:</span>{" "}
                {employeeDetails?.e_vEmail}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">📍 Address:</span>{" "}
                {employeeDetails?.e_vAddress}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">🎂 DOB:</span>
                {new Date(employeeDetails?.e_vDateOfBrith).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">📅 Join Date:</span>
                {new Date(employeeDetails?.e_vJoinDate).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">🧑‍💼 Gender:</span>{" "}
                {employeeDetails?.e_eGender}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4 mt-6">
        <div className="flex justify-between ">
          <p className="text-[--dark-blue] text-2xl font-bold py-2 ">
            Leave Details
          </p>
          <div className="flex flex-wrap items-center gap-12 p-3 bg-gray-50 rounded-md shadow-sm text-base">
            <div className="font-medium text-gray-800">
              🕒 Total Working Hours:{" "}
              <span className="text-blue-600">11 hrs</span>
            </div>
            <div className="font-medium text-gray-800">
              ✅ Worked:{" "}
              <span className="text-green-600">{totalDuration}</span>
            </div>
            <div className="font-medium text-gray-800">
              🚫 Non-Working: <span className="text-red-500">{nonworking}</span>
            </div>
          </div>
        </div>{" "}
        <table className="w-full bg-white text-center border border-gray-200">
          {/* Table Header */}
          <thead className="bg-[--dark-blue] text-white sticky top-0 z-50">
            <tr className="text-sm uppercase">
              <th className="py-3">S.no</th>
              {/* <th className="py-3">Gate</th> */}
              <th className="py-3">Date</th>
              <th className="py-3">IN </th>
              <th className="py-3">OUT </th>
              {/* <th className="py-3">Duration</th> */}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {employeeFaceDetails?.length > 0 ? (
              employeeFaceDetails.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-all"
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  {/* <td className="py-4 px-4">
                    {item.in_gate === item.out_gate
                      ? item.in_gate || "--"
                      : `${item.in_gate || "--"} / ${item.out_gate || "--"}`}
                  </td> */}
                  <td className="py-4 px-4">{formatDatestamp(item.date)}</td>
                  <td className="py-4 px-4">
                    <div>{item?.in_time || "--"}</div>
                    <div className="text-sm text-gray-500">
                      {item.in_gate || "--"}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>{item?.out_time || "--"}</div>
                    <div className="text-sm text-gray-500">
                      {item.out_gate || "--"}
                    </div>
                  </td>

                  {/* <td className="py-4 px-4">{item?.duration || "--"}</td> */}
                  {/* <td className="py-4 px-4">{item.Employee_ID}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-gray-500 italic">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeFaceDetails;
