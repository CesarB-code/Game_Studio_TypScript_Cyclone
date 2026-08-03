import { gl } from "../pages/webPage_Components/AISoftware/AiSoftware";
import { hairPoints } from "./FaceFunctions";

//temp array
let temp = [];

// Triangle vertices
let vertices = new Float32Array([
    0.0, 0.0,
    0.0, 0.0,
    0.0, 0.0
]);


let curvePoints = new Float32Array([
    0.0, 0.0,
    0.0, 0.0
]);;

let vertex;
// line drawing function
function lineAnimation(startX, startY, EndX, EndY) {
    vertices = new Float32Array([startX, startY, EndX, EndY]);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
    gl.drawArrays(gl.LINE_STRIP, 0, 2);

}
function triangleAnimation(point1X, point1Y, point2X, point2Y, point3X, point3Y) {
    let triangle = new Float32Array(6);
    triangle[0] = parseFloat(point1X);
    triangle[1] = parseFloat(point1Y);
    triangle[2] = parseFloat(point2X);
    triangle[3] = parseFloat(point2Y);
    triangle[4] = parseFloat(point3X);
    triangle[5] = parseFloat(point3Y);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, triangle);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
// rectangle drawing function
function rectangleAnimation(point1X, point1Y, point2X, point2Y, point3X, point3Y, point4X, point4Y) {
    let rectangle = new Float32Array(8);

    rectangle[0] = point1X;
    rectangle[1] = point1Y;
    rectangle[2] = point2X;
    rectangle[3] = point2Y;
    rectangle[4] = point3X;
    rectangle[5] = point3Y;
    rectangle[6] = point4X;
    rectangle[7] = point4Y;

    gl.bufferData(gl.ARRAY_BUFFER, rectangle, gl.STATIC_DRAW);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);


}
// curve drawing function
function curveAnimation(lineCount,
    startX, startY,
    EndX, EndY,
    shiftMoreX, shiftMoreY,
    curveType, shrinkCruve,
    stopDrawAtXBound1, stopDrawAtXBound2,
    stopDrawAtYBound1, stopDrawAtYBound2, boundObjectInfo) {


    let shrIStrX, shrIStrY, values, k1, k2, m1, m2, lineCountOffset;
    k1 = 2 / lineCount;
    k2 = 1 / lineCount;
    if (curveType == 1 || curveType == 3) {
        m1 = (k1 - 1) / (k1);
        m2 = (k2 - 1) / (k2);
    }
    else if (curveType == 2 || curveType == 4) {
        m1 = (1 - k1) / (k1);
        m2 = (1 - k2) / (k2);
    }

    lineCountOffset = (lineCount - 1) / lineCount;

    values = shiftNumbers(startX, startY, EndX, EndY, k1, k2, m1, m2, lineCountOffset, curveType);
    shrIStrX = values[0];
    shrIStrY = values[1];

    CurveSeriesPointsDrawing(startX, startY,
        EndX, EndY,
        shrIStrX, shiftMoreX,
        shrIStrY, shiftMoreY,
        lineCountOffset, lineCount,
        curveType, shrinkCruve,
        stopDrawAtXBound1, stopDrawAtXBound2,
        stopDrawAtYBound1, stopDrawAtYBound2, boundObjectInfo);

    function CurveSeriesPointsDrawing(
        startX, startY,
        EndX, EndY,
        shrIStrX, shiftMoreX,
        shrIStrY, shiftMoreY,
        lineCountOffset, lineCount,
        curveType, shrinkCruve,
        stopDrawAtXBound1, stopDrawAtXBound2,
        stopDrawAtYBound1, stopDrawAtYBound2, boundObjectInfo) {

        let k1, k2;

        let boundXYTouched = false

        for (let n = lineCount; n > 1; n--) {


            if (n == lineCount) {

                curvePoints[0] = startX;
                curvePoints[1] = startY;
            }

            else {
                k1 = n / lineCount;
                k2 = (n - 1) / lineCount;

                curveLineSegment(k1, k2, startX, startY, EndX, EndY, shrIStrX, shiftMoreX, shrIStrY, shiftMoreY, curveType, lineCountOffset, shrinkCruve);

                curvePoints[2] = vertex[0];
                curvePoints[3] = vertex[1];
                if (((stopDrawAtXBound1 != 0 && stopDrawAtXBound2 != 0) && (stopDrawAtYBound1 != 0 && stopDrawAtYBound2 != 0))) {
                    if (((curvePoints[2] > (Math.floor(stopDrawAtXBound1 * 100) / 100)) && (curvePoints[2] < (Math.floor(stopDrawAtXBound2 * 100) / 100)))
                        && ((curvePoints[3] < (Math.floor(stopDrawAtYBound1 * 100) / 100)) && (curvePoints[3] > (Math.floor(stopDrawAtYBound2 * 100) / 100)))) {

                        if (boundXYTouched == false) {
                            let m, newX, newY;
                            //m = CP3-CP1/CP2-CP0 , Y-CP3 = M(X-CP2), X= (Y-CP3)/M + CP2
                            // instaed find thhe shape at , 
                            if (((curvePoints[0] > (Math.floor(stopDrawAtXBound1 * 100) / 100)) && (curvePoints[0] < (Math.floor(stopDrawAtXBound2 * 100) / 100)))
                                && ((curvePoints[1] < (Math.floor(stopDrawAtYBound1 * 100) / 100)) && (curvePoints[1] > (Math.floor(stopDrawAtYBound2 * 100) / 100))
                                    && boundObjectInfo == null)
                            ) {
                                boundXYTouched = true;

                            }
                            else if (boundObjectInfo == null) {


                                if (curveType == 2 || curveType == 4) {
                                    m = (curvePoints[3] - curvePoints[1]) / (curvePoints[2] - curvePoints[0]);
                                    newX = ((stopDrawAtYBound1 - curvePoints[3]) / m) + curvePoints[2];
                                    newY = (m * (newX - curvePoints[2])) + curvePoints[3];
                                    lineAnimation(curvePoints[0], curvePoints[1], newX, newY);
                                }
                                else if (curveType == 1 || curveType == 3) {
                                    m = (curvePoints[3] - curvePoints[1]) / (curvePoints[2] - curvePoints[0]);
                                    newX = ((stopDrawAtYBound2 - curvePoints[3]) / m) + curvePoints[2];
                                    newY = (m * (newX - curvePoints[2])) + curvePoints[3];
                                    lineAnimation(curvePoints[0], curvePoints[1], newX, newY);
                                }

                                boundXYTouched = true;

                            }
                            else {



                                let y = boundObjectInfo.coordinate_array.toString();

                                boundXYTouched = checkBoundariesIntersection(curvePoints[0], curvePoints[1], curvePoints[2], curvePoints[3], boundObjectInfo, curveType);




                            }
                        }



                        gl.lineWidth(3.0);
                        gl.bufferSubData(gl.ARRAY_BUFFER, 0, curvePoints);




                    }

                    else {
                        gl.bufferSubData(gl.ARRAY_BUFFER, 0, curvePoints);
                        gl.lineWidth(3.0);
                        gl.drawArrays(gl.LINE_STRIP, 0, 2);
                    }




                }
                else {
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, curvePoints);
                    gl.lineWidth(3.0);
                    gl.drawArrays(gl.LINE_STRIP, 0, 2);

                }


                curvePoints[0] = curvePoints[2];
                curvePoints[1] = curvePoints[3];


            }
        }
    }
    function shiftNumbers(startX, startY, EndX, EndY, k1, k2, m1, m2, lineCountOffset, curveType) {

        let shrinkX, shrinkY;
        let arrayNumbers = new Array(2);

        if (curveType == 1) {
            shrinkX = (((m1 - m2) * (lineCountOffset)) - k1 + k2) / (((m1 - m2) * EndX) + ((m2 - m1) * startX));
            arrayNumbers[0] = shrinkX;
            shrinkY = (EndY - startY) / ((m1 * ((shrinkX * (startX - EndX)) + lineCountOffset)) + 1 - k1);
            arrayNumbers[1] = shrinkY;
        }
        else if (curveType == 2) {
            shrinkX = (((m1 - m2) * (lineCountOffset)) + k1 - k2) / ((((m2 - m1) * (EndX)) + ((m1 - m2) * startX)));
            arrayNumbers[0] = shrinkX;
            shrinkY = (EndY - startY) / ((m1 * ((shrinkX * (EndX - startX)) + lineCountOffset)) - 1 + k1);
            arrayNumbers[1] = shrinkY;

        }
        else if (curveType == 3) {
            shrinkX = (((m1 - m2) * (lineCountOffset)) - k1 + k2) / (((m2 - m1) * EndX) + ((m1 - m2) * startX));
            arrayNumbers[0] = shrinkX;
            shrinkY = (EndY - startY) / ((m1 * ((shrinkX * (EndX - startX)) + lineCountOffset)) + 1 - k1);
            arrayNumbers[1] = shrinkY;
        }
        else if (curveType == 4) {
            shrinkX = (((m1 - m2) * (lineCountOffset)) + k1 - k2) / (((m1 - m2) * EndX) + ((m2 - m1) * startX));
            arrayNumbers[0] = shrinkX;
            shrinkY = (EndY - startY) / ((m1 * ((shrinkX * (startX - EndX)) + lineCountOffset)) - 1 + k1);
            arrayNumbers[1] = shrinkY;
        }

        return arrayNumbers;
    }

    // curve drawing function ** y=
    function curveLineSegment(k1, k2, startX, startY, EndX, EndY, shrIStrX, shiftMoreX, shrIStrY, shiftMoreY, curveType, lineCountOffset, shrinkCruve) {
        let y, x, m1, m2;
        if (curveType == 1) {

            //type 1 curve
            m1 = ((k1) - 1) / (k1);
            m2 = ((k2) - 1) / (k2);
            x = ((((m1 - m2) * shrIStrX * shiftMoreX * startX) + ((m1 - m2) * lineCountOffset) - k1 + k2) / ((m1 - m2) * shiftMoreX * shrIStrX));
            y = shrIStrY * shiftMoreY * ((m1 * ((shrIStrX * shiftMoreX * ((-x) + startX)) + lineCountOffset)) + 1 - k1) + startY;
            if ((shrinkCruve > 0) || (shrinkCruve < 0)) {
                let newVertx = curveShrink(x, y, startX, startY, EndX, EndY, shrinkCruve, curveType);
                vertex = [newVertx[0], newVertx[1]];

            }
            else {
                vertex = [x, y];
            }





        }
        else if (curveType == 2) {
            //type 2 curve
            m1 = (-k1 + 1) / (k1);
            m2 = (-k2 + 1) / (k2);
            x = (((m2 - m1) * (shrIStrX) * shiftMoreX * (startX)) + ((m1 - m2) * lineCountOffset) + k1 - k2) / ((m2 - m1) * shrIStrX * shiftMoreX);
            y = shrIStrY * shiftMoreY * ((m1 * ((shrIStrX * shiftMoreX * (x - startX)) + lineCountOffset)) - 1 + k1) + startY;
            if ((shrinkCruve > 0) || (shrinkCruve < 0)) {
                let newVertx = curveShrink(x, y, startX, startY, EndX, EndY, shrinkCruve, curveType);
                vertex = [newVertx[0], newVertx[1]];

            }
            else {
                vertex = [x, y];
            }



        }
        else if (curveType == 3) {
            //type 3 curve
            m1 = ((k1) - 1) / (k1);
            m2 = ((k2) - 1) / (k2);
            x = ((((m1 - m2) * lineCountOffset) - ((m1 - m2) * (shrIStrX) * shiftMoreX * startX) - k1 + k2) / ((m2 - m1) * shrIStrX * shiftMoreX));
            y = shrIStrY * shiftMoreY * (((m1) * ((shrIStrX * shiftMoreX * (x - startX)) + lineCountOffset)) + 1 - k1) + startY;
            if ((shrinkCruve > 0) || (shrinkCruve < 0)) {
                let newVertx = curveShrink(x, y, startX, startY, EndX, EndY, shrinkCruve, curveType);
                vertex = [newVertx[0], newVertx[1]];

            }
            else {
                vertex = [x, y];
            }




        }
        else if (curveType == 4) {
            //type 4 curve
            m1 = (-k1 + 1) / (k1);
            m2 = (-k2 + 1) / (k2);
            x = (-1) * ((((m1 - m2) * lineCountOffset) + ((m1 - m2) * shrIStrX * shiftMoreX * startX) + k1 - k2) / ((m2 - m1) * shrIStrX * shiftMoreX));
            y = shrIStrY * shiftMoreY * ((m1 * ((shrIStrX * shiftMoreX * ((-1 * x) + startX)) + lineCountOffset)) - 1 + k1) + startY;
            if ((shrinkCruve > 0) || (shrinkCruve < 0)) {
                let newVertx = curveShrink(x, y, startX, startY, EndX, EndY, shrinkCruve, curveType);
                vertex = [newVertx[0], newVertx[1]];
            }
            else {
                vertex = [x, y];
            }


        }

    }





    //curve shrink function 
    function curveShrink(curveX, curveY, startX, startY, EndX, EndY, shrinkAmount, curveType) {

        //First line is y-curveY =m1(x-curveX)
        //Second line is y-StartY = m2(x-startX)

        let newX, newY, m2, m1, x, y, deltaX, deltaY;
        if (curveType == 1) {
            m2 = (EndY - startY) / (EndX - startX);

            m1 = -1;

            x = ((m2 * startX) - (m1 * curveX) + curveY - startY) / (m2 - m1);
            y = m2 * (x - startX) + startY;
            deltaX = Math.abs(x - curveX);
            deltaY = Math.abs(y - curveY);
            newX = curveX - (deltaX * shrinkAmount);
            newY = curveY + (deltaY * shrinkAmount);

        }
        else if (curveType == 2) {
            m2 = (EndY - startY) / (EndX - startX)
            m1 = -1;
            x = ((m2 * startX) - (m1 * curveX) + curveY - startY) / (m2 - m1);
            y = m2 * (x - startX) + startY;
            deltaX = Math.abs(x - curveX);
            deltaY = Math.abs(y - curveY);
            newX = curveX + (deltaX * shrinkAmount);
            newY = curveY - (deltaY * shrinkAmount);

        }
        else if (curveType == 3) {
            m2 = (EndY - startY) / (EndX - startX);
            m1 = 1;
            x = ((m2 * startX) - (m1 * curveX) + curveY - startY) / (m2 - m1);
            y = m2 * (x - startX) + startY;
            deltaX = Math.abs(x - curveX);
            deltaY = Math.abs(y - curveY);

            newX = curveX + (deltaX * shrinkAmount);
            newY = curveY + (deltaY * shrinkAmount);


        }
        else if (curveType == 4) {
            m2 = (EndY - startY) / (EndX - startX);
            m1 = 1;
            x = ((m2 * startX) - (m1 * curveX) + curveY - startY) / (m2 - m1);
            y = m2 * (x - startX) + startY;
            deltaX = Math.abs(x - curveX);
            deltaY = Math.abs(y - curveY);
            newX = curveX - (deltaX * shrinkAmount);
            newY = curveY - (deltaY * shrinkAmount)
        }
        return [newX, newY];
    }
    function curveShrink2(curveX, curveY, x, startX, startY, EndX, EndY, shrinkAmount, curveType) {

        //First line is y-curveY =m1(x-curveX)
        //Second line is y-StartY = m2(x-startX)

        let newX, newY, m2, y, deltaX, deltaY;
        if (curveType == 1) {
            m2 = (EndY - startY) / (EndX - startX);

            y = m2 * (x - startX) + startY;
            deltaX = Math.abs(x - curveX);
            deltaY = Math.abs(y - curveY);
            newX = curveX - (deltaX * shrinkAmount);
            newY = curveY + (deltaY * shrinkAmount);

        }
        else if (curveType == 2) {
            m2 = (EndY - startY) / (EndX - startX)

            y = m2 * (x - startX) + startY;
            deltaX = Math.abs(x - curveX);
            deltaY = Math.abs(y - curveY);
            newX = curveX + (deltaX * shrinkAmount);
            newY = curveY - (deltaY * shrinkAmount);

        }
        else if (curveType == 3) {
            m2 = (EndY - startY) / (EndX - startX);

            y = m2 * (x - startX) + startY;
            deltaX = Math.abs(x - curveX);
            deltaY = Math.abs(y - curveY);
            newX = curveX + (deltaX * shrinkAmount);
            newY = curveY + (deltaY * shrinkAmount);
        }
        else if (curveType == 4) {
            m2 = (EndY - startY) / (EndX - startX);

            y = m2 * (x - startX) + startY;
            deltaX = Math.abs(x - curveX);
            deltaY = Math.abs(y - curveY);
            newX = curveX - (deltaX * shrinkAmount);
            newY = curveY - (deltaY * shrinkAmount)
        }
        return [newX, newY];
    }
    function checkBoundariesIntersection(startX, startY, originalXEndPoint, originalYEndPoint, boundObjectsInfo, startingCurveType) {



        for (let i = 0; i < boundObjectsInfo.shapeTypeArray.length; i++) {
            if (boundObjectsInfo.shapeTypeArray[i] === "curve") {
                if ((boundObjectsInfo.coordinate_array[i][7] == 1) || (boundObjectsInfo.coordinate_array[i][7] == 3)) {


                    if ((startX <= boundObjectsInfo.coordinate_array[i][1] && startX >= boundObjectsInfo.coordinate_array[i][3])
                        || (startX <= boundObjectsInfo.coordinate_array[i][3] && startX >= boundObjectsInfo.coordinate_array[i][1])) {
                        //Bézier curve with a 
                        let x, y, t1, t2, t, m, m1, m2, k, k1, k2, shrIStrX, shrIStrY, shiftMoreX, shiftMoreY, vectex, newVertx;
                        //find t value for the x coordinate of the curve that is equal to the x coordinate of the end point of the line, then find the y coordinate of the curve at that t value and compare it to the y coordinate of the end point of the line to see if they intersect
                        t1 = ((((2 * boundObjectsInfo.coordinate_array[i][1]) - (2 * boundObjectsInfo.coordinate_array[i][3])) - (Math.sqrt(((4 * Math.pow(boundObjectsInfo.coordinate_array[i][3], 2)) - (8 * boundObjectsInfo.coordinate_array[i][1] * boundObjectsInfo.coordinate_array[i][3]) + (4 * Math.pow(boundObjectsInfo.coordinate_array[i][1], 2))) - ((4 * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint) * (boundObjectsInfo.coordinate_array[i][1])) + (4 * boundObjectsInfo.coordinate_array[i][3] * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint)) - (8 * boundObjectsInfo.coordinate_array[i][3] * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint)))))) /
                            ((2 * boundObjectsInfo.coordinate_array[i][1]) + (2 * boundObjectsInfo.coordinate_array[i][3]) - (4 * boundObjectsInfo.coordinate_array[i][3])));
                        t2 = ((((2 * boundObjectsInfo.coordinate_array[i][1]) - (2 * boundObjectsInfo.coordinate_array[i][3])) + (Math.sqrt(((4 * Math.pow(boundObjectsInfo.coordinate_array[i][3], 2)) - (8 * boundObjectsInfo.coordinate_array[i][1] * boundObjectsInfo.coordinate_array[i][3]) + (4 * Math.pow(boundObjectsInfo.coordinate_array[i][1], 2))) - ((4 * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint) * (boundObjectsInfo.coordinate_array[i][1])) + (4 * boundObjectsInfo.coordinate_array[i][3] * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint)) - (8 * boundObjectsInfo.coordinate_array[i][3] * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint)))))) /
                            ((2 * boundObjectsInfo.coordinate_array[i][1]) + (2 * boundObjectsInfo.coordinate_array[i][3]) - (4 * boundObjectsInfo.coordinate_array[i][3])));
                        if (t1 >= 0 && t1 <= 1) {
                            t = t1;
                        }
                        else if (t2 >= 0 && t2 <= 1) {
                            t = t2;
                        }
                        x = ((Math.pow((1 - t), 2) * boundObjectsInfo.coordinate_array[i][1]) + (2 * (1 - t) * t * boundObjectsInfo.coordinate_array[i][3]) + ((t * t) * boundObjectsInfo.coordinate_array[i][3]));
                        k = ((boundObjectsInfo.coordinate_array[i][0] - Math.ceil(t * boundObjectsInfo.coordinate_array[i][0])) / boundObjectsInfo.coordinate_array[i][0]);
                        k1 = (2 / boundObjectsInfo.coordinate_array[i][0]);
                        k2 = (1 / boundObjectsInfo.coordinate_array[i][0]);
                        m1 = (k1 - 1) / (k1);
                        m2 = (k2 - 1) / (k2);
                        lineCountOffset = ((boundObjectsInfo.coordinate_array[i][0] - 1) / boundObjectsInfo.coordinate_array[i][0]);
                        m = ((k) - 1) / (k);
                        vectex = shiftNumbers(boundObjectsInfo.coordinate_array[i][1], boundObjectsInfo.coordinate_array[i][2], boundObjectsInfo.coordinate_array[i][3], boundObjectsInfo.coordinate_array[i][4], k1, k2, m1, m2, lineCountOffset, boundObjectsInfo.coordinate_array[i][7]);
                        shrIStrX = vectex[0];
                        shrIStrY = vectex[1]
                        shiftMoreX = boundObjectsInfo.coordinate_array[i][5];
                        shiftMoreY = boundObjectsInfo.coordinate_array[i][6];
                        if (boundObjectsInfo.coordinate_array[i][7] == 1) {
                            y = shrIStrY * shiftMoreY * ((m * ((shrIStrX * shiftMoreX * ((-x) + boundObjectsInfo.coordinate_array[i][1])) + lineCountOffset)) + 1 - k) + boundObjectsInfo.coordinate_array[i][2];
                        }
                        else if (boundObjectsInfo.coordinate_array[i][7] == 3) {
                            y = shrIStrY * shiftMoreY * (((m) * ((shrIStrX * shiftMoreX * (x - boundObjectsInfo.coordinate_array[i][1])) + lineCountOffset)) + 1 - k) + boundObjectsInfo.coordinate_array[i][2];

                        }




                        if ((originalYEndPoint <= boundObjectsInfo.coordinate_array[i][2])) {
                            lineAnimation(startX, startY, originalXEndPoint, originalYEndPoint);
                            i = boundObjectsInfo.shapeTypeArray.length;;
                            return false;
                        }
                        else if ((originalYEndPoint >= boundObjectsInfo.coordinate_array[i][2]) && (originalYEndPoint < y)) {

                            lineAnimation(startX, startY, originalXEndPoint, originalYEndPoint);
                            i = boundObjectsInfo.shapeTypeArray.length;;
                            return false;
                        }
                        else if ((originalYEndPoint >= boundObjectsInfo.coordinate_array[i][2]) && (originalYEndPoint >= y)) {

                            if (boundObjectsInfo.coordinate_array[i][8] > 0) {
                                let newVertx = curveShrink2(x, y, x, boundObjectsInfo.coordinate_array[i][1], boundObjectsInfo.coordinate_array[i][2], boundObjectsInfo.coordinate_array[i][3], boundObjectsInfo.coordinate_array[i][4], boundObjectsInfo.coordinate_array[i][8], boundObjectsInfo.coordinate_array[i][7]);
                                x = newVertx[0];
                                y = newVertx[1];
                            }
                            lineAnimation(startX, startY, Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000);




                            return true;
                        }
                        // need to check the curve shrink for the last point of the curve




                    }

                }
                else if ((boundObjectsInfo.coordinate_array[i][7] == 2) || (boundObjectsInfo.coordinate_array[i][7] == 4)) {
                    if ((startX >= boundObjectsInfo.coordinate_array[i][1] && startX <= boundObjectsInfo.coordinate_array[i][3])
                        || (startX >= boundObjectsInfo.coordinate_array[i][3] && startX <= boundObjectsInfo.coordinate_array[i][1])) {
                        //Bézier curve with a 
                        let x, y, t1, t2, t, m, m1, m2, k, k1, k2, shrIStrX, shrIStrY, shiftMoreX, shiftMoreY, vectex;

                        t1 = ((((2 * boundObjectsInfo.coordinate_array[i][1]) - (2 * boundObjectsInfo.coordinate_array[i][3])) - (Math.sqrt(((4 * Math.pow(boundObjectsInfo.coordinate_array[i][3], 2)) - (8 * boundObjectsInfo.coordinate_array[i][1] * boundObjectsInfo.coordinate_array[i][3]) + (4 * Math.pow(boundObjectsInfo.coordinate_array[i][1], 2))) - ((4 * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint) * (boundObjectsInfo.coordinate_array[i][1])) + (4 * boundObjectsInfo.coordinate_array[i][3] * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint)) - (8 * boundObjectsInfo.coordinate_array[i][3] * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint)))))) /
                            ((2 * boundObjectsInfo.coordinate_array[i][1]) + (2 * boundObjectsInfo.coordinate_array[i][3]) - (4 * boundObjectsInfo.coordinate_array[i][3])));
                        t2 = ((((2 * boundObjectsInfo.coordinate_array[i][1]) - (2 * boundObjectsInfo.coordinate_array[i][3])) + (Math.sqrt(((4 * Math.pow(boundObjectsInfo.coordinate_array[i][3], 2)) - (8 * boundObjectsInfo.coordinate_array[i][1] * boundObjectsInfo.coordinate_array[i][3]) + (4 * Math.pow(boundObjectsInfo.coordinate_array[i][1], 2))) - ((4 * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint) * (boundObjectsInfo.coordinate_array[i][1])) + (4 * boundObjectsInfo.coordinate_array[i][3] * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint)) - (8 * boundObjectsInfo.coordinate_array[i][3] * (boundObjectsInfo.coordinate_array[i][1] - originalXEndPoint)))))) /
                            ((2 * boundObjectsInfo.coordinate_array[i][1]) + (2 * boundObjectsInfo.coordinate_array[i][3]) - (4 * boundObjectsInfo.coordinate_array[i][3])));
                        if (t1 >= 0 && t1 <= 1) {
                            t = t1;
                        }
                        else if (t2 >= 0 && t2 <= 1) {
                            t = t2;
                        }
                        x = ((Math.pow((1 - t), 2) * boundObjectsInfo.coordinate_array[i][1]) + (2 * (1 - t) * t * boundObjectsInfo.coordinate_array[i][3]) + ((t * t) * boundObjectsInfo.coordinate_array[i][3]));
                        k = ((boundObjectsInfo.coordinate_array[i][0] - Math.ceil(t * boundObjectsInfo.coordinate_array[i][0])) / boundObjectsInfo.coordinate_array[i][0]);
                        k1 = (2 / boundObjectsInfo.coordinate_array[i][0]);
                        k2 = (1 / boundObjectsInfo.coordinate_array[i][0]);
                        m1 = (1 - k1) / (k1);
                        m2 = (1 - k2) / (k2);

                        lineCountOffset = ((boundObjectsInfo.coordinate_array[i][0] - 1) / boundObjectsInfo.coordinate_array[i][0]);
                        m = ((1 - k) / (k));
                        vectex = shiftNumbers(boundObjectsInfo.coordinate_array[i][1], boundObjectsInfo.coordinate_array[i][2], boundObjectsInfo.coordinate_array[i][3], boundObjectsInfo.coordinate_array[i][4], k1, k2, m1, m2, lineCountOffset, boundObjectsInfo.coordinate_array[i][7]);
                        shrIStrX = vectex[0];
                        shrIStrY = vectex[1]
                        shiftMoreX = boundObjectsInfo.coordinate_array[i][5];
                        shiftMoreY = boundObjectsInfo.coordinate_array[i][6];
                        if (boundObjectsInfo.coordinate_array[i][7] == 2) {
                            y = shrIStrY * shiftMoreY * ((m * ((shrIStrX * shiftMoreX * (x - boundObjectsInfo.coordinate_array[i][1])) + lineCountOffset)) - 1 + k) + boundObjectsInfo.coordinate_array[i][2];
                        }
                        else if (boundObjectsInfo.coordinate_array[i][7] == 4) {
                            y = shrIStrY * shiftMoreY * (((m) * ((shrIStrX * shiftMoreX * ((-1 * x) + boundObjectsInfo.coordinate_array[i][1])) + lineCountOffset)) - 1 + k) + boundObjectsInfo.coordinate_array[i][2];

                        }
                        if ((originalYEndPoint >= boundObjectsInfo.coordinate_array[i][2])) {
                            lineAnimation(originalXEndPoint, originalYEndPoint, startX, startY);
                            i = boundObjectsInfo.shapeTypeArray.length;;
                            return false;
                        }
                        else if ((originalYEndPoint <= boundObjectsInfo.coordinate_array[i][2]) && (originalYEndPoint > y)) {

                            lineAnimation(originalXEndPoint, originalYEndPoint, startX, startY);
                            i = boundObjectsInfo.shapeTypeArray.length;;
                            return false;
                        }
                        else if ((originalYEndPoint <= boundObjectsInfo.coordinate_array[i][2]) && (originalYEndPoint <= y)) {

                            if (boundObjectsInfo.coordinate_array[i][8] > 0) {
                                let newVertx = curveShrink2(x, y, x, boundObjectsInfo.coordinate_array[i][1], boundObjectsInfo.coordinate_array[i][2], boundObjectsInfo.coordinate_array[i][3], boundObjectsInfo.coordinate_array[i][4], boundObjectsInfo.coordinate_array[i][8], boundObjectsInfo.coordinate_array[i][7]);
                                x = newVertx[0];
                                y = newVertx[1];
                            }
                            lineAnimation(startX, startY, x, y,);



                            return true;
                        }





                    }
                }
            }
        }
        return vertex;
    }


}


