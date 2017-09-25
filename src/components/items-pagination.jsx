import React from 'react';
let baseUrl = "https://bucketapi.herokuapp.com";

const Paginate = ({next,previous,trigger,loader}) =>{
    return(
           <ul className="item-pagination">
                <div className="left">
                    <img className={`loader-img ${loader}`} src="../images/loader.gif"/>
                </div>

                <div className="right">
                    <li className="item-page item-previous left" onClick={event=>trigger(baseUrl+previous)}><a><i className="material-icons">chevron_left</i></a></li>
                    <li className="item-page item-next right" onClick={event=>trigger(baseUrl+next)}><a><i className="material-icons">chevron_right</i></a></li>
                </div>
           </ul>
    )
}

export default Paginate;