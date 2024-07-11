import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { PiUserCheckBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { selectmyInfo } from "../features/main/mainSlice";


function MyPageModify(props) {

  const {value , setShowModify} = props;
  const [state, setState] = useState(value);
  const user = useSelector(selectmyInfo);

  const handleModify = () => {
    // if(state === )
  };

  const handleNameModify = () => {
    const modifyName = async () => {
      try {
        const response = await axios.put(`http://localhost:8080/login/modify`, {
          "userId": user.userId,
          "name": state
        }, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        if (response.status === 200) {
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

  return (
    <InputGroup className="mb-3">
      <Form.Control className='textcenter' value={state} onChange={(e)=>setState(e.target.value)}/>
      <Button variant="outline-secondary" className='sizeAdjust'>
        {value === user.name &&
          <PiUserCheckBold size={24} onClick={()=>handleNameModify()} /> 
        }
      </Button>
    </InputGroup>
  );
};

export default MyPageModify;