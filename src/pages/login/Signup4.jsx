import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getAddressInfo, selectSignup, selectaddress} from "../../features/main/mainSlice";
import axios from "axios";

function Signup4() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = useSelector(selectSignup);
  const address = useSelector(selectaddress);
  const [value, setValue] = useState(``);
  const handleAddressChange = (e) => {
    setValue(e.target.value);
  };
  
  const [value2, setValue2] = useState(``);
  const handleDongChange = (e) => {
    setValue2(e.target.value);
  };

  const [value3, setValue3] = useState(``);
  const handleHosuChange = (e) => {
    setValue3(e.target.value);
  };
  
  const [value4, setValue4] = useState('');

  useEffect(() => {
    if (address.length == 0) return; 
    const exportsignup = async () => {
      try {
        const response = await axios.post('http://localhost:8080/login/signup4', {
          ...signup.birthdateAndSex,
          name: signup.name,
          ...signup.idpw,
          ...signup.address
        });
        
        if (response.status === 201) {
          alert("회원가입 처리되었습니다.");
          navigate('/');
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
    return () => {
      
    };
  }, [address]);

  const overInfo = () => {
    dispatch(getAddressInfo({ address: `${value}`, dong: `${value2}`, hosu: `${value3}` ,role : `${value4}`}));
  };
  
  
  return (
    <>
      <h1>
        정보 입력
      </h1>
      {/* 지도랑 연동하여 주소확인하기 */}
      <div>
        <label htmlFor="loginId">주소:</label>
        <Form.Control type="text" placeholder="주소" value={value} onChange={handleAddressChange}/>
      </div>
      <div>
        <label htmlFor="loginId">동 :</label>
        <Form.Control type="text" placeholder="동" value={value2} onChange={handleDongChange}/>
      </div>
      <div>
        <label htmlFor="loginId">호수 :</label>
        <Form.Control type="text" placeholder="호수" value={value3} onChange={handleHosuChange}/>
      </div>
      <select value={value4} onChange={(e) => setValue4(e.target.value)}>
          <option value="">선택</option>
          {<option>ROLE_USER</option>}
          {<option>ROLE_ADMIN</option>} 
      </select>
      <div>
        <Button type="button" onClick={overInfo}>완료</Button>
      </div>
    </>
  );
};

export default Signup4;