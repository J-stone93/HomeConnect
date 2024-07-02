import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px;
  position: relative;
`;

// 마커 스타일링을 위한 styled-components
const MarkerContainer = styled.div`
  background-color: #007bff;
  color: white;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
`;

// 정보창 스타일링을 위한 styled-components
const InfoWindowContainer = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 5px 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  outline: none;

  &::placeholder {
    color: #bbb;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  font-size: 20px;
  color: #007bff;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh; /* 수정: 더 작은 값으로 조정 */
`;

const CategoryList = styled.ul`
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  background-color: #f1f1f1;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &.on {
    background-color: #007bff;
    color: white;
  }
`;

function Map(){
  const [inputValue, setInputValue] = useState(""); // 검색창 useS
  const [currCategory, setCurrCategory] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null); // 정보창 상태 추가

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map"); // 지도를 표시할 div 요소
      const options = {
        center: new window.kakao.maps.LatLng(37.452381, 126.699562), // 그린컴퓨터아카데미를 중심으로 초기화
        level: 5, // 지도의 확대 레벨
      };

      // 지도 생성 및 객체 리턴
      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap); // 상태에 지도 객체 저장
    };

    // Kakao 지도 API가 로드된 후 실행될 콜백 함수
    if (window.kakao && window.kakao.maps) {
      initMap();
      
    } else {
      // Kakao 지도 API 스크립트를 동적으로 로드
      const script = document.createElement("script");
      script.async = true;
      script.src ="//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries&libraries=services";
      script.onload = initMap; // 스크립트 로드 후 initMap 함수 실행
      document.head.appendChild(script);
    }
  }, []);

  const closeInfoWindow = () => {
    // 기존에 열려있던 정보창 닫기
    if (infoWindow) {
      infoWindow.close();
    }
  }

  // 태그 클릭 핸들러
    const onClickCategory = (e) => {
      const id = e.target.id; // 클릭된 id를 가져온다.
      if (!id || currCategory === id) {
        setCurrCategory(''); // 현재 카테고리를 초기화
        changeCategoryClass(null); // 카테고리의 클래스를 변경하여 선택 상태 헤제
        searchPlaces(null); // 마커 제거하지 않고 장소 검색만 수행
      } else {
        setCurrCategory(id); // 클릭된 요소의 id를 현재 카테고리로 설정
        changeCategoryClass(id); // 클릭된 카테고리에 대한 스타일을 변경하여 선택 상태를 나타낸다.
        searchPlaces(id);
      }
    };

  const searchPlaces = (category) => {
    if (!category) return;
    // 지도맵에서 장소를 특정하는 걸 말한다. 
    // new는 객체를 생성한다는 뜻이다.
    const ps = new window.kakao.maps.services.Places(map); 
    ps.categorySearch(category, placesSearchCB, { useMapBounds: true });
  };

  const InputPlaces = () => {
    if (!inputValue || !map) return;
    const ps = new window.kakao.maps.services.Places(map);
    ps.keywordSearch(inputValue, placesSearchCB);
  };

  const displayPlaces = (places) => {
    removeMarker();// 모든 마커들을 제거

    for (let i = 0; i < places.length; i++) {
      // 장소 데이터를 기반으로 마커를 추가하고 makers에 배열 추가
      const marker = addMarker(new window.kakao.maps.LatLng(places[i].y, places[i].x), places[i]);
      markers.push(marker);
    }
  };

  const placesSearchCB = (data, status) => {
    // 검색 결과가 있을 경우 displayPlaces 함수를 호출하여 장소들을 표시합니다.
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
      InputdisplayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      console.log('검색 결과가 없습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      console.error('검색 중 오류가 발생했습니다.');
    }
  };

    // 이거 응용
    const InputdisplayPlaces = (places) => {
      removeMarker();
      const newMarkers = places.map((place) =>
        addMarker(new window.kakao.maps.LatLng(place.y, place.x), place)
      );
      setMarkers(newMarkers);
    };

  // 지도상의 특정위치를 표시함수 생성
  const addMarker = (position, placeInfo) => {
    const marker = new window.kakao.maps.Marker({ // 지도상의 특정위치를 표시할 수 있다.
      position: position, // position는 위도 경도 값을 내기 위해 사용한다.
    });

    // 마커 클릭 이벤트 추가
    window.kakao.maps.event.addListener(marker, 'click', () => {
      displayPlaceInfo(marker, placeInfo);
    });

    marker.setMap(map);  // maker를 setmat함수에 map저장
    return marker; // marker를 리턴해서 값을 살려준다.
  };

  const displayPlaceInfo = (marker, place) => {
    closeInfoWindow();
    
    let content = '<div class="placeinfo">' +
      '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';
  
    if (place.road_address_name) {
      content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
        '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
    } else {
      content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    }
  
    content += '    <span class="tel">' + place.phone + '</span>';
  
    // 예시: 영업 시간 표시
    if (place.opening_hours) {
      content += '    <span class="opening-hours">' + place.opening_hours + '</span>';
    }
  
    // 예시: 리뷰 정보 표시
    if (place.reviews && place.reviews.length > 0) {
      content += '<div class="reviews">';
      place.reviews.forEach(review => {
        content += '<div class="review">' +
          '   <span class="reviewer">' + review.author + '</span>' +
          '   <span class="review-text">' + review.text + '</span>' +
          '</div>';
      });
      content += '</div>';
    }
  
    content += '</div>' +
      '<div class="after"></div>';
  
    const newInfoWindow = new window.kakao.maps.InfoWindow({
      content: content,
      position: marker.getPosition(),
    });
  
    setInfoWindow(newInfoWindow);
    newInfoWindow.open(map, marker);
  };

  // 마커숨김
  const removeMarker = () => {
    markers.forEach(marker => marker.setMap(null)); // 마커를 숨길려고 쓰는 명령어이다.
    setMarkers([]); // 마커 배열을 비워서 모든 마커를 제거한다.

  };

  // classList는 classname추가 시킬 수 있는 명령어이다.
  const changeCategoryClass = (id) => {
    const category = document.getElementById('category'); // id가 'category'인 요소를 가져옵니다.
    const children = category.children; // 'category' 요소의 자식 요소들을 가져옵니다.
    
    // 모든 자식 요소의 'on' 클래스를 제거합니다. 
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('on');
    }
    // 만약 id가 주어졌다면 해당 id를 가진 요소에 'on' 클래스를 추가합니다.
    if (id) {
      document.getElementById(id).classList.add('on'); 
    }
  };

  useEffect(() => {
    if (!map) return; // 만약 맵이 없다면 함수는 실행시키지 않는다.

    const category = document.getElementById('root'); // id가 'root'인 요소를 가져옵니다.
    const children = category.children; // 'root' 요소의 자식 요소들을 가져옵니다.
    // 모든 자식 요소에 클릭 이벤트 리스너를 추가합니다.
    for (let i = 0; i < children.length; i++) {
      children[i].addEventListener('click', onClickCategory);
    } 
    return () => {
      // 모든 자식 요소에 추가했던 클릭 이벤트 리스너를 제거한다.
      for (let i = 0; i < children.length; i++) {
        children[i].removeEventListener('click', onClickCategory);
      }
    };
  }, [map]); // 만약 map함수가 변하면 값이 변환다.

   // 이거 응용
  const InputhandleSearch = () => {
    InputPlaces();
  };

  const EnterSearch = (e) => {
    if (e.key === 'Enter') {
      InputPlaces();
    }
    
  };

  return (
    <Container>

      <SearchContainer>
        
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={EnterSearch}
          placeholder="검색어를 입력하세요"
        />

        <Button onClick={() => InputhandleSearch()}>
          <SearchIcon>🔍</SearchIcon>
        </Button>
        
      </SearchContainer>

        <CategoryList id="category">
          <CategoryItem id="BK9" className={currCategory === 'BK9' ? 'on' : ''} active={currCategory === 'BK9'}>
            <span className="category_bg bank"></span>
            은행
          </CategoryItem>

          <CategoryItem id="MT1" className={currCategory === 'MT1' ? 'on' : ''} active={currCategory === 'MT1'}>
            <span className="category_bg mart"></span>
            대형마트
          </CategoryItem>

          <CategoryItem id="HP8" className={currCategory === 'HP8' ? 'on' : ''} active={currCategory === 'HP8'}>
            <span className="category_bg pharmacy"></span>
            병원
          </CategoryItem>
          
          <CategoryItem id="CT1" className={currCategory === 'CT1' ? 'on' : ''} active={currCategory === 'CT1'}>
            <span className="category_bg oil"></span>
            문화시설
          </CategoryItem>

          <CategoryItem id="CE7" className={currCategory === 'CE7' ? 'on' : ''} active={currCategory === 'CE7'}>
            <span className="category_bg cafe"></span>
            카페
          </CategoryItem>

          <CategoryItem id="CS2" className={currCategory === 'CS2' ? 'on' : ''} active={currCategory === 'CS2'}>
            <span className="category_bg store"></span>
            편의점
          </CategoryItem>

          <CategoryItem id="FD6" className={currCategory === 'FD6' ? 'on' : ''} active={currCategory === 'FD6'}>
            <span className="category_bg store"></span>
            음식점
          </CategoryItem>
        </CategoryList>

      <MapContainer id="map">
        {/* 지도가 표시될 영역 */}
      </MapContainer>

    </Container>
  );
};

export default Map;