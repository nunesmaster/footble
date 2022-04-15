
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputPlayer from './components/InputPlayer'
import InputCountry from './components/InputCountry'
import InputPokemon from './components/InputPokemon'
import Header from './components/Header'
import Header2 from './components/Header2'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Header2></Header2>
      <InputCountry></InputCountry>
    </div>
  );
}

export default App;
