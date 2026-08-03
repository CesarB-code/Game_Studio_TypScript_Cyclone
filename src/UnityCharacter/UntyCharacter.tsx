import { Row, Col, Card, Button } from 'react-bootstrap';
import useAni from '../useAni/useAni';
import { useRef, useState, useEffect } from 'react';
import './UnityCharacter.css';

type UnityCharacterProps = {
    useRef1: any;
    useState1: any;
};

export default function UnityCharacter({ useRef1, useState1 }: UnityCharacterProps) {

    const startAudio = async () => {
        const ctx =
            new (window.AudioContext ||
                window.AudioContext)();

        await ctx.resume();
    };

    let playAnimation = () => {
        if (!useState1.unityInstance) return;

        useState1.unityInstance1.SendMessage(
            "AnimationController",
            "Walk"
        );
    };

    useAni(useRef1, useState1, "loadAnimation");


    let canvasHeight = useRef(null);

    const [webHeight, setWebHeight] = useState<number>(100);

    useEffect(() => {
        function updateHeight() {
            setWebHeight(parseFloat(getComputedStyle(canvasHeight.current).height));
        }

        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);





    return (
        <Row className="align-items-center justify-content-center w-100 h-100">
            <Card className="align-items-center border-0 p-0 w-100 h-100">
                <Col ref={canvasHeight} xs={12} className="d-flex flex-column gap-2 w-100">
                    <canvas
                        id="unity-canvas"
                        ref={useRef1}
                        width={600}
                        height={webHeight}
                        className="w-100"
                        style={{ margin: '0px', padding: '5px', display: 'block', width: '100%', height: '100%', maxHeight: '100px' }}
                    />

                    <Button
                        onClick={startAudio}
                        className="w-100"
                        style={{ margin: '0px', paddingLeft: '15px', paddingRight: '15px' }}
                    >
                        Play Audio
                    </Button>
                </Col>
            </Card>
        </Row>
    );
}