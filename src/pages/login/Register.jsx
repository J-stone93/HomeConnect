import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  getmyInfo} from "../../features/main/mainSlice";
import { GoPerson , GoLock  } from "react-icons/go";
import { GoPersonFill } from "react-icons/go";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import styled from "styled-components";


const Container = styled.form`
  display: flex;
  width: 600px;
  height: 600px;
  background-color: #edfbff;
  margin: auto;
  opacity: 0.9;
  border-radius: 3cap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  
  input{
    background-color: transparent;
    border: none;
  }

  .bottomline{
    border-bottom: 1px solid #8b888f;
    padding: 10px;
  }

  .iconsize{
    width: 50px;
    height: 50px;
  }

  .sizeup{
    width: 300px;
    height: 70x;
  }
  .sizeup2{
    width: 380px;
    font-size: 20px;
  }
  .sizeup3{
    width: 380px;
    height: 100x;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 33px;
  }
  .buttonStyle{
    /* position: relative;
    bottom: 30px; */
    margin: auto 0;
    margin-left: 8px;
  }


`;


function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [IDvalue, setIDvalue] = useState('');
  const [PWvalue, setPWvalue] = useState('');

  const handleIDChange = (e) => {
    setIDvalue(e.target.value);
  };

  const handlePWChange = (e) => {
    setPWvalue(e.target.value);
  };

  const handleSubmitINFO = () => {
    const myInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/login?userId=${IDvalue}&pw=${PWvalue}`);
          console.log(response.data);
          if(!response.data) return alert("아이디나 비밀번호를 확인해주세요");
          if (response.status === 200) {
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            alert("로그인 성공");
            navigate('/');
          } else { 
            alert("오류 발생");
            throw new Error(`api error: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          alert("오류 발생");
          console.error(error);
        }
      };
    myInfo();
  };

  return (
    <Container>
      {/* <div className="h1design">
        환영합니다
      </div> */}
      <div className="bottomline">
        <div>
          <GoPerson className="iconsize"/>
        </div>
        <div>
          <Form.Control className="sizeup" type="text" placeholder="username" value={IDvalue} onChange={handleIDChange}/>
        </div>
      </div>
      <div className="bottomline">
        <div>
          <GoLock  className="iconsize"/>
        </div>
        <div>
          <Form.Control className="sizeup" type="password" placeholder="password" value={PWvalue} onChange={handlePWChange}/>
        </div>
      </div>
      <div>
        <Button className="sizeup2" variant="dark" onClick={handleSubmitINFO}>로그인</Button>
      </div>
      <div className="sizeup3">
        가입을 안하셨나요?
        <Button className="buttonStyle" type="button" variant="primary" onClick={()=>{navigate('/login/signup')}}>회원가입</Button> 
      </div>
    </Container>
  );
};

export default Register;