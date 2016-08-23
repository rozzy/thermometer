'use strict';

const CONFIG = {
  url: `http://api.openweathermap.org/data/2.5/weather?APPID=819340174e5add98a9ce2a70e410880e&units=metric`
};

class WeatherAPI {
  constructor(store) {
    var location = localStorage.getItem('location');
    if (location && location !== 'undefined') {
      this.fetchForecast(localStorage.getItem('location'));
    } else if (navigator.geolocation) {
      this.askForPermissionAndGetCoords();
    }

    this.store = store;
  }

  fetchForecast(location) {
    if (typeof location === 'object' && location.coords) {
      location = location.coords;
      fetch(`${CONFIG.url}&lat=${location.latitude}&lon=${location.longitude}`)
        .then(this.parseResponse)
        .catch(error => console.error(error));
    } else if (typeof location === 'object') {
      return this.askForPermissionAndGetCoords();
    } else if (typeof location === 'string') {
      fetch(`${CONFIG.url}&q=${location}`)
        .then(this.parseResponse)
        .catch(error => console.error(error));
    }

    if (location !== 'undefined') {
      localStorage.setItem('location', location);
    }
  }

  parseResponse(response) {
    if (response.cod === "404") {
      localStorage.removeItem('location');
      this.store.fetchError();
    } else if (response.cod === "200"){
      this.store.forecastFetched(response);
    }
  }

  askForPermissionAndGetCoords() {
    navigator.geolocation.getCurrentPosition(
      location => this.fetchForecast(location),
      error => console.log('Error code: ' + error.code)
    );
  }
}

export default WeatherAPI;
