import React, { useState } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { message } from "antd";

function Add() {
  const compData = JSON.parse(sessionStorage.getItem("user"));

  const [formData, setFormData] = useState({
    v_vComId: compData?.c_vComId || "",
    v_vVIPName: "",
    v_vDateOfBrith: "",
    v_vPhone: "",
    v_eGender: "",
    v_vEmail: "",
    v_vAddress: "",
    v_vProfileImg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    try {
      const response = await AxiosInstance.post("/vip/create", formData);
      console.log(response.data);
      message.success("VIP Added Successfully");
      setFormData({
        v_vComId: compData?.c_vComId || "",
        v_vVIPName: "",
        v_vDateOfBrith: "",
        v_vPhone: "",
        v_eGender: "",
        v_vEmail: "",
        v_vAddress: "",
        v_vProfileImg: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto  rounded-xl shadow border border-yellow-300">
      <h2 className="text-xl font-bold mb-4 text-center text-yellow-700">
        👑 Add VIP
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          name="v_vVIPName"
          placeholder="VIP Name"
          className="w-full p-2 border  "
          value={formData.v_vVIPName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="v_vDateOfBrith"
          className="w-full p-2 border border-yellow-300 rounded bg-white"
          value={formData.v_vDateOfBrith}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="v_vPhone"
          placeholder="Phone Number"
          className="w-full p-2 border border-yellow-300 rounded bg-white"
          value={formData.v_vPhone}
          onChange={handleChange}
          required
        />
        <select
          name="v_eGender"
          className="w-full p-2 border border-yellow-300 rounded bg-white"
          value={formData.v_eGender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        <input
          type="email"
          name="v_vEmail"
          placeholder="Email"
          className="w-full p-2 border border-yellow-300 rounded bg-white"
          value={formData.v_vEmail}
          onChange={handleChange}
        />
        <textarea
          name="v_vAddress"
          placeholder="Address"
          className="w-full p-2 border border-yellow-300 rounded bg-white"
          value={formData.v_vAddress}
          onChange={handleChange}
        />
        <input
          type="text"
          name="v_vProfileImg"
          placeholder="Profile Image Filename"
          className="w-full p-2 border border-yellow-300 rounded bg-white"
          value={formData.v_vProfileImg}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-white font-semibold p-2 rounded hover:bg-yellow-500"
        >
          Add VIP
        </button>
      </form>
    </div>
  );
}

export default Add;
