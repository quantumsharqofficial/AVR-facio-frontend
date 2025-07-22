import React, { useState } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { message } from "antd";

function Add() {
  const compData = JSON.parse(sessionStorage.getItem("user"));

  const [formData, setFormData] = useState({
    t_vComId: compData.c_vComId, // you can make this dynamic
    t_vThiefName: "",
    t_vPhone: "",
    t_eGender: "",
    t_vEmail: "",
    t_vAddress: "",
    t_vProfileImg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    console.log("Submitted Data:", formData); // Logs the filled form data

    try {
      const response = await AxiosInstance.post("/thief/create", formData);
      console.log(response.data);
      message.success("Thief Added Successfully");
      setFormData({
        t_vComId: compData.c_vComId, // you can make this dynamic
        t_vThiefName: "",
        t_vPhone: "",
        t_eGender: "",
        t_vEmail: "",
        t_vAddress: "",
        t_vProfileImg: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto rounded-xl shadow border border-red-300">
      <h2 className="text-xl font-bold mb-4 text-center text-red-700">
        👑 Add Thief
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          name="t_vThiefName"
          placeholder="Thief Name"
          className="w-full p-2 border border-red-300 rounded bg-white"
          value={formData.t_vThiefName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="t_vPhone"
          placeholder="Phone Number"
          className="w-full p-2 border border-red-300 rounded bg-white"
          value={formData.t_vPhone}
          onChange={handleChange}
          required
        />
        <select
          name="t_eGender"
          className="w-full p-2 border border-red-300 rounded bg-white"
          value={formData.t_eGender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        <input
          type="email"
          name="t_vEmail"
          placeholder="Email"
          className="w-full p-2 border border-red-300 rounded bg-white"
          value={formData.t_vEmail}
          onChange={handleChange}
        />
        <textarea
          name="t_vAddress"
          placeholder="Address"
          className="w-full p-2 border border-red-300 rounded bg-white"
          value={formData.t_vAddress}
          onChange={handleChange}
        />
        <input
          type="text"
          name="t_vProfileImg"
          placeholder="Profile Image Filename"
          className="w-full p-2 border border-red-300 rounded bg-white"
          value={formData.t_vProfileImg}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Add Thief
        </button>
      </form>
    </div>
  );
}

export default Add;
