import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LoadingImg = styled.img`
  position: absolute;
  width: 25vw;
  height: 25vh;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  transition: all 0.3s;
`;

function Loading() {
  return (
    <Wrapper>
      <LoadingImg src="/image/loading.gif" alt="" />
    </Wrapper>
  );
};

export default Loading;