import axios from "axios";
const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:5000/api/v1/", headers: {
    //     "Content-Type": "application/json"
    // }
    baseURL: "https://blog-res-api-mr.vercel.app/api/v1/", headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use((req) => {
    const stringifyBlogData = window.localStorage.getItem("blogData")
    if (stringifyBlogData) {
        const blogData = JSON.parse(stringifyBlogData);
        if (blogData?.token) {
            req.headers.Authorization = `Bearer ${blogData.token}`;
        }
    }
    return req
})

export default axiosInstance