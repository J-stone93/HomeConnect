import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";

const TableWrapper = styled(Table)`
	text-align: left;
	margin-top: 20px;
	width: 100%;
	font-size: 20px;

	thead th,
	tbody td {
		vertical-align: middle;
	}
`;

function BoardList() {
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	useEffect(() => {
		const fetchBoardList = async () => {
			try {
				const response = await axios.get('http://localhost:8080/menu4/boardlist', {
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				});
				if (response.status === 200) {
					console.log(response.data);
					setPosts(response.data);
				} else {
					throw new Error(`API error: ${response.status} ${response.statusText}`);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchBoardList();
	}, []);

	return (
		<>
			<Button variant="primary" onClick={() => navigate('/menu4/board')}>게시글 작성</Button>
			<TableWrapper>
				<thead>
					<tr>
						<th>게시물 번호</th>
						<th>제목</th>
						<th>작성일자</th>
						<th>작성자ID</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{posts.map((post) => (
						<tr key={post.no} onClick={() => navigate(`/menu4/read/${post.no}`)}>
							<td>{post.no}</td>
							<td>{post.title}</td>
							<td>{formatDate(post.regDate).slice(0, 12)}</td>
							<td>{post.writer}</td>
							<td>
								{/* {
									localStorage.getItem
								if (localStorage.getItem('user').writer) {

								}
								} */}
								<BsPencilSquare className="cursor-pointer w-25 h-25" />
								<CiSquareRemove className="cursor-pointer w-25 h-25" />
							</td>
						</tr>
					))}
				</tbody>
			</TableWrapper>
		</>
	);
}

export default BoardList;
