// BoardList.jsx
import { json, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectmyInfo } from "../main/mainSlice";
import { addressKey } from "../..";

// 기존 Footer 스타일
const StyledFooter = styled.footer`
  width: 100%;
  height: 60px;
  position: absolute;
  transform: translateY(110%);
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 25px 0;
  position: absolute;
`;

// BoardList 컴포넌트에서만 사용할 새로운 Footer 스타일
const BoardListFooter = styled(StyledFooter)`
  position: absolute;
  /* bottom: 0; */
  background-color: #007bff;  // 새로운 배경색
  color: #ffffff;            // 새로운 텍스트 색
  transform: translateY(100%); // 필요에 따라 변경
  // 추가적인 스타일 변경 가능
`;

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

  .notice {
    background-color: #ffeeba !important;
    color: #856404 !important;
    font-weight: bold;
    font-size: 18px;

    &:hover {
      background-color: #ffd966 !important;
    }
  }

  .notice td {
    background-color: inherit !important;
    color: inherit !important;
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
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const navigate = useNavigate();
  const userInfo = useSelector(selectmyInfo);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const handleModalOpen = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleNoticeModalClose = () => {
    setShowNoticeModal(false);
    setSelectedNotice(null);
  };

  const handleNoticeModalOpen = (notice) => {
    setShowNoticeModal(true);
    setSelectedNotice(notice);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async () => {
    if (!selectedPost) return;

    try {
      const response = await axios.delete(`${addressKey}/board/remove?no=${selectedPost.no}`, {
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

  const handleNoticeDelete = async () => {
    if (!selectedNotice) return;

    try {
      const response = await axios.delete(`${addressKey}/notice/remove?no=${selectedNotice.no}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        setNotices(notices.filter(notice => notice.no !== selectedNotice.no));
        handleNoticeModalClose();
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
        const response = await axios.get(`${addressKey}/board/list`, {
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

  useEffect(() => {
    const fetchNoticeList = async () => {
      try {
        const response = await axios.get(`${addressKey}/notice/list`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          setNotices(response.data);
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNoticeList();
  }, []);

  return (
    <>
      <ButtonContainer>
        <StyledButton variant="primary" className="buttonstyle" onClick={() => navigate('/board')}>게시글 작성</StyledButton>
        {
          userInfo.role === 'ROLE_ADMIN' &&
          <StyledButton variant="danger" className="buttonstyle" onClick={() => navigate('/notice')}>공지 작성</StyledButton>
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

          {notices.map((notice) => (
            <tr key={notice.no} className="notice">
              <td onClick={() => navigate(`/noticeread/${notice.no}`)}>{notice.no}</td>
              <td onClick={() => navigate(`/noticeread/${notice.no}`)}>{notice.title}</td>
              <td onClick={() => navigate(`/noticeread/${notice.no}`)}>{formatDate(notice.regDate).slice(0, 12)}</td>
              <td onClick={() => navigate(`/noticeread/${notice.no}`)}>관리자</td>
              <td>
                {(userInfo.role === "ROLE_ADMIN") && (
                  <>
                    <BsPencilSquare className="icon" onClick={() => navigate(`/noticemodify/${notice.no}`)} />
                    <CiSquareRemove className="icon" onClick={() => handleNoticeModalOpen(notice)} />
                  </>
                )}
              </td>
            </tr>
          ))}

          {posts.map((post) => (
            <tr key={post.no}>
              <td onClick={() => navigate(`/boardread/${post.no}`)}>{post.no}</td>
              <td onClick={() => navigate(`/boardread/${post.no}`)}>{post.title}</td>
              <td onClick={() => navigate(`/boardread/${post.no}`)}>{formatDate(post.regDate).slice(0, 12)}</td>
              <td onClick={() => navigate(`/boardread/${post.no}`)}>{post.writer}</td>
              <td>
                {(post.writer === userInfo.userId || userInfo.role === "ROLE_ADMIN") && (
                  <>
                    <BsPencilSquare className="icon" onClick={() => navigate(`/boardmodify/${post.no}`)} />
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

      <Modal show={showNoticeModal} onHide={handleNoticeModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>정말 삭제하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton onClick={handleNoticeDelete}>확인</SubmitButton>
          <CancelButton onClick={handleNoticeModalClose}>취소</CancelButton>
        </Modal.Footer>
      </Modal>

      {/* 변경된 Footer */}
      {/* <BoardListFooter>
        &copy; 코딩하는오합지졸. All Rights Reserved.
      </BoardListFooter> */}
    </>
  );
}

export default BoardList;
