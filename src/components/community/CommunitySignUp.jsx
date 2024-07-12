import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommunityModal from "./CommunityModal";

const Wrapper = styled.div`
  margin: 50px auto;
  width: 80%;
  padding: 50px;
  background-color: #f8f9fa;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
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

const RemoveButton = styled.button`
  width: 120px;
  height: 40px;
  font-size: 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;
  &:hover {
    background-color: #c82333;
  }
`;

const CommunityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const CommunityTitle = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  outline: none;
`;

const CommunityContent = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  resize: none;
  outline: none;
`;

const CommunityInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const CommunityInfoItem = styled.div`
  font-size: 16px;
`;

function CommunitySignUp() {
  const [communityList, setCommunityList] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { communityId } = useParams();

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await axios.get(`http://homeconnectserver.shop:8080/community/read?no=${communityId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        });
        setCommunityList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommunity();
  }, [communityId]);

  const removeCommunityItem = async () => {
    try {
      const result = window.confirm('정말로 삭제하시겠습니까?');
      if (result) {
        const response = await axios.delete(`http://homeconnectserver.shop:8080/community/remove?no=${communityId}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        if (response.status === 200) {
          alert('삭제가 완료되었습니다.');
          navigate('/community');
        } else {
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
      } else {
        alert('삭제가 취소되었습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Wrapper>
        {communityList && (
          <CommunityContainer>
            <CommunityTitle
              type="text"
              value={communityList.title}
              readOnly
            />
            <CommunityContent
              value={communityList.content}
              readOnly
            />
            <CommunityInfo>
              <CommunityInfoItem>모임 위치</CommunityInfoItem>
              <CommunityInfoItem>작성자: {communityList.writer}</CommunityInfoItem>
              <CommunityInfoItem>회원수:</CommunityInfoItem>
            </CommunityInfo>
            <ButtonContainer>
              <Button onClick={() => navigate('/community')}>가입하기</Button>
            </ButtonContainer>
          </CommunityContainer>
        )}
        <ButtonContainer>
          <Button onClick={() => navigate('/community')}>목록가기</Button>
          <Button onClick={() => setShowModal(true)}>수정하기</Button>
          <RemoveButton onClick={removeCommunityItem}>삭제하기</RemoveButton>
        </ButtonContainer>
      </Wrapper>
      <CommunityModal
        showModal={showModal}
        communityList={communityList}
        communityId={communityId}
        setCommunityList={setCommunityList}
        handleModalClose={() => setShowModal(false)}
      />
    </>
  );
}

export default CommunitySignUp;
