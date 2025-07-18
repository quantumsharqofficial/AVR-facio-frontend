import { useEffect, useState } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { message } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";

function EmployeeAttendance({ bg, text }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const { id } = useParams(); // Move useParams() here
  const user = JSON.parse(sessionStorage.getItem("user"));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [message, setMessage] = useState("");
  const fetchEmployeeAttendance = async () => {
    try {
      const response = await AxiosInstance.post(
        "/employee-attendance/get-employee-attendance-year",
        {
          eat_vComID: user?.c_vComId,
          eat_vEmpId: id,
          year: selectedYear,
        }
      );
      setAttendanceData(response?.data?.response?.reverse() || []);
      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error fetching attendance:",
        error.response?.data || error.message
      );
      setAttendanceData([]); // Set to empty array on error
    }
  };
  useEffect(() => {
    fetchEmployeeAttendance();
  }, [selectedYear, id]); // Add id to the dependency array

  function formatDatestamp(isoString) {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  function formatTimestamp(isoString) {
    return new Date(isoString).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // Enable 12-hour format
    });
  }

  const downloadExcel = () => {
    // attendanceData உள்ள data-ஐ பயன்படுத்துவோம்
    if (!attendanceData || attendanceData.length === 0) {
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(
      attendanceData.map((data, index) => ({
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
        "Work Hours": data.eat_vWorkHours || "0:00",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    // File name without month (month select UI இல்லை)
    XLSX.writeFile(workbook, `Attendance_${selectedYear}.xlsx`);
  };

  return (
    <div>
      {" "}
      {attendanceData && (
        <div className="mt-2 bg-gray-50  p-2 rounded-lg w-full max-w-8xl shadow-lg text-gray-800 ">
          {/* <h3 className={`text-xl font-bold border-b pb-3 mb-5 ${page=="employee"?"hidden":""} `}>
            Attendance Details
          </h3> */}
          <div className="flex flex-col items-center space-x-6 w-full">
            {/* <div className="text-lg w-full"> */}
            <div className="flex w-full mb-4 px-3  items-center justify-end gap-4">
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
                disabled={!attendanceData || attendanceData.length === 0}
                className={`flex items-center gap-1 px-4 py-1 rounded-lg text-white 
    ${
      !attendanceData || attendanceData.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }`}
              >
                <Icon icon="uil:download-alt" width="18" height="18" />
                <span>Export Excel</span>
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="overflow-auto max-h-[700px] w-full border border-gray-300 rounded-lg">
              {" "}
              {attendanceData.length === 0 ? (
                <p className="text-center text-red-600 my-4">{message}</p>
              ) : (
                <table className="text-center bg-white w-full relative">
                  <thead className={`${bg} text-white sticky top-0 z-50`}>
                    <tr>
                      <th className="py-2">Date</th>
                      <th className="py-2">Check In</th>
                      <th className="py-2">Check Out</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Work Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-1">
                          {formatDatestamp(item.eat_vDate)}
                          {/* {item.eat_vCheckIn} */}
                        </td>

                        <td className={`py-1 `}>
                          {!item.eat_vCheckIn
                            ? "--"
                            : formatTimestamp(
                                item.eat_vCheckIn,
                                item.eat_vDate
                              )}
                          {/* {item.eat_vCheckIn} */}
                        </td>
                        <td className={`py-1`}>
                          {!item.eat_vCheckOut
                            ? "--"
                            : formatTimestamp(item.eat_vCheckOut)}
                          {/* {item.eat_vCheckOut} */}
                        </td>
                        <td className="py-1">
                          <p
                            className={`px-0 py-1 rounded min-w-8 ${
                              item.eat_vStatus === "Present"
                                ? "bg-green-100 text-green-800"
                                : item.eat_vStatus === "Absent"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.eat_vStatus}
                          </p>
                        </td>
                        <td className="py-1">
                          {item.eat_vWorkHours || "0:00"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeAttendance;
