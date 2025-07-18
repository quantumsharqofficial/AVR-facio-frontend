import React, { useState } from "react";
import AxiosInstance from "../../util/AxiosInstance";
import { message } from "antd";
import NavData from "../../components/NavDataComponent/NavData";
import { useNavigate } from "react-router-dom";

function CreateCompany() {
  const navigate = useNavigate();
  const navdata = [{ name: "Manage Companys" }, { name: "Create Company" }];
  const initialFormDataEmp = {
    c_vComName: "",
    c_vComPhone: "",
    c_tComAddress: "",
    c_tComLogo: null,
    c_tComContent: "",
    c_vComEmail: "",
    c_vPassword: "",
    c_vComOwner: "",
    c_vCheckInTime: "",
    c_vCheckOutTime: "",
  };

  const [formDataEmp, setFormDataEmp] = useState(initialFormDataEmp);

  const empHandleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      if (!formDataEmp.c_vComName.trim()) {
        message.error("Please enter company name before selecting a file.");
        return;
      }

      const file = files[0]; // Get the first selected file
      const fileExtension = file.name.split(".").pop();
      const today = new Date();
      const datePart = today.toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD
      const timePart =
        today.getHours().toString().padStart(2, "0") +
        today.getMinutes().toString().padStart(2, "0"); // HHMM
      const timestamp = `${datePart}${timePart}`;
      const newFileName = `${formDataEmp.c_vComName}_${timestamp}.${fileExtension}`;
      const renamedFile = new File([file], newFileName, { type: file.type });

      setFormDataEmp((prev) => ({
        ...prev,
        [name]: renamedFile, // Store the renamed file object
      }));
    } else {
      setFormDataEmp((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission with FormData
  const empHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isFormValid = Object.values(formDataEmp).every((value) => value);

      if (!isFormValid) {
        return message.error("Please fill all the fields");
      }

      const formData = new FormData();
      Object.keys(formDataEmp).forEach((key) => {
        if (formDataEmp[key]) {
          if (key === "c_tComLogo") {
            formData.append("image", formDataEmp[key]);
          } else {
            formData.append(key, formDataEmp[key]);
          }
        }
      });
      const response = await AxiosInstance.post(
        "/company/add-company",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      message.success("Company created successfully");
      navigate(-1);
      // setFormDataEmp(initialFormDataEmp);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Error creating company");
    }
  };

  const employeeCreateInputFields = [
    { label: "Company Name", name: "c_vComName", type: "text" },
    { label: "Phone Number * ", name: "c_vComPhone", type: "tel" },
    { label: "Address", name: "c_tComAddress", type: "text" },
    { label: "Company Logo * ", name: "c_tComLogo", type: "file" },
    { label: "Company Description", name: "c_tComContent", type: "text" },
    { label: "Email * ", name: "c_vComEmail", type: "email" },
    { label: "Password *", name: "c_vPassword", type: "password" },
    { label: "Owner Name * ", name: "c_vComOwner", type: "text" },
    { label: "Check-in Time", name: "c_vCheckInTime", type: "time" },
    { label: "Check-out Time", name: "c_vCheckOutTime", type: "time" },
  ];

  return (
    <div className="bg-gray-100 ">
          <NavData navdata={navdata}  />
        <div className="p-6 min-h-screen flex flex-col items-center">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Create Company
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employeeCreateInputFields.map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-gray-600 font-medium mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={type === "file" ? undefined : formDataEmp[name]}
                    onChange={empHandleChange}
                    placeholder={`Enter ${label}`}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                    accept={type === "file" ? "image/*" : undefined}
                  />
                </div>
              ))}
            </form>

            <button
              onClick={empHandleSubmit}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>  
      </div>  

    // <div className="p-5 w-full">
    //   {/* <MasterBanner
    //     navdata={[{ name: "Dashboard" }, { name: "Create Company" }]}
    //   /> */}
    //   <NavData navdata={navdata} />
    //   <div className="">
    //     <h2 className="text-2xl font-bold mb-4">Create Company</h2>
    //     <form className="w-full flex flex-wrap items-center gap-4 p-5">
    //       {employeeCreateInputFields.map(({ label, name, type }) => (
    //         <div key={name} className="flex flex-col w-96">
    //           <label className="block mb-1">{label}</label>
    //           <input
    //             type={type}
    //             name={name}
    //             value={type === "file" ? undefined : formDataEmp[name]} // Avoid controlled input warning for file
    //             onChange={empHandleChange}
    //             placeholder={`Enter ${label}`}
    //             className="w-full p-2 border-2 rounded-md"
    //             accept={type === "file" ? "image/*" : undefined} // Restrict file type to images
    //           />
    //         </div>
    //       ))}
    //     </form>
    //     <button
    //       onClick={empHandleSubmit}
    //       className="bg-[--dark-blue] text-white text-lg px-10 py-2 rounded hover:bg-[--light-gray] transition-colors"
    //     >
    //       Next
    //     </button>
    //   </div>
    // </div>
  );
}

export default CreateCompany;
