import styled from "styled-components";

import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled(Modal.Body)`
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.input`
  width: 100%;
  height: 50px;
  margin: 0 auto 10px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
`;

const ModalContent = styled.textarea`
  width: 100%;
  min-height: 400px;
  margin: 0 auto 10px;
  overflow: auto;
  padding: 10px;
  font-size: 16px;
  resize: none;
  border-radius: 12px;
`;


function CommunityModal(props) {
  const { showModal, handleModalClose, communityList, setcommunityList, communityId } = props;
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (communityList) {
      setTitleValue(communityList.title);
      setContentValue(communityList.content);
    }
  }, [communityList]);
  console.log(communityList);
  console.log(communityList);
  const handleChangeTitle = (e) => {
    setTitleValue(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContentValue(e.target.value);
  };

  const modifyComment = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/menu4/communitymodify`, {
        no: communityList.no,
        title: titleValue,
        content: contentValue
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      const communityListGet = await axios.get(`http://localhost:8080/menu4/communityread?no=${communityId}`, {
        headers: {Authorization: localStorage.getItem('token')}
      })
      if (response.status === 200) {
        setcommunityList(communityListGet);
        alert("게시글이 수정되었습니다.");
        navigate('/community');
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(contentValue);
  return (
    <Modal show={showModal} onHide={handleModalClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>모임 내용 수정</Modal.Title>
      </Modal.Header>
      <Container>
        <ModalTitle
          Value={titleValue}
          onChange={handleChangeTitle}
        />
        <ModalContent
          defaultValue={contentValue}
          onChange={handleChangeContent}
        />
      </Container>
      <Modal.Footer>
        {/* <Button variant="primary" onClick={addBoardComment}> */}
        <Button variant="primary" onClick={modifyComment}>
          확인
        </Button>
        <Button variant="secondary" onClick={handleModalClose}>
        {/* <Button variant="secondary"> */}
          취소
        </Button>
      </Modal.Footer>
    </Modal >
  );
};

export default CommunityModal;