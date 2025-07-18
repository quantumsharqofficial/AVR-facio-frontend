import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AxiosInstance from "../../util/AxiosInstance";

const EmployeeAttendanceChart = ({ employeeData }) => {

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  // useEffect(() => {
  //   const fetchEmployeeChartData = async () => {
  //     try {
  //       const payload = {
  //         comID: employeeData.e_vComId,
  //         empID: employeeData.e_vEmpId,
  //       };
  //       const response = await AxiosInstance.post(
  //         "/employee-attendance/get-employee-chart",
  //         payload
  //       );

  //       const summary = response.data?.response?.summaryPercentage; // 🔍 Check nested structure

  //       if (summary) {
  //         const labels = Object.keys(summary);
  //         const series = Object.values(summary).map((val) =>
  //           parseFloat(val.replace("%", ""))
  //         );

  //         setChartData((prev) => ({
  //           ...prev,
  //           series,
  //           options: { ...prev.options, labels },
  //         }));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching employee chart data:", error);
  //     }
  //   };

  //   fetchEmployeeChartData();
  // }, [employeeData]);


  useEffect(() => {
    const fetchEmployeeChartData = async () => {
      try {
        const payload = {
          comID: employeeData.e_vComId,
          empID: employeeData.e_vEmpId,
        };
        const response = await AxiosInstance.post(
          "/employee-attendance/get-employee-chart",
          payload
        );
        // Use `summary` instead of `summaryPercentage`
        const summary = response.data?.response?.summary;
  
        if (summary) {
          const labels = Object.keys(summary); // ["Half-day"]
          const series = Object.values(summary).map((val) => parseInt(val)); // [2]
  
          setChartData((prev) => ({
            ...prev,
            series,
            options: { ...prev.options, labels },
          }));
        }
      } catch (error) {
        console.error("Error fetching employee chart data:", error);
      }
    };
  
    fetchEmployeeChartData();
  }, [employeeData]);
  

  return (
    <div className="w-full h-fit">
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={380}
        />
      </div>
    </div>
  );
};

export default EmployeeAttendanceChart;
