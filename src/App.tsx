import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p>TAILWIND + VITE</p>
      </div>
      <h1>Vite + React</h1>
      <div className="text-white bg-purple-400">
        <button
          className="bg-red-500"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
