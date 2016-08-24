'use strict';

export default React.createClass({
  displayName: 'Form',

  setValue({ target }) {
    this.props.actions.setValue(target.value);
  },

  componentDidMount() {
    this.refs.input.focus();
  },

  componentDidUpdate() {
    this.refs.input.focus();
  },

  submitOnEnter(event) {
    if (event.keyCode === 13) {
      var { value } = event.target;
      if (value.trim().length > 0) {
        this.props.parent.fetchByLocation();
      } else {
        this.props.parent.fetchByUserAgent();
      }
    }
  },

  render() {
    var { fetchByLocation, fetchByUserAgent } = this.props.parent;

    return (
      <div className="form">
        <input
          disabled={this.props.loading}
          value={this.props.value}
          onKeyDown={this.submitOnEnter}
          onChange={this.setValue}
          ref="input"
          placeholder="Moscow"
          className={this.props.error && 'error'}
          onBlur={({ target }) => target.focus()}
        />
        <div className="buttons">
          <button disabled={this.props.loading} onClick={fetchByLocation}>> Get Forecast</button>
          <button disabled={this.props.loading} onClick={fetchByUserAgent}>+ Detect Location</button>
        </div>
      </div>
    );
  }
});
