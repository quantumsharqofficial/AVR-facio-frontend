import React from "react";

const vipData = [
  {
    id: 1,
    name: "Ravi",
    loyaltyPoints: 1200,
    lastPurchase: "2025-07-10T15:30",
    image: "https://via.placeholder.com/60x60?text=Ravi",
  },
  {
    id: 2,
    name: "Anitha",
    loyaltyPoints: 850,
    lastPurchase: "2025-07-15T11:10",
    image: "https://via.placeholder.com/60x60?text=Anitha",
  },
];

function Profile() {
  const handleAdd = () => {
    alert("Add VIP clicked ✅");
  };

  return (
    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-yellow-700">👑 VIP Members</h2>
        <button
          onClick={handleAdd}
          className="bg-yellow-400 text-white px-4 py-1 rounded shadow hover:bg-yellow-500"
        >
          + Add VIP
        </button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-yellow-200 text-left">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Points</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {vipData.map((vip) => {
            const dateObj = new Date(vip.lastPurchase);
            const date = dateObj.toLocaleDateString();
            const time = dateObj.toLocaleTimeString();

            return (
              <tr key={vip.id} className="border-t">
                <td className="p-2">
                  <img
                    src={vip.image}
                    alt={vip.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-2">{vip.name}</td>
                <td className="p-2">{vip.loyaltyPoints}</td>
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
