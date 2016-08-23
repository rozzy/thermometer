'use strict';

import { Dispatcher } from 'flux';
import WeatherAPI from './weatherAPI';

class DispatcherClass extends Dispatcher {
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION', action
    });
  }

  handleServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION', action
    });
  }
}

const AppDispatcher = new DispatcherClass();

const Actions = {
  fetchData() {
    this.weatherAPI = new WeatherAPI(this);
  },

  forecastFetched(response) {
    AppDispatcher.handleServerAction({
      actionType: 'FORECAST_FETCHED', response
    })
  },

  fetchError() {
    AppDispatcher.handleServerAction({
      actionType: 'CITY_ERROR'
    });
  }
}

export { Actions, AppDispatcher as Dispatcher };
