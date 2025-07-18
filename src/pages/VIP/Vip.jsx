import React, { useState } from "react";
import History from "../../components/Vip/History";
import VipProfile from "../../components/Vip/Profile";
import NewVip from "../../components/Vip/Add";

function Vip() {
  const sections = [
    { label: "History", key: "History" },
    { label: "VIP Profiles", key: "VIP Profile" },
    { label: "New VIP", key: "New VIP" },
  ];

  const [viewTab, setViewTab] = useState("History");

  const handleChange = (key) => {
    setViewTab(key);
  };

  const getButtonClass = (tab) =>
    viewTab === tab
      ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      : "bg-slate-200 text-black px-4 py-2 rounded hover:bg-slate-300";

  const renderContent = () => {
    switch (viewTab) {
      case "History":
        return <History />;
      case "VIP Profile":
        return <VipProfile />;
      case "New VIP":
        return <NewVip />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 w-full bg-gray-100 min-h-screen">
      {/* Tab Buttons */}
      <div className="w-full flex flex-wrap gap-2 mb-4">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => handleChange(section.key)}
            className={getButtonClass(section.key)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}

export default Vip;
