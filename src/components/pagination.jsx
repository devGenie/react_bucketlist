import React from 'react';

const Pagination = (props) =>{
    return(
           <div>
                <div className="previous">Prev</div>
                    { Array.apply(null,Array(props.pages)).map((item,i)=>{
                        return <div className="page">{i+1}</div>
                        })
                    }
                <div className="next">Next</div>
           </div>
    )
}

export default Pagination;