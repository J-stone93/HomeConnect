import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  getmyInfo} from "../../features/main/mainSlice";
import axios from "axios";

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
    <>
      <h1>
        로그인
      </h1>
      <div>
        <label htmlFor="loginId">아이디:</label>
        <Form.Control type="text" placeholder="username" value={IDvalue} onChange={handleIDChange}/>
      </div>
      <div>
        <label htmlFor="loginId">패스워드:</label>
        <Form.Control type="password" placeholder="password" value={PWvalue} onChange={handlePWChange}/>
      </div>
      <div>
        <Button type="button" onClick={handleSubmitINFO}> 로그인 </Button>
        <Button type="button" variant="success" onClick={()=>{navigate('/login/signup')}}>회원가입</Button>
      </div>
    </>
  );
};

export default Register;