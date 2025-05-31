import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_API_URL;
const LOGIN_URL = BASE_URL + "/auth/login/";
const PROFILE_URL = BASE_URL + "/profile/";

const loginService = async (userData: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(LOGIN_URL, userData, config);

  if (response.data) {
    localStorage.setItem("auth", response.data.accessToken);
  }
  return response.data;
};

const profileService = async (token: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(PROFILE_URL, config);
  return response.data;
};

const authAPIService = { loginService, profileService };
export default authAPIService;
