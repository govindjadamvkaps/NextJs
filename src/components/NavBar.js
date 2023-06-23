import React from 'react'
import { Button, Form, FormControl, Nav, NavLink, Navbar } from 'react-bootstrap'

import Link from 'next/link'
const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                            <Link className="nav-link" href="/about">About</Link>
                            <Link className="nav-link" href="/signup">Sign Up</Link>
                            <Link className="nav-link" href="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
