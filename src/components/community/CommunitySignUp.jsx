import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
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

function CommunitySignUp() {
  const navigate = useNavigate()
  const { communityId } = useParams();
  const [communityList, setcommunityList] = useState();

  // community에서 해당 아이디값에 내용 가져와 화면에 렌더링
  useEffect(() => {
    const communitylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/menu4/communityread?no=${communityId}`);
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


  return (
    <Wrapper>
      {communityList &&
        <div>
          <h2>{communityList.title}</h2>
          <p>{communityList.content}</p>
          <p>모임 위치</p>
          <p>작성자:{communityList.writer}</p>
        <Nav.Link style={{width: '90px'}} onClick={() => navigate('/menu4/community')}>
          <Button variant="dark">가입하기</Button>
        </Nav.Link>
        </div>
      }
      <ButtonContainer>
        <Nav.Link style={{width: '90px'}} onClick={() => navigate('/menu4/community')}>
          <Button variant="dark">목록가기</Button>
        </Nav.Link>
        <Nav.Link style={{width: '90px', marginLeft: '10px'}} onClick={() => navigate('/menu4/community')}>
          <Button variant="dark">수정하기</Button>
        </Nav.Link>
        <Nav.Link style={{width: '90px', marginLeft: '10px'}} onClick={() => navigate('/menu4/community')}>
          <Button variant="danger">삭제하기</Button>
        </Nav.Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default CommunitySignUp;