import { useState, useEffect } from 'react';
const API_WEATHER_KEY = 'cbe3a5258849eb31e096fd9bf0763eb8';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState('');

  //get all countries from api
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      });
  }, []);

  const showCountry = async country => {
    const { languages } = country;
    const res = await getCityWeather(country.capital);
    const weather = displayWeather(res);

    const result = (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>

        <h3>languages</h3>
        <ul>
          {languages.map(language => (
            <li>{language.name}</li>
          ))}
        </ul>
        <img height={100} src={country.flag} />
        <p>{weather}</p>
      </div>
    );
    setSearchResult(result);
  };

  // https://github.com/bryantt23/weather-api/blob/master/script.js
  async function getCityWeather(city) {
    // this gets rid of undefined
    // return Promise.resolve('hi');

    city = city.split(' ').length > 1 ? city.split(' ').join('+') : city;

    const url =
      'http://api.openweathermap.org/data/2.5/weather?APPID=' +
      API_WEATHER_KEY +
      '&q=' +
      city +
      '&units=imperial ';

    const res = await fetch(url);
    const data = await res.json();

    // https://www.pluralsight.com/guides/javascript-promise-typeerror:-cannot-read-then-of-undefined
    return Promise.resolve(data);
  }

  function displayWeather(data) {
    return `City: ${data.name}, Temp: ${data.main.temp}, Description: ${data.weather[0].main}`;
  }

  useEffect(() => {
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(filteredCountries);
    if (filteredCountries.length >= 10) {
      setSearchResult('Too many matches, specify another filter');
    } else if (filteredCountries.length > 1) {
      const searchResult = filteredCountries.map(country => (
        <p>
          {country.name}{' '}
          <button
            onClick={() => {
              showCountry(country);
            }}
          >
            Show
          </button>
        </p>
      ));
      setSearchResult(searchResult);
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      showCountry(country);
    } else if (filteredCountries.length === 0) {
      //zero results
      setSearchResult('No country found');
    }
  }, [searchInput]);

  return (
    <div className='App'>
      find countries{' '}
      <input
        type='text'
        onChange={e => {
          setSearchInput(e.target.value);
        }}
      ></input>
      <br />
      {searchResult}
    </div>
  );
}

export default App;
