import React from "react";
import navIcon from "../../assets/nav_icon.svg";
import { useNavigate } from "react-router-dom";
function  NavData({ navdata }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row flex-nowrap gap-3">
      {navdata?.map((item, index) => (
        <div key={index} className="h-full flex items-center">
          <button
            onClick={() => index === 0 && navigate(-++index)}
            disabled={navdata.length === 1}
            className={`flex h-full flex-row items-center flex-nowrap justify-start gap-1 ${
              index === navdata.length - 1
                ? "text-[--light-blue]"
                : "text-[--light-gray]"
            } text-lg`}
          >
            {item.name}
            <span className="h-3 w-3 flex items-end">
              <img src={navIcon} className="w-2 h-2" alt="navIcon" />
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default NavData;
