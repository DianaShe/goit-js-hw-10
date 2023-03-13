import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(event) {
  const name = event.target.value.trim();
  if (name === "") {
    clearOutput();
  } else {
    fetchCountries(name);
  }
}

function clearOutput() {
    countriesListEl.innerHTML = "";
    countryInfoEl.innerHTML = "";
}

function showCountriesList(data) {
  clearOutput();
  const markup = data
    .map(country =>
        `<li class="list-item">
            <img src=${country.flags.svg} height=20 width=20></img>
            <span class="country-name">${country.name}</span>
        </li>`
    )
    .join('');
  countriesListEl.innerHTML = markup;
}

function showCountryInfo(data) {
  clearOutput();
  const markup = data
    .map(country => `<h2>
        <img src=${country.flags.svg} height=30 width=40></img>
        <span class="country-name">${country.name}</span>
      </h2>
        <li class="list-item"><b>Capital</b>: ${country.capital}</li>
        <li class="list-item"><b>Population</b>: ${country.population}</li>
        <li class="list-item"><b>Languages</b>: ${country.languages[0].name}</li>`
    )
    .join('');
  countryInfoEl.innerHTML = markup;
}

function handleError(error) {
  Notify.failure(error.message);
}

export { handleError, showCountriesList, showCountryInfo, clearOutput };
