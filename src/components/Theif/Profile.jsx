import React from "react";

const theifData = [
  {
    id: 1,
    name: "Suresh",
    item: "Gold Chain",
    theftDate: "2025-06-20T08:45",
    image: "https://via.placeholder.com/60x60?text=Suresh"
  },
  {
    id: 2,
    name: "Madhan",
    item: "Mobile Phone",
    theftDate: "2025-07-05T19:20",
    image: "https://via.placeholder.com/60x60?text=Madhan"
  },
];

function Profile() {
  const handleAdd = () => {
    alert("Add Theft Record clicked 🚨");
  };

  return (
    <div className="p-4 bg-red-50 rounded-lg border border-red-300 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-red-700">🚨 Theft Records</h2>
        <button onClick={handleAdd} className="bg-red-400 text-white px-4 py-1 rounded shadow hover:bg-red-500">
          + Add Record
        </button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-red-200 text-left">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Item Stolen</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {theifData.map((t) => {
            const dateObj = new Date(t.theftDate);
            const date = dateObj.toLocaleDateString();
            const time = dateObj.toLocaleTimeString();

            return (
              <tr key={t.id} className="border-t">
                <td className="p-2">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.item}</td>
                <td className="p-2">{date}</td>
                <td className="p-2">{time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Profile;
