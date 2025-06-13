import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("auth") || "5467890";

  if (!token) {
    return false;
  }

  try {
    const decoded: { exp: number } = jwtDecode(token);
    // Check if token has expired
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    console.error(error);
    // If decoding fails (e.g., malformed token), treat as unauthenticated
    return false;
  }
};

export { isAuthenticated };
