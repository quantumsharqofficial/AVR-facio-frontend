import React, { useEffect, useState } from "react";
import NavData from "../../components/NavDataComponent/NavData";
import AxiosInstance from "../../util/AxiosInstance";

function FaceMaskDetection() {
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const navdata = [{ name: "Face Mask Detection" }];
  const [faceMaskData, setFaceMaskData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [modalImage, setModalImage] = useState(null);

  const getFaceMaskData = async () => {
    try {
      const response = await AxiosInstance.get(
        `/employee-facemask/get/${userInfo.c_vComId}`
      );
      console.log(response?.data?.response, "data");

      setFaceMaskData(response?.data?.response);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data. Please try again.");
    }
  };

  useEffect(() => {
    getFaceMaskData();
  }, []);

  // const filteredData = selectedDate
  //   ? faceMaskData.filter((data) => data.efm_date === selectedDate)
  //   : faceMaskData;

  const date = new Date();
  const today = date.toISOString().split("T")[0];
  date.setDate(date.getDate() - 1);
  const yesterday = date.toISOString().split("T")[0];

  const filteredData = [
    {
      id: 8,
      efm_vID: "QF20250708-FM008",
      efm_date: today,
      efm_time: "11:37 AM",
      efm_image:
        "https://quantumfacio.com/api/images/FaceMask/2025-07-08T07-07-55-374Z_detection.jpg",
      efm_comId: "QF20250421-1",
    },
    {
      id: 10,
      efm_vID: "QF20250708-FM010",
      efm_date: today,
      efm_time: "10:52 AM",
      efm_image:
        "https://quantumfacio.com/api/images/FaceMask/2025-07-08T07-09-55-324Z_detection.jpg",
      efm_comId: "QF20250421-1",
    },
    {
      id: 9,
      efm_vID: "QF20250708-FM009",
      efm_date: today,
      efm_time: "08:38 AM",
      efm_image:
        "https://quantumfacio.com/api/images/FaceMask/2025-07-08T07-08-55-296Z_detection.jpg",
      efm_comId: "QF20250421-1",
    },
    {
      id: 1,
      efm_vID: "QF20250604-FM001",
      efm_date: today,
      efm_time: "07:14 AM",
      efm_image:
        "https://quantumfacio.com/api/images/FaceMask/2025-06-04T07-15-45-090Z_detection.jpg",
      efm_comId: "QF20250421-1",
    },

    {
      id: 5,
      efm_vID: "QF20250604-FM005",
      efm_date: today,
      efm_time: "08:53 PM",
      efm_image:
        "https://quantumfacio.com/api/images/FaceMask/2025-06-04T07-23-07-703Z_detection.jpg",
      efm_comId: "QF20250421-1",
    },
    {
      id: 6,
      efm_vID: "QF20250604-FM006",
      efm_date: yesterday,
      efm_time: "05:06 PM",
      efm_image:
        "https://quantumfacio.com/api/images/FaceMask/2025-06-04T07-25-09-067Z_detection.jpg",
      efm_comId: "QF20250421-1",
    },

    {
      id: 4,
      efm_vID: "QF20250604-FM004",
      efm_date: yesterday,
      efm_time: "02:51 PM",
      efm_image:
        "https://quantumfacio.com/api/images/FaceMask/2025-06-04T07-21-07-003Z_detection.jpg",
      efm_comId: "QF20250421-1",
    },
    {
      id: 7,
      efm_vID: "QF20250708-FM007",
      efm_date: yesterday,
      efm_time: "11:36 AM",
      efm_image:
        "https://quantumfacio.com/api/images/FaceMask/2025-07-08T07-06-55-772Z_detection.jpg",
      efm_comId: "QF20250421-1",
    },
  ];

  const handleClear = () => {
    setSelectedDate("");
  };

  return (
    <div>
      {" "}
      <div className="mb-4">
        <NavData navdata={navdata} />
      </div>
      <div className="mb-4 flex gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-[--dark-blue] text-white rounded hover:bg-opacity-90"
        >
          Clear
        </button>
      </div>
      <div className="w-full shadow-[0px_0px_20px_rgba(0,0,0,0.1)] rounded-lg max-h-screen overflow-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-[--dark-blue] text-white sticky top-0 z-50">
              <th className="p-3">S.No</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Image</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.efm_date}</td>
                  <td>{data.efm_time}</td>
                  <td>
                    <div className="w-full flex justify-center items-center">
                      <img
                        src={data.efm_image}
                        onClick={() => setModalImage(data.efm_image)}
                        alt={`Face Mask Detection ${index + 1}`}
                        className="w-16 h-16"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setModalImage(null)} // close modal on outside click
        >
          <div className="bg-white p-4 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-white font-bold text-xl bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setModalImage(null)}
            >
              ×
            </button>

            <img
              src={modalImage}
              alt="Enlarged"
              className="max-w-full max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FaceMaskDetection;
