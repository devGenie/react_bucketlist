import React from 'react';

class Search extends React.Component{
	constructor(props){
		super(props)
		this.state={search_term:''}
		this.search=this.search.bind(this)
	}

	search(event){
		event.preventDefault()
		let searchTerm=event.target.value

		console.log(searchTerm)
	}

	render(){
		return(
			<div className="searchbar card">
            		<input placeholder='Search' onChange={this.search} id="search"/><i className="search-icon material-icons">search</i>
          	</div>
			)
	}
}

export default Search;