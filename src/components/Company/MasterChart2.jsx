import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AxiosInstance from "../../util/AxiosInstance";

function MasterChart2() {
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  const monthMap = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("/master/master-chart2");

      // Get last 12 entries
      let sortedData = response.data.response.slice(-12);

      // Remove entries with null month
      sortedData = sortedData.filter((item) => item.month !== null);

      // Format categories
      const categories = sortedData.map((item) => {
        const [year, month] = item.month.split("-");
        return `${monthMap[parseInt(month)]} ${year}`;
      });

      // Extract series data
      const attendanceSeries = sortedData.map((item) => item.attendance_count);
      const alarmSeries = sortedData.map((item) => item.alarm_count);

      // Set chart data
      setChartData({
        categories,
        series: [
          { name: "Attendance Systems", data: attendanceSeries },
          { name: "Alarm Systems", data: alarmSeries },
        ],
      });
    } catch (err) {
      console.error("Error fetching chart data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: true,
      style: { colors: ["#000"] },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: { text: "Total Count" },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} record${val === 1 ? "" : "s"}`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: { columnWidth: "45%" },
          },
          xaxis: {
            labels: { style: { fontSize: "10px" } },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: { height: 300 },
          plotOptions: {
            bar: { columnWidth: "40%" },
          },
        },
      },
    ],
  };

  return (
    <div className="w-full flex justify-center items-center border border-gray-300 p-4 rounded-xl shadow-md overflow-x-auto">
      <div className="w-full">
        <Chart
          options={options}
          series={chartData.series}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
}

export default MasterChart2;
