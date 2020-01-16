import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateMovie extends Component {

    state = {
        record: this.props.record,
        inputValue: '',
        selectType: ''
    }

    selectChange = (event) => {
        const type = event.target.value;
        this.setState({
            selectType: type,
            inputValue: this.state.record[type],
        })
    }

    changeInputValue = (event) => {
        this.setState({
            inputValue: event.target.value,
            record: {...this.state.record, ...{[this.state.selectType]: event.target.value}}
        });
    }    

    onSubmit = () => {
        this.props.updateApiReq(this.state.record);
    }
    render() {
        return (
            <div className="popUp-container">
            <div className="popUp d-add">
              <Link to="/movies">
                <button className="close">X</button>
              </Link>
              <select className='selection movie-select' required onChange={this.selectChange}>
                <option value="0" selected disabled>select</option>
                <option value="Title">Title</option>
                <option value="Description">Descripyion</option>
                <option value="Runtime">Runtime</option>
                <option value="Genre">Genre</option>
                <option value="Rating">Rating</option>
                <option value="Metascore">Metascore</option>
                <option value="Votes">Votes</option>
                <option value="Gross_Earning_in_Mil">Gross_earnings</option>
                <option value="DirectorId">Director Id</option>
                <option value="Actor">Actor</option>
                <option value="Year">Year</option>
              </select>
              <input type="text" className='d-input movie-input' onChange={this.changeInputValue} value={this.state.inputValue} placeholder="Enter here..." />
              <Link to="/movies">
                <button className='update d-update' onClick={this.onSubmit}>Done</button>
              </Link>
            </div>
          </div>
        )
    }
}

export default UpdateMovie
