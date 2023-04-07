import axios from "axios";

// Create an axios instance with a base URL from the environment variable NEXT_PUBLIC_API_BASE_URL
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Export the axios instance as the default export of this module
export default instance;
