import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/root_reducer';
import logger from 'redux-logger';


 const configureStore =(preLoadedState ={}) =>{
    const store = createStore(rootReducer,
        preLoadedState,
        applyMiddleware(logger)
        );
     store.subscribe(() => {
         localStorage.state = JSON.stringify(store.getState());
     });
    return store;
 };

export default configureStore;