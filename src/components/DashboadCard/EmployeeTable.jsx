import React, { useState } from "react";
import { Icon } from "@iconify/react";

function EmployeeTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [modalImage, setModalImage] = useState(null);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter employees based on search input
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Format Date (if applicable)
  const formatDatestamp = (date) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  // Format Time (Check-in & Check-out)
  const formatTimestamp = (time) =>
    time ? new Date(`2000/01/01 ${time}`).toLocaleTimeString() : "--";

  return (
    <div className="overflow-x-auto shadow-md rounded-lg mt-12">
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
          {/* ✅ Table Header */}
          <thead className="bg-[--dark-blue] text-white sticky top-0 z-50">
            {/* <tr className="text-sm uppercase">
              <th className="py-3">S.no</th>
              <th className="py-3">Image</th>
              <th className="py-3">Employee ID</th>
              <th className="py-3">Name</th>
              <th className="py-3">Gender</th>
              <th className="py-3">Email</th>
            </tr> */}
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
                  <td className="py-4 px-4">
                    <img
                      src={item.Profile || "/default-avatar.png"}
                      onClick={() => setModalImage(item.Profile)}
                      alt="Employee"
                      className="w-16 h-16 rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td className="py-4 px-4">{item.Employee_ID}</td>
                  <td className="py-4 px-4">{item.Name}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-nowrap w-full items-center justify-center gap-2 ">
                      {item.Gender}
                      <Icon
                        icon={
                          item.Gender == "Male"
                            ? "material-symbols:male"
                            : item.Gender == "Female"
                            ? "material-symbols:female"
                            : "material-symbols:transgender"
                        }
                        className={
                          item.Gender == "Male"
                            ? "text-[--dark-blue]"
                            : item.Gender == "Female"
                            ? "text-[--light-blue]"
                            : "text-blue-500"
                        }
                        // className="text-blue"
                      />{" "}
                    </div>
                  </td>
                  <td className="py-4 px-4">{item.Phone}</td>
                  <td className="py-4 px-4">{item.Email}</td>
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
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setModalImage(null)} // close modal on outside click
        >
          <div className="bg-white p-4 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-white font-bold text-xl bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setModalImage(null)}
            >
              ×
            </button>

            <img
              src={modalImage}
              alt="Enlarged"
              className="max-w-full max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
