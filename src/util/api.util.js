import axios from "axios";

export const NETWORK_ERROR = "NETWORK_ERROR";

export const DEFAULT_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
};

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }

    console.log(error.config);
  }
);

export const ApiUtil = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;

    axios.defaults.withCredentials = true;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
  },

  get(resource, config = DEFAULT_CONFIG) {
    return axios.get(resource, config);
  },

  post(resource, data, config = DEFAULT_CONFIG) {
    return axios.post(resource, data, config);
  },

  put(resource, data, config = DEFAULT_CONFIG) {
    return axios.put(resource, data, config);
  },

  delete(resource, config = DEFAULT_CONFIG) {
    return axios.delete(resource, config);
  },

  customRequest(data) {
    return axios(data);
  },
};

export default ApiUtil;
