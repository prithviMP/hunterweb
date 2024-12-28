import React, { useState, useEffect, useRef } from "react";
import "./TempContacts.css";
import { states } from "../../../../../utils/states";
import { fetchCitiesBasedOnState } from "../../../../../utils/cityService";
import { fetchUsers } from "../../../../../services/api/user/repository";
import CommonButton from "../../../../../componant/Button/CommonButton";
import { fetchCompanyManagements } from "../../../../../services/api/companyManagement/repository";

const TempContacts = () => {

    const [contacts, setContacts] = useState([
        {
            id: 1,
            company: "ACME Inc.",
            email: "john@acme.in",
            phone: "+91 6264452164",
            address: "123 Main St, Anytown, Anytown",
            city: "Patna",
            state: "Bihar",
            user: "Vipul",
            userEmail: "css@hunterbharat.com"
        },
        {
            id: 2,
            company: "ACME Inc.",
            email: "john@acme.in",
            phone: "+91 6264452164",
            address: "123 Main St, Anytown, USA",
            city: "Banglore",
            state: "Karnataka",
            user: "Ravi",
            userEmail: "css@hunterbharat.com"
        },
        {
            id: 3,
            company: "ACME Inc.",
            email: "john@acme.in",
            phone: "+91 6264452164",
            address: "123 Main St, Anytown, USA",
            city: "Banglore",
            state: "Karnataka",
            user: "Ravi",
            userEmail: "css@hunterbharat.com"
        },
        {
            id: 4,
            company: "ACME Inc.",
            email: "john@acme.in",
            phone: "+91 6264452164",
            address: "123 Main St, Anytown, USA",
            city: "Banglore",
            state: "Karnataka",
            user: "Vipul",
            userEmail: "css@hunterbharat.com"
        },
        {
            id: 5,
            company: "ACME Inc.",
            email: "john@acme.in",
            phone: "+91 6264452164",
            address: "123 Main St, Anytown, USA",
            city: "Banglore",
            state: "Karnataka",
            user: "John Doe",
            userEmail: "css@hunterbharat.com"
        },
        {
            id: 6,
            company: "ACME Inc.",
            email: "john@acme.in",
            phone: "+91 6264452164",
            address: "123 Main St, Anytown, USA",
            city: "Banglore",
            state: "Karnataka",
            user: "John Doe",
            userEmail: "css@hunterbharat.com"
        }
    ]);

    const [originalContacts, setOriginalContacts] = useState(contacts); // Use state to hold original contacts

    useEffect(() => {
        setOriginalContacts(contacts); // Update originalContacts whenever contacts change
    }, []);

    const [showCreateTempContactPopup, setShowCreateTempContactPopup] = useState(false);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [cities, setCities] = useState([]);
    const [users, setUsers] = useState([]);

    // Fetch cities based on state
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

    // Filter by State
    const handleStateChange = (state) => {
        if (state !== "Filter by State") {
            setContacts(originalContacts.filter(c => c.state === state)); // Reset to original contacts before filtering
            fetchCities(state);
        } else {
            setContacts(originalContacts); // Reset to original contacts when "Filter by State" is cleared
        }
    };

    // Filter by City
    const handleCityChange = (city) => {
        if (city !== "Filter by City") {
            // Filter contacts based on the original contacts
            setContacts(originalContacts.filter(c => c.city === city));
        } else {
            setContacts(originalContacts); // Reset to original contacts when "Filter by City" is cleared
        }
    };

    // Fetch all users
    const fetchUsersAllUsers = async () => {
        const users = await fetchUsers();
        setUsers(users.data);
    };

    useEffect(() => {
        fetchUsersAllUsers();
    }, []);

    // Delete Contact   
    const handleDelete = (contact) => {
        setContacts(contacts.filter(c => c.id !== contact.id));
    };

    // Call Contact
    const handleCall = (contact) => {
        window.location.href = `tel:${contact.phone}`; // Initiates a call to the contact's phone number
    };

    // Move Contact
    const handleMove = (contact) => {
        console.log(contact);
    };

    // Edit Contact
    const handleEdit = (contact) => {
        setShowCreateTempContactPopup(true);
        setFormData({
            assignUser: contact.user,
            companyName: contact.company,
            contactName: contact.user,
            address: contact.address,
            email: contact.email,
            phoneNumber: contact.phone,
            state: contact.state,
            city: contact.city
        });
    };

    // Filter by User
    const handleUserChange = (user) => {
        console.log("Selected user:", user); // Debugging line
        if (user !== "Filter by User") {
            const filteredContacts = contacts.filter(c => c.user.toLowerCase() === user.toLowerCase());
            console.log("Filtered contacts:", filteredContacts); // Debugging line
            setContacts(filteredContacts);
        } else {
            setContacts(originalContacts); // Reset to original contacts when "Filter by User" is selected
        }
    };

    const [formData, setFormData] = useState({
        assignUser: '',
        companyName: '',
        contactName: '',
        address: '',
        email: '',
        phoneNumber: '',
        state: '',
        city: ''
    });



    // Create Temp Contact Popup
    const CreateTempContactPopup = ({ onClose, formData }) => {
        const [errors, setErrors] = useState({});
        const [popCities, setPopCities] = useState([]);
        const [isLoadingPopCities, setIsLoadingPopCities] = useState(false);

        const fetchPopCities = async (stateName) => {
            try {
                setIsLoadingPopCities(true);
                const cityOptions = await fetchCitiesBasedOnState(stateName); // Call the service function
                setPopCities(cityOptions);
            } catch (error) {
                console.error('Error fetching cities:', error);
            } finally {
                setIsLoadingPopCities(false);
            }
        };

        const handlePopStateChange = (state) => {

            if (state) {
                fetchPopCities(state);
            } else {
                setPopCities([]);
            }
        };

        const validateField = (name, value) => {
            switch (name) {
                case 'email':
                    return !value ? 'Email is required' :
                        !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : '';
                case 'phoneNumber':
                    return !value ? 'Phone number is required' :
                        !/^\d{10}$/.test(value) ? 'Phone number must be 10 digits' : '';
                case 'contactName':
                    return !value ? 'Contact name is required' : '';
                case 'assignUser':
                    return !value ? 'Please select a user' : '';
                case 'state':
                    return !value ? 'Please select a state' : '';
                case 'city':
                    return !value ? 'Please select a city' : '';
                case 'address':
                    return !value ? 'Address is required' : '';
                case 'companyName':
                    return !value ? 'Company name is required' : '';
                default:
                    return '';
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }

            if (name === 'state') {
                fetchPopCities(value);
            }
        };

        const handleSubmit = (e) => {

            e.preventDefault();
            e.stopPropagation();

            // Validate all fields
            const newErrors = {};
            Object.keys(formData).forEach(key => {
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            });

            setErrors(newErrors);

            // If no errors, submit the form
            if (Object.keys(newErrors).length === 0) {
                console.log('Form submitted:', formData);
                onClose();
            }
        };

        return (
            <div className="createTemporaryContactPopup box-shadow">
                <div className="createTemporaryContactPopup-header">
                    <h2 className="commonTextCss">Create Temporary Contact</h2>
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex" style={{ gap: 10 }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="assignUser" className="commonTextCss">Assign User</label>
                            <select name="assignUser" value={formData.assignUser} onChange={handleChange} style={{ width: "100%" }}>
                                <option>Select user</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.username}</option>
                                ))}
                            </select>
                            {errors.assignUser && <p className="error-message createTempContactPopup-error">{errors.assignUser}</p>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <label htmlFor="companyName" className="commonTextCss">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="commonInputCss"
                            />
                            {errors.companyName && <p className="error-message createTempContactPopup-error">{errors.companyName}</p>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <label htmlFor="contactName" className="commonTextCss">Contact Name</label>
                            <input
                                type="text"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                className="commonInputCss"
                            />
                            {errors.contactName && <p className="error-message createTempContactPopup-error">{errors.contactName}</p>}
                        </div>
                    </div>
                    <div className="flex" style={{ gap: 10 }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="address" className="commonTextCss">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="commonInputCss"
                            />
                            {errors.address && <p className="error-message createTempContactPopup-error">{errors.address}</p>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <label htmlFor="email" className="commonTextCss">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="commonInputCss"
                            />
                            {errors.email && <p className="error-message createTempContactPopup-error">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="flex" style={{ gap: 10 }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="phone" className="commonTextCss">Phone</label>
                            <div className="flex" style={{ gap: 10 }}>
                                <input
                                    style={{ width: 40 }}
                                    type="text"
                                    name="phone"
                                    placeholder="+91"
                                    onChange={handleChange}
                                    className="commonInputCss"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="commonInputCss"
                                />
                            </div>
                            {errors.phoneNumber && <p className="error-message createTempContactPopup-error">{errors.phoneNumber}</p>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <label htmlFor="state" className="commonTextCss">State</label>
                            <select name="state" value={formData.state} onChange={(e) => handlePopStateChange(e.target.value)} style={{ width: "100%" }}>
                                <option>Select state</option>
                                {states.map((state) => (
                                    <option key={state.value} value={state.value}>{state.label}</option>
                                ))}
                            </select>
                            {errors.state && <p className="error-message createTempContactPopup-error">{errors.state}</p>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <label htmlFor="city" className="commonTextCss">City</label>
                            <select name="city" value={formData.city} onChange={(e) => handlePopCityChange(e.target.value)} style={{ width: "100%" }}>
                                <option>Select city</option>
                                {popCities.map((city) => (
                                    <option key={city.value} value={city.value}>{city.label}</option>
                                ))}
                            </select>
                            {errors.city && <p className="error-message createTempContactPopup-error">{errors.city}</p>}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                        <CommonButton text="Create Temp Contact" style={{ width: 200, borderRadius: 30, padding: 10 }} />
                    </div>
                </form>
            </div>
        );
    };


    return (
        <div className="tempContacts-page-container">
            {/* Filters */}
            <div className="tempContacts-page-filters-container flex">
                <div className="tempContacts-page-filters">

                    <select onChange={(e) => handleStateChange(e.target.value)}>
                        <option>Filter by State</option>
                        {states.map((state) => (
                            <option key={state.value} value={state.value}>{state.label}</option>
                        ))}
                    </select>
                    <select onChange={(e) => handleCityChange(e.target.value)}>
                        <option>Filter by City</option>
                        {cities.map((city) => (
                            <option key={city.value} value={city.value}>{city.label}</option>
                        ))}
                    </select>

                    <select onChange={(e) => handleUserChange(e.target.value)}>
                        <option>Filter by User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.username}>{user.username}</option>
                        ))}
                    </select>

                </div>

                <div className="tempContacts-page-actions-buttons flex">
                    <button className="commonButtonCss" onClick={() => setShowCreateTempContactPopup(true)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.1429 6.85714H6.85714V11.1429C6.85714 11.6143 6.47143 12 6 12C5.52857 12 5.14286 11.6143 5.14286 11.1429V6.85714H0.857143C0.385714 6.85714 0 6.47143 0 6C0 5.52857 0.385714 5.14286 0.857143 5.14286H5.14286V0.857143C5.14286 0.385714 5.52857 0 6 0C6.47143 0 6.85714 0.385714 6.85714 0.857143V5.14286H11.1429C11.6143 5.14286 12 5.52857 12 6C12 6.47143 11.6143 6.85714 11.1429 6.85714Z" fill="white" />
                        </svg>

                        <span style={{ paddingLeft: 5 }}>Create Temporary Contact</span></button>

                    <button className="commonButtonDownload" style={{ width: 200 }}>
                        <span style={{ paddingRight: 5 }}>Download</span>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 7.38235V8.44118C1 8.72199 1.11155 8.99131 1.31012 9.18988C1.50869 9.38845 1.77801 9.5 2.05882 9.5H8.41177C8.69258 9.5 8.9619 9.38845 9.16047 9.18988C9.35903 8.99131 9.47059 8.72199 9.47059 8.44118V7.38235M2.58824 4.20588L5.23529 6.85294M5.23529 6.85294L7.88235 4.20588M5.23529 6.85294V0.5" stroke="#007BFF" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Contacts */}
            <div className="tempContacts-page-contacts">
                {contacts.map((contact, index) => (
                    <div key={index} className="tempContacts-page-contact-card box-shadow">
                        <h3 className="commonTextCss">{contact.company}</h3>
                        <p className="commonTextCss" style={{ marginTop: 0, color: "var(--secondary-color)", fontSize: 12 }}>{contact.email}</p>
                        <p className="commonTextCss" style={{ marginTop: 15, display: "flex", gap: 5 }}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.29977 1.53226C5.21252 0.624759 6.71552 0.786009 7.47977 1.80751L8.42627 3.07051C9.04877 3.90151 8.99327 5.06251 8.25452 5.79676L8.07602 5.97526C8.05578 6.05019 8.05372 6.12887 8.07002 6.20476C8.11727 6.51076 8.37302 7.15876 9.44402 8.22376C10.515 9.28876 11.1675 9.54376 11.478 9.59176C11.5563 9.60749 11.6371 9.60519 11.7143 9.58501L12.0203 9.28051C12.6773 8.62801 13.6853 8.50576 14.4983 8.94751L15.9308 9.72751C17.1585 10.3935 17.4683 12.0615 16.4633 13.0613L15.3975 14.1203C15.0615 14.454 14.61 14.7323 14.0595 14.784C12.702 14.9108 9.53927 14.7488 6.21452 11.4435C3.11177 8.35801 2.51627 5.66701 2.44052 4.34101C2.40302 3.67051 2.71952 3.10351 3.12302 2.70301L4.29977 1.53226ZM6.57977 2.48176C6.19952 1.97401 5.49152 1.93351 5.09252 2.33026L3.91502 3.50026C3.66752 3.74626 3.54902 4.01776 3.56402 4.27726C3.62402 5.33101 4.10402 7.75876 7.00802 10.6463C10.0545 13.6748 12.8678 13.7655 13.9553 13.6635C14.1773 13.6433 14.3978 13.5278 14.604 13.323L15.669 12.2633C16.1025 11.8328 16.0073 11.0483 15.3938 10.7153L13.9613 9.93601C13.5653 9.72151 13.1018 9.79201 12.8138 10.0785L12.4725 10.4183L12.075 10.0193C12.4725 10.4183 12.4718 10.419 12.471 10.419L12.4703 10.4205L12.468 10.4228L12.4628 10.4273L12.4515 10.4378C12.4199 10.4671 12.3857 10.4937 12.3495 10.5173C12.2895 10.557 12.21 10.6013 12.1103 10.638C11.9078 10.7138 11.6393 10.7543 11.3078 10.7033C10.6575 10.6035 9.79577 10.1603 8.65052 9.02176C7.50602 7.88326 7.05902 7.02676 6.95852 6.37726C6.90677 6.04576 6.94802 5.77726 7.02452 5.57476C7.06662 5.46081 7.1269 5.35443 7.20302 5.25976L7.22702 5.23351L7.23752 5.22226L7.24202 5.21776L7.24427 5.21551L7.24577 5.21401L7.46177 4.99951C7.78277 4.67926 7.82777 4.14901 7.52552 3.74476L6.57977 2.48176Z" fill="#007BFF" />
                        </svg>
                            {contact.phone}</p>

                        <div className="tempContacts-page-contact-details">
                            <div className="tempContacts-address-container commonTextCssWithManrope">
                                {contact.address}
                            </div>
                            <div style={{ display: "flex", gap: 10, width: "100%" }}>
                                <div className="tempContacts-address-container commonTextCssWithManrope">
                                    {contact.city}
                                </div>
                                <div className="tempContacts-address-container commonTextCssWithManrope">
                                    {contact.state}
                                </div>
                            </div>
                            <div className="tempContacts-address-container commonTextCssWithManrope">
                                {contact.user}
                            </div>

                        </div>
                        <p className="commonTextCss" style={{ marginTop: -10 }}>User: <span style={{ paddingLeft: 2 }}>{contact.userEmail}</span></p>
                        <div className="tempContacts-page-actions flex">
                            <div className="tempContacts-page-edit-button" onClick={() => handleEdit(contact)}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z" fill="#FF8800" />
                                </svg>
                            </div>
                            <div className="tempContacts-page-delete-button" onClick={() => handleDelete(contact)}>
                                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.78 5.80189e-08C12.1998 0.00010886 12.6088 0.132286 12.9493 0.377808C13.2898 0.62333 13.5444 0.96975 13.677 1.368L14.22 3H17.5C17.7652 3 18.0196 3.10536 18.2071 3.29289C18.3946 3.48043 18.5 3.73478 18.5 4C18.5 4.26522 18.3946 4.51957 18.2071 4.70711C18.0196 4.89464 17.7652 5 17.5 5L17.497 5.071L16.63 17.214C16.5759 17.9706 16.2372 18.6786 15.682 19.1956C15.1269 19.7125 14.3965 19.9999 13.638 20H5.362C4.60346 19.9999 3.87311 19.7125 3.31797 19.1956C2.76283 18.6786 2.42411 17.9706 2.37 17.214L1.503 5.07L1.5 5C1.23478 5 0.98043 4.89464 0.792893 4.70711C0.605357 4.51957 0.5 4.26522 0.5 4C0.5 3.73478 0.605357 3.48043 0.792893 3.29289C0.98043 3.10536 1.23478 3 1.5 3H4.78L5.323 1.368C5.4557 0.969588 5.71043 0.623052 6.0511 0.377515C6.39176 0.131978 6.80107 -0.000101061 7.221 5.80189e-08H11.78ZM15.497 5H3.503L4.365 17.071C4.38295 17.3232 4.49577 17.5592 4.68076 17.7316C4.86574 17.904 5.10916 17.9999 5.362 18H13.638C13.8908 17.9999 14.1343 17.904 14.3192 17.7316C14.5042 17.5592 14.617 17.3232 14.635 17.071L15.497 5ZM7.5 8C7.74493 8.00003 7.98134 8.08996 8.16437 8.25272C8.34741 8.41547 8.46434 8.63975 8.493 8.883L8.5 9V14C8.49972 14.2549 8.40212 14.5 8.22715 14.6854C8.05218 14.8707 7.81305 14.9822 7.55861 14.9972C7.30416 15.0121 7.05362 14.9293 6.85817 14.7657C6.66271 14.6021 6.5371 14.3701 6.507 14.117L6.5 14V9C6.5 8.73478 6.60536 8.48043 6.79289 8.29289C6.98043 8.10536 7.23478 8 7.5 8ZM11.5 8C11.7652 8 12.0196 8.10536 12.2071 8.29289C12.3946 8.48043 12.5 8.73478 12.5 9V14C12.5 14.2652 12.3946 14.5196 12.2071 14.7071C12.0196 14.8946 11.7652 15 11.5 15C11.2348 15 10.9804 14.8946 10.7929 14.7071C10.6054 14.5196 10.5 14.2652 10.5 14V9C10.5 8.73478 10.6054 8.48043 10.7929 8.29289C10.9804 8.10536 11.2348 8 11.5 8ZM11.78 2H7.22L6.887 3H12.113L11.78 2Z" fill="#EF4444" />
                                </svg>

                            </div>
                            <div className="tempContacts-page-call-button" onClick={() => handleCall(contact)}>
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.73303 1.04301C3.95003 -0.166993 5.95403 0.0480069 6.97303 1.41001L8.23503 3.09401C9.06503 4.20201 8.99103 5.75001 8.00603 6.72901L7.76803 6.96701C7.74104 7.06692 7.7383 7.17182 7.76003 7.27301C7.82303 7.68101 8.16403 8.54501 9.59203 9.96501C11.02 11.385 11.89 11.725 12.304 11.789C12.4083 11.81 12.5161 11.8069 12.619 11.78L13.027 11.374C13.903 10.504 15.247 10.341 16.331 10.93L18.241 11.97C19.878 12.858 20.291 15.082 18.951 16.415L17.53 17.827C17.082 18.272 16.48 18.643 15.746 18.712C13.936 18.881 9.71903 18.665 5.28603 14.258C1.14903 10.144 0.355027 6.55601 0.254027 4.78801C0.204027 3.89401 0.626027 3.13801 1.16403 2.60401L2.73303 1.04301ZM5.77303 2.30901C5.26603 1.63201 4.32203 1.57801 3.79003 2.10701L2.22003 3.66701C1.89003 3.99501 1.73203 4.35701 1.75203 4.70301C1.83203 6.10801 2.47203 9.34501 6.34403 13.195C10.406 17.233 14.157 17.354 15.607 17.218C15.903 17.191 16.197 17.037 16.472 16.764L17.892 15.351C18.47 14.777 18.343 13.731 17.525 13.287L15.615 12.248C15.087 11.962 14.469 12.056 14.085 12.438L13.63 12.891L13.1 12.359C13.63 12.891 13.629 12.892 13.628 12.892L13.627 12.894L13.624 12.897L13.617 12.903L13.602 12.917C13.5598 12.9562 13.5143 12.9917 13.466 13.023C13.386 13.076 13.28 13.135 13.147 13.184C12.877 13.285 12.519 13.339 12.077 13.271C11.21 13.138 10.061 12.547 8.53403 11.029C7.00803 9.51101 6.41203 8.36901 6.27803 7.50301C6.20903 7.06101 6.26403 6.70301 6.36603 6.43301C6.42216 6.28108 6.50254 6.13924 6.60403 6.01301L6.63603 5.97801L6.65003 5.96301L6.65603 5.95701L6.65903 5.95401L6.66103 5.95201L6.94903 5.66601C7.37703 5.23901 7.43703 4.53201 7.03403 3.99301L5.77303 2.30901Z" fill="#28A745" />
                                </svg>
                            </div>

                            <div className="tempContacts-page-move-button" onClick={() => handleMove(contact)}>
                                <button className="commonButtonCss">
                                    Move to Contact <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.793 4.50001H0.5C0.367392 4.50001 0.240215 4.55268 0.146447 4.64645C0.0526785 4.74022 0 4.8674 0 5.00001C0 5.13261 0.0526785 5.25979 0.146447 5.35356C0.240215 5.44733 0.367392 5.50001 0.5 5.50001H9.793L6.146 9.14601C6.05211 9.23989 5.99937 9.36723 5.99937 9.50001C5.99937 9.63278 6.05211 9.76012 6.146 9.85401C6.23989 9.94789 6.36722 10.0006 6.5 10.0006C6.63278 10.0006 6.76011 9.94789 6.854 9.85401L11.354 5.35401C11.4006 5.30756 11.4375 5.25238 11.4627 5.19164C11.4879 5.13089 11.5009 5.06577 11.5009 5.00001C11.5009 4.93424 11.4879 4.86912 11.4627 4.80837C11.4375 4.74763 11.4006 4.69245 11.354 4.64601L6.854 0.146006C6.76011 0.0521192 6.63278 -0.00062561 6.5 -0.00062561C6.36722 -0.00062561 6.23989 0.0521192 6.146 0.146006C6.05211 0.239893 5.99937 0.36723 5.99937 0.500006C5.99937 0.632782 6.05211 0.760119 6.146 0.854006L9.793 4.50001Z" fill="white" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showCreateTempContactPopup && (
                <CreateTempContactPopup onClose={() => setShowCreateTempContactPopup(false)} formData={formData} />
            )}
        </div>


    );
};

export default TempContacts;
