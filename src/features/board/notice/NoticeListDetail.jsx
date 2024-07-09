import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {getNoticeList,selectNoticeList } from "../boardSlice";
import axios from "axios";
import BoardCommentListItem from "../BoardCommentListItem";
import NoticeCommentListItem from "./NoticeCommentListItem";

const CommentContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 40px;
  margin: 0 auto;
  width: 60%;

  .imgs{
    width : 80px;
    height: 80px;
  }

`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostTitleWriterContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
  `;

const PostTitleWriter = styled.div`
  display: flex;
  flex-direction: column ;
  justify-content: center;
  margin-left: 15px;
  `;

const TextInput = styled.input`
  width: 80%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const Buttons = styled.button`
  width: 100px;
  height: 35px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: 2px solid black;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const PostContent = styled.div`
  margin-bottom: 20px;
  border-bottom: 2px dashed #ccc;
`;

function NoticeListDetail() {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  const { noticeId } = useParams();

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const noticeItem = useSelector(selectNoticeList);    
  const [noticeItem, setNoticeItem] = useState([]);
  useEffect(() => {
    const noticeDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/notice/read?no=${noticeId}`,{
        headers : {
          Authorization : localStorage.getItem('token'),
        }
      });
      if(!response.data) return;
      if (response.status === 200) { 
          return setNoticeItem(response.data);
      } else { 
          throw new Error(`api error: ${response.status} ${response.statusText}`);
      }
      } catch (error) {
          console.error(error);
      }
    };
    noticeDetail();
  },[]);

  useEffect(() => {
    const noticeCommentList = async() => {
      try{
        const response = await axios.get(`http://localhost:8080/noticeComment/list?noticeNo=${noticeId}`, {
          headers : {
            Authorization :  localStorage.getItem('token'),
          }
        });
        if (response.status === 200) { 
          const data = response.data.map((data)=>({...data,isEdit : false}));
          return setCommentList(data);
        } else { 
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
      console.error(error);
      }
    };
    noticeCommentList();
  },[]);

  const handlekeyDown = (e) => {
    if (e.key === 'Enter') plusComment();
  };

  const plusComment = () => {
    const exportContents = async() => {
      try{
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:8080/noticeComment/register`,
        {
          "noticeNo" : noticeId,
          "content" : comment,
        },
        {
          headers : {
            Authorization :  token
          }
        });
        if (response.status === 200) { 
          const noticeDetail = async () => {
            try {
              const response = await axios.get(`http://localhost:8080/notice/read?no=${noticeId}`,{
                headers : {
                  Authorization : localStorage.getItem('token'),
                }
              });
              if(!response.data) return;
              if (response.status === 200) { 
                return setNoticeItem(response.data);
              } else { 
                throw new Error(`api error: ${response.status} ${response.statusText}`);
              }
            } catch (error) {
              console.error(error);
            }
          };
          noticeDetail();

          const NoticeCommentList = async() => {
            try{
              const response = await axios.get(`http://localhost:8080/noticeComment/list?noticeNo=${noticeId}`, {
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
          NoticeCommentList();
        } else { 
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
        } catch (error) {
          console.error(error);
        }};
      exportContents();
      setComment(''); 
    };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
  
    return `${month}/${day} ${hours}:${minutes}`;
  };

  return (
  <>
    <CommentContainer>
      {noticeItem &&
      <PostContent >
        <PostTitleWriterContainer>
          <img className='imgs' src="/image/profile.png" alt="profile" />
          <PostTitleWriter>
            <h1>{noticeItem.writer}</h1>
            <p>{formatDate(noticeItem.modDate)}</p>
          </PostTitleWriter>
        </PostTitleWriterContainer>
        <h1>{noticeItem.title}</h1>
        <p className='mt-4'>{noticeItem.content}</p>
      </PostContent>}

      <h3>댓글</h3>
      <CommentList>
        {commentList.map((comment,index)=>{
          return (
            <>
              <NoticeCommentListItem 
              writer = {comment.writer} 
              commentNo = {comment.commentNo} 
              content = {comment.content} 
              index = {index} 
              isEdit={comment.isEdit}
              setCommentList={setCommentList}
              noticeId={noticeId}
              modDate = {comment.modDate}
              />
            </>
          );
        })}
      </CommentList>
      
      <div>
        <TextInput
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요."
        onKeyDown={handlekeyDown}
        />
        <Buttons onClick={plusComment}>댓글 추가</Buttons>
      </div>

      <Buttons onClick={() => navigate('/boardlist')}>목록으로</Buttons>
    </CommentContainer>
  </>
  );  
};

export default NoticeListDetail;