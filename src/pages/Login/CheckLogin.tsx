import { loginDataType } from "src/api/authapi";

const checkLogin = (loginData: loginDataType) => {
  const { email, password } = loginData;

  if (!email) return alert("이메일을 입력해주세요");
  if (!password) return alert("비밀번호를 입력해주세요");

  return true;
};

export default checkLogin;
