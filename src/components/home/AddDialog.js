import React, { Component } from 'react'

export class AddDialog extends Component {
    render() {
        if (!this.props.isOpen) {
            return null;
        }
        return (
            <div className='popUp-container'>
                <div className="popUp d-add">
                    <button id='close' onClick={this.props.openAddDialog}>x</button>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default AddDialog
