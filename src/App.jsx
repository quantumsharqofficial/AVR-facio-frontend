import React from "react";
import Login from "./pages/login/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar/sidebar";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employee from "./pages/Employee/Employee";
import AddEmployeeAndImgUpload from "./pages/Employee/AddEmployeeAndImgUpload";
import AttendanceLog from "./pages/Attendance/AttendanceLog";
import CompanyRegister from "./pages/login/CompanyRegister";
import CreateCompany from "./pages/Company/CreateCompany";
import CompanyDashboard from "./pages/Company/CompanyDashboard";
import AddProduct from "./pages/AddProduct/AddProduct";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import EditEmployee from "./pages/Employee/EditEmployee";
import CompanyDetails from "./pages/Company/CompanyDetails";
import ExtractEmpImage from "./components/Employee/ExtractEmpImage";
import ManageEmployee from "./pages/Manage/ManageEmployee";
import CartTable from "./components/DashboadCard/CartTable";
import LateCome from "./pages/LateComers/LateCome";
import EmployeeDetails from "./components/Employee/EmployeeDetails";
import FaceAlert from "./pages/FaceAlert/FaceAlert";
import AddImg from "./components/Employee/AddImg";
import EmployeeFaceDetails from "./components/FaceAlert/EmployeeFaceDetails";
import EditCompany from "./components/Company/EditCompany";
import ForgetPassword from "./pages/login/ForgetPassword";
import FaceMaskDetection from "./pages/FaceMask/FaceMaskDetection";
import HeadCount from "./pages/HeadCount/HeadCount";
import HeadCountDetails from "./components/HeadCount/HeadCountDetails";
import EmployeeAndAttendance from "./pages/Employee/EmployeeAndAttendance";
import Inventroy from "./pages/Inventroy/Inventroy";
import HumanDetection from "./pages/HumanDetection/HumanDetection";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-screen ">
      {location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/forget-password" ? (
        ""
      ) : (
        <Navbar />
      )}
      <div
        className={`${
          location.pathname === "/" ||
          location.pathname === "/login" ||
          location.pathname === "/forget-password"
            ? "h-screen"
            : "flex flex-row h-[90vh] overflow-auto"
        }`}
      >
        {location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/forget-password" ? (
          ""
        ) : (
          <Sidebar />
        )}
        <div
          className={`${
            location.pathname === "/" ||
            location.pathname === "/login" ||
            location.pathname === "/forget-password" ||
            location.pathname === "/create-company-and-add-product" ||
            location.pathname === "/company-dashboard" ||
            location.pathname === "/manage-employees"
              ? "w-full p-0"
              : "w-full p-5 bg-[--bg-blue] overflow-auto"
          }`}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/register-master" element={<CompanyRegister />} />
            {/* admin */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee" element={<Employee />} />
            <Route
              path="/add-employee-and-img-upload"
              element={<AddEmployeeAndImgUpload />}
            />
            <Route path="/extract-employee/:id" element={<ExtractEmpImage />} />
            <Route path="/attendance-log" element={<AttendanceLog />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
            <Route path="/card-table/:card" element={<CartTable />} />
            <Route path="/late-comers" element={<LateCome />} />
            <Route path="/employee-details/:id" element={<EmployeeDetails />} />
            <Route path="/face-alert" element={<FaceAlert />} />
            <Route path="/add-img/:empID/:empName" element={<AddImg />} />
            <Route
              path="/employee-face/:id/:date"
              element={<EmployeeFaceDetails />}
            />
            <Route
              path="/face-mask-detection"
              element={<FaceMaskDetection />}
            />
            <Route path="/head-count" element={<HeadCount />} />

            <Route
              path="/head-count-details/:selectedDate/:selectedSection"
              element={<HeadCountDetails />}
            />

            <Route
              path="/employees-attendance"
              element={<EmployeeAndAttendance />}
            />

            <Route path="/human-detection" element={<HumanDetection />} />

            <Route path="/inventroy" element={<Inventroy />} />

            {/* master */}
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            <Route path="/create-company" element={<CreateCompany />} />
            <Route path="/add-product/:id" element={<AddProduct />} />
            <Route path="/company-Details/:id" element={<CompanyDetails />} />
            <Route path="/manage-companys" element={<ManageEmployee />} />
            <Route path="/edit-company/:id" element={<EditCompany />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
