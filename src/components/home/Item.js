import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {

    updateFunction = (event) =>{
        const id = event.target.parentElement.parentElement.parentElement.getAttribute('id');
        this.setState({
            recordId: id
        });
        this.props.onUpdate(event);
    }

    render() {
        return (
            <div id={this.props.id} className='lists'>
                <div >
                    <h1 onClick={this.props.openContent}>{this.props.name}</h1>
                    {this.props.children}
                </div>
                <div className="buttons">
                    <Link to = {`${this.props.url}/update`} >
                        <button className="update" onClick={this.updateFunction}>Update</button>
                    </Link>
                    <button className="update delete" onClick={this.props.onDelete}>Delete</button>
                </div>
            </div>
        )
    }
}   

export default Item
