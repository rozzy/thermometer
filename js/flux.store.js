'use strict';

import { Dispatcher } from './flux.dispatcher.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

class Store extends EventEmitter {
  constructor() {
    super();
    this.registerStore();
  }

  registerStore() {
    return Dispatcher.register(function({ action }) {
      console.log(action);
      switch(action.actionType) {
        case 'INCREASE':
          // count += 1 ;
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
};

const AppStore = new Store();

export default AppStore;
