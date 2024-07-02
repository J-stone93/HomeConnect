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
    vertical-align:middle;
  }
  div {
  }
`;



function CommunityItem() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [communityList, setcommunityList] = useState();


  // db에서 community데이터 갖고 와서 렌더링하기
  useEffect(() => {
    const communitylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/menu4/community`);
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
  }, []);

  console.log(communityList);
  return (
    <Wrapper>
      {communityList && communityList.map((communityItem) => (
        <table>
          <tbody onClick={() => navigate(`/menu4/communityread/${communityItem.no}`)}>
            <tr key={communityItem.no}>
              <td><img src={`../../image/${communityItem.imgPath}`} alt="" /></td>
              {/* <img src="/image/여우.jpg" alt="여행" /> */}
              <td>{communityItem.title}</td>
              <td>작성자:{communityItem.writer}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </Wrapper>
  );
};

export default CommunityItem;