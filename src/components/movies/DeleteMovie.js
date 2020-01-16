import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DeleteMovie extends Component {
    render() {
        return (
            <div className="popUp-container">
            <div className="popUp d-del">
              <Link to="/movies">
                <button className="close del">X</button>
              </Link>
              <h2>Are you sure ?</h2>
              <div className="buttons">
                <Link to="/movies">
                  <button className="update  d-del-btn" onClick = {this.props.onDeleteReq} >Ok</button>
                </Link>
                <Link to="/movies">
                  <button className="update delete" >cancel</button>
                </Link>
              </div>
            </div>
          </div>
        )
    }
}

export default DeleteMovie
