import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api3.islamhouse.com/v3/paV29H2gm56kvLP/',
  timeout: 1000,

});

export default axiosInstance

