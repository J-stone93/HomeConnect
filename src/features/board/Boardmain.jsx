import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { selectmyInfo } from '../main/mainSlice';

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardHeader = styled.input`
  width: 1000px;
  height: 50px;
  margin: 0 auto 10px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
`;

const Board = styled.textarea`
  width: 1000px;
  height: 300px;
  margin: 0 auto 10px;
  overflow: auto;
  padding: 10px;
  font-size: 16px;
`;

const BoardButton = styled(Button)`
  width: 100px; 
  height: 35px; 
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  margin: 30px 5px; 

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;

function Boardmain() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectmyInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    setShowModal(true); // Modal 열기
  };

  const addBoardComment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/menu4/board',
        { 
          "no": 0,
          "title": title,
          "content": content,
        },
        {
          headers : {
          Authorization : token
          } 
        });
      if (response.status === 200) {
        setTitle('');
        setContent('');
        setShowModal(false);
        return navigate('/menu4/boardlist');
      } else {
        setShowModal(false);
        alert("오류 발생");
        throw new Error(`api error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container onSubmit={handleSubmit}>
        <BoardHeader
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={handleChange}
        />
        <Board
          name="content"
          placeholder="내용을 입력하세요."
          value={content}
          onChange={handleChange}
          required
        />
        <div>
          <BoardButton type="submit">등록</BoardButton>
          <BoardButton onClick={() => navigate('/menu4/boardlist')}>목록으로</BoardButton>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>등록 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>등록하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addBoardComment}>
          확인
        </Button>
        <Button variant="secondary" onClick={handleModalClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal >
    </>
  );
}

export default Boardmain;

