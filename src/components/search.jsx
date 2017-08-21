import React from 'react';

class Search extends React.Component{
	constructor(props){
		super(props)
		this.state={search_term:''}
	}

	render(){
		return(
			<div className="searchbar card">
            		<input placeholder='Search' id="search"/><i className="search-icon material-icons">search</i>
          	</div>
			)
	}
}

export default Search;