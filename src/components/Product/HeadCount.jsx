import React, { useState, useEffect } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { useParams } from "react-router-dom";
import { message } from "antd";

function HeadCount() {
  const { id } = useParams();
  const [headCountData, setHeadCount] = useState([]);
  const inputFieldData = [
    {
      label: "Head Count ID",
      name: "hcp_vId",
      type: "text",
      placeholder: "Enter Head Count ID",
    },
    {
      label: "Date",
      name: "hcp_vDate",
      type: "date",
      placeholder: "Select Date",
    },
    {
      label: "Place",
      name: "hcp_vPlace",
      type: "text",
      placeholder: "Enter Place Name",
    },
  ];
  const [formData, setFormData] = useState({
    hcp_vId: "",
    hcp_vComId: id,
    hcp_vDate: "",
    hcp_vPlace: "",
  });

  const getHeadCountList = async () => {
    try {
      const response = await AxiosInstance.get(`/head-count/get-headcount/${id}`);
      console.log(response?.data?.response, "data");

      setHeadCount(response?.data?.response);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data. Please try again.");
    }
  };

  useEffect(() => {
    getHeadCountList();
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
        "/head-count/add-headcount",
        formData
      );
      message.success("head count submitted successfully!");

      setFormData({
        hcp_vId: "",
        hcp_vComId: id,
        hcp_vDate: "",
        hcp_vPlace: "",
      });

      // Refresh List
      getHeadCountList();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error("Error submitting head count. Please try again.");
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
                Head Count ID
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
            {Array.isArray(headCountData) &&
              headCountData.map((headcount, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {headcount.hcp_vId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {headcount.hcp_vDate}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {headcount.hcp_vPlace}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HeadCount;
