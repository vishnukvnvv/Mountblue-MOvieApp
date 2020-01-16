import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateDirector extends Component {

    state = {
        singleRecord: this.props.record,
        inputValue: '',
    }

    selectChange = () => {
        this.setState({
            inputValue: this.state.singleRecord.name,
        })
    }

    changeInput = (event) => {
        this.setState({
            inputValue: event.target.value,
            singleRecord: { ...this.state.singleRecord, ...{ name: event.target.value } }
        })
    }

    onUpdate = () => {
        this.props.onUpdateApi(this.state.singleRecord);
    }

    render() {
        return (
            <div className="popUp-container">
                <div className="popUp">
                    <Link to="/directors">
                        <button className="close">X</button>
                    </Link>
                    <select className='selection' required onChange={this.selectChange}>
                        <option value="0" selected disabled>select</option>
                        <option value="name">Name</option>
                    </select>
                    <input type="text" className='d-input' value={this.state.inputValue} placeholder="Enter here..." onChange={this.changeInput}/>
                    <Link to="/directors">
                        <button type="submit" className='update d-update' onClick={this.onUpdate}>Done</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default UpdateDirector;
