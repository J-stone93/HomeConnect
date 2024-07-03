import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { closeEditComment } from "./boardSlice";

const DivContainer = styled.div`
  width: 50%;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
`;
function BoardCommentListItem(props) {
  const {content,index,commentNo,writer,setCommentList} = props;
  let {isEdit} = props;
  const dispatch = useDispatch();

  const [value, setValue] = useState(content);

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
      return commentList.map(comment => comment.commentNo === commentNo 
        ? { ...comment, isEdit: false }
        : { ...comment, isEdit: false }
      );
    });
  };

  const handleEditChange = (e) => {
    dispatch()
    setValue(e.target.value);
  }

  const handleRemoveComment = () => {
  };
  
  // const modifyComment = async() => {
  //   try{
  //     const response = await axios.put(`http://localhost:8080/comment/modify`, {
  //       "commentNo" : 0,
  //       "content" : comment
  //     },
  //     {
  //       headers : {
  //         Authorization : localStorage.getItem('token')
  //       }
  //     });
  //     if (response.status === 200) { 
  //       return alert("댓글이 수정되었습니다.");
  //     } else { 
  //       throw new Error(`a  pi error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch(err) {
  //     console.error(err);
  //   }
  // };


  return (
    <DivContainer key={commentNo}>
      {
        isEdit 
        ? <InputGroup className="mb-3">
          <Form.Control value={value}  onChange={handleEditChange}/>
          <Button variant="outline-warning" onClick={handleModifyContentClose}>수정 확인</Button>
        </InputGroup> 
        : <div key={index}>{writer} : {content}</div>
      }
        <div>
          <BsPencilSquare onshow={false} onClick={handleModifyContentOpen}/>
          <CiSquareRemove onClick={handleRemoveComment}/>
        </div>
    </DivContainer>
  );
};

export default BoardCommentListItem;