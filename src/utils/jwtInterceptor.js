import axios from "axios";

export function jwtInterceptor() {
  axios.interceptors.request.use(
    (req) => {
      const token = localStorage.getItem("token");
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
      return Promise.reject(error);
    }
  );
}
