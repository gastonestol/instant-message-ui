import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
import MessageService from "../services/message.service";

export const getMessages = (start, limit) => (dispatch) => {
    return MessageService.getMessages (start, limit).then(
        (response) => {
        dispatch({
            type: GET_MESSAGES,
            payload: response.data.messages,
        });

        return Promise.resolve();
        },
        (error) => {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: REGISTER_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
        }
    );
};