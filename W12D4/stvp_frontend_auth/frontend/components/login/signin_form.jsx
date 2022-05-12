import React from "react";


class SigninForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.form
        
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    handleUsername(e){
        this.setState({username:e.currentTarget.value})
    }
    handlePassword(e){
        this.setState({ password: e.currentTarget.value })
    }
    handleEmail(e){
        this.setState({ email: e.currentTarget.value })
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.submit(this.state)
    }   

    render(){
        let errorList;
        this.props.error.length === 0 ? errorList = (null) :errorList=(this.props.error.map((err,idx)=>(
            <li key={idx}>{err}</li>
        )))
        return(
            <form action="" className="session-form">
                <ul>
                    {errorList}
                </ul>
                <label >
                    Username:
                <input type="text" onChange={this.handleUsername} value={this.state.username} name="username" id="username" />
                </label>
                { this.props.form_type === 'signup' ?

                (<label>
                    Email:
                <input type="text" onChange={this.handleEmail} value={this.state.email} name="email" id="email" />
                    </label>)
                : (null)
                }<label>
                    Password:
                <input type="password" onChange={this.handlePassword} value={this.state.password} name="password" id="password" />
                </label>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default SigninForm;