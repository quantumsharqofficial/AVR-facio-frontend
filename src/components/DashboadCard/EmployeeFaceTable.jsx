import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function EmployeeFaceTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const currentDate = new Date();
  const today = currentDate.toISOString().split("T")[0];
  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter data based on the search term (ID, Name, etc.)
  const filteredData = data.filter(
    (employee) =>
      employee.Employee_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
                placeholder="Search employees by ID, Name, etc..."
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
          {/* Table Header */}
          <thead className="bg-[--dark-blue] text-white sticky top-0 z-50">
            <tr className="text-sm uppercase">
              <th className="py-3">S.no</th>
              <th className="py-3">Profile</th>
              <th className="py-3">Employee_ID</th>
              <th className="py-3">Name</th>
              {/* <th className="py-3">Position</th> */}
              <th className="py-3">Leave Count</th>
              <th className="py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employee, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 transition-all"
              >
                <td className="py-4 px-4 ">{index + 1}</td>
                <img
                  src={employee.Profile || "/default-avatar.png"}
                  alt="Employee"
                  className="w-14 h-14 rounded-full object-cover mx-auto"
                />
                <td className="py-4 px-4">{employee.Employee_ID}</td>
                <td className="py-4 px-4">{employee.Name}</td>
                {/* <td>{employee.position}</td> */}
                <td className="py-4 px-4 ">{employee.Leave_Count}</td>
                <td className="py-4 px-4 flex items-center justify-center"><Link
                  to={`/employee-face/${employee.Employee_ID}/${today}`}
                >
                  {" "}
                  <Icon
                    icon="ant-design:eye-outlined"
                    className="text-2xl  font-extrabold h-12 w-8  hover:text-blue-500"
                  />
                </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default EmployeeFaceTable;
