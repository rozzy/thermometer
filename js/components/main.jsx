'use strict';

import { Actions } from '../flux.dispatcher';
import { AppStore, Weather } from '../flux.store';

import Widget from './widget';
import Form from './form';

const App = React.createClass({
  displayName: 'Application',

  getInitialState() {
    return Weather;
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

  fetchByLocation() {
    this.setState({ loading: true });
    Actions.fetchByLocation(this.state.value);
  },

  fetchByUserAgent() {
    this.setState({ loading: true });
    Actions.askForPermissionAndGetCoords();
  },

  render() {
    return (
      <div className={`container ${this.state.loading && 'loading'}`}>
        <div className="inner-block">
          <Widget forecast={this.state.forecast} />
          <Form
            actions={Actions}
            value={this.state.value}
            error={this.state.error}
            loading={this.state.loading}
            parent={this}
            ref="input"
          />
        </div>
      </div>
    );
  }
});

export { App };
