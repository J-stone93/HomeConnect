import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map"); // 지도를 표시할 div 요소
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표 (제주시청)
        level: 3, // 지도의 확대 레벨
      };

      // 지도 생성 및 객체 리턴
      const map = new window.kakao.maps.Map(container, options);
    };

    // Kakao 지도 API가 로드된 후 실행될 콜백 함수
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      // Kakao 지도 API 스크립트를 동적으로 로드
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf";
      script.onload = initMap; // 스크립트 로드 후 initMap 함수 실행
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div id="map" style={{ width: "100vh", height: "100vh" }}>
      {/* 지도가 표시될 영역 */}
    </div>
  );
};

export default Map;