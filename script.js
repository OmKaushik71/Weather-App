async function getWeather(query) {
  const url = `https://api.weatherapi.com/v1/current.json?key=f9e3995e0a4142a0b81173558233007&q=${query}&aqi=yes`;

  let response = await fetch(url, { mode: 'cors' });
  let dataObj = await response.json();
  const airQuality = [
    'Good',
    'Moderate',
    'Unhealthy for sensitive groups',
    'Unhealthy',
    'Very Unhealthy',
    'Hazardous',
  ];

  console.log(dataObj);

  const requiredData = {
    country: dataObj.location.country,
    name: dataObj.location.name,
    air: airQuality[dataObj.current.air_quality['us-epa-index'] - 1],
    conditionText: dataObj.current.condition.text,
    conditionImg: dataObj.current.condition.icon,
    tempC: dataObj.current.temp_c,
    tempF: dataObj.current.temp_f,
    feelsLikeC: dataObj.current.feelslike_c,
    feelsLikeF: dataObj.current.feelslike_f,
    visibility: dataObj.current.vis_km,
  };
  console.log(requiredData);
}

getWeather('New Delhi');
