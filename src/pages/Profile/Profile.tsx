import { Row, Col, Container } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { GoPencil } from 'react-icons/go';
import BoilerPlate from '../webPage_Components/NavBar/NavBar';
import ProfileImage from '../../assets/istockphoto-828763406-1024x1024.jpg';
import pixiTextureUrl from '../../assets/from-PixAI-2067286588558916448-0.png';
import './Profile.css';
import { Application, Assets, Sprite } from 'pixi.js';
import Sparke from '../../SVG_Animmation/Sparke/Sparke.tsx';
import Hand from'../../SVG_Animmation/Hand/Hand.tsx'
import Construction from '../../SVG_Animmation/SVGDrawingFunc/Construction/Construction.tsx';

async function initPixi(target: HTMLDivElement) {
    const app = new Application();
    await app.init({
        width: 200,
        height: 200,
        backgroundColor: 0x1099bb,
        antialias: true,
    });

    const texture = await Assets.load(pixiTextureUrl);
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);
    sprite.position.set(100, 100);
    sprite.scale.set(0.1);
    sprite.width= 200;
    sprite.height = 200;
    app.stage.addChild(sprite);
    target.appendChild(app.canvas);

    return app;
}

function Profile() {
    const pixiContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = pixiContainer.current;
        if (!target) return;

        let app: Application | null = null;
        let cancelled = false;

        initPixi(target)
            .then((initializedApp) => {
                if (cancelled) {
                    initializedApp.destroy({ removeView: true }, { children: true });
                    return;
                }
                app = initializedApp;
            })
            .catch((error: unknown) => {
                console.error('Failed to initialize Pixi scene:', error);
            });

        return () => {
            cancelled = true;
            app?.destroy({ removeView: true }, { children: true });
        };
    }, []);

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
    const handDetails = [
                { stroke: 'path',opacity: '0.5', color: '#f3c7a5', cordinates: 'M74 205 C68 191 64 174 59 158 L45 132 C40 123 44 114 52 111 C60 108 66 113 70 121 L83 145 L76 75 C75 64 81 58 89 58 C98 58 103 64 104 74 L109 129 L109 47 C109 36 115 30 123 30 C132 30 138 36 138 47 L139 128 L147 65 C148 54 154 49 162 50 C171 51 176 58 175 68 L168 136 L180 99 C183 89 191 86 198 90 C206 94 207 101 203 111 L184 163 C178 182 166 197 149 205 Z' },

        { stroke: 'path', opacity: '1', color: 'black', cordinates: 'M83 94 C89 90 97 90 103 94' },
        { stroke: 'path', opacity: '1', color: 'black', cordinates: 'M110 76 C118 72 129 72 137 76' },
         { stroke: 'path',opacity: '0.5', color: 'blue', cordinates: 'M110 76 C118 72 129 72 137 76' },
         { stroke: 'path',opacity: '0.5', color: 'red', cordinates: 'M110 76 C118 72 129 72 137 76' },

        { stroke: 'path', opacity: '1', color: 'red', cordinates: 'M143 88 C150 84 160 85 167 90' },
        { stroke: 'path',opacity: '1', color: 'red', cordinates: 'M88 157 C101 150 115 152 125 160' },
        { stroke: 'path', color: 'red', cordinates: 'M133 159 C145 153 158 156 166 165' },

    ];
const pathData:string = ' M 0 150 L 250 150 L 50 150 Z ';
    return (
        <Container className="Profile-container" fluid style={{ overflowX: 'hidden', overflowY: 'scroll' }}>
            <BoilerPlate />
            <Row><Col><svg viewBox=' 0 0 300 150' >
                <path d={pathData} fill="blue" stroke= "blue" strokeWidth={10}></path>
                </svg></Col><Col><div ref={pixiContainer} /></Col>
                <Col><Sparke /></Col>
                <Col><Hand/></Col>
                <Col><svg viewBox='0 0 200 200'>{Construction(handDetails)}</svg></Col>
                </Row>
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