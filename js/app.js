const changeLocation = document.getElementById("change-location");
const card = document.getElementById("card");
const details = document.getElementById("details");
const weatherIcon = document.getElementById("weather-icon");
const overlay = document.getElementById("overlay");
const btn = document.querySelector(".btn");

// Loader function
const loader = (state) => {
  if (state) {
    overlay.classList.remove("d-none");
  } else {
    overlay.classList.add("d-none");
  }
};

// Update UI function
const updateUi = (weather) => {
  console.log(weather);

  details.innerHTML = `
            <h5 class="mb-3">${weather.name}, ${weather.sys.country}</h5>
            <p class="mb-3">${weather.weather[0].main}</p>
            <div class="display-4 mb-3">
              <span>${Math.round(weather.main.temp)}</span>
              <span>&deg;C</span>
            </div>`;
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
  weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
};

// Get weather data function
const getWeather = async (city) => {
  const data = await getData(city);
  return data;
};

const handleWeatherFetch = () => {
  const cityName = changeLocation.city.value.trim();
  if (cityName) {
    loader(true);

    getWeather(cityName)
      .then((data) => {
        updateUi(data);
        loader(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        loader(false);
      });

    changeLocation.reset();
  }
};

btn.addEventListener("click", handleWeatherFetch);

changeLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  handleWeatherFetch();
});
