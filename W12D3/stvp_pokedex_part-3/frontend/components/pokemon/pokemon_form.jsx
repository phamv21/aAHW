
import React from "react";

class PokemonForm extends React.Component {
    constructor(props){
        super(props)
        this.state =this.props.form;
        this.handleName = this.handleName.bind(this)
        this.handleAttack = this.handleAttack.bind(this)
        this.handleDefence = this.handleDefence.bind(this)
        this.handleImageUrl = this.handleImageUrl.bind(this)
        this.handleMoveNames = this.handleMoveNames.bind(this)
        this.handleType = this.handleType.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // static getDerivedStateFromProps(props,state){
    //     if(props.form.id !== state.id)
    //     return props.form;
    // }

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
    handleMoveNames(event){
        this.setState({ move_names: event.currentTarget.value.split(',') })
    }
    
    handleType(event){
        this.setState({poke_type:event.currentTarget.value})
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.submit(this.state).then(pk =>this.props.history.push(`/pokemon/${pk.pokemon.id}`));
        // this.props.submit(this.state).then(pk => console.log(pk));
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
                    <ul className='errors'>
                        {error_lists}
                    </ul>
                }
            <form className="pokemon-form">
                <input type="text" onChange={this.handleName} value={this.state.name} placeholder='Name'/>
                <input type="text" onChange={this.handleImageUrl} value={this.state.image_url} placeholder='URL'/>
                <input type="number" onChange={this.handleAttack} value={this.state.attack} placeholder='Attack'/>
                <input type="number" onChange={this.handleDefence} value={this.state.defense} placeholder='Defence'/>
                <input type="text" onChange={this.handleMoveNames} value={this.state.move_names.join(',')}  placeholder='Moves'/>
                <select onChange={this.handleType} value={this.state.poke_type}>
                    {poke_type_option}
                </select>

                    <button className="button" onClick={this.handleSubmit}>Submit</button>

            </form>
            </section>
        )

    }
}

export default PokemonForm