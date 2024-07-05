import axios from "axios";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  img {
    width: 100px;
    height: 100px;
  }
  tbody {
  }
  tr {
    padding-top: 20px;
    width: 600px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;



function CommunityItem(props) {
  const { categoryName } = props;
  const { categoryId = '맛집' } = useParams();
  console.log(categoryName);

  const navigate = useNavigate()
  const [communityList, setcommunityList] = useState();

  // 날짜 포맷하기
  const formatDate = (dateString) => {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

  // db에서 community전체 목록 갖고 와서 렌더링하기
  // useEffect(() => {
  //   const communitylist = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/menu4/community`, {
  //         headers : {
  //           Authorization : localStorage.getItem('token'),
  //         }
  //       });
  //       setcommunityList(response.data);
  //       if (response.status === 200) {
  //         // return dispatch(getBoardList(response.data));
  //       } else {
  //         throw new Error(`api error: ${response.status} ${response.statusText}`);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   communitylist();
  // }, []);

  // DB에서 community 카테고리 별 목록 가져오기
  useEffect(() => {
    const communitylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/menu4/communitycategory?category=${categoryName}`, {
          headers : {
            Authorization : localStorage.getItem('token'),
          }
        });
        setcommunityList(response.data);
        if (response.status === 200) {
          // return dispatch(getBoardList(response.data));
        } else {
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    communitylist();
  }, [categoryName]);

  // console.log(communityList);
  return (
    <Wrapper>
      <table>
        {communityList && communityList.map((communityItem) => (
          <tbody key={communityItem.no} onClick={() => navigate(`/menu4/communityread/${communityItem.no}`)}>
            <tr>
              <td><img src={`../../image/${communityItem.imgPath}`} alt="" /></td>
              {/* <img src="/image/여우.jpg" alt="여행" /> */}
              <td>{communityItem.title}</td>
              <td>작성자:{communityItem.writer}</td>
              <td>개설일:{formatDate(communityItem.regDate).slice(0, 12)}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </Wrapper>
  );
};

export default CommunityItem;