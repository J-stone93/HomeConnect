import './App.css';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './components/Layout';
import Menu4 from './components/Menu4';
import Menu2 from './components/Menu2';
import Menu3 from './components/Menu3';
import MyPage from './components/MyPage';
import SignUp from './pages/login/SignUp';
import NoticeMain from "./features/notice/NoticeMain";
import NoticeList from './features/notice/NoticeList';
import NoticeListDetail from './features/notice/NoticeListDetail';

import Register from './pages/login/Register';
import NoMatchPage from './pages/NoMatchPage';
import SignUp1 from './pages/login/SignUp1';
import SignUp2 from './pages/login/SignUp2';
import SignUp3 from './pages/login/SignUp3';
import Signup4 from './pages/login/Signup4';

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
import CommunityItem from './components/community/CommunityItem.jsx';


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
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}>
            <Route index element={<Register />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signup1' element={<SignUp1 />} />
            <Route path='signup2' element={<SignUp2 />} />
            {/* <Route path='signup3' element={<SignUp3 />} /> */}
            <Route path='signup4' element={<Signup4 />} />
          </Route>
          <Route path='/' element={<Layout />} >
            <Route index element={<Main />} />
            <Route path='mypage' element={<MyPage />} />
            <Route path='feeinput' element={<FeeInputPage />} />
            <Route path='feedetail' element={<FeeChartDetail />} />
            <Route path='menu2' element={<Menu2 />} />
            <Route path='menu3' element={<Menu3 />} />
            
            <Route path='menu4' element={<Menu4 />}>
              <Route index element={<BoardList />} />
              <Route path='board' element={<Boardmain />} />
              <Route path='boardlist' element={<BoardList />} />
              <Route path='read/:boardId' element={<BoardListDetail />} />
              <Route path='noticemain' element={<NoticeMain />} />
              <Route path='noticelist' element={<NoticeList />} />
              <Route path='noticelist/:boardId' element={<NoticeListDetail />} />
              <Route path='community' element={<Community />}/>
              <Route path='communitycategory' element={<CommunityCategory />}/>
              <Route path='communityregister' element={<CommunityRegister />}/>
              <Route path='communityread/:communityId' element={<CommunitySignUp />}/>
              <Route path='community/:categoryId' element={<CommunityItem />}/>
              <Route path='map' element={<Map />}/>
            </Route>
            {/* <Route path='/management' element={<Management />}/> */}

            {/* 나중에 params로 아이디에 맞는 메뉴화면 나오도록 하기 */}
            {/* <Route path='health' element={<Health/>}/> */}
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