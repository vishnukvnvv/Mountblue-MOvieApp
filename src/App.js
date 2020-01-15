import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css'
import Header from './components/home/Header'
import MoviesHome from './components/movies/MoviesHome';
import DirectorsHome from './components/directors/DirectorsHome';

class App extends Component {
  state = {
    data: [],
    updateDialog: false,
    addDialog: false,
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
    const inputValue = event.target.value;
    await this.setState((state, props) => {
      state.dialogInputValue = inputValue;
      return null;
    })
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
      newRecord: Object.assign(this.state.newRecord, { [objKey]: objValue})
    });
  }

  resetNewRecord = () => {
    this.setState({
      newRecord: {},
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" render={() => (
            <h1>Home Page</h1>
          )} />
          <Route path="/movies" component={() => <MoviesHome data={this.state.data} setData={this.setData} updateDialog={this.state.updateDialog} openUpdateDialog={this.openUpdateDialog} setSingleRecord={this.setSingleRecord} setDialogInputValue={this.setDialogInputValue} dialogInputValue={this.state.dialogInputValue} updateSubmited={this.updateSingleRecord} singleRecord={this.state.singleRecord} changeDialogInputValue={this.changeDialogInputValue} addDialog={this.state.addDialog} openAddDialog={this.openAddDialog} newRecordFunction={this.newRecordFunction} newRecord = {this.state.newRecord} resetNewRecord = {this.resetNewRecord}/>} />
          <Route path="/directors" component={() => <DirectorsHome data={this.state.data} setData={this.setData} updateDialog={this.state.updateDialog} openUpdateDialog={this.openUpdateDialog} setSingleRecord={this.setSingleRecord} singleRecord={this.state.singleRecord} setDialogInputValue={this.setDialogInputValue} dialogInputValue={this.state.dialogInputValue} changeDialogInputValue={this.changeDialogInputValue} updateSubmited={this.updateSingleRecord} addDialog={this.state.addDialog} openAddDialog={this.openAddDialog} newRecordFunction={this.newRecordFunction} newRecord = {this.state.newRecord} resetNewRecord = {this.resetNewRecord}/>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
