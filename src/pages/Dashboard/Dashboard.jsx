  import React, { useEffect, useState } from "react";
  import NavData from "../../components/NavDataComponent/NavData";
  import { Icon } from "@iconify/react";
  import Chart1 from "./Chart1";
  import Chart2 from "./Chart2";
  import AxiosInstance from "../../util/AxiosInstance";
  import { Link } from "react-router-dom";
  import { use } from "react";

  const Dashboard = () => {
    const navdata = [{ name: "Dashboard" }];
    const [cardDatas, setCardDatas] = useState([
      {
        title: "Total Employees",
        number: "-",
        icon: "fluent:people-16-regular",
        color: "text-blue-500",
        bg: "bg-gray-100",
      },
      {
        title: "Today Present",
        number: "-",
        icon: "fluent:people-checkmark-24-regular",
        color: "text-green-500",
        bg: "bg-green-100",
      },
      {
        title: "Total Absent",
        number: "-",
        icon: "fluent:people-subtract-24-regular",
        color: "text-red-800",
        bg: "bg-red-100",
      },
    ]);

    const userInfo = JSON?.parse(sessionStorage.getItem("user"));

    const getCompanyDashboard = async (companyId) => {
      try {
        const response = await AxiosInstance.get(
          `/company/dashboard-by-id/${companyId}`
        );
        const data = response.data.response;
        const common = [
          {
            title: "Total Employees",
            number: data?.totalEmployees || 0,
            icon: "fluent:people-16-regular",
            color: "text-blue-500",
            bg: "bg-gray-100",
            route: "/employee",
          },
        ];

        const attendance = [
          {
            title: "Today Present",
            number: data?.totalAttendance || 0,
            icon: "fluent:people-checkmark-24-regular",
            color: "text-green-500",
            bg: "bg-green-100",
            route: "/card-table/Today Present",
          },
          {
            title: "Yesterday Absent",
            number: data?.totalAbsent || 0,
            icon: "fluent:people-prohibited-24-regular",
            color: "text-red-800",
            bg: "bg-red-100",
            route: "/card-table/Yesterday absent",
          },
          {
            title: "Today Non Check-In",
            number: data?.totalNotAttendance || 0,
            icon: "fluent:people-error-24-regular",
            color: "text-yellow-700",
            bg: "bg-yellow-100",
            route: "/card-table/Non check In",
          },
        ];

        const face = data?.faceData || [];

        const frequentlyCount = face.filter(
          (employee) => employee.out_count >= 5
        );
        const rarelyCount = face.filter(
          (employee) => employee.out_count < 5 && employee.out_count > 0
        );

        const alarm = [
          {
            title: "Leaves Rarely",
            number: rarelyCount.length,
            icon: "fluent:person-walking-24-regular",
            color: "text-green-500",
            bg: "bg-green-100",
            route: "/card-table/Leaves rarely",
            data: rarelyCount,
          },
          {
            title: "Leaves Frequently",
            number: frequentlyCount.length,
            icon: "fluent:person-walking-24-regular",
            color: "text-red-800",
            bg: "bg-red-100",
            route: "/card-table/Leaves frequently",
            data: frequentlyCount,
          },
        ];

        setCardDatas([...common, ...attendance, ...alarm]);

        if (userInfo?.alarm && userInfo?.attendance) {
          setCardDatas([...common, ...attendance, ...alarm]);
        } else if (userInfo?.alarm && !userInfo?.attendance) {
          setCardDatas([...common, ...alarm]);
        } else if (!userInfo?.alarm && userInfo?.attendance) {
          setCardDatas([...common, ...attendance,]);
        } else {
          setCardDatas([...common]);
        }
      } catch (error) {
        console.error("Error fetching company dashboard:", error);
      }
    };

    // For more than 5 times:
    //     Goes out many times
    //     Goes out often
    //     Steps out a lot
    //     Leaves frequently
    // For less than 5 times:
    //     Goes out a few times
    //     Steps out sometimes
    //     Leaves rarely
    //     Not going out much

    useEffect(() => {
      getCompanyDashboard(userInfo?.c_vComId);
    }, []);

    return (
      <div className="h-full w-full  ">
        <NavData navdata={navdata} />
        <div className="flex flex-col gap-6 py-5">
          <section
            className={`grid grid-cols-1 sm:grid-cols-2  ${
              cardDatas.length > 6
                ? "md:grid-cols-4"
                : cardDatas.length > 4
                ? "md:grid-cols-3"
                : "md:grid-cols-2"
            } gap-4`}
          >
            {cardDatas.map((cardData, index) => (
              <Link to={cardData.route} key={index}>
                <div className="flex flex-row items-center justify-center min-h-32 gap-2 p-3 rounded-md bg-white shadow-md">
                  <h1 className="w-1/2 flex items-center justify-center text-5xl sm:text-6xl font-semibold text-[--dark-blue]">
                    {cardData.number}
                  </h1>
                  <div className="flex flex-col items-center justify-evenly h-full w-1/2">
                    <div
                      className={`flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full ${cardData.bg}`}
                    >
                      <Icon
                        icon={cardData.icon}
                        width="24"
                        height="24"
                        className={cardData.color}
                      />
                    </div>
                    <h1 className="font-medium text-xs sm:text-sm text-[--dark-blue]">
                      {cardData.title}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </section>
          <section className="flex flex-col gap-5">
            <p className="text-xl sm:text-2xl font-semibold text-[--dark-blue]">
              Attendance Statistics
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Chart1 className="w-full md:w-1/2" />
              <Chart2 className="w-full md:w-1/2" />
            </div>
          </section>
        </div>
      </div>
    );
  };

  export default Dashboard;
