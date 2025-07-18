import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AxiosInstance from "../../util/AxiosInstance";

function HeadCountChart({ section }) {
  const [chartData, setChartData] = useState([]);

  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  console.log(section);
  

  const getHeadCount = async () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const payload = {
      hc_vComId: userInfo?.c_vComId,
      month,
      year,
      section,
    };

    try {
      const response = await AxiosInstance.post(
        `/head-count/get-all-by-company-section`,
        payload
      );
      console.log();
      
      const data = response?.data?.response || [];
      setChartData(data.slice(0, 7).reverse());
      console.log("Fetched Head Count Data:", data.slice(0, 7).reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (section) {
      getHeadCount();
    }
  }, [section]);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const categories = chartData.map((item) => {
    const date = new Date(item.hc_vDate);
    if (isNaN(date)) return item.hc_vDate;
    return dayNames[date.getDay()];
  });

  const maleData = chartData.map((item) => Number(item.total_male_count || 0));
  const femaleData = chartData.map((item) =>
    Number(item.total_female_count || 0)
  );
  const totalData = chartData.map((item) => Number(item.total_head_count || 0));

  const series = [
    {
      name: "Male",
      data: maleData,
    },
    {
      name: "Female",
      data: femaleData,
    },
    // {
    //   name: "Total",
    //   data: totalData,
    // },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Day",
        style: { fontWeight: 600 },
      },
    },
    yaxis: {
      title: {
        text: "Head Count",
        style: { fontWeight: 600 },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} people`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-md">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default HeadCountChart;
