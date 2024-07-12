import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectmyInfo } from '../features/main/mainSlice';

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
  max-width: 900px;
  text-align: center;
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
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-button:hover {
  background-color: #ff1a1a;
}
`;

function AdminPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectmyInfo());

  const [users, setUsers] = useState([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      { id: 3, name: 'Jack Doe', email: 'jack@example.com' },
  ]);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // useEffect(() => {
  //   const getUsersInfo = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/login?userId=${IDvalue}&pw=${PWvalue}`);
  //       if (!response.data) return alert("아이디나 비밀번호를 확인해주세요");
  //       if (response.status === 200) {
  //         localStorage.setItem('token', response.data.token);
  //         localStorage.setItem('user', JSON.stringify(response.data.user));
  //         const userInfo = JSON.parse((localStorage.getItem('user')));
  //         console.log(userInfo);
  //         dispatch(getmyInfo(userInfo));
  //         alert("환영합니다!");
  //         navigate('/');
  //       } else {
  //         alert("오류 발생");
  //         throw new Error(`api error: ${response.status} ${response.statusText}`);
  //       }
  //     } catch (error) {
  //       alert("오류 발생");
  //       console.error(error);
  //     }
  //   };
  //   getUsersInfo();
  // }, []);

  return (
    <Containers>
      <div className="admin-container">
          <h1>사용자 계정 관리</h1>
          <table className="user-table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>작업</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map(user => (
                      <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                              <button className="delete-button" onClick={() => handleDelete(user.id)}>
                                  <FaTrashAlt />
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </Containers>
  );
};

export default AdminPage;
