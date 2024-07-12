import { useEffect, useState, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectmyInfo } from "../main/mainSlice";
import { addressKey } from "../..";

const DivContainer = styled.div`
  width: 100%;
  font-size: 16px;
  border-bottom: 2px dashed #ccc;
  margin-bottom: 10px;

  .divfont{
    font-size: 12px;
    opacity: 0.5;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img{
    width: 30px;
    height: 30px;
  }

  .divdisplay{
    display: flex;
    margin: 3px 0px;
  }

  .divspace{
    margin-left: 5px;
  }

  .size{
    width: 20px;
    height: 20px;
  }
`;

function BoardCommentListItem(props) {
  const { content, index, modDate, isEdit, commentNo, writer, setCommentList, boardId } = props;

  const [value, setValue] = useState(content);
  const userInfo = useSelector(selectmyInfo);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
  
    return `${month}/${day} ${hours}:${minutes}`;
  };

  const fetchCommentList = useCallback(async () => {
    try {
      const response = await axios.get(`${addressKey}/comment/list?boardNo=${boardId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
      if (response.status === 200) {
        const data = response.data.map((data) => ({ ...data, isEdit: false }));
        setCommentList(data);
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }, [boardId, setCommentList]);

  useEffect(() => {
    fetchCommentList();
  }, [fetchCommentList]);

  const handleModifyContentOpen = () => {
    setCommentList(commentList => {
      return commentList.map(comment => comment.commentNo === commentNo
        ? { ...comment, isEdit: true }
        : { ...comment, isEdit: false }
      );
    });
  };

  const handleModifyContentClose = () => {
    setCommentList(commentList => {
      const updatedCommentList = commentList.map(comment => comment.commentNo === commentNo
        ? { ...comment, isEdit: false, content: value }
        : comment
      );

      const modifyComment = async () => {
        try {
          const response = await axios.put(`${addressKey}/comment/modify`, {
            commentNo: commentNo,
            content: value,
          }, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          });
          if (response.status === 200) {
            alert("댓글이 수정되었습니다.");
          } else {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          console.error(err);
        }
      };

      modifyComment();

      return updatedCommentList;
    });
  };

  const handleEditChange = (e) => {
    setValue(e.target.value);
  };

  const handleRemoveComment = async () => {
    try {
      const response = await axios.delete(`${addressKey}/comment/remove?commentNo=${commentNo}`, 
        { 
          headers: {
          Authorization: localStorage.getItem('token')
          }
        });
      if (response.status === 200) {
        alert("댓글이 삭제되었습니다.");
        fetchCommentList(); // 삭제 후 댓글 목록 갱신
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DivContainer key={commentNo}>
      <ButtonContainer>
        <div className="divdisplay">
          <img src="/image/profile.png" alt="profile" />
          <div className="divspace">{writer}</div>
        </div>
        <div>
          {!isEdit && (userInfo.role === "ROLE_ADMIN" || writer === userInfo.userId) &&
            <>
              <BsPencilSquare className="cursor-pointer size" onClick={handleModifyContentOpen} />
              <CiSquareRemove className="cursor-pointer size " onClick={handleRemoveComment} />
            </>
          }
        </div>
      </ButtonContainer>
      <div className="mb-1">
        {isEdit ?
          <InputGroup className="mb-3">
            <Form.Control value={value} onChange={handleEditChange} />
            <Button variant="outline-warning" onClick={handleModifyContentClose}>수정 확인</Button>
          </InputGroup>
          :
          <>
            <div key={index}>{content}</div>
            <div className="divfont">{formatDate(modDate)}</div>
          </>
        }
      </div>
    </DivContainer>
  );
};

export default BoardCommentListItem;