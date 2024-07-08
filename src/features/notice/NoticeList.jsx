import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectNoticeInfo } from '../board/boardSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function NoticeList() {
    const NoticeList = useSelector(selectNoticeInfo);
    const navigate = useNavigate();
    const TableWrapper = styled(Table)`
        margin-top: 20px;
        width: 100%;
    `;

    return (
    <>
        <Button variant="primary" onClick={()=>{navigate('/menu4/Noticemain')}}>게시글 작성</Button>
        <TableWrapper>
            <thead>
                <tr>
                    <th>게시물 번호</th>
                    <th>제목</th>
                    <th>작성일자</th>
                    <th>작성자ID</th>
                </tr>
            </thead>

            {NoticeList.map((post, index) => (
                <tbody onClick={() => navigate(`${post.id}`)}>
                    <tr key={post.id}>
                        <td>{index + 1}</td>
                        <td>{post.title}</td>
                        <td>{post.date}</td>
                        <td>작성자 ID</td>
                    </tr>
                </tbody>
            ))}
        </TableWrapper>
    </>
    );
}

export default NoticeList;