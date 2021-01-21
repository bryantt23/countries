import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [countries, setCountries] = useState([]);

  // https://restcountries.eu/rest/v2/all
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCountries(data);
      });
  }, []);

  return (
    <div className='App'>
      find countries{' '}
      <input
        type='text'
        onChange={e => {
          setInput(e.target.value);
        }}
      ></input>
      {input}
      {/* {JSON.stringify(countries)} */}
      {countries && countries.map(country => <p>{country.name}</p>)}
    </div>
  );
}

export default App;
