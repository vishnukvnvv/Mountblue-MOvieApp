import React, { Component } from 'react';
import MovieContainer from './MovieContainer';
import UpdateDialogBox from '../home/UpdateDialogBox';
import AddDialog from '../home/AddDialog';

class MoviesHome extends Component {
    componentDidMount() {
        fetch("http://localhost:8082/api/movies").then(result => result.json()).then(directorsData => {
            this.props.setData(directorsData);
        });
    }

    onAdd = async () => {
        const newObj = this.props.newRecord;
        await fetch(`http://localhost:8082/api/movies/`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newObj),
        }).then(res => res.json()).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
        this.props.openAddDialog();
        this.props.resetNewRecord();
    }

    getSingleMovie = async (id) => await fetch(`http://localhost:8082/api/movies/${id}`).then(res => res.json()).then(result => result);

    onUpdate = async (event) => {
        const id = event.target.parentElement.parentElement.getAttribute('id');
        this.props.openUpdateDialog();
        const singleData = await this.getSingleMovie(id).then(res => res);
        this.props.setSingleRecord(singleData);
    }

    modifyObj = (obj) => {
        const newObj = {};
        newObj.title = obj.Title;
        newObj.desc = obj.Description;
        newObj.runtime = obj.Runtime;
        newObj.genre = obj.Genre;
        newObj.rate = obj.Rating;
        newObj.metascore = obj.Metascore;
        newObj.votes = obj.Votes;
        newObj.gross = obj.Gross_Earning_in_Mil;
        newObj.directorId = obj.DirectorId;
        newObj.actor = obj.Actor;
        newObj.year = obj.Year;
        return newObj;
    }

    onUpdateApiRequest = async () => {
        await this.props.updateSubmited();
        const newObj = this.props.singleRecord;
        console.log(newObj);
        const modified = this.modifyObj(newObj[0]);
        await fetch("http://localhost:8082/api/movies/" + newObj[0].id, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(modified),
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
        this.props.openUpdateDialog();
    }

    onDelete = async (event) => {
        const id = event.target.parentElement.parentElement.getAttribute('id');
        await fetch("http://localhost:8082/api/movies/" + id, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
        });
        this.componentDidMount();
    }

    selectChange = (event) => {
        console.log('changed to ', event.target.value);
        this.props.setDialogInputValue(event.target.value);
    }

    newInput = (event) => {
        this.props.newRecordFunction(event.target.name, event.target.value);
    }


    render() {
        return (
            <div className='container'>
                <button className='add' onClick={this.props.openAddDialog} >Add Movie</button>
                <MovieContainer data={this.props.data} onUpdate={this.onUpdate} onDelete={this.onDelete} />
                <UpdateDialogBox isOpen={this.props.updateDialog} openUpdateDialog={this.props.openUpdateDialog}>
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
                    <input type="text" className='d-input movie-input' onChange={this.props.changeDialogInputValue} value={this.props.dialogInputValue} placeholder = "Enter here..."/>
                    <button className='update d-update' onClick={this.onUpdateApiRequest}>Done</button>
                </UpdateDialogBox>
                <AddDialog isOpen={this.props.addDialog} openAddDialog={this.props.openAddDialog}>
                    <legend className="add-title"><b>New Movie details</b></legend>
                    <div className="add-form">
                        <label>Title</label>
                        <input type="text" className="d-input" name="title" onChange={this.newInput} value={this.props.newRecord.title} placeholder = "Enter Title..."/>
                        <label>Description</label>
                        <input type="text" className="d-input" name="desc" onChange={this.newInput} value={this.props.newRecord.desc} placeholder = "Enter Description..."/>
                        <label>Runtime</label>
                        <input type="number" className="d-input" name="runtime" onChange={this.newInput} value={this.props.newRecord.runtime} placeholder = "Enter Runtine..."/>
                        <label>Genre</label>
                        <input type="text" className="d-input" name="genre" onChange={this.newInput} value={this.props.newRecord.genre} placeholder = "Enter Genre..."/>
                        <label>Rating</label>
                        <input type="number" className="d-input" name="rate" onChange={this.newInput} value={this.props.newRecord.rate} placeholder = "Enter Rate..."/>
                        <label>Metascore</label>
                        <input type="number" className="d-input" name="metascore" onChange={this.newInput} value={this.props.newRecord.metascore} placeholder = "Enter Metascore..."/>
                        <label>Votes</label>
                        <input type="number" className="d-input" name="votes" onChange={this.newInput} value={this.props.newRecord.votes} placeholder = "Enter Votes..."/>
                        <label>Gross_Earning_in_Millons</label>
                        <input type="number" className="d-input" name="gross" onChange={this.newInput} value={this.props.newRecord.gross} placeholder = "Enter Gross earnings..."/>
                        <label>DirectorId</label>
                        <input type="number" className="d-input" name="directorId" onChange={this.newInput} value={this.props.newRecord.directorId} placeholder = "Enter Director id..."/>
                        <label>Actor</label>
                        <input type="text" className="d-input" name="actor" onChange={this.newInput} value={this.props.newRecord.actor} placeholder = "Enter Actor..."/>
                        <label>Year</label>
                        <input type="number" className="d-input" name="year" onChange={this.newInput} value={this.props.newRecord.year} placeholder = "Enter year..."/>
                    </div>
                    <button type="submit" className="update d-add-btn" onClick={this.onAdd}>Submit</button>
                </AddDialog>
            </div>
        )
    }
}

export default MoviesHome
