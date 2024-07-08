import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import BoardSidebar from "../features/board/BoardSidebar";

const Wrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  flex: 1;
  /* 왜 된거지? */
`;

function Menu4() {
  return (
    <Wrapper>
      <ContentWrapper>
        < Outlet />
      </ContentWrapper>
    </Wrapper>
  );
}

export default Menu4;
