import React, { useState } from "react";
import NavData from "../../components/NavDataComponent/NavData";

function HumanDetection() {
  const navdata = [{ name: "Human Detection" }];
  const [modalImage, setModalImage] = useState(null);

  const date = new Date();
  const today = date.toISOString().split("T")[0];
  date.setDate(date.getDate() - 1);
  const yesterday = date.toISOString().split("T")[0];
  date.setDate(date.getDate() - 1);
  const twoDaysAgo = date.toISOString().split("T")[0];
  date.setDate(date.getDate() - 1);
  const threeDaysAgo = date.toISOString().split("T")[0];

  const filteredData = [
    {
      efm_date: today,
      efm_time: "10:36 AM",
      efm_image: "https://quantumfacio.com/api/images/HumanDetection/1.png",
    },
    {
      efm_date: today,
      efm_time: "09:47 AM",
      efm_image: "https://quantumfacio.com/api/images/HumanDetection/2.png",
    },
    {
      efm_date: today,
      efm_time: "08:13 AM",
      efm_image: "https://quantumfacio.com/api/images/HumanDetection/3.png",
    },
    {
      efm_date: today,
      efm_time: "06:28 AM",
      efm_image: "https://quantumfacio.com/api/images/HumanDetection/4.png",
    },
    {
      efm_date: yesterday,
      efm_time: "05:46 PM",
      efm_image: "https://quantumfacio.com/api/images/HumanDetection/5.png",
    },
    {
      efm_date: yesterday,
      efm_time: "11:23 AM",
      efm_image: "https://quantumfacio.com/api/images/HumanDetection/6.png",
    },
    {
      efm_date: twoDaysAgo,
      efm_time: "10:11 PM",
      efm_image:
        "https://quantumfacio.com/api/images/HumanDetection/persion1.jpg",
    },
    {
      efm_date: twoDaysAgo,
      efm_time: "11:15 AM",
      efm_image:
        "https://quantumfacio.com/api/images/HumanDetection/persion2.jpg",
    },
    {
      efm_date: twoDaysAgo,
      efm_time: "07:34 AM",
      efm_image:
        "https://quantumfacio.com/api/images/HumanDetection/persion3.jpg",
    },
    {
      efm_date: threeDaysAgo,
      efm_time: "10:11 PM",
      efm_image:
        "https://quantumfacio.com/api/images/HumanDetection/persion4.jpg",
    },
    {
      efm_date: threeDaysAgo,
      efm_time: "11:57 AM",
      efm_image:
        "https://quantumfacio.com/api/images/HumanDetection/persion5.jpg",
    },
    {
      efm_date: threeDaysAgo,
      efm_time: "09:42 AM",
      efm_image:
        "https://quantumfacio.com/api/images/HumanDetection/persion6.jpg",
    },
  ];

  return (
    <div>
      {" "}
      <div className="mb-4">
        <NavData navdata={navdata} />
      </div>
      <div className="mb-4 flex gap-2">
        <input type="date" className="p-2 border rounded" />
        <button className="px-4 py-2 bg-[--dark-blue] text-white rounded hover:bg-opacity-90">
          Clear
        </button>
      </div>
      <div className="w-full shadow-[0px_0px_20px_rgba(0,0,0,0.1)] rounded-lg max-h-396 overflow-auto">
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

export default HumanDetection;
