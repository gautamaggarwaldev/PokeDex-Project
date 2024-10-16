function Pokemon({name, image, id}) {
    return (
        <div>
            <div>{name} {id}</div>
            <div><img src={image} /></div>
            
        </div>
    )
}

export default Pokemon;