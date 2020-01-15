import React, { Component } from 'react';

export class UpdateDialogBox extends Component {
    render() {
        if (!this.props.isOpen) {
            return null;
        }

        return (
            <div className='popUp-container'>
                <div className='popUp'>
                    <button id='close' onClick={this.props.openUpdateDialog}>x</button>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default UpdateDialogBox
