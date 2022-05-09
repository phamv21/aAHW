
import React from "react";

class PokemonForm extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            name: '',
            poke_type: 'fire',
            image_url:'',
            attack: '',
            defense: '',
            move_names :[],
            m1:'',
            m2:''

        };
        this.handleName = this.handleName.bind(this)
        this.handleAttack = this.handleAttack.bind(this)
        this.handleDefence = this.handleDefence.bind(this)
        this.handleImageUrl = this.handleImageUrl.bind(this)
        this.handleMoveNames1 = this.handleMoveNames1.bind(this)
        this.handleMoveNames2 = this.handleMoveNames2.bind(this)
        this.handleType = this.handleType.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleName(event){
        this.setState({name:event.currentTarget.value})
    }
    handleAttack(event){
        this.setState({ attack: event.currentTarget.value })
    }
    handleDefence(event){
        this.setState({ defense: event.currentTarget.value })
    }
    handleImageUrl(event){
        this.setState({ image_url: event.currentTarget.value })
    }
    handleMoveNames1(event){

        this.setState({ m1: event.currentTarget.value })
        this.setState({ move_names: [this.state.m1, this.state.m2] })
    }
    handleMoveNames2(event) {

        this.setState({ m2: event.currentTarget.value })
        this.setState({ move_names: [this.state.m1, this.state.m2] })
    }
    handleType(event){
        this.setState({poke_type:event.currentTarget.value})
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.createPokemon(this.state).then(pk => {this.props.history.push(`pokemon/${pk.pokemon.id}`)});
    }

    render(){
        let poke_type_option = POKEMON_TYPES.map((type,idx) =>(
            <option key={idx} value={type}>{type}</option>
        ))

        let errors = this.props.errors || [];
        let error_lists = errors.map((el, idx) => (
            <li key={idx}>
                {el}
            </li>
        ))

        return(
            <section className="pokemon-detail">
                {errors.length === 0 ? null :
                    <ul className='errors-display'>
                        {error_lists}
                    </ul>
                }
            <form className="pokemon-form">
                <input type="text" onChange={this.handleName} value={this.state.name} placeholder='Name'/>
                <input type="text" onChange={this.handleImageUrl} value={this.state.image_url} placeholder='URL'/>
                <input type="number" onChange={this.handleAttack} value={this.state.attack} placeholder='Attack'/>
                <input type="number" onChange={this.handleDefence} value={this.state.defense} placeholder='Defence'/>
                <input type="text" onChange={this.handleMoveNames1}  placeholder='Move1'/>
                <input type="text" onChange={this.handleMoveNames2} placeholder='Move2' />
                <select onChange={this.handleType} value={this.state.poke_type}>
                    {poke_type_option}
                </select>
                <input type="submit"  onClick={this.handleSubmit} />

            </form>
            </section>
        )

    }
}

export default PokemonForm