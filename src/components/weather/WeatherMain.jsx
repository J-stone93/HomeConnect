import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components"; // styled-components 가져오기

const WeatherContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100px; */
  /* font-family: Arial, sans-serif; */
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
`;

const CityName = styled.h2`
  font-size: 1em;
`;

const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
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

function WeatherMain() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  // API 키 가져오기
  const API_KEY = process.env.REACT_APP_API_KEY;
  const cityName = "Incheon";

  // 위도 경도 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, []);

  const getWeather = async (lat, lon) => {
    console.log(lat, lon);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      console.log(res);
      // 날씨 아이콘 가져오기
      const weatherIcon = res.data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      // 소수점 버리기
      const temp = Math.round(res.data.main.temp);

      setWeatherInfo({
        city: res.data.name,
        temp: temp,
        temp_max: Math.round(res.data.main.temp_max),
        temp_min: Math.round(res.data.main.temp_min),
        humidity: res.data.main.humidity,
        desc: res.data.weather[0].description,
        icon: weatherIconAdrs,
        loading: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <WeatherContainer>
      {weatherInfo ? (
        <WeatherInfo>
          {/* <CityName>{weatherInfo.city}</CityName> */}
          <WeatherIcon src={weatherInfo.icon} alt="weather icon" />
          <WeatherDescription>{weatherInfo.desc}</WeatherDescription>
          <Temperature>{weatherInfo.temp}°C</Temperature>
          <TempMinMax>최고: {weatherInfo.temp_max}°C</TempMinMax>
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
