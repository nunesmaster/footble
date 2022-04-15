
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputPlayer from './components/InputPlayer'
import InputCountry from './components/InputCountry'
import InputPokemon from './components/InputPokemon'
import Header from './components/Header'
import Header2 from './components/Header2'
import Countrle from './components/Countrle'
import Flags from './components/Flags'
import Navbar from './components/Navbar';
import {Button} from "react-bootstrap"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Button href="/countrle">Countrle</Button>
        <Button href="/flags">Guess the flag</Button>
        <div className='content'>
          <Routes>
            <Route path="/countrle" element={<Countrle></Countrle>}/>
            <Route path="/flags" element={<Flags></Flags>}/>
          </Routes>
        
        </div>
      </div>
    </Router>
  );
}

export default App;
