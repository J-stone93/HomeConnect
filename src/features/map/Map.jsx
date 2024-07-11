import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./Mapstyle.css";

const Container = styled.div`
  margin: 30px;
  display: flex;
`;

const Sidebar = styled.div`
  width: 330px;
  /* background-color: #f1f1f1; */
  /* padding: 20px; */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: #f1f1f1; */
  padding: 10px;
  /* border-radius: 5px; */
  margin-bottom: 20px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 9px;
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
  height: 100vh;
`;

const SearchResults = styled.div`
  position: absolute;
  width: 297px; /* 왼쪽과 오른쪽 padding 고려하여 너비 조정 */
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9; /* 검색 결과 목록을 검색창 아래로 내리기 위해 z-index를 낮춤 */
  border-radius: 10px; /* 동그란 테두리 조정 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  top: 18.9%; /* 검색창과의 간격 조정 */
`;

const CategoryList = styled.ul`
  /* margin-top: 20px; */
  list-style-type: none;
  padding: 0;
`;

const ResultItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }

  &.selected {
    background-color: #f9f9f9; /* 선택된 항목의 배경색 */
    font-weight: bold; /* 선택된 항목의 글꼴 굵기 */
    color: #007bff; /* 선택된 항목의 글자색 */
  }
`;

const CategoryItem = styled.li`
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  background-color: ${(props) => (props.selected ? "#007bff" : "#f1f1f1")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.selected ? "#007bff" : "#ddd")};
    color: ${(props) => (props.selected ? "white" : "black")};
  }
