import styled from "styled-components";

import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled(Modal.Body)`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 12px;
  &:focus {
    outline: none;
    border-color: #8d8d8d; 
  }
`;

const ModalContent = styled.textarea`
  width: 100%;
  min-height: 400px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  resize: none; /* 세로 크기 조절 허용 */
  border: 2px solid #ccc;
  border-radius: 12px;
  &:focus {
    outline: none;
    border-color: #8d8d8d; 
  }
`;

const ModalFooter = styled(Modal.Footer)`
  justify-content: center;
`;

const ModalButton = styled.button`
  width: 100px;
  height: 35px;
  margin: 0 5px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

function CommunityModal(props) {
  const { showModal, handleModalClose, communityList, setCommunityList, communityId } = props;
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (communityList) {
      setTitleValue(communityList.title);
      setContentValue(communityList.content);
    }
  }, [communityList]);

  const handleChangeTitle = (e) => {
    setTitleValue(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContentValue(e.target.value);
  };

  const modifyComment = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.put(
        `http://homeconnectserver.shop:8080/community/modify`,
        {
          no: communityList.no,
          title: titleValue,
          content: contentValue
        },
        {
          headers: { Authorization: token }
        }
      );
  
      if (response.status === 200) {
        const communityListGet = await axios.get(
          `http://homeconnectserver.shop:8080/community/read?no=${communityId}`,
          {
            headers: { Authorization: token }
          }
        );
  
        if (communityListGet.status === 200) {
          setCommunityList(communityListGet.data);
          alert("게시글이 수정되었습니다.");
          handleModalClose();
          navigate('/community');
        } else {
          throw new Error(`API error: ${communityListGet.status} ${communityListGet.statusText}`);
        }
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error("Error occurred during modification:", err);
    }
  };

  return (
    <Modal show={showModal} onHide={handleModalClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>모임 내용 수정</Modal.Title>
      </Modal.Header>
      <Container>
        <ModalTitle
          value={titleValue}
          onChange={handleChangeTitle}
          placeholder="제목을 입력하세요"
        />
        <ModalContent
          value={contentValue}
          onChange={handleChangeContent}
          placeholder="내용을 입력하세요"
        />
      </Container>
      <ModalFooter>
        <ModalButton onClick={modifyComment}>
          확인
        </ModalButton>
        <ModalButton onClick={handleModalClose}>
          취소
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default CommunityModal;