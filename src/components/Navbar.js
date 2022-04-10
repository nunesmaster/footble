import React from "react"
import {Navbar, Container} from "react-bootstrap"

export default function Main(){

    return (

        <Navbar bg="light" expand="lg">
            <Container className="test">
                <Navbar.Brand href="#home">How to play</Navbar.Brand>
                <Navbar.Brand href="#home">Stats</Navbar.Brand>
                
            </Container>
        </Navbar>
    )
}