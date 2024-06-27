import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { IoIosHome } from "react-icons/io";

const StyledNavbar = styled(Navbar.Brand)`
  text-align: center;
  align-items: center; /* 수직 가운데 정렬 */

  &:hover {
    color: green;
  }
`;

const Mypage = styled(Navbar.Text)`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  img{
    width: 50px;
    margin-right: 10px;
  }
  footer{
    position: absolute;
    bottom: 0;
  }
`;

const ContentContainer = styled.div`
  /* padding-bottom: 100px; // 하단 여백 추가 */
`;

function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <Navbar className="bg-body-tertiary">
            <Navbar.Collapse>
              <IoIosHome onClick={() => navigate('/')} className="cursor-pointer"/>
            </Navbar.Collapse>
            <StyledNavbar onClick={()=>{navigate('/feedetail')}} className="cursor-pointer">관리비</StyledNavbar>
            <StyledNavbar onClick={()=>{navigate('/menu2')}} className="cursor-pointer">MENU2</StyledNavbar>
            <StyledNavbar onClick={()=>{navigate('/menu3')}} className="cursor-pointer">MENU3</StyledNavbar>
            <StyledNavbar onClick={()=>{navigate('/menu4')}} className="cursor-pointer">MENU4</StyledNavbar>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Mypage>
                <img src="image/profile.png" alt="profile" />
                <Nav.Link onClick={()=>{navigate('/mypage')}} className="cursor-pointer">000호 입주자</Nav.Link>
                <button type='text' onClick={() => navigate('/feeinput')}>관리비 입력</button>
              </Mypage>
            </Navbar.Collapse>
        </Navbar>
      </header>

      {/* 자식컴포넌트들이 나올 자리들 */}
      <ContentContainer>
        <Outlet />
      </ContentContainer>

      <footer>
        <p className="py-5 mb-0 bg-dark text-white text-center">
          &copy; 코딩하는오합지졸. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Layout;