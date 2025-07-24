import React, { useEffect, useState } from "react";
import AxiosInstance from "../../util/AxiosInstance";

function Profile() {
  const [theft, setTheft] = useState([]);
  const compData = JSON.parse(sessionStorage.getItem("user"));

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTheft, setSelectedTheft] = useState(null);

  const getTheft = async () => {
    try {
      const response = await AxiosInstance.get(
        `/thief/get-all/${compData.c_vComId}`
      );
      const data = response.data.response;
      setTheft(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (theftItem) => {
    setSelectedTheft(theftItem);
    setOpenEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await AxiosInstance.put(`/thief/update/${selectedTheft.t_iTheftId}`, selectedTheft);
      setOpenEditModal(false);
      getTheft(); // refresh data
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  useEffect(() => {
    getTheft();
  }, []);

  return (
    <div className="p-4 bg-red-50 rounded-lg border border-red-300 shadow">
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-red-200">
              <th className="p-2">S.No</th>
              <th className="p-2">Profile</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Address</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {theft.map((t, i) => (
              <tr key={i} className="border-t hover:bg-red-100">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 flex justify-center">
                  <img
                    src={t.t_vProfileImg}
                    alt={t.t_vTheftName}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-2">{t.t_vTheftName}</td>
                <td className="p-2 break-all">{t.t_vEmail}</td>
                <td className="p-2">{t.t_vPhone}</td>
                <td className="p-2">{t.t_vAddress}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
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
        {theft.map((t, i) => (
          <div key={i} className="bg-white border border-red-200 rounded-lg p-4 shadow">
            <div className="flex items-center space-x-4 mb-2">
              <img src={t.t_vProfileImg} alt={t.t_vTheftName} className="w-12 h-12 rounded-full" />
              <div className="min-w-0">
                <p className="font-semibold text-red-800">{t.t_vTheftName}</p>
                <p className="text-sm text-gray-600 break-all">{t.t_vEmail}</p>
              </div>
            </div>
            <p className="text-sm break-all">
              <strong>Contact:</strong> {t.t_vPhone}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(t)}
                className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {openEditModal && selectedTheft && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              Edit Theft
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={selectedTheft.t_vTheftName}
                  onChange={(e) =>
                    setSelectedTheft({ ...selectedTheft, t_vTheftName: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="text"
                  value={selectedTheft.t_vEmail}
                  onChange={(e) =>
                    setSelectedTheft({ ...selectedTheft, t_vEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  value={selectedTheft.t_vPhone}
                  onChange={(e) =>
                    setSelectedTheft({ ...selectedTheft, t_vPhone: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setOpenEditModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
