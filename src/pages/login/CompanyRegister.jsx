import React, { useState } from "react";
import axios from "../../util/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function CompanyRegister() {
    const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    c_vComName: "",
    c_vComPhone: "",
    c_tComAddress: "",
    c_tComLogo: "",
    c_tComContent: "",
    c_vComEmail: "",
    c_vPassword: "",
    c_vComOwner: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/company/add-company", formData);
      if (response.data) {
        message.success("Registration successful");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      message.error("Registration failed");
    }
  };

  return (
    <div className="h-screen gap-5 w-full flex flex-col items-center justify-center overflow-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Company Registration
      </h2>
      <div className="flex flex-wrap w-[800px] items-center justify-evenly">
        <div className="w-96">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            className="mt-1 px-4 block w-full h-12 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            type="text"
            placeholder="Enter company name"
            id="companyName"
            name="c_vComName"
            value={formData.c_vComName}
            onChange={handleChange}
          />
        </div>
        <div className="w-96">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="companyPhone"
          >
            Company Phone
          </label>
          <input
            className="mt-1 px-4 block w-full h-12 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            type="tel"
            id="companyPhone"
            placeholder="Enter company phone"
            name="c_vComPhone"
            value={formData.c_vComPhone}
            onChange={handleChange}
          />
        </div>
        <div className="w-96">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="companyAddress"
          >
            Company Address
          </label>
          <input
            className="mt-1 px-4 block w-full h-12 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            id="companyAddress"
            name="c_tComAddress"
            placeholder="Enter company address"
            value={formData.c_tComAddress}
            onChange={handleChange}
          />
        </div>
        <div className="w-96">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="companyLogo"
          >
            Company Logo URL
          </label>
          <input
            className="mt-1 px-4 block w-full h-12 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            type="url"
            id="companyLogo"
            name="c_tComLogo"
            placeholder="Enter company logo URL"
            value={formData.c_tComLogo}
            onChange={handleChange}
          />
        </div>
        <div className="w-96">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="companyContent"
          >
            Company Description
          </label>
          <input
            className="mt-1 px-4 block w-full h-12 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            id="companyContent"
            name="c_tComContent"
            placeholder="Enter company description"
            value={formData.c_tComContent}
            onChange={handleChange}
          />
        </div>
        <div className="w-96">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="companyEmail"
          >
            Company Email
          </label>
          <input
            className="mt-1 px-4 block w-full h-12 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            type="email"
            id="companyEmail"
            name="c_vComEmail"
            placeholder="Enter company email"
            value={formData.c_vComEmail}
            onChange={handleChange}
          />
        </div>
        <div className="w-96">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-1 px-4 block w-full h-12 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            type="password"
            id="password"
            name="c_vPassword"
            placeholder="Enter password"
            value={formData.c_vPassword}
            onChange={handleChange}
          />
        </div>
        <div className="w-96">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="companyOwner"
          >
            Company Owner
          </label>
          <input
            className="mt-1 px-4 block w-full h-12 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            type="text"
            id="companyOwner"
            name="c_vComOwner"
            placeholder="Enter company owner"
            value={formData.c_vComOwner}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <button
          className="min-w-72  px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          onSubmit={handleSubmit}
        >
          Register Company
        </button>
        <button
          className="min-w-72 px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          onClick={() => Navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default CompanyRegister;
