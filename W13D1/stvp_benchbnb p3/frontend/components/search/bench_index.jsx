import React from "react";
import { receiveHighlight } from "../../actions/highlight_actions";
import BenchIndexItem from "./bench_index_item";

class BenchIndex extends React.Component {
    constructor({props}){
        super(props)

        //bind here

        // <--
    }
   

    render(){
        const benchValues = Object.values(this.props.benches)
        return <BenchIndexItem benchValues={benchValues} receiveHighlight={receiveHighlight}/>
    }

}
export default BenchIndex