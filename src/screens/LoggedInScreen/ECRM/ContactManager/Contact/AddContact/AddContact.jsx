import React, { useState, useEffect } from 'react';
import './AddContact.css'; // Add CSS file for styling
import { fetchCitiesBasedOnState } from '../../../../../../utils/cityService';
import { fetchCompanyManagements } from '../../../../../../services/api/companyManagement/repository';
import { allDepartmentJson } from '../../../../../../utils/allDepartmentJson';
import { designationListJson } from '../../../../../../utils/designationListJson';
import { states } from '../../../../../../utils/states';
const AddContact = () => {
  
    const [designationList] = useState(designationListJson);

    const [companyList, setCompanyList] = useState([]);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [cities, setCities] = useState([]);
    const [departmentList] = useState(allDepartmentJson);
    const [formData, setFormData] = useState({
        company: '',
        department: '',
        designation: '',
        fullName: '',
        dob: '',
        doa: '',
        email: '',
        alternateEmail: '',
        photo: '',
        phoneNumber: '',
        mobile1: '',
        mobile2: '',
        pincode: '',
        state: '',
        city: '',
        region: '',
        status: '',
        coach: '',
    });

    const [errors, setErrors] = useState({
        company: '',
        department: '',
        designation: '',
        fullName: '',
        region: '',
        status: '',
    });


    const fetchCities = async (stateName) => {
        try {
            setIsLoadingCities(true);
            const cityOptions = await fetchCitiesBasedOnState(stateName); // Call the service function
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

    const validateField = (name, value) => {
        let errorMessage = '';
        if (value.trim() === '') {
            errorMessage = `${name} is required`;
        } else if (name === 'fullName' && !/^[a-zA-Z\s]*$/.test(value)) {
            errorMessage = 'Full Name must contain only letters';
        }
        return errorMessage;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "state") {
            handleStateChange(value);
        }
        // Validate field on input change
        const errorMessage = validateField(name, value);
        setErrors({ ...errors, [name]: errorMessage });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check all fields for errors
        const newErrors = {};
        let hasError = false;

        Object.keys(formData).forEach((key) => {
            const errorMessage = validateField(key, formData[key]);
            newErrors[key] = errorMessage;
            if (errorMessage) hasError = true;
        });

        setErrors(newErrors);

        if (!hasError) {
            console.log('Form Data Submitted:', formData);
            alert('Form submitted successfully!');
        }
    };

    const getCompanyList = async () => {
        const companyList = await fetchCompanyManagements();
        if (companyList) {
            setCompanyList(companyList.data);
        }
    }

    useEffect(() => {
        getCompanyList();
    }, []);

    return (
        <div className="">
            <form className="add-contact-form" onSubmit={handleSubmit}>
                {/* Contact Details */}
                <div className="contact-details-container">
                    <h2 className="commonHeaderDashboard">Contact Details</h2>
                    <div className="contact-page-form-container">
                        <div className="form-label-and-inputfield">
                            <label> Company * </label>
                            <select
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select Company</option>
                                {companyList?.map((company) => (
                                    <option key={company.documentId} value={company.documentId}>{company.companyDetailsCompanyName}</option>
                                ))}
                            </select>
                            {errors.company && (
                                <span className="error-message">{errors.company}</span>
                            )}
                        </div>
                        <div className="form-label-and-inputfield">
                            <label>Department * </label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select Department</option>
                                {/* Add options here */}
                                {departmentList?.map((department) => (
                                    <option key={department.id} value={department.id}>{department.name}</option>
                                ))}
                            </select>
                            {errors.department && (
                                <span className="error-message">{errors.department}</span>
                            )}
                        </div>
                        <div className="form-label-and-inputfield">
                            <label>Designation *</label>
                            <select
                                name="designation"
                                value={formData.designation}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select Designation</option>
                                {designationList?.map((designation) => (
                                    <option key={designation.id} value={designation.name}>{designation.name}</option>
                                ))}
                            </select>
                            {errors.designation && (
                                <span className="error-message">{errors.designation}</span>
                            )}
                        </div>
                    </div>

                    <div className="contact-page-form-container">
                        <div className="form-label-and-inputfield">
                            <label> Full Name *</label>
                            <div className="flex" style={{ gap: "10px" }}>
                                <input

                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="std-input-add-contact"
                                    placeholder="Mr."
                                />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="main-phone-input-add-contact"
                                />
                            </div>
                            {errors.fullName && (
                                <span className="error-message">{errors.fullName}</span>
                            )}
                        </div>
                        <div className="form-label-and-inputfield">
                            <label>DOB *</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-label-and-inputfield">
                            <label>DOA *</label>
                            <input
                                type="date"
                                name="doa"
                                value={formData.doa}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="contact-information-container">
                    <h2 className="commonHeaderDashboard">Contact Information</h2>
                    <div className="contact-page-form-container">
                        <div className="form-label-and-inputfield" style={{ position: "relative" }}>
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <span onClick={getPincodeDetails} className='cursor' style={{ position: "absolute", right: "10px", top: "38px", color: "var(--primary-color)" }}>Verify</span>
                        </div>
                        <div className="form-label-and-inputfield" style={{ position: "relative" }}>
                            <label>Alternate Email *</label>
                            <input
                                type="email"
                                name="alternateEmail"
                                value={formData.alternateEmail}
                                onChange={handleInputChange}
                            />
                            <span onClick={getPincodeDetails} className='cursor' style={{ position: "absolute", right: "10px", top: "38px", color: "var(--primary-color)" }}>Verify</span>
                        </div>
                    </div>
                    <div className="contact-page-form-container">
                        <div className="form-label-and-inputfield">
                            <label>Photo *</label>
                            <div className="file-input-wrapper" style={{ position: "relative", top: -2 }}>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    name="photo"
                                    accept=".jpg,.jpeg,.png"
                                    style={{
                                        display: "none", // Hide the input element
                                    }}
                                    onChange={(e) => {
                                        const file = e.target.files[0]; // Get the selected file
                                        setFormData({ ...formData, photo: file }); // Update formData with the file
                                    }}
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="custom-file-upload"
                                    style={{ position: "relative", top: 3, cursor: "pointer" }}
                                >
                                    Choose file
                                </label>
                                <span className="file-name-add-company" style={{ backgroundColor: "var(--white-color)", color: "var(--primary-color)" }}>
                                    {formData.photo?.name || "No file chosen"}
                                </span>
                            </div>
                        </div>


                        <div className="form-label-and-inputfield">
                            <label>Phone Number *</label>
                            <div className="phone-input-wrapper flex" style={{ gap: "10px" }}>
                                {/* STD Input */}
                                <input
                                    type="text"
                                    name="std"
                                    placeholder="STD"
                                    value={formData.std}
                                    onChange={handleInputChange}
                                    className="phone-input-field std-input-add-contact"
                                />

                                {/* Main Phone Number Input */}
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="phone-input-field main-phone-input-add-contact"
                                />

                                {/* Ext Input */}
                                <input
                                    type="text"
                                    name="ext"
                                    placeholder="ext"
                                    value={formData.ext}
                                    onChange={handleInputChange}
                                    className="phone-input-field ext-input-add-contact"
                                />
                            </div>
                        </div>



                    </div>
                    <div className="contact-page-form-container">
                        <div className="form-label-and-inputfield">
                            <label>Mobile 1 *</label>
                            <input
                                type="tel"
                                name="mobile1"
                                value={formData.mobile1}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-label-and-inputfield">
                            <label>Mobile 2</label>
                            <input
                                type="tel"
                                name="mobile2"
                                value={formData.mobile2}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="contact-page-form-container">
                        <div className="form-label-and-inputfield" style={{ position: "relative" }}>
                            <label>Pincode </label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                            />
                            <span onClick={getPincodeDetails} className='cursor' style={{ position: "absolute", right: "10px", top: "38px", color: "var(--primary-color)" }}>Get Area</span>
                        </div>
                        <div className="form-label-and-inputfield">
                            <label> State </label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select State</option>
                               
                                {states.map((state) => (
                                    <option key={state.value} value={state.value}>{state.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-label-and-inputfield">
                            <label>City </label>
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select City</option>
                              
                                {cities.map((city) => (
                                    <option key={city.value} value={city.value}>{city.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>


                {/* Contact Status */}
                <div className="contact-information-container">
                    <h2 className="commonHeaderDashboard">Contact Information</h2>
                    <div className="contact-page-form-container">
                        <div className="form-label-and-inputfield">
                            <label> Select Region ID *</label>
                            <select
                                name="region"
                                value={formData.region}
                                onChange={handleInputChange}
                                className={errors.region ? 'error-input' : ''}
                            >
                                <option value="">Select Region</option>
                                {/* Add options here */}
                                <option value="Region A">Region A</option>
                                <option value="Region B">Region B</option>
                            </select>
                            {errors.region && <span className="error-message">{errors.region}</span>}
                        </div>
                        <div className="form-label-and-inputfield">
                            <label>Status *</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className={errors.status ? 'error-input' : ''}
                            >
                                <option value="">Select Status</option>
                                {/* Add options here */}
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            {errors.status && <span className="error-message">{errors.status}</span>}
                        </div>
                        <div className="form-label-and-inputfield">
                            <label> Coach </label>
                            <input
                                type="text"
                                name="coach"
                                value={formData.coach}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="contact-page-form-container">
                        <div className="form-label-and-inputfield">
                            <label> User Behaviour </label>
                            <input
                                type="text"
                                name="userBehaviour"
                                value={formData.userBehaviour}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-actions-buttons-contact-page">
                    <div className="form-actions-buttons">
                        <button type="button" className="commonButtonCss"
                            style={{ backgroundColor: "var(--white-color)", color: "var(--primary-color)" }}>
                            Cancel
                        </button>
                    </div>
                    <div className="form-actions-buttons">
                        <button type="submit" className="commonButtonCss">
                            Create
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default AddContact;
