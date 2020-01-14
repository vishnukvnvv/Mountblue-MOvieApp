import React, { Component } from 'react';
import Item from '../home/Item.js'

export class DirectorContainer extends Component {
    render() {
        return (this.props.data.map((element,index) => <Item name = {element.name} id = {element.id} key = {index} onUpdate = {this.props.onUpdate} onDelete = {this.props.onDelete} openContent = {this.props.openContent}>
               <p><b>ID</b>: {element.id}</p>
               <p><b>Name</b>: {element.name}</p>
            </Item>
        )
        );
    }
}

export default DirectorContainer
