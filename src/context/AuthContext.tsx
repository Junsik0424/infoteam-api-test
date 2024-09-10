import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import { createContext, ReactNode, useContext } from "react";
import { postLogin, postSignUp, signUpDataType } from "src/api/authapi";

type loginDataType = {
  email: string;
  password: string;
};

type DataContextType = {
  signUpData: signUpDataType;
  signUpMutate: UseMutationResult<unknown, unknown, void, unknown>;
  loginData: loginDataType;
  loginMutate: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    void,
    unknown
  >;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDice must be used within a DiceProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const signUpData: signUpDataType = {
    nickname: "",
    email: "",
    password: "",
    reCheckPw: "",
  };
  const signUpMutate = useMutation({
    mutationFn: () => postSignUp(signUpData),

    onSuccess: () => {
      alert("성공적으로 가입되었습니다.");

      window.location.replace("/login");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        alert(
          `가입에 실패했습니다. ${error.status} ${error.response?.statusText}`,
        );
      }
    },
  });
  const loginData: signUpDataType = {
    nickname: "",
    email: "",
    password: "",
  };
  const loginMutate = useMutation({
    mutationFn: () => postLogin(loginData),

    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("expiredTime", Date.now() + res.data.expiresIn);

      alert("로그인 되었습니다.");
      window.location.replace("/boards");
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        alert(
          `가입에 실패했습니다. ${error.status} ${error.response?.statusText}`,
        );
      }
    },
  });

  return (
    <DataContext.Provider
      value={{
        signUpData,
        signUpMutate,
        loginData,
        loginMutate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
