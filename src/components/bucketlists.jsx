import React from 'react';
import BucketList from './bucketlist';
import Pagination from './pagination';

const BucketLists = ({formCallback,handleDelete,itemEditCallback,load,pages,data})=>{
    return(
        <div>
            <div className='row'>
                {data.map((dataPoint,index)=>{
                    return <BucketList key={index} data={dataPoint} 
                                       formCallback={formCallback} 
                                       deleteHandle={handleDelete} 
                                       itemEditCallback={itemEditCallback}/>
                })}
            </div>
            <div>
                <Pagination next="1" previous="2" loadPage={load} pages={pages}/>
            
            </div>
        </div>
        )
}

export default BucketLists;