import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNameInfo } from "../../features/main/mainSlice";
import { addProduct } from "../../api/productAPI";
import styled from "styled-components";
import axios from "axios";


const Container = styled.form`
  width: 700px;
  height: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #edfbfff7;
  margin: auto;
  border-radius: 3rem;
  flex-direction: column;

  .form-control{
    width: 400px;
    height: 50px;
    margin-bottom: 40px;
  }

  .form-select{
    width: 400px;
    height: 50px;
    margin-bottom: 40px;
  }

  .btn-dark{
    width: 80px;
    height: 50px;
    margin-left: 20px;
  }

  .btn-primary{
    width: 400px;
    height: 50px;
    margin-bottom: 40px;
  }

  div{
    display: flex;
  }

  .sizeControl{
    width: 300px;
  }


`;

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState(``);
  const [value2, setValue2] = useState(``);
  const [value3, setValue3] = useState(``);
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('');
  const [pw6, setPw6] = useState('');
  const [iDCheck, setiDCheck] = useState(false);


  const handleNameChange = (e) => {
    setValue(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setValue2(formatDate(e.target.value));
  };

  const handleSexChange = (e) => {
    setValue3(e.target.value);
  };

  const handleAddressChange = (e) => {
    setValue4(e.target.value);
  };

  const handleIDChange = (e) => {
    setValue5(e.target.value);
  };

  const handlePWChange = (e) => {
    setValue6(e.target.value);
  };  

  const handleRoleChange = (e) => {
    setValue7(e.target.value)
  };

  const handleVerification = () => {
    const exportduplication = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/login/idcheck??userId=${value5}`);
        if (response.status === 200) {
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
    if(!value) {
      return alert("이름을 입력해주세요.");
    } else if(!value2.length==10) {
      return alert("생년월일을 입력해주세요.");
    } else if (!(value2.slice(5,7)<=12 && value2.slice(5,7)>=1)) {
      return alert("생년월일이 잘못되었습니다.");
    } else if (!(value2.slice(8,10)<=31 && value2.slice(8,10)>=1)) {
      return alert("생년월일이 잘못되었습니다.");
    } else if ((value3=="성별")) {
      return alert("성별을 입력해주세요");
    } else if (!(value4)) { 
      return alert("주소를 입력해주세요.");
    } else if (!(value5)) {
      return alert("아이디를 입력해주세요");
    } else if (!(pw6==value6)){
      return alert("비밀번호를 재확인해주세요");
    } else if (!(value6)) { 
      return alert("비밀번호를 입력해주세요");
    } else if ((value7=="권한")) { 
      return alert("권한을 설정해주세요");
    }

  };

  return (
    <Container>
      <Form.Control type="text" placeholder="이름" value={value} onChange={handleNameChange}/>
      <Form.Control type="data" placeholder="생년월일" value={value2} onChange={handleBirthdayChange}/>
      <Form.Select placeholder="성별" value={value3} onChange={handleSexChange}> 
        <option>성별</option>
        <option value="남자">남자</option>
        <option value="여자">여자</option>
      </Form.Select>
      <Form.Control type="text" placeholder="주소" value={value4} onChange={handleAddressChange}/>
      <div>
        <Form.Control className="sizeControl" type="text" placeholder="ID" value={value5} onChange={handleIDChange} />
        <Button variant="dark" onClick={handleVerification}>확인</Button>
      </div>
      <Form.Control type="password" placeholder="password" value={pw6} onChange={(e)=> setPw6(e.target.value)} />
      <Form.Control type="password" placeholder="password reconfirm" value={value6} onChange={handlePWChange}/>
      <Form.Select placeholder="권한" value={value7} onChange={handleRoleChange}> 
        <option>권한</option>
        <option value="ROLE_USER">ROLE_USER</option>
        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
      </Form.Select>
      <Button type="button" onClick={()=>overInfo()}>완료</Button>
    </Container>
  );
};

export default SignUp;