import { Row, Col, Card } from 'react-bootstrap';
import UnityCharacter from '../../../UnityCharacter/UntyCharacter';
import './UnityDemo.css';

type UnityDemoProps = {
    useRef: any;
    useState: any;
};

function UnityDemo({ useRef, useState }: UnityDemoProps) {
    return (
        <Card id="cardR" className="rounded-5 middleCard unity-demo-card">
            <Row className="mb-3 text-center">
                <h2 className="title">Description</h2>
            </Row>

            <Row className="g-4 align-items-center">
                <Col xs={12} md={5} className="unity-demo-visual-col">
                    <Card className="unity-demo-visual-card w-100 h-100" >
                        <UnityCharacter useRef1={useRef} useState1={useState} />
                    </Card>
                </Col>

                <Col xs={12} md={7}>
                    <div className="unity-demo-copy h-100 d-flex align-items-center">
                        <p className="text mb-0">
                            This is a description for the AI Drawing Software. Most advanced AI software for drawing.
                            Implemented with mathematical reconstruction of imagery and calculation of repeated animation based on user desire.
                            Based on artist labeling and animation, AI makes animation predictions based on what the artist wants.
                        </p>
                    </div>
                </Col>
            </Row>
        </Card >
    );
}

export default UnityDemo;
