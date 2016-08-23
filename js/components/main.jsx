'use strict';

import { Actions } from '../flux.dispatcher';
import AppStore from '../flux.store';

const App = React.createClass({
  displayName: 'Application',

  getInitialState() {
    return {
      count: AppStore.getCount()
    };
  },

  componentWillMount() {
    AppStore.addChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(this.getInitialState());
  },

  render() {
    return (
      <div>
        <button onClick={() => Actions.increase()}>test {this.state.count}</button>
      </div>
    );
  }
});

export { App };
