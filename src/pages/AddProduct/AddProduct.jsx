import React, { useEffect, useState } from "react";
import NavData from "../../components/NavDataComponent/NavData";
import AttendanceSystem from "../../components/Product/AttendanceSystem";
import FaceAlertSystem from "../../components/Product/FaceAlertSystem";
import FaceMask from "../../components/Product/FaceMask";
import HeadCount from "../../components/Product/HeadCount";
import HumanDetection from "../../components/Product/HumanDetection";
import { useParams } from "react-router-dom";

function AddProduct() {
  const { id } = useParams();
  const [buttonSelection, setButtonSelection] = useState("AS");

  const navdata = [
    {
      name: "Manage Companys",
    },
    {
      name: "Add Product",
    },
  ];

  return (
    <div className="flex p-5 flex-col w-full h-[90vh]">
      <NavData navdata={navdata} />
      <div className="pt-2 flex flex-col  gap-4">
        <h2 className="text-2xl font-bold">Add Product</h2>
        <div className="w-full flex flex-col items-center gap-4 p-0">
          <div className="w-full">
            <div className="flex flex-row gap-2 w-full p-2 bg-gray-200 rounded-md shadow-md text-nowrap">
              <button
                onClick={() => {
                  setButtonSelection("AS");
                }}
                className={`p-3 ${
                  buttonSelection === "AS"
                    ? "bg-[--dark-blue] text-white"
                    : "bg-white text-[--dark-blue]"
                } rounded-md text-lg font-medium duration-200 ease-in-out w-full`}
              >
                Attendance system
              </button>
              <button
                onClick={() => {
                  setButtonSelection("FAS");
                }}
                className={`p-3 ${
                  buttonSelection === "FAS"
                    ? "bg-[--dark-blue] text-white"
                    : "bg-white text-[--dark-blue]"
                } rounded-md text-lg font-medium duration-200 ease-in-out w-full`}
              >
                Face alert system
              </button>
              <button
                onClick={() => {
                  setButtonSelection("FMS");
                }}
                className={`p-3 ${
                  buttonSelection === "FMS"
                    ? "bg-[--dark-blue] text-white"
                    : "bg-white text-[--dark-blue]"
                } rounded-md text-lg font-medium duration-200 ease-in-out w-full`}
              >
                Face Mask
              </button>
              <button
                onClick={() => {
                  setButtonSelection("HCS");
                }}
                className={`p-3 ${
                  buttonSelection === "HCS"
                    ? "bg-[--dark-blue] text-white"
                    : "bg-white text-[--dark-blue]"
                } rounded-md text-lg font-medium duration-200 ease-in-out w-full`}
              >
                Head Count
              </button>
              <button
                onClick={() => {
                  setButtonSelection("HDS");
                }}
                className={`p-3 ${
                  buttonSelection === "HDS"
                    ? "bg-[--dark-blue] text-white"
                    : "bg-white text-[--dark-blue]"
                } rounded-md text-lg font-medium duration-200 ease-in-out w-full`}
              >
                Human detection
              </button>
            </div>
          </div>
          <div>
            {buttonSelection === "AS" && <AttendanceSystem />}
            {buttonSelection === "FAS" && <FaceAlertSystem />}
            {buttonSelection === "FMS" && <FaceMask />}
            {buttonSelection === "HCS" && <HeadCount />}
            {buttonSelection === "HDS" && <HumanDetection />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
