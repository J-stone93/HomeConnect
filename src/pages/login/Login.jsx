import {Reset} from "styled-reset";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
position: fixed;
width: 100%;
height: 100%;
display: flex;
background-image: url("/image/apartment.jpg");
background-position: center;
background-repeat: no-repeat;
background-size: cover;
font-family: "Pretendard-Regular";
`;

function Login() {

  return (
    <>
      <Reset/>
      <Wrapper>
        <Outlet/>
      </Wrapper>
    </>
  );
};

export default Login;

// 나중에 toast넣어도 괜찮을듯 
// 아이디 문자열 오류나 그런것들도 구현하면 될듯