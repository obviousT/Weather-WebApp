let cityinput = document.getElementById('city_input'),
    searchbtn = document.getElementById('searchbtn'),
    locationbtn = document.getElementById('locationbtn'),
    api_key = '10bb0112bb9869cfad0a28c4d5a89684',
    currentWeatherCard = document.querySelectorAll('.weather-left .card')[0],
    fiveDaysForecastCard = document.querySelector('.day-forecast'),
    aqiCard = document.querySelectorAll('.highlights.card')[0],
    humidityval = document.getElementById('humidityval'),
    pressureval = document.getElementById('pressureval'),
    visibilityval = document.getElementById('visibilityval'),
    speedval = document.getElementById('speedval'),
    tempval = document.getElementById('tempval'),
    hourlyForecastCard = document.querySelector('.hourly-forecast'),
    aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

function getWeatherDetails(name, lat, lon, country, state) {
    let forecast_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    let weather_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    let air_pollution_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Janurary", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    fetch(air_pollution_API_URL)
        .then(res => res.json())
        .then(data => {
            let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
            aqiCard.innerHTML = `
            <div class="card-head">
                <p>Air Quality Index</p>
                <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>
            </div>
            <div class="air-indices">
                <div class="item">
                    <p>PM2.5</p>
                    <h2>${pm2_5}</h2>
                </div>
                <div class="item">
                    <p>PM10</p>
                    <h2>${pm10}</h2>
                </div>
                <div class="item">
                    <p>SO2</p>
                    <h2>${so2}</h2>
                </div>
                <div class="item">
                    <p>CO</p>
                    <h2>${co}</h2>
                </div>
                <div class="item">
                    <p>NO</p>
                    <h2>${no}</h2>
                </div>
                <div class="item">
                    <p>NO2</p>
                    <h2>${no2}</h2>
                </div>
                <div class="item">
                    <p>NH3</p>
                    <h2>${nh3}</h2>
                </div>
                <div class="item">
                    <p>O3</p>
                    <h2>${o3}</h2>
                </div>
            </div>
        `;
            console.log(data);
        })
        .catch(() => {
            alert('Failed to fetch Air Quality Index');
        });


    fetch(weather_API_URL)
        .then(res => res.json())
        .then(data => {
            let date = new Date();
            currentWeatherCard.innerHTML = `
            <div class="current-weather">
                <div class="details">
                    <p>Now</p>
                    <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                    <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
                </div>
            </div>
            <hr>
            <div class="card-footer">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(255, 255, 255);">
                        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
                        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
                    </svg>
                    ${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}
                </p>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(255, 255, 255);">
                        <path d="M11.42 21.815a1.004 1.004 0 0 0 1.16 0C12.884 21.598 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.996c-.029 6.444 7.116 11.602 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.004.021 4.438-4.388 8.423-6 9.731-1.611-1.308-6.021-5.293-6-9.735 0-3.309 2.691-6 6-6z"></path>
                        <path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"></path>
                    </svg>
                    ${data.name}, ${data.sys.country}
                </p>
            </div>
        `;
            let { sunrise, sunset } = data.sys,
                { timezone, visibility } = data,
                { humidity, pressure, feels_like } = data.main,
                { speed } = data.wind,
                sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm:A'),
                sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm:A');
            sunriseCard.innerHTML = `
                       <div class="card-head">
                            <p>Sunrise & Sunset</p>
                        </div>
                        <div class="sunrise-sunset">
                            <div class="item">
                                <div class="icon">
                                 <img src="sunrise.png" alt="" width="45px">
                                </div>
                                <div>
                                    <p>Sunrise</p>
                                    <h2>${sRiseTime}</h2>
                                </div>
                            </div>
                            <div class="item">
                                <div class="icon">
                                 <img src="sunset.png" alt="" width="45px">
                                </div>
                                <div>
                                    <p>Sunset</p>
                                    <h2>${sSetTime}</h2>
                                </div>
                            </div>
                        </div>
        `;
            humidityval.innerHTML = `${humidity}%`;
            pressureval.innerHTML = `${pressure}hPa`;
            visibilityval.innerHTML = `${visibility}m`;
            speedval.innerHTML = `${speed}m/s`;
            tempval.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
        })
        .catch(() => {
            alert('Failed to fetch current weather');
        });

    fetch(forecast_API_URL)
        .then(res => res.json())
        .then(data => {
            let hourlyForecast = data.list;
            hourlyForecastCard.innerHTML = '';
            for (let i = 0; i <= 7; i++) {
                let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
                let hr = hrForecastDate.getHours();
                let a = 'PM';
                if (hr < 12) a = 'AM';
                if (hr == 0) hr = 12;
                if (hr > 12) hr -= 12;
                hourlyForecastCard.innerHTML += `
                    <div class="card">
                        <p>${hr} ${a}</p>
                        <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}04d.png" alt="">
                        <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                    </div>
                `;
            }
            let uniqueForecastDays = [];
            let fiveDaysForecast = data.list.filter(forecast => {
                let forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    uniqueForecastDays.push(forecastDate);
                    return true;
                }
                return false;
            });

            fiveDaysForecastCard.innerHTML = '';
            for (let i = 1; i < fiveDaysForecast.length; i++) {  // Starting from 1 to skip the current day
                let date = new Date(fiveDaysForecast[i].dt_txt);
                fiveDaysForecastCard.innerHTML += `
                    <div class="forecast-item">
                        <div class="icon-wrapper">
                            <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}@2x.png" alt="Weather icon">
                            <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                        </div>
                        <p>${date.getDate()} ${months[date.getMonth()]}</p>
                        <p>${days[date.getDay()]}</p>
                    </div>
                `;
            }
        })
        .catch(() => {
            alert('Failed to fetch weather');
        });
}

function getcityCoordinates() {
    let cityName = cityinput.value.trim();
    cityinput.value = '';
    if (!cityName) return;
    let geocoding_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(geocoding_API_URL)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                let { name, lat, lon, country, state } = data[0];
                getWeatherDetails(name, lat, lon, country, state);
            } else {
                alert(`No data found for ${cityName}`);
            }
        })
        .catch(() => {
            alert(`Failed to fetch coordinates of ${cityName}`);
        });
}

function getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(position => {
        let { latitude, longitude } = position.coords;
        let reverse_geocoding_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
        fetch(reverse_geocoding_URL)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    let { name, country, state } = data[0];
                    getWeatherDetails(name, latitude, longitude, country, state);
                } else {
                    alert('No data found for the current location');
                }
            })
            .catch(() => {
                alert('Failed to fetch User coordinates');
            });
    }, error => {
        if (error.code === error.PERMISSION_DENIED)
            alert('Geolocation permission denied');
    });
}

searchbtn.addEventListener('click', getcityCoordinates);
locationbtn.addEventListener('click', getUserCoordinates);
cityinput.addEventListener('keyup', e => e.key === 'Enter' && getcityCoordinates());
window.addEventListener('load', getUserCoordinates);
