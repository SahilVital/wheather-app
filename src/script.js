// Replace with your OpenWeather API key
const API_KEY = 'd05211ffe0dc336edcee960c14192f99';

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
  
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
        hideError();
        console.log(data);
        
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.classList.remove('hidden');

    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;

    // Set weather icon
    const iconCode = data.weather[0].icon;
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon">`;
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    document.getElementById('weatherInfo').classList.add('hidden');
}

function hideError() {
    document.getElementById('errorMessage').classList.add('hidden');
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});