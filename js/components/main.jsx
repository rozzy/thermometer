'use strict';

import { Actions } from '../flux.dispatcher';
import AppStore from '../flux.store';

const App = React.createClass({
  displayName: 'Application',

  getInitialState() {
    return {
      loading: true,
      value: ''
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
    this.setState(AppStore.getForecast());
  },

  setValue(e) {
    Actions.setValue(e.target.value);
  },

  fetchByLocation() {
    this.setState({ loading: true });
    Actions.fetchByLocation(this.state.value);
  },

  fetchByUserAgent() {
    this.setState({ loading: true });
    Actions.askForPermissionAndGetCoords();
  },

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.loading && <div>LOADING</div>}
        {this.state.error && <div>ERROR: {this.state.error}</div>}
        <input disabled={this.state.loading} value={this.state.value} onChange={this.setValue}/>
        <button disabled={this.state.loading} onClick={this.fetchByLocation}>Fetch</button>
        <button disabled={this.state.loading} onClick={this.fetchByUserAgent}>Auto</button>
      </div>
    );
  }
});

export { App };
