import React, { useState, useEffect } from "react";
import "./CompanyManagement.css"; // Import the CSS file
import CompanyManagementInfoOnCard from "./CompanyManagementInfoOnCard/CompanyManagementInfoOnCard";
import { Icons } from "../../../../Icons/Icons";
import CompanyManagementTable from "./CompanyManagementTable/CompanyManagementTable";
import AddCompany from "./AddCompany/AddCompany";
import StorageService from "../../../../utils/userToken";
import { fetchCompanyManagements } from "../../../../services/api/companyManagement/repository";


const CompanyManagement = () => {
  const [isContentHidden, setIsContentHidden] = useState(false);
  const [hasCheckedItems, setHasCheckedItems] = useState(false);
  const [companies, setCompanies] = useState([]);
  const handleAddCompanyClick = () => {
    setIsContentHidden(true); // Hide all content
  };
  // const companies = [
  //   {
  //     "createdBy": "Amardeep Subadar",
  //     "dateTime": "12-Jul-2024 15:08:40",
  //     "companyName": "Param Computer And Total Solution",
  //     "details": {
  //       "id": "HUPAV81458",
  //       "type": "AV Channel Partner",
  //       "location": "Raipur, Chattisgarh",
  //       "membership": "Hunter Club Joined"
  //     },
  //     "creditBalance": "₹0 ",
  //     "days": 0,
  //     "contacts": [
  //       "Shabi Abbas",
  //       "Bakhar Abbas Abid"
  //     ],
  //     "area": "Begumpet",
  //     "salesId": "Uma",
  //     "actions": {
  //       "ledger": true,
  //       "salesGraph": true,
  //       "kyc": true
  //     }
  //   },
  //   {
  //     "createdBy": "Sangeetha Velu",
  //     "dateTime": "12-Jul-2024 15:08:40",
  //     "companyName": "Param Computer And Total Solution",
  //     "details": {
  //       "id": "HUPAV81458",
  //       "type": "AV Channel Partner",
  //       "location": "Raipur, Chattisgarh",
  //       "membership": "Hunter Club Joined"
  //     },
  //     "creditBalance": "₹0 ",
  //     "days": 0,
  //     "contacts": [
  //       "Tamil Selvi A"
  //     ],
  //     "area": "Kalyananagar",
  //     "salesId": "Asha",
  //     "actions": {
  //       "ledger": true,
  //       "salesGraph": true,
  //       "kyc": true
  //     }
  //   },
  //   {
  //     "createdBy": "Sangeetha Velu",
  //     "dateTime": "12-Jul-2024 15:08:40",
  //     "companyName": "Param Computer And Total Solution",
  //     "details": {
  //       "id": "HUPAV81458",
  //       "type": "AV Channel Partner",
  //       "location": "Raipur, Chattisgarh",
  //       "membership": "Hunter Club Joined"
  //     },
  //     "creditBalance": "₹0",
  //     "days": 0,
  //     "contacts": [
  //       "Tamil Selvi A"
  //     ],
  //     "area": "Kalyananagar",
  //     "salesId": "Asha",
  //     "actions": {
  //       "ledger": true,
  //       "salesGraph": true,
  //       "kyc": true
  //     }
  //   }
  // ]

  useEffect(() => {
    StorageService.setToken("4f7cd770259628666f68c13851e12cc109869aebf79519262dabee73cb2c350c30897f1276e7803efe60825ad83951842a0904367bd43a6522086fe6ab6dec6faefb3bc7efbd7be57f4ed08a042acebbb07898466e45d953eed7e77780173e25efa0c6891f9632ce4d018612f2a8b36194750480e447b7defff9f04fc6aa75cf")
  }, []);

  useEffect(() => {
    fetchCompanyManagements().then((data) => {
      console.log(data);
      setCompanies(data.data);
    });
  }, []);
  return (
    <div className="company-management-main-section">
      {!isContentHidden && (
        <>
          <div className="flex">
            {/* Left Section */}
            <div className="company-info-section">
              <CompanyManagementInfoOnCard companies={companies} />
            </div>

            {/* Right Section */}
            <div className="company-management-buttons">
              <button
                className="company-management-button commonButtonCss"
                onClick={handleAddCompanyClick}
              >
                <span style={{ fontSize: 30, paddingRight: 5 }}>+</span> Add Company
              </button>

              <select
                name="fiscalYear"
                id="fiscalYearSelect"
                className="dropdown"
              >
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2021-2022">2021-2022</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="filter-section-main-div">
              <button className="company-management-button commonButtonCss" style={{ width: 130 }}>
                <span style={{ paddingRight: 5 }}>
                  <img src={Icons.filter_icon} alt="filter icon" />
                </span> Add Filter
              </button>
            </div>

            {hasCheckedItems && (
              <div className="filter-section-main-div">
                <button className="company-management-button commonButtonCss" style={{ width: 100, background: "var(--red-color)" }}>
                  <span style={{ paddingRight: 5 }}>
                    <img src={Icons.delete_icon} alt="filter icon" />
                  </span> Delete
                </button>
              </div>
            )}
          </div>

          <div className="company-management-tabler-data">
            <CompanyManagementTable
              companies={companies}
              onCheckChange={setHasCheckedItems}
            />
          </div>
        </>
      )}

      {isContentHidden && (
        <>
          <AddCompany />
        </>
      )}
    </div>
  );
}

export default CompanyManagement;
