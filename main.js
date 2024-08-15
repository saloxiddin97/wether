const btn = document.querySelector('button');
const input = document.querySelector('input');

async function weatherApp() {
  const cardWrapper = document.querySelector('#card-wrapper');
  const city = input.value || 'tashkent';
  console.log(city);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f1077f561d87b1be334b15838fc01b4`
  );

  const result = await response.json();
  console.log(result);

  let selsiy = Math.round(result.main.temp - 273.15);
  let min = Math.round(result.main.temp_min - 273.15);
  let max = Math.round(result.main.temp_max - 273.15);
  let feels = Math.round(result.main.feels_like - 273.15);

  cardWrapper.textContent = '';

  const card = document.createElement('div');
  card.classList.add('card');

  let img = './sun.png';
  let weatherTitle = result.weather[0].main;

  switch (result.weather[0].main) {
    case 'Clear':
      img = './sun.png';
      weatherTitle = 'Quyoshli';
      break;
    case 'Clouds':
      img = './cloud.png';
      weatherTitle = 'Bulutli';
      break;
    case 'Mist':
      img = './mist.png';
      weatherTitle = 'Shamolli Kun';
      break;
    case 'Rain':
      img = './rain.png';
      weatherTitle = 'Yomgirli';
      break;
    case 'Snow':
      img = './snow.png';
      weatherTitle = 'Qor';
      break;
  }

  card.innerHTML = `
  <h2>${result.name}</h2>
  <div class='card-title'>
    <img src=${img} alt='rasm'/>
    <h3>${selsiy} &deg;C</h3>
  </div>
  <h2>${weatherTitle}</h2>
  <hr/>
  <div class='description'>
    <h4>min: ${min} &deg;C</h4>
    <h4>min: ${max} &deg;C</h4>
    <h4>feels: ${feels} &deg;C</h4>
  </div>
  `;

  const err = document.createElement('h2');
  err.textContent = 'error chiqdi';

  console.log(result.cod);

  if (result.cod !== 200) {
    cardWrapper.appendChild(err);
  }

  if (result.cod === 200) {
    cardWrapper.appendChild(card);
  }
}

weatherApp();

btn.addEventListener('click', weatherApp);