import React from 'react';
let baseUrl = "https://bucketapi.herokuapp.com";

const Paginate = ({next,previous,trigger}) =>{
    return(
           <ul className="item-pagination">
                <li className="item-previous left" onClick={event=>trigger(baseUrl+next)}><a><i className="material-icons">chevron_left</i></a></li>
                <li className="item-next right" onClick={event=>trigger(baseUrl+previous)}><a><i className="material-icons">chevron_right</i></a></li>
           </ul>
    )
}

export default Paginate;