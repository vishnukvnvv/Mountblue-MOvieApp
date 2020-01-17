import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import AddNew from './AddNew';
import UpdateMovie from './UpdateMovie';
import DeleteMovie from './DeleteMovie';
import SingleMovie from './SingleMovie';

class MoviesHome extends Component {

  state = {
    data: [],
    singleRecord: {},
    id: 0,
  }


  componentDidMount() {
    fetch("http://localhost:8082/api/movies").then(result => result.json()).then(directorsData => {
      this.setState({
        data: directorsData,
      });
    });
  }

  addReq = async (data) => {
    await fetch(`http://localhost:8082/api/movies/`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(res => res.json()).then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
    this.componentDidMount();
  }

  onUpdate = async (event) => {
    const id = event.target.parentElement.parentElement.parentElement.getAttribute('position');
    await fetch(`http://localhost:8082/api/movies/${id}`).then(res => res.json()).then(data => {
      this.setState({
        singleRecord: data[0],
      })
    })
  }

  modifyObj = (obj) => {
    const newObj = {};
    newObj.title = obj.Title;
    newObj.desc = obj.Description;
    newObj.runtime = obj.Runtime;
    newObj.genre = obj.Genre;
    newObj.rate = obj.Rating;
    newObj.metascore = obj.Metascore;
    newObj.votes = obj.Votes;
    newObj.gross = obj.Gross_Earning_in_Mil;
    newObj.directorId = obj.DirectorId;
    newObj.actor = obj.Actor;
    newObj.year = obj.Year;
    return newObj;
  }

  updateApiReq = async (data) => {
    const newObj = this.modifyObj(data);
    await fetch("http://localhost:8082/api/movies/" + data.id, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    }).then(res => res.json()).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
    this.componentDidMount();
  }

  onDelete = (event) => {
    const id = event.target.parentElement.parentElement.parentElement.getAttribute('position');
    this.setState({
      id: id,
    });
  }

  onDeleteReq = async () => {
    await fetch("http://localhost:8082/api/movies/" + this.state.id, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(res => res.json()).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
    this.componentDidMount();
  }
  render() {
    return (
      <div className='container'>
        <Link to="/movies/add" >
          <button className='add' >Add Movie</button>
        </Link>
        {this.state.data.map((element, index) => <div className="lists" position={element.id} key={index}>
          <Link to={`/movies/${element.id}`}>
            <h1 className="single-record">{element.Title}</h1>
          </Link>
          <div className='movies'>
            <p><b>Id</b>:{element.id}</p>
            <p><b>Title</b>: {element.Title}</p>
            <p className="desc"><b>Description</b>: {element.Description}</p>
            <p><b>Runtime</b>: {element.Runtime}</p>
            <p><b>Genre</b>: {element.Genre}</p>
            <p><b>Rating</b>: {element.Rating}</p>
            <p><b>Metascore</b>: {element.Metascore}</p>
            <p><b>Votes</b>: {element.Votes}</p>
            <p><b>Gross Earning In Millions</b>: {element.Gross_Earning_in_Mil}</p>
            <p><b>DirectorId</b>: {element.DirectorId}</p>
            <p><b>Actor</b>: {element.Actor}</p>
            <p><b>Year</b>: {element.Year}</p>
          </div>
          <div className="buttons">
            <Link to={`/movies/${element.id}/update`}>
              <button className="update" onClick={this.onUpdate}>Update</button>
            </Link>
            <Link to={`/movies/${element.id}/delete`}>
              <button className="update delete" onClick={this.onDelete}>Delete</button>
            </Link>
          </div>
        </div>)}
        <Switch>
          <Route path="/movies/add" component={() => <AddNew addReq={this.addReq} />} />
          <Route path="/movies/:id/update" component={() => <UpdateMovie record={this.state.singleRecord} updateApiReq={this.updateApiReq} />} />
          <Route path="/movies/:id/delete" component={() => <DeleteMovie onDeleteReq={this.onDeleteReq} />} />
          <Route path="/movies/:id" component={SingleMovie} />
        </Switch>
      </div>
    )
  }
}

export default MoviesHome
