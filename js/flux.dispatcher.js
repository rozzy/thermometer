'use strict';

import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION', action
    });
  }
}

const AppDispatcher = new DispatcherClass();

const Actions = {
  increase(index) {
    AppDispatcher.handleViewAction({
      type: 'INCREASE', index
    });
  }
}

export { Actions, AppDispatcher as Dispatcher };
