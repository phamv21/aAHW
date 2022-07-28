import { connect } from "react-redux";
import { logout } from "../actions/session_actions";
import Greeting from "./greeting";

const mapStateToProps = state =>{
    if(state.session.id){
        return {
            loggedIn: true,
            currentUser: state.entities.users[state.session.id]
        }
    }else{
        return {
            loggedIn: false,
            currentUser: {}
        }
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        logout: ()=> dispatch(logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Greeting)