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
    singleRecord: [],
    selectType: '',
    dialogInputValue: '',
  }

  openUpdateDialog = async () => {
    await this.setState({
      updateDialog: !this.state.updateDialog,
    });
    if(!this.state.updateDialog){
      await this.setState({
        singleRecord: [],
        dialogInputValue: '',
      })
    }
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

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" render={() => (
            <h1>Home Page</h1>
          )} />
          <Route path="/movies" component={() => <MoviesHome data={this.state.data} setData={this.setData} updateDialog={this.state.updateDialog} openUpdateDialog={this.openUpdateDialog} setSingleRecord={this.setSingleRecord} setDialogInputValue={this.setDialogInputValue} dialogInputValue={this.state.dialogInputValue} updateSubmited = {this.updateSingleRecord} singleRecord={this.state.singleRecord} changeDialogInputValue = {this.changeDialogInputValue}/>} />
          <Route path="/directors" component={() => <DirectorsHome data={this.state.data} setData={this.setData} updateDialog={this.state.updateDialog} openUpdateDialog={this.openUpdateDialog} setSingleRecord={this.setSingleRecord} singleRecord={this.state.singleRecord} setDialogInputValue={this.setDialogInputValue} dialogInputValue={this.state.dialogInputValue} changeDialogInputValue = {this.changeDialogInputValue} updateSubmited = {this.updateSingleRecord} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
