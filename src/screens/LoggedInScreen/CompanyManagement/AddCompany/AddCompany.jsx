import React, { useState } from "react";
import "./AddCompany.css";
import { Icons } from "../../../../Icons/Icons";

const AddCompany = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [contactType, setContactType] = useState("Others");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const stateCityData = {
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    "West Bengal": ["Kolkata", "Howrah", "Darjeeling"],
    "Punjab": ["Amritsar", "Ludhiana", "Chandigarh"],
  };

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
        { label: "Address", type: "textArea", name: "Address" },
        { label: "Pincode", type: "text", name: "PinCode" },
        {
          label: "State",
          type: "select",
          name: "state",
          options: Object.keys(stateCityData)
        },
        { label: "City", type: "select", name: "City" },
      ],
    },
    {
      id: "contactInfo",
      title: "Contact Information",
      content: [
        { label: "Contact Type", type: "select", name: "contactType", options: ["Others", "Director"], colSpan: 1, },
        { label: "Name", type: "text", name: "contactName", prefix: "Mr.", colSpan: 1, required: true },
        { label: "Phone", type: "text", name: "contactPhone", colSpan: 1 },

        // if Other selected
        ...(contactType === "Others"
          ? [
            { label: "Department", type: "select", name: "department", options: ["HR", "Sales", "IT"], colSpan: 1 },
            { label: "Position", type: "select", name: "position", options: ["Manager", "Executive", "Staff"], colSpan: 1 },
            { label: "Email", type: "text", name: "contactEmail", button: "Verify", colSpan: 1 },
            { label: "State", type: "select", name: "contactState", options: ["State 1", "State 2"], colSpan: 1 },
            { label: "City", type: "select", name: "contactCity", options: selectedState ? stateCityData[selectedState] : [], colSpan: 1 },
          ]
          : []),

        // if Director selected
        ...(contactType === "Director"
          ? [
            { label: "Email", type: "text", name: "directorEmail" },
            { label: "State", type: "select", name: "directorState", options: Object.keys(stateCityData), colSpan: 1 },
            { label: "City", type: "select", name: "directorCity", options: selectedState ? stateCityData[selectedState] : [], colSpan: 1 },
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
          options: Object.keys(stateCityData)
        },
        {
          label: "City",
          type: "select",
          name: "shippingCity",
          options: cities
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

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCities(stateCityData[state] || []);
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
    if (field) {
      const error = validateField(field, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
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
                <input
                  type="number"
                  name={item.name}
                  className={`input-field ${formErrors[item.name] ? 'error' : ''}`}
                  value={formData[item.name] || ''}
                  onChange={(e) => handleInputChange(item.name, e.target.value)}
                />
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
            return (
              <div key={index} className={`input-group ${item.colSpan ? `col-span-${item.colSpan}` : ''}`}>
                <label>
                  {item.label}
                  {item.required && <span className="required-indicator">*</span>}
                </label>
                <select
                  name={item.name}
                  className={`select-field ${formErrors[item.name] ? 'error' : ''}`}
                  value={item.label === "Contact Type" ? contactType : (formData[item.name] || '')}
                  onChange={(e) => {
                    handleInputChange(item.name, e.target.value);
                    if (item.label === "Contact Type") {
                      setContactType(e.target.value);
                    } else if (item.label === "State") {
                      handleStateChange(e.target.value);
                    }
                  }}
                >
                  <option value="" style={{ display: "none" }}></option>
                  {item?.options?.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
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
                    onChange={(e) => handleInputChange(item.name, e.target.files[0])}
                  />
                  <label htmlFor={`file-${index}`} className={`custom-file-upload ${formErrors[item.name] ? 'error' : ''}`}>
                    Choose file
                  </label>
                  <span className="file-name">
                    {formData[item.name]?.name || "No file chosen"}
                  </span>
                </div>
                {commonErrorDisplay}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
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
          onClick={() => {
            const isValid = validateForm();
            if (isValid) {
              // Add your save logic here
              console.log('Form data:', formData);
            } else {
              // Optionally, open the sections with errors
              const fieldsWithErrors = Object.keys(formErrors);
              if (fieldsWithErrors.length > 0) {
                // Find the first section that has an error
                const sectionWithError = sections.find(section =>
                  section.content.some(field => fieldsWithErrors.includes(field.name))
                );
                if (sectionWithError) {
                  setActiveSection(sectionWithError.id);
                }
              }
            }
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default AddCompany;
