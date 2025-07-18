import React, { useState, useEffect } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { setFaceAlertSystemData } from "../../redux/slices/FASDetailsSlice";
import { useParams } from "react-router-dom";
import { message } from "antd";
function FaceAlertSystem() {
  const { id } = useParams();
  const [faceAlertSystemData, setFaceAlertSystemData] = useState([]);
  const [formData, setFormData] = useState({
    alp_vId: "",
    alp_vComId: id,
    alp_vDate: "",
    alp_vPlace: "",
    image: null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      alp_vComId: id,
    }));
  }, []);

  const inputFieldData = [
    {
      label: "Face System ID",
      name: "alp_vId",
      type: "text",
      placeholder: "Enter Face System ID",
    },
    { label: "Date", name: "alp_vDate", type: "date" },
    {
      label: "Place",
      name: "alp_vPlace",
      type: "text",
      placeholder: "Enter Place Name",
    },
    { label: "Image", name: "image", type: "file", accept: "image/*" },
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      if (!formData.alp_vComId.trim()) {
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
      !formData.alp_vId ||
      !formData.alp_vComId ||
      !formData.alp_vDate ||
      !formData.alp_vPlace
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    data.append("alp_vId", formData.alp_vId);
    data.append("alp_vComId", id);
    data.append("alp_vDate", formData.alp_vDate);
    data.append("alp_vPlace", formData.alp_vPlace);
    if (formData.image) data.append("image", formData.image);

    try {
      const response = await AxiosInstance.post(
        "/attendance-alarm/add-alarm",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      message.success("Face Alaram System submitted successfully!");

      setFormData({
        alp_vId: "",
        alp_vComId: id,
        alp_vDate: "",
        alp_vPlace: "",
        image: null,
      });

      // Refresh List
      getFaceAlertSystemList();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error("Error submitting attendance. Please try again.");
    }
  };

  const getFaceAlertSystemList = async () => {
    try {
      const response = await AxiosInstance.post(
        "/attendance-alarm/getalarmsystem",
        {
          alp_vComId: id,
        }
      );
      setFaceAlertSystemData(response.data.response);
    } catch (error) {
      console.error(
        "Error fetching Face Alert list:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getFaceAlertSystemList();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex flex-col gap-4 p-4 shadow-md border rounded-md">
          {inputFieldData.map((data, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label className="text-lg font-medium">{data.label}</label>
              <input
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
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                S.No
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Attendance ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Place
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {faceAlertSystemData?.map((attendance, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm text-gray-500">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {attendance.alp_vId}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {attendance.alp_vDate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {attendance.alp_vPlace}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {attendance.alp_vImage ? (
                    <img
                      src={attendance.alp_vImage}
                      alt="Attendance Image"
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

export default FaceAlertSystem;
