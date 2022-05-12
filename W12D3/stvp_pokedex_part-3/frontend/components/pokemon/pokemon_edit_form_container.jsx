import { connect } from "react-redux";
import PokemonForm from "./pokemon_form";
import { updatePokemon,requestSinglePokemon } from "../../actions/pokemon_actions";
import React from "react";
import { getOnePokemon } from "../../reducers/selectors";

const mapStateToProps = (state,ownProps) => {
    let blankForm = {
            name: '',
            poke_type: '',
            image_url: '',
            attack: '',
            defense: '',
            move_names: [],
        }
    let form = getOnePokemon(state)(ownProps.match.params.pokemonId) || blankForm
    return {
        errors: state.ui.errors,
        form

    }
}
const mapDispatchToProps = dispatch =>{
    return {
        requestPokemon: id=> dispatch(requestSinglePokemon(id)),
        submit: poke=> dispatch(updatePokemon(poke))

    }
}

class pokemonEditForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fetchDone:false
        }
    }
    componentDidMount(){
        this.props.requestPokemon(this.props.match.params.pokemonId).then(()=>this.setState({fetchDone:true}))
    }
    
    render(){
        const {form,submit,errors,history} = this.props
        if (this.state.fetchDone) {
           return <PokemonForm errors={errors} form={form} submit={submit} history={history}></PokemonForm>;
        }else{
            return  <section className="pokemon-detail">
                <div id="loading-pokeball-container">
                    <div id="loading-pokeball"></div>
                </div>
            </section>
        }  
       
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(pokemonEditForm)