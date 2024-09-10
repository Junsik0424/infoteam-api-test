// import { useState } from "react";
// import { checkSignUp } from "src/pages/SignUp/CheckSignup.tsx";
// import styled from "styled-components";

// import { useData } from "../../context/AuthContext";

// const EntireDiv = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   background-color: #f0f0f0;
// `;

// const Input = styled.input`
//   margin: 10px;
//   padding: 10px;
//   width: 300px;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   margin: 20px;
//   padding: 10px 20px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
// `;

// const ErrorMessage = styled.div`
//   color: red;
//   margin-top: 10px;
// `;

// const SignUpPage = () => {
//   const { signUpData, setSignUpData, signUpMutate } = useData();
//   const [email, setEmail] = useState(signUpData?.email || "");
//   const [password, setPassword] = useState(signUpData?.password || "");
//   const [nickname, setNickname] = useState(signUpData?.nickname || "");
//   const [reCheckPw, setReCheckPw] = useState(signUpData?.reCheckPw || "");
//   const [error, setError] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "email") setEmail(value);
//     else if (name === "password") setPassword(value);
//     else if (name === "nickname") setNickname(value);
//     else if (name === "reCheckPw") setReCheckPw(value);
//   };

//   const handleSignUpSubmit = async () => {
//     const updatedSignUpData = { email, password, nickname, reCheckPw };
//     if (!checkSignUp(updatedSignUpData)) {
//       setError("모두 입력해주세요.");
//       return;
//     }
//     if (password !== reCheckPw) {
//       setError("비밀번호가 일치하지 않습니다.");
//       return;
//     }

//     try {
//       setSignUpData(updatedSignUpData);
//       await signUpMutate.mutateAsync(updatedSignUpData);
//     } catch (e) {
//       console.log(e);
//       setError("회원가입에 실패했습니다. 다시 시도해주세요.");
//     }
//   };

//   return (
//     <EntireDiv>
//       <h1>회원가입 페이지</h1>
//       <Input
//         type="password"
//         name="nickname"
//         value={nickname}
//         placeholder="Confirm your nickname"
//         onChange={handleInputChange}
//       />
//       <Input
//         type="email"
//         name="email"
//         value={email}
//         placeholder="Enter your email"
//         onChange={handleInputChange}
//       />
//       <Input
//         type="password"
//         name="password"
//         value={password}
//         placeholder="Enter your password"
//         onChange={handleInputChange}
//       />
//       <Input
//         type="reCheckPw"
//         name="reCheckPw"
//         value={reCheckPw}
//         placeholder="Re-enter your password"
//         onChange={handleInputChange}
//       />

//       {error && <ErrorMessage>{error}</ErrorMessage>}
//       <Button onClick={handleSignUpSubmit}>회원가입</Button>
//     </EntireDiv>
//   );
// };

// export default SignUpPage;

import { useState } from "react";
import { checkSignUp } from "src/pages/SignUp/CheckSignup.tsx";
import styled from "styled-components";

import { useData } from "../../context/AuthContext";

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

const SignUpPage = () => {
  const { signUpData, signUpMutate } = useData();
  const [email, setEmail] = useState(signUpData?.email || "");
  const [password, setPassword] = useState(signUpData?.password || "");
  const [nickname, setNickname] = useState(signUpData?.nickname || "");
  const [reCheckPw, setReCheckPw] = useState(signUpData?.reCheckPw || "");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "nickname") setNickname(value);
    else if (name === "reCheckPw") setReCheckPw(value);
  };

  const handleSignUpSubmit = async () => {
    const updatedSignUpData = { email, password, nickname, reCheckPw };
    if (!checkSignUp(updatedSignUpData)) {
      setError("모두 입력해주세요.");
      return;
    }
    if (password !== reCheckPw) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signUpMutate.mutateAsync();
    } catch (e) {
      console.log(e);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <EntireDiv>
      <h1>회원가입 페이지</h1>
      <Input
        type="password"
        name="nickname"
        value={nickname}
        placeholder="Confirm your nickname"
        onChange={handleInputChange}
      />
      <Input
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email"
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password"
        onChange={handleInputChange}
      />
      <Input
        type="reCheckPw"
        name="reCheckPw"
        value={reCheckPw}
        placeholder="Re-enter your password"
        onChange={handleInputChange}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={handleSignUpSubmit}>회원가입</Button>
    </EntireDiv>
  );
};

export default SignUpPage;
