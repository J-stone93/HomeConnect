import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getmyInfo } from "../../features/main/mainSlice";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import styled from "styled-components";

const Container = styled.form`
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #edfbfff7;
  margin: auto;
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .input-group {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1.5rem;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
  }

  .input-group-icon {
    color: #495057;
    margin-right: 0.5rem;
  }

  .form-control {
    border: none;
    box-shadow: none;
  }

  .form-control:focus {
    border: none;
    box-shadow: none;
  }

  .btn-dark {
    width: 100%;
    height: 50px;
    border-radius: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .btn-primary {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }

  .register-link {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
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

  const enterLogin = (e) => {
    if (e.key === 'Enter') {
      handleSubmitINFO();
    }
  };

  const handleSubmitINFO = () => {
    const myInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/login?userId=${IDvalue}&pw=${PWvalue}`);
        if (!response.data) return alert("아이디나 비밀번호를 확인해주세요");
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          const userInfo = JSON.parse((localStorage.getItem('user')));
          console.log(userInfo);
          dispatch(getmyInfo(userInfo));
          alert("환영합니다!");
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
    <Container onKeyDown={enterLogin}>
      <div className="input-group">
        <FaUser className="input-group-icon" />
        <Form.Control type="text" placeholder="username" value={IDvalue} onChange={handleIDChange} />
      </div>
      <div className="input-group">
        <FaLock className="input-group-icon" />
        <Form.Control type="password" placeholder="password" value={PWvalue} onChange={handlePWChange}/>
      </div>
      <Button className="btn-dark" onClick={handleSubmitINFO}>로그인</Button>
      <div className="register-link">
        가입을 안하셨나요?
        <Button variant="primary" onClick={() => { navigate('/login/signup') }}>회원가입</Button>
      </div>
    </Container>
  );
};

export default Register;
