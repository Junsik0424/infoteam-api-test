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
// import axios, { isAxiosError } from "axios";

// import { tryRefreshToken } from "./authapi";

// const api = axios.create({
//   headers: {
//     "content-type": "application/json",
//   },
//   baseURL: "/local",
// });

// const TOKEN_KEY = "accessToken";
// const REFRESH_KEY = "refreshToken";

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// api.interceptors.response.use(
//   (response) => {
//     // 응답에서 accessToken, refreshToken, expiresIn 값이 모두 만료되었다면 로그아웃 처리
//     if (
//       response.data.accessToken === "" && // accessToken이 빈 문자열
//       response.data.refreshToken === "" && // refreshToken이 빈 문자열
//       response.data.expiresIn === 0 // expiresIn이 0
//     ) {
//       alert("인증이 만료되었습니다. 다시 로그인해주세요.");
//       localStorage.clear();
//       window.location.replace("/login");
//     }
//     return response; // 정상적인 응답일 경우 그대로 반환
//   },
//   async (error) => {
//     if (isAxiosError(error) && error.response?.status === 401) {
//       const originalRequest = error.config;

//       // originalRequest가 존재하는지 먼저 확인
//       if (!originalRequest) {
//         return Promise.reject(error);
//       }

//       const refreshToken = localStorage.getItem(REFRESH_KEY);

//       // refreshToken이 없는 경우 즉시 로그아웃 처리
//       if (!refreshToken) {
//         alert("인증이 만료되었습니다. 다시 로그인해주세요.");
//         localStorage.clear();
//         window.location.replace("/login");
//         return Promise.reject(error);
//       }

//       // refreshToken이 있는 경우 토큰 갱신 시도
//       try {
//         const refreshTokenResponse = await tryRefreshToken({ refreshToken });

//         // 갱신된 토큰이 만료된 상태로 왔을 때 로그아웃 처리
//         if (
//           refreshTokenResponse.data.accessToken === "" &&
//           refreshTokenResponse.data.refreshToken === "" &&
//           refreshTokenResponse.data.expiresIn === 0
//         ) {
//           alert("인증이 만료되었습니다. 다시 로그인해주세요.");
//           localStorage.clear();
//           window.location.replace("/login");
//           return Promise.reject(refreshTokenResponse);
//         }

//         // 새로운 토큰을 저장
//         localStorage.setItem(
//           "accessToken",
//           refreshTokenResponse.data.accessToken,
//         );
//         localStorage.setItem(
//           "refreshToken",
//           refreshTokenResponse.data.refreshToken,
//         );
//         localStorage.setItem(
//           "expiredTime",
//           String(Date.now() + refreshTokenResponse.data.expiresIn),
//         );

//         // 원래 요청을 새로운 토큰으로 재시도
//         originalRequest.headers.Authorization = `Bearer ${refreshTokenResponse.data.accessToken}`;
//         return api(originalRequest); // 원래 요청 다시 보내기
//       } catch (refreshError) {
//         // refreshToken이 만료되었거나 잘못된 경우 처리
//         if (
//           isAxiosError(refreshError) &&
//           refreshError.response?.status === 401
//         ) {
//           alert("인증이 만료되었습니다. 다시 로그인해주세요.");
//           localStorage.clear(); // 모든 토큰과 데이터를 삭제
//           window.location.replace("/login"); // 로그인 페이지로 리디렉트
//         }
//         return Promise.reject(refreshError); // 다른 에러 처리
//       }
//     }

//     return Promise.reject(error); // 401 외 다른 에러 처리
//   },
// );

// export default api;
