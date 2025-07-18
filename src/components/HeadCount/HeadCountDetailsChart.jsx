import React from "react";
import Chart from "react-apexcharts";

function HeadCountDetailsChart({ data, section }) {
  console.log("Data received in HeadCountDetailsChart:", data);

  const categories = data?.map((item) => item?.time) || [];
  const seriesData = data?.map((item) => item?.count) || [];
  const maleData = data?.map((item) => item?.male) || [];
  const femaleData = data?.map((item) => item?.female) || [];

  const options = {
    chart: {
      type: "bar",
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: categories,
    },
  };

  const series = [
    {
      name: "Male",
      data: maleData,
    },
    {
      name: "Female",
      data: femaleData,
    },
  ];

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">{section} - Hourly Flow Chart</h2>
      <Chart options={options} series={series} type="bar" height={430} />
    </div>
  );
}

export default HeadCountDetailsChart;
