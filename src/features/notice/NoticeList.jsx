import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectNoticeInfo } from '../board/boardSlice'; // boardSlice에서 foodList를 선택하는 selector 가져오기
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // styled-components 추가

const StyledTh = styled.th`
    vertical-align: middle;
`;

const CenteredTh = styled(StyledTh)`
    text-align:  justify;
`;

const StyledLinkButton = styled(Link)`
    display: block;
    margin: 2px 0 2px;
`;

const StyledTbody = styled.tbody`
    cursor: pointer;
`;

function NoticeList() {
    const noticeList = useSelector(selectNoticeInfo);
    const navigate = useNavigate();

    return (
        <Table hover>
            <thead>
                <CenteredTh>
                    <StyledLinkButton to="/menu4/noticemain">
                        <Button variant="primary">게시글 작성</Button>
                    </StyledLinkButton>
                </CenteredTh>
                <tr>
                    <StyledTh>게시물 번호</StyledTh>
                    <StyledTh>제목</StyledTh>
                    <StyledTh>작성일자</StyledTh>
                    <StyledTh>작성자ID</StyledTh>

                </tr>
            </thead>

            {noticeList.map((post, index) => (
                <StyledTbody onClick={() => navigate(`${post.id}`)}>
                    <tr key={post.id}>
                        <td>{index + 1}</td>
                        <td>{post.title}</td>
                        <td>{post.date}</td>
                        <td>작성자 ID</td>
                        {/* <td>{post.authorId}</td> */}
                    </tr>
                </StyledTbody>
            ))}
        </Table>
    );
}

export default NoticeList;