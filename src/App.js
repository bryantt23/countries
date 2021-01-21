import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');

  return (
    <div className='App'>
      <input
        type='text'
        onChange={e => {
          setInput(e.target.value);
        }}
      ></input>
      {input}
    </div>
  );
}

export default App;
