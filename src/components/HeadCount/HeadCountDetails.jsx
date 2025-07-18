import React, { useEffect, useState } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import HeadCountDetailsChart from "./HeadCountDetailsChart";
import NavData from "../NavDataComponent/NavData";

function HeadCountDetails() {
  const navdata = [{ name: "Head Count" }, { name: "Details" }];
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const { selectedDate, selectedSection } = useParams();
  const [headCountData, setHeadCountData] = useState([]);
  const [chartData, setChartData] = useState([]);
  console.log(selectedDate, selectedSection);

  const getHeadCountByDateAndCompany = async () => {
    try {
      const payload = {
        hc_vDate: selectedDate,
        hc_vComId: userInfo.c_vComId,
        section: selectedSection.split(" ")[0],
      };
      console.log("Payload for API call:", payload);

      const response = await AxiosInstance.post(
        "/head-count/get-date-by-company-section",
        payload
      );
      setHeadCountData(response?.data?.response);
      console.log(response.data.response);

      console.log("HeadCountData", response?.data?.response);

      const chartData = response?.data?.response?.map((item) => ({
        time: `${item?.hc_vStartTime} - ${item?.hc_vEndTime}`,
        male: item?.hc_malecount,
        female: item?.hc_femalecount,
        total: item?.hc_vHead,
      }));

      setChartData(chartData);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getHeadCountByDateAndCompany();
  }, [selectedDate]);

  function formatDate(dateString) {
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`); // convert to ISO format
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div>
      <NavData navdata={navdata} className="mb-12" />
      <div className="overflow-x-auto max-h-[800px] flex gap-2 overflow-auto">
        {" "}
        <div className="bg-white shadow-xl rounded-xl  w-1/2  p-4 sm:p-6  h-fit overflow-x-auto max-h-[800px]">
          <div
            className={`w-full h-fit p-3 rounded-t-xl text-lg font-semibold text-white bg-[--dark-blue]`}
          >
            <h2 className="text-xl font-semibold">
             {selectedSection}-{formatDate(selectedDate)}
            </h2>
          </div>{" "}
          <table className="w-full table-auto border-collapse text-sm text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Start Time</th>
                <th className="border px-4 py-2">End Time</th>
                <th className="border px-4 py-2">Male</th>
                <th className="border px-4 py-2">Female</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {headCountData.map((data, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>{" "}
                  <td className="border px-4 py-2">{data?.hc_vStartTime}</td>
                  <td className="border px-4 py-2">{data?.hc_vEndTime}</td>
                  <td className="border px-4 py-2">{data?.hc_malecount}</td>
                  <td className="border px-4 py-2">{data?.hc_femalecount}</td>
                  <td className="border px-4 py-2">{data?.hc_vHead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center mt-4 w-1/2 h-full">
          <HeadCountDetailsChart data={chartData} section={selectedSection} />
        </div>
      </div>
    </div>
  );
}

export default HeadCountDetails;
