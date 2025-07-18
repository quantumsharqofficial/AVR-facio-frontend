import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Table({ data }) {
  const { card } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  // const user = JSON.parse(sessionStorage.getItem("user"));
  const [attendanceData, setAttendanceData] = useState([]);

  const [loading, setLoading] = useState(false); // Loader state added

  // const [filteredData, setFilteredData] = useState([]);
  const [todayCount, setTodayCount] = useState(0);
  const [yesterdayCount, setYesterdayCount] = useState(0);
  const [allCount, setAllCount] = useState(0);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  const filteredData = data.filter(
    (item) =>
      item.Employee_ID.toLowerCase().includes(searchTerm) ||
      item.Name.toLowerCase().includes(searchTerm)
  );

  function formatTimestamp(isoString) {
    return new Date(isoString).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // Enable 12-hour format
    });
  }

  const formatDatestamp = (date) => {
    if (!date) return "--";
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB"); // DD/MM/YYYY format
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <section className="flex flex-row max-md:flex-wrap justify-between gap-5">
        <div className="flex w-full  flex-row gap-5 max-md:flex-wrap  justify-between items-center">
          <div className="flex w-fit justify-between items-center px-2  gap-4">
            <div className="flex w-fit justify-between items-center px-2 border-2  ">
              <Icon
                icon="uil:search"
                className="text-[--light-gray]"
                width="20"
                height="20"
              />
              <input
                type="text"
                placeholder="Search employees by ID,Name etc..."
                className="w-72 max-md:w-full h-10 outline-none placeholder:text-sm px-2 text-[--text-gray]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5 max-h-[650px] overflow-auto rounded-md w-full">
        <table className="w-full bg-white text-center border border-gray-200">
          {/* ✅ Table Header */}
          <thead className="bg-[--dark-blue] text-white sticky top-0 z-50">
            <tr className="text-sm uppercase">
              <th className="py-3 ">S.no</th>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <th key={key} className="py-3 ">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>

          {/* ✅ Table Body */}
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-all"
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">{item.Employee_ID}</td>
                  <td className="py-4 px-4">{item.Name}</td>
                  <td className="py-4 px-4">{formatDatestamp(item.Date)}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-md font-medium text-sm 
                      ${
                        item.Status === "Present"
                          ? "bg-green-100 text-green-800"
                          : item.Status === "Half-day"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.Status}
                    </span>
                  </td>
                  {card === "Today Present" && (
                    <>
                      <td
                        className={`py-4 px-4 ${
                          item.Check_In
                            ? new Date(`2000/01/01 ${item.Check_In}`) >
                              new Date(`2000/01/01 9:30 AM`)
                              ? "text-red-600 font-semibold"
                              : "text-green-600 font-semibold"
                            : "text-gray-500 italic"
                        }`}
                      >
                        {item.Check_In
                          ? formatTimestamp(item.Check_In)
                          : "Absent"}
                      </td>
                      <td
                        className={`py-4 px-4 ${
                          item.Check_Out
                            ? new Date(`2000/01/01 ${item.Check_Out}`) <
                              new Date(`2000/01/01 5:00 PM`)
                              ? "text-red-600 font-semibold"
                              : "text-green-600 font-semibold"
                            : "text-gray-500 italic"
                        }`}
                      >
                        {item.Check_Out
                          ? formatTimestamp(item.Check_Out)
                          : "--"}
                      </td>
                    </>
                  )}
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
      </section>
    </div>
  );
}

export default Table;
