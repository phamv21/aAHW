import LoginForm from "./login_form";
import { signup } from "../actions/session_actions";
import { connect } from "react-redux";
import React from "react";



const mapStateToProps = state => {
    return {
        formType: 'Signup',
        errors: state.errors.session
    }
}

const mapDispathToProps = dispatch => {
    return {
        submit: user => dispatch(signup(user))
    }
}

class SignupForm extends React.Component{
    render(){
        const {formType,errors,submit,history} = this.props
        return(
            <LoginForm formType={formType} submit={submit} history={history} errors={errors} />
        )
    }
}


export default connect(mapStateToProps,mapDispathToProps)(SignupForm)