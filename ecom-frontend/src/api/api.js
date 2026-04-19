import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials : true,
});

// api.interceptors.request.use((config) => {
//     const auth = JSON.parse(localStorage.getItem("auth"));

//     let token = auth?.jwtCookie;

//     if (token) {
//         // remove cookie name
//         if (token.includes("=")) {
//             token = token.split("=")[1];
//         }

//         // remove everything after semicolon
//         if (token.includes(";")) {
//             token = token.split(";")[0];
//         }
//     }

//     console.log("Clean Token:", token);

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

export default api;