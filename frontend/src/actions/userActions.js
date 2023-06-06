import {
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    CLEAR_ERRORS,
    CLEAR_TOKEN_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    SET_TOKEN_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS
} from '../constants/userContants';
import axios from 'axios';
import { REQUEST_URL } from '../Constants.js';

const config = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    }
};
//Login A User Action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const { data } = await axios.post(
            `${REQUEST_URL}/api/v1/login`,
            { email, password },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        dispatch({ type: SET_TOKEN_SUCCESS, payload: data.user.token });

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error?.response?.data?.error });
        dispatch({ type: CLEAR_TOKEN_SUCCESS });
    }
};

//Register A User Action
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.post(
            `${REQUEST_URL}/api/v1/register`,
            userData,
            { config }
        );

        dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error?.response?.data?.message
        });
    }
};

//Load A User Action
export const loadUser = (token) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.post(`${REQUEST_URL}/api/v1/me`, {
            token
        });

        dispatch({ type: LOAD_USER_SUCCESS, payload: data?.user });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error?.response?.data?.error
        });
    }
};

//Logout A User Action
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${REQUEST_URL}/api/v1/logout`);

        dispatch({ type: CLEAR_TOKEN_SUCCESS });
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error?.response?.data?.message
        });
    }
};

//Update A User Profile Action
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.put(
            `${REQUEST_URL}/api/v1/me/update`,
            userData,
            { config }
        );
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error?.response?.data?.message
        });
    }
};

//Update A User Profile Password Action
export const updatePassword = (password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.put(
            `${REQUEST_URL}/api/v1/password/update`,
            password,
            { config }
        );
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error?.response?.data?.message
        });
    }
};

//Forgot Password Action
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });

        const { data } = await axios.post(
            `${REQUEST_URL}/api/v1/password/forgot`,
            email,
            { config }
        );

        // dispatch({type:SET_TOKEN_SUCCESS,payload:data.user.token})
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data?.message });
    } catch (error) {
        // dispatch({type:LOGIN_FAIL,payload:error?.response?})
        dispatch({ type: FORGOT_PASSWORD_FAIL });
    }
};

//clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};

//Update A User Profile Password Action
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.put(
            `${REQUEST_URL}/api/v1/password/reset/${token}`,
            passwords,
            { config }
        );
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error?.response?.data?.message
        });
    }
};

//Get All users
//Load A User Action
export const getAllUsers = (token) => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        const { data } = await axios.post(`${REQUEST_URL}/api/v1/admin/users`, {
            token
        });

        dispatch({ type: ALL_USERS_SUCCESS, payload: data?.users });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error?.response?.data?.message
        });
    }
};

//Get All users Details
//Load A User  Details ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(
            `${REQUEST_URL}/api/v1/admin/user/${id}`
        );
        console.log('user details-->', data);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data?.user });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error?.response?.data?.message
        });
    }
};

//Update A User Action
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.put(
            `${REQUEST_URL}/api/v1/admin/user/${id}`,
            userData,
            { config }
        );
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error?.response?.data?.message
        });
    }
};

//delete A User Action
export const deleteUser = (id, token) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.post(
            `${REQUEST_URL}/api/v1/admin/user/delete/${id}`,
            { token }
        );
        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error?.response?.data?.message
        });
    }
};
