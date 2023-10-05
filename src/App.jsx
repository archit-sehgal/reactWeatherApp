import React, { useEffect, useState } from "react";
import "./App.css";
import './media.css';
import sunnyImage from "./assets/sun.jpg";
import darkImage from "./assets/dark.jpg";
import rainyImage from "./assets/rain.jpg";
import cloudyImage from "./assets/cloudy.jpg";

function App() {
  const [city,setCity]=useState("")
  const [cityName, setCityName] = useState("")
  const [data, setData] = useState({});
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "5fc595e612msh0c5c0a26d28fd1cp1a1a9ejsna02ab6b21bab",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  let backgroundImage =
    "https://cdn.mos.cms.futurecdn.net/xcLR5HMU2kxskdAy3ZVuTf.jpg";

  if (data.temp !== undefined) {
    if (data.temp < 15) {
      backgroundImage = darkImage;
    } else if (data.temp >= 15 && data.temp <= 20) {
      backgroundImage = cloudyImage;
    } else if (data.temp > 20 && data.temp < 25) {
      backgroundImage = rainyImage;
    } else if (data.temp >= 25 && data.temp < 40) {
      backgroundImage = sunnyImage;
    }
  }

  return (
    <div
      className="flex"
      id="main"
      style={{
        background: `url(${backgroundImage})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search the city name"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button
          onClick={() => {
            fetch(
              `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
              options
            )
              .then((response) => response.json())
              .then((responseData) => {
                setData(responseData);
                setCityName(city)
                document.querySelector(".content").style.visibility="hidden"
                setInterval(() => {
                  document.querySelector(".content").style.visibility="visible"
                }, 200);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {data.temp !== undefined && (
        <div className="content flex">
          <div className="tempandCity flex">
            <div className="temp ">
              <h1>Temp</h1>
              <p>{data.temp}</p>
            </div>
            <div className="city">
              <h1>City</h1>
              <p>{cityName}</p>
            </div>
          </div>
          <div className="details flex">
            <div className="feels">
              <span>FeelsLike</span>
              <p>
                {data.feels_like}
                <div className="degree" />
              </p>
            </div>
            <div className="humi">
              <span>Humidity</span>
              <p>
                {data.humidity}
                <div className="degree" />
              </p>
            </div>
            <div className="maxtemp">
              <span>Max-Temp</span>
              <p>
                {data.max_temp}
                <div className="degree" />
              </p>
            </div>
            <div className="mintemp">
              <span>Min-Temp</span>
              <p> 
                {data.min_temp}
                <div className="degree" />
              </p>
            </div>
          </div>
          <div className="sun flex">
            <div className="sunrise">
              <h2>Sunrise <i class="fa-solid fa-sun"></i></h2>
              <p>{data.sunrise}</p>
            </div>
            <div className="sunset">
              <h2>Sunset <i class="fa-regular fa-sun"></i></h2>
              <p>{data.sunset}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
