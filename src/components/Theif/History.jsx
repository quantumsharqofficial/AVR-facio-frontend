import React, { useEffect, useState } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { message } from "antd";

function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theifHistory, setTheifHistory] = useState([]);
  const compData = JSON.parse(sessionStorage.getItem("user"));

  const getTheifHistory = async () => {
    try {
      const response = await AxiosInstance.get(
        `/thief/get-all-history/${compData.c_vComId}`
      );
      const data = response.data.data;
      setTheifHistory(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTheifHistory();
  }, []);

  return (
    <div className="p-4 ">
      {/* Desktop Table */}
      <div className="hidden sm:block bg-red-50 rounded-lg border border-red-300 shadow overflow-x-auto">
        <table className="w-full table-auto border-collapse text-center ">
          <thead>
            <tr className="bg-red-200 text-center">
              <th className="p-2">S.No</th>
              <th className="p-2">Profile</th>
              <th className="p-2">Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {theifHistory.map((theif, index) => (
              <tr key={index} className="border-t hover:bg-red-100">
                <td className="p-2"> {index + 1} </td>
                <td className="p-2 flex justify-center">
                  <img
                    src={theif.th_vProfileImg}
                    alt={theif.th_vThiefName}
                    className="w-10 h-10 rounded-full object-cover "
                  />
                </td>
                <td className="p-2">{theif.th_vThiefName}</td>
                <td className="p-2">{theif.th_vDate}</td>
                <td className="p-2">{theif.th_vTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Card Style */}
      <div className="sm:hidden space-y-4">
        {theifHistory.map((theif, index) => (
          <div
            key={index}
            className="bg-red-50 border border-red-300 shadow rounded-lg p-4 flex items-center space-x-4"
          >
            <img
              src={theif.th_vProfileImg}
              alt={theif.th_vThiefName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-red-700">
                {theif.th_vThiefName}
              </h3>
              <p className="text-sm text-gray-700">📅 {theif.th_vDate}</p>
              <p className="text-sm text-gray-700">⏰ {theif.th_vTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
