import "./App.css";
import React, { useEffect, useState } from "react";
import $ from "jquery";

function App() {
  // useState 로 날씨정보 가져오기
  const [weatherDay, setWeatherDay] = useState("");
  const [weatherCity, setWeatherCity] = useState("");
  const [weatherTemperature, setWeatherTemperature] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // 기본값으로 서울의 날씨 정보를 가져오기
    fetchWeatherData("Seoul");
    // 초기화 코드는 그대로 유지
  }, []);

  // 날씨 정보를 가져오는 함수
  const fetchWeatherData = (city: string) => {
    // 검색어가 있으면 API 호출
    const apiKey = "8287161f88bde0e518e09cd2d9b10191";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}`;

    interface WeatherData {
      main: {
        temp: number;
      };
      name: string;
      weather: {
        icon: string;
      }[];
    }

    $.get(weatherUrl, (data: WeatherData) => {
      // 데이터를 성공적으로 가져왔을 때
      console.log(data);

      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var date = today.getDate();
      var day = today.getDay();
      var dayNaming = [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
        "일요일",
      ];
      var dayName = dayNaming[day];

      setWeatherDay(year + "년" + month + "월" + date + "일 " + dayName);
      setWeatherCity(data.name);
      setWeatherTemperature(Number((data.main.temp - 273.15).toFixed(2))); // 온도 값 소수점 두 자리까지 표시
      setWeatherIcon(
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
      );
    }).fail((error) => {
      // 데이터를 가져오는 데 실패했을 때
      console.log("Error:", error);
      // 검색 결과 초기화
      setWeatherDay("");
      setWeatherCity("검색 결과 없음");
      setWeatherTemperature(0); // 온도 값 초기화
      setWeatherIcon("");
    });
  };

  // 검색 기능을 위한 함수
  const handleSearch = () => {
    // 검색어가 비어있으면 아무 작업도 하지 않음
    if (!searchText.trim()) return;

    // 검색어가 있으면 API 호출
    fetchWeatherData(searchText);
  };

  return (
    <div id="weatherAll">
      <div className="weatherInformationAll">
        <div className="weatherSearch">
          <input
            type="text"
            placeholder="지역을 입력하세요."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
        <div className="weartherDay">{weatherDay}</div>
        <div className="weartherCity">{weatherCity}</div>
        <div className="weartherTemperature">{weatherTemperature}°C</div>
        <div className="weartherIcon">
          <img src={weatherIcon} alt="Weather Icon" />
        </div>
      </div>
    </div>
  );
}

export default App;
