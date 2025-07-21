import React from "react";

const vipData = [
  {
    id: 1,
    image: "https://via.placeholder.com/50",
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "+91 9876543210",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/50",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    contact: "+91 9123456789",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/50",
    name: "Raj Kumar",
    email: "raj.kumar@example.com",
    contact: "+91 9988776655",
  },
];

function Profile() {
  const handleAdd = () => {
    alert("Add VIP clicked ✅");
  };

  const handleEdit = (name) => {
    alert(`Edit ${name}`);
  };

  const handleDelete = (name) => {
    alert(`Delete ${name}`);
  };

  return (
    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300 shadow">
      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-xl font-bold text-yellow-700">👑 VIP Members</h2>
        <button
          onClick={handleAdd}
          className="bg-yellow-400 text-white px-4 py-1 rounded shadow hover:bg-yellow-500"
        >
          + Add VIP
        </button>
      </div> */}

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-yellow-200 text-left">
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {vipData.map((vip) => (
              <tr key={vip.id} className="border-t hover:bg-yellow-100">
                <td className="p-2">
                  <img
                    src={vip.image}
                    alt={vip.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-2">{vip.name}</td>
                <td className="p-2">{vip.email}</td>
                <td className="p-2">{vip.contact}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(vip.name)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vip.name)}
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
        {vipData.map((vip) => (
         <div
  key={vip.id}
  className="bg-white border border-yellow-200 rounded-lg p-4 shadow"
>
  <div className="flex items-center space-x-4 mb-2">
    <img
      src={vip.image}
      alt={vip.name}
      className="w-12 h-12 rounded-full"
    />
    <div className="min-w-0">
      <p className="font-semibold text-yellow-800">{vip.name}</p>
      <p className="text-sm text-gray-600 break-all">{vip.email}</p>
    </div>
  </div>
  <p className="text-sm mb-2 break-all">
    <strong>Contact:</strong> {vip.contact}
  </p>
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
