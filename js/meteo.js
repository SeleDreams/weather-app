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
    Snowy : "Neige"
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
        this.weather = weatherJson.weather[0].description
    }

    async displayWeather() {
        await this.initialize();
        await this.getWeather();
        var cityText = document.getElementById("city_text");
        var weatherTempText = document.getElementById("weather_temperature");
        var weatherWeatherText = document.getElementById("weather_weather");
        cityText.innerText = this.config.city;
        weatherTempText.innerText = this.temperature + "°C";
        weatherWeatherText.innerText = this.weather;
    }
}

var weather = new Weather();
weather.displayWeather();
