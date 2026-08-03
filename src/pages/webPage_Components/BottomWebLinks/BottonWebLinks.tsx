import {
    Row, Col,

    Container
} from 'react-bootstrap';

import MyImage3 from '/Users/cesarbarrera/Documents/GitHub/Game_Studio_Website/src/components/pages/assets/sufyan-5NrbL6F68V0-unsplash.jpg';
import { RiTiktokLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { RxDiscordLogo } from "react-icons/rx";
import './BottomWebLinks.css';


function BottomWebLinks() {
    const socialLinks = [
        { icon: <FaXTwitter />, label: 'Twitter' },
        { icon: <RiTiktokLine />, label: 'TikTok' },
        { icon: <CiYoutube />, label: 'YouTube' },
        { icon: <FaInstagram />, label: 'Instagram' },
        { icon: <RxDiscordLogo />, label: 'Discord' }
    ];

    const companyLinks = ['Careers', 'Events', 'FAQ'];
    const storeLinks = ['Location', 'Games', 'About', 'Merch'];

    return (
        <Row className='bottomWebPage g-0'>
            <Col xs={12} md={3} lg={2} id='label' className='footer-hero' />

            <Col xs={12} md={9} lg={10} id='info'>
                <div className='footer-content'>
                    <div className='footer-section'>
                        <p className='section-title'>Social Media</p>
                        <Row className='g-3 justify-content-center'>
                            {socialLinks.map((item) => (
                                <Col key={item.label} xs={6} sm={4} md={2} className='text-center'>
                                    <a href='#' className='link' aria-label={item.label}>
                                        {item.icon}
                                    </a>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <div className='footer-section'>
                        <p className='section-title'>Company</p>
                        <Row className='g-3 justify-content-center'>
                            {companyLinks.map((item) => (
                                <Col key={item} xs={12} sm={4} className='text-center'>
                                    <a href='#' className='link'>{item}</a>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <div className='footer-section'>
                        <p className='section-title'>Store</p>
                        <Row className='g-3 justify-content-center'>
                            {storeLinks.map((item) => (
                                <Col key={item} xs={6} sm={3} className='text-center'>
                                    <a href='#' className='link'>{item}</a>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
export default BottomWebLinks;