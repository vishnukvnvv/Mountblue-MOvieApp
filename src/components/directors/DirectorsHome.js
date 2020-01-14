import React, { Component } from 'react'
import DirectorContainer from './DirectorContainer';
import UpdateDialogBox from '../home/UpdateDialogBox';

class DirectorsHome extends Component {

    componentDidMount() {
        fetch("http://localhost:8082/api/directors").then(result => result.json()).then(directorsData => {
            this.props.setData(directorsData);
        });
    }

    openDirector = (event) => {
        console.log('open Directors')
    }

    addReq = async () => {
        console.log('add director triggered');
        await fetch("http://localhost:8082/api/directors", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "vishnu" }),
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
        })
        await this.componentDidMount();
    }

    getSingleDirector = async (id) => await fetch(`http://localhost:8082/api/directors/${id}`).then(res => res.json()).then(result => result).catch(error => {
        console.log(error);
    })


    onUpdate = async (event) => {
        const id = event.target.parentElement.parentElement.getAttribute('id');
        const singleData = await this.getSingleDirector(id).then(res => res);
        this.props.openUpdateDialog();
        this.props.setSingleRecord(singleData);
    }

    onUpdateApiRequest = async () => {
        await this.props.updateSubmited();
        const newObj = this.props.singleRecord;
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
        this.props.openUpdateDialog();
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
        this.props.setDialogInputValue(event.target.value);
    }

    render() {
        return (
            <div className='container'>
                <button className='add' onClick={this.addReq}>Add Director</button>
                <DirectorContainer data={this.props.data} onUpdate={this.onUpdate} onDelete={this.onDelete} openContent={this.openDirector} />
                <UpdateDialogBox isOpen={this.props.updateDialog} openUpdateDialog={this.props.openUpdateDialog}>
                    <select className='selection' required onChange={this.selectChange}>
                        <option value="0" selected disabled>select</option>
                        <option value="name">Name</option>
                    </select>
                    <input type="text" className='d-input' onChange={this.props.changeDialogInputValue} value={this.props.dialogInputValue} />
                    <button type="submit" className='update d-update' onClick={this.onUpdateApiRequest}>Done</button>
                </UpdateDialogBox>
            </div>
        )
    }
}

export default DirectorsHome
