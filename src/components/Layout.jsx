import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getmyInfo, selectmyInfo } from "../features/main/mainSlice";

const StyledNavbar = styled(Navbar.Brand)`
  text-align: center;
  cursor: pointer;
  font-size: 1.2em;
  margin: 0 10px;

  &:hover {
    color: green;
  }
`;

const Mypage = styled(Navbar.Text)`
  display: flex;
  align-items: center;
  img {
    width: 50px;
    margin-right: 10px;
  }
`;

const FixedHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  padding-top: 82px;
`;

const StyledFooter = styled.footer`
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 15px 0;
  margin-top: 20px;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  font-size: 1em;
  color: #007bff;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  font-size: 1em;
  color: #dc3545;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    color: #c82333;
  }
`;

const Layout = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectmyInfo);
  console.log(userInfo);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(getmyInfo({}));
    navigate('/login');
  };

  return (
    <>
      <FixedHeader>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>
              <IoIosHome onClick={() => navigate('/')} className="cursor-pointer" size={32} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <StyledNavbar onClick={() => navigate('/feedetail')}>관리비</StyledNavbar>
                <StyledNavbar onClick={() => navigate('/calendar')}>달력</StyledNavbar>
                <StyledNavbar onClick={() => navigate('/community')}>모임</StyledNavbar>
                <StyledNavbar onClick={() => navigate('/map')}>동네지도</StyledNavbar>
                <StyledNavbar onClick={() => navigate('/menu4')}>게시판</StyledNavbar>
              </Nav>
              <Nav className="ms-auto">
                <Mypage>
                  <img src="/image/profile.png" alt="profile" />
                  <Nav.Link onClick={() => navigate('/mypage')} className="cursor-pointer">{userInfo?.name}님 환영합니다.</Nav.Link>
                  <ProfileButton onClick={() => navigate('/feeinput')}>관리비 입력</ProfileButton>
                  <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                </Mypage>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </FixedHeader>
      
      <Content>
        <Outlet />
      </Content>

      <StyledFooter>
        &copy; 코딩하는오합지졸. All Rights Reserved.
      </StyledFooter>
    </>
  );
};

export default Layout;
