import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

const register = (username, password) => {
  return axios.post(API_URL + "users", {
    username,
    password,
  });
};

const getUser = (username) => {
  return axios.get(API_URL + "users", { headers: authHeader(),params: { username } });
};

export default {
  register,
  getUser,
};