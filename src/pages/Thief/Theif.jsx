import React, { useState } from "react";
import History from "../../components/Theif/History";
import ThiefProfile from "../../components/Theif/Profile";
import NewThief from "../../components/Theif/Add";

function Theft() {
  const sections = [
    { label: "History", key: "History" },
    { label: "Thief Profiles", key: "Thief Profile" },
    { label: "New Entry", key: "New Thief" },
  ];

  const [viewTab, setViewTab] = useState("History");

  const handleChange = (key) => {
    setViewTab(key);
  };

  const getButtonClass = (tab) =>
    viewTab === tab
      ? "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      : "bg-slate-200 text-black px-4 py-2 rounded hover:bg-slate-300";

  const renderContent = () => {
    switch (viewTab) {
      case "History":
        return <History />;
      case "Thief Profile":
        return <ThiefProfile />;
      case "New Thief":
        return <NewThief />;
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

export default Theft;
