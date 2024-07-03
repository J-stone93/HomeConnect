import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  margin: 50px;
  width: 90%;
  padding: 50px;
  background-color: #f8f9fa;
  border-radius: 20px;
  /* display: flex; */
  /* justify-content: center; */
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

function CommunitySignUp() {
  const [communityList, setcommunityList] = useState();
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate()
  const { communityId } = useParams();

  const handleModify = () => {
    setShowModal(true);
  }

  const handleModalClose = () => {
    setShowModal(false);
  }

  // community에서 해당 아이디값에 내용 가져와 화면에 렌더링
  useEffect(() => {
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
      const response = await axios.delete(`http://localhost:8080/menu4/communityremove?no=${communityId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (response.status !== 200) {
        throw new Error(`api error: ${response.status} ${response.statusText}`);
      } else {
        navigate('/menu4/community')
      }
    } catch (error) {
      console.error(error);
    }
  }
  // ccommunity에서 해당 아이디값에 내용 가져와서 수정하기
  const modifyCommunityItem = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/menu4/communitymodify`)
    } catch (error) {

    }
  }

  return (
    <>
      <Wrapper>
        {communityList &&
          <div>
            <input
              type="text"
              value={communityList.title}
            />
            <input
              type="text"
              value={communityList.content}
            />
            <p>모임 위치</p>
            <p>작성자:{communityList.writer}</p>
            <Nav.Link onClick={() => navigate('/menu4/community')}>
              <Button>가입하기</Button>
            </Nav.Link>
          </div>
        }
        <ButtonContainer>
          <Nav.Link onClick={() => navigate('/menu4/community')}>
            <Button>목록가기</Button>
          </Nav.Link>
          <Nav.Link>
            <Button onClick={handleModify}>수정하기</Button>
          </Nav.Link>
          <Nav.Link>
            <RemoveButton onClick={removeCommunityItem}>삭제하기</RemoveButton>
          </Nav.Link>
        </ButtonContainer>
      </Wrapper>

      {/* <Modal show={showModal}> */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>등록 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>수정하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={addBoardComment}> */}
          <Button variant="primary">
          확인
        </Button>
        {/* <Button variant="secondary" onClick={handleModalClose}> */}
        <Button variant="secondary">
          취소
        </Button>
      </Modal.Footer>
    </Modal >
    </>
  );
};

export default CommunitySignUp;