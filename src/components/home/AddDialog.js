import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AddDialog extends Component {
    render() {
        return (
            <div className='popUp-container'>
                <div className="popUp d-add">
                    <Link to = {`${this.props.url}`}>
                        <button id='close' onClick={this.props.openAddDialog}>x</button>
                    </Link>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default AddDialog
