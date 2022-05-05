import React from 'react';

import GiphysIndexItem from './giphys_index_item';

const GiphysIndex = ({giphys,term}) =>{
    let list = giphys.map((giphy, idx)=>(
        <GiphysIndexItem key={idx} url={giphy.images.downsized_medium.url}/>
    ))

    return(
        <div>
            <h1>Result for {term}</h1>
            <ul>
                {list}
            </ul>
        </div>
        
        
    )
}
export default GiphysIndex;