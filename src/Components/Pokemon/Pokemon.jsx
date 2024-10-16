import './Pokemon.css'
function Pokemon({name, image, id}) {
    return (
        <div className='pokemon'>
            <div className="pokemon-name">{name} {id}</div>
            <div className="pokemon-image"><img src={image} /></div>
            
        </div>
    )
}

export default Pokemon;