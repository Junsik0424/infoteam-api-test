import { signUpDataType } from "src/api/authapi";

export function checkSignUp(signUpData: signUpDataType) {
  const { nickname, email, password, reCheckPw } = signUpData;

  if (!nickname) return alert("닉네임을 입력해주세요");
  if (!email) return alert("이메일을 입력해주세요");
  if (!password) return alert("비밀번호를 입력해주세요");
  if (!reCheckPw) return alert("비밀번호를 다시 입력해주세요");

  return true;
}
