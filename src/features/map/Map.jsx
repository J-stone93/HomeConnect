import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px;
  position: relative;
`;

const MarkerContainer = styled.div`
  background-color: #007bff;
  color: white;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
`;

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

function Map() {
  const [inputValue, setInputValue] = useState("");
  const [currCategory, setCurrCategory] = useState("");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const infoWindow = useRef();

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
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries&libraries=services";
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  const displayPlaceInfo = (marker, place) => {

    let content = '<div class="placeinfo">' +
      '   <a class="title" href="' +
      place.place_url +
      '" target="_blank" title="' +
      place.place_name +
      '">' +
      place.place_name +
      "</a>";

    if (place.road_address_name) {
      content +=
        '    <span title="' +
        place.road_address_name +
        '">' +
        place.road_address_name +
        "</span>" +
        '  <span class="jibun" title="' +
        place.address_name +
        '">(지번 : ' +
        place.address_name +
        ")</span>";
    } else {
      content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    }

    content += '    <span class="tel">' + place.phone + '</span>';

    if (place.opening_hours) {
      content += '    <span class="opening-hours">' + place.opening_hours + '</span>';
    }

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

    if (infoWindow.current) {
      infoWindow.current.close();
    }

    const newInfoWindow = new window.kakao.maps.InfoWindow({
      content: content,
      position: marker.getPosition(),
    });

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
  };

  const handleSearch = () => {
    if (!inputValue || !map) return;

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
        {/* 지도가 표시될 영역 */}
      </MapContainer>
    </Container>
  );
}

export default Map;
