import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom'
import AddDirector from './AddDirector';
import UpdateDirector from './UpdateDirector';
import DeleteDirector from './DeleteDirector';
import SingleDirector from './SingleDirector';

class DirectorsHome extends Component {

    state = {
        id: 0,
        data: [],
        singleRecord: '',
        dialogInputValue: '',
        newRecord: '',
    }

    componentDidMount() {
        fetch("http://localhost:8082/api/directors").then(result => result.json()).then(directorsData => {
            this.setState({
                data: directorsData,
            })
        });
    }

    addNewRecord = async (data) => {
        await fetch("http://localhost:8082/api/directors", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
        this.setState({
            newRecord: '',
        })
        this.componentDidMount();
    }

    onUpdate = async (event) => {
        const id = event.target.parentElement.parentElement.parentElement.getAttribute('position');
        await fetch(`http://localhost:8082/api/directors/${id}`).then(res => res.json()).then(data => {
            this.setState({
                singleRecord: data[0],
            });
        })
    }

    onUpdateApi = async (data) => {
        await fetch(`http://localhost:8082/api/directors/${data.id}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
        this.setState({
            dialogInputValue: '',
        })
        this.componentDidMount();
    }

    deleteReq = async (event) => {
        const id = event.target.parentElement.parentElement.parentElement.getAttribute('position');
        this.setState({
            id: id,
        })
    }

    deleteApiReq = async () => {
        await fetch(`http://localhost:8082/api/directors/${this.state.id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
        this.componentDidMount();
    }

    render() {
        return (
            <div className='container'>
                <Link to="/directors/add">
                    <button className='add' >Add Director</button>
                </Link>
                {this.state.data.map((element, index) => <div className="lists" position={element.id} key={index}>
                    <div>
                        <Link to={`/directors/${element.id}`}>
                            <h1 className="single-record" >{element.name}</h1>
                        </Link>
                        <p><b>Id</b>: {element.id}</p>
                        <p><b>Name</b>: {element.name}</p>
                    </div>
                    <div className="buttons">
                        <Link to={`/directors/${element.id}/update`}>
                            <button className="update" onClick={this.onUpdate}>Update</button>
                        </Link>
                        <Link to={`/directors/${element.id}/delete`}>
                            <button className="update delete" onClick={this.deleteReq}>Delete</button>
                        </Link>
                    </div>
                </div>
                )}
                <Switch>
                    <Route path="/directors/:id" component={SingleDirector}/>}/>} />
                    <Route path="/directors/add" component={() => <AddDirector addNewRecord={this.addNewRecord} />} />
                    <Route path="/directors/:id/update" component={() => <UpdateDirector record={this.state.singleRecord} onUpdateApi={this.onUpdateApi} />} />
                    <Route path="/directors/:id/delete" component={() => <DeleteDirector deleteApiReq={this.deleteApiReq} />} />
                </Switch>
            </div>
        )
    }
}

export default DirectorsHome
