import {
    Row, Col, Button,
    CardImgOverlay, CardBody, CardText, CardImg, Card, CardTitle, ButtonGroup,

    Container
} from 'react-bootstrap';
import { useRef, useState } from 'react';
import Celestial from '../../../assets/boris-misevic-vQfUboV8Pmk-unsplash.jpg';
import Blades from '../../../assets/khanh-nguyen-5X1rpvoQT5A-unsplash.jpg';
import Tokyo from '../../../assets/le-anh-Bh-qSsMmTbY-unsplash.jpg';
import Kingdom from '../../../assets/le-anh-N9apPcgfj1Q-unsplash.jpg';
import Requiem from '../../../assets/le-anh-wHbRlKKq0Xk-unsplash.jpg'
import Back from '../../../assets/images.png';
import { RiArrowGoBackLine } from "react-icons/ri";
import './EventCards.css';

const EventCard = ({ image, title, description, isScrolling, onScroll }) => (
    <Col xs={6} md={4} className='d-flex'>
        <Container style={{ paddingTop: '50px', height: '80%' }}>
            <Card id="Card" className={`d-flex flex-column Card`}>
                <CardImg className={`card-img`} src={image} />
                <CardTitle id="CardTitle" className={`card-Title`}>{title}</CardTitle>
                <CardBody id="CardBody" className={`d-flex flex-column`}>
                    <CardText
                        id="CardText"
                        className={`card-text ${isScrolling ? "scrolling" : ""}`}
                        onScroll={onScroll}
                    >
                        {description}
                    </CardText>
                </CardBody>
                <ButtonGroup id="CardButton" size="sm">
                    <Button className='mt-auto'>Sign Up</Button>
                    <Button className='mt-auto'>Directions</Button>
                </ButtonGroup>
            </Card>
        </Container>
    </Col>
);

function EventCards() {
    const timeoutRef = useRef(null);
    const [isScrollingStates, setIsScrollingStates] = useState([false, false, false, false, false]);

    const cardsData = [
        {
            image: Celestial,
            title: "Video Game Tour",
            description: "Embark on an exclusive guided tour through iconic video game studios and development facilities. Explore concept art galleries, play unreleased demos, and meet legendary game designers. Discover the creative process behind your favorite games and learn about next-generation technologies shaping the industry. An unforgettable experience for every gaming enthusiast."
        },
        {
            image: Blades,
            title: "Anime Art",
            description: "Immerse yourself in stunning displays of hand-drawn and digital anime artwork from legendary studios. View rare animation cels, original character designs, and exclusive behind-the-scenes illustrations. Attend workshops with professional animators and artists. Browse a curated collection of anime merchandise and limited-edition art prints from your favorite series."
        },
        {
            image: Tokyo,
            title: "Cosplay Meetup",
            description: "Connect with fellow cosplayers at our casual meetup event. Share tips on costume construction, photography techniques, and character portrayal. Make friends, exchange contact information, and plan group photo shoots. Enjoy food trucks, vendor booths, and networking opportunities with the vibrant cosplay community."
        },
        {
            image: Requiem,
            title: "Meet the Streamers",
            description: "Get up close and personal with your favorite content creators and streamers at an intimate meet-and-greet event. Watch live gaming sessions, enjoy Q&A panels, and get autographs from your gaming heroes. Participate in exclusive tournaments, win signed merchandise, and network with other fans and aspiring streamers."
        },
        {
            image: Kingdom,
            title: "Cosplay Contest",
            description: "Showcase your best cosplay costume and compete against talented cosplayers from around the world. Compete in multiple categories including craftsmanship, accuracy, and performance. Win incredible prizes, sponsorships, and recognition from industry judges. Feature your winning costume on our website and in promotional materials."
        }
    ];

    const handleScroll = (index) => {
        const newStates = [...isScrollingStates];
        newStates[index] = true;
        setIsScrollingStates(newStates);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const resetStates = [...isScrollingStates];
            resetStates[index] = false;
            setIsScrollingStates(resetStates);
        }, 200);
    };



    return (
        <Card id="cardRow" className="rounded-5 flex-column">
            <Row className="flex-nowrap" id="gameList">
                {cardsData.map((card, index) => (
                    <EventCard
                        key={index}
                        image={card.image}
                        title={card.title}
                        description={card.description}
                        isScrolling={isScrollingStates[index]}
                        onScroll={() => handleScroll(index)}
                    />
                ))}
            </Row>
        </Card>
    );
}
export default EventCards;