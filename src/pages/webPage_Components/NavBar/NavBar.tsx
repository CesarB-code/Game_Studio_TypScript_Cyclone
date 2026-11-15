import {
    Row, Col,Card,

    Nav,
    Navbar,

    NavDropdown,
Offcanvas,
    NavbarBrand,
    NavbarOffcanvas
} from 'react-bootstrap';
import { useState } from "react";
import { BsFan } from "react-icons/bs";
import offcanvasGif from '../../../assets/2026-11-04.gif';
import offcanvasHeaderImage from '../../../assets/komiko-33883728.png';
import './NavBar.css'
function BoilerPlate({ fixed = true }: { fixed?: boolean }) {
    const [isDropped, setIsDropped] = useState(false);
    return (


<Navbar id='custom-navbar' expand="xl" className="bg-grey " fixed={fixed ? 'top' : undefined} data-bs-theme="dark" style={{ padding: '0px', margin: 0 }} >

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
                <Offcanvas.Header
                    closeButton
                    closeVariant="white"
                    style={{
                        minHeight: '100px',
                        backgroundImage: `url("${offcanvasHeaderImage}")`,
                        backgroundPosition: 'center 65%',
                        backgroundSize: 'cover',
                    }}
                >
                    <Offcanvas.Title style={{ color: 'white', textShadow: '2px 2px 4px black' }}>
                        Cyclone
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="ps-0" style={{ backgroundColor: '#343a40', color: 'white' }}>
                    <Nav className="flex-column align-items-start gap-2" style={{ width: '100%' }}>
                        <Nav.Link href="/home" className="ps-2">Home</Nav.Link>
                        <Nav.Link href="/profile" className="ps-2">Profile</Nav.Link>
                        <Nav.Link href="/store" className="ps-2">Store</Nav.Link>
                        <Nav.Link href="/events" className="ps-2">Events</Nav.Link>
                        <NavDropdown
                            title="Company"
                            id="nav-dropdown"
                            className="ps-2"
                            align="end"
                            show={isDropped}
                            onMouseEnter={() => setIsDropped(true)}
                            onMouseLeave={() => setIsDropped(false)}
                        >
                            <NavDropdown.Item href="/about" className="ps-2">About</NavDropdown.Item>
                            <NavDropdown.Item href="/teamMembers" className="ps-2">Team Members</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Card className="mx-2 mt-3 overflow-hidden">
                        <Card.Img
            src={offcanvasGif}
            alt="Cyclone artwork"
                            className="img-fluid"
                            style={{ width: '100%', maxHeight: '240px', objectFit: 'cover', objectPosition: 'center' }}
                        />
                    </Card>
                </Offcanvas.Body>
                
            </NavbarOffcanvas>








        </Navbar >





        


    );
}
export default BoilerPlate; 