import { message } from "antd";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5002";
export const userLogin = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('api/users/login', reqObj)
        localStorage.setItem('users', JSON.stringify(response.data));
        const roleChecker = response.data.role;
        if (roleChecker === "admin") {
            message.success('Login Success')
            setTimeout(() => {
                window.location.href = "/admin";
            }, 500);
        } else {
            message.success('Login Success')
            setTimeout(() => {
                window.location.href = "/home";
            }, 500);
        }

        dispatch({ type: 'GET_ALL_CARS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error);
        message.error('Something went worng check userName or Password')
        dispatch({ type: "LOADING", payload: false })

    }
}

export const userRegister = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        await axios.post('api/users/register', reqObj);
        message.success('Registeration Success')
        setTimeout(() => {
            window.location.href = "/login";
        }, 500);
        dispatch({ type: 'LOADING', payload: false })

    } catch (error) {
        console.log(error);
        message.error('Something went worng')
        dispatch({ type: "LOADING", payload: false })

    }
}
