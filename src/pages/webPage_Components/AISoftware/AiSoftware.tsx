import 'bootstrap/dist/css/bootstrap.min.css';

import { useRef, useEffect } from 'react';
import { DrawObject } from '../../../DrawingFunctions/FaceFunctions';
import {
    Row, Col, Card, Button,


} from 'react-bootstrap';
import * as Interaction from '../../../DrawingFunctions/InteractionMethods';

import './AISoftware.css';

type FaceParams = [number, number, number, number, number];
type EarParams = ["left" | "right", number, number, number, number, number, number];
type HairParams = [number, number, number, number, number, number, number, number];
type NoseParams = [number, number, number, number, number, number, number, number];
type MouthParams = [number, number, number, number, number, number, number, number, number, number, number, number];
type EyeParams = [number, number, number, number, number];
type EyeBrowsParams = [number, number, number, number, number, number, number, number, number, number, number, number, number];

export let canvas: HTMLCanvasElement | null = null;
export let gl: WebGLRenderingContext | null = null;

export let uColor2: WebGLUniformLocation | null;
export let uColor1: WebGLUniformLocation | null;
// Triangle vertices
export let vertices = new Float32Array([
    0.0, 0.0,
    0.0, 0.0,
    0.0, 0.0
]);
export let elispeVertices = new Float32Array([
    0.0, 0.0,
    0.0, 0.0,
    0.0, 0.0
]);
export let curveVertices = new Float32Array([
    0.0, 0.0,
    0.0, 0.0,
    0.0, 0.0
]);

function AISoftware() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    Interaction.SetState();
    useEffect(() => {
        const canvasElement = canvasRef.current;
        if (!canvasElement) {
            return;
        }

        canvas = canvasElement;
        const context = canvasElement.getContext('webgl', { preserveDrawingBuffer: true });
        if (!context) {
            console.error('WebGL not supported');
            return;
        }
        gl = context;

        let animationFrameId: number | null = null;

        // Vertex Shader
        const vsSource = `
        attribute vec2 aPosition;
        varying vec2 vPosition;
        void main() {
            vPosition = aPosition;
        gl_Position = vec4(aPosition , 0.0, 1.0);
      }
        `;

        // Fragment Shader
        const fsSource = `
        precision mediump float;
        varying vec2 vPosition;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        void main() {
            vec2 uv = (vPosition + 1.0) * 0.5;
        vec3 color= mix(uColor1, uColor2, uv.y);
        gl_FragColor = vec4(color, 1.0);
      }
        `;



        // Shader compiler
        function compileShader(type: number, source: string): WebGLShader | null {
            const shader = context.createShader(type);
            if (!shader) {
                return null;
            }
            context.shaderSource(shader, source);
            context.compileShader(shader);
            if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
                console.error(context.getShaderInfoLog(shader));
                context.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const vertexShader = compileShader(context.VERTEX_SHADER, vsSource);
        const fragmentShader = compileShader(context.FRAGMENT_SHADER, fsSource);
        if (!vertexShader || !fragmentShader) {
            return;
        }

        const program = context.createProgram();
        if (!program) {
            return;
        }

        context.attachShader(program, vertexShader);
        context.attachShader(program, fragmentShader);
        context.linkProgram(program);
        if (!context.getProgramParameter(program, context.LINK_STATUS)) {
            console.error(context.getProgramInfoLog(program));
            context.deleteProgram(program);
            return;
        }

        context.useProgram(program);

        const curveBuffer = context.createBuffer();
        if (!curveBuffer) {
            return;
        }
        context.bindBuffer(context.ARRAY_BUFFER, curveBuffer);
        context.bufferData(context.ARRAY_BUFFER, curveVertices, context.DYNAMIC_DRAW);

        const aPosition = context.getAttribLocation(program, 'aPosition');
        if (aPosition < 0) {
            return;
        }

        context.enableVertexAttribArray(aPosition);
        context.vertexAttribPointer(aPosition, 2, context.FLOAT, false, 0, 0);
        uColor2 = context.getUniformLocation(program, "uColor2");
        uColor1 = context.getUniformLocation(program, "uColor1");

        if (!uColor1 || !uColor2) {
            return;
        }

        // Animation for unchanged frame
        function animateUnchangedFrame() {
            // Clear canvas
            if (!context) {
                return;
            }
            context.clearColor(0.1, 0.1, 0.1, 1.0);
            context.clear(context.COLOR_BUFFER_BIT);

            const face: FaceParams = [35, 0.525, 0.9, 0.0, 0.0];
            const leftEar: EarParams = ["left", 30, 0.5, 0.5, 0.6, 0.3, 0.7];
            const rightEar: EarParams = ["right", 30, 0.5, 0.5, 0.7, 0.4, 0.7];
            const hair: HairParams = [30, 20, -0.6, -0.54, 0.55, 0.6, 0.13, -0.3];
            const nose: NoseParams = [0.0, -0.25, 0.01, -0.30, 0.01, -0.30, 0, -0.33];
            const mouth: MouthParams = [10, 0.0, -0.5, -0.10, -0.48, 1, 1, 3, 0, 0, 0, 0];
            const eye: EyeParams = [40, 0.1, 0.15, 0.25, 0.1];
            const eyeBrows: EyeBrowsParams = [10, 0.13, 0.50, 0.38, 0.45, 1, 1, 4, 0, 0, 0, 0, 0];
            DrawObject(face, leftEar, rightEar, hair, nose, mouth, eye, eyeBrows);
            // Request animation frame
            animationFrameId = requestAnimationFrame(animateChangedFrame);
        }
        function animateChangedFrame() {

        }


        animateUnchangedFrame();

        const handleCanvasClick = (_e: MouseEvent) => {
            canvasElement.getBoundingClientRect();
        };

        canvasElement.addEventListener('click', handleCanvasClick);

        return () => {
            canvasElement.removeEventListener('click', handleCanvasClick);
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }
        };

    }, []);
    return (
        <Card id='cardRow' className='w-100 rounded-5 d-flex flex-column p-3 p-md-4'>
            <Row className='mb-3 text-center'>
                <h1 id='AITitle'>AI Software</h1>
            </Row>

            <Row className='g-4 align-items-center flex-grow-1' id='ContentRow'>
                <Col xs={12} md={6} className='d-flex justify-content-center'>
                    <canvas
                        ref={canvasRef}
                        width={300}
                        height={300}
                        style={{ width: '100%', maxWidth: '300px', aspectRatio: '1 / 1', margin: '0px', padding: '0px', border: '4px solid #f2a3a8' }}
                    />
                </Col>

                <Col xs={12} md={6} className='d-flex align-items-center'>
                    <p style={{ color: 'white', borderColor: 'black', fontFamily: 'Trebuchet MS, sans-serif', textAlign: 'center', overflowY: 'auto', height: '100%', margin: '0px', textShadow: '2px 2px 4px black' }}>
                        For a complete demo of our new AI Drawing Software or for a preorder of our software, click on the buttons below.
                    </p>
                </Col>
            </Row>

            <Row className='mt-4 justify-content-center w-100'>
                <Col>
                    <Button className='rounded-3 h-100 flex-grow-1'>Demo</Button>

                </Col>
                <Col>
                    <Button className='rounded-3 h-100 flex-grow-1'>Buy Software</Button>

                </Col>

            </Row>
        </Card>
    );

}
export default AISoftware;