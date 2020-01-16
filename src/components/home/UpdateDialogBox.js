import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class UpdateDialogBox extends Component {
    render() {
        return (
            <div className='popUp-container'>
                <div className='popUp'>
                    <Link to={`${this.props.url}`}>
                        <button id='close'>x</button>
                    </Link>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default UpdateDialogBox
