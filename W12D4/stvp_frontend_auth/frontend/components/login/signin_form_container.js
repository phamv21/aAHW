import { connect } from "react-redux";
import { signIn } from "../../actions/session_action";
import SigninForm from "./signin_form";
const mapStateToProps = state =>(
    {
        form:{
            username:'',
            password:''
        },
        error: state.session.error,
        form_type: 'signin'
    }
)

const mapDispatchToProps = dispatch =>({
    submit: user => dispatch(signIn(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(SigninForm)