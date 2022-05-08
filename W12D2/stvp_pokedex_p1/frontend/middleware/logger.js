const logger = store => next => action =>{
    console.log('before',store.getState());
    console.log('action', action);
    let result = next(action);
    console.log('after',store.getState())
    return result;
}

export default logger;