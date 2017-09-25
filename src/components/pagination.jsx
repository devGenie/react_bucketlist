import React from 'react';

const Pagination = (props) =>{
    return(
           <ul className="page-container pagianation">
                <li className="disabled page"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                    { Array.apply(null,Array(props.pages)).map((item,i)=>{
                        return <li className="page disabled" key={i} onClick={event=>props.loadPage(i+1)}>{i+1}</li>
                        })
                    }
                <li className="disabled page"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
           </ul>
    )
}

export default Pagination;