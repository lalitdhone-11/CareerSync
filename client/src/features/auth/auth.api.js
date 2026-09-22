import axios from "axios";


const API_URL = "http://localhost:8000/api/auth";


// ================= REGISTER =================

export const registerUser = async (userData) => {

  const response = await axios.post(
    `${API_URL}/register`,
    userData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};


// ================= LOGIN =================

export const loginUser = async (userData) => {

  const response = await axios.post(
    `${API_URL}/login`,
    userData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};


// ================= LOGOUT =================

export const logoutUser = async () => {

  const response = await axios.get(
    `${API_URL}/logout`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};


// ================= GET CURRENT USER =================

export const getCurrentUser = async () => {

  const response = await axios.get(
    `${API_URL}/get-me`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};