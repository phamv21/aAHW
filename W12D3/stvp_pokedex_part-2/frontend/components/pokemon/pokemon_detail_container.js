import { connect } from "react-redux";
import PokemonDetail from "./pokemon_detail";
import { selectAllItems,selectSinglePokemon } from "../../reducers/selectors";
import { requestSinglePokemon } from "../../actions/pokemon_actions";
const mapStateToProps = state =>{
    return {
        poke: pId => selectSinglePokemon(state)(pId),
        items: selectAllItems(state),
        loading: state.ui.loading.detailLoading

    }
}

const mapDispatchToProps = dispatch =>{
    return {
        requestSinglePokemon: pId => dispatch(requestSinglePokemon(pId))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(PokemonDetail);