// circle drawing function
function circleAnimation(number, radius, h, k) {
    let angle = (360 / number) * (Math.PI / 180);


    for (let i = 0; i < number; i++) {
        if (i == 0) {
            let x = h + (radius * Math.cos(angle));
            let y = k + (radius * Math.sin(angle))
            vertices = new Float32Array([h, k, h + radius, k, x, y]);

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

        }
        else if (i == number - 1) {
            let x = h + (radius * Math.cos(360 * (Math.PI / 180)));
            let y = k + (radius * Math.sin(360 * (Math.PI / 180)))
            let updatedPositions = new Float32Array([h, k, vertices[4], vertices[5], x, y]);


            gl.bufferSubData(gl.ARRAY_BUFFER, 0, updatedPositions);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
        else {
            let temp1 = vertices[4];
            let temp2 = vertices[5];
            let x = h + (radius * Math.cos(angle));
            let y = k + (radius * Math.sin(angle));
            const updatedPositions = new Float32Array([h, k, temp1, temp2, x, y]);

            vertices = updatedPositions;
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, updatedPositions);
            gl.drawArrays(gl.TRIANGLES, 0, 3);


        }

        angle += (360 / number) * (Math.PI / 180);
    }


}
// semi circle drawing function
function semiCircleAnimation(number, radius, h, k) {
    let angle = (180 / number) * (Math.PI / 180);


    for (let i = 0; i < number; i++) {
        if (i == 0) {
            let x = h + (radius * Math.cos(angle));
            let y = k + (radius * Math.sin(angle))
            vertices = new Float32Array([h, k, h + radius, k, x, y]);

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

        }
        else if (i == number - 1) {
            let x = h + (radius * Math.cos(180 * (Math.PI / 180)));
            let y = k + (radius * Math.sin(180 * (Math.PI / 180)))
            let updatedPositions = new Float32Array([h, k, vertices[4], vertices[5], x, y]);


            gl.bufferSubData(gl.ARRAY_BUFFER, 0, updatedPositions);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
        else {
            let temp1 = vertices[4];
            let temp2 = vertices[5];
            let x = h + (radius * Math.cos(angle));
            let y = k + (radius * Math.sin(angle));
            const updatedPositions = new Float32Array([h, k, temp1, temp2, x, y]);

            vertices = updatedPositions;
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, updatedPositions);
            gl.drawArrays(gl.TRIANGLES, 0, 3);


        }

        angle += (180 / number) * (Math.PI / 180);
    }


}
// elipse drawing function
function elipseAnimation(number, a, b, h, k) {

    let x, y;

    let angle = (360 / number) * (Math.PI / 180);

    for (let i = 0; i < number; i++) {
        if (i == 0) {
            x = h + (a * Math.cos(angle));
            y = k + (b * Math.sin(angle));
            vertices = new Float32Array([
                h, k,
                h + a, k,
                x, y]);


            gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

        } else if (i == number - 1) {
            x = h + (a * Math.cos(0));
            y = k;
            let updatedPositions = new Float32Array([h, k, vertices[4], vertices[5], Math.round((h + a) * 100) / 100, Math.round(k * 100) / 100]);

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, updatedPositions);
            gl.drawArrays(gl.TRIANGLES, 0, 3);


        } else {
            let temp1 = vertices[4];
            let temp2 = vertices[5];
            x = h + (a * Math.cos(angle));
            y = k + (b * Math.sin(angle));
            let updatedPositions = new Float32Array(
                [h, k,
                    temp1, temp2,
                    x, y]);

            vertices = updatedPositions;
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, updatedPositions);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            let FirstX = Math.round(temp1 * 100) / 100;
            let FirstY = Math.round(temp2 * 100) / 100;
            let SecondX = Math.round((x) * 100) / 100;
            let SecondY = Math.round(y * 100) / 100;

            if (((angle < (180 * Math.PI / 180)) && (angle > 0 * Math.PI / 180)) && (hairPoints.length == 2)) {

                temp.push(SecondX, SecondY);
            }
            else if ((hairPoints.length == 2)) {
                hairPoints.push(...temp);
                temp = [];
            }





        }
        angle += (360 / number) * (Math.PI / 180);

    }


}

