import React from 'react';
import BucketList from './bucketlist';

const ViewResult=({result})=>(
	<div id="view-result" className="modal">
		<div className="modal-content">
			<BucketList data={result} />
		</div>
	</div>
)

export default ViewResult;