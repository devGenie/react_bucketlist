import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [], display: {} };
    this.show = this.show.bind(this);
  }

  show(result) {
	// alert(JSON.stringify(result))
    this.setState({ display: result });
    this.props.viewSearch(result);
    window.$('#view-result').modal('open');
  }

  render() {
    return (
      <div className="search-results">
        {this.state.results.map((result, index) => (
          <div className="search-result" onClick={() => this.show(result)}>
            {result.name}
          </div>
		),
		)}
      </div>

    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search_term: '', results: [] };
    this.search = this.search.bind(this);
  }

  search(event) {
    event.preventDefault();
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
