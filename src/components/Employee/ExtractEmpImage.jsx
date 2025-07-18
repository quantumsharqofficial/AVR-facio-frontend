import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";
import face from "../../assets/Logo/faceScaning.gif";
import { message } from "antd";

function ExtractEmpImage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmployeeById = async () => {
      setLoading(true); // 🚀 Add this line to show loading state when fetching starts
      try {
        const response = await AxiosInstance.get(
          `/employee/get-employee-by-id/${id}`
        );
        setEmployee(response.data.response[0]);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    getEmployeeById();
  }, [id]);

  const handleExtract = async () => {
    try {
      if (!employee || !employee.e_vEmpId || !employee.e_vProfileImg) {
        console.error("Step 2.1: Validation failed - Missing employee details");
        throw new Error("Missing employee details");
      }
      const payload = {
        company_id: employee.e_vComId, // Ensure this field exists
        employee: `${employee.e_vName}_${employee.e_vEmpId}`,
        image: employee.e_vProfileImg,
      };
      setLoading(true);
      const res = await AxiosInstance.post(
        "https://test.quantumfacio.com/traning",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Successfully Extracted");
      setTimeout(() => {
        navigate("/success");
      }, 2000);
    } catch (err) {
      console.error(
        "Step 7: Error occurred:",
        err.response ? err.response.data : err.message
      );
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <img src={face} className="w-4/5  h-4/5" alt="Loading..." />
        </div>
      ) : employee ? (
        <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-sm w-full text-center transform transition duration-500 hover:scale-105">
          <img
            src={employee.e_vProfileImg || "https://via.placeholder.com/150"}
            alt={employee.e_vName}
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-300 object-cover"
          />
          <h2 className="text-2xl font-semibold mt-4 text-gray-800">
            {employee.e_vName}
          </h2>
          <p className="text-gray-500">
            {employee.e_vDesignation || "No Designation"}
          </p>
          <p className="text-gray-600 text-sm mt-2 font-medium">
            Emp ID: {employee.e_vEmpId}
          </p>
          <p className="text-gray-600 text-sm">Phone: {employee.e_vPhone}</p>
          <button
            // onClick={() => navigate("/success")}
            onClick={handleExtract}
            className="mt-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            Extract
          </button>
        </div>
      ) : (
        <p className="text-lg font-semibold text-red-500">Employee not found</p>
      )}
    </div>
  );
}

export default ExtractEmpImage;
