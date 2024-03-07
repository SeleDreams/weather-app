function getLocation() {
    if (!navigator.geolocation) {
        alert("This browser does not seem to support geolocation!");
        return null;
    }
    navigator.geolocation.getCurrentPosition(receivedLocation);
}

function receivedLocation(position) {
    getWeather(position.coords.latitude, position.coords.longitude);
}

function getWeather(latitude, longitude) {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m")
    .then((Response) => Response.json())
    .then((data) => displayWeather(data));
}

function displayWeather(weatherData)
{
    console.log(weather);
}
