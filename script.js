async function getWeather(query) {
  const url = `https://api.weatherapi.com/v1/current.json?key=f9e3995e0a4142a0b81173558233007&q=${query}&aqi=yes`;
  try {
    let response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error(`City ${query} not found`);
    let dataObj = await response.json();

    const airQuality = [
      'Good',
      'Moderate',
      'Unhealthy for sensitive groups',
      'Unhealthy',
      'Very Unhealthy',
      'Hazardous',
    ];
    // console.log(dataObj);
    const requiredData = {
      country: dataObj.location.country,
      name: dataObj.location.name,
      air: airQuality[dataObj.current.air_quality['us-epa-index'] - 1],
      conditionText: dataObj.current.condition.text,
      conditionImg: dataObj.current.condition.icon,
      conditionCode: dataObj.current.condition.code,
      tempC: dataObj.current.temp_c,
      tempF: dataObj.current.temp_f,
      feelsLikeC: dataObj.current.feelslike_c,
      feelsLikeF: dataObj.current.feelslike_f,
      visibility: dataObj.current.vis_km,
      wind: dataObj.current.wind_kph,
      date: dataObj.location.localtime,
      uvIndex: dataObj.current.uv,
    };
    return requiredData;
  } catch (err) {
    alert(err);
  }
}
(async () => {
  console.log(await getWeather('Boston'));
})();
function getBackgroundUrl(code) {
  let mappedValue;
  const cloudy = [1003, 1006, 1009];
  const mist = [1030, 1135, 1147];
  const rain = [
    1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192,
    1195, 1198, 1201, 1204, 1207, 1240, 1237, 1243, 1246, 1249, 1252, 1261,
    1264,
  ];
  const snow = [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1258];
  const sunny = [1000];
  const thunder = [1087, 1273, 1276, 1279, 1282];
  if (cloudy.includes(code)) mappedValue = 'cloudy';
  else if (mist.includes(code)) mappedValue = 'mist';
  else if (rain.includes(code)) mappedValue = 'rain';
  else if (snow.includes(code)) mappedValue = 'snow';
  else if (sunny.includes(code)) mappedValue = 'sunny';
  else if (thunder.includes(code)) mappedValue = 'thunder';
  return `./images/${mappedValue}.jpg`;
}
