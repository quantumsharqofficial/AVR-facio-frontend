import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/loginbg.png";
import logo from "../../assets/Logo/Quantum_facio_logo.svg";
import employee from "../../assets/employees.png";
import body from "../../assets/loginbody.png";
import qsislogo from "../../assets/Logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";
import { toast, Toaster } from "react-hot-toast";
import lines_img from "../../assets/lines.png";
import { message } from "antd";
import axios from "axios";
import logoqsis from "../../assets/qsis-logo.png";
import { use } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

function Login() {
  const Navigate = useNavigate();
  const [fromData, setFromData] = useState({
    m_vEmail: "",
    m_vPassword: "",
    m_vRole: "",
  });
  const [showPassword, setShowPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...fromData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      m_vEmail: fromData.m_vEmail,
      m_vPassword: fromData.m_vPassword,
    };
    const comPayload = {
      c_vComEmail: fromData.m_vEmail,
      c_vPassword: fromData.m_vPassword,
    };

    if (fromData.m_vRole === "master") {
      try {
        setLoading(true);
        const response = await AxiosInstance.post(
          "/master/login-master",
          payload
        );
        const { data } = response;
        if (data.status === 400 || data.status === 401) {
          toast.error(data.message);
          return;
        }

        const user = {
          companyID: data.response.m_vId,
          name: data.response.m_vName,
          email: data.response.m_vEmail,
          role: "master",
          c_tComLogo: logoqsis,
        };

        sessionStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful!");
        setTimeout(() => {
          Navigate("/company-dashboard");
        }, 1000);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        console.error("Error logging in:", errorMessage);
        toast.error("Failed to login. Please try again.");
      } finally {
        setLoading(false);
      }
    } else if (fromData.m_vRole === "admin") {
      try {
        const response = await AxiosInstance.post(
          "/company/login-company",
          comPayload
        );
        console.log(response,"data");
        
        const { data } = response;
        if (data.status === 400 || data.status === 401) {
          toast.error(data.message);
          return;
        }

        const user = {
          c_vComId: data.response.c_vComId,
          c_vComName: data.response.c_vComName,
          c_vComEmail: data.response.c_vComEmail,
          role: "admin",
          c_tComLogo: data.response.c_tComLogo,
          attendance: data?.response?.attendanceData?.length > 0 ? true : false,
          alarm: data?.response?.alarmData?.length > 0 ? true : false,
          facemask: data?.response?.faceMaskData?.length > 0 ? true : false,
          headcount: data?.response?.headCountData?.length > 0 ? true : false,
          human: data?.response?.humanData?.length > 0 ? true : false,
        };

        sessionStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful!");
        setTimeout(() => {
          Navigate("/dashboard");
        }, 1000);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        console.error("Error logging in:", errorMessage);
        toast.error("Failed to login. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Select a Role");
    }
  };
  useEffect(() => {
    // console.log("Developed by the team:\n - Sakthisudalai\n - Navadeepak\n - Logesh\n - Vivek\n - Praveen");
    // console.log("developed by \n  sakthisudalai : https://www.linkedin.com/in/sakthisudalai9684/ \n  Navadeepak : https://www.linkedin.com/in/navadeepak-c-7b35741b6/ \n  Logesh : https://www.linkedin.com/in/logesh-pv-340282272/");
  }, []);

  return (
    <div className="relative w-screen h-screen items-center flex flex-col">
      <div className="h-1/3 max-lg:h-[90px] relative overflow-hidden w-full flex justify-between bg-gradient-to-r from-[#092d43] to-[#b9f2f6]">
        <img src={lines_img} className="absolute top-0 left-0 z-50" />
        {/* Left Section: Logo and Text */}
        <div className="py-3 h-full w-full flex flex-col gap-2 px-6 text-white ">
          {/* Logo */}
          <div className="w-fit h-fit">
            <img src={logo} className="h-16" alt="Quantum Facio Logo" />
          </div>

          {/* Text */}
          <div className="text-white flex flex-col gap-2 backdrop-blur-sm max-md:hidden ">
            <p className="font-['Roboto'] text-3xl font-semibold text-left">
              Facial Recognition: The Future of Secure Attendance
            </p>
            <p className="font-['Roboto'] text-lg font-normal text-left">
              The image for "Quantum Check-in" shows a sleek facial recognition
              scanning <br />
              an employee's face, confirming attendance instantly. Soft blue
              tones highlight <br /> the modern, high-tech atmosphere of the
              system.
            </p>
          </div>
        </div>

        {/* Right Section: Employee Image */}
        <div className="w-60 h-fit max-lg:hidden">
          <img src={employee} className="h-full w-full" alt="Employee" />
        </div>
      </div>
      <Toaster />
      <div className="absolute bottom-0 left-[-20%] z-0">
        <img src={body} className="w-fit h-fit" />
      </div>
      {/* Additional Section */}
      <div className="w-full h-2/3 max-lg:min-h-[65vh] flex items-center justify-center">
        <div className="h-full w-full flex flex-col justify-center items-center">
          {/* Login Form */}
          <div className="p-6 z-10 backdrop-blur-sm rounded-md border shadow-md">
            <h2 className="text-center text-xl font-medium text-[#092D43]">
              USER LOGIN
            </h2>
            {/* Form Content */}
            <form className="flex flex-col gap-2 ">
              <div>
                {/* Email Input Section */}
                <div className="flex flex-col gap-1">
                  <label
                    className="font-sans text-[#444444] text-lg font-medium text-start"
                    htmlFor="email"
                  >
                    Email <span className="text-[#DD2025]">*</span>
                  </label>

                  <input
                    name="m_vEmail"
                    value={fromData.m_vEmail}
                    onChange={handleChange}
                    type="email"
                    className="min-w-60 h-9 border border-solid rounded-[8px] border-zinc-300 p-2"
                  />
                </div>
                {/* Password Input Section */}
                <div className="flex flex-col gap-1">
                  <label
                    className="font-sans text-[#444444] text-lg font-medium text-start"
                    htmlFor="password"
                  >
                    Password <span className="text-[#DD2025]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="m_vPassword"
                      value={fromData.m_vPassword}
                      onChange={handleChange}
                      type={showPassword}
                      className="min-w-60 h-9 border border-solid rounded-[8px] border-zinc-300 p-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        showPassword === "password"
                          ? setShowPassword("text")
                          : setShowPassword("password")
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center"
                    >
                      {showPassword === "password" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="font-sans text-[#444444] text-lg font-medium text-start">
                    Role <span className="text-[#DD2025]">*</span>
                  </label>
                  <select
                    name="m_vRole"
                    value={fromData.m_vRole}
                    onChange={handleChange}
                    className="w-full h-9 border border-solid rounded-[8px] border-zinc-300 p-2"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="master">Master</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center w-full gap-2">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-fit py-1 px-3 bg-blue-500 flex gap-2 text-white text-xl  font-medium rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {loading ? (
                    <>
                      <Icon
                        icon="svg-spinners:6-dots-rotate"
                        width="24"
                        height="24"
                      />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
                {/* <button
                  type="button"
                  className="w-fit py-1 px-3 bg-blue-500 text-white text-xl  font-medium rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={() => {
                    if (fromData.m_vRole) {
                      Navigate(`/register-${fromData.m_vRole}`);
                    } else {
                      message.warning("Please select role");
                    }
                  }}
                >
                  Register
                </button> */}
              </div>
              <Link to={"/forget-password"}>
                <p className="font-sans text-base font-medium text-center">
                  Forgot Password?
                </p>
              </Link>

              <div className="flex flex-col">
                <p className="font-sans text-base font-medium text-center text-[#B8B8B8]">
                  From
                </p>

                <div className="flex justify-center w-full ">
                  <img src={qsislogo} className=" w-32" alt="QSIS Logo" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
