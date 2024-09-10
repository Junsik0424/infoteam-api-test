import api from "./api";

export interface UserData {
  nickname: string;
  email: string;
  password: string;
  reCheckPw?: string;
}

export type signUpDataType = UserData;

export type loginDataType = Omit<UserData, "nickname">;

const postSignUp = ({
  nickname,
  email,
  password,
  reCheckPw,
}: signUpDataType) => {
  const sginUpData = {
    nickname: nickname,
    email: email,
    password: password,
    reCheckPw: reCheckPw,
  };
  return api.post(`/auth/register`, sginUpData);
};

const postLogin = ({ email, password }: loginDataType) => {
  const loginData = { email: email, password: password };
  return api.post(`/auth/login`, loginData);
};

export const tryRefreshToken = (data: { refreshToken: string }) => {
  return api.post(`/auth/refresh`, data);
};

export { postLogin, postSignUp };
