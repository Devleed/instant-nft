import './app.css';
import { getCurrentUrl } from './main';

function App() {
  return (
    <div className="App">
      <button onClick={getCurrentUrl}>Click me</button>
      <div style={{ height: 100, width: 100, backgroundColor: 'red' }}></div>
    </div>
  );
}

export default App;
