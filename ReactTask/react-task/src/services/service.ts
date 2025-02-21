import axios from "axios";
import store from "../redux/store/store";

export const API = axios.create({
  baseURL: "http://localhost:8000/user",
});

API.interceptors.request.use(
  (config) => {
    // const getDataFromLocalStorage = localStorage.getItem("persist:root") as string ;
    // const token=JSON.parse(JSON.parse(JSON.parse(getDataFromLocalStorage).auth).token).accessToken;
    const getStore=store.getState();
    const token=getStore.auth.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
