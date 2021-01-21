import { useState, useEffect } from 'react';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState('');

  //get all countries from api
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCountries(data);
      });
  }, []);

  const showCountry = country => {
    const { languages } = country;
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
      </div>
    );
    setSearchResult(result);
  };

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
