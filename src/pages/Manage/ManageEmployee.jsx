import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Modal, Button, Card, Divider, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import MasterBanner from "../../components/MasterBanner/MasterBanner";
import AxiosInstance from "../../util/AxiosInstance";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useDispatch } from "react-redux";
import {
  setCustomerId,
  setCustomerName,
} from "../../redux/slices/ProductCustDetailsSlice";
import NavData from "../../components/NavDataComponent/NavData";
// import Title from "antd/es/skeleton/Title";
import { MdModeEdit } from "react-icons/md";

function ManageEmployee() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDltCompany, setSelectedDltCompany] = useState(null);
  const [companyData, setCompanyData] = useState([]);
  // const [detailsCollection, setDetailsCollection] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navdata = [{ name: "Manage Companys" }];

  const getCompanyData = async () => {
    try {
      const response = await AxiosInstance.get("company/get-all-companies");
      setCompanyData(response.data.response || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  const filteredCompanyData = companyData?.filter(
    (company) =>
      company.c_vComId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.c_vComName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.c_vComPhone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompanyDlt = async () => {
    try {
      await AxiosInstance.patch(`company/delete-company/${selectedDltCompany}`);
      getCompanyData();
      setBoxOpen(false);
      message.success("Company deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };
  // const navdata = [{ name: "Employee" }];

  const navigate=useNavigate();

  const handeleAction = (companyId) => {
    console.log(companyId);
    navigate(`/edit-company/${companyId}`);

  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <NavData navdata={navdata} />

      <div className="flex flex-col gap-4 p-4 pt-0 mt-4">
        <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 sm:gap-0">
          {/* Search Bar */}
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <div className="flex flex-row border border-gray-400 w-full sm:w-fit rounded-full px-3 py-2">
              <Icon
                icon="uil:search"
                className="text-2xl text-[--light-gray]"
              />
              <input
                type="text"
                placeholder="Search Customers by ID, Name, etc..."
                className="outline-none px-2 w-full sm:min-w-72 p-1 bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Add Customer Button */}
          <button
            onClick={() => Navigate(`/create-company`)}
            className="flex flex-row items-center justify-center hover:bg-[--light-blue] hover:border-transparent duration-200 ease-in-out hover:shadow-md hover:text-white group gap-2 border border-gray-400 w-full sm:w-fit rounded-full px-3 py-1 text-[--text-gray]"
          >
            Add Customer
            <Icon
              icon="uil:plus-circle"
              className="text-xl text-[--light-gray] group-hover:text-white duration-200 ease-in-out"
            />
          </button>
        </div>

        <div className="w-full rounded-lg overflow-auto h-full shadow-lg relative">
          <table className=" min-w-[900px] w-full text-center">
            <thead className="bg-[--dark-blue] text-white sticky top-0 z-10">
              <tr>
                <th className="py-2">S.No.</th>
                <th className="py-2">Name</th>
                <th className="py-2">Customer ID</th>
                <th className="py-2">Mobile No</th>
                <th className="py-2">Details</th>
                <th className="py-2">Add Facio</th>
                {/* <th className="py-2">Delete</th> */}
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {filteredCompanyData?.length == 0 ? (
                <tr>
                  <td colSpan="7" className="py-2 text-center">
                    <div className="w-full flex-col items-center justify-center flex">
                      <iframe src="https://lottie.host/embed/3a19b5d7-8301-4c4a-a860-643821b4a36b/jrZ4GLNxoF.lottie"></iframe>
                      <p className="text-[--text-gray] font-medium">
                        Data not found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCompanyData?.map((data, index) => (
                  <tr key={index} className="">
                    <td className="py-1">{index + 1}</td>
                    <td className="py-1 flex flex-col items-center gap-2">
                      <img
                        src={data.c_tComLogo}
                        alt="Company Logo "
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p>{data.c_vComName}</p>
                    </td>
                    <td className="py-1">{data.c_vComId}</td>
                    <td className="py-1">{data.c_vComPhone}</td>
                    <td className="py-1">
                      <div className="w-full flex justify-center">
                        <button
                          onClick={() => {
                            Navigate(`/company-Details/${data.c_vComId}`);
                          }}
                        >
                          <Icon icon="ant-design:eye-outlined" />
                        </button>
                      </div>
                    </td>
                    <td className="py-1">
                      <div className="w-full flex justify-center">
                        <button
                          onClick={() => {
                            dispatch(setCustomerId(data.c_vComId));
                            dispatch(setCustomerName(data.c_vComName));
                            Navigate(`/add-product/${data.c_vComId}`);
                          }}
                          className="bg-blue-500 p-2 rounded-lg text-white"
                        >
                          <Icon icon="mdi:cart" width={18} height={18} />
                        </button>
                      </div>
                    </td>
                    <td className="py-1">
                      <div className="w-full flex justify-center">
                        <button
                          onClick={() => handeleAction(data.c_vComId)}
                          className="bg-yellow-500 p-2 rounded-lg text-white"
                        >
                          <MdModeEdit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title="Warning!"
        open={boxOpen}
        onOk={() => handleCompanyDlt(selectedCompany?.c_vComId)}
        onCancel={() => setBoxOpen(false)}
        okText="Delete"
      >
        <p>Are you sure you want to delete this company?</p>
      </Modal>
    </div>
  );
}

export default ManageEmployee;
