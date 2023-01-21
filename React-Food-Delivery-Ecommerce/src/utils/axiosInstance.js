import axios from "axios";
import storage from "./storage";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

const baseURL = process.env.REACT_APP_SERVICE_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async (req) => {
  const authTokens = storage.get("authTokens");
  if (authTokens) {
    const refreshToken = jwt_decode(authTokens?.refresh);
    const isRefreshTokenExpired =
      dayjs.unix(refreshToken.exp).diff(dayjs()) < 1;
    if (isRefreshTokenExpired) {
      storage.remove("authTokens");
      return req;
    }
    req.headers.authorization = `Bearer ${authTokens?.access}`;
    const user = jwt_decode(authTokens?.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;
    const response = await axios.post(`${baseURL}/accounts/token/refresh/`, {
      refresh: authTokens?.refresh,
    });
    storage.set("authTokens", response.data);
    req.headers.Authorization = `Bearer ${response.data.access}`;
  }

  return req;
});

export default axiosInstance;
