import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";
import Performance from "./perfomance";
import EmployeeAttendance from "./EmployeeAttendance";
import { Icon } from "@iconify/react/dist/iconify.js";
import NavData from "../NavDataComponent/NavData";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [bg, setBg] = useState("bg-gray-100");
  const [text, setText] = useState("text-gray-500");
  const navdata = [{ name: "Employee" }, { name: "Details" }];
  useEffect(() => {
    const getEmployeeById = async () => {
      try {
        const response = await AxiosInstance.get(
          `/employee/get-employee-by-id/${id}`
        );
        const empData = response.data.response[0];
        setEmployee(empData);

        if (empData?.e_eGender === "Male") {
          setBg("bg-[--dark-blue]");
          setText("text-[--dark-blue]");
        } else if (empData?.e_eGender === "Female") {
          setBg("bg-[--dark-blue]");
          setText("text-[--light-blue]");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    getEmployeeById();
  }, [id]);

  return (
    <div>
      <div className="w-full mb-2">
        <NavData navdata={navdata} />
      </div>
      <div className="bg-gray-100 min-h-screen  flex flex-col md:flex-row gap-6 m">
        {/* Left Section */}
        <div className="bg-gray-100 min-h-screen px-6 w-full md:w-2/5 flex flex-col gap-8">
          {/* Employee Card */}
          <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col md:flex-row w-full items-center gap-6 border border-gray-200 relative overflow-hidden">
            {/* Gradient Header */}
            <div
              className={`absolute top-0 left-0 w-full h-fit p-3 ${bg} rounded-t-xl text-lg font-semibold text-white`}
            >
              Employee Details
            </div>

            {/* Profile Image */}
            <div className="flex flex-col mt-8 items-center justify-center  w-full p-4">
              <img
                src={employee?.e_vProfileImg || "/default-profile.png"}
                alt="Employee Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-lg"
              />
              <p className="text-xl font-semibold text-gray-900 mt-3 flex gap-2">
                {employee?.e_vName}
              </p>
              <p>{employee?.e_vEmpId}</p>

              <p className="text-gray-600 flex flex-nowrap gap-2">
                <Icon
                  icon={
                    employee?.e_eGender === "Male"
                      ? "material-symbols:male"
                      : employee?.e_eGender === "Female"
                      ? "material-symbols:female"
                      : "material-symbols:transgender"
                  }
                  width="24"
                  height="24"
                  className={text}
                />{" "}
                {employee?.e_eGender}
              </p>
              {/* <p className="text-gray-600 flex items-center gap-2">
                <Icon
                  icon="fluent:call-32-regular"
                  width="22"
                  height="22"
                  className={text}
                />
                {employee?.e_vPhone}
              </p> */}
            </div>

            {/* Employee Details */}
            <div className="flex flex-col gap-4 mt-12 text-gray-700 w-full">
              <p>
                <strong>Designation:</strong> {employee?.e_vDesignation}
              </p>{" "}
              <p>
                <strong>Email:</strong> {employee?.e_vEmail}
              </p>
              {/* <p>
                <strong>Company ID:</strong> {employee?.e_vComId}
              </p> */}
              <p>
                <strong>Phone No:</strong> {employee?.e_vPhone},
                {employee?.e_vSencondryPhone}
              </p>
              <p>
                <strong>Join Date:</strong>{" "}
                {employee?.e_vJoinDate
                  ? new Date(employee.e_vJoinDate).toLocaleDateString()
                  : "N/A"}
              </p>{" "}
              <p>
                <strong>DOB:</strong>{" "}
                {employee?.e_vDateOfBrith
                  ? new Date(employee.e_vDateOfBrith).toLocaleDateString()
                  : "N/A"}
              </p>  
              <p>
                <strong>Address:</strong> {employee?.e_vAddress}
              </p>
            </div>
          </div>

          {/* Performance Section */}
          <div className="bg-white shadow-xl rounded-xl w-full p-4 sm:p-6">
            <div
              className={`w-full h-fit p-3 sm:p-4 rounded-t-xl text-lg sm:text-xl font-semibold text-white ${bg}`}
            >
              Performance Details
            </div>
            <div className="w-full overflow-x-auto">
              <Performance />
            </div>
          </div>
        </div>

        {/* Right Section (Employee Attendance Table) */}
        <div className="bg-white shadow-xl rounded-xl h-fit w-full md:w-3/5">
          <div
            className={`w-full h-fit p-3 rounded-t-xl text-lg font-semibold text-white ${bg}`}
          >
            Attendance Details
          </div>
          <EmployeeAttendance bg={bg} text={text} />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
