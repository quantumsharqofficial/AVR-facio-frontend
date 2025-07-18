import React, { useState, useEffect, useRef } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { useParams } from "react-router-dom";
import { message } from "antd";
function AttendanceSystem() {
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [attendanceSystemData, setAttendanceSystemData] = useState([]);
  const [formData, setFormData] = useState({
    atp_vId: "",
    atp_vComId: id,
    atp_vDate: "",
    atp_vPlace: "",
    image: null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      atp_vComId: id,
    }));
  }, []);

  const inputFieldData = [
    {
      label: "Attendance ID",
      name: "atp_vId",
      type: "text",
      placeholder: "Enter Attendance System ID",
    },
    { label: "Date", name: "atp_vDate", type: "date" },
    {
      label: "Place",
      name: "atp_vPlace",
      type: "text",
      placeholder: "Enter Place Name",
    },
    { label: "Image", name: "image", type: "file", accept: "image/*" },
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      if (!formData.atp_vComId.trim()) {
        message.error("Please enter Company ID before selecting a file.");
        return;
      }

      const file = files[0];
      const date = new Date().toISOString().split("T")[0];
      const fileExtension = file.name.split(".").pop();
      const newFileName = `${id}_${date}.${fileExtension}`;
      const renamedFile = new File([file], newFileName, { type: file.type });

      setFormData((prev) => ({
        ...prev,
        image: renamedFile,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.atp_vId ||
      !formData.atp_vComId ||
      !formData.atp_vDate ||
      !formData.atp_vPlace
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    data.append("atp_vId", formData.atp_vId);
    data.append("atp_vComId", id);
    data.append("atp_vDate", formData.atp_vDate);
    data.append("atp_vPlace", formData.atp_vPlace);
    if (formData.image) data.append("image", formData.image);

    try {
      const response = await AxiosInstance.post(
        "/attendance-alarm/add-attendance",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      message.success("Attendance submitted successfully!");

      // Reset Form
      // Reset Form
      setFormData({
        atp_vId: "",
        atp_vComId: id,
        atp_vDate: "",
        atp_vPlace: "",
        image: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Refresh List
      getAttendanceSystemList();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error("Error submitting attendance. Please try again.");
    }
  };

  const getAttendanceSystemList = async () => {
    try {
      const response = await AxiosInstance.post(
        "/attendance-alarm/getattendancessytem",
        {
          atp_vComId: id,
        }
      );
      setAttendanceSystemData(response.data.response);
    } catch (error) {
      console.error(
        "Error fetching attendance list:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getAttendanceSystemList();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 p-4 shadow-md border rounded-md">
          {inputFieldData.map((data, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label className="text-lg font-medium">{data.label}</label>
              <input
                ref={data.name === "image" ? fileInputRef : null}
                type={data.type}
                name={data.name}
                placeholder={data.placeholder || ""}
                className="w-96 border border-gray-400 rounded-md p-2"
                onChange={handleChange}
                value={
                  data.type !== "file" ? formData[data.name] || "" : undefined
                }
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 px-5 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <div className="w-full max-w-4xl">
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                S.No
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                Attendance ID
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                Place
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceSystemData?.map((attendance, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="px-4 py-2 text-sm text-gray-500">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {attendance.atp_vId}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {attendance.atp_vDate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {attendance.atp_vPlace}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {attendance.atp_vImage ? (
                    <img
                      src={attendance.atp_vImage}
                      alt="Attendance"
                      className="w-32 h-32"
                    />
                  ) : (
                    <p>No Image</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceSystem;
