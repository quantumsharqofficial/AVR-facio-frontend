import React, { useEffect, useState } from "react";
import NavData from "../../components/NavDataComponent/NavData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";
import face from "../../assets/Logo/faceScaning.gif";
import * as XLSX from "xlsx";

function AttendanceLog() {
  const navigate = useNavigate();

  const navdata = [
    {
      name: "Attendance Log",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [attendanceData, setAttendanceData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [todayCount, setTodayCount] = useState(0);
  const [yesterdayCount, setYesterdayCount] = useState(0);
  const [allCount, setAllCount] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const date = new Date();
  const today = date.toISOString().split("T")[0];
  date.setDate(date.getDate() - 1);
  const yesterday = date.toISOString().split("T")[0];
  const StaticAttendanceData = [
    {
      eat_vEmpId: "QF120250519-1",
      eat_vName: "yuvaraj",
      eat_vCheckIn: "2025-06-03T09:00:00.000Z",
      eat_vCheckOut: "2025-06-03T18:00:00.000Z",
      eat_vStatus: "Present",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-2",
      eat_vName: "Vivek",
      eat_vCheckIn: "2025-06-03T09:15:00.000Z",
      eat_vStatus: "Late",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-3",
      eat_vName: "suresh",
      eat_vCheckIn: "2025-06-03T10:00:00.000Z",
      eat_vCheckOut: "2025-06-03T12:45:00.000Z",
      eat_vStatus: "Half day",
      eat_vWorkHours: "3h 45m",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-4",
      eat_vName: "sriram",
      eat_vCheckIn: "2025-06-03T09:00:00.000Z",
      eat_vStatus: "Late",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-5",
      eat_vName: "Sri Naveen",
      eat_vCheckIn: "2025-06-03T09:20:00.000Z",
      eat_vStatus: "  Late",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-6",
      eat_vName: "Sakthi",
      eat_vCheckIn: "2025-06-03T09:00:00.000Z",
      eat_vStatus: "Present",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-7",
      eat_vName: "Praveen",
      eat_vCheckIn: "2025-06-03T09:30:00.000Z",
      eat_vStatus: "Present",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-8",
      eat_vName: "Nava deepak",
      eat_vCheckIn: "2025-06-03T09:10:00.000Z",
      eat_vStatus: "Present",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-9",
      eat_vName: "Muthu7",
      eat_vCheckIn: "2025-06-03T11:00:00.000Z",
      eat_vCheckOut: "2025-06-03T12:45:00.000Z",
      eat_vStatus: "Half day",
      eat_vWorkHours: "3h 45m",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-10",
      eat_vName: "Mugesh",
      eat_vCheckIn: "2025-06-03T09:05:00.000Z",
      eat_vStatus: "Present",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-11",
      eat_vName: "logesh",
      eat_vCheckIn: "2025-06-03T10:00:00.000Z",
      eat_vStatus: "Late",
      eat_vDate: today,
    },
    {
      eat_vEmpId: "QF120250519-1",
      eat_vName: "yuvaraj",
      eat_vCheckIn: "2025-06-03T09:00:00.000Z",
      eat_vCheckOut: "2025-06-03T18:00:00.000Z",
      eat_vStatus: "Present",
      eat_vWorkHours: "9h 0m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-2",
      eat_vName: "Vivek",
      eat_vCheckIn: "2025-06-03T09:15:00.000Z",
      eat_vCheckOut: "2025-06-03T17:45:00.000Z",
      eat_vStatus: "Present",
      eat_vWorkHours: "8h 30m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-3",
      eat_vName: "suresh",
      eat_vCheckIn: "2025-06-03T10:00:00.000Z",
      eat_vCheckOut: "2025-06-03T13:30:00.000Z",
      eat_vStatus: "Half day",
      eat_vWorkHours: "3h 30m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-4",
      eat_vName: "sriram",
      eat_vCheckIn: "2025-06-03T09:00:00.000Z",
      eat_vCheckOut: "2025-06-03T12:45:00.000Z",
      eat_vStatus: "Half day",
      eat_vWorkHours: "3h 45m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-5",
      eat_vName: "Sri Naveen",
      eat_vCheckIn: "2025-06-03T09:20:00.000Z",
      eat_vCheckOut: "2025-06-03T18:00:00.000Z",
      eat_vStatus: "Present",
      eat_vWorkHours: "8h 40m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-6",
      eat_vName: "Sakthi",
      eat_vCheckIn: "2025-06-03T09:00:00.000Z",
      eat_vCheckOut: "2025-06-03T18:00:00.000Z",
      eat_vStatus: "Present",
      eat_vWorkHours: "9h 0m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-7",
      eat_vName: "Praveen",
      eat_vCheckIn: "2025-06-03T09:30:00.000Z",
      eat_vCheckOut: "2025-06-03T18:00:00.000Z",
      eat_vStatus: "Present",
      eat_vWorkHours: "8h 30m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-8",
      eat_vName: "Nava deepak",
      eat_vCheckIn: "2025-06-03T09:10:00.000Z",
      eat_vCheckOut: "2025-06-03T17:50:00.000Z",
      eat_vStatus: "Present",
      eat_vWorkHours: "8h 40m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-9",
      eat_vName: "Muthu7",
      eat_vCheckIn: "2025-06-03T11:00:00.000Z",
      eat_vCheckOut: "2025-06-03T14:00:00.000Z",
      eat_vStatus: "Half day",
      eat_vWorkHours: "3h 0m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-10",
      eat_vName: "Mugesh",
      eat_vCheckIn: "2025-06-03T09:05:00.000Z",
      eat_vCheckOut: "2025-06-03T18:00:00.000Z",
      eat_vStatus: "Present",
      eat_vWorkHours: "8h 55m",
      eat_vDate: yesterday,
    },
    {
      eat_vEmpId: "QF120250519-11",
      eat_vName: "logesh",
      eat_vCheckIn: "2025-06-03T10:00:00.000Z",
      eat_vCheckOut: "2025-06-03T14:00:00.000Z",
      eat_vStatus: "Half day",
      eat_vWorkHours: "4h 0m",
      eat_vDate: yesterday,
    },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  const getFormattedDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  };

  useEffect(() => {
    if (!attendanceData || attendanceData.length === 0) {
      setFilteredData([]);
      setTodayCount(0);
      setYesterdayCount(0);
      setAllCount(0);
      return;
    }

    const newFilteredData = attendanceData.filter((data) => {
      const matchesSearch =
        searchTerm === "" ||
        data.eat_vEmpId
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        data.eat_vName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.eat_vDate?.includes(searchTerm);

      const matchesStatus =
        filterStatus === "All" || data.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    setFilteredData(newFilteredData);

    setTodayCount(
      newFilteredData.filter(
        (item) => item.eat_vDate === getFormattedDate(new Date())
      ).length || 0
    );

    setYesterdayCount(
      newFilteredData.filter(
        (item) => item.eat_vDate === getFormattedDate(getYesterdayDate())
      ).length || 0
    );

    setAllCount(newFilteredData.length || 0);
  }, [attendanceData, searchTerm, filterStatus]);

  useEffect(() => {
    getAttendanceByMonth(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const getAttendanceByMonth = async (month, year) => {
    setLoading(true);
    try {
      // const response = await AxiosInstance.post(
      //   "/employee-attendance/get-attendance-by-month",
      //   {
      //     month: month,
      //     year: year,
      //     eat_vComID: user.c_vComId,
      //   }
      // );
      // console.log(response.data.response);

      // setAttendanceData(response.data.response || []);
      setAttendanceData(StaticAttendanceData);
    } catch (error) {
      setAttendanceData([]);
      console.error(
        "Error fetching attendance:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  function formatTimestamp(isoString) {
    return new Date(isoString).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  function formatDatestamp(isoString) {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((data, index) => ({
        "S.No": index + 1,
        "Employee ID": data.eat_vEmpId,
        Name: data.eat_vName,
        Date: formatDatestamp(data.eat_vDate),
        Status: data.eat_vStatus,
        "Check In": data.eat_vCheckIn
          ? formatTimestamp(data.eat_vCheckIn)
          : "--",
        "Check Out": data.eat_vCheckOut
          ? formatTimestamp(data.eat_vCheckOut)
          : "--",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const monthName = months.find((m) => m.value === selectedMonth)?.label;

    XLSX.writeFile(workbook, `Attendance_${monthName}_${selectedYear}.xlsx`);
  };

  return (
    <div className="flex flex-col gap-8 ">
      {/* <div>
        <NavData navdata={navdata} />
      </div> */}
      <div>
        <section className="flex flex-row max-md:flex-wrap justify-between gap-5">
          <div className="flex w-full flex-row gap-5 max-md:flex-wrap justify-between items-center">
            <div className="flex w-fit justify-between items-center px-2 gap-4">
              <div className="flex w-fit justify-between items-center px-2 border-2">
                <Icon
                  icon="uil:search"
                  className="text-[--light-gray]"
                  width="20"
                  height="20"
                />
                <input
                  type="text"
                  placeholder="Search employees by ID, Name etc..."
                  className="w-72 max-md:w-full h-10 outline-none placeholder:text-sm px-2 text-[--text-gray]"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                className="border-2 rounded-lg px-2 py-1 text-gray-700"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              <select
                className="border-2 rounded-lg px-2 py-1 text-gray-700"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <button
                onClick={downloadExcel}
                disabled={filteredData.length === 0}
                className={`flex items-center gap-1 px-4 py-1 rounded-lg ${
                  filteredData.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <Icon icon="uil:download-alt" width="18" height="18" />
                <span>Export Excel</span>
              </button>
            </div>
          </div>
        </section>
        <section className="mt-5 max-h-[650px] overflow-auto rounded-md w-full">
          {loading ? (
            <div className="flex justify-center items-center">
              <img src={face} className="w-16 h-16" alt="Loading..." />
            </div>
          ) : filteredData.length > 0 ? (
            <table className="text-center bg-white w-full relative">
              <thead className="bg-[--dark-blue] text-white sticky top-0 z-50">
                <tr>
                  <th className="py-3">S.No</th>
                  <th className="py-3">Employee ID</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Check In</th>
                  <th className="py-3">Check Out</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-4">{index + 1}</td>
                    <td className="py-4">{data.eat_vEmpId}</td>
                    <td className="py-4">{data.eat_vName}</td>
                    <td className="py-4">{formatDatestamp(data.eat_vDate)}</td>
                    <td className="py-4">
                      <p
                        className={`px-0 py-1 rounded min-w-8 ${
                          data.eat_vStatus === "Present"
                            ? "bg-green-100 text-green-800"
                            : data.eat_vStatus === "Absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {data.eat_vStatus}
                      </p>
                    </td>
                    <td
                      className={`py-4 ${
                        data.eat_vCheckIn
                          ? new Date(`2000/01/01 ${data.eat_vCheckIn}`) >
                            new Date(`2000/01/01 9:30 AM`)
                            ? "text-red-600"
                            : "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {!data.eat_vCheckIn
                        ? "--"
                        : formatTimestamp(data.eat_vCheckIn)}
                    </td>
                    <td
                      className={`py-4 ${
                        data.eat_vCheckOut
                          ? new Date(`2000/01/01 ${data.eat_vCheckOut}`) <
                            new Date(`2000/01/01 5:00 PM`)
                            ? "text-red-600"
                            : "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {!data.eat_vCheckOut
                        ? "--"
                        : formatTimestamp(data.eat_vCheckOut)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 font-bold text-gray-500">
              No records found for this month
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AttendanceLog;
