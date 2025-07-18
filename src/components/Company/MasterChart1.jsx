import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AxiosInstance from "../../util/AxiosInstance";

function MasterChart1() {
  const options = {
    labels: ["Attendance Systems", "Alert Systems"],
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
  };

  const [series, setSeries] = useState([0, 0]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await AxiosInstance.get("/master/dashboard-card");
        const data = response.data.response;
        console.log(data);

        setSeries([data?.totalAttendance || 0, data?.totalAlarms || 0]);
        console.log(series);
      } catch (err) {
        console.error("Error fetching dashboard card data:", err);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center border border-gray-300 p-4 rounded-xl shadow-md">
      <Chart
        options={options}
        series={series}
        type="pie"
        width={595  }
        height={800}
      />
    </div>
  );
}

export default MasterChart1;
