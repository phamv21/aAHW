import { connect } from "react-redux";
import PokemonForm from "./pokemon_form";
import { createPokemon } from "../../actions/pokemon_actions";

const mapStateToProps = state =>(
    {
        errors: state.ui.errors,
        form: {
            name: '',
            poke_type: 'fire',
            image_url: '',
            attack: '',
            defense: '',
            move_names: [],
        }
    }
)

const mapDispatchToProps = dispatch =>{
return{
    submit: poke => dispatch(createPokemon(poke))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(PokemonForm)