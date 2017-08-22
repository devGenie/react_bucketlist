import React from 'react';

class Search extends React.Component{
	constructor(props){
		super(props)
		this.state={search_term:''}
		this.search=this.search.bind(this)
	}

	search(event){
		event.preventDefault()
		let search_term=event.target.value;
		fetch("https://bucketapi.herokuapp.com/api/v1/bucketlists/?search="+search_term,
			   {headers:{
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   "method":"GET"}
		).then((response)=>response.json())
		.then((jsonResponse)=>{
			let res=JSON.stringify(jsonResponse);
			console.log(res)
			if(jsonResponse.status=='success'){
				//this.setState({
				//	bucketlists:jsonResponse.data
				//});
			}
			else{
				//alert(jsonResponse.message);
			}
			//this.setState({spinner:'hide'})
		})

		//console.log(searchTerm)
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