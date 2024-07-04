// import { styled } from "styled-components";

// import { useState } from "react";
// import { Modal } from "react-bootstrap";

// const Container = styled(Modal.Body)`
//   width: 500px;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalTitle = styled.input`
//   width: 100%;
//   height: 50px;
//   margin: 0 auto 10px;
//   font-size: 16px;
//   padding: 10px;
//   border: 1px solid #ccc;
// `;

// const ModalContent = styled.textarea`
//   width: 100%;
//   min-height: 400px;
//   margin: 0 auto 10px;
//   overflow: auto;
//   padding: 10px;
//   font-size: 16px;
//   resize: none;
// `;


// function CommunityModal() {
//   // const { communityList } = props;
//   const [titleValue, setTitleValue] = useState(communityList.title);
//   const [contentValue, setContentValue] = useState(communityList.content);

//   // console.log(communityList);
//   // const handleChangeTitle = (e) => {
//   //   setTitleValue(e.target.value);
//   // };

//   // const handleChangeContent = (e) => {
//   //   setContentValue(e.target.value);
//   // };

//   return (
//     <Modal onHide={handleModalClose} backdrop="static">
//       <Modal.Header closeButton>
//         <Modal.Title>모임 내용 수정</Modal.Title>
//       </Modal.Header>
//       <Container>
//         <ModalTitle
//           value={titleValue}
//           onChange={handleChangeTitle}
//         />
//         <ModalContent
//           value={contentValue}
//           onChange={handleChangeContent}
//         />
//       </Container>
//       <Modal.Footer>
//         {/* <Button variant="primary" onClick={addBoardComment}> */}
//         <Button variant="primary" >
//           확인
//         </Button>
//         {/* <Button variant="secondary" onClick={handleModalClose}> */}
//         <Button variant="secondary">
//           취소
//         </Button>
//       </Modal.Footer>
//     </Modal >
//   );
// };

// export default CommunityModal;