import React, { useEffect, useState } from "react";
import NavData from "../NavDataComponent/NavData";
import qsis_white from "../../assets/qsis_white.png";
import master_dashboard_img from "../../assets/master_dashboard_img.png";
import AxiosInstance from "../../util/AxiosInstance";
import { Icon } from "@iconify/react/dist/iconify.js";

function MasterBanner({ navdata }) {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await AxiosInstance.get("/master/dashboard-card");
        const data = response.data.response || [];
        console.log(data);

        setCardData([
          {
            label: "Total Companies",
            value: data?.totalCompanies || 0,
            icon: (
              <Icon
                icon="mdi:company"
                className="border-2 border-blue-800 text-blue-800 bg-white rounded-full p-1 sm:p-2 h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16"
              />
            ),
          },
          {
            label: "Attendance Systems",
            value: data?.totalAttendance || 0,
            icon: (
              <Icon
                icon="ic:outline-groups"
                className="border-2 border-yellow-600 text-yellow-600 bg-white rounded-full p-1 sm:p-2 h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16"
              />
            ),
          },
          {
            label: "Face Alert Systems",
            value: data?.totalAlarms || 0,
            icon: (
              <Icon
                icon="mdi:face-recognition"
                className="text-pink-600 bg-white rounded-full p-1 sm:p-2 h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16"
              />
            ),
          },
          {
            label: "All Company Workers",
            value: data?.totalEmployees || 0,
            icon: (
              <Icon
                icon="ic:outline-groups"
                className="border-2 border-yellow-600 text-yellow-600 bg-white rounded-full p-1 sm:p-2 h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16"
              />
            ),
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#092D43] to-[#B9F3F6] p-4 md:h-[300px] flex flex-col md:flex-row items-center md:justify-between overflow-x-hidden">
        {/* Left Content */}
        <div className="flex flex-col w-full md:w-full h-full items-start gap-4 px-4 md:px-12">
          <img src={qsis_white} alt="" className="w-40 md:w-80 mt-2 md:mt-0" />

          <div className="flex flex-wrap gap-4 md:gap-12  w-full justify-start">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="w-36 sm:w-40 md:w-56 h-28 sm:h-32 md:h-36 bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between"
              >
                <div className="text-sm text-gray-500">{card.label}</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#092D43] flex justify-around items-center">
                  {card.value} {card.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0 flex justify-center items-center">
          <img
            src={master_dashboard_img}
            alt=""
            className="w-60 md:w-auto max-w-full"
          />
        </div>
      </div>
    </>
  );
}

export default MasterBanner;
