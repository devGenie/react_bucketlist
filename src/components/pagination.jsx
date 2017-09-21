import React from 'react';

const Pagination = (props) =>{
    return(
           <div className="page-container">
                <div className="previous page">Prev</div>
                    { Array.apply(null,Array(props.pages)).map((item,i)=>{
                        return <div className="page" onClick={event=>props.loadPage(i+1)}>{i+1}</div>
                        })
                    }
                <div className="next page">Next</div>
           </div>
    )
}

export default Pagination;