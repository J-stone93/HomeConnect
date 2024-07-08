import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import ReactDOMServer from 'react-dom/server';

const Container = styled.div`
  margin: 30px;
  position: relative;
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
  height: 100vh;
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

const PlaceInfoContainer = styled.div`
  width: 250px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .title {
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
    display: block;
    margin-bottom: 5px;
  }

  .address {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
  }

  .jibun {
    font-size: 12px;
    color: #999;
  }

  .tel {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }

  .opening-hours {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }

  .reviews {
    margin-top: 10px;
  }

  .review {
    margin-top: 5px;
    padding: 5px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .reviewer {
    font-size: 12px;
    font-weight: bold;
  }

  .review-text {
    font-size: 12px;
    color: #666;
  }
`;

function Map() {
  const [inputValue, setInputValue] = useState("");
  const [currCategory, setCurrCategory] = useState("");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const infoWindow = useRef();
  const prevCategoryRef = useRef("");
  const prevSearchKeywordRef = useRef("");

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.452381, 126.699562),
        level: 5,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
    };

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

  const displayPlaceInfo = (marker, place) => {
    if (infoWindow.current) {
      infoWindow.current.close();
    }
  
    const newInfoWindow = new window.kakao.maps.InfoWindow({
      position: marker.getPosition(),
    });
  
    const content = document.createElement('div');
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
  
    if (place.road_address_name) {
      const addressDiv = document.createElement('div');
      addressDiv.className = 'address';
      const roadAddressSpan = document.createElement('span');
      roadAddressSpan.title = place.road_address_name;
      roadAddressSpan.innerText = place.road_address_name;
      addressDiv.appendChild(roadAddressSpan);
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
  
  const displayPlaces = (places) => {
    removeMarkers();

    const newMarkers = places.map((place) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        displayPlaceInfo(marker, place);
      });

      marker.setMap(map);
      return marker;
    });

    setMarkers(newMarkers);
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      console.log("검색 결과가 없습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      console.error("검색 중 오류가 발생했습니다.");
    }
  };

  const searchPlaces = (category) => {
    if (!category || !map) return;

    const ps = new window.kakao.maps.services.Places(map);
    ps.categorySearch(category, placesSearchCB, { useMapBounds: true });

    if (prevCategoryRef.current !== category && infoWindow.current) {
      infoWindow.current.close();
    }

    prevCategoryRef.current = category;
  };

  const handleSearch = () => {
    if (!inputValue || !map) return;

    prevSearchKeywordRef.current = inputValue;

    if (infoWindow.current) {
      infoWindow.current.close();
    }

    const ps = new window.kakao.maps.services.Places(map);
    ps.keywordSearch(inputValue, placesSearchCB);
  };

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const removeMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const onClickCategory = (id) => {
    if (!id || currCategory === id) {
      setCurrCategory("");
      searchPlaces(null);
    } else {
      setCurrCategory(id);
      searchPlaces(id);
    }
  };

  return (
    <Container>
      <SearchContainer>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleEnterSearch}
          placeholder="검색어를 입력하세요"
        />
        <Button onClick={handleSearch}>
          <SearchIcon>🔍</SearchIcon>
        </Button>
      </SearchContainer>

      <CategoryList>
        <CategoryItem
          className={currCategory === "BK9" ? "on" : ""}
          onClick={() => onClickCategory("BK9")}
        >
          은행
        </CategoryItem>

        <CategoryItem
          className={currCategory === "MT1" ? "on" : ""}
          onClick={() => onClickCategory("MT1")}
        >
          대형마트
        </CategoryItem>

        <CategoryItem
          className={currCategory === "HP8" ? "on" : ""}
          onClick={() => onClickCategory("HP8")}
        >
          병원
        </CategoryItem>

        <CategoryItem
          className={currCategory === "CT1" ? "on" : ""}
          onClick={() => onClickCategory("CT1")}
        >
          문화시설
        </CategoryItem>

        <CategoryItem
          className={currCategory === "CE7" ? "on" : ""}
          onClick={() => onClickCategory("CE7")}
        >
          카페
        </CategoryItem>

        <CategoryItem
          className={currCategory === "CS2" ? "on" : ""}
          onClick={() => onClickCategory("CS2")}
        >
          편의점
        </CategoryItem>
      </CategoryList>

      <MapContainer id="map">
        {/* 지도가 여기에 표시됩니다 */}
      </MapContainer>
    </Container>
  );
}

export default Map;
