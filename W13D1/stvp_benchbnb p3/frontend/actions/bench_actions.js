import * as APIUtil from '../util/bench_api_util'
import { receiveErrors } from './session_actions'


export const RECEIVE_BENCHES = 'RECEIVE_BENCHES'
export const RECEIVE_BENCH  = 'RECEIVE_BENCH'


export const receiveBenches = (benches)  =>(
    {
        type: RECEIVE_BENCHES,
        benches
    }
)

export const receiveBench = (bench) => (
    {
        type: RECEIVE_BENCH,
        bench
    }
)

export const createBench = bench => dispatch =>{
     APIUtil.createBench(bench).then(
        b => {
            dispatch(receiveBench(b));
            },
        errors => dispatch(receiveErrors(errors.responseJSON))

    )
    
}

export const fetchBenches = (filters={}) => dispatch => {
    return APIUtil.fetchBenches(filters).then(
        benches => dispatch(receiveBenches(benches)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}

// for diganostic 
