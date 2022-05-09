import React from "react";
import {Link,Route} from 'react-router-dom'
import ItemDetailContainer from "./item_detail_container";
class PokemonDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pokemonId:this.props.match.params.pokemonId,

        }
    
    }
    
    componentDidMount(){
        const pId = this.props.match.params.pokemonId
        this.props.requestSinglePokemon(pId)
        
    }
    componentDidUpdate(Prev){
        if (this.props.match.params.pokemonId !== Prev.match.params.pokemonId){
            const pId = this.props.match.params.pokemonId
            this.props.requestSinglePokemon(pId)
            this.setState({ pokemonId: pId})
            
        }
    }
    render(){

        let currentPoke = this.props.poke(this.state.pokemonId) || {};
        let moves = [];
        if(currentPoke.moves !== undefined){ moves = currentPoke.moves.map(el => el.name)}
            

        let itemList = this.props.items.map(item=>(
            <li key={item.id}>
                <Link to={'/pokemon/'+this.state.pokemonId+'/'+item.id}>
                    <img src={item.imageUrl}  />
                </Link>
            </li>
        ))

        return(
            <section className="pokemon-detail">
                {this.props.loading ? 
                    (
                        <div id="loading-pokeball-container">
                            <div id="loading-pokeball"></div>
                        </div>
                    )
                :
                    (
                <div>
                <figure>
                    <img src={currentPoke.imageUrl} />
                </figure>
                <ul>
                    <li>
                        <h2>
                            {currentPoke.name}
                        </h2>
                    </li>
                    <li>
                        Type:{currentPoke.pokeType}
                    </li>

                    <li>
                        Attack:{currentPoke.attack}
                    </li>

                    <li>
                        Defense:{currentPoke.defense}
                    </li>
                    <li>
                        Moves: {moves.join()}
                    </li>
                </ul>
                <section className="toy">
                    <ul className="toy-list">
                        {itemList}
                    </ul>

                </section>
                <Route path='/pokemon/:pokemonId/:itemId' component={ItemDetailContainer} />
                    
                </div>)
                }

            </section>

        )
    }

    
}

export default PokemonDetail