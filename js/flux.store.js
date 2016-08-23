'use strict';

import { Dispatcher } from './flux.dispatcher.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var count = 0;
class Store extends EventEmitter {
  constructor() {
    super();
    this.dispatcherIndex = Dispatcher.register(function({ action }) {
      switch(action.type) {
        case 'INCREASE':
          count += 1 ;
      }

      AppStore.emitChange();
      return true;
    })
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

  getCount() {
    return count;
  }
};

const AppStore = new Store();

export default AppStore;
