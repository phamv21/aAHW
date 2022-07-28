import LoginForm from "./login_form";
import { connect } from "react-redux";
import { login } from "../actions/session_actions";
const mapStateToProps = state =>{
    return {
        formType:'Login',
        errors: state.errors.session
    }
}

const mapDispatchToProps = dispatch =>{
    return {submit:user => dispatch(login(user))}
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)