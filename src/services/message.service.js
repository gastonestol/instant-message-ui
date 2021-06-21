import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

const sendMessage = (recipient, type, content) => {
  return axios
    .post(API_URL + "messages", { 
      sender: JSON.parse(localStorage.getItem("user")).id,
      recipient,
      content:{
        type, 
        text: content
      },
    },
    { 
      headers: authHeader(),
      withCredentials: false 
    }
  );
};

const getMessages = (start,limit) => {
  return axios.get(API_URL + "messages", { 
    params: { 
      recipient: JSON.parse(localStorage.getItem("user")).id,
      start,
      limit 
    },
    headers: authHeader(),
    withCredentials: false
    }
  );
};

export default {
  getMessages,
  sendMessage,
};