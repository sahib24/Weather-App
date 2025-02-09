const apiKey = "fc28d8a2ff72a0137b97c6c8d90daedd"; 


const weatherQuotes = {
    "clear sky": "The sun is shining, and so are you!",
    "rain": "Life isn’t about waiting for the storm to pass, it’s about learning to dance in the rain.",
    "clouds": "The sky is cloudy, but your potential is limitless.",
    "snow": "Let it snow, let it snow, let it snow!",
    "thunderstorm": "When the storm hits, it’s time to shine brighter than ever!",
    "drizzle": "A little drizzle can’t stop a determined spirit!"
};

function getWeather() {
    const city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found!");
                return;
            }

            const weatherCondition = data.weather[0].main.toLowerCase(); 
            const quote = weatherQuotes[weatherCondition] || "Stay positive, the weather will change!";
            
            document.getElementById("cityName").innerText = `Weather in ${data.name}`;
            document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById("weatherDescription").innerText = `Condition: ${data.weather[0].description}`;
            document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById("weatherQuote").innerText = quote;

           
            document.getElementById("sunrise").innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
            document.getElementById("sunset").innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

           
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById("weatherIconContainer").innerHTML = `<img src="${icon}" alt="${data.weather[0].description}">`;

           
            if (weatherCondition === "clear sky") {
                document.body.style.background = "linear-gradient(to right, #ff7e5f, #feb47b)";
            } else if (weatherCondition === "rain") {
                document.body.style.background = "linear-gradient(to right, #7f8c8d, #2c3e50)";
            } else if (weatherCondition === "snow") {
                document.body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
            }

        
            if (data.alerts) {
                document.getElementById("alertMessage").innerText = `Alert: ${data.alerts[0].event}`;
            } else {
                document.getElementById("alertMessage").innerText = '';
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Could not fetch weather data");
        });
}
