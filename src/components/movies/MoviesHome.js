import React, { Component } from 'react';
import MovieContainer from './MovieContainer';
import UpdateDialogBox from '../home/UpdateDialogBox';

class MoviesHome extends Component {
    componentDidMount() {
        fetch("http://localhost:8082/api/movies").then(result => result.json()).then(directorsData => {
            this.props.setData(directorsData);
        });
    }

    onAdd = () => {
        console.log('add movie triggered');
    }

    getSingleMovie = async (id) => await fetch(`http://localhost:8082/api/movies/${id}`).then(res => res.json()).then(result => result);

    onUpdate = async (event) => {
        const id = event.target.parentElement.parentElement.getAttribute('id');
        console.log(id, 'update movie triggered')
        this.props.openUpdateDialog(id);
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

    render() {
        return (
            <div className='container'>
                <button className='add' onClick={this.onAdd} >Add Movie</button>
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
                    <input type="text" className='d-input movie-input' onChange={this.props.changeDialogInputValue} value={this.props.dialogInputValue} />
                    <button className='update d-update' onClick={this.onUpdateApiRequest}>Done</button>
                </UpdateDialogBox>
            </div>
        )
    }
}

export default MoviesHome
