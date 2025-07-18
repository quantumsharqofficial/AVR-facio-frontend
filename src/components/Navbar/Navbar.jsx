import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSidebar } from "../../redux/slices/toggleSidebarSlice";
import { message } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/Logo/Quantum facio.svg";
import logoimg from "../../assets/Logo/facio_icon_img.png";
import logotext from "../../assets/Logo/facio_text_img.png";
import profile from "../../assets/profile.png";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    navigate("/");
    sessionStorage.clear();
    message.success("Logout successfully!");
  };

  // handle session storage
  const currUser = location.pathname === "/master-admin";

  const userInfo = JSON?.parse(sessionStorage.getItem("user"));

  return (
    <div
      className={`flex h-[10vh] w-screen justify-between bg-[--navbar-bg-color] shadow-md px-6 max-sm:px-4 border-b-2 border-[--dark-blue]`}
    >
      <div className="flex items-center gap-6">
        <MenuOutlined
          onClick={handleToggle}
          className="text-xl text-[--dark-blue] max-sm:text-base cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <img src={logoimg} alt="logo" className="h-[50px] " />
          <img src={logotext} alt="logo" className="h-[40px] max-md:hidden" />
        </div>
      </div>
      <div className="flex items-center gap-6 flex-row">
        <div className="flex items-center flex-row gap-5">
          <div className="h-[6vh] w-[6vh] rounded-full bg-gray-300 shadow-md flex items-center justify-center">
            <img
              src={userInfo.c_tComLogo} // Replace with your image path
              alt="profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="capitalize text-lg max-sm:text-sm">
            <h1>
              {/* <span className="text-[--light-blue]">Hi,</span> */}
              <span className="text-[--text-gray]">
                {" "}
                {(userInfo?.role === "master" && "Quantum Sharq Innovative Solutions") ||
                  (userInfo?.role === "admin" && userInfo.c_vComName) ||
                  userInfo.c_vComName}
              </span>
            </h1>
          </div>
        </div>
        <LogoutOutlined
          title="Logout"
          onClick={handleLogout}
          className="text-2xl max-sm:text-base text-[--light-gray] hover:drop-shadow-md hover:text-[--light-blue] duration-200 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Navbar;
