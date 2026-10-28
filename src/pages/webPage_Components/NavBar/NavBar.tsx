import {
    Row, Col,

    Nav,
    Navbar,

    NavDropdown,
Offcanvas,
    NavbarBrand,
    NavbarOffcanvas
} from 'react-bootstrap';
import { useState } from "react";
import { BsFan } from "react-icons/bs";
import './NavBar.css'
function BoilerPlate({ fixed = true }: { fixed?: boolean }) {
    const [isDropped, setIsDropped] = useState(false);
    return (


<Navbar id='custom-navbar' expand="lg" className="bg-grey " fixed={fixed ? 'top' : undefined} data-bs-theme="dark" style={{ padding: '0px', margin: 0 }} >

            <Navbar.Brand href="/home" className="webHeader" style={{ fontFamily: 'fantasy' }}  >
                <Row >
                    
                    <Col style={{ marginLeft: "20px", marginTop:"3px" }} >
                        <BsFan />

                    </Col>
                    <Col style={{ margin: "0px", paddingLeft: "20px" }} >
                        Cyclone<sup style={{ fontSize: 15 }}>TM</sup>

                    </Col>
                </Row>

            </Navbar.Brand>


            <div className="ms-auto d-flex align-items-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
            <NavbarOffcanvas id="basic-navbar-nav">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cyclone</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ backgroundColor: '#343a40', color: 'white' }}>
                    <Nav className="justify-content-end pe-3">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/store">Store</Nav.Link>
                        <Nav.Link href="/events">Events</Nav.Link>
                        <NavDropdown
                            title="Company"
                            id="nav-dropdown"
                            show={isDropped}
                            onMouseEnter={() => setIsDropped(true)}
                            onMouseLeave={() => setIsDropped(false)}
                        >
                            <NavDropdown.Item href="/about">About</NavDropdown.Item>
                            <NavDropdown.Item href="/teamMembers">Team Members</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Offcanvas.Body>
            </NavbarOffcanvas>








        </Navbar >





        


    );
}
export default BoilerPlate; 