import React, { useEffect, useState } from "react";
import HeadCountChart from "../../components/HeadCount/HeadCountChart";
import NavData from "../../components/NavDataComponent/NavData";
import AxiosInstance from "../../util/AxiosInstance";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMale,
  FaFemale,
  FaUsers,
  FaListOl,
  FaEye,
} from "react-icons/fa";

// import { Icon } from "@iconify/react/dist/iconify.js";

function HeadCount() {
  const navdata = [{ name: "Head Count" }];
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const [headCountData, setHeadCountData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonthCount, setSelectedMonthCount] = useState(0);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  //TAb
  const [viewTab, setViewTab] = useState("Main Entrance");

  const handleChange = (data) => {
    setViewTab(data);
    getHeadCount(selectedMonth, selectedYear);
    getCardData();
  };
  const getButtonClass = (tab) => {
    return viewTab === tab
      ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex gap-2"
      : "bg-slate-200 text-black px-4 py-2 rounded hover:bg-slate-300 flex gap-2";
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  const getHeadCount = async (month, year) => {
    const payload = {
      hc_vComId: userInfo.c_vComId,
      month,
      section: viewTab.split(" ")[0],
      year,
    };
    try {
      const response = await AxiosInstance.post(
        `/head-count/get-all-by-company-section`,
        payload
      );
      const data = response?.data?.response || [];
      setHeadCountData(data);
      setChartData(data.slice(0, 7).reverse());
      const totalCount = data.reduce(
        (sum, item) => sum + Number(item.total_head_count),
        0
      );
      setSelectedMonthCount(totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data. Please try again.");
      setHeadCountData([]);
    }
  };

  const getCardData = async () => {
    try {
      const response = await AxiosInstance.get(
        `/head-count/get-headcount-card-section/${userInfo.c_vComId}/${
          viewTab.split(" ")[0]
        }`
      );
      setCardsData(response?.data?.response);
      console.log("Card Data:", response?.data?.response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCardsData([]);
    }
  };

  function formatDate(isoString) {
    const date = new Date(isoString);

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    getHeadCount(selectedMonth, selectedYear);
    getCardData();
  }, [selectedMonth, selectedYear, viewTab]);
  const sections = [
    { label: "Main Entrance", key: "Main Entrance" },
    { label: "Ring Section", key: "Ring Section" },
    { label: "Diamond Section", key: "Diamond Section" },
    { label: "Gold Section", key: "Gold Section" },
    { label: "Silver Section", key: "Silver Section" },
    { label: "Billing Section", key: "Billing Section" },
    { label: "Kid Section", key: "Kid Section" },
    { label: "Waiting Lounge", key: "Waiting Lounge" },
    { label: "Locker Section", key: "Locker Section" },
    { label: "Manager Cabin", key: "Manager Cabin" },
  ];
  return (
    <div className="p-1 w-full bg-gray-100 min-h-screen">
      {/* <NavData navdata={navdata} /> */}
      <div className="w-full h-fit p-2 flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => handleChange(section.key)}
            className={getButtonClass(section.key)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-4 ">
        {/* LEFT COLUMN – 2 CHARTS */}
        <div className="w-full md:w-2/5 flex flex-col gap-6">
          {/* Div 1 */}
          <div className="bg-white shadow-xl rounded-2xl w-full p-6 space-y-6">
            <div className="text-xl font-semibold text-white bg-[--dark-blue] rounded-xl px-4 py-3">
              Head Count Overview - {viewTab}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["year", "month"].map((type) => (
                <div
                  key={type}
                  className="flex flex-col items-center border border-[--dark-blue] p-6 rounded-xl shadow-lg bg-gradient-to-b from-white to-gray-50"
                >
                  <div className="text-xl font-semibold text-[--dark-blue] mb-1">
                    {type === "year" ? "Annual" : "Monthly"} Head Count
                  </div>
                  <div className="text-5xl font-bold text-gray-800">
                    {cardsData?.[type]?.total_head || 0}
                  </div>
                  <div className="flex mt-4 space-x-4">
                    <div className="flex items-center space-x-2 text-nowrap">
                      <FaMale className="inline text-[#008ffb] ml-1 text-base" />
                      <p className="text-sm font-medium">
                        Male: {cardsData?.[type]?.total_male || 0}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-nowrap">
                      <FaFemale className="inline text-[#00e396] ml-1 text-base " />
                      <p className="text-sm font-medium">
                        Female: {cardsData?.[type]?.total_female || 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2 */}
          <div className="bg-white shadow-xl rounded-xl w-full p-4 sm:p-6">
            <div
              className={`w-full h-fit p-3 rounded-t-xl text-lg font-semibold text-white bg-[--dark-blue]`}
            >
              Weekly Gender Chart - {viewTab}
            </div>
            <div className="p-2">
              <HeadCountChart section={viewTab.split(" ")[0]} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN – TABLE */}
        <div className="w-full md:w-3/5 h-fit ">
          <div className="bg-white shadow-xl rounded-xl w-full  p-4 sm:p-6  ">
            <div
              className={`w-full h-fit p-3 rounded-t-xl text-lg font-semibold text-white bg-[--dark-blue]`}
            >
              Head Count Table - {viewTab}
            </div>{" "}
            <div className="flex items-center gap-4 p-2 w-full justify-between">
              <div>Selected Month Count : {selectedMonthCount}</div>
              <div className="flex gap-4">
                <select
                  className="border-2 rounded-lg px-2 py-1 text-gray-700"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>

                <select
                  className="border-2 rounded-lg px-2 py-1 text-gray-700"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {headCountData.length > 0 ? (
              <div className="overflow-x-auto max-h-[570px]">
                <table className="min-w-[600px] w-full table-auto border-collapse text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2">
                        <FaListOl className="inline mr-1 text-base" />
                      </th>
                      <th className="border px-4 py-2">
                        Date
                        <FaCalendarAlt className="inline ml-2 text-base " />
                      </th>
                      <th className="border px-4 py-2">
                        Male Count{" "}
                        <FaMale className="inline text-[#008ffb] ml-1 text-base" />
                      </th>
                      <th className="border px-4 py-2">
                        Female Count{" "}
                        <FaFemale className="inline text-[#00e396] ml-1 text-base " />
                      </th>
                      <th className="border px-4 py-2">
                        Total Count{" "}
                        <FaUsers className="inline text-gray-700 ml-1 text-base " />
                      </th>
                      <th className="border px-4 py-2">
                        Details
                        <FaEye className="inline text-green-600 ml-1  text-base" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {headCountData.map((data, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">
                          {formatDate(data?.hc_vDate)}
                        </td>

                        <td className="border px-4 py-2">
                          {data?.total_male_count}
                        </td>
                        <td className="border px-4 py-2">
                          {data?.total_female_count}
                        </td>
                        <td className="border px-4 py-2">
                          {data?.total_head_count}
                        </td>
                        <td className="border px-4 py-2 flex justify-center items-center">
                          {" "}
                          <Link
                            to={`/head-count-details/${formatDate(
                              data?.hc_vDate
                            )}/${viewTab}`}
                          >
                            <Icon
                              icon="ant-design:eye-outlined"
                              className="text-2xl font-extrabold h-12 w-8  hover:text-blue-500"
                            />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>
                <span className="text-red-500 flex justify-center items-center">
                  No data available for the selected month and year.
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadCount;
