import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SingleDirector extends Component {
    
    state = {
        data: {},
    }

    componentDidMount() {
        fetch(`http://localhost:8082/api/directors/${this.props.match.params.id}`).then(res => res.json()).then(data => {
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
            return null
        }
        return (
            <div className="popUp-container">
                <div className="popUp d-add open-record">
                    <Link to="/directors">
                        <button className="close">X</button>
                    </Link>
                    <h1>{this.state.data.name}</h1>
                    <p><b>Id</b>: {this.state.data.id}</p>
                    <p><b>Name</b>: {this.state.data.name}</p>
                </div>
            </div>
        );
    }
}

export default SingleDirector
