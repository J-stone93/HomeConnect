import './App.css';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './components/Layout';
import MyPage from './components/MyPage';
import SignUp from './pages/login/SignUp';

import Register from './pages/login/Register';
import NoMatchPage from './pages/NoMatchPage';

import FeeInputForm from './components/FeeInputForm';
import FeeInputPage from './components/FeeInputPage';

import Map from './features/map/Map';

import Community from './components/community/Community';
import FeeChartDetail from './components/FeeChartDetail';
import CommunityCategory from './components/community/CommunityCategory';
import CommunityRegister from './components/community/CommunityRegister.jsx';
import CommunitySignUp from './components/community/CommunitySignUp.jsx';
import Boardmain from './features/board/Boardmain.jsx';
import BoardListDetail from './features/board/BoardListDetail.jsx';
import BoardList from './features/board/BoardList.jsx';
import BoardModify from './features/board/BoardModify.jsx';
import CalendarMain from './components/calendar/CalendarMain.jsx';
import Loading from './components/Loading.jsx';
import { useEffect, useState } from 'react';
import NoticeMain from './features/board/notice/NoticeMain.jsx';
import NoticeListDetail from './features/board/notice/NoticeListDetail.jsx';
import NoticeModify from './features/board/notice/NoticeModify.jsx';


const GlobalStyle = createGlobalStyle`
  
  body{
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
    font-family: "Pretendard-Regular";
  }

  .cursor-pointer{
    cursor: pointer;
  }


`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}>
            <Route index element={<Register />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
          {/* <Route path='/' element={
            isLoading ? (<Loading />) : <> <Layout /> </>
          } > */}
          <Route path='/' element={<Layout/>}>
            <Route index element={<Main />} />
            <Route path='mypage' element={<MyPage />} />

            <Route path='feeinput' element={<FeeInputPage />} />
            <Route path='feedetail' element={<FeeChartDetail />} />

            <Route path='calendar' element={<CalendarMain />} />

            <Route path='community' element={<Community />}/> 
            <Route path='communitycategory' element={<CommunityCategory />}/>
            <Route path='communityregister' element={<CommunityRegister />}/>
            <Route path='communityread/:communityId' element={<CommunitySignUp />}/>

            <Route path='map' element={<Map />} />

            <Route path='board' element={<Boardmain />} />
            <Route path='boardlist' element={<BoardList />} />
            <Route path='boardread/:boardId' element={<BoardListDetail />} />
            <Route path='boardmodify/:boardId' element={<BoardModify/>} />

            <Route path='notice' element={<NoticeMain />} />
            <Route path='noticeread/:noticeId' element={<NoticeListDetail />} />
            <Route path='noticemodify/:noticeId' element={<NoticeModify/>} />
          </Route>
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// 라이브러리, 변수명 정리, 사이트 디자인 관련, 아이디어, 사용 api 정리, 화면설계서, 
// 요구사항정의서, 

// 결제시스템, 소셜로그인, 실제 기능 구현가능한 것들, 관리비 통계(다른 사이트 참고)

// 월별 관리비 통계

// 스프링 브랜치 삭제 - 깃모드에서 로컬삭제하고 기본모드에서 팀-리모트-푸쉬 next-삭제할 브랜치 add하고 삭제 및 푸쉬