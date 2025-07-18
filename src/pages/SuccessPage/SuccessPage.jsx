import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/employee")
        },1000)
    },[])
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Result
        status="success"
        title="Successfully Uploaded Images"
        subTitle="please wait for auto navigation takes 10-20 seconds, please wait."
      />
    </div>
  );
}

export default SuccessPage;
