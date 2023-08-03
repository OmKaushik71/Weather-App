const form = document.querySelector('form');
const inputDiv = document.querySelector('input');
const submitInputBtn = document.querySelector('form > button');
const toggleCBtn = document.querySelectorAll('.btn-container > button')[0];
const toggleFBtn = document.querySelectorAll('.btn-container > button')[1];
const locationNameDiv = document.querySelector('#l-name');
const countryNameDiv = document.querySelector('#country');
const dateDiv = document.querySelector('.date');
const weatherIcon = document.querySelector('.temp-data img');
const tempValDiv = document.querySelector('.temp-val');
const weatherTextDiv = document.querySelector('.condition-text');
const feelsLikeDiv = document.querySelector('.feels-like');
const airQualityDiv = document.querySelector('.air-quality h3');
const visibilityDiv = document.querySelector('.visibility h3');
const windDiv = document.querySelector('.wind h3');
const uvDiv = document.querySelector('.uv h3');

async function loadPage(query) {
  const obj = await getWeather(query);
  const url = await getBackgroundUrl(obj.conditionCode);
  document.body.style.backgroundImage = `url('${await url}')`;
  locationNameDiv.textContent = obj.name;
  countryNameDiv.textContent = obj.country;
  weatherIcon.src = obj.conditionImg;
  tempValDiv.innerHTML = obj.tempC;
  weatherTextDiv.textContent = obj.conditionText;
  feelsLikeDiv.innerHTML = obj.feelsLikeC;
  airQualityDiv.textContent = obj.air;
  visibilityDiv.textContent = obj.visibility;
  windDiv.textContent = obj.wind;
  uvDiv.textContent = obj.uvIndex;
  toggleCBtn.addEventListener('click', () => {
    toggleFBtn.classList.toggle('active');
    toggleCBtn.classList.toggle('active');
    if (tempValDiv.innerHTML != obj.tempC) {
      tempValDiv.innerHTML = obj.tempC;
      feelsLikeDiv.innerHTML = obj.feelsLikeC;
    }
  });
  toggleFBtn.addEventListener('click', () => {
    toggleCBtn.classList.toggle('active');
    toggleFBtn.classList.toggle('active');
    if (tempValDiv.innerHTML != obj.tempF) {
      tempValDiv.innerHTML = obj.tempF;
      feelsLikeDiv.innerHTML = obj.feelsLikeF;
    }
  });
}
async function loadRequiredPage() {
  console.log(inputDiv.value);
  await loadPage(inputDiv.value);
}

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
      tempC: `${dataObj.current.temp_c}` + '&#xb0;C',
      tempF: `${dataObj.current.temp_f}` + '&#xb0;F',
      feelsLikeC: `Feels like ${dataObj.current.feelslike_c}` + '&#xb0;C',
      feelsLikeF: `Feels like ${dataObj.current.feelslike_f}` + '&#xb0;F',
      visibility: `${dataObj.current.vis_km}Km`,
      wind: `${dataObj.current.wind_kph}Km/h`,
      uvIndex: dataObj.current.uv,
    };
    return requiredData;
  } catch (err) {
    alert(err);
  }
}

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

loadPage('Seattle');
submitInputBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loadRequiredPage(inputDiv.value);
});
