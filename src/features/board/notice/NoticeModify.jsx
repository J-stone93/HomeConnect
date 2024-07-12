import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { addressKey } from "../../..";

const Container = styled.div`
width: 80%;
max-width: 800px;
margin: 50px auto;
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

function NoticeModify() {
 
  const {noticeId} = useParams();
  const [title, setTitle] = useState(``);
  const [content, setContent] = useState(``);
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

  const modifyNoticeContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${addressKey}/notice/modify`,
        { 
          "no": noticeId,
          "title": title,
          "content": content,
        },
        {
          headers : {
          Authorization : token
          } 
        });
      if (response.status === 200) {
        setShowModal(false);
        navigate('/boardlist');
      } else {
        setShowModal(false);
        alert("오류 발생.");
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const importNoticeContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${addressKey}/notice/read?no=${noticeId}`,
          {
            headers : {
            Authorization : token
            } 
          });
        if (response.status === 200) {
          setTitle(response.data.title);
          setContent(response.data.content);
        } else {
          alert("긁어오기 실패");
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    importNoticeContent();
  }, []);

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
          <TextArea
            name="content"
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

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>수정 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>공지를 수정하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton onClick={modifyNoticeContent}>확인</SubmitButton>
          <CancelButton onClick={handleModalClose}>취소</CancelButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NoticeModify;