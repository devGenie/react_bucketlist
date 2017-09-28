import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search_term: '', results: [] };
    this.search = this.search.bind(this);
  }

  search(event) {
    const search_term = event.target.value;
    if (search_term.length > 0) {
      fetch(`https://bucketapi.herokuapp.com/api/v1/bucketlists/?q=${search_term}`,
				   { headers: {
				   		Authorization: sessionStorage.getItem('auth'),
				   },
				   method: 'GET' },
			).then(response => response.json())
			.then((jsonResponse) => {
  if (jsonResponse.status == 'success') {

    this.props.searchResults(jsonResponse.data)
  }			// this.setState({spinner:'hide'})
});
    }
		// console.log(searchTerm)
  }

  render() {
    return (
      <div className="searchbar z-depth-5 search">
        <input placeholder="Search" onChange={this.search} id="search" />
      </div>
    );
  }
}

export default Search;
