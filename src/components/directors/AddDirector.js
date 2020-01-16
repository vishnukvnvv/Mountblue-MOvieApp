import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AddDirector extends Component {
    state = {
        name: '',
    }
    
    newInput = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    addRecord = () => {
        this.props.addNewRecord(this.state);
    }

    render() {
        return (
            <div className="popUp-container">
                <div className="popUp d-add">
                    <Link to="/directors">
                        <button className="close">X</button>
                    </Link>
                    <legend className="add-title">
                        <b>New Director details</b>
                    </legend>
                    <div className="add-form" >
                        <label>Name</label>
                        <input type="text" className="d-input" name="name" placeholder="Enter Name..." onChange={this.newInput} value={this.state.newRecord} />
                    </div>
                    <Link to="/directors">
                        <button type="submit" className="update d-add-btn" onClick={this.addRecord} >Submit</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default AddDirector
