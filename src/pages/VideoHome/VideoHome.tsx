
import 'bootstrap/dist/css/bootstrap.min.css';
import GameList from '../webPage_Components/GameList/GameList';
import { useRef, useState } from 'react';
import * as Interaction from '../../DrawingFunctions/InteractionMethods';
import BoilerPlate from '../webPage_Components/NavBar/NavBar';
import {
  Row, Col,

  Container
} from 'react-bootstrap';
import './VideoHome.css';
import AISoftware from '../webPage_Components/AISoftware/AiSoftware';
import UnityDemo from '../webPage_Components/UnityDemo/UnityDemo';
import overlayImage from '../../assets/takashi-miyazaki-64ajtpEzlYc-unsplash.jpg';

function VideoHome() {
  const canvasRef1 = useRef(null);
  const [unityInstance1, setUnityInstance1] = useState(null);

  let element = useRef(null);
  let rowElement = useRef(null);

  let element2 = useRef(null);
  let rowElement2 = useRef(null);

  function addMargin(row: any, ele: any) {
    let currentMargin = parseFloat(getComputedStyle(ele.current).marginRight);
    let currentWidth = parseFloat(getComputedStyle(ele.current).width);

    const rowWidth = parseFloat(getComputedStyle(row.current).width);
    const middleOfRow = rowWidth / 2;
    const remainderRow = middleOfRow - currentMargin - currentWidth

    ele.current.style.marginRight = currentMargin + remainderRow >= 0 ? `${currentMargin + remainderRow + 100}px` : '20px';
  };
  window.addEventListener('load', () => addMargin(rowElement, element));
  window.addEventListener('resize', () => addMargin(rowElement, element));
  window.addEventListener('load', () => addMargin(rowElement2, element2));
  window.addEventListener('resize', () => addMargin(rowElement2, element2));

  Interaction.SetState();

  // Call the draw function to render the canvas
  return (


    <Container fluid style={{ overflowX: 'hidden', overflowY: 'scroll', backgroundImage: `url(${overlayImage})` }} >
      <BoilerPlate />
      <Row style={{ marginTop: '60px' }}><h1 id="NewsTitle" className="video-home-title">Cyclone</h1></Row>

      <Row className='video-Row align-items-center justify-content-center' style={{ backgroundColor: 'transparent', marginBottom: '40px' }}>
        <Col className='col-10'>
          <div style={{ color: 'white', textAlign: 'center', padding: '30px' }}>
            <h2 style={{ fontFamily: 'fantasy', fontSize: '32px', marginBottom: '20px', textShadow: '2px 2px 4px black' }}>Welcome to Cyclone Game Studio</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '15px', textShadow: '2px 2px 4px black' }}>
              Cyclone Game Studio is a pioneering force in game development, founded in 2020 with a mission to revolutionize interactive entertainment. We blend cutting-edge technology with creative storytelling to deliver immersive gaming experiences that captivate and inspire players worldwide.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.6', textShadow: '2px 2px 4px black' }}>
              Our commitment to innovation, integrity, and community drives everything we do. From adaptive AI systems that learn your playstyle to stunning real-time 3D graphics powered by Unity, we showcase the pinnacle of modern game development. Explore our featured games, experience our technology in action, and discover why Cyclone is shaping the future of gaming.
            </p>
          </div>
        </Col>
      </Row>

      <Row className='video-Row align-items-center justify-content-center' style={{ backgroundColor: 'transparent' }}>

        <Col>

          <Row className="align-items-center justify-content-center">
            <Row style={{ margin: '0px', padding: '0px' }} >

              <Row className="justify-content-start" ref={rowElement}>
                <Col ref={element} className='col-4 '  >
                  <AISoftware />
                </Col>
                <Col className='col-4 d-flex d'>
                  <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
                    <h3 style={{ fontFamily: 'fantasy', fontSize: '28px', textShadow: '2px 2px 4px black' }}>Advanced AI Technology</h3>
                    <p style={{ textShadow: '2px 2px 4px black' }}>Explore our cutting-edge artificial intelligence systems that power adaptive gameplay. Our AI learns from your playstyle, creates unique challenges, and delivers personalized gaming experiences that keep every session fresh and engaging.</p>
                  </div>
                </Col>
              </Row>
              <Row ref={rowElement2} >
                <Col ref={element2} className='col-4 d-flex align-items-center'>
                  <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
                    <h3 style={{ fontFamily: 'fantasy', fontSize: '28px', textShadow: '2px 2px 4px black' }}>Interactive Unity Demo</h3>
                    <p style={{ textShadow: '2px 2px 4px black' }}>Experience our real-time 3D game engine capabilities. Interact with fully rendered scenes, dynamic lighting, and immersive graphics powered by Unity. This demo showcases the technical prowess behind Cyclone's latest gaming experiences.</p>
                  </div>
                </Col>
                <Col md={4} className="d-flex ">
                  <UnityDemo useRef={canvasRef1} useState={{ unityInstance: unityInstance1, unityInstance1, setUnityInstance1 }} />
                </Col>
              </Row>

            </Row>




          </Row>
        </Col>








      </Row >

      <Row className='video-Row align-items-center justify-content-center' style={{ backgroundColor: 'transparent', marginBottom: '30px', marginTop: '40px' }}>
        <Col className='col-10'>
          <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
            <h2 style={{ fontFamily: 'fantasy', fontSize: '28px', marginBottom: '15px', textShadow: '2px 2px 4px black' }}>Explore Our Games</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', textShadow: '2px 2px 4px black' }}>
              Discover our latest titles and experience the future of gaming. Each game in our collection features unique gameplay mechanics, stunning visuals, and our signature adaptive AI system that learns from your playstyle. Browse our full game list below to find your next favorite game.
            </p>
          </div>
        </Col>
      </Row>

      <Row style={{ height: '450px', width: '100vw', backgroundColor: 'transparent' }}>
        <GameList button1="Play Demo" button2="Go To Store " />

      </Row>





    </Container >



  )
}


export default VideoHome;