import React from 'react';
export default class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchString: '',

        };
        this.updateSearchString = this.updateSearchString.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        this.setSearchString = this.setSearchString.bind(this);
    }

    handleQuery(arr,query){
        return arr.filter(el=>
             el.toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
    }
    updateSearchString(event){
        event.preventDefault();
        this.setState({searchString: event.currentTarget.value})
    }
    setSearchString(event){
        this.setState({searchString: event.currentTarget.innerText})
    }
    

    render(){
        let result = this.handleQuery(this.props.list,this.state.searchString);


        let list = result.map((el,idx)=>(
                <li key={idx} onClick={this.setSearchString}>
                    {el}
                </li>
        ))
        return(
            <div className='auto-complete'>
                <h1>Auto Complete</h1>
                <form action="">
                    <input type="text" onChange={this.updateSearchString} value={this.state.searchString} placeholder="Search..." />
                    <ul>
                        {list}
                    </ul>        
                </form>
            </div>
        );
    }
}