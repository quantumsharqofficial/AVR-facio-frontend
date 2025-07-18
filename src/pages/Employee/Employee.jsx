import React, { useEffect, useState } from "react";
import NavData from "../../components/NavDataComponent/NavData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";
import { Modal } from "antd";

function Employee() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");
  const [carddata, setCarddata] = useState([]);
  const navdata = [{ name: "Employee" }];
  const [extractEmployees, setExtractEmployees] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  const getCarddata = async () => {
    try {
      const response = await AxiosInstance.get(
        `/employee/get-all-employee/${user.c_vComId}`
      );

      const sortedData = (response.data.response || []).sort((a, b) =>
        a.e_vName.localeCompare(b.e_vName)
      );

      setCarddata(sortedData); // directly setting sorted data
      console.log(sortedData); // log only if needed
    } catch (error) {
      console.error("Failed to fetch employee data:", error);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await AxiosInstance.get(
          `/employee/extract-face/${user.c_vComId}`
        );
        // const faceImages = await AxiosInstance.get(
        //   `/employee/face-folder/${user.c_vComId}`
        // );
        // const folders = faceImages.data.employeeFolders || [];
        const employees = response.data.response.employee_names || [];
        setExtractEmployees(employees || []);
        // setEmployeeFolders(folders);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setExtractEmployees([]);
      }
    };
    fetchEmployees();
    getCarddata();
  }, []);

  const filteredEmployees = carddata?.filter((employee) => {
    const searchTerm = searchQuery.trim().toLowerCase();
    return (
      employee.e_vName?.toLowerCase().includes(searchTerm) ||
      employee.e_vEmpId?.toLowerCase().includes(searchTerm) ||
      employee.e_vDesignation?.toLowerCase().includes(searchTerm) ||
      employee.e_vJoinDate?.includes(searchTerm)
    );
  });

  const extractButtonView = (name, id) => {
    let employee = `${name}_${id}`;

    if (extractEmployees.includes(employee)) {
      return "hidden"; // Hide the button if employee exists
    } else {
      return "block"; // Show the button if employee doesn't exist
    }
  };

  return (
    <div className="flex flex-col gap-8 ">
      <div className="w-full flex  gap-2 justify-between">
        {/* <NavData navdata={navdata} /> */}
        <p className="px-4 text-blue-700 text-xl">
          {/* Total Man Power : {carddata.length} */}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <section className="flex flex-col md:flex-row md:justify-between gap-5">
          <div className="flex flex-col md:flex-row gap-5 w-full md:w-auto">
            <div className="flex items-center px-2 border-2 bg-white rounded-lg w-full md:w-72">
              <Icon
                icon="uil:search"
                className="text-[--light-gray]"
                width="20"
                height="20"
              />
              <input
                type="text"
                placeholder="Search employees by ID, Name, etc..."
                className="w-full h-10 outline-none placeholder:text-sm px-2 text-[--text-gray]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div> <p className="px-4 text-blue-700 text-xl">
          Total Man Power : {carddata.length}
        </p>
          <button
            onClick={() => navigate("/add-employee-and-img-upload")}
            className="bg-[--light-blue] text-white rounded-lg px-4 py-2 hover:shadow-md ease-in-out duration-150 flex gap-2"
          ><Icon icon="fluent:person-add-24-regular" width="24" height="24" />
            Add Employee
          </button>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredEmployees.map((card, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 bg-white rounded-lg p-4 cursor-pointer hover:bg-slate-100 hover:shadow-lg "
            >
              <div className="flex flex-row gap-3 items-center ">
                <img
                  src={card.e_vProfileImg}
                  onClick={() => setModalImage(card.e_vProfileImg)}
                  alt="profile"
                  className="rounded-full w-20 h-20 border-2 p-[1px]"
                />
                <div className="flex  justify-between w-full">
                  <div>
                    <p className="font-bold text-lg">{card.e_vName}</p>
                    <p className="text-[--text-gray] font-normal text-sm">
                      {card.e_vDesignation}
                    </p>
                  </div>
                  <div>
                    <Icon
                      icon={
                        card.e_eGender == "Male"
                          ? "material-symbols:male"
                          : card.e_eGender == "Female"
                          ? "material-symbols:female"
                          : "material-symbols:transgender"
                      }
                      width="24"
                      height="24"
                      className={
                        card.e_eGender == "Male"
                          ? "text-[--dark-blue]"
                          : card.e_eGender == "Female"
                          ? "text-[--light-blue]"
                          : "text-blue-500"
                      }
                      // className="text-blue"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#444444] text-base font-semibold flex justify-between">
                  Employee ID{" "}
                  <span className="font-normal text-[--text-gray]">
                    {card.e_vEmpId}
                  </span>
                </p>
                <p className="text-[#444444] text-base font-semibold flex justify-between">
                  ID{" "}
                  <span className="font-normal text-[--text-gray]">
                    {card?.e_vRefId || "--"}
                  </span>
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => navigate(`/edit-employee/${card.e_vEmpId}`)}
                    className="text-[--dark-blue] hover:shadow-md rounded-md font-medium bg-gray-300 px-5 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/add-img/${card.e_vEmpId}/${card.e_vName}`)
                    }
                    className={`text-[--dark-blue] hover:shadow-md rounded-md font-medium bg-[--light-blue] px-5 py-1 ${extractButtonView(
                      card.e_vName,
                      card.e_vEmpId
                    )} `}
                  >
                    Extract
                  </button>

                  <button
                    onClick={() => {
                      navigate(`/employee-details/${card.e_vEmpId}`);
                    }}
                    className={`text-[#003366] hover:shadow-md rounded-md font-medium bg-[#cce7ff] px-5 py-1 `}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
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

export default Employee;
