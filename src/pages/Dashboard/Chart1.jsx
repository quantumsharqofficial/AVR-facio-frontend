import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AxiosInstance from "../../util/AxiosInstance";

const Chart1 = () => {
  const userInfo = JSON.parse(sessionStorage?.getItem("user"));

  const [dateData, setDateData] = useState({
    PresentData: [],
    AbsentData: [],
    Categories: [],
  });
  const [monthData, setMonthData] = useState({
    PresentData: [],
    AbsentData: [],
    Categories: [],
  });
  const [yearData, setYearData] = useState({
    PresentData: [],
    AbsentData: [],
    Categories: [],
  });
  const [timeframe, setTimeframe] = useState("day");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dateRes, monthRes, yearRes] = await Promise.all([
          AxiosInstance.get(
            `/employee-attendance/get-attendance-diagram-date/${userInfo?.c_vComId}`
          ),
          AxiosInstance.get(
            `/employee-attendance/get-attendance-diagram-month/${userInfo?.c_vComId}`
          ),
          AxiosInstance.get(
            `/employee-attendance/get-attendance-diagram-year/${userInfo?.c_vComId}`
          ),
        ]);

        setDateData(
          dateRes.data.response || {
            PresentData: [],
            AbsentData: [],
            Categories: [],
          }
        );
        setMonthData(
          monthRes.data.response || {
            PresentData: [],
            AbsentData: [],
            Categories: [],
          }
        );
        setYearData(
          yearRes.data.response || {
            PresentData: [],
            AbsentData: [],
            Categories: [],
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getCurrentData = () => {
    switch (timeframe) {
      case "month":
        return monthData;
      case "year":
        return yearData;
      default:
        return dateData;
    }
  };

  const formatCategories = (categories) => {
    if (timeframe === "month") {
      return categories.map((date) =>
        new Date(date).toLocaleString("en-US", { month: "short" })
      );
    } else if (timeframe === "year") {
      return categories.map((date) => new Date(date).getFullYear().toString());
    }
    return categories;
  };

  const chartData = getCurrentData();
  const formattedCategories = formatCategories(chartData.Categories);

  const chartOptions = {
    chart: {
      height: 350,
      type: "area",
      toolbar: { show: true },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      categories: formattedCategories,
    },
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg w-2/3 ${
        userInfo.attendance ? "" : "hidden"
      }`}
    >
      <p className="font-semibold text-[--text-gray]">Attendance System </p>
      <div className="flex justify-end items-center mb-4">
        <div className="flex gap-2">
          {["day", "month", "year"].map((period) => (
            <label key={period} className="flex items-center">
              <input
                type="radio"
                name="timeframe"
                value={period}
                checked={timeframe === period}
                onChange={() => setTimeframe(period)}
                className="mr-2"
              />
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={[
          { name: "Present", data: chartData.PresentData },
          { name: "Absent", data: chartData.AbsentData },
        ]}
        type="area"
        height={300}
      />
    </div>
  );
};

export default Chart1;
// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import AxiosInstance from "../../util/AxiosInstance";

// const Chart1 = () => {
//   const [dateData, setDateData] = useState({ PresentData: [], AbsentData: [], Categories: [] });
//   const [monthData, setMonthData] = useState({ PresentData: [], AbsentData: [], Categories: [] });
//   const [yearData, setYearData] = useState({ PresentData: [], AbsentData: [], Categories: [] });
//   const [timeframe, setTimeframe] = useState("day");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [dateRes, monthRes, yearRes] = await Promise.all([
//           AxiosInstance.get("/employee-attendance/get-attendance-diagram-date"),
//           AxiosInstance.get("/employee-attendance/get-attendance-diagram-month"),
//           AxiosInstance.get("/employee-attendance/get-attendance-diagram-year"),
//         ]);

//         setDateData(processChartData(dateRes.data.response));
//         setMonthData(processChartData(monthRes.data.response));
//         setYearData(processChartData(yearRes.data.response));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const processChartData = (data) => {
//     return {
//       PresentData: data.PresentData || [],
//       AbsentData: data.AbsentData || [],
//       Categories: data.Categories.map(date => new Date(date).toISOString()), // Convert to proper datetime format
//     };
//   };

//   const getChartData = () => {
//     switch (timeframe) {
//       case "month":
//         return monthData;
//       case "year":
//         return yearData;
//       default:
//         return dateData;
//     }
//   };

//   const { PresentData, AbsentData, Categories } = getChartData();

//   const state = {
//     series: [
//       { name: "Present", data: PresentData },
//       { name: "Absent", data: AbsentData },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: "area",
//         toolbar: {
//           show: true,
//           tools: {
//             download: false,
//             selection: true,
//             zoom: true,
//             zoomin: true,
//             zoomout: true,
//             pan: true,
//           },
//         },
//       },
//       dataLabels: { enabled: false },
//       stroke: { curve: "smooth" },
//       xaxis: {
//         type: "datetime",
//         categories: Categories,
//         labels: { format: "yyyy-MM-dd" }
//       },
//       tooltip: { x: { format: "dd/MM/yyyy" } },
//     },
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg w-2/3">
//       <div className="flex justify-end items-center mb-4">
//         <div className="mb-4 flex gap-2">
//           {["day", "month", "year"].map((period) => (
//             <label key={period} className="flex items-center">
//               <input
//                 type="radio"
//                 name="timeframe"
//                 value={period}
//                 checked={timeframe === period}
//                 onChange={() => setTimeframe(period)}
//                 className="mr-2"
//               />
//               {period.charAt(0).toUpperCase() + period.slice(1)}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div id="chart">
//         <ReactApexChart options={state.options} series={state.series} type="area" height={300} />
//       </div>
//     </div>
//   );
// };

// export default Chart1;
