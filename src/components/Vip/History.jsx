import React, { useEffect, useState } from "react";
import AxiosInstance from "../../util/AxiosInstance";

function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vipHistory, setVipHistory] = useState([]);
  const compData = JSON.parse(sessionStorage.getItem("user"));

  const getVipHistory = async () => {
    try {
      const response = await AxiosInstance.get(
        `/vip/get-all-history/QF20250421-1`
      );
      const data = response.data.response;
      console.log(data);

      setVipHistory(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getVipHistory();
  }, []);
  return (
    <div className="p-4 ">
      {/* Desktop Table */}
      <div className="hidden sm:block bg-yellow-50 rounded-lg border border-yellow-300 shadow overflow-x-auto">
        <table className="w-full table-auto border-collapse text-center ">
          <thead>
            <tr className="bg-yellow-200 text-center">
              <th className="p-2">S.No</th>
              <th className="p-2">Profile</th>
              <th className="p-2">Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {vipHistory?.map((vip, index) => (
              <tr key={index} className="border-t hover:bg-yellow-100">
                <td className="p-2"> {index + 1} </td>
                <td className="p-2 flex justify-center">
                  <img
                    src={vip.v_vProfileImg}
                    alt={vip.vh_vThiefName}
                    className="w-10 h-10 rounded-full object-cover "
                  />
                </td>
                <td className="p-2">{vip.vh_vVipName  }</td>
                <td className="p-2">{vip.vh_vDate}</td>
                <td className="p-2">{vip.vh_vTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Card Style */}
      <div className="sm:hidden space-y-4">
        {vipHistory?.map((vip, index) => (
          <div
            key={index}
            className="bg-yellow-50 border border-yellow-300 shadow rounded-lg p-4 flex items-center space-x-4"
          >
            <img
              src={vip.vh_vProfileImg}
              alt={vip.vh_vThiefName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-yellow-700">
                {vip.vh_vThiefName}
              </h3>
              <p className="text-sm text-gray-700">📅 {vip.vh_vDate}</p>
              <p className="text-sm text-gray-700">⏰ {vip.vh_vTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