// elipse drawing function
function semiElipseAnimation(number, a, b, h, k) {



    let angle = (180 / number) * (Math.PI / 180);;
    let x, y;
    for (let i = 1; i <= number; i++) {


        if (i == 1) {
            x = h + (a * Math.cos(angle));
            y = k + (b * Math.sin(angle));
            vertices = new Float32Array([
                h, k,
                (h + a), k,
                x, y
            ]);

            let FirstX = x;
            let FirstY = y;
            let SecondX = h + a;
            let SecondY = k;



            gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
            gl.drawArrays(gl.TRIANGLES, 0, 3);


        } else if ((i == number)) {

            let FirstX = vertices[4];
            let FirstY = vertices[5];

            let x = h + (a * Math.cos(angle));
            let y = k + (b * Math.sin(angle));
            let updatedPositions = new Float32Array([h, k, vertices[4], vertices[5], Math.round(x * 100) / 100, Math.round(y * 100) / 100]);
            let SecondX = x;
            let SecondY = y;
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, updatedPositions);
            gl.drawArrays(gl.TRIANGLES, 0, 3);



        } else {
            let temp1 = vertices[4];
            let temp2 = vertices[5];

            let x = h + (a * Math.cos(angle)), y = 0;
            if ((angle <= (180 * Math.PI / 180)) && (angle >= 0)) {
                y = k + (b * Math.sqrt((1 - (Math.pow(x - h, 2) / (a * a)))));
            }

            let updatedPositions = new Float32Array(
                [h, k,
                    temp1, temp2,
                    x, y]);

            vertices = updatedPositions;
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, updatedPositions);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            let FirstX = Math.round(temp1 * 100) / 100;
            let FirstY = Math.round(temp2 * 100) / 100;
            let SecondX = Math.round((x) * 100) / 100;
            let SecondY = Math.round(y * 100) / 100;




        }
        angle += (180 / number) * (Math.PI / 180);
    }
    //semiEllipsieOutline(1, a, b, h, k);

    curveAnimation(10, h, k + b, h + a, k, 1, 1, 4, 0, 0, 0, 0, 0, null);

}
function fillWithColorAnimation(edgeVerticesArray, color) {
    /*
        // Create a new Float32Array to hold the colored vertices
        const coloredVertices = new Float32Array(edgeVerticesArray.length + 4);
    
        // Copy the original vertices
        coloredVertices.set(edgeVerticesArray);
    
        // Add the color information (assuming RGBA)
        coloredVertices.set(color, edgeVerticesArray.length);
    
        // Create a buffer and put the colored vertices in it
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, coloredVertices, gl.STATIC_DRAW);
    
        // Set the color attribute pointer
        const aColor = gl.getAttribLocation(shadesrProgram, "aColor");
        gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aColor);
        */
}




export { curveAnimation, lineAnimation, circleAnimation, elipseAnimation, triangleAnimation, rectangleAnimation, semiCircleAnimation, semiElipseAnimation };