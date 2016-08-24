'use strict';

const CONFIG = {
  url: `http://api.openweathermap.org/data/2.5/weather?APPID=819340174e5add98a9ce2a70e410880e&units=metric`
};

const GEOLOCATION_ERROR_CODES = [
  'unknown error', 'permission denied', 'position unavailable', 'timed out'
];

class WeatherAPI {
  constructor(dispatcher) {
    var location = localStorage.getItem('location');
    if (location && location !== 'undefined') {
      this.fetchForecast(localStorage.getItem('location'));
    } else if (navigator.geolocation) {
      this.askForPermissionAndGetCoords();
    }

    this.dispatcher = dispatcher;
  }

  fetchForecast(location) {
    if (typeof location === 'object' && location.coords) {
      location = location.coords;
      console.log(this.parseResponse);
      fetch(`${CONFIG.url}&lat=${location.latitude}&lon=${location.longitude}`)
        .then(this.parseResponse.bind(this))
        .catch(this.fetchError.bind(this));
    } else if (typeof location === 'string') {
      fetch(`${CONFIG.url}&q=${location}`)
        .then(this.parseResponse.bind(this))
        .catch(this.fetchError.bind(this));
    }
  }

  fetchError(error) {
    localStorage.removeItem('location');
    this.dispatcher.fetchError(error);
  }

  parseResponse(response) {
    if (response.status === 200) {
      response.json().then(data => {
        console.log(data.cod);
        if (data.cod == "200") {
          localStorage.setItem('location', data.name);
          this.dispatcher.forecastFetched(data);
        } else {
          this.fetchError(data.message);
        }
      });
    } else {
      this.fetchError(response.status);
    }
  }

  askForPermissionAndGetCoords() {
    navigator.geolocation.getCurrentPosition(
      location => this.fetchForecast(location),
      error => this.fetchError(GEOLOCATION_ERROR_CODES[error.code])
    );
  }
}

export default WeatherAPI;
