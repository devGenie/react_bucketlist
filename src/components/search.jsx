import React from 'react';


const SearchResults=({results})=>(
	<div className='search-results'>
		{results.map((result,index)=>{
			return(
					<div className='search-result'>
						{result.name}
					</div>
				)
			}
		)}
	</div>
)

class Search extends React.Component{
	constructor(props){
		super(props)
		this.state={search_term:'',results:[]}
		this.search=this.search.bind(this)
	}

	search(event){
		event.preventDefault()
		let search_term=event.target.value;
		if (search_term.length>0){
			fetch("https://bucketapi.herokuapp.com/api/v1/bucketlists/?search="+search_term,
				   {headers:{
				   		Authorization:sessionStorage.getItem('auth')
				   },
				   "method":"GET"}
			).then((response)=>response.json())
			.then((jsonResponse)=>{
				if(jsonResponse.status=='success'){
					this.setState({
						results:jsonResponse.data
					});
				}
				else{
					this.setState({
						results:[]
					});
				}
				//this.setState({spinner:'hide'})
			})
		}
		//console.log(searchTerm)
	}

	render(){
		return(
			<div className="searchbar">
            		<input placeholder='Search' onChange={this.search} id="search"/>
            		<SearchResults results={this.state.results}/>
          	</div>
			)
	}
}

export default Search;