import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { clearBoardList, getBoardList, removeBoardList, selectBoardList } from './boardSlice';
import { BsPencilSquare } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";
import styled from 'styled-components';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const CommentContainer = styled.div`
  margin-top: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  justify-content: space-evenly;
`;

const TextInput = styled.input`
  width: 40%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start; 
  margin-top: 10px;
`;

const Button = styled.button`
  width: 100px;
  height: 35px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  width: 100px;
  height: 35px;
  font-size: 16px;
  background-color: #fc0037;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;

  &:hover {
    background-color:#b30000;
  }
`;

const PostContent = styled.div`
  margin-bottom: 20px;
  border-bottom: 2px dashed #ccc;
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333; 
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #666;
  }
`;

const DivContainer = styled.div`
  width: 40%;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
`;

function BoardListDetail() {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { boardId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boardItem = useSelector(selectBoardList);    

  useEffect(() => {
    const boardlist = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/menu4/read?no=${boardId}`,{
        headers : {
          Authorization : localStorage.getItem('token'),
        }
      });
      if(!response.data) return;
      if (response.status === 200) { 
          return dispatch(getBoardList(response.data));
      } else { 
          throw new Error(`api error: ${response.status} ${response.statusText}`);
      }
      } catch (error) {
          console.error(error);
      }
    };
    boardlist();
  },[]);

  useEffect(() => {
    const commentList = async() => {
      try{
        const response = await axios.get(`http://localhost:8080/comment/list?boardNo=${boardId}`, {
          headers : {
            Authorization :  localStorage.getItem('token'),
          }
        });
        if (response.status === 200) { 
          return setCommentList(response.data);
        } else { 
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
      console.error(error);
      }
    };
    commentList();
  },[]);

  const handleRemoveComment = () => {
    setShowModal(true); // Modal 열기
  };

  const handleModifyContent = () => {

  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const modifyComment = async() => {
    try{
      const response = await axios.put(`http://localhost:8080/comment/modify`, {
        "commentNo" : 0,
        "content" : comment
      },
      {
        headers : {
          Authorization : localStorage.getItem('token')
        }
      });
      if (response.status === 200) { 
        return dispatch(getBoardList(response.data));
      } else { 
        throw new Error(`api error: ${response.status} ${response.statusText}`);
      }
    } catch(err) {
      console.error(err);
    }
  };

  const plusComment = () => {
    const exportContents = async() => {
      try{
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:8080/comment/register`,
        {
          "boardNo" : boardId,
          "content" : comment,
        },
        {
          headers : {
            Authorization :  token
          }
        });
        if (response.status === 200) { 
          const boardlist = async () => {
            try {
              const response = await axios.get(`http://localhost:8080/menu4/read?no=${boardId}`,{
                headers : {
                  Authorization : localStorage.getItem('token'),
                }
              });
              if(!response.data) return;
              if (response.status === 200) { 
                return dispatch(getBoardList(response.data));
              } else { 
                throw new Error(`api error: ${response.status} ${response.statusText}`);
              }
            } catch (error) {
              console.error(error);
            }
          };
            boardlist();

          const commentList = async() => {
            try{
              const response = await axios.get(`http://localhost:8080/comment/list?boardNo=${boardId}`, {
                headers : {
                  Authorization :  localStorage.getItem('token'),
                }
              });
              if (response.status === 200) { 
                return setCommentList(response.data);
              } else { 
                throw new Error(`api error: ${response.status} ${response.statusText}`);
              }
            } catch (error) {
              console.error(error);
            }
          };
          commentList();
          return console.log("성공");
          } else { 
            throw new Error(`api error: ${response.status} ${response.statusText}`);
          }
          } catch (error) {
            console.error(error);
          }};
      exportContents();
      setComment(''); 
  };

  return (
  <>
    <CommentContainer>
      {boardItem &&
      <PostContent>
        <h2>{boardItem.title}</h2>
        <p>{boardItem.content}</p>
        <p>작성자:{boardItem.writer}</p>
      </PostContent>}

      <h3>댓글</h3>
      <CommentList>
        {commentList.map((comments,index)=>{
          return (
            <DivContainer>
              <div key={index}>{comments.writer} : {comments.content}</div>
              <div>
                <BsPencilSquare onClick={handleModifyContent}/>
                <CiSquareRemove onClick={handleRemoveComment}/>
              </div>
            </DivContainer>
          );
        })}
      </CommentList>
      
      <div>
        <TextInput
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요."
        />
        <Button onClick={plusComment}>댓글 추가</Button>
      </div>

      <ButtonContainer>
        <Button onClick={() => navigate('/menu4/boardlist')}>목록으로</Button>
        <Button onClick={handleModifyContent}>수정하기</Button>
        <Link to="/menu4/boardlist">
            <CloseButton onClick={handleRemoveComment}>삭제하기</CloseButton>
        </Link> 
      </ButtonContainer>
    </CommentContainer>

    <Modal show={showModal} onHide={handleModalClose}>
    <Modal.Header closeButton>
      <Modal.Title>등록 확인</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>등록하시겠습니까?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={modifyComment}>
      확인
    </Button>
    <Button variant="secondary" onClick={handleModalClose}>
      취소
    </Button>
    </Modal.Footer>
    </Modal >
  </>
  );  
};

export default BoardListDetail;
