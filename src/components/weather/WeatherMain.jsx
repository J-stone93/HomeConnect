import axios from "axios";
import { useEffect, useState } from "react";

function WeatherMain() {
  const [weatherInfo, setWeatherInfo] = useState();
  console.log(weatherInfo);

  // API키 갖고 오기
  const API_KEY = process.env.REACT_APP_API_KEY;
  const cityName = "Incheon";

  // 위도 경도 갖고 오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, []);

  const getWeather = async(lat, lon) => {
    console.log(lat, lon);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      console.log(res);
      // id 찾아서 매칭 후 description 한글 번역된 거 가져오기
      // const weatherId = res.data.weather[0].id;
      // const weatherKo = weatherDescKo[weatherId];
      // 날씨 아이콘 가져오기
      const weatherIcon = res.data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      // 소수점 버리기
      const temp = Math.round(res.data.main.temp);

      setWeatherInfo({
        city: res.data.name,
        temp: res.data.main.temp,
        temp_max: res.data.main.temp_max,
        temp_min: res.data.main.temp_min,
        humidity: res.data.main.humidity,
        desc: res.data.weather[0].description,
        icon: res.data.weather[0].icon,
        loading: false,
      });
    } catch (err) {
      console.error(err);
    }
    }
  return (
    <>


    </>
  );
};

export default WeatherMain;