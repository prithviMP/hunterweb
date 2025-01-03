import React, { useState } from 'react';
import './TransferContacts.css';
import { category } from '../../../../../utils/category';
import { subCategoryJson } from '../../../../../utils/subCategory';
import { states } from '../../../../../utils/states';
import { fetchCitiesBasedOnState } from '../../../../../utils/cityService';


const TransferContacts = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cities, setCities] = useState([]);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredSubCategories = subCategoryJson.filter(subCategory => {
        if (selectedCategory === "1") return subCategory.id <= 3;
        if (selectedCategory === "2") return subCategory.id >= 4 && subCategory.id <= 6;
        if (selectedCategory === "3") return subCategory.id >= 7;
        return false;
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
        setSelectedState(state);
        if (state) {
            fetchCities(state);
        } else {
            setCities([]);
        }
    };

    const handleCityChange = (city) => {
        setSelectedCity(city);
    };

    return (
        <div className="transferContacts-page-container ">
            {/* Left Panel (40%) */}
            <div className="transferContacts-page-left-panel box-shadow">
                <div className="transferContacts-page-input-group">
                    <label>Category</label>
                    <select onChange={handleCategoryChange}>
                        <option>Select Category</option>
                        {category.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="transferContacts-page-input-group">
                    <label>Sub Category</label>
                    <select>
                        <option>Select Sub Category</option>
                        {filteredSubCategories.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="transferContacts-page-input-group">
                    <label>State</label>
                    <select onChange={(event) => handleStateChange(event.target.value)}>
                        <option>Choose State</option>
                        {states.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </div>
                <div className="transferContacts-page-input-group">
                    <label>State Doesn't Contain</label>
                    <select>
                        <option>Choose State</option>
                        {states.filter(item => item.value !== selectedState).map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </div>
                <div className="transferContacts-page-input-group">
                    <label>City</label>
                    <select onChange={(event) => handleCityChange(event.target.value)}>
                        <option>Choose City</option>
                        {cities.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </div>
                <div className="transferContacts-page-input-group">
                    <label>City Doesn't Contain</label>
                    <select>
                        <option>Choose City</option>
                        {cities.filter(item => item.value !== selectedCity).map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </div>
                <div className="transferContacts-page-input-group">
                    <label>Sales User</label>
                    <select>
                        <option>Choose Sales User</option>
                    </select>
                </div>
                <div className="transferContacts-page-input-group">
                    <label>Sales User Whom to Transfer</label>
                    <select>
                        <option>Choose User</option>
                    </select>
                </div>
                <button className="commonButtonCss">Transfer Contact</button>
            </div>

            {/* Right Panel (60%) */}
            <div className="transferContacts-page-right-panel">
                <div className="transferContacts-page-section-card box-shadow">
                    <h3 className='commonHeaderDashboard' style={{ marginTop: '15px' }}>Companies Details</h3>
                    <div className="transferContacts-page-status-section">
                        <div className='transferContacts-page-status-section-card box-shadow flex'>
                            <div>
                                <h5>KYC Status</h5>
                                <p>Done</p>
                                <p>Not Done</p>
                            </div>
                            <div>
                                <h5><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7721 6.96153C11.915 7.09998 11.9969 7.28948 12 7.48836C12.0031 7.68724 11.9271 7.87921 11.7886 8.02203L8.76614 11.1413C8.6843 11.226 8.58624 11.2934 8.47782 11.3394C8.36939 11.3854 8.2528 11.4091 8.13501 11.4091C8.01722 11.4091 7.90064 11.3854 7.79221 11.3394C7.68378 11.2934 7.58572 11.226 7.50389 11.1413L6.21164 9.80778C6.1422 9.73725 6.0874 9.65366 6.05042 9.56185C6.01343 9.47004 5.99499 9.37182 5.99614 9.27285C5.9973 9.17387 6.01804 9.07611 6.05716 8.98518C6.09628 8.89426 6.15301 8.81198 6.22408 8.74309C6.29515 8.6742 6.37915 8.62006 6.47125 8.58378C6.56334 8.54751 6.6617 8.52983 6.76067 8.53175C6.85963 8.53367 6.95723 8.55517 7.04785 8.59499C7.13846 8.63481 7.2203 8.69218 7.28864 8.76378L8.13464 9.63678L10.7116 6.97803C10.8501 6.83522 11.0396 6.75325 11.2385 6.75015C11.4374 6.74706 11.6293 6.82309 11.7721 6.96153Z" fill="#28A745" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.29567 1.77C8.75217 1.61377 9.24766 1.61377 9.70417 1.77L14.0962 3.267C14.561 3.42593 14.9586 3.73703 15.2247 4.14997C15.4908 4.56291 15.6098 5.05355 15.5624 5.5425L14.9939 11.3865C14.9641 11.6967 14.868 11.9968 14.712 12.2666C14.5561 12.5364 14.344 12.7696 14.0902 12.9503L10.2517 15.693C9.88688 15.9534 9.45077 16.0952 9.0026 16.0991C8.55443 16.103 8.11592 15.9688 7.74667 15.7148L3.93892 13.0935C3.67649 12.9129 3.45677 12.6771 3.2952 12.4025C3.13363 12.128 3.03413 11.8214 3.00367 11.5043L2.43367 5.5395C2.38712 5.05084 2.50666 4.56076 2.77298 4.14842C3.0393 3.73607 3.43685 3.42555 3.90142 3.267L8.29567 1.77ZM9.26392 3.06C9.09267 3.00216 8.90717 3.00216 8.73592 3.06L4.34167 4.5585C4.16738 4.61779 4.0182 4.73417 3.91829 4.8888C3.81838 5.04342 3.77359 5.22725 3.79117 5.4105L4.36192 11.3753C4.38442 11.6153 4.51342 11.8343 4.71292 11.9715L8.51992 14.592C8.80342 14.787 9.17992 14.784 9.45967 14.5845L13.2989 11.8418C13.3936 11.7735 13.4727 11.6859 13.531 11.5848C13.5893 11.4837 13.6255 11.3714 13.6372 11.2553L14.2064 5.41125C14.2243 5.22776 14.1797 5.04358 14.0798 4.88865C13.9799 4.73371 13.8305 4.6171 13.6559 4.55775L9.26392 3.06Z" fill="#28A745" />
                                </svg></h5>
                                <p> 1</p>
                                <p>4646</p>
                            </div>

                        </div>
                        <div className='transferContacts-page-status-section-card box-shadow flex'>
                            <div>
                                <h5>Approval Status</h5>
                                <p>Done</p>
                                <p>Partial</p>
                            </div>
                            <div>
                                <h5>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99785 0.787752C7.01097 0.936157 6.96468 1.08371 6.86913 1.19802C6.77359 1.31233 6.6366 1.38408 6.48822 1.3975C5.42385 1.49494 4.40927 1.89361 3.56328 2.54682C2.7173 3.20004 2.07492 4.08076 1.71139 5.08586C1.34785 6.09095 1.2782 7.17882 1.51058 8.22208C1.74297 9.26533 2.26777 10.2208 3.02354 10.9766C3.77932 11.7323 4.73477 12.2571 5.77802 12.4895C6.82128 12.7219 7.90914 12.6522 8.91424 12.2887C9.91934 11.9252 10.8001 11.2828 11.4533 10.4368C12.1065 9.59083 12.5052 8.57625 12.6026 7.51188C12.616 7.36329 12.6879 7.22612 12.8025 7.13055C12.8592 7.08323 12.9247 7.04754 12.9952 7.02552C13.0657 7.00351 13.1399 6.9956 13.2135 7.00225C13.287 7.0089 13.3586 7.02997 13.424 7.06427C13.4894 7.09857 13.5475 7.14542 13.5948 7.20214C13.6421 7.25887 13.6778 7.32436 13.6998 7.39487C13.7218 7.46539 13.7297 7.53955 13.7231 7.61313C13.6066 8.89063 13.1285 10.1085 12.3448 11.1241C11.5611 12.1396 10.5042 12.9108 9.29801 13.3474C8.09178 13.7839 6.78612 13.8677 5.53399 13.5889C4.28185 13.3101 3.13508 12.6803 2.22801 11.7732C1.32093 10.8661 0.691111 9.71937 0.412318 8.46724C0.133525 7.2151 0.217305 5.90944 0.653843 4.70321C1.09038 3.49697 1.8616 2.4401 2.87717 1.6564C3.89274 0.872692 5.1106 0.394602 6.3881 0.278127C6.5365 0.265006 6.68405 0.311296 6.79836 0.40684C6.91268 0.502383 6.98442 0.639374 6.99785 0.787752ZM6.4376 3.625C6.58678 3.625 6.72985 3.68427 6.83534 3.78975C6.94083 3.89524 7.0001 4.03832 7.0001 4.1875V7H8.6876C8.83678 7 8.97985 7.05926 9.08534 7.16475C9.19083 7.27024 9.2501 7.41332 9.2501 7.5625C9.2501 7.71169 9.19083 7.85476 9.08534 7.96025C8.97985 8.06574 8.83678 8.125 8.6876 8.125H6.4376C6.28841 8.125 6.14534 8.06574 6.03985 7.96025C5.93436 7.85476 5.8751 7.71169 5.8751 7.5625V4.1875C5.8751 4.03832 5.93436 3.89524 6.03985 3.78975C6.14534 3.68427 6.28841 3.625 6.4376 3.625ZM8.8406 0.504252C8.76893 0.482126 8.69357 0.474554 8.61894 0.481982C8.5443 0.489411 8.47191 0.51169 8.40602 0.547508C8.34012 0.583326 8.28206 0.63196 8.23523 0.69055C8.18841 0.74914 8.15378 0.816502 8.13337 0.888673C8.11297 0.960844 8.1072 1.03637 8.11641 1.1108C8.12562 1.18523 8.14962 1.25707 8.18701 1.32209C8.22439 1.38711 8.2744 1.444 8.33409 1.48941C8.39379 1.53482 8.46196 1.56783 8.5346 1.5865C9.14997 1.76088 9.72372 2.0365 10.2345 2.3965C10.3565 2.47766 10.5054 2.508 10.6494 2.48107C10.7935 2.45413 10.9213 2.37204 11.0057 2.25227C11.0902 2.1325 11.1245 1.98451 11.1015 1.83978C11.0785 1.69506 10.9999 1.56503 10.8825 1.47738C10.2614 1.04046 9.57111 0.711468 8.8406 0.504252ZM12.5227 3.11763C12.4368 2.99559 12.3059 2.9127 12.1589 2.88717C12.0118 2.86164 11.8606 2.89557 11.7386 2.9815C11.6166 3.06743 11.5337 3.19832 11.5081 3.34537C11.4955 3.41818 11.4973 3.49277 11.5135 3.56488C11.5297 3.63699 11.5599 3.7052 11.6025 3.76563C11.9625 4.27638 12.2392 4.85013 12.4125 5.4655C12.4326 5.53664 12.4665 5.60312 12.5123 5.66115C12.558 5.71918 12.6148 5.76763 12.6793 5.80372C12.7438 5.83981 12.8148 5.86285 12.8882 5.87151C12.9616 5.88017 13.036 5.87428 13.1072 5.85419C13.1783 5.8341 13.2448 5.80019 13.3028 5.75441C13.3608 5.70862 13.4093 5.65185 13.4454 5.58735C13.4815 5.52284 13.5045 5.45185 13.5132 5.37844C13.5218 5.30503 13.5159 5.23064 13.4958 5.1595C13.2886 4.42899 12.9596 3.73867 12.5227 3.11763Z" fill="#FF8800" />
                                    </svg>
                                </h5>
                                <p> 0</p>
                                <p>0</p>
                            </div>

                        </div>
                        <div className='transferContacts-page-status-section-card box-shadow flex'>
                            <div>
                                <h5>Activity Status</h5>
                                <p>Active</p>
                                <p>Inactive</p>
                            </div>
                            <div>
                                <h5><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 11.25H14C14.1989 11.25 14.3897 11.171 14.5303 11.0303C14.671 10.8897 14.75 10.6989 14.75 10.5V9.75C14.75 9.15326 14.5129 8.58097 14.091 8.15901C13.669 7.73705 13.0967 7.5 12.5 7.5H11M9.323 4.5C9.62679 4.83965 10.0265 5.07904 10.4694 5.18652C10.9122 5.294 11.3772 5.26449 11.8029 5.10189C12.2286 4.93929 12.5949 4.65127 12.8533 4.27595C13.1117 3.90062 13.2501 3.45568 13.2501 3C13.2501 2.54432 13.1117 2.09938 12.8533 1.72405C12.5949 1.34873 12.2286 1.06071 11.8029 0.898113C11.3772 0.735516 10.9122 0.706003 10.4694 0.813479C10.0265 0.920956 9.62679 1.16036 9.323 1.5M1.25 10.5V9.75C1.25 9.15326 1.48705 8.58097 1.90901 8.15901C2.33097 7.73705 2.90326 7.5 3.5 7.5H6.5C7.09674 7.5 7.66903 7.73705 8.09099 8.15901C8.51295 8.58097 8.75 9.15326 8.75 9.75V10.5C8.75 10.6989 8.67098 10.8897 8.53033 11.0303C8.38968 11.171 8.19891 11.25 8 11.25H2C1.80109 11.25 1.61032 11.171 1.46967 11.0303C1.32902 10.8897 1.25 10.6989 1.25 10.5ZM7.25 3C7.25 3.59674 7.01295 4.16903 6.59099 4.59099C6.16903 5.01295 5.59674 5.25 5 5.25C4.40326 5.25 3.83097 5.01295 3.40901 4.59099C2.98705 4.16903 2.75 3.59674 2.75 3C2.75 2.40326 2.98705 1.83097 3.40901 1.40901C3.83097 0.987053 4.40326 0.750001 5 0.750001C5.59674 0.750001 6.16903 0.987053 6.59099 1.40901C7.01295 1.83097 7.25 2.40326 7.25 3Z" stroke="#007BFF" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                </h5>
                                <p> 4648</p>
                                <p>16</p>
                            </div>
                        </div>
                    </div>
                    <div className="transferContacts-page-email-status flex">
                        <div>
                            <h5>Email Status</h5>
                            <p>Total Emails: 1237</p>
                            <p>Valid Emails: 640</p>
                        </div>
                        <div>
                            <h5> <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.3125 2.0625V9.9375C15.3125 10.2359 15.194 10.522 14.983 10.733C14.772 10.944 14.4859 11.0625 14.1875 11.0625H1.8125C1.51413 11.0625 1.22798 10.944 1.017 10.733C0.806026 10.522 0.6875 10.2359 0.6875 9.9375V2.0625M15.3125 2.0625C15.3125 1.76413 15.194 1.47798 14.983 1.267C14.772 1.05603 14.4859 0.9375 14.1875 0.9375H1.8125C1.51413 0.9375 1.22798 1.05603 1.017 1.267C0.806026 1.47798 0.6875 1.76413 0.6875 2.0625M15.3125 2.0625L8.64013 6.68175C8.45203 6.8119 8.22873 6.88162 8 6.88162C7.77127 6.88162 7.54797 6.8119 7.35988 6.68175L0.6875 2.0625" stroke="#A9A9A9" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </h5>
                            <p>1237</p>
                            <p>640</p>
                        </div>
                    </div>
                </div>

                {/*  contact section */}
                <div className="transferContacts-page-section-card">
                    <h3 className="commonHeaderDashboard" style={{ marginTop: '15px' }}>Contact</h3>
                    <div className="transferContacts-page-status-section ">

                        <div className='transferContacts-page-status-section-card box-shadow flex'>
                            <div>
                                <h5>KYC Status</h5>
                                <p>Done</p>
                                <p>Not Done</p>
                            </div>
                            <div>
                                <h5><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7721 6.96153C11.915 7.09998 11.9969 7.28948 12 7.48836C12.0031 7.68724 11.9271 7.87921 11.7886 8.02203L8.76614 11.1413C8.6843 11.226 8.58624 11.2934 8.47782 11.3394C8.36939 11.3854 8.2528 11.4091 8.13501 11.4091C8.01722 11.4091 7.90064 11.3854 7.79221 11.3394C7.68378 11.2934 7.58572 11.226 7.50389 11.1413L6.21164 9.80778C6.1422 9.73725 6.0874 9.65366 6.05042 9.56185C6.01343 9.47004 5.99499 9.37182 5.99614 9.27285C5.9973 9.17387 6.01804 9.07611 6.05716 8.98518C6.09628 8.89426 6.15301 8.81198 6.22408 8.74309C6.29515 8.6742 6.37915 8.62006 6.47125 8.58378C6.56334 8.54751 6.6617 8.52983 6.76067 8.53175C6.85963 8.53367 6.95723 8.55517 7.04785 8.59499C7.13846 8.63481 7.2203 8.69218 7.28864 8.76378L8.13464 9.63678L10.7116 6.97803C10.8501 6.83522 11.0396 6.75325 11.2385 6.75015C11.4374 6.74706 11.6293 6.82309 11.7721 6.96153Z" fill="#28A745" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.29567 1.77C8.75217 1.61377 9.24766 1.61377 9.70417 1.77L14.0962 3.267C14.561 3.42593 14.9586 3.73703 15.2247 4.14997C15.4908 4.56291 15.6098 5.05355 15.5624 5.5425L14.9939 11.3865C14.9641 11.6967 14.868 11.9968 14.712 12.2666C14.5561 12.5364 14.344 12.7696 14.0902 12.9503L10.2517 15.693C9.88688 15.9534 9.45077 16.0952 9.0026 16.0991C8.55443 16.103 8.11592 15.9688 7.74667 15.7148L3.93892 13.0935C3.67649 12.9129 3.45677 12.6771 3.2952 12.4025C3.13363 12.128 3.03413 11.8214 3.00367 11.5043L2.43367 5.5395C2.38712 5.05084 2.50666 4.56076 2.77298 4.14842C3.0393 3.73607 3.43685 3.42555 3.90142 3.267L8.29567 1.77ZM9.26392 3.06C9.09267 3.00216 8.90717 3.00216 8.73592 3.06L4.34167 4.5585C4.16738 4.61779 4.0182 4.73417 3.91829 4.8888C3.81838 5.04342 3.77359 5.22725 3.79117 5.4105L4.36192 11.3753C4.38442 11.6153 4.51342 11.8343 4.71292 11.9715L8.51992 14.592C8.80342 14.787 9.17992 14.784 9.45967 14.5845L13.2989 11.8418C13.3936 11.7735 13.4727 11.6859 13.531 11.5848C13.5893 11.4837 13.6255 11.3714 13.6372 11.2553L14.2064 5.41125C14.2243 5.22776 14.1797 5.04358 14.0798 4.88865C13.9799 4.73371 13.8305 4.6171 13.6559 4.55775L9.26392 3.06Z" fill="#28A745" />
                                </svg></h5>
                                <p> 1</p>
                                <p>4646</p>
                            </div>

                        </div>
                        <div className='transferContacts-page-status-section-card box-shadow flex'>
                            <div>
                                <h5>Approval Status</h5>
                                <p>Done</p>
                                <p>Partial</p>
                            </div>
                            <div>
                                <h5>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99785 0.787752C7.01097 0.936157 6.96468 1.08371 6.86913 1.19802C6.77359 1.31233 6.6366 1.38408 6.48822 1.3975C5.42385 1.49494 4.40927 1.89361 3.56328 2.54682C2.7173 3.20004 2.07492 4.08076 1.71139 5.08586C1.34785 6.09095 1.2782 7.17882 1.51058 8.22208C1.74297 9.26533 2.26777 10.2208 3.02354 10.9766C3.77932 11.7323 4.73477 12.2571 5.77802 12.4895C6.82128 12.7219 7.90914 12.6522 8.91424 12.2887C9.91934 11.9252 10.8001 11.2828 11.4533 10.4368C12.1065 9.59083 12.5052 8.57625 12.6026 7.51188C12.616 7.36329 12.6879 7.22612 12.8025 7.13055C12.8592 7.08323 12.9247 7.04754 12.9952 7.02552C13.0657 7.00351 13.1399 6.9956 13.2135 7.00225C13.287 7.0089 13.3586 7.02997 13.424 7.06427C13.4894 7.09857 13.5475 7.14542 13.5948 7.20214C13.6421 7.25887 13.6778 7.32436 13.6998 7.39487C13.7218 7.46539 13.7297 7.53955 13.7231 7.61313C13.6066 8.89063 13.1285 10.1085 12.3448 11.1241C11.5611 12.1396 10.5042 12.9108 9.29801 13.3474C8.09178 13.7839 6.78612 13.8677 5.53399 13.5889C4.28185 13.3101 3.13508 12.6803 2.22801 11.7732C1.32093 10.8661 0.691111 9.71937 0.412318 8.46724C0.133525 7.2151 0.217305 5.90944 0.653843 4.70321C1.09038 3.49697 1.8616 2.4401 2.87717 1.6564C3.89274 0.872692 5.1106 0.394602 6.3881 0.278127C6.5365 0.265006 6.68405 0.311296 6.79836 0.40684C6.91268 0.502383 6.98442 0.639374 6.99785 0.787752ZM6.4376 3.625C6.58678 3.625 6.72985 3.68427 6.83534 3.78975C6.94083 3.89524 7.0001 4.03832 7.0001 4.1875V7H8.6876C8.83678 7 8.97985 7.05926 9.08534 7.16475C9.19083 7.27024 9.2501 7.41332 9.2501 7.5625C9.2501 7.71169 9.19083 7.85476 9.08534 7.96025C8.97985 8.06574 8.83678 8.125 8.6876 8.125H6.4376C6.28841 8.125 6.14534 8.06574 6.03985 7.96025C5.93436 7.85476 5.8751 7.71169 5.8751 7.5625V4.1875C5.8751 4.03832 5.93436 3.89524 6.03985 3.78975C6.14534 3.68427 6.28841 3.625 6.4376 3.625ZM8.8406 0.504252C8.76893 0.482126 8.69357 0.474554 8.61894 0.481982C8.5443 0.489411 8.47191 0.51169 8.40602 0.547508C8.34012 0.583326 8.28206 0.63196 8.23523 0.69055C8.18841 0.74914 8.15378 0.816502 8.13337 0.888673C8.11297 0.960844 8.1072 1.03637 8.11641 1.1108C8.12562 1.18523 8.14962 1.25707 8.18701 1.32209C8.22439 1.38711 8.2744 1.444 8.33409 1.48941C8.39379 1.53482 8.46196 1.56783 8.5346 1.5865C9.14997 1.76088 9.72372 2.0365 10.2345 2.3965C10.3565 2.47766 10.5054 2.508 10.6494 2.48107C10.7935 2.45413 10.9213 2.37204 11.0057 2.25227C11.0902 2.1325 11.1245 1.98451 11.1015 1.83978C11.0785 1.69506 10.9999 1.56503 10.8825 1.47738C10.2614 1.04046 9.57111 0.711468 8.8406 0.504252ZM12.5227 3.11763C12.4368 2.99559 12.3059 2.9127 12.1589 2.88717C12.0118 2.86164 11.8606 2.89557 11.7386 2.9815C11.6166 3.06743 11.5337 3.19832 11.5081 3.34537C11.4955 3.41818 11.4973 3.49277 11.5135 3.56488C11.5297 3.63699 11.5599 3.7052 11.6025 3.76563C11.9625 4.27638 12.2392 4.85013 12.4125 5.4655C12.4326 5.53664 12.4665 5.60312 12.5123 5.66115C12.558 5.71918 12.6148 5.76763 12.6793 5.80372C12.7438 5.83981 12.8148 5.86285 12.8882 5.87151C12.9616 5.88017 13.036 5.87428 13.1072 5.85419C13.1783 5.8341 13.2448 5.80019 13.3028 5.75441C13.3608 5.70862 13.4093 5.65185 13.4454 5.58735C13.4815 5.52284 13.5045 5.45185 13.5132 5.37844C13.5218 5.30503 13.5159 5.23064 13.4958 5.1595C13.2886 4.42899 12.9596 3.73867 12.5227 3.11763Z" fill="#FF8800" />
                                    </svg>
                                </h5>
                                <p> 0</p>
                                <p>0</p>
                            </div>

                        </div>
                        <div className='transferContacts-page-status-section-card box-shadow flex'>
                            <div>
                                <h5>Activity Status</h5>
                                <p>Active</p>
                                <p>Inactive</p>
                            </div>
                            <div>
                                <h5><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 11.25H14C14.1989 11.25 14.3897 11.171 14.5303 11.0303C14.671 10.8897 14.75 10.6989 14.75 10.5V9.75C14.75 9.15326 14.5129 8.58097 14.091 8.15901C13.669 7.73705 13.0967 7.5 12.5 7.5H11M9.323 4.5C9.62679 4.83965 10.0265 5.07904 10.4694 5.18652C10.9122 5.294 11.3772 5.26449 11.8029 5.10189C12.2286 4.93929 12.5949 4.65127 12.8533 4.27595C13.1117 3.90062 13.2501 3.45568 13.2501 3C13.2501 2.54432 13.1117 2.09938 12.8533 1.72405C12.5949 1.34873 12.2286 1.06071 11.8029 0.898113C11.3772 0.735516 10.9122 0.706003 10.4694 0.813479C10.0265 0.920956 9.62679 1.16036 9.323 1.5M1.25 10.5V9.75C1.25 9.15326 1.48705 8.58097 1.90901 8.15901C2.33097 7.73705 2.90326 7.5 3.5 7.5H6.5C7.09674 7.5 7.66903 7.73705 8.09099 8.15901C8.51295 8.58097 8.75 9.15326 8.75 9.75V10.5C8.75 10.6989 8.67098 10.8897 8.53033 11.0303C8.38968 11.171 8.19891 11.25 8 11.25H2C1.80109 11.25 1.61032 11.171 1.46967 11.0303C1.32902 10.8897 1.25 10.6989 1.25 10.5ZM7.25 3C7.25 3.59674 7.01295 4.16903 6.59099 4.59099C6.16903 5.01295 5.59674 5.25 5 5.25C4.40326 5.25 3.83097 5.01295 3.40901 4.59099C2.98705 4.16903 2.75 3.59674 2.75 3C2.75 2.40326 2.98705 1.83097 3.40901 1.40901C3.83097 0.987053 4.40326 0.750001 5 0.750001C5.59674 0.750001 6.16903 0.987053 6.59099 1.40901C7.01295 1.83097 7.25 2.40326 7.25 3Z" stroke="#007BFF" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                </h5>
                                <p> 4648</p>
                                <p>16</p>
                            </div>
                        </div>
                    </div>
                    <div className="transferContacts-page-email-status flex">
                        <div>
                            <h5>Email Status</h5>
                            <p>Total Emails: 1237</p>
                            <p>Valid Emails: 640</p>
                        </div>
                        <div>
                            <h5> <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.3125 2.0625V9.9375C15.3125 10.2359 15.194 10.522 14.983 10.733C14.772 10.944 14.4859 11.0625 14.1875 11.0625H1.8125C1.51413 11.0625 1.22798 10.944 1.017 10.733C0.806026 10.522 0.6875 10.2359 0.6875 9.9375V2.0625M15.3125 2.0625C15.3125 1.76413 15.194 1.47798 14.983 1.267C14.772 1.05603 14.4859 0.9375 14.1875 0.9375H1.8125C1.51413 0.9375 1.22798 1.05603 1.017 1.267C0.806026 1.47798 0.6875 1.76413 0.6875 2.0625M15.3125 2.0625L8.64013 6.68175C8.45203 6.8119 8.22873 6.88162 8 6.88162C7.77127 6.88162 7.54797 6.8119 7.35988 6.68175L0.6875 2.0625" stroke="#A9A9A9" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </h5>
                            <p>1237</p>
                            <p>640</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferContacts;
