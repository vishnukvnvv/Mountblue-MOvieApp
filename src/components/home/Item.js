import React, { Component } from 'react';

export class Item extends Component {
    

    render() {
        return (
            <div  id={this.props.id} className='lists'>
                <div >
                    <h1 onClick = {this.props.openContent}>{this.props.name}</h1>
                    {this.props.children}
                </div>
                <div className="buttons">
                    <button className="update" onClick = {this.props.onUpdate}>Update</button>
                    <button className="update delete" onClick = {this.props.onDelete}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Item
