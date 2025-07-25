const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

let unit = 'metric';

const imperialButton = document.getElementById("imperial");
const metricButton = document.getElementById('metric');

search.addEventListener('click', weatherFunction);

imperialButton.addEventListener('click', function (event){
    const imperialValue = event.target.value;
    unit = imperialValue;
    weatherFunction();
});

metricButton.addEventListener('click', function (event){
    const metricValue = event.target.value;
    unit = metricValue;
    weatherFunction();
});

function weatherFunction(){
    const APIKey = 'f60a557facbf4cdd6adae3b1795ac49f';
    const city = document.querySelector('.search-box input').value;

    if(city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.code === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const feelsLike = document.getElementById('feelsLike')


            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            if (unit === 'metric'){
                temperature.innerHTML = `${Math.round(parseFloat(json.main.temp))}<span>°C</span>`;
                feelsLike.innerHTML = `${Math.round(parseFloat(json.main.feels_like))}<span>°C</span>`
            } else {
                feelsLike.innerHTML = `${Math.round(parseFloat(json.main.feels_like))}<span>°F</span>`
                temperature.innerHTML = `${Math.round(parseFloat(json.main.temp))}<span>°F</span>`;
            }


            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerText = `${parseInt(json.wind.speed)} km/h`;



            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height= '609px';

            console.log(json);
        });
}