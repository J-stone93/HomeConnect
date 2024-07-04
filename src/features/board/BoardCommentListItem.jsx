import { useEffect, useState, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";
import axios from "axios";

const DivContainer = styled.div`
  width: 50%;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
`;

function BoardCommentListItem(props) {
  const { content, index, isEdit, commentNo, writer, setCommentList, boardId } = props;

  const [value, setValue] = useState(content);

  const fetchCommentList = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/comment/list?boardNo=${boardId}`, {
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
          const response = await axios.put(`http://localhost:8080/comment/modify`, {
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
      const response = await axios.delete(`http://localhost:8080/comment/remove?commentNo=${commentNo}`, 
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
      {isEdit ?
        <InputGroup className="mb-3">
          <Form.Control value={value} onChange={handleEditChange} />
          <Button variant="outline-warning" onClick={handleModifyContentClose}>수정 확인</Button>
        </InputGroup>
        :
        <div key={index}>{writer} : {content}</div>
      }
      <div>
        {!isEdit &&
          <>
            <BsPencilSquare className="cursor-pointer " onClick={handleModifyContentOpen} />
            <CiSquareRemove className="cursor-pointer " onClick={handleRemoveComment} />
          </>
        }
      </div>
    </DivContainer>
  );
};

export default BoardCommentListItem;