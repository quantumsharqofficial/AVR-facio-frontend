import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
  const isOpen = useSelector((state) => state.toggle.isOpen);
  const userInfo = JSON.parse(sessionStorage?.getItem("user"));
  const adminMenuItems = [
    {
      name: "Dashboard",
      icon: "material-symbols:dashboard-outline-rounded",
      route: "/dashboard",
      productInfo: true,
    },
    {
      name: "Employees & Attendance",
      icon: "fluent:people-checkmark-24-regular",
      route: "/employees-attendance",
      productInfo: userInfo.attendance || userInfo.alarm,
    },
    {
      name: "Face alert System",
      icon: "ant-design:alert-outlined",
      route: "/face-alert",
      productInfo: userInfo.alarm,
    },
    {
      name: "Face Mask Detection",
      icon: "tabler:face-id",
      route: "/face-mask-detection",
      productInfo: userInfo.facemask,
    },
    {
      name: "Human Detection",
      icon: "tabler:man-filled",
      route: "/human-detection",
      productInfo: userInfo.human,
    },
    {
      name: "Head Count",
      icon: "f7:person-3",
      route: "/head-count",
      productInfo: userInfo.headcount,
    },
    {
      name: "VIP",
      icon: "tabler:crown", // 👈 Most common for VIP
      route: "/vip",
      productInfo: true,
    },
    {
      name: "Thief",
      icon: "tabler:spy", // 👈 more suitable icon
      route: "/thief",
      productInfo: true,
    },
  ];

  const masterMenuItems = [
    {
      name: "Dashboard",
      icon: "material-symbols:dashboard-outline-rounded",
      route: "/company-dashboard",
      productInfo: true,
    },
    {
      name: "Manage Companys",
      icon: "mdi:company",
      route: "/manage-companys",
      productInfo: true,
    },
  ];

  // Retrieve user role from session storage

  // Get correct menu items based on role
  const accessibleMenuItems =
    userInfo.role === "admin"
      ? adminMenuItems
      : userInfo.role === "master"
      ? masterMenuItems
      : [];

  // Set the default selected menu item as "Companys" (only for master role)
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    userInfo.role === "master" ? "Companys" : accessibleMenuItems[0]?.name
  );

  return (
    <div
      className={`flex flex-col h-[90vh] z-50 bg-[--dark-blue] text-white shadow-md duration-300 max-sm:fixed border-r-2 border-white ${
        isOpen
          ? `w-[18vw] max-sm:w-[250px] max-md:w-[60vw] max-lg:w-[40vw] max-xl:w-[30vw]`
          : "w-[6vw] max-md:w-[20vw] max-lg:w-[10vw] max-xl:w-[8vw] max-sm:w-0 max-sm:hidden"
      }`}
    >
      {/* Menu Items */}
      <div className="flex-1 px-4 py-6 w-full">
        <div className="flex flex-col gap-4">
          {accessibleMenuItems &&
            accessibleMenuItems?.map((item, index) => (
              <div
                key={index}
                className={`${item.productInfo ? "" : "hidden"}`}
              >
                <Link
                  to={item.route || "#"}
                  onClick={() => setSelectedMenuItem(item.name)}
                  className={`flex items-center p-2 rounded-md rounded-b-none border-b-2 border-transparent hover:border-b-2 hover:border-[--light-blue] hover:bg-white hover:bg-opacity-20 ease-linear duration-200 
                   ${
                     !isOpen
                       ? "flex items-center justify-center w-full"
                       : " gap-5"
                   }
                   ${
                     selectedMenuItem === item.name
                       ? "bg-[--light-blue] border-white"
                       : ""
                   }`}
                >
                  <Icon icon={`${item.icon}`} width="24" height="24" />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
