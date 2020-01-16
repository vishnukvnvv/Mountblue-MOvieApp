import React, { Component } from 'react';
import DirectorContainer from './DirectorContainer';
import UpdateDialogBox from '../home/UpdateDialogBox';
import AddDialog from '../home/AddDialog';
import { Switch, Link, Route } from 'react-router-dom'

class DirectorsHome extends Component {

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
        await this.setState({
            data: result
        })
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
        fetch("http://localhost:8082/api/directors").then(result => result.json()).then(directorsData => {
            this.setData(directorsData);
        });
    }

    openDirector = (event) => {
        console.log('open Directors')
    }

    addReq = async () => {
        const newObj = this.state.newRecord;
        await fetch("http://localhost:8082/api/directors", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newObj),
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
        });
        this.openAddDialog();
        this.resetNewRecord();
        this.componentDidMount();
    }

    getSingleDirector = async (id) => await fetch(`http://localhost:8082/api/directors/${id}`).then(res => res.json()).then(result => result).catch(error => {
        console.log(error);
    })


    onUpdate = async (event) => {
        const id = event.target.parentElement.parentElement.parentElement.getAttribute('id');
        const singleData = await this.getSingleDirector(id).then(res => res);
        this.openUpdateDialog();
        this.setSingleRecord(singleData);
    }

    onUpdateApiRequest = async () => {
        await this.updateSingleRecord();
        const newObj = this.state.singleRecord;
        await fetch("http://localhost:8082/api/directors/" + newObj[0].id, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newObj[0])
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
        })
        this.openUpdateDialog();
        this.componentDidMount();
    }

    onDelete = async (event) => {
        const id = event.target.parentElement.parentElement.getAttribute('id');
        console.log(id, 'delete director triggered');
        await fetch("http://localhost:8082/api/directors/" + id, {
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
                <Link to="/directors/add">
                    <button className='add' onClick={this.openAddDialog}>Add Director</button>
                </Link>
                <DirectorContainer data={this.state.data} onUpdate={this.onUpdate} onDelete={this.onDelete} openContent={this.openDirector} url = {this.props.match.path}/>
                <Switch>
                    <Route path="/directors/update" component={() => <UpdateDialogBox url = {this.props.match.path}>
                        <select className='selection' required onChange={this.selectChange}>
                            <option value="0" selected disabled>select</option>
                            <option value="name">Name</option>
                        </select>
                        <input type="text" className='d-input' onChange={this.changeDialogInputValue} value={this.state.dialogInputValue} placeholder="Enter here..." />
                        <Link to="/directors"><button type="submit" className='update d-update' onClick={this.onUpdateApiRequest}>Done</button></Link>
                    </UpdateDialogBox>} />
                    <Route path="/directors/add" component={() => <AddDialog url = {this.props.match.path}>
                        <legend className="add-title"><b>New Director details</b></legend>
                        <div className="add-form" >
                            <label>Name</label>
                            <input type="text" className="d-input" name="name" onChange={this.newInput} value={this.state.newRecord.name} placeholder="Enter Name..." />
                        </div>
                        <Link to="/directors">
                            <button type="submit" className="update d-add-btn" onClick={this.addReq}>Submit</button>
                        </Link>
                    </AddDialog>} />
                </Switch>
            </div>
        )
    }
}

export default DirectorsHome
