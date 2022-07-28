import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupFormContainer from "./signup_form_container";
import LoginFormContainer from "./login_form_container";
import GreetingContainer from "./greeting_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import BenchFormContainer from "./bench_form/bench_form_container";
import Home from "./home";
// import BenchIndexContainer from "./bench_index_container";
import SearchContainer from "./search/search_container";
const App = () =>(
    <div>
        <header>
            <GreetingContainer />
        </header>
        <Routes>
            {/* <Route path='/' element={<Home/>} /> */}
            <Route exact path='/' element={<SearchContainer />} />

            <Route exact path="/benches/new" element={
                <ProtectedRoute>
                    <BenchFormContainer/>
                </ProtectedRoute>
            } />   

            <Route path = '/signup' element={
            <AuthRoute>
                <SignupFormContainer/>
            </AuthRoute>} />

            <Route  path="/login" element={
            <AuthRoute>
                <LoginFormContainer/>
            </AuthRoute>
            } />    

            

        </Routes >
    </div>
)

export default App;