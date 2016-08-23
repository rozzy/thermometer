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
      console.log(this.parseResponse);
      fetch(`${CONFIG.url}&lat=${location.latitude}&lon=${location.longitude}`)
        .then(this.parseResponse.bind(this))
        .catch(error => console.error(error));
    } else if (typeof location === 'object') {
      return this.askForPermissionAndGetCoords();
    } else if (typeof location === 'string') {
      fetch(`${CONFIG.url}&q=${location}`)
        .then(this.parseResponse.bind(this))
        .catch(error => console.error(error));
    }
  }

  parseResponse(response) {
    if (response.status === 200) {
      response.json().then(data => {
        console.log(data);
        localStorage.setItem('location', data.name);
        this.store.forecastFetched(data);
      });
    } else {
      localStorage.removeItem('location');
      this.store.fetchError();
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
