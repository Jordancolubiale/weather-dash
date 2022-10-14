// Global variables
// search history as an empty array
var searchEm = []
// weather api root url
var weatherAPI = "https://api.openweathermap.org"
// api key
var APIkey = "e94ba6acd3f306ff83ce3acc9c5c7b82"
// DOM element references
// search form
var searchForm = document.querySelector(".form-group")
// search input
var searchInput = document.querySelector(".form-input")
// container/section for today's weather
var todaysWeather = document.querySelector(".todays-weather")
// container/section for the forecast 
var forecast = document.getElementById("#forecast")
// search history container
var searchHistory = document.getElementById("#history")
dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)

// Function to display the search history list.
function renderSearchHistory() {
    // empty the search history container
    searchHistory.innerHTML = ""
    // loop through the history array creating a button for each item
         // for (var i = 0; i < searchEm.length; i++) {}
         for (var i =searchEm.length-1; i >= 0; i--) {
            var btn = documnet.createElement('button');
            btn.setAttribute('type','button');
            btn.setAttribute('aria-controls', 'today forecast');
            btn.classList.add('history-btn', 'btn-history');
          // append to the search history container
            btn.setAttribute('data-search', searchEm[i]);
            btn.textContent = searchEm[i];
            searchHistory.append(btn)
  } 
}

// Function to update history in local storage then updates displayed history.
function appendToHistory(search) {
    // push search term into search history array
    searchEm.push(search);
    localStorage.setItem("search-history", JSON.stringify(searchEm))
    // set search history array to local storage
    renderSearchHistory();
}

// Function to get search history from local storage
function initSearchHistory() {
    // get search history item from local storage
var storedLocal = localStorage.getItem("search-history")
if (storedLocal) {
    searchEm = JSON.parse(storedLocal)
}
    // set search history array equal to what you got from local storage
    renderSearchHistory();
}

// Function to display the CURRENT weather data fetched from OpenWeather api.
function renderCurrentWeather(city, weather) {
    // Store response data from our fetch request in variables
    // temperature, wind speed, etc.


    // document.create the elements you'll want to put this information in  

    // append those elements somewhere

    // give them their appropriate content

}

// Function to display a FORECAST card given an object (from our renderForecast function) from open weather api
// daily forecast.
function renderForecastCard(forecast) {
    // variables for data from api
    // temp, windspeed, etc.

    // Create elements for a card

    // append

    // Add content to elements

    // append to forecast section
}

// Function to display 5 day forecast.
function renderForecast(dailyForecast) {
    // set up elements for this section

    // append

    // loop over dailyForecast

    for (var i = 0; i < dailyForecast.length; i++) {

        // send the data to our renderForecast function as an argument
        renderForecastCard(dailyForecast[i]);
    }
}

function renderItems(city, data) {
    renderCurrentWeather(city, data.list[0]);
    renderForecast(data.list);
}

// Fetches weather data for given location from the Weather Geolocation
// endpoint; then, calls functions to display current and forecast weather data.
function fetchWeather(location) {
    // varialbles of longitude, latitude, city name - coming from location
var {lat} = location
var {lon} = location
var city = location.name
    // api url
var apiUrl = '${weatherAPI}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}'
    // fetch, using the api url, .then that returns the response as json, .then that calls renderItems(city, data)
    fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchCoords(search) {
    // variable for you api url

    // fetch with your url, .then that returns the response in json, .then that does 2 things - calls appendToHistory(search), calls fetchWeather(the data)

}

function handleSearchFormSubmit(e) {
    // Don't continue if there is nothing in the search form
    if (!searchInput.value) {
        return;
    }

    e.preventDefault();
    var search = searchInput.value.trim();
    fetchCoords(search);
    searchInput.value = '';
}

function handleSearchHistoryClick(e) {
    // grab whatever city is is they clicked

    fetchCoords(search);
}

initSearchHistory();
  // click event to run the handleFormSubmit
  // click event to run the handleSearchHistoryClick