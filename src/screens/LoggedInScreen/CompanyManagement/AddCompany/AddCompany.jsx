import React, { useState } from "react";
import "./AddCompany.css";
import { Icons } from "../../../../Icons/Icons";

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
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [contactType, setContactType] = useState("Others");
  const [formData, setFormData] = useState({});
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
        { label: "Address", type: "textArea", name: "Address" },
        { label: "Pincode", type: "text", name: "PinCode" },
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
        { label: "Contact Type", type: "select", name: "contactType", options: ["Others", "Director"], colSpan: 1, },
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
    setSelectedState(state);
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
            const isStateField = item.name.toLowerCase().includes('state');
            const isCityField = item.name.toLowerCase().includes('city');
            const options = isCityField ? cities : (item.options || []);
            
            const filteredOptions = options.filter(opt => {
              if (!isStateField && !isCityField) return true; // Don't filter if not state/city
              const optionValue = typeof opt === 'object' ? opt.label : opt;
              return optionValue.toLowerCase().includes(searchText.toLowerCase());
            });

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
