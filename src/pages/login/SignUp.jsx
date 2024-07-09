import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNameInfo } from "../../features/main/mainSlice";
import { addProduct } from "../../api/productAPI";
import styled from "styled-components";
import axios from "axios";

const Container = styled.form`
  width: 80%;
  max-width: 700px;
  height: auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  margin: auto;
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-direction: column;

  .form-control, .form-select {
    width: 100%;
    max-width: 400px;
    height: 50px;
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ced4da;
    padding: 0 1rem;
    font-size: 1rem;
  }

  .form-control:focus, .form-select:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .btn-dark, .btn-primary {
    width: 100%;
    max-width: 400px;
    height: 50px;
    border-radius: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .btn-dark {
    max-width: 80px;
    margin-left: 1rem;
  }

  div {
    display: flex;
    width: 100%;
    max-width: 400px;
  }

  .sizeControl {
    flex: 1;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }

  span {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .show {
    opacity: 1;
  }

  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #343a40;
  }
`;

function SignUp() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(``);
  const [sex, setSex] = useState('');
  const [address, setaddress] = useState(``);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [role, setRole] = useState('');
  const [pw6, setPw6] = useState('');
  const [iDCheck, setiDCheck] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(formatDate(e.target.value));
  };

  const handleSexChange = (e) => {
    setSex(e.target.value);
  };

  const handleAddressChange = (e) => {
    setaddress(e.target.value);
  };

  const handleIDChange = (e) => {
    setId(e.target.value);
  };

  const handlePWChange = (e) => {
    setPw(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleVerification = () => {
    const exportduplication = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/login/idcheck?userId=${id}`);
        if (response.status === 201) {
          if(response.data === "사용가능한 아이디입니다."){
            setiDCheck(true);
          }
          if(response.data === "아이디가 중복되었습니다."){
            setiDCheck(false);
          }
          return alert(response.data);
        } else {
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    exportduplication();
  };

  const formatDate = (value) => {
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 4) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 4)}-${digits.slice(4, 6)}`;
    } else {
      return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
    }
  };

  const overInfo = () => {
    if (!name) {
      return alert("이름을 입력해주세요.");
    } else if (birthday.length !== 10) {
      return alert("생년월일을 입력해주세요.");
    } else if (!(birthday.slice(5, 7) <= 12 && birthday.slice(5, 7) >= 1)) {
      return alert("생년월일이 잘못되었습니다.");
    } else if (!(birthday.slice(8, 10) <= 31 && birthday.slice(8, 10) >= 1)) {
      return alert("생년월일이 잘못되었습니다.");
    } else if (sex === "성별") {
      return alert("성별을 입력해주세요");
    } else if (!address) {
      return alert("주소를 입력해주세요.");
    } else if (!id) {
      return alert("아이디를 입력해주세요");
    } else if (iDCheck === false) {
      return alert("아이디 중복체크를 해주세요");
    } else if (pw6 !== pw) {
      return alert("비밀번호를 재확인해주세요");
    } else if (!pw) {
      return alert("비밀번호를 입력해주세요");
    } else if (role === "권한") {
      return alert("권한을 설정해주세요");
    }

    const exportsignup = async () => {
      try {
        const response = await axios.post('http://localhost:8080/login/signup', {
          "name" : name,
          "birthdate" : birthday,
          "sex" : sex,
          "address" : address,
          "userId" : id,
          "pw" : pw,
          "role" : role
        });
        if (response.status === 201) {
          alert("회원가입 처리되었습니다.");
          navigate('/login');
          return response.data;
        } else {
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    exportsignup();

  };

  return (
    <Container>
      <h2>회원가입</h2>
      <Form.Control type="text" placeholder="이름" value={name} onChange={handleNameChange} />
      <Form.Control type="date" placeholder="생년월일" value={birthday} onChange={handleBirthdayChange} />
      <Form.Select placeholder="성별" value={sex} onChange={handleSexChange}>
        <option>성별</option>
        <option value="남자">남자</option>
        <option value="여자">여자</option>
      </Form.Select>
      <Form.Control type="text" placeholder="주소" value={address} onChange={handleAddressChange} />
      <div>
        <Form.Control className="sizeControl" type="text" placeholder="ID" value={id} onChange={handleIDChange} />
        <Button variant="dark" onClick={handleVerification}>확인</Button>
      </div>
      <span className={iDCheck ? "show" : ""}>
        {iDCheck &&
          <>
            <Form.Control type="password" placeholder="password" value={pw6} onChange={(e) => setPw6(e.target.value)} />
            <Form.Control type="password" placeholder="password reconfirm" value={pw} onChange={handlePWChange} />
            <Form.Select placeholder="권한" value={role} onChange={handleRoleChange}>
              <option>권한</option>
              <option value="ROLE_USER">ROLE_USER</option>
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            </Form.Select>
          </>
        }
      </span>
      <Button type="button" onClick={overInfo}>완료</Button>
    </Container>
  );
}

export default SignUp;
