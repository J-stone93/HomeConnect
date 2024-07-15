import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectmyInfo } from '../features/main/mainSlice';
import { addressKey } from '..';

const Containers = styled(Form)`
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

.admin-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
  text-align: center;
  overflow: auto;
  text-overflow: clip;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th, .user-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #f8f8f8;
}

.user-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.delete-button {
  color: #ff4d4d;
  cursor: pointer;
}

.delete-button:hover {
  color: #1a7eff;
  cursor: pointer;
}
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


function AdminPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(``);
  const token = localStorage.getItem('token');
  const myId = useSelector(selectmyInfo);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
  }
  const handleModalOpen = (userId) => {
    setShowModal(true);
    setDeleteUserId(userId);
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${addressKey}/login/remove?userId=${deleteUserId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        alert("계정이 삭제되었습니다.");
        if(deleteUserId === myId.userId) return navigate('/login');
        setUsers(users.filter((user)=> user.userId !== deleteUserId));
        setShowModal(false);
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const year = ('0' + (date.getFullYear())).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
  
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    
    const year = ('0' + (date.getFullYear())).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}/${month}/${day}`;
  };


  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        const response = await axios.get(`${addressKey}/login/adminPage`,{
          headers : {
            Authorization : token
          }
        });
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          alert("오류 발생");
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        alert("오류 발생");
        console.error(error);
      }
    };
    getUsersInfo();
  }, []);

  return (
    <Containers>
      <div className="admin-container">
          <h1>사용자 계정 관리</h1>
          <table className="user-table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>이름</th>
                      <th>생일</th>
                      <th>성별</th>
                      <th>주소</th>
                      <th>가입일자</th>
                      <th>권한</th>
                      <th>작업</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map(user => (
                      <tr key={user.id}>
                          <td>{user.userId}</td>
                          <td>{user.name}</td>
                          <td>{formatDate2(user.birthdate)}</td>
                          <td>{user.sex}</td>
                          <td>{user.address}</td>
                          <td>{formatDate(user.regDate)}</td>
                          <td>{user.role}</td>
                          <td >
                            <FaTrashAlt onClick={()=>handleModalOpen(user.userId)} size={25} className='delete-button' />
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>계정 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>삭제하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton onClick={handleDelete}>확인</SubmitButton>
          <CancelButton onClick={handleModalClose}>취소</CancelButton>
        </Modal.Footer>
      </Modal>
    </Containers>
  );
};

export default AdminPage;
