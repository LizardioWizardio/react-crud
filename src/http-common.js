import axios from "axios";

export default axios.create({
    baseURL: "https://63c01fd1e262345656f830e1.mockapi.io/",
    headers: {
        "Content-type": "application/json"
    }
});