import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { handleError, showCountriesList, showCountryInfo, clearOutput } from './index';


function fetchCountries(name) {
  fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        clearOutput();
        throw new Error('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        clearOutput();
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
      }

      if (data.length >= 2 && data.length <= 10) {
        showCountriesList(data);
      } else {
        showCountryInfo(data);
      }

    })
    .catch(handleError);
}


export { fetchCountries };