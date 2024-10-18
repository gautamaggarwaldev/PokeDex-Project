import { Link } from 'react-router-dom';
import './Pokemon.css'
function Pokemon({name, image, id}) {
    return (
       <Link to={`/pokemon/${id}`} className='link'>
            <div className='pokemon'>
                <div className="pokemon-name">{name}</div>
                <div className="pokemon-image"><img src={image} /></div>
            </div>
       </Link>
    )
}

export default Pokemon;