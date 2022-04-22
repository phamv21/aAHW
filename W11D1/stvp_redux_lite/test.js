const myNoiseReducer = (prevState = "peace and quiet", action) => {
    switch (action.type) {
        case "noisy action":
            return action.noise;
        default:
            return prevState;
    }
};

const myHopeReducer = (prevState = null, action) => {
    switch (action.type) {
        case "hope action":
            return action.hope;
        default:
            return prevState;
    }
};

const myInconsequentialAction = {
    type: "a type no one cares about",
    data: {
        thisThing: "will not get used anyway"
    }
};

const myNoisyAction = {
    type: "noisy action",
    noise: "Car alarm"
};

const myHopeAction = {
    type: "hope action",
    hope: "MAnY HHHHOOOPPPEEE"
};

const myInitialState = {
    noise: "peace and quiet"
};

const myRootReducer = combineReducers({
    noise: myNoiseReducer,
    hope: myHopeReducer,
});

let newState = myRootReducer(myInitialState, myInconsequentialAction);
// => { noise: "peace and quiet" }

newState = myRootReducer(newState, myNoisyAction)
// => { noise: "Car alarm" }
newState = myRootReducer(newState, myHopeAction)

myRootReducer(newState, myInconsequentialAction)

///

const actionCreator1 = value => ({
    type: "add",
    value
});

const actionCreator2 = value => ({
    type: "subtract",
    value
});

const actionCreator3 = value => ({
    type: "no change",
    value
});

const numberReducer = (num = 0, action) => {
    switch (action.type) {
        case "add":
            return num + action.value;
        case "subtract":
            return num - action.value;
        default:
            return num;
    }
}

const rootReducer = combineReducers({
    number: numberReducer
});

const store = new Store(rootReducer);

store.getState() // => { number: 0 }

const announceStateChange = nextState => {
    console.log(`That action changed the state! Number is now ${nextState.number}`);
}

store.subscribe(announceStateChange);

store.dispatch(actionCreator1(5)); // => "That action changed the state! Number is now 5"
store.dispatch(actionCreator1(5)); // => "That action changed the state! Number is now 10"
store.dispatch(actionCreator2(7)); // => "That action changed the state! Number is now 3"
store.dispatch(actionCreator3(7)); // => Nothing should happen! The reducer doesn't do anything for type "no change"
store.dispatch(actionCreator1(0)) // => Nothing should happen here either. Even though the reducer checks for the "add" action type, adding 0 to the number won't result in a state change.

store.getState(); // => { number: 3 }