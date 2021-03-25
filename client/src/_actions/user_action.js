import axios from "axios";
import {
    LOGIN_USER
} from "./types";
export function loginUser(dataTosubmit) {

    const request = axios.post("/api/users/login",dataTosubmit)
                         .then(response=>response.data);

    // Process of pass request to reducer
    return {
        type:LOGIN_USER,
        payload:request
    }
}
