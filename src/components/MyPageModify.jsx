import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { PiUserCheckBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { getmyInfo, selectmyInfo } from "../features/main/mainSlice";


function MyPageModify(props) {

  const {value , setShowModify} = props;
  const [state, setState] = useState(value);
  const user = useSelector(selectmyInfo);
  const dispatch = useDispatch();

  const handleNameModify = () => {
    const modifyName = async () => {
      try {
        const response = await axios.put(`http://homeconnectserver.shop:8080/login/nameModify`, {
          "userId": user.userId,
          "name": state
        }, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
          const userInfo = JSON.parse((localStorage.getItem('user')));
          dispatch(getmyInfo(userInfo));
          alert("이름이 수정되었습니다");
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.error(err);
      }
    };
    modifyName();
    setShowModify(false);
  };

  const handleAddressModify = () => {
    const modifyAddress = async () => {
      try {
        const response = await axios.put(`http://homeconnectserver.shop:8080/login/addressModify`, {
          "userId": user.userId,
          "address": state
        }, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
          const userInfo = JSON.parse((localStorage.getItem('user')));
          dispatch(getmyInfo(userInfo));
          alert("주소가 수정되었습니다");
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.error(err);
      }
    };
    modifyAddress();
    setShowModify(false);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control className='textcenter' value={state} onChange={(e)=>setState(e.target.value)}/>
      <Button variant="outline-secondary" className='sizeAdjust'>
        {value === user.name &&
          <PiUserCheckBold size={24} onClick={()=>handleNameModify()} /> 
        }
        {value === user.address &&
          <PiUserCheckBold size={24} onClick={()=>handleAddressModify()} /> 
        }
      </Button>
    </InputGroup>
  );
};

export default MyPageModify;