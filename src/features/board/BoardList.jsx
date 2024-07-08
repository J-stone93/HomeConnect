import { json, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectmyInfo } from "../main/mainSlice";

const TableWrapper = styled(Table)`
  text-align: left;
  margin-top: 20px;
  width: 80%;
  font-size: 16px;
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0 10px;

  thead th {
    background-color: #f8f9fa;
    border: none;
    padding: 15px;
    text-align: center;
  }

  tbody td {
    background-color: #ffffff;
    border: none;
    padding: 15px;
    text-align: center;
    vertical-align: middle;
  }

  tbody tr {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  tbody tr:hover {
    transform: translateY(-5px);
  }

  .icon {
    margin-right: 10px;
    color: #6c757d;
    transition: color 0.2s;
    width: 30px;
    height: 30px;

    &:hover {
      color: #495057;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 1rem;
`;

const StyledButton = styled(Button)`
  font-size: 16px;
  margin-right: 6px;
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

function BoardList() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); 
  const navigate = useNavigate();
  const userInfo = useSelector(selectmyInfo);
  console.log(userInfo);


  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPost(null); 
  };

  const handleModalOpen = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    
    try {
      const response = await axios.delete(`http://localhost:8080/menu4/remove?no=${selectedPost.no}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        setPosts(posts.filter(post => post.no !== selectedPost.no)); 
        handleModalClose();
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await axios.get('http://localhost:8080/menu4/boardlist', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBoardList();
  }, []);

  return (
    <>
      <ButtonContainer>
        <StyledButton variant="primary" className="buttonstyle" onClick={() => navigate('/menu4/board')}>게시글 작성</StyledButton>
        {
          userInfo.role === 'ROLE_ADMIN' &&
          <StyledButton variant="danger" className="buttonstyle" onClick={() => navigate('/menu4/board')}>공지 작성</StyledButton>
        }
      </ButtonContainer>
      <TableWrapper>
        <thead>
          <tr>
            <th>게시물 번호</th>
            <th>제목</th>
            <th>작성일자</th>
            <th>작성자ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.no}>
              <td onClick={() => navigate(`/menu4/read/${post.no}`)}>{post.no}</td>
              <td onClick={() => navigate(`/menu4/read/${post.no}`)}>{post.title}</td>
              <td onClick={() => navigate(`/menu4/read/${post.no}`)}>{formatDate(post.regDate).slice(0, 12)}</td>
              <td onClick={() => navigate(`/menu4/read/${post.no}`)}>{post.writer}</td>
              <td>
                {/* if(user) */}
                {/* 여기에서 계속 진행 */}
                {/* {post.writer === userInfo.userId &&  (
                  <>
                    <BsPencilSquare className="icon" onClick={() => navigate(`/menu4/modify/${post.no}`)} />
                    <CiSquareRemove className="icon" onClick={() => handleModalOpen(post)} />
                  </>
                )} */}
                {post.writer === userInfo.userId ||  (
                  <>
                    <BsPencilSquare className="icon" onClick={() => navigate(`/menu4/modify/${post.no}`)} />
                    <CiSquareRemove className="icon" onClick={() => handleModalOpen(post)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>정말 삭제하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton onClick={handleDelete}>확인</SubmitButton>
          <CancelButton onClick={handleModalClose}>취소</CancelButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BoardList;
