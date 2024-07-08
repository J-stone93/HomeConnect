import React from "react";
import styled from 'styled-components';


const SidebarContainer = styled.div`
/* position: fixed; */
width: 100px;
height: 105vh;
background-color: #F8F9FA;
padding: 30px;
transition: 1s;
bottom: 10%;

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

function Mapsidebar() {
  return (
    <>
      <Mapsidebar></Mapsidebar>
    </>
  );
};

export default Mapsidebar;