import { connect } from "react-redux";
import PokemonIndex from "./pokemon_index";
import { fetchAllPokemon } from "../../actions/pokemon_action";
import selectAllPokemon from "../../reducers/selector";
const mapStateToProps = state =>{
    return {
        pokemon: selectAllPokemon(state)
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchAllPokemon: dispatch(fetchAllPokemon)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(PokemonIndex)