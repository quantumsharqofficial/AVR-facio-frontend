import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance"; // Ensure this import path is correct

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to show/hide modal

  const [empDetails, setEmpDetails] = useState({
    e_vEmpId: "",
    e_vComId: "",
    e_vName: "",
    e_vDateOfBrith: "",
    e_vPhone: "",
    e_vSencondryPhone: "",
    e_eGender: "",
    e_vJoinDate: "",
    e_vDesignation: "",
    e_vEmail: "",
    e_vAddress: "",
    e_vPassword: "",
    e_vProfileImg: "",
    e_vRefId: "",
  });

  const [previewImg, setPreviewImg] = useState(null);

  const getEmpDetails = async () => {
    try {
      const response = await AxiosInstance.get(
        `/employee/get-employee-by-id/${id}`
      );
      const employee = response.data.response[0];
      setEmpDetails(employee);
      setPreviewImg(employee.e_vProfileImg || null);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  useEffect(() => {
    getEmpDetails();
  }, [id]);

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImg(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("e_vEmpId", empDetails.e_vEmpId);
    formData.append("e_vComId", empDetails.e_vComId);
    formData.append("e_vName", empDetails.e_vName);
    formData.append("e_vDateOfBrith", empDetails.e_vDateOfBrith);
    formData.append("e_vPhone", empDetails.e_vPhone);
    formData.append("e_vSencondryPhone", empDetails.e_vSencondryPhone);
    formData.append("e_eGender", empDetails.e_eGender);
    formData.append("e_vJoinDate", empDetails.e_vJoinDate);
    formData.append("e_vDesignation", empDetails.e_vDesignation);
    formData.append("e_vEmail", empDetails.e_vEmail);
    formData.append("e_vAddress", empDetails.e_vAddress);
    formData.append("e_vRefId", empDetails.e_vRefId);

    // Append image file only if selected
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("e_vProfileImage", empDetails.e_vProfileImg);
    }
    try {
      const response = await AxiosInstance.patch(
        `/employee/update-employee`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpDetails({ ...empDetails, [name]: value });
  };

  const deleteEmployee = async () => {
    try {
      const response = await AxiosInstance.patch(`/employee/delete-employee/`, {
        e_vEmpId: empDetails.e_vEmpId,
        e_vComId: empDetails.e_vComId,
      });
      navigate("/employee");
    } catch (error) {
      console.error(
        "Error deleting employee:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleDelete = async () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Personal Information
      </h2>

      {/* Profile Image Upload */}
      <div className="flex justify-center">
        <label className="relative cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="w-28 h-28 border-2 border-dashed rounded-full flex items-center justify-center text-gray-400 overflow-hidden">
            {previewImg ? (
              <img
                src={previewImg}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>Upload Image</span>
            )}
          </div>
        </label>
      </div>

      {/* Name & Birth Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-gray-600">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            name="e_vName"
            type="text"
            className="border rounded-md px-3 py-2"
            value={empDetails.e_vName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600">Birth Date</label>
          <input
            type="date"
            name="e_vDateOfBrith"
            className="border rounded-md px-3 py-2"
            value={empDetails.e_vDateOfBrith}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-gray-600">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="e_vPhone"
            className="border rounded-md px-3 py-2"
            value={empDetails.e_vPhone}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600">Secondary Phone</label>
          <input
            type="tel"
            name="e_vSencondryPhone"
            className="border rounded-md px-3 py-2"
            value={empDetails.e_vSencondryPhone}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Gender & ID */}
      <div className="flex flex-col md:flex-row gap-5 justify-between">
        {/* Gender */}
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
                checked={empDetails.e_eGender === "male"}
                onChange={handleInputChange}
              />{" "}
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="e_eGender"
                value="female"
                checked={empDetails.e_eGender === "female"}
                onChange={handleInputChange}
              />{" "}
              Female
            </label>
          </div>
        </div>

        {/* ID */}
        <div className="flex flex-col w-1/2 px-2">
          <label className="text-gray-600">ID</label>
          <input
            type="text"
            name="e_vRefId"
            className="border rounded-md px-3 py-2"
            value={empDetails.e_vRefId}
            onChange={handleInputChange}
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
            value={empDetails.e_vEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600">Designation</label>
          <input
            type="text"
            name="e_vDesignation"
            className="border rounded-md px-3 py-2"
            value={empDetails.e_vDesignation}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600">Join Date</label>
          <input
            type="date"
            name="e_vJoinDate"
            className="border rounded-md px-3 py-2"
            value={empDetails.e_vJoinDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label className="text-gray-600">Address</label>
        <textarea
          name="e_vAddress"
          className="border rounded-md px-3 py-2 h-24"
          value={empDetails.e_vAddress}
          onChange={handleInputChange}
        />
      </div>

      {/* Submit Button */}
      <div className="flex w-full justify-center gap-5">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 w-1/2 rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          Submit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 w-1/2 rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          Delete
        </button>
      </div>
      {/* <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          Submit
        </button> */}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this employee?
            </p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                onClick={deleteEmployee}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditEmployee;
