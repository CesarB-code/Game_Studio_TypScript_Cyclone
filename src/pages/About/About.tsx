import { Row, Col } from 'react-bootstrap';
import BottomWebLinks from '/Users/cesarbarrera/Documents/GitHub/Game_Studio_TypScript_Cyclone/src/pages/webPage_Components/BottomWebLinks/BottonWebLinks.tsx';
import BoilerPlate from '/Users/cesarbarrera/Documents/GitHub/Game_Studio_TypScript_Cyclone/src/pages/webPage_Components/NavBar/NavBar.tsx';
import './About.css';

function About() {
    return (
        <Row className='about-page'>
            <Row className='about-nav-row'>
                <BoilerPlate />
            </Row>

            <Row style={{ marginTop: '60px' }}><h1 id="AboutTitle" style={{
                height: '100%',
                color: 'white',
                paddingTop: '20px',
                textAlign: 'center',
                fontSize: '52px',
                marginLeft: '0px',
                padding: '0px',
                margin: '0px',
                textShadow: '2px 2px 4px black',
            }} >About</h1></Row>

            <Row className='about-content-row justify-content-center'>
                <Row className='about-grid'>
                    <Col xs={12} md={6} className='about-card'>
                        <h3>About the Company</h3>
                        <p id='text'>Cyclone is a forward-thinking game development studio dedicated to creating immersive gaming experiences that push the boundaries of creativity and innovation. With a passionate team of developers, artists, and designers, we craft games that engage players across multiple genres and platforms. Our commitment to excellence has made us a leader in the indie gaming community.</p>
                    </Col>
                    <Col xs={12} md={6} className='about-card'>
                        <h3>Company Name</h3>
                        <p id='text'>Cyclone Game Studio</p>
                    </Col>
                </Row>
                <Row className='about-grid'>
                    <Col xs={12} md={6} className='about-card'>
                        <h3>Company History</h3>
                        <p id='text'>Founded in 2020, Cyclone Game Studio emerged from a group of passionate game enthusiasts who shared a vision of creating unforgettable gaming adventures. Over the years, we've developed award-winning titles that have captivated players worldwide. Our journey has been marked by continuous innovation, player engagement, and a commitment to pushing creative boundaries in game design and storytelling.</p>
                    </Col>
                    <Col xs={12} md={6} className='about-card'>
                        <h3>Company Values</h3>
                        <p id='text'>Innovation, integrity, and community are at the heart of everything we do. We believe in creating games that matter, fostering a collaborative work environment, and maintaining transparency with our players. We value creativity, embrace diverse perspectives, and prioritize player satisfaction and feedback in all our endeavors.</p>
                    </Col>
                </Row>
                <Row className='about-grid'>
                    <Col xs={12} md={6} className='about-card'>
                        <h3>Company Description</h3>
                        <p id='text'>Cyclone Game Studio specializes in developing story-driven action and adventure games with cutting-edge graphics and innovative gameplay mechanics. From fantasy epics to sci-fi adventures, our diverse portfolio demonstrates our versatility and commitment to creating rich, immersive worlds. We combine advanced AI technology with compelling narratives to deliver experiences that resonate with players of all ages.</p>
                    </Col>
                    <Col xs={12} md={6} className='about-card'>
                        <h3>Company Mission</h3>
                        <p id='text'>Our mission is to create memorable gaming experiences that inspire, entertain, and challenge players worldwide. We strive to build a welcoming community where gamers can connect, compete, and collaborate. Through innovation and dedication, we aim to be recognized as a studio that consistently delivers quality games and exceptional player experiences.</p>
                    </Col>
                </Row>
            </Row>

            <Row className='about-footer-row'>
                <BottomWebLinks />
            </Row>
        </Row>
    );
}

export default About;