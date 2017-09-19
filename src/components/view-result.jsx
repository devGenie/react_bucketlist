import React from 'react';
import BucketList from './bucketlist';

const ViewResult=({result,formCallback,deleteHandle,itemEditCallback})=>(
	<div id="view-result" className="modal">
		<div className="modal-content">
			<BucketList data={result} 
                        formCallback={formCallback} 
                        deleteHandle={deleteHandle} 
                        itemEditCallback={itemEditCallback}/>
		</div>
	</div>
)

export default ViewResult;
