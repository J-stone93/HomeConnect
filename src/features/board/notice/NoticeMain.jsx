import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectmyInfo } from "../../main/mainSlice";
import axios from "axios";
import BasicCalendar from "../../../components/calendar/BasicCalendar";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 50%;
  max-width: 800px;
  margin-top: 50px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputField = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
  resize: vertical;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled(Button)`
  width: 48%;
  height: 50px;
  font-size: 18px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  width: 48%;
  height: 50px;
  font-size: 18px;
  background-color: #6c757d;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

function NoticeMain() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const addNoticeContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/notice/register',
        {
          "no": 0,
          "title": title,
          "content": content,
          "noticeDate" : date,
        },
        {
          headers: {
            Authorization: token
          }
        });
      if (response.status === 200) {
        setTitle('');
        setContent('');
        setShowModal(false);
        return navigate('/boardlist');
      } else {
        setShowModal(false);
        alert("등록에 실패했습니다. 다시 시도해 주세요.");
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="title"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={handleChange}
              required
            />
            <TextArea
              name="content"
              placeholder="내용을 입력하세요."
              value={content}
              onChange={handleChange}
              required
            />
            <ButtonContainer>
              <SubmitButton type="submit">등록</SubmitButton>
              <CancelButton onClick={() => navigate('/boardlist')}>취소</CancelButton>
            </ButtonContainer>
          </Form>
        </Container>
        <BasicCalendar setDate = {setDate} />
      
      </Wrapper>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>등록 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>공지를 등록하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton onClick={addNoticeContent}>확인</SubmitButton>
          <CancelButton onClick={handleModalClose}>취소</CancelButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NoticeMain;