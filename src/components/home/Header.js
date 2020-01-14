import React from 'react';
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header id = 'page-header'>
            <Link to = "/"><h2>Movies & Directors</h2></Link>
            <Link to = "/movies"><h3>Movies</h3></Link>
            <Link to = "/directors"><h3>Directors</h3></Link>
        </header>
    )
}

export default Header
