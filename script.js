const API_KEY = 'a1b2c3d4e5f6g7h8i9j0'; // Substitua com sua chave real de OpenWeatherMap
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const refreshBtn = document.getElementById('refreshBtn');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');

let currentCity = 'São Paulo'; // Cidade padrão

// Buscar previsão do tempo
async function fetchWeather(city) {
    try {
        currentWeatherDiv.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';
        
        // Obter coordenadas da cidade
        const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
            currentWeatherDiv.innerHTML = '<div class="error">Cidade não encontrada!</div>';
            return;
        }
        
        const { lat, lon, name } = geoData[0];
        currentCity = name;
        
        // Obter previsão do tempo
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();
        
        displayCurrentWeather(weatherData);
        displayForecast(weatherData);
        
    } catch (error) {
        console.error('Erro ao buscar previsão:', error);
        currentWeatherDiv.innerHTML = '<div class="error">Erro ao buscar dados. Verifique sua conexão!</div>';
    }
}

// Exibir clima atual
function displayCurrentWeather(data) {
    const current = data.list[0];
    const { temp, feels_like, humidity, pressure } = current.main;
    const { description, icon } = current.weather[0];
    const windSpeed = current.wind.speed;
    
    currentWeatherDiv.innerHTML = `
        <div class="current-info">
            <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="${description}">
            </div>
            <div class="weather-details">
                <h2>${currentCity}</h2>
                <div class="temperature">${Math.round(temp)}°C</div>
                <div class="description">${description}</div>
                <div class="meta-info">
                    <div class="info-item">
                        <i class="fas fa-thermometer-half"></i>
                        Sensação: ${Math.round(feels_like)}°C
                    </div>
                    <div class="info-item">
                        <i class="fas fa-tint"></i>
                        Umidade: ${humidity}%
                    </div>
                    <div class="info-item">
                        <i class="fas fa-wind"></i>
                        Vento: ${windSpeed} m/s
                    </div>
                    <div class="info-item">
                        <i class="fas fa-compress"></i>
                        Pressão: ${pressure} hPa
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Exibir previsão de 5 dias
function displayForecast(data) {
    const dailyForecasts = {};
    
    // Agrupar por dia
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('pt-BR');
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });
    
    forecastDiv.innerHTML = '';
    Object.entries(dailyForecasts).slice(0, 5).forEach(([date, data]) => {
        const temp = Math.round(data.main.temp);
        const icon = data.weather[0].icon;
        const description = data.weather[0].main;
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="date">${date.split('/').slice(0, 2).join('/')}</div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <div class="temp">${temp}°C</div>
            <div class="desc">${description}</div>
        `;
        forecastDiv.appendChild(forecastItem);
    });
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.value = '';
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

refreshBtn.addEventListener('click', () => {
    fetchWeather(currentCity);
});

// Localização automática
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            // Usar API de reverso para obter nome da cidade
            fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length > 0) {
                        fetchWeather(data[0].name);
                    } else {
                        fetchWeather(currentCity);
                    }
                });
        },
        (error) => {
            console.log('Geolocalização negada, usando cidade padrão');
            fetchWeather(currentCity);
        }
    );
} else {
    fetchWeather(currentCity);
}

// Atualizar a cada 30 minutos
setInterval(() => {
    fetchWeather(currentCity);
}, 30 * 60 * 1000);