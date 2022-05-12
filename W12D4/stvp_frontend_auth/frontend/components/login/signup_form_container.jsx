import SigninForm from "./signin_form";
import { connect } from "react-redux";
import { signUp } from "../../actions/session_action";
import React from "react";

const mapStateToProps = state =>(
    {
        form: {
            username: '',
            password: '',
            email:''
        },
        error: state.session.error,
        form_type: 'signup'
    }
)

const mapDispatchToProps = dispatch =>(
    {
        submit: user => dispatch(signUp(user))
    }
)

class SignUpForm extends React.Component{
    render(){
      const {form,form_type,submit,history,error} = this.props  
      return <SigninForm history={history} form={form} form_type={form_type} submit={submit} error={error}/>
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(SignUpForm)