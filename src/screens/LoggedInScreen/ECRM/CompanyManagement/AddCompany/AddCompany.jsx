import React, { useState } from "react";
import "./AddCompany.css";
import { Icons } from "../../../../../Icons/Icons";
import { createCompanyManagement } from "../../../../../services/api/companyManagement/repository";
import { uploadFile } from "../../../../../services/api/upload/repository";
import { toast } from "react-toastify";
import axios from 'axios';
const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry'
];

const AddCompany = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [cities, setCities] = useState([]);
  const [contactType, setContactType] = useState("Others");
  const [formData, setFormData] = useState({
    contactType: "Others"
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sections = [
    {
      id: "systemAdmin",
      title: "System Administration",
      content: [
        { label: "Created by", type: "text", name: "createdBy", },
        { label: "Verified by", type: "text", name: "verifiedBy", },
        { label: "Approved by", type: "text", name: "approvedBy", },
        {
          label: "Credit Limit Proposed",
          type: "number",
          name: "creditLimitProposed",
          required: true
        },
        {
          label: "Credit Limit Approved",
          type: "number",
          name: "creditLimitApproved",
          required: true
        },
        {
          label: "Focused Product",
          type: "select",
          name: "focusedProduct",
          options: ["Product 1", "Product 2"]
        },
        {
          label: "Credit Days Proposed",
          type: "number",
          name: "CreditDaysProposed",

          required: true
        },
        {
          label: "Credit Days Approved",
          type: "number",
          name: "creditDaysApproved",

          required: true
        },

      ],
    },
    {
      id: "CompanyDetails",
      title: "Company Details",
      content: [
        { label: "Company Name", type: "text", name: "CompanyName", required: true },
        {
          label: "Category",
          type: "select",
          name: "Category",
          options: ["Category 1", "Category 2"],
          required: true
        },
        {
          label: "Sub Category",
          type: "select",
          name: "SubCategory",
          options: ["SubCategory 1", "SubCategory 2"],
          required: true
        },
        { label: "GSTIN Category", type: "text", name: "GSTINCategory", required: true },
        { label: "GSTIN", type: "text", name: "GSTIN", required: true },
        { label: "Pincode", type: "number", name: "PinCode" },
        { label: "Address", type: "textArea", name: "Address" },
        { label: "Area", type: "text", name: "area" },

        {
          label: "State",
          type: "select",
          name: "state",
          options: [
            { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
            { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
            { value: 'Assam', label: 'Assam' },
            { value: 'Bihar', label: 'Bihar' },
            { value: 'Chhattisgarh', label: 'Chhattisgarh' },
            { value: 'Goa', label: 'Goa' },
            { value: 'Gujarat', label: 'Gujarat' },
            { value: 'Haryana', label: 'Haryana' },
            { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
            { value: 'Jharkhand', label: 'Jharkhand' },
            { value: 'Karnataka', label: 'Karnataka' },
            { value: 'Kerala', label: 'Kerala' },
            { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
            { value: 'Maharashtra', label: 'Maharashtra' },
            { value: 'Manipur', label: 'Manipur' },
            { value: 'Meghalaya', label: 'Meghalaya' },
            { value: 'Mizoram', label: 'Mizoram' },
            { value: 'Nagaland', label: 'Nagaland' },
            { value: 'Odisha', label: 'Odisha' },
            { value: 'Punjab', label: 'Punjab' },
            { value: 'Rajasthan', label: 'Rajasthan' },
            { value: 'Sikkim', label: 'Sikkim' },
            { value: 'Tamil Nadu', label: 'Tamil Nadu' },
            { value: 'Telangana', label: 'Telangana' },
            { value: 'Tripura', label: 'Tripura' },
            { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
            { value: 'Uttarakhand', label: 'Uttarakhand' },
            { value: 'West Bengal', label: 'West Bengal' },
            // Union Territories
            { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
            { value: 'Chandigarh', label: 'Chandigarh' },
            { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
            { value: 'Delhi', label: 'Delhi' },
            { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
            { value: 'Ladakh', label: 'Ladakh' },
            { value: 'Lakshadweep', label: 'Lakshadweep' },
            { value: 'Puducherry', label: 'Puducherry' }
          ]
        },
        { label: "City", type: "select", name: "City" },
      ],
    },
    {
      id: "contactInfo",
      title: "Contact Information",
      content: [
        { label: "Contact Type", type: "select", name: "contactType", options: ["Others", "Director"], colSpan: 1 },
        { label: "Name", type: "text", name: "contactName", prefix: "Mr.", colSpan: 1, required: true },
        { label: "Phone", type: "text", name: "contactPhone", colSpan: 1 },

        // if Other selected
        ...(contactType === "Others"
          ? [
            { label: "Department", type: "select", name: "department", options: ["HR", "Sales", "IT"], colSpan: 1 },
            { label: "Position", type: "select", name: "position", options: ["Manager", "Executive", "Staff"], colSpan: 1 },
            { label: "Email", type: "text", name: "contactEmail", button: "Verify", colSpan: 1 },
            { label: "State", type: "select", name: "contactState", options: states, colSpan: 1 },
            { label: "City", type: "select", name: "contactCity", colSpan: 1 },
          ]
          : []),

        // if Director selected
        ...(contactType === "Director"
          ? [
            { label: "Email", type: "text", name: "directorEmail" },
            { label: "State", type: "select", name: "directorState", options: states, colSpan: 1 },
            { label: "City", type: "select", name: "directorCity", colSpan: 1 },
            { label: "Address", type: "textArea", name: "directorAddress" },
            { label: "Director Photo", type: "file", name: "directorPhoto" },
          ]
          : []),
      ]
    },

    {
      id: "shippingAddress",
      title: "Shipping Address",
      content: [
        { label: "Address", type: "textArea", name: "shippingAddress" },
        { label: "Pincode", type: "text", name: "shippingPincode" },
        {
          label: "State",
          type: "select",
          name: "shippingState",
          options: states
        },
        {
          label: "City",
          type: "select",
          name: "shippingCity"
        },
        {
          label: "Same as company address",
          type: "checkbox",
          name: "sameAsCompanyAddress"
        },
      ],
    },

    {
      id: "CompanyInformation",
      title: "Company Information",
      content: [
        { label: "Year Established", type: "text", name: "yearEstablished", colSpan: 3 },
        { label: "Company Logo (jpg, png)", type: "file", name: "companyLogo" },
        { label: "Turnover 2023-2024 (INR lakhs)", type: "text", name: "turnoverCurrent" },
        { label: "Turnover 2022-2023 (INR lakhs)", type: "text", name: "turnoverPrevious" },
        { label: "Sales Staff", type: "number", name: "salesStaff" },
        { label: "Design Staff", type: "number", name: "designStaff" },
        { label: "Installation Staff", type: "number", name: "installationStaff" },
        { label: "Service Staff", type: "number", name: "serviceStaff" },
        { label: "Office Area (sq ft)", type: "number", name: "officeArea" },
        { label: "Office Ownership", type: "select", name: "officeOwnership", options: ["Owned", "Rented"] },
        { label: "Warehouse Area (sq ft)", type: "number", name: "warehouseArea" },
        { label: "Interior Office Image (jpeg, png, jpg)", type: "file", name: "interiorImage" },
        { label: "Exterior Office Image (jpeg, png, jpg)", type: "file", name: "exteriorImage" },
      ],
    },

    {
      id: "bankDetails",
      title: "Bank Details",
      content: [
        { label: "Bank Name", type: "text", name: "bankName" },
        { label: "Account Holder Name", type: "text", name: "accountHolderName" },
        { label: "Account Number", type: "text", name: "accountNumber" },
        { label: "IFSC Code", type: "text", name: "ifscCode" },
        { label: "UPI ID", type: "text", name: "upiId" },
        { label: "GPay/Paytm/Phonepay Number", type: "text", name: "digitalPaymentNumber" },
      ],
    },
  ];

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const fetchCities = async (stateName) => {
    try {
      setIsLoadingCities(true);
      // First get auth token
      const authResponse = await fetch(
        'https://www.universal-tutorial.com/api/getaccesstoken', {
        headers: {
          "Accept": "application/json",
          "api-token": "jlHV4kzdnd_LhoKfOKiVbcKc4lEaDXBhwHQmbfkF7ld8Z3mbapYsZjBktdOy_UCwohQ",
          "user-email": "tpsvipulpatna9798@gmail.com"
        }
      });
      const authData = await authResponse.json();
      const token = authData.auth_token;

      // Then get cities
      const response = await fetch(
        `https://www.universal-tutorial.com/api/cities/${stateName}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const cityData = await response.json();

      // Transform data for select options
      const cityOptions = cityData.map(city => ({
        value: city.city_name,
        label: city.city_name
      }));

      setCities(cityOptions);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const handleStateChange = (state) => {

    if (state) {
      fetchCities(state);
    } else {
      setCities([]);
    }
  };

  const validateField = (field, value) => {
    if (!value && field.required) {
      return `${field.label} is required`;
    }


    return '';
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Find the field configuration
    const field = sections.flatMap(section => section.content).find(item => item.name === name);
    if (field.type === "file") {
      handleFileUpload(value, name);
    }

    if (field) {
      const error = validateField(field, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleFileUpload = async (event, fieldName) => {
    const file = event; // Get the first selected file

    if (file) {
      // Check if the file type is an image
      if (!file.type.startsWith("image/")) {
        console.error("Only image files are allowed");
        setFormErrors((prev) => ({
          ...prev,
          [fieldName]: "Only image files are allowed.",
        }));
        return;
      }

      try {
        // Call the upload API to upload the file
        const uploadedFile = await uploadFile(file); // Upload logic using repository

        console.log(`File uploaded successfully for ${fieldName}:`, uploadedFile);

        // Update the form data with both file ID and file details
        setFormData((prev) => ({
          ...prev,
          [fieldName]: {
            id: uploadedFile[0]?.id || null, // Ensure the correct ID is stored
            name: file.name, // Store the original file name
            file: file, // Store the file object for UI display
          },
        }));

        console.log("Updated formData:", formData);

        // Clear any previous errors for this field
        setFormErrors((prev) => ({
          ...prev,
          [fieldName]: null,
        }));
      } catch (error) {
        console.error(`File upload failed for ${fieldName}:`, error);
        setFormErrors((prev) => ({
          ...prev,
          [fieldName]: "File upload failed. Please try again.",
        }));
      }
    } else {
      console.warn(`No file selected for ${fieldName}`);
    }
  };


  const validateForm = () => {
    const errors = {};
    // Validate all fields from all sections
    sections.forEach(section => {
      section.content.forEach(field => {
        const value = formData[field.name];
        const error = validateField(field, value);
        if (error) {
          errors[field.name] = error;
        }
      });
    });
    setFormErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };



  const renderContent = (content) => {
    return (
      <div className="content-grid">
        {content.map((item, index) => {
          const commonErrorDisplay = formErrors[item.name] && (
            <span className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {formErrors[item.name]}
            </span>
          );

          if (item.type === "text") {
            return (
              <div key={index} className={`input-group ${item.colSpan ? `col-span-${item.colSpan}` : ''}`}>
                <label>
                  {item.label}
                  {item.required && <span className="required-indicator">*</span>}
                </label>
                <input
                  type="text"
                  name={item.name}
                  className={`input-field ${formErrors[item.name] ? 'error' : ''}`}
                  value={formData[item.name] || ''}
                  onChange={(e) => handleInputChange(item.name, e.target.value)}
                />
                {commonErrorDisplay}
              </div>
            );
          } else if (item.type === "number") {
            return (
              <div key={index} className={`input-group ${item.colSpan ? `col-span-${item.colSpan}` : ''}`}>
                <label>
                  {item.label}
                  {item.required && <span className="required-indicator">*</span>}
                </label>

                {item.name === "PinCode" ? (
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      name={item.name}
                      className={`input-field no-spinners ${formErrors[item.name] ? 'error' : ''}`}
                      value={formData[item.name] || ''}
                      onChange={(e) => handleInputChange(item.name, e.target.value)}
                      maxLength="6"
                    /> <span className="get-area-button" onClick={() => getPincodeDetails()}>Get Area</span>
                  </div>
                ) : (
                  <input
                    type="number"
                    name={item.name}
                    className={`input-field number-input ${formErrors[item.name] ? 'error' : ''}`}
                    value={formData[item.name] || ''}
                    onChange={(e) => handleInputChange(item.name, e.target.value)}
                  />
                )}
                {commonErrorDisplay}
              </div>
            );
          } else if (item.type === "textArea") {
            return (
              <div key={index} className="full-row">
                <label>
                  {item.label}
                  {item.required && <span className="required-indicator">*</span>}
                </label>
                <textarea
                  name={item.name}
                  className={`textarea-field ${formErrors[item.name] ? 'error' : ''}`}
                  value={formData[item.name] || ''}
                  onChange={(e) => handleInputChange(item.name, e.target.value)}
                ></textarea>
                {commonErrorDisplay}
              </div>
            );
          } else if (item.type === "select") {
            const isStateField = item.name.toLowerCase().includes('state');
            const isCityField = item.name.toLowerCase().includes('city');
            const options = isCityField ? cities : (item.options || []);
            const filteredOptions = options.filter(opt => {
              if (!isStateField && !isCityField) return true;
              const optionValue = typeof opt === 'object' ? opt.label : opt;
              return optionValue.toLowerCase().includes(searchText.toLowerCase());
            });

            if (item.name === "contactType" && !formData[item.name]) {
              handleInputChange(item.name, "Others");
            }

            return (
              <div key={index} className={`input-group ${item.colSpan ? `col-span-${item.colSpan}` : ''}`}>
                <label>
                  {item.label}
                  {item.required && <span className="required-indicator">*</span>}
                </label>
                <div className="add-company-select-wrapper">
                  <div
                    className="add-company-selected-value"
                    onClick={() => {
                      setIsDropdownOpen(activeDropdown !== item.name);
                      setActiveDropdown(activeDropdown !== item.name ? item.name : '');
                      setSearchText('');
                    }}
                  >
                    {formData[item.name] || ''}
                  </div>

                  {activeDropdown === item.name && (
                    <div className="add-company-dropdown-list">
                      {(isStateField || isCityField) && (
                        <input
                          type="text"
                          className="add-company-search-input"
                          placeholder={`Search ${item.label}...`}
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}

                      {isCityField && isLoadingCities ? (
                        <div className="add-company-dropdown-item">Loading cities...</div>
                      ) : (
                        filteredOptions.map((option, idx) => {
                          const value = typeof option === 'object' ? option.value : option;
                          const label = typeof option === 'object' ? option.label : option;
                          return (
                            <div
                              key={idx}
                              className="add-company-dropdown-item"
                              onClick={() => {
                                handleInputChange(item.name, value);
                                if (isStateField) {
                                  handleStateChange(value);
                                }
                                if (item.name === "contactType") {
                                  setContactType(value === "Director" ? "Director" : "Others");
                                }
                                setIsDropdownOpen(false);
                                setActiveDropdown('');
                                setSearchText('');
                              }}
                            >
                              {label}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
                {commonErrorDisplay}
              </div>
            );
          } else if (item.type === "file") {
            return (
              <div key={index} className={`input-group ${item.colSpan ? `col-span-${item.colSpan}` : ''}`}>
                <label>
                  {item.label}
                  {item.required && <span className="required-indicator">*</span>}
                </label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    name={item.name}
                    id={`file-${index}`}
                    style={{ display: 'none' }}
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      handleInputChange(item.name, e.target.files[0]);
                    }}
                  />
                  <label htmlFor={`file-${index}`} className={`custom-file-upload ${formErrors[item.name] ? 'error' : ''}`}>
                    Choose file
                  </label>
                  <span className="file-name">
                    {formData[item.name]?.name || "No file chosen"}
                  </span>
                </div>
                {formErrors[item.name] && (
                  <span className="error-message">
                    {formErrors[item.name]}
                  </span>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };


  const addCompany = async () => {
    const isValid = validateForm();
    if (isValid) {
      console.log(formData);
      const json = {
        "data": {
          "verfiedBy": formData.verifiedBy || "",
          "approvedBy": formData.approvedBy || "",
          "createdByWhom": formData.createdBy || "",
          "createdLimitProposed": formData.creditLimitProposed || "",
          "creditLimitApproved": formData.creditLimitApproved || "",
          "focusedProduct": formData.focusedProduct || "",
          "creditDaysProposed": formData.CreditDaysProposed || "",
          "creditDaysApproved": formData.creditDaysApproved || "",

          // Updated Company Details fields
          "companyDetailsCompanyName": formData.CompanyName || "",
          "companyDetailsCategory": formData.Category || "",
          "companyDetailsSubCategory": formData.SubCategory || "",
          "companyDetailsGSTINCategory": formData.GSTINCategory || "",
          "companyDetailsGSTIN": formData.GSTIN || "",
          "companyDetailsAddress": formData.Address || "",
          "companyDetailsPincode": formData.PinCode || "",
          "companyDetailsState": formData.state || "",
          "companyDetailsCity": formData.City || "",
          "companyDetailsArea": formData.area || "",

          // Updated Contact Information fields
          "contactInformationContactType": formData.contactType || "",
          "contactInformationName": formData.contactName || "",
          "contactInformationPhone": formData.contactPhone || "",
          "contactInformationDepartment": formData.department || "",
          "contactInformationPosition": formData.position || "",
          "contactInformationEmail": formData.contactEmail || formData.directorEmail || "",
          "contactInformationState": formData.contactState || formData.directorState || "",
          "contactInformationCity": formData.contactCity || formData.directorCity || "",

          // Shipping Address fields
          "shippingAddress": formData.shippingAddress || "",
          "shippingPincode": formData.shippingPincode || "",
          "shippingAddressState": formData.shippingState || "",
          "shippingAddressCity": formData.shippingCity || "",

          // Company Information fields
          "companyInformationYearEstablished": formData.yearEstablished || "",
          "companyInformationCompanyLogo": formData.companyLogo.id || [],
          "companyInformationTurnoverPreviousYear": formData.turnoverPrevious || "",
          "companyInformationTurnoverCurrentYear": formData.turnoverCurrent || "",
          "companyInformationSalesStaff": formData.salesStaff || "",
          "companyInformationDesignStaff": formData.designStaff || "",
          "companyInformationInstallationStaff": formData.installationStaff || "",
          "companyInformationServiceStaff": formData.serviceStaff || "",
          "companyInformationOfficeArea": formData.officeArea || "",
          "companyInformationOfficeOwnership": formData.officeOwnership || "",
          "companyInformationWarehouseArea": formData.warehouseArea || "",
          "companyInformationInteriorOfficeImage": formData.interiorImage.id || [],
          "companyInformationExteriorOfficeImage": formData.exteriorImage.id || [],

          // Bank Details
          "bankName": formData.bankName || "",
          "accountHolderName": formData.accountHolderName || "",
          "accountNumber": formData.accountNumber || "",
          "IFSC_Code": formData.ifscCode || "",
          "UPI_ID": formData.upiId || "",
          "paymentNumber": formData.digitalPaymentNumber || "",

        }
      };

      try {
        const response = await createCompanyManagement(json);
        console.log('Company created:', response);
        toast.success("Company created successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error('Error creating company:', error);
        toast.error("Error creating company!");
      }
    } else {
      const fieldsWithErrors = Object.keys(formErrors);
      if (fieldsWithErrors.length > 0) {
        const sectionWithError = sections.find(section =>
          section.content.some(field => fieldsWithErrors.includes(field.name))
        );
        if (sectionWithError) {
          setActiveSection(sectionWithError.id);
        }
      }
    }
  };

  const getPincodeDetails = async () => {
    const pincode = formData.PinCode;
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

      if (response.data[0].Status === "Success") {
        const postOffice = response.data[0].PostOffice[0];

        // Update form data with location details
        setFormData(prev => ({
          ...prev,
          area: postOffice.Name,
          City: postOffice.Block,
          state: postOffice.State
        }));

        handleStateChange(postOffice.State);
      } else {
        toast.error("Invalid Pincode");
      }
    } catch (error) {
      console.error("Error fetching pincode details:", error);
      toast.error("Error fetching location details");
    }
  };

  return (
    <div style={{ paddingRight: 5 }}>
      {sections.map((section) => (
        <div key={section.id}>
          <div
            className="accordion-header"
            onClick={() => toggleSection(section.id)}
          >
            {section.title}
            <img src={Icons.chevron_down} className="accordion-icon" />
          </div>
          {activeSection === section.id && (
            <div className="accordion-content">
              {renderContent(section.content)}
            </div>
          )}
        </div>
      ))}

      <div className="button-section">
        <button
          className="cancel-button"
          onClick={() => {/* Add your cancel logic here */ }}
        >
          Cancel
        </button>
        <button
          className="save-button"
          onClick={addCompany} // Trigger addCompany function on click
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default AddCompany;
