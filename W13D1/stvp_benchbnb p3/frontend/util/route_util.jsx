import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

const Auth = ({ children,loggedIn }) =>{
    if(loggedIn){
        return <Navigate to='/' replace/>
    }
    return children
}
const Protected = ({ children, loggedIn }) => {
    if (loggedIn) {
        return children
    }
    return <Navigate to='/login' replace />
}

const mapStateToProps = state => {
    return {
        loggedIn: Boolean(state.session.id)
    }
}



export const AuthRoute = connect(mapStateToProps)(Auth);
export const ProtectedRoute = connect(mapStateToProps)(Protected);