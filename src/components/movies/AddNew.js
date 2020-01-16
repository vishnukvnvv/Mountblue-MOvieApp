import React, { Component } from 'react';
import { Link }from 'react-router-dom';

class AddNew extends Component {
    state = {
        title: '',
        desc: '',
        runtime: '',
        genre: '',
        rate: '',
        metascore: '',
        votes: '',
        gross: '',
        directorId: '',
        actor: '',
        year: ''
    }

    newInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onAdd = () => {
        this.props.addReq(this.state);
    }

    render() {
        return (
            <div className="popUp-container">
            <div className="popUp d-add d-movies">
              <Link to="/movies">
                <button className="close">X</button>
              </Link>
              <legend className="add-title"><b>New Movie details</b></legend>
              <div className="add-form">
                <label>Title</label>
                <input type="text" className="d-input" name="title" onChange={this.newInput} value={this.state.title} placeholder="Enter Title..." />
                <label>Description</label>
                <input type="text" className="d-input" name="desc" onChange={this.newInput} value={this.state.desc} placeholder="Enter Description..." />
                <label>Runtime</label>
                <input type="number" className="d-input" name="runtime" onChange={this.newInput} value={this.state.runtime} placeholder="Enter Runtine..." />
                <label>Genre</label>
                <input type="text" className="d-input" name="genre" onChange={this.newInput} value={this.state.genre} placeholder="Enter Genre..." />
                <label>Rating</label>
                <input type="number" className="d-input" name="rate" onChange={this.newInput} value={this.state.rate} placeholder="Enter Rate..." />
                <label>Metascore</label>
                <input type="number" className="d-input" name="metascore" onChange={this.newInput} value={this.state.metascore} placeholder="Enter Metascore..." />
                <label>Votes</label>
                <input type="number" className="d-input" name="votes" onChange={this.newInput} value={this.state.votes} placeholder="Enter Votes..." />
                <label>Gross_Earning_in_Millons</label>
                <input type="number" className="d-input" name="gross" onChange={this.newInput} value={this.state.gross} placeholder="Enter Gross earnings..." />
                <label>DirectorId</label>
                <input type="number" className="d-input" name="directorId" onChange={this.newInput} value={this.state.directorId} placeholder="Enter Director id..." />
                <label>Actor</label>
                <input type="text" className="d-input" name="actor" onChange={this.newInput} value={this.state.actor} placeholder="Enter Actor..." />
                <label>Year</label>
                <input type="number" className="d-input" name="year" onChange={this.newInput} value={this.state.year} placeholder="Enter year..." />
              </div>
              <Link to="/movies">
                <button type="submit" className="update d-add-btn" onClick={this.onAdd}>Submit</button>
              </Link>
            </div>
          </div>
        )
    }
}

export default AddNew
