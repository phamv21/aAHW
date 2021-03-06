import { connect } from "react-redux";
import PokemonForm from "./pokemon_form";
import { createPokemon } from "../../actions/pokemon_actions";

const mapStateToProps = state =>(
    {
        errors: state.ui.errors
    }
)

const mapDispatchToProps = dispatch =>{
return{
    createPokemon: poke => dispatch(createPokemon(poke))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(PokemonForm)