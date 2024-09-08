import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EntireDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url("src/assets/homepageImg.png");
  background-size: 100%;
`;

const AuthDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 80px;
  position: absolute;
  top: 20px;
  right: 0;
  left: 0;
  gap: 100px;
`;

const AuthButton = styled.button`
  font-size: 25px;
  margin-right: 20px;
  background-color: transparent;
  border: none;

  &:hover {
    color: #3946fe;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <EntireDiv>
      <AuthDiv>
        <AuthButton onClick={() => navigate("/login")}>로그인</AuthButton>
        <AuthButton onClick={() => navigate("/register")}>회원가입</AuthButton>
      </AuthDiv>
    </EntireDiv>
  );
};
export default HomePage;
