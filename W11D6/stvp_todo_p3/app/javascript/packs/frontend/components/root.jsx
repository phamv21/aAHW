import React from "react";
import reactDom from "react-dom";
import { App } from "./app";
import { Provider } from "react-redux";
// import configureStore from "../store/store";


const Root = ({store})=>{
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default Root;