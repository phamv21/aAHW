import React from 'react';
import WelcomeBar from './nav_bar/welcome_bar_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import NavBar from './nav_bar/nav_bar';
import ChirpIndexContainer from './chirps/chirp_index_container';
import Home from './home/home';
import { Route } from 'react-router-dom';
import {AuthRoute,ProtectedRoute} from '../utils/route_util'
import SigninContainer from './login/signin_form_container';
import SignupContainer from './login/signup_form_container';
export default () => (
  <div>
    <Route path="/" component={NavBarContainer} />
    <Route exact path="/" component={Home} />
    <AuthRoute exact path='/login' component={SigninContainer}/>
    <AuthRoute exact path ='/signup' component={SignupContainer}/> 
    <ProtectedRoute path="/chirps" component={ChirpIndexContainer} />

  </div>
);
