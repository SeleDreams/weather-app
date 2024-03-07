class WeatherConfig {
    constructor()
    {
       this.apiKey = "";
       this.city = "";
    }
    async initialize(conf_path) {
        let configFile = await fetch(conf_path);
        let configJson = await configFile.json();
        this.apiKey = configJson.apiKey;
        this.city = configJson.city;
    }
}

const Weathers = {
    Sunny : "Ensoleillé",
    Cloudy : "Nuageux",
    Rainy : "Pluvieux",
    Snowy : "Neige",
    Thunderstorm : "Eclairs",
    Mist : "Brouillard"
}

class Weather {
    constructor()
    {
        this.config = new WeatherConfig();
        this.temperature = 0;
        this.weather = Weathers.Sunny;
        this.windSpeed = 0;
    }

    async initialize()
    {
        await this.config.initialize("/config/conf.json")
    }

    async getWeather() {
        var fetchedWeather = await fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + encodeURIComponent(this.config.city) + "&units=metric&appid=" + this.config.apiKey);
        var weatherJson = await fetchedWeather.json();
        this.name = weatherJson[0];
        this.temperature = weatherJson.main.temp;
        this.windSpeed = weatherJson.wind.speed;
        var weather = weatherJson.weather[0];
        switch (weather.icon)
        {
            case "11d":
                this.weather = Weathers.Thunderstorm;
                break;
            case "10d": case "09d":
                this.weather = Weathers.Rainy;
                break;
            case "13d":
                this.weather = Weathers.Snowy;
                break;
            case "50d":
                this.weather = Weathers.Mist;
                break;
            case "01d" : case "01n" :
                this.weather = Weathers.Sunny;
                break;
            case "02d" : case "02n" : case "03d" : case "03n" : case "04d" : case "04n":
                this.weather = Weathers.Cloudy;
                break;
        }
    }

    async displayWeather() {
        await this.initialize();
        await this.getWeather();
        var cityText = document.getElementById("city_text");
        var weatherTempText = document.getElementById("weather_temperature");
        var weatherWeatherText = document.getElementById("weather_weather");
        var weatherWindText = document.getElementById("weather_wind");
        cityText.innerText = this.config.city;
        weatherTempText.innerText = Math.round(this.temperature) + "°C";
        weatherWindText.innerText = "Vent : " + this.windSpeed + "Km/h";
        weatherWeatherText.innerText = this.weather;
    }
}

function updateWeather()
{
    console.log("Updating the weather");
    weather.displayWeather();
}

var weather = new Weather();
updateWeather();
window.setInterval(updateWeather, 1000 * 60 * 60);
