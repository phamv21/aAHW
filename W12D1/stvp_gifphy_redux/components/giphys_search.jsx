import React from 'react';
import GiphysIndex from './giphys_index';

export default class GiphySearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: '',
            submited: false

        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(event){
        this.setState({term:event.currentTarget.value,submited:false})
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.fetchSearchGiphys(this.state.term)
        
    }
    componentDidUpdate(prevProps){
        if(prevProps.giphys !== this.props.giphys){
            this.setState({submited:true})
        }
    }

    

    render(){
        return(
            <div className='giphys-search'>
                <input className='search-bar' type="text" name="" id="" onChange={this.handleInput} value={this.state.term} />
                <button onClick={this.handleSubmit}>Search</button>
                {this.state.submited 
                    ? <GiphysIndex giphys={this.props.giphys} term={this.state.term} /> 
                    :null
                }
                </div>
        )
    }


}