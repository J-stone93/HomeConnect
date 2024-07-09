import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const ContentWrapper = styled.div`
  padding: 20px;
`;

function Menu4() {
  return (
    <ContentWrapper>
      < Outlet />
    </ContentWrapper>
  );
}

export default Menu4;
