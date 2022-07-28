import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
const BenchIndexItem =({benchValues,receiveHighlight})=>{
    const [hoverId,SetHoverId] = useState(null);
    const dispatch = useDispatch();
    const handleHoverId = (e) => {
        e.preventDefault();
        let name = e.target.getAttribute('name')      
        SetHoverId(name);
        
    }
    const resetHoverId = (e) => {
        e.preventDefault();
        SetHoverId(null);
    }

    useEffect(() => {
        dispatch(receiveHighlight(hoverId))
    }, [hoverId]) 

    const bench_list = benchValues.map((bench, idx) => {
        if (bench.lat != null) {
            return <li key={idx} name={bench.id} onMouseEnter={handleHoverId} onMouseLeave={resetHoverId}>
                <p>Description:{bench.description}</p>
                <p>Seat Number:{bench.seating}</p>
                {bench.photo == null ? null : <img src={bench.photo} className='thumb' />}
            </li>
        }
    })
    return (
        <div>
            <ul>
                {bench_list}
            </ul>
        </div>
    )

}

export default BenchIndexItem