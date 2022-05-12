import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Route , Link, Redirect} from "react-router-dom";
import { withRouter } from "react-router-dom";

const Auth = ({component:Component, path, exact,history,loggedIn}) => (
    <Route history={history} path={path} exact={exact} render = {(props) =>(
        !loggedIn ? 
        (<Component {...props}/>)
        :
        (<Redirect to='/chirps'/>)
    )}/>
)

const Protected = ({ component: Component, path, exact, loggedIn,history }) => (
    <Route path={path} exact={exact} history={history} render={(props) => (
        loggedIn ?
            (<Component {...props} />)
            :
            (<Redirect to='/login' />)
    )} />
)

const mapStateToProps = state =>(
    {loggedIn: Boolean(state.session.currentUser.id)}
)
export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));