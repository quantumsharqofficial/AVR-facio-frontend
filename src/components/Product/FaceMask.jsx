import React, { useState, useEffect } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { useParams } from "react-router-dom";
import { message } from "antd";

function FaceMask() {
  const { id } = useParams();
  const [faceMaskData, setFaceMask] = useState([]);
  const inputFieldData = [
    {
      label: "Face Mask ID",
      name: "fmp_vId",
      type: "text",
      placeholder: "Enter Face Mask ID",
    },
    {
      label: "Date",
      name: "fmp_vDate",
      type: "date",
      placeholder: "Select Date",
    },
    {
      label: "Place",
      name: "fmp_vPlace",
      type: "text",
      placeholder: "Enter Place Name",
    },
  ];
  const [formData, setFormData] = useState({
    fmp_vId: "",
    fmp_vComId: id,
    fmp_vDate: "",
    fmp_vPlace: "",
  });

  const getFaceMaskList = async () => {
    try {
      const response = await AxiosInstance.get(`/face-mask/get-facemask/${id}`);
      console.log(response?.data?.response,"data");
      
      setFaceMask(response?.data?.response);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data. Please try again.");
    }
  };

  useEffect(() => {
    getFaceMaskList();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      console.log(formData);

      const response = await AxiosInstance.post(
        "/face-mask/add-facemask",
        formData
      );
      message.success("Face mask submitted successfully!");

      setFormData({
        fmp_vId: "",
        fmp_vComId: id,
        fmp_vDate: "",
        fmp_vPlace: "",
      });

      // Refresh List
      getFaceMaskList();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error("Error submitting face mask. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex flex-col gap-4 p-4 shadow-md border rounded-md">
          {inputFieldData.map((data, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label htmlFor={data.name} className="text-lg font-medium">
                {data.label}
              </label>
              <input
                id={data.name}
                type={data.type}
                name={data.name}
                placeholder={data.placeholder}
                className="w-96 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={formData[data.name]}
                required
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 px-5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Face Mask ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Place
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(faceMaskData) &&
              faceMaskData.map((facemask, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {facemask.fmp_vId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {facemask.fmp_vDate}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {facemask.fmp_vPlace}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FaceMask;
