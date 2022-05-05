import { SWITCH_LOCATION } from "./actions";
const initialState = {
  city: "Please Select", 
  jobs: []
};

const reducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type){
    case SWITCH_LOCATION:
    return {city:action.city,
      jobs: action.jobs
    };
    default:
      return initialState;
  }
};

export default reducer;

