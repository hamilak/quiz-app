import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Content-Type": "multipart/form-data",
        Accept : "application/json"
    }
})