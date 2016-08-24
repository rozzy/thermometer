'use strict';

import { Dispatcher } from './flux.dispatcher.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

const Weather = {
  forecast: null
}

class Store extends EventEmitter {
  constructor() {
    super();
    this.registerStore();
  }

  registerStore() {
    return Dispatcher.register(function({ action }) {
      console.log('•', action);
      switch(action.actionType) {
        case 'FORECAST_FETCHED':
          Weather.forecast = action.response
          Weather.value = action.response.name;
          Weather.error = false;
          Weather.loading = false;
          break;

        case 'CITY_ERROR':
          Weather.error = action.error;
          Weather.loading = false;
          break;

        case 'SET_VALUE':
          Weather.value = action.value;
      }

      AppStore.emitChange();
      return true;
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getForecast() {
    return Weather;
  }
};

const AppStore = new Store();

export default AppStore;
