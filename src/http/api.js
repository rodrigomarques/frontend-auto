import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER,
});

api.interceptors.request.use(
  async config => {
    let tk = localStorage.getItem("tk", "")
    if (tk !== null && tk !== "")
      config.headers.authorization = `Bearer ${tk}`
    return config
  }, 
  error => {
    Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    if (response.data.token !== undefined) {
      localStorage.setItem("tk", response.data.token);
    }
    return response;
  },
  (error) => {
    if (error.response !== undefined && error.response.status !== undefined) {
      let statusCode = error.response.status;
      let message = "";
      if (statusCode === 401)
        window.location = "/";
      
      if (error.response.data !== undefined)
        message = error.response.data.errors;
      return Promise.reject({ statusCode, error, message: message });
    }
  }
);

export default api
