import {
    Row, Col,

    Nav,
    Navbar,

    NavDropdown,

    NavbarBrand
} from 'react-bootstrap';
import { useState } from "react";
import { BsFan } from "react-icons/bs";
import '/src/pages/webPage_Components/NavBar/NavBar.css'
function BoilerPlate() {
    const [isDropped, setIsDropped] = useState(false);
    return (


        <Navbar id='custom-navbar' expand="md" className="bg-grey w-100" fixed="top" data-bs-theme="dark" style={{ padding: '0px', margin: 0 }} >

            <Navbar.Brand href="/home" className="webHeader" style={{ fontFamily: 'fantasy' }}  >
                <Row >
                    <Col style={{ margin: "0px", paddingLeft: "20px" }} >
                        Cyclone<sup style={{ fontSize: 15 }}>TM</sup>

                    </Col>
                    <Col style={{ margin: "0px", padding: "0px" }} >
                        <BsFan />

                    </Col>
                </Row>

            </Navbar.Brand>


            <div className="ms-auto d-flex align-items-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
            <NavbarBrand id="label"></NavbarBrand>
            <Navbar.Collapse className="justify-content-end" style={{ paddingLeft: '10px', marginRight: '65px' }}>
                <Nav className=" my-2 ms-lg-auto  "  >
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/store">Store</Nav.Link>
                    <Nav.Link href="/events">Events</Nav.Link>


                    <NavDropdown className="custom-dropdown" title="Company" id="nav-dropdown" show={isDropped} onMouseEnter={() => setIsDropped(true)} onMouseLeave={() => setIsDropped(false)} >

                        <NavDropdown.Item href="/about">About</NavDropdown.Item>
                        <NavDropdown.Item href="/teamMembers">
                            Team Members
                        </NavDropdown.Item>


                    </NavDropdown>

                </Nav>
            </Navbar.Collapse>









        </Navbar >






    );
}
export default BoilerPlate; 