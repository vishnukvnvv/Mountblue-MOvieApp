import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import MovieContainer from './MovieContainer';
import UpdateDialogBox from '../home/UpdateDialogBox';
import AddDialog from '../home/AddDialog';

class MoviesHome extends Component {

  state = {
    data: [],
    singleRecord: [],
    selectType: '',
    dialogInputValue: '',
    newRecord: {},
  }

  openUpdateDialog = async () => {
    await this.setState({
      updateDialog: !this.state.updateDialog,
    });
    if (!this.state.updateDialog) {
      await this.setState({
        singleRecord: [],
        dialogInputValue: '',
      })
    }
  }

  openAddDialog = async () => {
    this.setState({
      addDialog: !this.state.addDialog,
    })
  }

  setData = async (result) => {
    if (JSON.stringify(this.state.data) !== JSON.stringify(result)) {
      await this.setState({
        data: result
      })
    }
  }

  setSingleRecord = async (result) => {
    await this.setState({
      singleRecord: result,
    })
  }

  setDialogInputValue = async (result) => {
    await this.setState({
      selectType: result,
      dialogInputValue: this.state.singleRecord[0][result],
    });
  }

  changeDialogInputValue = async (event) => {
    await this.setState({
      dialogInputValue: event.target.value,
    });
  }

  updateSingleRecord = async () => {
    await this.setState({
      singleRecord: this.state.singleRecord.map(element => {
        element[this.state.selectType] = this.state.dialogInputValue;
        return element
      })
    })
  }

  newRecordFunction = async (objKey, objValue) => {
    await this.setState({
      newRecord: Object.assign(this.state.newRecord, { [objKey]: objValue })
    });
  }

  resetNewRecord = () => {
    this.setState({
      newRecord: {},
    })
  }









  componentDidMount() {
    fetch("http://localhost:8082/api/movies").then(result => result.json()).then(directorsData => {
      this.setData(directorsData);
    });
  }

  onAdd = async () => {
    const newObj = this.state.newRecord;
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
    this.openAddDialog();
    this.resetNewRecord();
    this.componentDidMount();
  }

  getSingleMovie = async (id) => await fetch(`http://localhost:8082/api/movies/${id}`).then(res => res.json()).then(result => result);

  onUpdate = async (event) => {
    const id = event.target.parentElement.parentElement.parentElement.getAttribute('id');
    this.openUpdateDialog();
    const singleData = await this.getSingleMovie(id).then(res => res);
    this.setSingleRecord(singleData);
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
    await this.updateSingleRecord();
    const newObj = this.state.singleRecord;
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
    this.openUpdateDialog();
    this.componentDidMount();
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
    this.setDialogInputValue(event.target.value);
  }

  newInput = (event) => {
    this.newRecordFunction(event.target.name, event.target.value);
  }


  render() {
    return (
      <div className='container'>
        <Link to="/movies/add" >
          <button className='add' onClick={this.openAddDialog} >Add Movie</button>
        </Link>
        <MovieContainer data={this.state.data} onUpdate={this.onUpdate} onDelete={this.onDelete} url={this.props.match.path} />
        <Switch>
          <Route path="/movies/update" component={() => <UpdateDialogBox url={this.props.match.url}>
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
            <input type="text" className='d-input movie-input' onChange={this.changeDialogInputValue} value={this.state.dialogInputValue} placeholder="Enter here..." />
            <Link to="/movies">
              <button className='update d-update' onClick={this.onUpdateApiRequest}>Done</button>
            </Link>
          </UpdateDialogBox>} />
          <Route path="/movies/add" component={() => <AddDialog url={this.props.match.path}>
            <legend className="add-title"><b>New Movie details</b></legend>
            <div className="add-form">
              <label>Title</label>
              <input type="text" className="d-input" name="title" onChange={this.newInput} value={this.state.newRecord.title} placeholder="Enter Title..." />
              <label>Description</label>
              <input type="text" className="d-input" name="desc" onChange={this.newInput} value={this.state.newRecord.desc} placeholder="Enter Description..." />
              <label>Runtime</label>
              <input type="number" className="d-input" name="runtime" onChange={this.newInput} value={this.state.newRecord.runtime} placeholder="Enter Runtine..." />
              <label>Genre</label>
              <input type="text" className="d-input" name="genre" onChange={this.newInput} value={this.state.newRecord.genre} placeholder="Enter Genre..." />
              <label>Rating</label>
              <input type="number" className="d-input" name="rate" onChange={this.newInput} value={this.state.newRecord.rate} placeholder="Enter Rate..." />
              <label>Metascore</label>
              <input type="number" className="d-input" name="metascore" onChange={this.newInput} value={this.state.newRecord.metascore} placeholder="Enter Metascore..." />
              <label>Votes</label>
              <input type="number" className="d-input" name="votes" onChange={this.newInput} value={this.state.newRecord.votes} placeholder="Enter Votes..." />
              <label>Gross_Earning_in_Millons</label>
              <input type="number" className="d-input" name="gross" onChange={this.newInput} value={this.state.newRecord.gross} placeholder="Enter Gross earnings..." />
              <label>DirectorId</label>
              <input type="number" className="d-input" name="directorId" onChange={this.newInput} value={this.state.newRecord.directorId} placeholder="Enter Director id..." />
              <label>Actor</label>
              <input type="text" className="d-input" name="actor" onChange={this.newInput} value={this.state.newRecord.actor} placeholder="Enter Actor..." />
              <label>Year</label>
              <input type="number" className="d-input" name="year" onChange={this.newInput} value={this.state.newRecord.year} placeholder="Enter year..." />
            </div>
            <Link to="/movies">
              <button type="submit" className="update d-add-btn" onClick={this.onAdd}>Submit</button>
            </Link>
          </AddDialog>} />
        </Switch>


      </div>
    )
  }
}

export default MoviesHome
