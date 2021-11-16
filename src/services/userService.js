import axios from "axios";
//const apiUrl = process.env.REACT_APP_API_URL;
const server_url = "https://movies-project-backend.herokuapp.com";

export function register(data) {
    return axios.post(`${server_url}/api/users`, data);
}
