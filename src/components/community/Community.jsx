import styled from "styled-components";
import { Button, Dropdown, DropdownButton, Nav, Table } from "react-bootstrap";
import CommunityItem from "./CommunityItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../features/community/communitySlice";


const Wrapper = styled.div`
  /* padding-top: 30px 30px 30px 30px;
  width: 90%;
  height: 100vh; */
  margin: 0 auto;
  margin: 50px;
  width: 90%;
  padding: 50px;
  background-color: #f8f9fa;
  border-radius: 20px;
`;

const CommunityContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 10px;
  display: flex;
  /* border: 1px solid #ccc; */
  border-radius: 15px;
  justify-content: space-evenly;
`;

const ItemContainer = styled.div`
  height: 400px;
  flex: 1;
  border: 2px solid black;
  margin: 2px;
  padding: 10px;
  border-radius: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #000000;
  }
`;

const Constyle = styled.div`
  padding-top: 30px;
`;

const StyledNav = styled(Nav)`
  text-decoration: none;
  font-weight: bold;
  color: black;
  .color-nav {
    text-decoration: none;
    font-weight: bold;
    color: black;
  }
  `;

function Community() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('delicious');
  const [categoryName, setCategoryName] = useState('맛집');
  const [categorySelect, setCategorySelect] = useState('');
  // console.log(categorySelect);
  const dispatch = useDispatch();

  // const handleDelicious = () => {
  //   setCategorySelect('맛집');
  //   <CommunityRegister categorySelect={categorySelect}/>
  //   console.log(categorySelect);
  //   navigate(`/menu4/communityregister`);
  // };

  return (
    <Wrapper>
      <Constyle>
        <StyledNav justify variant="tabs" defaultActiveKey="link-1" className="color-nav">
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() => setCategoryName('맛집')}>맛집투어</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={() => setCategoryName('독서')}>독서</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" onClick={() => setCategoryName('운동')}>운동</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-4" onClick={() => setCategoryName('등산')}>등산</Nav.Link>
          </Nav.Item>

          <DropdownButton id="dropdown-basic-button" title="모임 개설하기">
            <Dropdown.Item
              href=""
              // onClick={() => navigate(`/menu4/communityregister`)}
              onClick={() => {
                dispatch(selectCategory('맛집'));
                navigate(`/menu4/communityregister`);
              }}
            >
              맛집투어
            </Dropdown.Item>
            <Dropdown.Item
              href=""
              onClick={() => {
                dispatch(selectCategory('독서'));
                navigate(`/menu4/communityregister`);
              }}
            >독서
            </Dropdown.Item>
            <Dropdown.Item
              href=""
              onClick={() => {
                dispatch(selectCategory('운동'));
                navigate(`/menu4/communityregister`);
              }}
            >
              운동</Dropdown.Item>
            <Dropdown.Item
              href=""
              onClick={() => {
                dispatch(selectCategory('등산'));
                navigate(`/menu4/communityregister`);
              }}
            >
              등산</Dropdown.Item>
          </DropdownButton>
          {/* <Nav.Item>
            <Button variant="dark" onClick={() => navigate(`/menu4/communityregister`)}>모임 개설하기</Button>
          </Nav.Item> */}
        </StyledNav>
      </Constyle>
      <CommunityContainer>
        {/* 카테고리 별 목록 불러오기 테스트 */}
        {/* {{
          'delicious': <ItemContainer><CommunityItem /></ItemContainer>,
          'book': <ItemContainer><CommunityItem /></ItemContainer>,
          'health': <ItemContainer><CommunityItem /></ItemContainer>,
          'hiking': <ItemContainer><CommunityItem /></ItemContainer>
        }[categoryName]} */}
        <ItemContainer>
          <CommunityItem
            categoryName={categoryName}
          />
        </ItemContainer>

      </CommunityContainer>
    </Wrapper>
  );
};

export default Community;