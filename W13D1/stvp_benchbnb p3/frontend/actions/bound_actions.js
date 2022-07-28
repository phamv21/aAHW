import { fetchBenches } from "./bench_actions";
export const UPDATE_BOUNDS = 'UPDATE_BOUNDS'
export const UPDATE_FILTER = 'UPDATE_FILTER'

export const updateBounds = (bounds) => {
    return {
        type: UPDATE_BOUNDS,
        bounds
    };
    
}

export const updateFilter = (filter,value) =>{
    return {
        type: UPDATE_FILTER,
        filter,
        value
    }
}


export const updateFilters = (filter,value) =>(dispatch, getState) => {
        dispatch(updateFilter(filter, value));
        return fetchBenches(getState().ui.filters)(dispatch)
    }

window.updateFilters = updateFilters