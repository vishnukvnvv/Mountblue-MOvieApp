import React, { Component } from 'react';

export class UpdateDialogBox extends Component {
    render() {
        if (!this.props.isOpen) {
            return null;
        }

        return (
            <div id='popUp-container'>
                <div id='popUp'>
                    <button id='close' onClick={this.props.openUpdateDialog}>x</button>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default UpdateDialogBox
