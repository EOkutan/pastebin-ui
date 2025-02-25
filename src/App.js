import logo from './pastebin.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>Pastebin</code>
        </p>
        <a
          className="App-link"
          href="/create"
        >
          Now Create a Pastebin
        </a>
      </header>
    </div>
  );
}

export default App;
