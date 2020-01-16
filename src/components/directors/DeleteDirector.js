import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DeleteDirector extends Component {
    render() {
        return (
            <div className="popUp-container">
                <div className="popUp d-del">
                    <Link to="/directors">
                        <button className="close del">X</button>
                    </Link>
                    <h2>Are you sure ?</h2>
                    <div className="buttons">
                        <Link to="/directors">
                            <button className="update  d-del-btn" onClick={this.props.deleteApiReq} >Ok</button>
                        </Link>
                        <Link to="/directors">
                            <button className="update delete" >cancel</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteDirector
