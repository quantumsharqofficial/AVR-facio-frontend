import React, { useEffect, useState } from "react";
import { use } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { Icon } from "@iconify/react/dist/iconify.js";
import NavData from "../../components/NavDataComponent/NavData";
import face from "../../assets/Logo/faceScaning.gif";
import { Link } from "react-router-dom";

function FaceAlert() {
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const navdata = [{ name: "Face alert System" }];

  const currentDate = new Date();
  const today = currentDate.toISOString().split("T")[0];
  const yesterday = new Date();
  yesterday.setDate(currentDate.getDate() - 1);
  const formattedYesterday = yesterday.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(false); // Loading state


  const faceAlertData = [
  {
    ef_vEmpId: "QF120250519-11",
    ef_vName: "logesh",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 1,
    out_count: 5,
    e_vProfileImg:"https://quantumfacio.com/api/images/EmployeeProfile/WhatsApp%20Image%202025-03-20%20at%2011.26.19%20AM.jpeg",
  },
  {
    ef_vEmpId: "QF120250519-10",
    ef_vName: "Mugesh",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 2,
    out_count: 3,
    e_vProfileImg: "https://quantumfacio.com/api/images/EmployeeProfile/Mugesh_202505191258.jpg",
  },
  {
    ef_vEmpId: "QF120250519-9",
    ef_vName: "Muthu7",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 0,
    out_count: 6,
    e_vProfileImg: "https://quantumfacio.com/api/images/EmployeeProfile/Muthu%20mani%20maran_202505191533.jpg",
  },
  {
    ef_vEmpId: "QF120250519-8",
    ef_vName: "Nava deepak",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 3,
    out_count: 3,
    e_vProfileImg: "https://quantumfacio.com/api/images/EmployeeProfile/Nava%20deepak%20_202505191550.jpg",
  },
  {
    ef_vEmpId: "QF120250519-7",
    ef_vName: "Praveen",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 4,
    out_count: 2,
    e_vProfileImg: "https://quantumfacio.com/api/images/EmployeeProfile/WhatsApp%20Image%202025-03-20%20at%2011.26.21%20AM%20(2).jpeg",
  },
  {
    ef_vEmpId: "QF120250519-6",
    ef_vName: "Sakthi",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 0,
    out_count: 6,
    e_vProfileImg: "https://quantumfacio.com/api/images/EmployeeProfile/Sakthi_202505191556.jpg",
  },
  {
    ef_vEmpId: "QF120250519-5",
    ef_vName: "Sri Naveen",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 1,
    out_count: 4,
    e_vProfileImg: "https://quantumfacio.com/api/images/EmployeeProfile/Sri%20Naveen_202505191600.jpg",
  },
  {
    ef_vEmpId: "QF120250519-4",
    ef_vName: "sriram",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 3,
    out_count: 2,
    e_vProfileImg:"http://quantumfacio.com/api/images/EmployeeProfile/WhatsApp%20Image%202025-04-03%20at%204.28.29%20PM.jpeg",
  },
  {
    ef_vEmpId: "QF120250519-3",
    ef_vName: "suresh",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 2,
    out_count: 2,
    e_vProfileImg:"https://quantumfacio.com/api/images/EmployeeProfile/sure_202505161102.jpeg",
  },
  {
    ef_vEmpId: "QF120250519-2",
    ef_vName: "Vivek",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 5,
    out_count: 1,
    e_vProfileImg: "https://quantumfacio.com/api/images/EmployeeProfile/Vivek_202505191554.jpg",
  },
  {
    ef_vEmpId: "QF120250519-1",
    ef_vName: "yuvaraj",
    ef_date: "2025-06-04T00:00:00.000Z",
    in_count: 2,
    out_count: 2,
    e_vProfileImg:"https://quantumfacio.com/api/images/EmployeeProfile/yuvaraj_202505161103.jpeg",
  },
];



  const handleDateChange = (e) => {
    const selectedValue = e.target.value;
    const date = new Date(e.target.value);
    const dateToFetch = date.toISOString().split("T")[0];

    setSelectedDate(dateToFetch);
  };

  const [employeeFace, setEmployeeFace] = useState([]);
  const [rarely, setRarely] = useState([]);
  const [frequently, setFrequently] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmployeeFace = async () => {
    setLoading(true); // Start loading
    const payload = {
      ef_vComID: userInfo.c_vComId,
      ef_date: selectedDate,
    };
    try {
      // const response = await AxiosInstance.post(
      //   `/face-alert/getdate-by-company`,
      //   payload
      // );
      // console.log(response);
      
      // const responseData = response;
      // const frequently = responseData.data.response.frequently;
      // const rarely = responseData.data.response.rarely;
      // setEmployeeFace([...frequently, ...rarely]);
      setEmployeeFace(faceAlertData)
    } catch (err) {
      console.log(err);
      setEmployeeFace([]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchEmployeeFace();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter employees based on search term
  const filteredEmployees = employeeFace.filter(
    (employee) =>
      employee.ef_vEmpId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.ef_vName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <NavData navdata={navdata} />
      </div>

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
        <div className="flex w-fit justify-between items-center px-2 gap-4">
          {/* Dropdown */}
          <input
            type="date"
            className="border-2 rounded-lg px-2 py-1"
            onChange={handleDateChange}
            defaultValue={today}
          />
          <button
            onClick={fetchEmployeeFace}
            className="bg-blue-600 p-2 rounded-lg text-white *:first-letter:"
          >
            search
          </button>
        </div>
      </section>
      <section className="mt-5 max-h-[650px] overflow-auto rounded-md w-full">
        {loading ? (
          <div className="flex justify-center items-center">
            <img src={face} className="w-16 h-16" alt="Loading..." />
          </div>
        ) : (
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
              {filteredEmployees?.map((employee, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-gray-100 transition-all  ${
                    employee.out_count >= 5 ? "bg-red-50" : "bg-blue-50"
                  }`}
                >
                  <td className="py-4 px-4 ">{index + 1}</td>
                  <img
                    src={employee.e_vProfileImg || "/default-avatar.png"}
                    alt="Employee"
                    className="w-14 h-14 rounded-full object-cover mx-auto"
                  />
                  <td className="py-4 px-4">{employee.ef_vEmpId}</td>
                  <td className="py-4 px-4">{employee.ef_vName}</td>
                  {/* <td>{employee.position}</td> */}
                  <td className="py-4 px-4">{employee.out_count}</td>
                  <td className=" flex items-center justify-center">
                    <Link
                      to={`/employee-face/${employee.ef_vEmpId}/${selectedDate}`}
                    >
                      {" "}
                      <Icon
                        icon="ant-design:eye-outlined"
                        className="text-2xl  font-extrabold h-12 w-8  hover:text-blue-500"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default FaceAlert;
