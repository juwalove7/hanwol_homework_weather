import './App.css';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';


function App() {
  useEffect(() => {
    // 데이터를 가져올 URL
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=37.56&lon=126.97&appid=8287161f88bde0e518e09cd2d9b10191';
    
    // jQuery Ajax 호출
    $.get(weatherUrl, (data) => {

      //데이터를 성공적으로 가져왔을 때
      console.log(data);
    

      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth()+1;
      var date = today.getDate();
      var day = today.getDay();
      var dayNaming = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
      var dayName = dayNaming[day];
      
      // setWeatherDay(data.)
      setWeatherDay(year + "년" + month +"월" + date + "일" + dayName);
      setWeatherCity(data.name);
      setWeatherTemperature(data.main.temp - 273.15);
      setWeatherIcon("https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
      console.log(weatherIcon);
      
    }).fail((error) => {

      // 데이터를 가져오는 데 실패했을 때
      console.log('Error:', error);
    });
  }, []);


  // useState 로 날씨정보 가져오기
  const [weather, setWeather] = useState("");
  const [weatherDay, setWeatherDay] = useState("");
  const [weatherCity, setWeatherCity] = useState("");
  const [weatherTemperature, setWeatherTemperature] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState("");

  // weather 상태를 변경하는 함수를 정의한다.
 const handlesetWeather = () => {
  setWeather(weather + 1);
  setWeatherDay(weatherDay + 1);

 };

  return (
    <div id="weatherAll">
      
      
      <div className='weatherInformationAll'>
        <div className='weatherSearch'>123</div>
        <div className='weartherDay'>{weatherDay}</div>
        <div className='weartherCity'>{weatherCity}</div>
        <div className='weartherTemperature'>{weatherTemperature}</div>
        <div className='weartherIcon'><img src={weatherIcon}></img></div>
      </div>
      
    </div>
  );
}

export default App;
