import React, { Component } from 'react'
import Item from '../home/Item'

export class MovieContainer extends Component {

    render() {
        return (this.props.data.map((element, index) => <Item name={element.Title} id={element.id} key={index} onUpdate = {this.props.onUpdate} onDelete = {this.props.onDelete} url = {this.props.url}>
            <div className = 'movies'>
                <p><b>Id</b>:{element.id}</p>
                <p><b>Title</b>: {element.Title}</p>
                <p className = "desc"><b>Description</b>: {element.Description}</p>
                <p><b>Runtime</b>: {element.Runtime}</p>
                <p><b>Genre</b>: {element.Genre}</p>
                <p><b>Rating</b>: {element.Rating}</p>
                <p><b>Metascore</b>: {element.Metascore}</p>
                <p><b>Votes</b>: {element.Votes}</p>
                <p><b>Gross Earning In Millions</b>: {element.Gross_Earning_in_Mil}</p>
                <p><b>DirectorId</b>: {element.DirectorId}</p>
                <p><b>Actor</b>: {element.Actor}</p>
                <p><b>Year</b>: {element.Year}</p>
            </div>
        </Item>)
        )
    }
}

export default MovieContainer
