import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommunityModal from "./CommunityModal";

const Wrapper = styled.div`
  margin: 50px;
  width: 80%;
  padding: 50px;
  background-color: #f8f9fa;
  border-radius: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  width: 90px;
  height: 35px;
  font-size: 16px;
  background-color: #020a13;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;
  &:hover {
    background-color: #1a1b1d;
  }
`;

const RemoveButton = styled.button`
  width: 90px;
  height: 35px;
  font-size: 16px;
  background-color: #f10909;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;
  &:hover {
    background-color: #f75252;
  }
`;


const CommunityContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CommunityTitle = styled.input`
  width: 100%;
  height: 50px;
  margin: 0 auto 10px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
`;

const CommunityContent = styled.textarea`
  width: 100%;
  min-height: 400px;
  margin: 0 auto 10px;
  overflow: auto;
  padding: 10px;
  font-size: 16px;
  resize: none;
  border-radius: 12px;
`;

function CommunitySignUp() {
  const [communityList, setcommunityList] = useState({});
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { communityId } = useParams();

  const handleModalOpen = () => {
    <CommunityModal />
  };

  // const handleModify = () => {
  //   setShowModal(true);
  // };

  // const handleModalClose = () => {
  //   setShowModal(false); 
  // };

  // community에서 해당 아이디값에 내용 가져와 화면에 렌더링
  useEffect(() => {
    if (communityList === null) return;
    const communitylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/menu4/communityread?no=${communityId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        });
        setcommunityList(response.data);
        if (response.status === 200) {
          // return dispatch(getBoardList(response.data));
        } else {
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    communitylist();
  }, []);

  // community에서 해당 아이디값에 내용 가져와서 삭제하기
  const removeCommunityItem = async () => {
    try {
      const result = window.confirm('정말로 삭제하시겠습니까?');
      if (result) {
        const response = await axios.delete(`http://localhost:8080/menu4/communityremove?no=${communityId}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        if (response.status !== 200) {
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        } else {
          alert('삭제가 완료되었습니다.');
        }
      } else {
        alert('삭제가 취소되었습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <Wrapper>
        {communityList &&
          <CommunityContainer>
            <CommunityTitle
              type="text"
              value={communityList.title}
              readOnly
            />
            <CommunityContent
              type="text"
              value={communityList.content}
              readOnly
            />
            <p>모임 위치</p>
            <p>작성자:{communityList.writer}</p>
            <Nav.Link onClick={() => navigate('/menu4/community')}>
              <Button>가입하기</Button>
            </Nav.Link>
          </CommunityContainer>
        }
        <ButtonContainer>
          <Nav.Link onClick={() => navigate('/menu4/community')}>
            <Button>목록가기</Button>
          </Nav.Link>
          <Nav.Link>
            {/* <Button onClick={() => <CommunityModal communityList={communityList} />}>수정하기</Button> */}
            {/* <Button onClick={handleModalOpen}>수정하기</Button> */}
            {/* <Button>수정하기</Button> */}
            <Button onClick={() => setShowModal(true)}>수정하기</Button>
          </Nav.Link>
          <Nav.Link>
            <RemoveButton onClick={removeCommunityItem}>삭제하기</RemoveButton>
          </Nav.Link>
        </ButtonContainer>
      </Wrapper>
      <CommunityModal
        showModal={showModal}
        communityList={communityList}
        communityId={communityId}
        setcommunityList={setcommunityList}
        handleModalClose={() => setShowModal(false)}
      />
    </>
  );
};

export default CommunitySignUp;