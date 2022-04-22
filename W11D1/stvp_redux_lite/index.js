document.addEventListener('DOMContentLoaded',()=>{

    var state = {
    };

    //phase 1:

    class Store {
        constructor(rootReducer) {
            this.rootReducer = rootReducer;
            this.state = rootReducer({});
            //phase 4
            this.subscriptions = [];
        };

        getState() {
            return Object.assign({},this.state);
        };

        dispatch(action){
            
            this.state = this.rootReducer(this.state,action,this.subscriptions);
            
        };
        subscribe(callback){
            this.subscriptions.push(callback);
        }
    }
//




//phase 2
    const RoleReducer = (prevState = null, action) => {
        if (action.type === "change role") {
            return action.newRole;
        } else {
            return prevState;
        }
    };

        let  action = {
        type: "change role",
        newRole: "Student"

    }

    //combineing reducers
     window.combineReducers = (object) => { // like this {users: reducerForUsers}
         return (prevState, action = () => (null), callbacks=[])=>{
            let nextState = Object.assign({},prevState);
            let keys = Object.keys(object);
            let changed = false;
            keys.forEach((key)=>{
                nextState[key] = object[key](nextState[key],action)
                if(prevState[key]!== nextState[key]){changed = true}
            })
            if(changed && callbacks !== []){
                //if changed 
                callbacks.forEach((callback)=> { callback(nextState)});
            }

            return nextState;

        }

    }


  //--2 
//phase 3 dispatch


//test 
window.Store = Store;

//--3

// phase 4 subcription 


// ---4





})