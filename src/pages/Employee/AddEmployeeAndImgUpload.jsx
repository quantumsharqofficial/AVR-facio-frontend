import React, { useState } from "react";
import AddEmployee from "../../components/Employee/AddEmployee";
import AddImg from "../../components/Employee/AddImg";
import ExtractEmpImage from "../../components/Employee/ExtractEmpImage";

function AddEmployeeAndImgUpload() {
  const [steper, setSteper] = useState(1);
  const [empID, setEmpID] = useState("");
  const [empName, setEmpName] = useState("");
  return (
    <div className="flex flex-col gap-4">
    
        <AddEmployee
          setSteper={setSteper}
          setEmpID={setEmpID}
          setEmpName={setEmpName}
        />
  
    </div>
  );
}

export default AddEmployeeAndImgUpload;
