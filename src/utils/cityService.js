export const fetchCitiesBasedOnState = async (stateName) => {
  try {
    // First get auth token
    const authResponse = await fetch(
      "https://www.universal-tutorial.com/api/getaccesstoken",
      {
        headers: {
          Accept: "application/json",
          "api-token":
            "jlHV4kzdnd_LhoKfOKiVbcKc4lEaDXBhwHQmbfkF7ld8Z3mbapYsZjBktdOy_UCwohQ",
          "user-email": "tpsvipulpatna9798@gmail.com",
        },
      }
    );
    const authData = await authResponse.json();
    const token = authData.auth_token;

    // Then get cities
    const response = await fetch(
      `https://www.universal-tutorial.com/api/cities/${stateName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const cityData = await response.json();

    // Transform data for select options
    return cityData.map((city) => ({
      value: city.city_name,
      label: city.city_name,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
