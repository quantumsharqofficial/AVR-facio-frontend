import React, { useState } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import NavData from "../../components/NavDataComponent/NavData";
import EmployeeAttendanceChart from "../../components/Chart/employeeAttendanceChart";
import { Icon } from "@iconify/react/dist/iconify.js";
import { message } from "antd";

const GetEmployeeById = () => {
  const userInfo = JSON.parse(sessionStorage?.getItem("user"));
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [attendanceMessage, setAttendanceMessage] = useState("");
  const [attendanceData, setAttendanceData] = useState(null);

  const navdata = [{ name: "Late Comers" }];
  const [todayAttendance, setTodayAttendance] = useState(null);

  const date = new Date();
  const options = { month: "long", year: "numeric" };
  const monthYear = date.toLocaleDateString("en-US", options);

  const [empError, setEmpError] = useState("");
  const [attError, setAttError] = useState("");

  const handleFetchEmployee = async () => {
    if (!employeeId) {
      setEmpError("Please enter an Employee ID");
      return;
    }
    setEmpError("");
    setAttError("");

    try {
      const employeeResponse = await AxiosInstance.post(
        "/employee/get-employee",
        {
          e_vEmpId: employeeId,
          e_vComId: userInfo.c_vComId,
        }
      );
      setEmployeeData(employeeResponse.data.response[0] || []);
      setEmpError(null);
    } catch (err) {
      setEmpError("Failed to fetch employee details");
      setEmployeeData(null);
    }

    try {
      const attendanceResponse = await AxiosInstance.post(
        "/employee-attendance/get-employee-attendance",
        {
          comid: userInfo.c_vComId,
          empid: employeeId,
        }
      );
      const { message, response } = attendanceResponse?.data;

      setTodayAttendance(
        response.find(
          (item) =>
            formatDatestamp(item.eat_vDate) === formatDatestamp(new Date())
        )
      );

      setAttendanceMessage(
        message === "No attendance records found" ? message : ""
      );
      setAttendanceData(
        message === "No attendance records found"
          ? null
          : [...response].reverse().slice(0, 5)
      );
      setAttError(null);
    } catch (err) {
      setAttendanceData([]);
      setTodayAttendance(null);
      setAttError("No attendance data available");
    }
  };

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

  const handleCheckIn = async () => {
    const checkInData = {
      eat_vEmpId: employeeData?.e_vEmpId,
      eat_vComID: userInfo.c_vComId,
      eat_vName: employeeData?.e_vName,
      eat_vCheckIn: new Date().toISOString(),
    };

    try {
      const response = await AxiosInstance.post(
        "/employee-attendance/checkin",
        checkInData
      );
      message.success("Check-in Successful");
      handleFetchEmployee();
    } catch (error) {
      console.error(
        "Check-in Failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleCheckOut = async () => {
    const checkOutData = {
      eat_vEmpId: employeeData?.e_vEmpId,
      eat_vCheckOut: new Date().toISOString(),
    };

    try {
      const response = await AxiosInstance.patch(
        "/employee-attendance/checkout",
        checkOutData
      );
      message.success("Check-out Successful");
      handleFetchEmployee();
    } catch (error) {
      console.error(
        "Check-out Failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      {/* <NavData navdata={navdata} /> */}
      <div className="p-4 flex flex-col justify-center items-center">
        <div className="flex flex-col sm:flex-row items-center gap-2 justify-center w-full max-w-3xl">
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="p-2 border rounded-md w-full sm:w-auto"
          />
          <button
            onClick={handleFetchEmployee}
            disabled={!employeeId}
            className={`p-3 text-white rounded-md w-full sm:w-auto ${
              employeeId ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Fetch Employee
          </button>{" "}
          {employeeData && (
            <div className="flex gap-6 p-6">
              {!todayAttendance?.eat_vCheckIn && (
                <button
                  onClick={handleCheckIn}
                  className="px-8 py-3 text-lg bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition"
                >
                  Check-in
                </button>
              )}
              {todayAttendance?.eat_vCheckIn &&
                !todayAttendance?.eat_vCheckOut && (
                  <button
                    onClick={handleCheckOut}
                    className="px-8 py-3 text-lg bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600 transition"
                  >
                    Check-out
                  </button>
                )}
            </div>
          )}
        </div>

        {employeeData && (
          <div className="flex flex-col lg:flex-row gap-4 mt-6 w-full justify-center items-stretch">
            {/* Employee Card */}
            <div className="bg-gray-50 p-6 rounded-lg w-full max-w-xl shadow-lg text-gray-800">
              <h3 className="text-2xl font-bold border-b pb-3 mb-5">
                Employee Details
              </h3>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                {employeeData.e_vProfileImg && (
                  <img
                    src={employeeData.e_vProfileImg}
                    alt="Employee"
                    className="w-40 h-40 rounded-full border-4 border-gray-400 object-cover"
                  />
                )}
                <div className="text-base sm:text-lg">
                  <p>
                    <strong>Name:</strong> {employeeData.e_vName}
                  </p>
                  <p className="flex items-center gap-2">
                    <strong>Gender:</strong> {employeeData.e_eGender}
                    <Icon
                      icon={
                        employeeData?.e_eGender === "Male"
                          ? "material-symbols:male"
                          : employeeData?.e_eGender === "Female"
                          ? "material-symbols:female"
                          : "material-symbols:transgender"
                      }
                      width="24"
                      height="24"
                      className={
                        employeeData?.e_eGender === "Male"
                          ? "text-[--dark-blue]"
                          : employeeData?.e_eGender === "Female"
                          ? "text-[--light-blue]"
                          : "text-blue-500"
                      }
                    />
                  </p>
                  <p>
                    <strong>Phone:</strong> {employeeData.e_vPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            {attendanceData && attendanceData.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg w-full max-w-xl shadow-lg text-gray-800">
                <h3 className="text-2xl font-bold border-b pb-3 mb-5">
                  {monthYear}
                </h3>
                <EmployeeAttendanceChart employeeData={employeeData} />
              </div>
            )}
          </div>
        )}

        {/* Attendance Table Section */}
        {employeeData && attendanceData && attendanceData.length > 0 && (
          <div className="mt-6 bg-gray-50 p-4 sm:p-6 rounded-lg w-full overflow-x-auto shadow-lg">
            <h3 className="text-xl font-bold border-b pb-3 mb-5">
              Attendance Details
            </h3>
            <table className="text-center bg-white w-full min-w-[600px]">
              <thead className="bg-[--dark-blue] text-white sticky top-0 z-50">
                <tr>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Check In</th>
                  <th className="py-2 px-4">Check Out</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Work Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-1 px-4">
                      {formatDatestamp(item.eat_vDate)}
                    </td>
                    <td
                      className={`py-1 px-4 ${
                        item.eat_vCheckIn
                          ? new Date(`2000/01/01 ${item.eat_vCheckIn}`) >
                            new Date(`2000/01/01 9:30 AM`)
                            ? "text-red-600"
                            : "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {!item.eat_vCheckIn
                        ? "Absent"
                        : formatTimestamp(item.eat_vCheckIn, item.eat_vDate)}
                    </td>
                    <td
                      className={`py-1 px-4 ${
                        item.eat_vCheckOut
                          ? new Date(`2000/01/01 ${item.eat_vCheckOut}`) <
                            new Date(`2000/01/01 5:00 PM`)
                            ? "text-red-600"
                            : "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {!item.eat_vCheckOut
                        ? "--"
                        : formatTimestamp(item.eat_vCheckOut)}
                    </td>
                    <td className="py-1 px-4">
                      <p
                        className={`px-2 py-1 rounded min-w-8 inline-block ${
                          item.eat_vStatus === "Present"
                            ? "bg-green-100 text-green-800"
                            : item.eat_vStatus === "Late"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.eat_vStatus}
                      </p>
                    </td>
                    <td className="py-1 px-4">{item.eat_vWorkHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default GetEmployeeById;
