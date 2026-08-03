import { Row, Col, Card, CardImg, Button, Container } from 'react-bootstrap';
import './MerchList.css';
import Jacket from '../../../assets/robert-richman-vcTKFYNZop4-unsplash (1).jpg';
import Hat from '../../../assets/istockphoto-2249125500-1024x1024.jpg';

const merchItems = [
    { name: 'Storm Jacket', price: '$59', image: Jacket, tag: 'New' },
    { name: 'Cyclone Cap', price: '$24', image: Hat, tag: 'Best Seller' },
    { name: 'Elite Hoodie', price: '$69', image: Jacket, tag: 'Limited' },
    { name: 'Signature Beanie', price: '$19', image: Hat, tag: 'Hot' },
    { name: 'Nova Tee', price: '$29', image: Jacket, tag: 'Fresh' },
    { name: 'Shadow Mug', price: '$16', image: Hat, tag: 'Popular' },
    { name: 'Racer Gloves', price: '$34', image: Jacket, tag: 'Limited' },
    { name: 'Pixel Backpack', price: '$49', image: Hat, tag: 'Trending' }
];

function MerchList() {
    return (
        <Card id="cardRow" className="rounded-5 flex-column merch-shell">
            <Row>
                <h1 id="GameTitle">Merch Store</h1>
            </Row>

            <Row id='merchList' className="g-3 merch-grid"  >
                {merchItems.map((item) => (
                    <Col key={item.name} xs={12} sm={6} lg={3} className="d-flex">
                        <Card className="h-100 Card merch-card">
                            <div className="merch-badge">{item.tag}</div>
                            <CardImg variant="top" src={item.image} className="merch-image" />
                            <Card.Body className="merch-body">
                                <h5 className="merch-name">{item.name}</h5>
                                <p className="merch-price">{item.price}</p>
                                <Button className="merch-button">Buy Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Card >
    );
}

export default MerchList;
