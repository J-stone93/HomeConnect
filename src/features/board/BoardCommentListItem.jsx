import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { closeEditComment } from "./boardSlice";
import axios from "axios";

const DivContainer = styled.div`
  width: 50%;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
`;
function BoardCommentListItem(props) {
  const {content,index,commentNo,isEdit,writer,setCommentList} = props;

  const [editContent, setEditContent] = useState(content);
  const [showButton, setShowButton] = useState(true);

  // useEffect(() => {
  //   const modifyComment = async() => {
  //     try{
  //       const response = await axios.put(`http://localhost:8080/comment/modify`, {
  //         "commentNo" : commentNo,
  //         "content" : editContent
  //       },
  //       {
  //         headers : {
  //           Authorization : localStorage.getItem('token')
  //         }
  //       });
  //       if (response.status === 200) { 
  //         return alert("댓글이 수정되었습니다.");
  //       } else { 
  //         throw new Error(`api error: ${response.status} ${response.statusText}`);
  //       }
  //     } catch(err) {
  //       console.error(err);
  //     }
  //   };
  //   modifyComment();

  //   return () => {
      
  //   };
  // }, []);

  const handleModifyContentOpen = () => {
    setShowButton(false);
    setCommentList(commentList => {
      return commentList.map(comment => comment.commentNo === commentNo 
        ? { ...comment, isEdit: true }
        : { ...comment, isEdit: false }
      );
    });
  };

  const handleModifyContentClose = () => {
    
    setShowButton(true);
    setCommentList(commentList => {
      return commentList.map(comment => comment.commentNo === commentNo 
        ? { ...comment, isEdit: false }
        : { ...comment, isEdit: false }
      );
    });
    const modifyComment = async() => {
      try{
        const response = await axios.put(`http://localhost:8080/comment/modify`, {
          "commentNo" : commentNo,
          "content" : editContent
        },
        {
          headers : {
            Authorization : localStorage.getItem('token')
          }
        });
        if (response.status === 200) { 
          return alert("댓글이 수정되었습니다.");
        } else { 
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
      } catch(err) {
        console.error(err);
      }
    };
    modifyComment();
  };

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleRemoveComment = () => {
  };
  


  return (
    <DivContainer key={commentNo}>
      {
        isEdit 
        ? <InputGroup className="mb-3">
          <Form.Control value={editContent}  onChange={handleEditChange}/>
          <Button variant="outline-warning" onClick={handleModifyContentClose}>수정 확인</Button>
        </InputGroup> 
        : <div key={index}>{writer} : {content}</div>
      }
        <div>
          {
            showButton &&
            <>
              <BsPencilSquare onClick={handleModifyContentOpen}/>
              <CiSquareRemove onClick={handleRemoveComment}/>
            </>
          }
        </div>
    </DivContainer>
  );
};

export default BoardCommentListItem;