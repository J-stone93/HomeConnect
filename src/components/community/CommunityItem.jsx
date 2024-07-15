import axios from "axios";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  overflow-x: auto; /* 가로 스크롤이 생길 경우를 대비 */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    border-radius: 12px;
    overflow: hidden; /* 테이블 셀이 넘칠 경우를 대비 */
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 25%; /* 이미지를 원형으로 만듦 */
    object-fit: cover; /* 이미지를 적절히 조정하여 테이블 셀에 맞춤 */
  }
  tbody {
  }
  tr {
    background-color: #fafafa; /* 테이블 행 배경색 */
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd; /* 테이블 행 경계선 */
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #e0e0e0; /* 호버 시 배경색 변경 */
    }
  }
  td {
    padding: 10px;
    text-align: left;
  }
`;

function CommunityItem(props) {
  const { categoryName } = props;
  const { categoryId = '맛집' } = useParams();
  const navigate = useNavigate();
  const [communityList, setCommunityList] = useState([]);
  const addressKey = process.env.REACT_APP_HOST_ADDRESS;

  // 날짜 포맷하기
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // DB에서 community 카테고리 별 목록 가져오기
  useEffect(() => {
    const fetchCommunityList = async () => {
      try {
        const response = await axios.get(`${addressKey}/community/category?category=${categoryName}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        });
        if (response.status !== 200) {
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }

        // 데이터 정렬
        const sortedList = response.data.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
        setCommunityList(sortedList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommunityList();
  }, [categoryName]);

  console.log(communityList);
  return (
    <Wrapper>
      <table>
        {communityList && communityList.map((communityItem) => (
          <tbody key={communityItem.no} onClick={() => navigate(`/communityread/${communityItem.no}`)}>
            <tr>
              <td><img src={communityItem.imgPath} alt="" /></td>
              <td>{communityItem.title}</td>
              <td>작성자: {communityItem.writer}</td>
              <td>개설일: {formatDate(communityItem.regDate).slice(0, 12)}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </Wrapper>
  );
};

export default CommunityItem;
