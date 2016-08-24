'use strict';

import { WeatherConditions } from '../weatherAPI';

function format(number) {
	return String(Math.round(number));
};

function inCondition(id, condition) {
  var range = WeatherConditions.list[condition.toLowerCase()];
  return WeatherConditions.between(id, range[0], range[1]);
};

export default ({ forecast }) => {
  if (!forecast) {
    return <noscript></noscript>;
  }

  var weather = forecast.weather[0];

  return (
    <div className="widget-wrapper">
      <div className="icon">
        {inCondition(weather.id, "Clear") && <div className="icon-sunny"></div>}
      	{(inCondition(weather.id, "Clouds") || inCondition(weather.id, "Mist")) && <div className="cloudy"></div>}
      	{(inCondition(weather.id, "Rain") || inCondition(weather.id, "Drizzle")) && <div className="rainy"></div>}
      	{inCondition(weather.id, "Snow") && <div className="snowy"></div>}
      	{inCondition(weather.id, "Extreme") && <div className="starry"></div>}
      	{inCondition(weather.id, "Thunderstorm") && <div className="stormy"></div>}
      </div>
      <div className="info">
        <h1 className="temp">{format(forecast.main.temp)}˚</h1>
        <div className="condition">{weather.main}</div>
        <div>Wind: {forecast.wind.speed} mps</div>
        <div>Humidity: {forecast.main.humidity}%</div>
      </div>
    </div>
  );
};
