import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavData from "../NavDataComponent/NavData";
import AxiosInstance from "../../util/AxiosInstance";
import Table from "./Table";
import EmployeeTable from "./EmployeeTable";
import EmployeeFaceTable from "./EmployeeFaceTable";

function CartTable() {
  const { card } = useParams();
  const navdata = [{ name: "Dash Board" }, { name: card }];
  const userInfo = JSON?.parse(sessionStorage.getItem("user"));
  const [data, setData] = useState([]); // ✅ Initialize state

  const currentDate = new Date(); // `Date` variable பெயரை மாற்றலாம்

  const today = currentDate.toISOString().split("T")[0];
  currentDate.setDate(currentDate.getDate() - 1);
  const yesterday = currentDate.toISOString().split("T")[0];
  useEffect(() => {
    const fetchAttendance = async () => {
      if (card !== "Today Present" && card !== "Yesterday absent") {
        setData([]);
        return;
      }
      const payload = {
        date: card === "Today Present" ? today : yesterday,
        eat_vComID: userInfo.c_vComId,
      };
      try {
        const response = await AxiosInstance.post(
          "/employee-attendance/get-attendance-by-date",
          payload
        );
        // Filter & Map Data in One Step
        const filteredData = response.data.response
          .filter((item) =>
            (item.eat_vDate === card) === "Today Present" ? today : yesterday
          )
          .map((item) => ({
            Employee_ID: item.eat_vEmpId,
            Name: item.eat_vName,
            Date: item.eat_vDate,
            Status: item.eat_vStatus,
            ...(item.eat_vStatus !== "Absent" && {
              Check_In: item.eat_vCheckIn,
              Check_Out: item.eat_vCheckOut,
            }),
          }));
        // Separate Present & Absent
        const presentData = filteredData.filter(
          (item) => item.Status !== "Absent"
        );
        const absentData = filteredData.filter(
          (item) => item.Status === "Absent"
        );

        // Set Data Based on Card Type
        setData(card === "Today Present" ? presentData : absentData);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    const fetchNotAttendance = async () => {
      try {
        const response = await AxiosInstance.get(
          `/employee-attendance/get-not-attendance/${userInfo.c_vComId}`
        );
        const data = response.data.response || [];
        const filteredData = data.map((item) => ({
          Profile: item.e_vProfileImg,
          Employee_ID: item.e_vEmpId,
          Name: item.e_vName,
          Gender: item.e_eGender,
          Phone: item.e_vPhone,
          Email: item.e_vEmail,
        }));
        setData(filteredData);
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching not attendance:", error.message);
      }
    };

    const fetchEmployeeFace = async () => {
      const payload = {
        ef_vComID: userInfo.c_vComId,
        ef_date: today,
      };
      try {
        const response = await AxiosInstance.post(
          `/face-alert/getdate-by-company`,
          payload
        );

        const data =
          card === "Leaves rarely"
            ? response.data.response.rarely
            : response.data.response.frequently || [];

        // console.log(data[0].out_count);
        // console.log(data);

        const filteredData = data.map((item) => ({
          Employee_ID: item.ef_vEmpId,
          Name: item.ef_vName,
          Leave_Count: item.out_count || 0,
          Profile: item.e_vProfileImg,
        }));
        setData(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    if (["Today Present", "Yesterday absent"].includes(card)) {
      fetchAttendance();
    } else if (card === "Non check In") {
      fetchNotAttendance();
    } else if (card === "Leaves rarely" || card === "Leaves frequently") {
      fetchEmployeeFace();
    } else {
      setData([]);
    }
  }, [card]); // Depend on `card`

  return (
    <div>
      <NavData navdata={navdata} />
      {/* <h2 className="text-xl font-semibold mb-4">Cart Table</h2> */}

      {card === "Non check In" ? (
        <EmployeeTable data={data} />
      ) : card === "Leaves rarely" || card === "Leaves frequently" ? (
        <>
          <EmployeeFaceTable data={data} />
          {/* <Table data={data} /> */}
        </>
      ) : (
        <Table data={data} />
      )}
    </div>
  );
}

export default CartTable;
