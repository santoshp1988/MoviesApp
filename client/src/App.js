import './App.css';
import '@fontsource/roboto';
import MoviesContainer from './components/movies/MoviesContainer';
import { MoviesProvider } from './contexts/MoviesContext';

function App() {
  return (
    <div className="App">
      <MoviesProvider>
        <MoviesContainer />
      </MoviesProvider>
    </div>
  );
}

export default App;
