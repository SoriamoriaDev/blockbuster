import React, { Component } from 'react';
import axios from 'axios';

export default class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies:[],
      filtered: [],
      isVIP: false,
      itemsToShow: 5,
      expanded: false
    };
    this.showMore = this.showMore.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    axios.get(process.env.API_URI + `/movies/all`)
    .then(resp => {
      //console.log("Data received : " + resp.data)
      this.setState({movies: resp.data});
      this.setState({filtered: resp.data});
    })
    const token = localStorage.getItem('VIP');
    console.log("Token VIP : " + token)
    this.setState({isVIP: token});

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.filtered
    });
  }

  handleChange(e) {
    // Variable to hold the original version of the list
let currentList = [];
    // Variable to hold the filtered list before putting into state
let newList = [];

    // If the search bar isn't empty and has more than 2 caracters
if (e.target.value !== "" && e.target.value.length > 2 ) {
        // Assign the original list to currentList
  currentList = this.state.movies;
  //console.log("currentList : " + currentList);

        // Use .filter() to determine which items should be displayed
        // based on the search terms
  newList = currentList.filter(movie => {
            // change current item to lowercase
    const movieInString = JSON.stringify(movie);   
    const lc = movieInString.toLowerCase();
            //console.log("lc : " + lc);
            // change search term to lowercase
    const filter = e.target.value.toLowerCase();
            // check to see if the current list item includes the search term
            // If it does, it will be added to newList. Using lowercase eliminates
            // issues with capitalization in search terms and search content
    return lc.includes(filter);
  });
} else {
        // If the search bar is empty, set newList to original task list
  newList = this.state.movies;
}
    // Set the filtered state based on what our rules added to newList
this.setState({
  filtered: newList
});
}

showMore() {
  this.state.itemsToShow === 5 ? (
    this.setState({ itemsToShow: this.state.filtered.length, expanded: true })
  ) : (
    this.setState({ itemsToShow: 5, expanded: false })
  )
}

  render() {


    let content;

    if(this.state.isVIP){
      content = 
      <div>
        <form className="form-inline d-flex md-form form-sm mt-0">
          <label>Search by movie name</label>
          <input type="text" className="form-control w-100" onChange={this.handleChange} placeholder="Movie name"/>
          <br></br>
          <label>Search by year</label>
          <input className="form-control w-100" type="text" onChange={this.handleChange} placeholder="YYYY" id="date-input"></input>
        </form>
    <br></br>
    <ul className="list-group">
      { this.state.filtered.slice(0, this.state.itemsToShow).map((movie, i) => 
      <li className="list-group-item" key={i}>
        <h3>{movie.title}</h3>
        <p>{movie.release_year}</p>
        <p>{movie.category_name}</p>
      </li>
      )}
        <a className="btn btn-light" onClick={this.showMore}>
        {this.state.expanded ? (<span>Show less ▲</span>) : (<span>Show more ▼</span>)}
        </a>
    </ul> 
    </div>
    }
    else{
      content = <h3>Sorry! You need VIP credentials to see all movies :O</h3>
    }


      return (
        <div>

          <h1>Movies</h1>

          {content}

        </div>
      );
  }

}