import axios, { isAxiosError } from "axios";

import { tryRefreshToken } from "./authapi";

const api = axios.create({
  headers: {
    "content-type": "application/json",
  },

  baseURL: "/local",
});

export const noInterceptApi = axios.create({
  headers: { "content-type": "application/json" },
  baseURL: "/local",
});

const TOKEN_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    if (
      response.data.accessToken === "" && //accessToken, refreshToken, expiresIn이 만료된 경우 이렇게 빈 문자열로 옴
      response.data.refreshToken === "" &&
      response.data.expiresIn === 0
    ) {
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      window.location.replace("/login");
    }
    return response;
  },
  async (error) => {
    if (isAxiosError(error)) {
      if (error.status === 401) {
        const accessToken = localStorage.getItem(TOKEN_KEY); // accessToken이 만료될 때
        const refreshToken = localStorage.getItem(REFRESH_KEY);

        if (!accessToken || !refreshToken) {
          alert("네트워크 오류");
        } else {
          const refreshTokenResponse = await tryRefreshToken({
            refreshToken,
          });
          localStorage.setItem(
            "accessToken",
            refreshTokenResponse.data.accessToken,
          );
          localStorage.setItem(
            "refreshToken",
            refreshTokenResponse.data.refreshToken,
          );
          localStorage.setItem(
            "expiredTime",
            Date.now() + refreshTokenResponse.data.expiresIn,
          );
          return api(refreshTokenResponse.config);
        }
      } else {
        alert(`${error.status} ${error.response?.statusText}`);
      }
    }
  },
);

export default api;
