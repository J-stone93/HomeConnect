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


label {
  width: 100px;
  text-align : right ;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  display: flex;
  font-size: 50px;
  position: absolute;
  top: 130px;
}

Button {
  margin-top: 50px;
  margin-left: 4px;
  
}

div{
  display: flex;
  margin-top: 20px;
}

input{
  margin-left: 10px;
}


`;

// const Container = styled.form`
//   display: flex;
//   width: 500px;
//   height: 700px;
//   background-color: white;
//   margin: auto;
//   opacity: 0.9;
//   border-radius: 3cap;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   position: relative;
// `;



function Login() {

  return (
    <>
      <Reset/>
      <Wrapper>
        {/* <Container> */}

          <Outlet/>

        {/* </Container> */}
      </Wrapper>
    </>
  );
};

export default Login;

// 나중에 toast넣어도 괜찮을듯 
// 아이디 문자열 오류나 그런것들도 구현하면 될듯