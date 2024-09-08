import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { postLogin, postSignUp } from "src/api/authapi";

type SignUpDataType = {
  nickname: string;
  email: string;
  password: string;
  reCheckPw: string;
};

type LoginDataType = {
  email: string;
  password: string;
};

type APIErrorResponse = {
  message: string;
  error?: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

type DataContextType = {
  signUpData: SignUpDataType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpDataType>>;
  signUpMutate: UseMutationResult<void, AxiosError, SignUpDataType>;
  loginData: LoginDataType;
  setLoginData: React.Dispatch<React.SetStateAction<LoginDataType>>;
  loginMutate: UseMutationResult<
    AxiosResponse<LoginResponse>,
    AxiosError,
    LoginDataType
  >;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [signUpData, setSignUpData] = useState<SignUpDataType>({
    nickname: "",
    email: "",
    password: "",
    reCheckPw: "",
  });

  const signUpMutate = useMutation<
    void,
    AxiosError<APIErrorResponse>,
    SignUpDataType
  >({
    mutationFn: async (data) => {
      await postSignUp(data);
    },
    onSuccess: () => {
      alert("성공적으로 가입되었습니다.");
      window.location.replace("/login");
    },
    onError: (error) => {
      const errorMessage = isAxiosError(error)
        ? error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        : "네트워크 오류가 발생했습니다.";
      alert(`가입에 실패했습니다. ${errorMessage}`);
    },
  });

  const [loginData, setLoginData] = useState<LoginDataType>({
    email: "",
    password: "",
  });

  const loginMutate = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<APIErrorResponse>,
    LoginDataType
  >({
    mutationFn: async (data) => {
      return await postLogin(data);
    },
    onSuccess: (res) => {
      const { accessToken, refreshToken, expiresIn } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiredTime", (Date.now() + expiresIn).toString());

      alert("로그인 되었습니다.");
      window.location.replace("/boards"); //로그인 성공하면 boards 페이지로 이동, 근데 대신 LoginPage에서 navigate를 사용하면 작동이 안됨
    },
    onError: (error) => {
      const errorMessage = isAxiosError(error)
        ? error.response?.data?.error || "알 수 없는 오류가 발생했습니다."
        : "네트워크 오류가 발생했습니다.";
      alert(`로그인에 실패했습니다. ${errorMessage}`);
    },
  });

  return (
    <DataContext.Provider
      value={{
        signUpData,
        setSignUpData,
        signUpMutate,
        loginData,
        setLoginData,
        loginMutate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
