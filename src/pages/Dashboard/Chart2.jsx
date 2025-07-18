import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AxiosInstance from "../../util/AxiosInstance";

const Chart2 = () => {
  const userInfo = JSON.parse(sessionStorage?.getItem("user"));
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
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
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [],
        title: {
          text: "Days",
        },
      },
      yaxis: {
        labels: {
          formatter: function (y) {
            return y.toFixed(0);
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await AxiosInstance.get(
          `/face-alert/dashboard-diagram/${userInfo?.c_vComId}`
        );
        // Extract and format dates
        const categories = response.data.response.map((item) =>
          new Date(item.report_date).toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
          })
        );

        // Extract series data
        const frequentlyData = response.data.response.map(
          (item) => item.frequently
        );
        const rarelyData = response.data.response.map((item) => item.rarely);

        setChartData((prevState) => ({
          ...prevState,
          series: [
            { name: "Frequently", data: frequentlyData },
            { name: "Rarely", data: rarelyData },
          ],
          options: {
            ...prevState.options,
            xaxis: { ...prevState.options.xaxis, categories },
          },
        }));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div
      className={`bg-white   p-4 rounded-lg w-1/3 ${
        userInfo?.alarm ? "" : "hidden"
      }`}
    >
      <div id="chart">
        <p className="font-semibold text-[--text-gray]">Face Alert System </p>
        {chartData.series.length > 0 ? (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={300}
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default Chart2;
