

    const getWeather = () =>{
        const city = document.getElementById('inputCity').value;
        const apiKey = "fc28d8a2ff72a0137b97c6c8d90daedd";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(apiUrl)
        .then(Res => Res.json())
        .then(data => {
            const wheatherInfo = document.getElementById('wheatherInfo');
            const description = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            wheatherInfo.innerHTML = `
                <p>Description: ${description}</p>
                <p>Temperature: ${temperature} &#8451</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind speed: ${windSpeed} m/s</p>
            `;
        })
        .catch(error => {
            console.error('Opps!, Sorry', error);
            document.getElementById('wheatherInfo').textContent ='City not found'
        });
}


