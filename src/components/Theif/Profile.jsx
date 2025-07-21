import React from "react";

const theifData = [
  {
    id: 1,
    name: "Suresh",
    item: "Gold Chain",
    theftDate: "2025-06-20T08:45",
    email: "suresh@gmail.com",
    contact: "+91 99988 77661",
    image: "https://via.placeholder.com/60x60?text=Suresh",
  },
  {
    id: 2,
    name: "Madhan",
    item: "Mobile Phone",
    theftDate: "2025-07-05T19:20",
    email: "madhan@gmail.com",
    contact: "+91 88877 66554",
    image: "https://via.placeholder.com/60x60?text=Madhan",
  },
];

function Profile() {
  const handleAdd = () => {
    alert("Add Theft Record clicked 🚨");
  };

  return (
    <div className="p-4 bg-red-50 rounded-lg border border-red-300 shadow">
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-red-200 text-left">
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {theifData.map((t) => (
              <tr key={t.id} className="border-t hover:bg-red-100">
                <td className="p-2">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-2">{t.name}</td>
                <td className="p-2 break-all">{t.email}</td>
                <td className="p-2">{t.contact}</td>
                <td className="p-2 space-x-2">
                  <button
                    // onClick={() => handleEdit(vip.name)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    // onClick={() => handleDelete(vip.name)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block sm:hidden space-y-4">
        {theifData.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-red-200 rounded-lg p-4 shadow"
          >
            <div className="flex items-center space-x-4 mb-2">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="min-w-0">
                <p className="font-semibold text-red-800">{t.name}</p>
                <p className="text-sm text-gray-600 break-all">{t.email}</p>
              </div>
            </div>
            <p className="text-sm break-all">
              <strong>Contact:</strong> {t.contact}
            </p>{" "}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(vip.name)}
                className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(vip.name)}
                className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
