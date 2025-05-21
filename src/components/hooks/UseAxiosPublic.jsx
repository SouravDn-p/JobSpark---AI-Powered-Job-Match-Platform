// hooks/useAxiosPublic.jsx
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://jobspark-servercode.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
