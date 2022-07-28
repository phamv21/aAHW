import React from "react";


export default class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
        
        

        //bind function here
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        // <--
    }

    handleUsername(event){
        event.preventDefault();
        this.setState({username:event.currentTarget.value})
    }
    handlePassword(event){
        event.preventDefault();
        this.setState({password:event.currentTarget.value})

    }
    handleSubmit(event){
        event.preventDefault();
        this.props.submit(this.state)
    }


    render(){
        let errorList = null;
        if(this.props.errors.length > 0){
            errorList = this.props.errors.map((err,idx)=>(
                <li key={idx}>
                    {err}
                </li>
            ))
        }
        return(
            <form onSubmit={this.handleSubmit} >
                <ul>
                    {errorList}
                </ul>
                <input type="text" name="username" id="username" onChange={this.handleUsername} value={this.state.username}/>
                <input type="password" name="password" id="password" onChange={this.handlePassword} value={this.state.password} />
                <input type="submit" name="" id="" value={this.props.formType}/>
            </form>
        )
    }
}