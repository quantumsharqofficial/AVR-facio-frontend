import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";
import { message, Spin } from "antd";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserTie,
  FaBuilding,
} from "react-icons/fa";
import NavData from "../../components/NavDataComponent/NavData";

function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [alarm, setAlarm] = useState([]);
  const [faceMask, setFaceMask] = useState([]);
  const [headCount, setHeadCount] = useState([]);
  const [humanDetection, setHumanDetection] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [companyRes, attendanceRes, alarmRes, facemaskRes, headcountRes, humandetectionRes] =
          await Promise.all([
            AxiosInstance.get(`/company/get-company-by-id/${id}`),
            AxiosInstance.get(`/attendance/get-allattendance/${id}`),
            AxiosInstance.get(`/alarm/get-allalarm/${id}`),
            AxiosInstance.get(`/face-mask/get-facemask/${id}`),
            AxiosInstance.get(`/head-count/get-headcount/${id}`),
            AxiosInstance.get(`/human/get-human/${id}`),
          ]);
        setCompany(companyRes.data.response || {});
        setAttendance(attendanceRes.data.response || []);
        setAlarm(alarmRes.data.response || []);
        setFaceMask(facemaskRes.data.response || []);
        setHeadCount(headcountRes.data.response || []);
        setHumanDetection(humandetectionRes.data.response || []);
        console.log(facemaskRes.data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to load data");
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  if (!company || Object.keys(company).length === 0)
    return (
      <div className="text-center text-red-500 p-5 text-xl">
        No company data found.
      </div>
    );

  return (
    <div className="p-5 w-full bg-gray-100 min-h-screen">
      <NavData
        navdata={[{ name: "Manage Companys" }, { name: "Company Details" }]}
      />

      {/* Company Details */}
      <Section title="Company Details">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {company.c_tComLogo && (
            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0 bg-gradient-to-t from-[#F2C3F3] to-[#FEE7F8] p-10 rounded-md">
              <img
                src={company.c_tComLogo}
                alt="Company Logo"
                className="w-32 h-32 border-2 rounded-full object-cover shadow-lg "
              />
            </div>
          )}
          <div className="md:w-2/3 space-y-3">
            <DetailItem
              icon={FaBuilding}
              label="Company Name"
              value={company.c_vComName}
            />
            <DetailItem
              icon={FaPhone}
              label="Phone Number"
              value={company.c_vComPhone}
            />
            <DetailItem
              icon={FaMapMarkerAlt}
              label="Address"
              value={company.c_tComAddress}
            />
            <DetailItem
              icon={FaEnvelope}
              label="Email"
              value={company.c_vComEmail}
            />
            <DetailItem
              icon={FaUserTie}
              label="Owner Name"
              value={company.c_vComOwner}
            />
            <DetailItem label="Description" value={company.c_tComContent} />
          </div>
        </div>
      </Section>

      {/* Attendance Details */}
      <Section title="Attendance Details">
        {attendance.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
            {attendance.map((item, index) => (
              <Card
                key={index}
                // title={`Attendance ${index + 1}`}
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
                // title={`Alarm ${index + 1}`}
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

      {/* Face Mask */}
      <Section title="Face Mask Details">
        {faceMask.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faceMask.map((item, index) => (
              <Card1
                key={index}
                // title={`Alarm ${index + 1}`}
                details={[
                  { label: "Id", value: item.fmp_vId },
                  { label: "Date", value: item.fmp_vDate },
                  { label: "Place", value: item.fmp_vPlace },
                ]}
                image={item.alp_vImage}
              />
            ))}
          </div>
        ) : (
          <NoRecords message="No alarm records found." />
        )}
      </Section>

      {/* Head Count */}
      <Section title="Head Count Details">
        {headCount.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {headCount.map((item, index) => (
              <Card1
                key={index}
                // title={`Alarm ${index + 1}`}
                details={[
                  { label: "Id", value: item.hcp_vId },
                  { label: "Date", value: item.hcp_vDate },
                  { label: "Place", value: item.hcp_vPlace },
                ]}
              />
            ))}
          </div>
        ) : (
          <NoRecords message="No alarm records found." />
        )}
      </Section>

       {/* Human Detection */}
       <Section title="Human Detection Details">
        {humanDetection.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {humanDetection.map((item, index) => (
              <Card1
                key={index}
                // title={`Alarm ${index + 1}`}
                details={[
                  { label: "Id", value: item.hp_vId },
                  { label: "Date", value: item.hp_vDate },
                  { label: "Place", value: item.hp_vPlace },
                ]}
              />
            ))}
          </div>
        ) : (
          <NoRecords message="No alarm records found." />
        )}
      </Section>
    </div>
  );
}

// Reusable components
const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 text-gray-700">
    {Icon && <Icon className="text-gray-500 text-lg" />}
    <span className="font-semibold">{label}:</span>
    <span className="text-gray-900">{value || "N/A"}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
      {title}
    </h2>
    {children}
  </div>
);

const Card = ({ title, details, image }) => (
  <div className="bg-gradient-to-t from-[#EFC6AA] to-[#F7E6D3] shadow-lg rounded-xl p-6 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl hover:bg-slate-100 hover:border-gray-600">
    {/* Title Section */}
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

    {/* Content Layout */}
    <div className="flex items-start gap-6">
      {/* Image Section */}
      {image && (
        <div className="w-28 h-28 rounded-lg overflow-hidden border border-gray-200 shadow-md">
          <img
            src={image}
            alt="Detail"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Details Section */}
      <div className="flex-1 space-y-3">
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">{detail.label}:</span>
            <span className="text-gray-800 font-semibold">
              {detail.value || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
const Card1 = ({ title, details, image }) => (
  <div className="bg-gradient-to-t from-[#B5D7B0] to-[#E0EEDA] shadow-lg rounded-xl p-6 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl hover:bg-slate-100 hover:border-gray-600">
    {/* Title Section */}
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

    {/* Content Layout */}
    <div className="flex items-start gap-6">
      {/* Image Section */}
      {image && (
        <div className="w-28 h-28 rounded-lg overflow-hidden border border-gray-200 shadow-md">
          <img
            src={image}
            alt="Detail"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Details Section */}
      <div className="flex-1 space-y-3">
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">{detail.label}:</span>
            <span className="text-gray-800 font-semibold">
              {detail.value || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
const NoRecords = ({ message }) => (
  <p className="text-gray-500 text-center">{message}</p>
);

export default CompanyDetails;
