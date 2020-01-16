import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css'
import Header from './components/home/Header'
import MoviesHome from './components/movies/MoviesHome';
import DirectorsHome from './components/directors/DirectorsHome';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route path="/movies" component={MoviesHome} />
          <Route path="/directors" component={DirectorsHome} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
