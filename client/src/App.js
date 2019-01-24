import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import MovieCreate from './Movies/MovieCreate';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: [],
      title: '',
      director: '',
      metascore: '',
      stars: [],
      movies: []
    }
  }

  addToSavedList = (movie) => {
    // console.log(this.state.savedList)
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

  handleInput = e => {
    switch(e.target.name){
      case 'title':
        this.setState({title: e.target.value });
        break;
      case 'director':
        this.setState({ director: e.target.value });
        break;
      case 'metascore':
        this.setState({ metascore: e.target.value });
        break;
      case 'stars':
         let star = e.target.value;
        let newStars = star.split(' ');
        // console.log(newStars[0]);
        this.setState({ stars: newStars });
        console.log(this.state.stars)
        break;
      default:
        console.log("invalid input")
    }
  };

  createMovie = e => {
    const movie ={ title: this.state.title, director: this.state.director, metascore: this.state.metascore, stars: this.state.stars};
    // console.log(this.state.movie)
    e.preventDefault();
    axios 
      .post('http://localhost:5000/api/movies', movie)
      .then(res => {
        this.setState({movies: res.data});
        this.props.history.push('/');
        console.log(res.data)
      })
      .catch(err => console.log(err.response))
  }

  componentDidMount() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        this.setState({ movies: res.data });
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  render(){
    console.log(this.state.movie)
    return (
      <div>
        <NavLink to="/movie/add">Add Movie</NavLink>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" render={props => <MovieList {...props} movies={this.state.movies}/>} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
        <Route path="/movie/add" render={props => <MovieCreate {...props} title={this.state.title} director={this.state.director} metascore={this.state.metascore} stars={this.state.stars} handleInput={this.handleInput} createMovie={this.createMovie}/>} />
      </div>
    )
  }
}
