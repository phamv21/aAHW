import { applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from '../middleware/thunk';
import logger from '../middleware/logger';


 const configureStore =(preLoadedState ={}) =>{
    const store = createStore(rootReducer,
        preLoadedState,
        applyMiddleware(thunk,logger)
        );
    //  store.subscribe(() => {
    //      localStorage.state = JSON.stringify(store.getState());
    //  });
    return store;
 };

export default configureStore;