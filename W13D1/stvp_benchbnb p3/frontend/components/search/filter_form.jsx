import React from "react";
import { useState } from "react";
import { updateFilter } from "../../actions/bound_actions";

function FilterForm(props){

    const[miSeating,setMiSeating] = useState(props["minSeating"]);
    const[maSeating,setMaSeating] = useState(props["maxSeating"]);

     function  handleMin(e){
        // e.preventDefault();
        setMiSeating(e.target.value);
        
        // console.log('min',miSeating)
    }
     function handleMax(e){
        // e.preventDefault();
         setMaSeating(e.target.value);
        
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        props['updateFilters']('min_seating', parseInt(miSeating))
        props['updateFilters']('max_seating', parseInt(maSeating))

    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="number" name="min_seating" onChange={handleMin} value={miSeating} placeholder='Please put the min in range' id="" />
            <input type="number" name="max_seating" id="" onChange={handleMax} value={maSeating} placeholder='Please put the max in range' />
            <input type="submit" value="Filter" />
        </form>
    )

}

export default FilterForm