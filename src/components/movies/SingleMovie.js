import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SingleMovie extends Component {

    state = {
        data: {},
    }

    componentDidMount() {
        fetch(`http://localhost:8082/api/movies/${this.props.match.params.id}`).then(res => res.json()).then(data => {
            this.setState({
                data: data[0],
            });
        }).catch(error => {
            this.setState({
                data: 0,
            })
        })
    }

    render() {
        if(!this.state.data){
            return null;
        }
        return (
            <div className="popUp-container">
                <div className="popUp d-add open-record-movie">
                    <Link to="/movies">
                        <button className="close">X</button>
                    </Link>
                    <h1>{this.state.data.Title}</h1>
                    <p><b>Id</b>: {this.state.data.id}</p>
                    <p><b>Title</b>: {this.state.data.Title}</p>
                    <p><b>Description</b>: {this.state.data.Description}</p>
                    <p><b>Runtime</b>: {this.state.data.Runtime}</p>
                    <p><b>Genre</b>: {this.state.data.Genre}</p>
                    <p><b>Rating</b>: {this.state.data.Rating}</p>
                    <p><b>Metascore</b>: {this.state.data.Metascore}</p>
                    <p><b>Votes</b>: {this.state.data.Votes}</p>
                    <p><b>Gross Earning In Millions</b>: {this.state.data.Gross_Earning_in_Mil}</p>
                    <p><b>DirectorId</b>: {this.state.data.DirectorId}</p>
                    <p><b>Actor</b>: {this.state.data.Actor}</p>
                    <p><b>Year</b>: {this.state.data.Year}</p>
                </div>
            </div>
        )
    }
}

export default SingleMovie
