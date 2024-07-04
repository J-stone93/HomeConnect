import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const SidebarContainer = styled.div`
width: 200px;
height: 100vh;
background-color: #F8F9FA;
padding: 30px;
transition: 1s;

  p{
    text-align: center;
    padding: 10px;
    border-radius: 10px;
  }

  p:hover{
    transition: 0.5s;
    background-color: #ddaeae;
  }

  .textcolor{
    font-size: 21px;
    font-weight: bold;
    color: blue;
    cursor: pointer;
  }
`;

function BoardSidebar() {
  const navigate = useNavigate();

  return (
    <>
      <SidebarContainer>
        <p onClick={() => navigate('noticelist')} className='textcolor'>공지사항</p>
        <p onClick={() => navigate('boardlist')} className='cursor-pointer'>게시판</p>
        <p onClick={() => navigate('community')} className='cursor-pointer'>모임</p>
        <p onClick={() => navigate('map')} className='cursor-pointer'>지도</p>
      </SidebarContainer>
    </>
  )
}

export default BoardSidebar;