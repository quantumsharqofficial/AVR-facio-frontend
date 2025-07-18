import React, { useState, useEffect } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { useParams } from "react-router-dom";
import { message } from "antd";

function HumanDetection() {
  const { id } = useParams();
  const [ humanDetectionData, setHumanDetection] = useState([]);
  const inputFieldData = [
    {
      label: "Human Detection ID",
      name: "hp_vId",
      type: "text",
      placeholder: "Enter Human Detection ID",
    },
    {
      label: "Date",
      name: "hp_vDate",
      type: "date",
      placeholder: "Select Date",
    },
    {
      label: "Place",
      name: "hp_vPlace",
      type: "text",
      placeholder: "Enter Place Name",
    },
  ];
  const [formData, setFormData] = useState({
    hp_vId: "",
    hp_vComId: id,
    hp_vDate: "",
    hp_vPlace: "",
  });

  const getHumanDetectionList = async () => {
    try {
      const response = await AxiosInstance.get(
        `/human/get-human/${id}`
      );
      console.log(response?.data?.response, "data");

      setHumanDetection(response?.data?.response);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data. Please try again.");
    }
  };

  useEffect(() => {
    getHumanDetectionList();
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
        "/human/add-human",
        formData
      );
      message.success("human detection submitted successfully!");

      setFormData({
        hp_vId: "",
        hp_vComId: id,
        hp_vDate: "",
        hp_vPlace: "",
      });

      // Refresh List
      getHumanDetectionList();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error("Error submitting human detection. Please try again.");
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
                Human Detection ID
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
            {Array.isArray(humanDetectionData) &&
              humanDetectionData.map((humandetection, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {humandetection.hp_vId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {humandetection.hp_vDate}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {humandetection.hp_vPlace}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HumanDetection;
