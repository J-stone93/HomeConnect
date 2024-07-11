import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
  WiDayCloudy,
} from "react-icons/wi";

const WeatherContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
`;

const CityName = styled.h2`
  font-size: 1em;
`;

const WeatherIcon = styled.div`
  font-size: 50px;
`;

const WeatherDescription = styled.p`
  font-size: 1em;
`;

const Temperature = styled.p`
  font-size: 1em;
  font-weight: bold;
`;

const TempMinMax = styled.p`
  font-size: 1em;
`;

const Humidity = styled.p`
  font-size: 1em;
`;

const weatherDescriptions = {
  200: "가벼운 비를 동반한 천둥구름",
  201: "비를 동반한 천둥구름",
  202: "폭우를 동반한 천둥구름",
  210: "약한 천둥구름",
  211: "천둥구름",
  212: "강한 천둥구름",
  221: "불규칙적 천둥구름",
  230: "약한 연무를 동반한 천둥구름",
  231: "연무를 동반한 천둥구름",
  232: "강한 안개비를 동반한 천둥구름",
  300: "가벼운 안개비",
  301: "안개비",
  302: "강한 안개비",
  310: "가벼운 적은비",
  311: "적은비",
  312: "강한 적은비",
  313: "소나기와 안개비",
  314: "강한 소나기와 안개비",
  321: "소나기",
  500: "약한 비",
  501: "중간 비",
  502: "강한 비",
  503: "매우 강한 비",
  504: "극심한 비",
  511: "우박",
  520: "약한 소나기 비",
  521: "소나기 비",
  522: "강한 소나기 비",
  531: "불규칙적 소나기 비",
  600: "가벼운 눈",
  601: "눈",
  602: "강한 눈",
  611: "진눈깨비",
  612: "소나기 진눈깨비",
  615: "약한 비와 눈",
  616: "비와 눈",
  620: "약한 소나기 눈",
  621: "소나기 눈",
  622: "강한 소나기 눈",
  701: "박무",
  711: "연기",
  721: "연무",
  731: "모래 먼지",
  741: "안개",
  751: "모래",
  761: "먼지",
  762: "화산재",
  771: "돌풍",
  781: "토네이도",
  800: "구름 한 점 없는 맑은 하늘",
  801: "약간의 구름이 낀 하늘",
  802: "드문드문 구름이 낀 하늘",
  803: "구름이 거의 없는 하늘",
  804: "구름으로 뒤덮인 흐린 하늘",
  900: "토네이도",
  901: "태풍",
  902: "허리케인",
  903: "한랭",
  904: "고온",
  905: "바람부는",
  906: "우박",
  951: "바람이 거의 없는",
  952: "약한 바람",
  953: "부드러운 바람",
  954: "중간 세기 바람",
  955: "신선한 바람",
  956: "센 바람",
  957: "돌풍에 가까운 센 바람",
  958: "돌풍",
  959: "심각한 돌풍",
  960: "폭풍",
  961: "강한 폭풍",
  962: "허리케인",
};

function WeatherMain() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const cityName = "Incheon";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, []);

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case "01d":
        return <WiDaySunny />;
      case "02d":
        return <WiDayCloudy />;
      case "03d":
      case "04d":
        return <WiCloud />;
      case "09d":
      case "10d":
        return <WiRain />;
      case "11d":
        return <WiThunderstorm />;
      case "13d":
        return <WiSnow />;
      case "50d":
        return <WiFog />;
      default:
        return <WiDaySunny />;
    }
  };

  const getWeather = async (lat, lon) => {
    console.log(lat, lon);

    try {
      const res = await axios.get(
        // `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      console.log(res);
      const weatherIcon = res.data.weather[0].icon;
      const weatherCode = res.data.weather[0].id;
      const temp = Math.round(res.data.main.temp);

      setWeatherInfo({
        city: res.data.name,
        temp: temp,
        temp_max: Math.round(res.data.main.temp_max),
        temp_min: Math.round(res.data.main.temp_min),
        humidity: res.data.main.humidity,
        desc: weatherDescriptions[weatherCode] || res.data.weather[0].description,
        icon: weatherIcon,
        loading: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WeatherContainer>
      {weatherInfo ? (
        <WeatherInfo>
          {/* <CityName>{weatherInfo.city}</CityName> */}
          <WeatherIcon>{getWeatherIcon(weatherInfo.icon)}</WeatherIcon>
          <Temperature>{weatherInfo.temp}°C</Temperature>
          <WeatherDescription>{weatherInfo.desc}</WeatherDescription>
          {/* <TempMinMax>최고: {weatherInfo.temp_max}°C</TempMinMax> */}
          {/* <TempMinMax>최저: {weatherInfo.temp_min}°C</TempMinMax> */}
          {/* <Humidity>습도: {weatherInfo.humidity}%</Humidity> */}
        </WeatherInfo>
      ) : (
        <p>Loading...</p>
      )}
    </WeatherContainer>
  );
}

export default WeatherMain;
