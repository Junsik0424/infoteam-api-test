import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useData } from "../../context/AuthContext";
import checkLogin from "./CheckLogin";

const EntireDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f0f0f0;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  margin: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const LoginPage = () => {
  // const navigate = useNavigate();
  const { loginData, setLoginData, loginMutate } = useData();
  const [email, setEmail] = useState(loginData?.email || "");
  const [password, setPassword] = useState(loginData?.password || "");
  const [error, setError] = useState("");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleLoginSubmit = async () => {
    const updatedLoginData = { email, password };
    if (!checkLogin(updatedLoginData)) {
      setError("이메일 또는 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoginData(updatedLoginData);
      await loginMutate.mutateAsync(updatedLoginData);
      // navigate("/boards");
    } catch (e) {
      console.log(e);
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <EntireDiv>
      <h1>로그인 페이지</h1>
      <Input
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email"
        onChange={handleLoginChange}
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password"
        onChange={handleLoginChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={handleLoginSubmit}>로그인</Button>
    </EntireDiv>
  );
};

export default LoginPage;
