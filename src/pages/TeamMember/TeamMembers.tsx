import {
    Row, Col,
    Card, CardImg,
    Container,

    CardBody
} from 'react-bootstrap';
import BoilderPlate from '../webPage_Components/NavBar/NavBar';
import './TeamMembers.css'
import AnimeLatina from '../../assets/KomikoAI.png'
import latina from '../../assets/photo-1524502397800-2eeaad7c3fe5.avif'
import AnimeEuroFemale from "../../assets/KomikoAI (2).png";
import euroFemale from "../../assets/meritt-thomas-aoQ4DYZLE_E-unsplash.jpg";
import euroMale from "../../assets/christian-buehner-DItYlc26zVI-unsplash.jpg"
import AnimeEuroMale from "../../assets/KomikoAI (6).png"
import ArabMale from "../../assets/irene-strong-v2aKnjMbP_k-unsplash.jpg";
import AnimeArabMale from "../../assets/KomikoAI (3).png";
function TeamMembers() {
    return (
        <Container fluid className="team-members-page">
            <Row>
                <BoilderPlate />
            </Row>
            <Row>
                <h1 className="team-members-title">Team Memebers</h1>
            </Row>

            <Row>
                <Row>
                    <h1 id="teamMemberRow">CEO</h1>

                    <Col>
                        <Card id='Card'>
                            <CardImg id='animeProfile' src={AnimeLatina} ></CardImg>
                        </Card>
                    </Col>
                    <Col>
                        <Card id='Card' >
                            <CardImg id='animeProfile' src={latina} ></CardImg>

                        </Card>
                    </Col>
                </Row>
            </Row>
            <Row>
                <Card >
                    <CardBody id="TeamMemberDescription">
                        As the founder and CEO of Cyclone Game Studio, she has led the company from a small indie team to a recognized name in the gaming industry. With a background in both business strategy and interactive media, she drives the vision and direction of every project. Her passion for inclusive storytelling and cutting-edge gameplay has shaped Cyclone's identity and culture. She believes in building games that leave a lasting impact on every player.
                    </CardBody>
                </Card>
            </Row>

            <Row><h1 id="teamMemberRow">Marketing Lead</h1></Row>
            <Row >

                <Col>

                    <Card id='Card'>
                        <CardImg id='animeProfile' src={AnimeEuroFemale} ></CardImg>
                    </Card>
                </Col>
                <Col>
                    <Card id='Card' >
                        <CardImg id='animeProfile' src={euroFemale} ></CardImg>

                    </Card>
                </Col>

            </Row>
            <Row>
                <Card >
                    <CardBody id="TeamMemberDescription">
                        Our Marketing Lead brings five years of experience in digital branding and community engagement within the gaming space. She specializes in crafting compelling campaigns that connect players to the worlds Cyclone builds. From social media strategy to convention appearances, she ensures that every release generates excitement and buzz. Her creative campaigns for our event series have grown Cyclone's community by thousands of loyal fans.
                    </CardBody>
                </Card>
            </Row>
            <Row><h1 id="teamMemberRow"> Lead Game Designer</h1></Row>
            <Row >

                <Col>
                    <Card id='Card'>
                        <CardImg id='animeProfile' src={AnimeEuroMale} ></CardImg>
                    </Card>
                </Col>
                <Col>
                    <Card id='Card' >
                        <CardImg id='animeProfile' src={euroMale} ></CardImg>

                    </Card>
                </Col>

            </Row>
            <Row>
                <Card >
                    <CardBody id="TeamMemberDescription">
                        As Lead Game Designer at Cyclone, he is the creative architect behind the mechanics and worlds that define our titles. With a deep love for narrative-driven gameplay, he blends complex systems with intuitive player experiences. He pioneered the adaptive AI system used across Cyclone's game lineup, ensuring each playthrough feels fresh and unique. His design philosophy centers on player agency, replayability, and emotional storytelling.
                    </CardBody>
                </Card>
            </Row>
            <Row><h1 id="teamMemberRow"> Frontend Lead Developer</h1></Row>

            <Row >

                <Col>
                    <Card id='Card'>
                        <CardImg id='animeProfile' src={AnimeArabMale} ></CardImg>
                    </Card>
                </Col>
                <Col>
                    <Card id='Card' >
                        <CardImg id='animeProfile' src={ArabMale} ></CardImg>

                    </Card>
                </Col>

            </Row>
            <Row>
                <Card >
                    <CardBody id="TeamMemberDescription">
                        Our Frontend Lead Developer is responsible for bringing Cyclone's visual designs to life in the browser and across all platforms. With expertise in React, WebGL, and Unity web integrations, he ensures smooth and responsive experiences for every user. He architected the interactive UI systems powering this website and the in-browser game demos. His attention to performance, accessibility, and clean code keeps Cyclone's digital presence polished and fast.
                    </CardBody>
                </Card>
            </Row>

        </Container >
    );
}
export default TeamMembers;