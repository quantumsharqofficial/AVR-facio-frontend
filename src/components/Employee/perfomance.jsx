  import React, { useEffect, useRef, useState } from "react";
  import ApexCharts from "apexcharts";
  import { useParams } from "react-router-dom";
  import AxiosInstance from "../../util/AxiosInstance";

  function Performance() {
    const chartRef = useRef(null);
    const [chart, setChart] = useState(null);
    const { id } = useParams();
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [chartData, setChartData] = useState({
      labels: [],
      series: [],
    });

    const fetchEmployeeAttendance = async (filterType) => {
      try {
        const payload = {
          comID: user.c_vComId,
          empID: id,
          filterType, // Dynamic filter type
        };

        const response = await AxiosInstance.post(
          "/employee-attendance/get-emp-all-chart",
          payload
        );
        if (response.data && response.data.response) {
          const summary = response.data.response.summary;
          const labels = Object.keys(summary);
          const series = labels.map((key) => summary[key]);

          setChartData({ labels, series });
        }
      } catch (error) {
        setChartData({
          labels: [],
          series: [],
        });
        console.error("Error fetching employee attendance:", error);
      }
    };

    useEffect(() => {
      fetchEmployeeAttendance("month"); // Default to 'month' on page load
    }, []);

    useEffect(() => {
      if (chartData.series.length > 0) {
        const options = {
          series: chartData.series,
          labels: chartData.labels,
          chart: {
            type: "donut",
            width: 380,
          },
          dataLabels: {
            enabled: false,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  show: false,
                },
              },
            },
          ],
          legend: {
            position: "right",
            offsetY: 0,
            height: 230,
          },
        };

        if (chartRef.current) {
          if (chart) {
            chart.updateOptions(options);
          } else {
            const newChart = new ApexCharts(chartRef.current, options);
            newChart.render();
            setChart(newChart);
          }
        }
      }
    }, [chartData]);

    const [selectedFilter, setSelectedFilter] = useState("week");

    const handleFilterClick = (filterType) => {
      setSelectedFilter(filterType);
      fetchEmployeeAttendance(filterType);
    };

    // Common button styles
    const commonButtonClass =
      "px-4 py-2 rounded transition-all duration-300 text-white";
    
    return (
      <div className="mt-2 flex flex-col items-center w-full">
      <div id="chart" ref={chartRef} className="w-full max-w-full overflow-x-auto" />
    
      <div className="flex flex-wrap gap-4 sm:gap-8 lg:gap-10 md:gap-12 mt-4 p-2 w-full justify-center items-center">
        {[
          {
            type: "week",
            bgColor: "bg-blue-500",
            label: "Week",
            borderColor: "border-blue-500",
          },
          {
            type: "month",
            bgColor: "bg-green-500",
            label: "Month",
            borderColor: "border-green-500",
          },
          {
            type: "year",
            bgColor: "bg-red-500",
            label: "Year",
            borderColor: "border-red-500",
          },
          {
            type: "all",
            bgColor: "bg-gray-500",
            label: "All",
            borderColor: "border-gray-500",
          },
        ].map(({ type, bgColor, label, borderColor }) => (
          <button
            key={type}
            onClick={() => handleFilterClick(type)}
            className={`${commonButtonClass} ${bgColor} ${
              selectedFilter === type
                ? `border-2 ${borderColor} text-gray-800 font-bold shadow-inner shadow-white scale-105`
                : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
    
    );
  }

  export default Performance;
