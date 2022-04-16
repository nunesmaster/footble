
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';
import InputPlayer from './components/InputPlayer'
import InputCountry from './components/InputCountry'
import InputPokemon from './components/InputPokemon'
import Header from './components/Header'
import Header2 from './components/Header2'
import Countrle from './components/Countrle'
import FlagsGame from './components/FlagsGame'
import Navbar from './components/Navbar';
import {Button} from "react-bootstrap"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App" >
        <Button href="/countrle" className="m-2">Countrle</Button>
        <Button href="/flags">Guess the flag</Button>
        <div className='content'>
          <Routes>
            <Route path="/countrle" element={<Countrle></Countrle>}/>
            <Route path="/flags" element={<FlagsGame></FlagsGame>}/>
          </Routes>
        
        </div>
      </div>
    </Router>
  );
}

export default App;
