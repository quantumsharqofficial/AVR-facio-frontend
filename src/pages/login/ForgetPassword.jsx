import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Quantum_facio_logo.svg";
import employee from "../../assets/employees.png";
import body from "../../assets/loginbody.png";
import qsislogo from "../../assets/Logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";
import { toast, Toaster } from "react-hot-toast";
import lines_img from "../../assets/lines.png";

import { message, Upload } from "antd";

function ForgetPassword() {
  const Navigate = useNavigate();
  const [showDiv, setShowDiv] = useState(false);
  const [role, setRole] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [payload, setPayload] = useState();

  const [company, setCompany] = useState([]);
  const [master, setMaster] = useState([]);

  useEffect(() => {
    console.log(role);
  }, [role]);

  const [fromData, setFromData] = useState({
    phone: "",
    Email: "",
  });

  const getComapanyByEmail = async () => {
    const payload = {
      c_vComEmail: fromData.Email,
      c_vComPhone: fromData.phone,
    };
    try {
      const response = await AxiosInstance.post(
        "/company/company-forget",
        payload
      );
      console.log(response);

      if (response.data.message === "User verified successfully") {
        message.success(response.data.message);
        setPayload(payload);
        setCompany(response.data.response.c_vComId);
        setShowDiv(true);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMasterByEmail = async () => {
    const payload = {
      m_vEmail: fromData.Email,
      m_vPhone: fromData.phone,
    };
    console.log(payload);

    try {
      const response = await AxiosInstance.post(
        "/master/get-master-forget",
        payload
      );
      console.log(response);
      if (response.data.message === "Master verified successfully") {
        message.success(response.data.message);
        setPayload(payload);
        setMaster(response.data.response.m_vId);
        setShowDiv(true);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error(err.response.data.message);
    }
  };

  const handleForget = () => {
    console.log(fromData);
    if (fromData.phone === "" || fromData.Email === "" || role === "") {
      toast.error("Please fill all the fields");
      return;
    }

    if (role === "admin") {
      console.log("admin");
      getComapanyByEmail();
    } else {
      console.log("Master");
      getMasterByEmail();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...fromData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // Check if passwords match
    if (newpassword !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
  
    try {
      let response;
  
      // Prepare payload based on role
      if (role === "admin") {
        const data = {
          c_vComId: company,
          c_vPassword: newpassword,
        };
  
        response = await AxiosInstance.patch("/company/forget-password", data);
      } else {
        const data = {
          m_vId: master,
          m_vPassword: newpassword,
        };
  
        response = await AxiosInstance.patch("/master/forget-password", data);
      }
  
      // Handle response
      if (response.data.message === "Password updated successfully") {
        message.success(response.data.message);
        setTimeout(() => {
          Navigate(-1);
        }, 1000);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  };
  
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

          <div
            className={`p-6 z-10 backdrop-blur-sm rounded-md border shadow-md ${
              showDiv ? "hidden" : "block"
            }`}
          >
            <h2 className="text-center text-xl font-medium text-[#092D43] mb-2">
              Forget Password
            </h2>
            {/* Form Content */}
            <div className="flex flex-col gap-2 ">
              <div>
                {/* Email Input Section */}
                <div className="flex flex-col gap-1">
                  <label
                    className="font-sans text-[#444444] text-lg font-medium text-start"
                    htmlFor="email"
                  >
                    Phone Number <span className="text-[#DD2025]">*</span>
                  </label>

                  <input
                    name="phone"
                    type="text"
                    value={fromData.phone}
                    onChange={handleInputChange} // <-- this is correct
                    className="min-w-60 h-9 border border-solid rounded-[8px] border-zinc-300 p-2"
                  />
                </div>
                {/* Password Input Section */}
                <div className="flex flex-col gap-1">
                  <label
                    className="font-sans text-[#444444] text-lg font-medium text-start"
                    htmlFor="password"
                  >
                    Email <span className="text-[#DD2025]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="Email"
                      type="text"
                      value={fromData.Email}
                      onChange={handleInputChange}
                      className="min-w-60 h-9 border border-solid rounded-[8px] border-zinc-300 p-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-[#444444] text-lg font-medium text-start">
                    Role <span className="text-[#DD2025]">*</span>
                  </label>
                  <select
                    name="m_vRole"
                    className="w-full h-9 border border-solid rounded-[8px] border-zinc-300 p-2"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
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
                  type="submit"
                  className="w-fit py-1 px-3 bg-blue-500 text-white text-xl  font-medium rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={() => handleForget()}
                >
                  forget
                </button>
              </div>

              <div className="flex flex-col">
                <p className="font-sans text-base font-medium text-center text-[#B8B8B8]">
                  From
                </p>

                <div className="flex justify-center w-full ">
                  <img src={qsislogo} className=" w-32" alt="QSIS Logo" />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-6 z-10 backdrop-blur-sm rounded-md border shadow-md ${
              showDiv ? "block" : "hidden"
            }`}
          >
            <h2 className="text-center text-xl font-medium text-[#092D43] mb-2">
              Reset Password
            </h2>

            <div className="flex flex-col gap-2">
              {/* New Password */}
              <div className="flex flex-col gap-1">
                <label
                  className="font-sans text-[#444444] text-lg font-medium text-start"
                  htmlFor="newPassword"
                >
                  New Password <span className="text-[#DD2025]">*</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)} // ✅ Correct event
                  className="min-w-60 h-9 border border-solid rounded-[8px] border-zinc-300 p-2"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label
                  className="font-sans text-[#444444] text-lg font-medium text-start"
                  htmlFor="confirmPassword"
                >
                  Confirm Password <span className="text-[#DD2025]">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} // ✅ Correct event
                  className="min-w-60 h-9 border border-solid rounded-[8px] border-zinc-300 p-2"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center w-full gap-2 mt-2">
                <button
                  onClick={() => handleSubmit()}
                  className="w-fit py-1 px-3 bg-green-600 text-white text-xl font-medium rounded-md hover:bg-green-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
