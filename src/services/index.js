import nookies from "nookies"

import axios from "axios";


const api = axios.create({
    baseURL: "https://facilita-back.onrender.com",
    // baseURL: "https://localhost:3000",
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${nookies.get(null).token}`,
    },
})


export { api }