`;

function Map() {
  // 상태 관리를 위한 useState 훅 사용
  const [inputValue, setInputValue] = useState(""); // 검색어 입력 상태
  const [selectedCategories, setSelectedCategories] = useState([]); // 선택된 카테고리 상태
  const [map, setMap] = useState(null); // Kakao 지도 객체 상태
  const [markers, setMarkers] = useState([]); // 마커 배열 상태
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1); // 선택된 항목 인덱스 상태
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null); // 상세 정보를 저장할 상태 변수

  const infoWindow = useRef(); // Kakao 지도 인포윈도우 useRef 사용
  const timerRef = useRef(null); // 검색 디바운스 타이머 useRef 사용
  const searchResultsRef = useRef(null);

  // Kakao 지도 초기화 및 설정
  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.452381, 126.699562),
        level: 5,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap); // 지도 객체 설정
    };

    // Kakao 지도 API 스크립트 로드
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries=services";
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  // 선택된 장소가 변경될 때마다 처리
  useEffect(() => {
    if (selectedPlace && map) {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(selectedPlace.y, selectedPlace.x),
      });

      // 이미 열려 있는 인포윈도우 닫기
      if (infoWindow.current) {
        infoWindow.current.close();
      }

      // 새로운 인포윈도우 생성
      const newInfoWindow = new window.kakao.maps.InfoWindow({
        position: marker.getPosition(),
      });

      // 인포윈도우 컨텐츠 설정
      const content = document.createElement("div");
      content.style.padding = "10px";
      content.style.width = "200px";
      content.innerHTML = `
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">
          ${selectedPlace.place_name}
        </div>
        <div style="font-size: 14px;">
          ${selectedPlace.road_address_name || selectedPlace.address_name}
        </div>
      `;

      // 인포윈도우에 컨텐츠 설정 및 지도에 표시
      newInfoWindow.setContent(content);
      newInfoWindow.open(map, marker);

      // 현재 인포윈도우로 설정
      infoWindow.current = newInfoWindow;

      // 마커 지도에 추가 및 상태 업데이트
      marker.setMap(map);
      setMarkers([marker]);

      // 검색 결과 초기화 및 입력값 초기화
      setSearchResults([]);
      // setInputValue("");
    }
  }, [selectedPlace, map]);

  // 입력값 변경 시 호출되는 핸들러
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 타이머 클리어 및 디바운스 처리
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 입력값이 변경된 경우 디바운스 처리
    timerRef.current = setTimeout(() => {
      if (value.trim() !== "") {
        const ps = new window.kakao.maps.services.Places(map);
        ps.keywordSearch(value, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setSearchResults(data);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            setSearchResults([]);
            console.log("검색 결과가 없습니다.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            console.error("검색 중 오류가 발생했습니다.");
          }
        });
      } else {
        setSearchResults([]);
      }
    }, 300);
  };

  // 장소 선택 시 호출되는 핸들러
  const handleSelectPlace = (place) => {
    // 선택된 장소의 마커를 생성하여 지도에 표시
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
  
    // 마커 클릭 시 장소 정보 표시
    window.kakao.maps.event.addListener(marker, "click", function () {
      displayPlaceInfo(marker, place);
    });
  
    marker.setMap(map); // 지도에 마커 표시

    // 검색 결과 목록을 비웁니다.
    setSearchResults([]);

    // 지도를 선택된 장소의 위치로 이동
    map.panTo(new window.kakao.maps.LatLng(place.y, place.x));

    setSelectedItemIndex(-1); // Clear selected item index

    setInputValue(place.place_name);
  };

  // Kakao 지도 이벤트 설정
  useEffect(() => {
    if (!map) return;

    window.kakao.maps.event.addListener(map, "click", () => {
      if (infoWindow.current) {
        infoWindow.current.close();
      }
    });
  }, [map]);

  // 장소 정보를 표시하는 함수
  const displayPlaceInfo = (marker, place) => {
    if (infoWindow.current) {
      infoWindow.current.close();
    }

    const newInfoWindow = new window.kakao.maps.InfoWindow({
      position: marker.getPosition(),
    });

    const content = document.createElement('div');
    content.className = 'info-window';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = 'X';
    closeButton.onclick = () => newInfoWindow.close();

    content.appendChild(closeButton);

    const title = document.createElement('a');
    title.className = 'title';
    title.href = place.place_url;
    title.target = '_blank';
    title.innerText = place.place_name;
    content.appendChild(title);

    // 추가: 위도와 경도 표시
    const coordinates = document.createElement('div');
    coordinates.className = 'coordinates';
    coordinates.innerText = `위도: ${place.y}, 경도: ${place.x}`;
    content.appendChild(coordinates);

    if (place.road_address_name) {
      const addressDiv = document.createElement('div');
      addressDiv.className = 'address';
      const roadAddressSpan = document.createElement('span');
      roadAddressSpan.title = place.road_address_name;
      roadAddressSpan.innerText = place.road_address_name;
      addressDiv.appendChild(roadAddressSpan);
      addressDiv.appendChild(document.createElement('br'));
      const jibunSpan = document.createElement('span');
      jibunSpan.className = 'jibun';
      jibunSpan.title = place.address_name;
      jibunSpan.innerText = `(지번 : ${place.address_name})`;
      addressDiv.appendChild(jibunSpan);
      content.appendChild(addressDiv);
    } else {
      const addressDiv = document.createElement('div');
      addressDiv.className = 'address';
      const addressSpan = document.createElement('span');
      addressSpan.title = place.address_name;
      addressSpan.innerText = place.address_name;
      addressDiv.appendChild(addressSpan);
      content.appendChild(addressDiv);
    }

    if (place.phone) {
      const telDiv = document.createElement('div');
      telDiv.className = 'tel';
      telDiv.innerText = place.phone;
      content.appendChild(telDiv);
    }

    if (place.opening_hours) {
      const openingHoursDiv = document.createElement('div');
      openingHoursDiv.className = 'opening-hours';
      openingHoursDiv.innerText = place.opening_hours;
      content.appendChild(openingHoursDiv);
    }

    if (place.reviews && place.reviews.length > 0) {
      const reviewsDiv = document.createElement('div');
      reviewsDiv.className = 'reviews';
      place.reviews.forEach((review) => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        const reviewerSpan = document.createElement('span');
        reviewerSpan.className = 'reviewer';
        reviewerSpan.innerText = review.author;
        reviewDiv.appendChild(reviewerSpan);
        const reviewTextSpan = document.createElement('span');
        reviewTextSpan.className = 'review-text';
        reviewTextSpan.innerText = review.text;
        reviewDiv.appendChild(reviewTextSpan);
        reviewsDiv.appendChild(reviewDiv);
      });
      content.appendChild(reviewsDiv);
    }

    newInfoWindow.setContent(content);
    newInfoWindow.open(map, marker);
    infoWindow.current = newInfoWindow;
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (selectedItemIndex < searchResults.length - 1) {
        setSelectedItemIndex(selectedItemIndex + 1);
        scrollToItem(selectedItemIndex + 1);
         // 선택된 항목의 텍스트를 실시간으로 검색창에 반영
        setInputValue(searchResults[selectedItemIndex + 1].place_name);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (selectedItemIndex > 0) {
        setSelectedItemIndex(selectedItemIndex - 1);
        scrollToItem(selectedItemIndex - 1);
        // 선택된 항목의 텍스트를 실시간으로 검색창에 반영
        setInputValue(searchResults[selectedItemIndex - 1].place_name);
      }
    } else if (event.key === "Enter") {
      if (selectedItemIndex !== -1) {
        // 검색창에 선택된 항목의 텍스트를 입력
        setInputValue(searchResults[selectedItemIndex].place_name);
        // 선택된 항목 처리
        handleSelectPlace(searchResults[selectedItemIndex]);
        setSelectedItemIndex(-1);
      } else if (inputValue.trim() !== "") {
        // 검색어가 입력된 경우 검색 실행
        handleSearchClick();
      } else {
        // 검색어가 없는 경우 처리
        console.log("검색어를 입력하세요");
      }
    }
  };

  const scrollToItem = (index) => {
    if (searchResultsRef.current && searchResultsRef.current.children.length > index) {
      const item = searchResultsRef.current.children[index];
      item.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // 검색 결과를 지도에 표시하는 함수
  const displayPlaces = (places) => {
    markers.forEach((marker) => marker.setMap(null)); // 기존 마커 제거

    const newMarkers = places.map((place) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      // 마커 클릭 시 장소 정보 표시
      window.kakao.maps.event.addListener(marker, 'click', function () {
        displayPlaceInfo(marker, place);
      });

      marker.setMap(map); // 지도에 마커 표시
      return marker;
    });

    setMarkers(newMarkers); // 마커 상태 업데이트
  };

  // 장소 검색 결과 콜백 함수
  const placesSearchCB = (data, status) => {
    console.log(placesSearchCB);
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data); // 검색 결과를 지도에 표시
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      console.log("검색 결과가 없습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      console.error("검색 중 오류가 발생했습니다.");
    }
  };

  // 카테고리별 장소 검색 함수
  const searchPlaces = (category) => {
    if (!category || !map) return;

    const ps = new window.kakao.maps.services.Places(map);
    ps.categorySearch(category, placesSearchCB, { useMapBounds: true });
  };

  // 마커 제거 함수
  const removeMarkers = () => {
    markers.forEach((marker) => marker.setMap(null)); // 모든 마커 지도에서 제거
    setMarkers([]); // 마커 상태 초기화
  };

  // 카테고리 선택 상태 토글 함수
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const isSelected = prevCategories.includes(categoryId);
  
      if (isSelected) {
        // 선택 해제 시
        const filteredCategories = prevCategories.filter((cat) => cat !== categoryId);
        setSelectedCategories(filteredCategories);
  
        // 해당 카테고리에 맞는 마커 제거
        const filteredMarkers = markers.filter((marker) => marker.category !== categoryId);
        filteredMarkers.forEach((marker) => marker.setMap(null));
        setMarkers(filteredMarkers);
  
        // 선택된 장소의 상세 정보가 열려 있다면 닫기
        if (selectedPlace && selectedPlace.category === categoryId) {
          if (infoWindow.current) {
            infoWindow.current.close();
          }
          setSelectedPlace(null);
        }
      } else {
        // 선택 시
        setSelectedCategories([...prevCategories, categoryId]);
  
        // 검색 결과에서 해당 카테고리에 맞는 장소만 필터링하여 places 배열 생성
        const filteredPlaces = searchResults.filter((place) => place.category === categoryId);
  
        // 새로운 마커 생성
        const newMarkers = filteredPlaces.map((place) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(place.y, place.x),
            category: categoryId, // 마커에 카테고리 속성 추가
          });
  
          // 마커 클릭 시 장소 정보 표시
          window.kakao.maps.event.addListener(marker, "click", function () {
            displayPlaceInfo(marker, place);
          });
  
          marker.setMap(map); // 지도에 마커 표시
          return marker;
        });

        setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
      }
  
      return prevCategories;
    });
  };

  // 선택된 카테고리가 변경될 때마다 호출되는 useEffect
  useEffect(() => {
    if (!map) return;

    removeMarkers(); // 기존 마커 모두 제거

    // 선택된 모든 카테고리에 대해 장소 검색 실행
    selectedCategories.forEach((category) => {
      searchPlaces(category);
    });
  }, [selectedCategories, map]);

// 검색 버튼 클릭 시 호출되는 핸들러
const handleSearchClick = () => {
  // 기존 마커 제거
  removeMarkers();

  if (inputValue.trim() !== "" && map) {
    const ps = new window.kakao.maps.services.Places(map);
    ps.keywordSearch(inputValue, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 첫 번째 장소의 마커를 생성하여 지도에 표시
        if (data.length > 0) {
          const firstPlace = data[0];
          const newCenter = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);
          
          // 지도 이동
          map.panTo(newCenter);
          
          const marker = new window.kakao.maps.Marker({
            position: newCenter,
          });

          // 마커 클릭 시 장소 정보 표시
          window.kakao.maps.event.addListener(marker, "click", function () {
            displayPlaceInfo(marker, firstPlace);
          });

          marker.setMap(map); // 지도에 마커 표시

          // 검색 결과 목록을 비웁니다.
          setSearchResults([]);
        } else {
          setSearchResults([]); // 검색 결과 초기화
          console.log("검색 결과가 없습니다.");
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setSearchResults([]);
        console.log("검색 결과가 없습니다.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        console.error("검색 중 오류가 발생했습니다.");
      }
    });
  } else {
    setSearchResults([]); // 검색 결과 초기화
  }
};



  return (
    <Container>
      <Sidebar>
      <MenuBar>
      <SearchContainer>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
        />
        <Button onClick={handleSearchClick}>
          <SearchIcon>🔍</SearchIcon>
        </Button>
      </SearchContainer>

      {/* 목록창 */}
      {searchResults.length > 0 && (
        <SearchResults ref={searchResultsRef}>
          {searchResults.map((place, index) => (
            <ResultItem 
              key={place}
              onClick={() => handleSelectPlace(place)}
              className={index === selectedItemIndex ? "selected" : ""}
              >
              {place.place_name}
            </ResultItem>
          ))}
        </SearchResults>
      )}

      <CategoryList>
        <CategoryItem
          selected={selectedCategories.includes("BK9")}
          onClick={() => toggleCategory("BK9")}
        >
          은행
        </CategoryItem>

        <CategoryItem
          selected={selectedCategories.includes("MT1")}
          onClick={() => toggleCategory("MT1")}
        >
          대형마트
        </CategoryItem>

        <CategoryItem
          selected={selectedCategories.includes("HP8")}
          onClick={() => toggleCategory("HP8")}
        >
          병원
        </CategoryItem>

        <CategoryItem
          selected={selectedCategories.includes("CT1")}
          onClick={() => toggleCategory("CT1")}
        >
          문화시설
        </CategoryItem>

        <CategoryItem
          selected={selectedCategories.includes("CE7")}
          onClick={() => toggleCategory("CE7")}
        >
          카페
        </CategoryItem>

        <CategoryItem
          selected={selectedCategories.includes("CS2")}
          onClick={() => toggleCategory("CS2")}
        >
          편의점
        </CategoryItem>
      </CategoryList>
      </MenuBar>
        주변정보
      </Sidebar>
      <MapContainer id="map" />
    </Container>
  );
}

export default Map;