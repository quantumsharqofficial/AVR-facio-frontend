import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message, Modal } from "antd";
import {
  FaBuilding,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUserTie,
} from "react-icons/fa";
import NavData from "../NavDataComponent/NavData";
import AxiosInstance from "../../util/AxiosInstance";
import { MdModeEdit } from "react-icons/md";

function EditCompany() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({});
  const [formDataEmp, setFormDataEmp] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [alarm, setAlarm] = useState([]);
  const [facemask, setFaceMask] = useState([]);
  const [headCount, setHeadCount] = useState([]);
  const [humanDetection, setHumanDetection] = useState([]);
  const [deleteBoxOpen, setBoxOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          companyRes,
          attendanceRes,
          alarmRes,
          facemaskRes,
          headcountRes,
          humandetectionRes,
        ] = await Promise.all([
          AxiosInstance.get(`/company/get-company-by-id/${id}`),
          AxiosInstance.get(`/attendance/get-allattendance/${id}`),
          AxiosInstance.get(`/alarm/get-allalarm/${id}`),
          AxiosInstance.get(`/face-mask/get-facemask/${id}`),
          AxiosInstance.get(`/head-count/get-headcount/${id}`),
          AxiosInstance.get(`/human/get-human/${id}`),
        ]);

        setCompany(companyRes.data.response || {});
        setFormDataEmp(companyRes.data.response || {});
        setAttendance(attendanceRes.data.response || []);
        setAlarm(alarmRes.data.response || []);
        setFaceMask(facemaskRes.data.response || []);
        setHeadCount(headcountRes.data.response || []);
        setHumanDetection(humandetectionRes.data.response || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to load data");
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "c_tComLogo") {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    } else {
      setFormDataEmp((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      for (const key in formDataEmp) {
        data.append(key, formDataEmp[key]);
      }
      if (image) {
        data.append("image", image);
      }
      await AxiosInstance.patch(`/company/update-company/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Company updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      message.error("Update failed.");
    }
    setLoading(false);
  };
  const navigate = useNavigate();

  const handleCompanyDlt = async (companyId) => {
    try {
      await AxiosInstance.patch(`/company/delete-company/${companyId}`);
      setBoxOpen(false);
      message.success("Company deleted successfully");
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const inputFields = [
    { label: "Company Name", name: "c_vComName", type: "text" },
    { label: "Phone Number", name: "c_vComPhone", type: "tel" },
    { label: "Address", name: "c_tComAddress", type: "text" },
    { label: "Company Logo", name: "c_tComLogo", type: "file" },
    { label: "Company Description", name: "c_tComContent", type: "text" },
    { label: "Email", name: "c_vComEmail", type: "email" },
    { label: "Owner Name", name: "c_vComOwner", type: "text" },
    { label: "Check-in Time", name: "c_vCheckInTime", type: "time" },
    { label: "Check-out Time", name: "c_vCheckOutTime", type: "time" },
  ];

  const Section = ({ title, children }) => (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
        {title}
      </h2>
      {children}
    </div>
  );

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedSystemDetails, setSelectedSystemDetails] = useState(null);
  const [selectedSystemImage, setSelectedSystemImage] = useState(null);
  const [changeSystemImage, setChangeSystemImage] = useState(false);
  const [selectedSystemId, setSelectedSystemId] = useState(null);
  const handleEdit = (system, data, image) => {
    setEditModalOpen(true);
    setSelectedSystem(system);
    setSelectedSystemDetails(data);
    setSelectedSystemId(data[0].value);
    setSelectedSystemImage(image);
  };
  const handleEditChange = (e, index) => {
    const updated = [...selectedSystemDetails];
    if (e.target.type === "file" && e.target.files[0]) {
      setChangeSystemImage(e.target.files[0]);
    } else {
      updated[index].value = e.target.value;
    }
    setSelectedSystemDetails(updated);
  };

  const editAttendance = async (attendance) => {
    for (let [key, value] of attendance.entries()) {
      console.log(`${key}:`, value);
    }
    console.log(selectedSystemId);

    try {
      // 👉 Axios patch with multipart/form-data
      const response = await AxiosInstance.patch(
        `/attendance-alarm/edit-attendance/${selectedSystemId}`,
        attendance,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // setEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const editAlarm = async (alarm) => {
    try {
      const response = await AxiosInstance.patch(
        `/attendance-alarm/edit-alarm/${selectedSystemId}`,
        alarm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // setEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const editFaceMask = async (facemask) => {
    try {
      const response = await AxiosInstance.patch(
        `/face-mask/update-facemask/${selectedSystemId}`,
        facemask
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const editHeadCount = async (headcount) => {
    try {
      const response = await AxiosInstance.patch(
        `/head-count/update-headcount/${selectedSystemId}`,
        headcount
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const editHumanDetection = async (humandetection) => {
    try {
      const response = await AxiosInstance.patch(
        `/human/update-human/${selectedSystemId}`,
        humandetection
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSubmit = async (e) => {
    const attendance = new FormData();
    const alarm = new FormData();
    if (selectedSystem === "attendance") {
      attendance.append("atp_vId", selectedSystemDetails[0].value);
      attendance.append("atp_vComId", id);
      attendance.append("atp_vDate", selectedSystemDetails[1].value);
      attendance.append("atp_vPlace", selectedSystemDetails[2].value);
      if (changeSystemImage) {
        attendance.append("image", changeSystemImage);
      } else {
        attendance.append("atp_vImage", selectedSystemImage);
      }

      editAttendance(attendance);
    } else if (selectedSystem === "alarm") {
      alarm.append("alp_vId", selectedSystemDetails[0].value);
      alarm.append("alp_vComId", id);
      alarm.append("alp_vDate", selectedSystemDetails[1].value);
      alarm.append("alp_vPlace", selectedSystemDetails[2].value);
      if (changeSystemImage) {
        alarm.append("image", changeSystemImage);
      } else {
        alarm.append("alp_vImage", selectedSystemImage);
      }
      editAlarm(alarm);
    } else if (selectedSystem === "facemask") {
      const facemask = new FormData();
      facemask.append("fmp_vId", selectedSystemDetails[0].value);
      facemask.append("fmp_vDate", selectedSystemDetails[1].value);
      facemask.append("fmp_vPlace", selectedSystemDetails[2].value);
      editFaceMask(facemask);
    } else if (selectedSystem === "headcount") {
      const headcount = new FormData();
      headcount.append("hcp_vId", selectedSystemDetails[0].value);
      headcount.append("hcp_vComId", id);
      headcount.append("hcp_vDate", selectedSystemDetails[1].value);
      headcount.append("hcp_vPlace", selectedSystemDetails[2].value);
      editHeadCount(headcount);
    } else if (selectedSystem === "humandetection") {
      const humandetection = new FormData();
      humandetection.append("hp_vId", selectedSystemDetails[0].value);
      humandetection.append("hp_vComId", id);
      humandetection.append("hp_vDate", selectedSystemDetails[1].value);
      humandetection.append("hp_vPlace", selectedSystemDetails[2].value);
      editHumanDetection(humandetection);
    }
  };

  const Card = ({ details, image }) => (
    <div className="bg-gradient-to-t from-[#EFC6AA] to-[#F7E6D3] shadow-lg rounded-xl p-6 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl hover:bg-slate-100 hover:border-gray-600">
      <div className="flex items-start gap-6">
        {image && (
          <div className="w-28 h-28 rounded-lg overflow-hidden border border-gray-200 shadow-md">
            <img
              src={image}
              alt="Detail"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 space-y-3">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">{detail.label}:</span>
              <span className="text-gray-800 font-semibold">
                {detail.value || "N/A"}
              </span>
            </div>
          ))}
          <div className="w-full flex justify-center">
            <button
              onClick={() => handleEdit("attendance", details, image)}
              className="bg-blue-500 p-2 rounded-lg text-white flex items-center gap-1"
            >
              <MdModeEdit size={18} /> <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Card1 = ({ details, image }) => (
    <div className="bg-gradient-to-t from-[#B5D7B0] to-[#E0EEDA] shadow-lg rounded-xl p-6 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl hover:bg-slate-100 hover:border-gray-600">
      <div className="flex items-start gap-6">
        {image && (
          <div className="w-28 h-28 rounded-lg overflow-hidden border border-gray-200 shadow-md">
            <img
              src={image}
              alt="Detail"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 space-y-3">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">{detail.label}:</span>
              <span className="text-gray-800 font-semibold">
                {detail.value || "N/A"}
              </span>
            </div>
          ))}
          <div className="w-full flex justify-center">
            <button
              onClick={() => handleEdit("alarm", details, image)}
              className="bg-blue-500 p-2 rounded-lg text-white flex items-center gap-1"
            >
              <MdModeEdit size={18} /> <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Card2 = ({ details }) => (
    <div className="bg-gradient-to-t from-[#B5D7B0] to-[#E0EEDA] shadow-lg rounded-xl p-6 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl hover:bg-slate-100 hover:border-gray-600">
      <div className="flex items-start gap-6">
        <div className="flex-1 space-y-3">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">{detail.label}:</span>
              <span className="text-gray-800 font-semibold">
                {detail.value || "N/A"}
              </span>
            </div>
          ))}
          <div className="w-full flex justify-center">
            <button
              onClick={() => handleEdit("facemask", details)}
              className="bg-blue-500 p-2 rounded-lg text-white flex items-center gap-1"
            >
              <MdModeEdit size={18} /> <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Card3 = ({ details }) => (
    <div className="bg-gradient-to-t from-[#B5D7B0] to-[#E0EEDA] shadow-lg rounded-xl p-6 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl hover:bg-slate-100 hover:border-gray-600">
      <div className="flex items-start gap-6">
        <div className="flex-1 space-y-3">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">{detail.label}:</span>
              <span className="text-gray-800 font-semibold">
                {detail.value || "N/A"}
              </span>
            </div>
          ))}
          <div className="w-full flex justify-center">
            <button
              onClick={() => handleEdit("headcount", details)}
              className="bg-blue-500 p-2 rounded-lg text-white flex items-center gap-1"
            >
              <MdModeEdit size={18} /> <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Card4 = ({ details }) => (
    <div className="bg-gradient-to-t from-[#B5D7B0] to-[#E0EEDA] shadow-lg rounded-xl p-6 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl hover:bg-slate-100 hover:border-gray-600">
      <div className="flex items-start gap-6">
        <div className="flex-1 space-y-3">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">{detail.label}:</span>
              <span className="text-gray-800 font-semibold">
                {detail.value || "N/A"}
              </span>
            </div>
          ))}
          <div className="w-full flex justify-center">
            <button
              onClick={() => handleEdit("humandetection", details)}
              className="bg-blue-500 p-2 rounded-lg text-white flex items-center gap-1"
            >
              <MdModeEdit size={18} /> <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const NoRecords = ({ message }) => (
    <p className="text-gray-500 text-center">{message}</p>
  );

  return (
    <div className="p-5 w-full bg-gray-100 min-h-screen">
      <NavData
        navdata={[{ name: "Manage Companies" }, { name: "Edit Company" }]}
      />

      {/* Edit Form */}
      <Section title="Edit Company">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {inputFields.map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={
                  field.type !== "file"
                    ? formDataEmp[field.name] || ""
                    : undefined
                }
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                accept={field.type === "file" ? "image/*" : undefined}
              />
            </div>
          ))}
          <div className="col-span-full flex justify-around mt-4 w-full">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-1/3"
              disabled={loading}
            >
              {loading ? (
                "Updating..."
              ) : (
                <span className="flex items-center gap-1 justify-center">
                  <MdModeEdit size={18} /> Edit
                </span>
              )}
            </button>{" "}
            <button
              type="button"
              onClick={() => {
                setSelectedCompany(company);
                setBoxOpen(true);
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 w-1/3"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            <Modal
              title="Warning!"
              open={deleteBoxOpen}
              onOk={() => handleCompanyDlt(selectedCompany?.c_vComId)}
              onCancel={() => setBoxOpen(false)}
              okText="Delete"
            >
              <p>Are you sure you want to delete this company?</p>
            </Modal>
          </div>
        </form>
      </Section>

      {/* Attendance Details */}
      <Section title="Attendance Details">
        {attendance.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendance.map((item, index) => (
              <Card
                key={index}
                details={[
                  { label: "Id", value: item.atp_vId },
                  { label: "Date", value: item.atp_vDate },
                  { label: "Place", value: item.atp_vPlace },
                ]}
                image={item.atp_vImage}
              />
            ))}
          </div>
        ) : (
          <NoRecords message="No attendance records found." />
        )}
      </Section>

      {/* Alarm Details */}
      <Section title="Alarm Details">
        {alarm.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alarm.map((item, index) => (
              <Card1
                key={index}
                details={[
                  { label: "Id", value: item.alp_vId },
                  { label: "Date", value: item.alp_vDate },
                  { label: "Place", value: item.alp_vPlace },
                ]}
                image={item.alp_vImage}
              />
            ))}
          </div>
        ) : (
          <NoRecords message="No alarm records found." />
        )}
      </Section>

      {/* Face Mask Details */}
      <Section title="Face Mask Details">
        {facemask.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facemask.map((item, index) => (
              <Card2
                key={index}
                details={[
                  { label: "Id", value: item.fmp_vId },
                  { label: "Date", value: item.fmp_vDate },
                  { label: "Place", value: item.fmp_vPlace },
                ]}
              />
            ))}
          </div>
        ) : (
          <NoRecords message="No alarm records found." />
        )}
      </Section>

      {/* Head Count Details */}
      <Section title="Head Count Details">
        {headCount.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {headCount.map((item, index) => (
              <Card3
                key={index}
                details={[
                  { label: "Id", value: item.hcp_vId },
                  { label: "Date", value: item.hcp_vDate },
                  { label: "Place", value: item.hcp_vPlace },
                ]}
              />
            ))}
          </div>
        ) : (
          <NoRecords message="No head count records found." />
        )}
      </Section>

      {/* Human Detection Details */}
      <Section title="Human Detection Details">
        {humanDetection.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {humanDetection.map((item, index) => (
              <Card4
                key={index}
                details={[
                  { label: "Id", value: item.hp_vId },
                  { label: "Date", value: item.hp_vDate },
                  { label: "Place", value: item.hp_vPlace },
                ]}
              />
            ))}
          </div>
        ) : (
          <NoRecords message="No head count records found." />
        )}
      </Section>

      <Modal
        title={
          <span className="text-xl font-semibold">Edit {selectedSystem}</span>
        }
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onOk={handleEditSubmit} // Replace with your actual function
        okText="Edit"
      >
        <div className="space-y-6">
          {selectedSystemDetails?.map((detail, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">
                {detail.label} :
              </label>
              <input
                type={detail.label === "Date" ? "Date" : "text"}
                value={detail.value || ""}
                onChange={(e) => handleEditChange(e, idx)} // You can define this function to update values
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}{" "}
          {selectedSystem != "facemask" && selectedSystem != "headcount" && selectedSystem != "humandetection" ? (
            <>
              <label className="text-gray-700 font-medium block">image :</label>
              <input
                type="file"
                //   value={detail.value || ""}
                onChange={(e) => handleEditChange(e, 1)} // You can define this function to update values
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}

export default EditCompany;

// ====== Reusable Components ======
