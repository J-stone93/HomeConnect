import React, { useRef, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectmyInfo } from "../../features/main/mainSlice";
import { selectCommunityList } from "../../features/community/communitySlice";
import { addressKey } from "../..";

const Wrapper = styled.form`
  margin: 100px auto;
  width: 70%;
  padding: 50px;
  background-color: #f8f9fa;
  border-radius: 20px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.input`
  width: 40%;
  height: 50px;
  margin: 0 auto 10px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
`;

const Content = styled.textarea`
  width: 100%;
  height: 300px;
  margin: 0 auto 10px;
  overflow: auto;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  resize: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FileLabel = styled.label`
  margin: 30px 5px 0px 10px;
  padding: 6px 25px;
  background-color:#00050aba;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #00000088;
    color: #fff;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const RegisterButton = styled(Button)`
  width: 100px; 
  height: 35px; 
  font-size: 16px;
  background-color: #00050aba;
  color: #fff;
  border: none;
  margin: 30px 5px; 

  &:hover {
    background-color: #00000088;
    color: #fff;
  }
`;

function CommunityRegister() {
  const category = useSelector(selectCommunityList);
  const navigate = useNavigate();
  const fileEl = useRef(null);
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [img, setImg] = useState(null);
  const user = useSelector(selectmyInfo);

  const handleTitleValues = (e) => {
    setTitleValue(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContentValue(e.target.value);
  };

  const handleChangFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImg(imageUrl);
  };

  const addCommunityContent = async (e) => {
    e.preventDefault(); // 폼 제출 동작 방지
    const files = fileEl.current.files;
    const token = localStorage.getItem('token');

    if (!titleValue || !contentValue || !img) {
      return alert('제목, 내용, 썸네일을 모두 등록해주세요');
    }

    const formData = new FormData();
    formData.append("no", 0);
    formData.append("title", titleValue);
    formData.append("content", contentValue);
    formData.append("writer", user.name);
    formData.append("uploadFile", files.length ? files[0] : null);
    formData.append("category", category);
    formData.append("Authorization", token);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }


    console.log(addressKey);
    
    try {
      const response = await axios.post(`${addressKey}/community/register`, formData, {
        headers:{
            Authorization: token
          },
      });
      console.log(response);
      if (response.status === 200 || response.status === 304) {
        navigate('/community');
      } else {
        throw new Error(`API 에러: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error: ", error.response);
    console.error("Error data: ", error.response.data);
    console.error("Error status: ", error.response.status);
    console.error("Error headers: ", error.response.headers);
    }
  };

  return (
    <Wrapper>
      <Title
        type="text"
        placeholder="모임제목"
        value={titleValue}
        onChange={handleTitleValues}
      />
      <Content
        type="text"
        placeholder="모임내용"
        value={contentValue}
        onChange={handleChangeContent}
      />
      <ButtonWrapper>
        <div style={{ display: "flex"}}>
          <img
            src={img}
            alt=""
            style={{ width: "100px", height: "100px", borderRadius: "25%" }} />
          <div>
            <FileLabel htmlFor="file-input">
              썸네일 업로드
            </FileLabel>
          </div>
        </div>

        <div>
          <FileInput
            ref={fileEl}
            type="file"
            id="file-input"
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleChangFile}
          />
          <Nav.Link>
            <RegisterButton type="button" onClick={addCommunityContent}>
              등록
            </RegisterButton>
            <RegisterButton type="button" onClick={() => navigate('/community')}>뒤로가기</RegisterButton>
          </Nav.Link>
        </div>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default CommunityRegister;
