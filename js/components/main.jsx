'use strict';

import { Actions } from '../flux.dispatcher';
import AppStore from '../flux.store';

const App = React.createClass({
  displayName: 'Application',

  getInitialState() {
    return {
      loading: true
    };
  },

  componentWillMount() {
    AppStore.addChangeListener(this._onChange);
    Actions.fetchData();
  },

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    console.log('changed');
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
