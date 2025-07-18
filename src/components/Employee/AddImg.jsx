import React, { useEffect, useState } from "react";
import rsv from "../../assets/rsv.png";
import lsv from "../../assets/lsv.png";
import fsv from "../../assets/fsv.png";
import { message, Upload } from "antd";
import NavData from "../NavDataComponent/NavData";
import AxiosInstance from "../../util/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import fileUpload from "../../assets/Logo/fileUpload.gif";

function AddImg() {
  const { empID, empName } = useParams(); // URL-லிருந்து параметры எடுக்கின்றது
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const userInfo = JSON?.parse(sessionStorage.getItem("user"));
  const company_id = userInfo.c_vComId;
  const [loading, setLoading] = useState(false);

  const navdata = [
    {
      name: "Employee",
    },
    {
      name: "Add Image",
    },
  ];

  const [frontView, setFrontView] = useState([]);
  const [rightSide, setRightSide] = useState([]);
  const [leftSide, setLeftSide] = useState([]);
  // const [alertBox,setAlertBox] = useState(false);

  const imageOnChange = (e, view) => {
    const files = e.target.files;
    if (!files || files.length === 0) return; // Check if any files are selected
    // Limit the number of files to 10
    const selectedFiles = Array.from(files).slice(0, 10);
    // Process each selected file
    const renamedFiles = selectedFiles.map((file) => {
      const fileExtension = file.name.split(".").pop();
      const com = company_id;
      const newFileName = `${com}_${empName}_${empID}.${fileExtension}`;
      return new File([file], newFileName, { type: file.type }, com);
    });

    // Update the appropriate view state based on the passed 'view' parameter
    if (view === "frontView") {
      setFrontView((prev) => [...prev, ...renamedFiles]);
    } else if (view === "rightSide") {
      setRightSide((prev) => [...prev, ...renamedFiles]);
    } else if (view === "leftSide") {
      setLeftSide((prev) => [...prev, ...renamedFiles]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append files for each view (front, right, left)
    frontView.forEach((file) => formData.append("frontView", file));
    rightSide.forEach((file) => formData.append("rightSide", file));
    leftSide.forEach((file) => formData.append("leftSide", file));

    try {
      setLoading(true);
      const response = await AxiosInstance.post("/employee/face ", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success(response.data.message);

      navigate(`/extract-employee/${empID}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Error uploading images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4">
      <div>
        <NavData navdata={navdata} />
      </div>

      {/* Note Section */}
      <div className="text-red-500 text-sm flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
        <p>Note:</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <p>(Upload your Photo in above given angle*)</p>
          <p>
            (Capture with high resolution image and better lighting effect*)
          </p>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <img
            src={fileUpload} // 🔁 இது உங்க GIF path
            alt="Loading..."
            className="w-1/2 h-1/4  object-contain mt-12"
          />
        </div>
      ) : (
        <div className="flex flex-col w-full gap-5 mt-6">
          <p className="text-xl font-semibold text-[--dark-blue]">
            Upload Your Photo
          </p>

          {/* Image Guidelines */}
          <div className="flex flex-col md:flex-row justify-around   items-center gap-6 px-4 bg- yellow-200">
            <div className="flex flex-col items-center justify-between  gap-2 ">
              <img src={rsv} alt="Right Side View" className="w-32 md:w-40" />
              <p className="text-center text-sm">
                Right Side View <br />
                (10 images only acceptable)
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src={fsv} alt="Front View" className="w-32 md:w-40" />
              <p className="text-center text-sm">
                Front View <br />
                (10 images only acceptable)
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src={lsv} alt="Left Side View" className="w-32 md:w-40" />
              <p className="text-center text-sm">
                Left Side View <br />
                (10 images only acceptable)
              </p>
            </div>
          </div>

          {/* Upload Inputs */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4">
            <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
              <input
                type="file"
                name="rightsideimage"
                className="w-full p-2 border-2 rounded-md"
                onChange={(e) => imageOnChange(e, "rightSide")}
                multiple
              />
              <p className="text-sm text-center">Right Side View</p>
            </div>
            <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
              <input
                type="file"
                name="frontimage"
                className="w-full p-2 border-2 rounded-md"
                onChange={(e) => imageOnChange(e, "frontView")}
                multiple
              />
              <p className="text-sm text-center">Front View</p>
            </div>
            <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
              <input
                type="file"
                name="leftsideimage"
                className="w-full p-2 border-2 rounded-md"
                onChange={(e) => imageOnChange(e, "leftSide")}
                multiple
              />
              <p className="text-sm text-center">Left Side View</p>
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <button
              onClick={handleUpload}
              className="bg-[--dark-blue] text-white px-6 py-2 rounded-md mt-4"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddImg;
