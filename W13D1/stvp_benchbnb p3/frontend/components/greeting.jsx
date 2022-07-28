import React from "react";
import { Link, Route, Navigate } from "react-router-dom";
import SignupFormContainer from "./signup_form_container";
import LoginFormContainer from "./login_form_container";

class Greeting extends React.Component {
    constructor(props){
        super(props)

        //bind here
        this.handleLogout = this.handleLogout.bind(this);
        //<=
    }
    handleLogout(event){
        event.preventDefault();
        this.props.logout().then(res => <Navigate to='/' replace />);
        
    }

    //this should contain the link to different component regarding to th
    //regarding of login of current user
    render(){
        if(this.props.loggedIn){
            //render logout and name 
            return(
                <div>
                    <h1>Hello {this.props.currentUser.username}</h1>
                    <button className="button" onClick={this.handleLogout}>Logout</button>
                    
                </div>
            )
        }else{
            // show the link to the login or signup
            return(
                <div>
                    <h1>Hello Friend</h1>
                    <Link to="/signup">Signup</Link>
                    <br />
                    <Link to='/login'>Login</Link>
                </div>
            )
        }
    }
}

export default Greeting;