import { Row, Col, Container } from 'react-bootstrap';
import { GoPencil } from 'react-icons/go';
import BoilerPlate from '../webPage_Components/NavBar/NavBar';
import ProfileImage from '../../assets/istockphoto-828763406-1024x1024.jpg';
import './Profile.css';

function Profile() {
    const accountDetails = [
        { label: 'Username', value: 'Fenrir' },
        { label: 'Full Name', value: 'John Doe' },
        { label: 'Account Type', value: 'Premium Member' },
        { label: 'Joined', value: 'March 2024' }
    ];

    const contactDetails = [
        { label: 'Email', value: 'john.doe@example.com' },
        { label: 'Billing Address', value: '777 Luca Street' },
        { label: 'Shipping Address', value: '777 Luca Street' },
        { label: 'Payment Method', value: 'Credit Card' }
    ];

    return (
        <Container className="Profile-container" fluid>
            <BoilerPlate />

            <Row style={{ marginTop: '60px' }}><h1 id="ProfileTitle" style={{
                height: '100%',
                color: 'white',
                paddingTop: '20px',
                textAlign: 'center',
                fontSize: '52px',
                marginLeft: '0px',
                padding: '0px',
                margin: '0px',
                textShadow: '2px 2px 4px black',
            }} >Profile</h1></Row>

            <Row className="justify-content-center profile-shell">
                <Col xs={12} lg={10}>
                    <div className="profile-card">
                        <Row className="align-items-center gy-4">
                            <Col xs={12} md={4} className="text-center">
                                <img src={ProfileImage} alt="Profile" className="ProfileImg" />
                                <div className="profile-badge">Member since 2024</div>
                            </Col>

                            <Col xs={12} md={8}>
                                <div className="profile-intro">
                                    <h2 className="profile-name">Fenrir</h2>
                                    <p className="profile-subtitle"> Premium Member</p>
                                    <p className="profile-bio">
                                        Keep your profile information current so your account stays polished and easy to recognize across the website.
                                    </p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="profile-grid g-4">
                            <Col xs={12} lg={6}>
                                <div className="profile-panel">
                                    <h3 className="profile-panel-title">Account Details</h3>
                                    {accountDetails.map((item) => (
                                        <div className="profile-row" key={item.label}>
                                            <div className="profile-row-content">
                                                <span className="profile-row-label">{item.label}</span>
                                                <span className="profile-row-value">{item.value}</span>
                                            </div>
                                            <button className="profile-edit-btn" aria-label={`Edit ${item.label}`}>
                                                <GoPencil />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Col>

                            <Col xs={12} lg={6}>
                                <div className="profile-panel">
                                    <h3 className="profile-panel-title">Contact & Preferences</h3>
                                    {contactDetails.map((item) => (
                                        <div className="profile-row" key={item.label}>
                                            <div className="profile-row-content">
                                                <span className="profile-row-label">{item.label}</span>
                                                <span className="profile-row-value">{item.value}</span>
                                            </div>
                                            <button className="profile-edit-btn" aria-label={`Edit ${item.label}`}>
                                                <GoPencil />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;