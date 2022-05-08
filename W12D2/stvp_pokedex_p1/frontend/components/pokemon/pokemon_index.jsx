import React from "react";

class PokemonIndex extends React.Component {
    constructor(props){
        super(props)
        //bind fnc here
        //<--
    }
    afterCompomentDidMount(){
        this.props.fetchAllPokemon
    }

    render(){
        let list = this.props.pokemon.map((poke,idx)=>(
            <li key={idx}>
                <label>
                    {poke.name}:
                <img src={poke.imageUrl} alt={poke.name} />
                </label>
            </li>
        ))
        return(
            <ul>
                {list}
            </ul>
        )
    }
}

export default PokemonIndex;