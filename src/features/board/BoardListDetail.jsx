import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { removeBoardList, selectBoardList } from './boardSlice';
import styled from 'styled-components';

const CommentContainer = styled.div`
    margin-top: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
`;

const CommentList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-evenly;
`;

const CommentItem = styled.li`
    margin-bottom: 8px;
    font-size: 16px;
`;

const TextInput = styled.input`
    width: 100%;
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

function BoardListDetail() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { boardId } = useParams();
  const boardList = useSelector(selectBoardList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  const handleRemoveComment = () => { 

  };

  const handleModifyContent = () => {

  };
  useEffect(() => {
    
    return () => {
      
    };
  }, []);
  const boardItem = boardList.find((item) => item.no === Number(boardId));

  return (
    <CommentContainer>
      {boardItem && (
        <PostContent>
          <h2>{boardItem.title}</h2>
          <p>{boardItem.content}</p>
          <p>작성자:{boardItem.writer}</p>
        </PostContent>
      )}

      <h3>댓글</h3>
      <CommentList>
        {comments.map((comment, index) => (
          <CommentItem key={index}>{comment}</CommentItem>
        ))}
        <p>작성자:</p>
        <button onClick={handleRemoveComment}>X</button>
      </CommentList>
      <TextInput
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요."
      />
      <ButtonContainer>
        <Button onClick={() => navigate('/menu4/boardlist')}>목록으로</Button>
        <Button onClick={handleAddComment}>댓글 추가</Button>
        <Button onClick={handleModifyContent}>수정하기</Button>
        <Link to="/menu4/boardlist">
          <CloseButton onClick="#">삭제하기</CloseButton>
        </Link>
      </ButtonContainer>
    </CommentContainer>
  );
}

export default BoardListDetail;
