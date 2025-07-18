import React, { useState } from "react";
import NavData from "../../components/NavDataComponent/NavData";
import { message } from "antd";
import AxiosInstance from "../../util/AxiosInstance";
import { useNavigate } from "react-router-dom";

function AddEmployee({ setSteper, setEmpID, setEmpName }) {
  const compData = JSON.parse(sessionStorage.getItem("user"));
  compData;

  const navdata = [{ name: "Employee" }, { name: "Add Employee" }];

  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    e_vComId: compData.c_vComId,
    e_vName: "",
    e_vDateOfBrith: "",
    e_vPhone: "",
    e_vSencondryPhone: "",
    e_eGender: "",
    e_vEmail: "",
    e_vDesignation: "",
    e_vJoinDate: "",
    e_vAddress: "",
    e_vPassword: "111",
    profileImage: null,
    e_vRefId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeData((prev) => ({
        ...prev,
        profileImage: file, // Store the image URL
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    employeeData;
    const formData = new FormData();

    // Append employee data fields
    Object.keys(employeeData).forEach((key) => {
      if (key === "profileImage") {
        let file = employeeData[key];
        const fileExtension = file.name.split(".").pop();
        const today = new Date();
        const datePart = today.toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD
        const timePart =
          today.getHours().toString().padStart(2, "0") +
          today.getMinutes().toString().padStart(2, "0"); // HHMM
        const timestamp = `${datePart}${timePart}`;
        const newFileName = `${employeeData.e_vName}_${timestamp}.${fileExtension}`;
        const renamedFile = new File([file], newFileName, { type: file.type });

        formData.append("image", renamedFile);
        return;
      } else {
        const value =
          key === "e_vName" ? employeeData[key].trim() : employeeData[key];
        formData.append(key, value);
      }
    });

    try {
      const response = await AxiosInstance.post(
        "/employee/add-employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success(response.data.message);
      setEmpID(response.data.response.id);
      setEmpName(formData.get("e_vName"));
      const id = response.data.response.id;
      const name = formData.get("e_vName");

      setTimeout(() => {
        // setSteper(2);
        navigate(`/add-img/${id}/${name}`);
      }, 2000);
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Error adding employee");
    }
  };

  return (
    <div>
      <NavData navdata={navdata} />
      <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Personal Information
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center">
          <label
            htmlFor="profileImageInput"
            className="cursor-pointer relative"
          >
            <input
              type="file"
              id="profileImageInput"
              className="hidden"
              onChange={handlePhotoChange}
            />
            {employeeData.profileImage ? (
              <img
                src={
                  typeof employeeData.profileImage === "string"
                    ? employeeData.profileImage
                    : URL.createObjectURL(employeeData.profileImage)
                }
                alt="Profile"
                className="w-28 h-28 object-cover rounded-full border"
              />
            ) : (
              <div className="w-28 h-28 border-2 border-dashed rounded-full flex items-center justify-center text-gray-400">
                Upload Image <span className="text-red-500">*</span>
              </div>
            )}
          </label>
        </div>

        {/* Name & Birth Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="e_vName"
              className="border rounded-md px-3 py-2"
              value={employeeData.e_vName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Birth Date</label>
            <input
              type="date"
              name="e_vDateOfBrith"
              className="border rounded-md px-3 py-2"
              value={employeeData.e_vDateOfBrith}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Phone Numbers & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="e_vPhone"
              className="border rounded-md px-3 py-2"
              value={employeeData.e_vPhone}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Secondary Phone</label>
            <input
              type="tel"
              name="e_vSencondryPhone"
              className="border rounded-md px-3 py-2"
              value={employeeData.e_vSencondryPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 justify-between ">
          <div className="flex flex-col">
            <label className="text-gray-600">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="e_eGender"
                  value="male"
                  checked={employeeData.e_eGender === "male"}
                  onChange={handleInputChange}
                />{" "}
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="e_eGender"
                  value="female"
                  checked={employeeData.e_eGender === "female"}
                  onChange={handleInputChange}
                />{" "}
                Female
              </label>
            </div>
          </div>{" "}
          <div className="flex flex-col w-1/2 px-2">
            <label className="text-gray-600">ID</label>
            <input
              type="text"
              name="e_vRefId"
              className="border rounded-md px-3 py-2"
              value={employeeData.e_vRefId} // ✅ controlled input
              onChange={handleInputChange} // ✅ update state on change
            />
          </div>
        </div>

        {/* Email, Designation, Join Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="e_vEmail"
              className="border rounded-md px-3 py-2"
              value={employeeData.e_vEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Designation</label>
            <input
              type="text"
              name="e_vDesignation"
              className="border rounded-md px-3 py-2"
              value={employeeData.e_vDesignation}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Join Date</label>
            <input
              type="date"
              name="e_vJoinDate"
              className="border rounded-md px-3 py-2"
              value={employeeData.e_vJoinDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="text-gray-600">Address</label>
          <input
            type="text"
            name="e_vAddress"
            className="border rounded-md px-3 py-2"
            value={employeeData.e_vAddress}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AddEmployee;
