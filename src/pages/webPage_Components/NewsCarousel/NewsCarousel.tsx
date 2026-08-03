import {
    Row, Col, Card,
    Carousel,
    CarouselItem,
    CarouselCaption,

} from 'react-bootstrap';
import MyImage from '../../../assets/nooooodles-1337-3OdajQGd9sk-unsplash.jpg'
import MyImage2 from '../../../assets/tim-mossholder-tq8Cuap8_wY-unsplash (1).jpg'
import MyImage3 from '../../../assets/hongwei-fan-xUDobyOVM7Q-unsplash.jpg'

import './NewsCarousel.css';
function NewsCarousel() {
    return (<Card id='cardRow' className=" mainElement  ">

        <Carousel interval={1000} className="carousel" >
            <CarouselItem>
                <img
                    className="w-100  carousel-img"
                    src={MyImage}
                    alt="First slide"

                />
                <CarouselCaption style={{ textAlign: 'center', top: 50, display: 'inline-block', width: '50%', maxHeight: '200px', overflow: 'hidden' }}>
                    <h2 className='title' style={{ fontSize: 50, margin: '0 0 10px 0', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}><b>Drop in and sneak your way to victorys</b></h2>
                    <p className='body' style={{ right: 100, width: '100%', margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>Join in on the new game Silent Soldier where you can croos game with your friends</p>

                </CarouselCaption>
            </CarouselItem>

            <CarouselItem>
                <img
                    className=" w-100 carousel-img"
                    src={MyImage2}
                    alt="Second slide"
                />
                <CarouselCaption style={{ textAlign: 'center', bottom: 20, display: 'inline-block', width: '50%', maxHeight: '200px', overflow: 'hidden' }}>
                    <h3 className='title' style={{ fontSize: '300%', margin: '0 0 10px 0', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}><b>The Newest Anime Game  </b></h3>
                    <p className='body' style={{ margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>With our new Ai we can make the power of anime come alive</p>
                </CarouselCaption>
            </CarouselItem>

            <CarouselItem>
                <img
                    className=" w-100 carousel-img"
                    src={MyImage3}
                    alt="Third slide"

                />
                <CarouselCaption style={{ textAlign: 'center', top: 50, display: 'inline-block', width: '50%', maxHeight: '200px', overflow: 'hidden' }}>
                    <h3 className='title' style={{ fontSize: '300%', margin: '0 0 10px 0', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}><b> Apply now and see what is in store for you </b></h3>
                    <p className="body" style={{ margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>Want to join the cylcone and help create amazing games</p>
                </CarouselCaption>
            </CarouselItem>
        </Carousel>

    </Card>
    );
}
export default NewsCarousel;