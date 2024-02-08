import axios from "axios";

const URL = "http://localhost:3001";

const api = axios.create({
    baseURL: URL,
    auth: {
        username: "charles",
        password: ""

    }
});


export default api;
