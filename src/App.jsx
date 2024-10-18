import { Link } from 'react-router-dom'
import './App.css'
import CustomRoutes from './Components/CustomeRoutes/CustomRoutes'
// import Pokedex from './Components/Pokedex/Pokedex'

function App() {

  return (

    <div className="poke">
    <h1 className='pokemon-heading'>
      <Link to={'/'}><span>Pokedex</span></Link>
    </h1>
      <CustomRoutes />
    </div>
  )
}

export default App
