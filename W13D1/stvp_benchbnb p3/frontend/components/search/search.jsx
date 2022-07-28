import React, { userState,userEffect } from "react";
import { updateBounds, updateFilter } from "../../actions/bound_actions";
import BenchIndex from "./bench_index";
import BenchMap from "./bench_map";
import FilterForm from "./filter_form";



const Search = ({benches,fetchBenches,bounds,updateFilters,minSeating,maxSeating,updateFilter,receiveHighlight,highlightId}) => (

    <div className="search-field">
       
        <div className="half-left">
            <BenchMap benches={benches} fetchBenches={fetchBenches} updateFilters={updateFilters} updateFilter={updateFilter} highlightId={highlightId}/>
        </div>
        <div className="half-right">
            <FilterForm minSeating={minSeating} maxSeating={maxSeating} updateFilters={updateFilters} />
            <BenchIndex benches={benches} fetchBenches={fetchBenches} bounds={bounds} receiveHighlight={receiveHighlight}/>
        </div>
       
        
        
    </div>
)
export default Search