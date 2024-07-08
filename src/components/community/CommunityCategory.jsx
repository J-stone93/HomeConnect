import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  margin: 50px;
  width: 90%;
  height: 500px;
  padding: 50px;
  background-color: #f8f9fa;
  border-radius: 20px;
  text-align: center;
  display: flex;
`;

const Container = styled.div`
  height: 400px;
  border: 3.5px solid black;
  border-radius: 15px;
  flex: 1;
  margin: 4px;
  padding: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background: #000000;
  }
`;

const Category = styled.div`
  width: 300px;
  margin: 0 auto;
  padding-top: 20px;

  span {
    font-size: 30px;
    font-weight: bold;
  }
`;

function CommunityCategory() {

  const navigate = useNavigate()

  return (
    <>
      <Category>
        <div>
          <span>카테고리 설정하기</span>
        </div>
      </Category>
      <Wrapper>
        <Container>
          {/* <Nav.Link onClick={()=>{navigate('/mypage')}} className="cursor-pointer"> */}
            <img src="../../image/002.png" alt="여행" onClick={()=>{navigate('/communityregister')}} className="cursor-pointer"/>
          {/* </Nav.Link> */}
          <img src="../../image/009.png" alt="여행" />
          <img src="../../image/011.png" alt="여행" />
          <img src="../../image/015.png" alt="여행" />
          <img src="../../image/016.png" alt="여행" />
          <img src="../../image/024.png" alt="여행" />
          <img src="../../image/059.png" alt="여행" />
          <img src="../../image/061.png" alt="여행" />
          <img src="../../image/078.png" alt="여행" />
        </Container>
        <Container>
          <img src="../../image/002.png" alt="여행" />
        </Container>
        <Container>
          <img src="../../image/002.png" alt="여행" />
        </Container>
      </Wrapper>
    </>
  );
};

export default CommunityCategory;