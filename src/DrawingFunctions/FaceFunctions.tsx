import { triangleAnimation, curveAnimation, lineAnimation, circleAnimation, elipseAnimation, semiElipseAnimation } from
    "./DrawingFunctions.tsx";
import { gl, uColor1, uColor2 } from '../pages/webPage_Components/AISoftware/AiSoftware';

export let hairPoints: number[] = [], leftEarPotentialHairBounds: number[], rightEarPotentialHairBounds: number[];
let eyeHeight: number, noseHeight: number, UpperEarPosition: number, LowerEarPosition: number,
    UpperTheta, LowerTheta,
    earMiddle, earLeftPoints: number[] = [], earRightPoints: number[] = [], leftEarCurves: any[] = new Array(), rightEarCurves: any[] = new Array(), earPointCount: number = 0;



function DrawHair(HairInputArray: number[]) {
    //hair drawing

    let rightSortedXValues = new Array(),
        leftSortedXValues = new Array(),
        sortedYValues = new Array();
    corrdinateXValuesArray(rightEarPotentialHairBounds, "right");
    corrdinateXValuesArray(leftEarPotentialHairBounds, "left");

    corrdinateYValueArray(rightEarPotentialHairBounds);
    sortNumbersAscending(rightSortedXValues);
    sortNumbersAscending(leftSortedXValues);
    sortNumbersAscending(sortedYValues);


    HairType1BasePart();
    HairType1Strands();
    function HairType1BasePart() {
        let tempArray: number[] = [];
        if (!gl) {
            return;
        }
        gl.uniform3fv(uColor1, [0.386, 0.738, 0.990]);
        gl.uniform3fv(uColor2, [0.386, 0.738, 0.990]);
        let isColorToggled1 = false;
        //right side hair
        for (let hairMove1: number = 0.001, count: number = 0, hairCenter: number = 0.98, hairPosition: number = hairPoints[hairPoints.length - 6]; hairPosition > hairPoints[hairPoints.length - 8];
            hairPosition -= hairMove1, hairCenter > 0.9 ? hairCenter -= hairMove1 : hairCenter -= 0, count++) {
            let upperEarCurveBound1 = shapeObject([rightEarCurves[rightEarCurves.length - 2], rightEarCurves[rightEarCurves.length - 4]], [rightEarCurves[rightEarCurves.length - 1], rightEarCurves[rightEarCurves.length - 3]]);
            let lowerEarCurveBound2 = shapeObject([rightEarCurves[rightEarCurves.length - 8], rightEarCurves[rightEarCurves.length - 6]], [rightEarCurves[rightEarCurves.length - 7], rightEarCurves[rightEarCurves.length - 5]]);

            hairMove1 = 0.001;

            curveAnimation(HairInputArray[0], 0, hairCenter, hairPosition, hairPoints[hairPoints.length - 5], 1, 1, 4, 0,
                HairInputArray[4] >= rightSortedXValues[0] ? HairInputArray[4] : rightSortedXValues[0],
                HairInputArray[5] < rightSortedXValues[rightSortedXValues.length - 1] ? HairInputArray[5] : rightSortedXValues[rightSortedXValues.length - 1],
                HairInputArray[6] <= sortedYValues[sortedYValues.length - 1] ? HairInputArray[6] : sortedYValues[sortedYValues.length - 1],
                HairInputArray[7] >= sortedYValues[0] ? HairInputArray[7] : sortedYValues[0],
                upperEarCurveBound1);
            curveAnimation(HairInputArray[0], hairPosition + 0.01, hairPoints[1], hairPosition, hairPoints[hairPoints.length - 5], 1, 1, 3, 0,
                HairInputArray[4] >= rightSortedXValues[0] ? HairInputArray[4] : rightSortedXValues[0],
                HairInputArray[5] < rightSortedXValues[rightSortedXValues.length - 1] ? HairInputArray[5] : rightSortedXValues[rightSortedXValues.length - 1],
                HairInputArray[6] <= sortedYValues[sortedYValues.length - 1] ? HairInputArray[6] : sortedYValues[sortedYValues.length - 1],
                HairInputArray[7] >= sortedYValues[0] ? HairInputArray[7] : sortedYValues[0],
                lowerEarCurveBound2);

            if ((count % HairInputArray[1] == 0) || (count == 0)) {
                if (isColorToggled1 == false) {
                    if (!uColor1 || !uColor2) {
                        return;
                    }
                    toggleColor(uColor1, uColor2, [0.0200, 1.00, 0.314]);
                    isColorToggled1 = true;
                } else {
                    if (!uColor1 || !uColor2) {
                        return;
                    }
                    toggleColor(uColor1, uColor2, [0.386, 0.738, 0.990]);
                    isColorToggled1 = false;

                }

            }






            if (hairPosition - hairMove1 < hairPoints[hairPoints.length - 8]) {
                tempArray.push(hairPosition, hairPoints[hairPoints.length - 5]);
            }
        };
        //left side hair color
        let isColorToggled2 = false;
        gl.uniform3fv(uColor1, [0.0200, 1.00, 0.314]);
        gl.uniform3fv(uColor2, [0.0200, 1.00, 0.314]);

        for (let hairMove1: number = 0.001, count: number = 0, hairCenter: number = 0.98, hairPosition: number = hairPoints[hairPoints.length - 10]; hairPosition < hairPoints[hairPoints.length - 12];
            hairPosition += hairMove1, hairCenter > 0.9 ? hairCenter -= hairMove1 : hairCenter -= 0, count++) {
            let upperEarCurveBound1 = shapeObject([leftEarCurves[leftEarCurves.length - 2], leftEarCurves[leftEarCurves.length - 4]], [leftEarCurves[leftEarCurves.length - 1], leftEarCurves[leftEarCurves.length - 3]]);
            let lowerEarCurveBound2 = shapeObject([leftEarCurves[leftEarCurves.length - 8], leftEarCurves[leftEarCurves.length - 6]], [leftEarCurves[leftEarCurves.length - 7], leftEarCurves[leftEarCurves.length - 5]]);

            hairMove1 = 0.001;
            curveAnimation(HairInputArray[0], 0, hairCenter, hairPosition, hairPoints[hairPoints.length - 9], 1, 1, 2, 0,
                HairInputArray[2] >= leftSortedXValues[0] ? HairInputArray[2] : leftSortedXValues[0],
                HairInputArray[3] < leftSortedXValues[leftSortedXValues.length - 1] ? HairInputArray[3] : leftSortedXValues[leftSortedXValues.length - 1],
                HairInputArray[6] <= sortedYValues[sortedYValues.length - 1] ? HairInputArray[6] : sortedYValues[sortedYValues.length - 1],
                HairInputArray[7] >= sortedYValues[0] ? HairInputArray[7] : sortedYValues[0],
                upperEarCurveBound1);
            curveAnimation(HairInputArray[0], hairPosition - 0.01, hairPoints[1], hairPosition, hairPoints[hairPoints.length - 9], 1, 1, 3, 0,
                HairInputArray[2] >= leftSortedXValues[0] ? HairInputArray[2] : leftSortedXValues[0],
                HairInputArray[3] < leftSortedXValues[leftSortedXValues.length - 1] ? HairInputArray[3] : leftSortedXValues[leftSortedXValues.length - 1],
                HairInputArray[6] <= sortedYValues[sortedYValues.length - 1] ? HairInputArray[6] : sortedYValues[sortedYValues.length - 1],
                HairInputArray[7] >= sortedYValues[0] ? HairInputArray[7] : sortedYValues[0],
                lowerEarCurveBound2);


            if ((count % HairInputArray[1] == 0) || (count == 0)) {

                if (isColorToggled2 == false) {
                    if (!uColor1 || !uColor2) {
                        return;
                    }
                    toggleColor(uColor1, uColor2, [0.0200, 1.00, 0.314]);
                    isColorToggled2 = true;
                }
                else {
                    if (!uColor1 || !uColor2) {
                        return;
                    }
                    toggleColor(uColor1, uColor2, [0.386, 0.738, 0.990]);
                    isColorToggled2 = false;

                }

            }
            if (hairPosition + hairMove1 > hairPoints[hairPoints.length - 12]) {
                tempArray.push(hairPosition, hairPoints[hairPoints.length - 9]);
            }
        }
        // hair Outline
        gl.uniform3fv(uColor1, [0.1, 0.1, 0.1]);
        gl.uniform3fv(uColor2, [0.1, 0.1, 0.1]);
        console.log(hairPoints);
        console.log(tempArray);
        curveAnimation(HairInputArray[0], hairPoints[24] - 0.05, -0.50, tempArray[2], tempArray[3], 1, 1, 3, 0.5, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[24] - 0.05, -0.50, tempArray[2], -tempArray[3], 1, 1, 3, 0.5, 0, 0, 0, 0, null);

        curveAnimation(HairInputArray[0], hairPoints[26] - 0.05, 0, tempArray[2], tempArray[3], 1, 1, 3, 0.5, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[26] - 0.025, tempArray[3] + 0.2, hairPoints[26] - 0.05, 0, 1, 1, 2, 0, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[24] - 0.08, 0.5, hairPoints[26] - 0.025, tempArray[3] + 0.2, 1, 1, 2, 0, 0, 0, 0, 0, null);


        curveAnimation(HairInputArray[0], hairPoints[24], 0, hairPoints[26] - 0.025, tempArray[3] + 0.2, 1, 1, 3, 0, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[24] + 0.05, 0.4, hairPoints[24], 0, 1, 1, 2, 0, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[22], 0.7, hairPoints[24] + 0.05, 0.4, 1, 1, 2, 0, 0, 0, 0, 0, null);

        curveAnimation(HairInputArray[0], hairPoints[20] + 0.05, 0.15, hairPoints[24] + 0.05, 0.4, 1, 1, 3, 0, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[22], 0.7, hairPoints[24] + 0.05, 0.4, 1, 1, 2, 0, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[20] + 0.1, 0.4, hairPoints[20] + 0.05, 0.15, 1, 1, 2, 0, 0, 0, 0, 0, null);

        curveAnimation(HairInputArray[0], hairPoints[18] + 0.12, -0.1, hairPoints[20] + 0.1, 0.4, 1, 1, 3, 0.6, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[18] + 0.12, -0.1, hairPoints[16] + 0.1, 0.4, 1, 1, 1, 0.6, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[16] + 0.1, 0.4, hairPoints[14] + 0.15, 0.05, 1, 1, 4, 0.6, 0, 0, 0, 0, null);

        curveAnimation(HairInputArray[0], hairPoints[14] + 0.15, 0.05, hairPoints[12] + 0.15, 0.4, 1, 1, 1, 0, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[12] + 0.15, 0.4, hairPoints[10] + 0.15, 0.05, 1, 1, 4, 0, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[10] + 0.15, 0.05, hairPoints[8] + 0.15, 0.4, 1, 1, 1, 0, 0, 0, 0, 0, null);

        curveAnimation(HairInputArray[0], hairPoints[10] + 0.15, -0.54, hairPoints[8] + 0.15, 0.4, 1, 1, 1, 0, 0, 0, 0, 0, null);
        curveAnimation(HairInputArray[0], hairPoints[10] + 0.15, -0.54, tempArray[0], tempArray[1], 1, 1, 1, 0, 0, 0, 0, 0, null);
        //hairTopColor
        gl.uniform3fv(uColor1, [0.0600, 0.3, 0]);
        gl.uniform3fv(uColor2, [0.0600, 0.3, 0]);
        //semiCircleAnimation(linePointsQuantity, (Math.abs(hairPoints[26] - 0.025) - (hairPoints[18] + 0.12)), hairPoints[18] + 0.12, 0.4);
        semiElipseAnimation(HairInputArray[0], (Math.abs((hairPoints[8] + 0.15))), 0.5, hairPoints[18] + 0.12, 0.4);
        colorHairStrands(HairInputArray[0], hairPoints[26] - 0.05, hairPoints[26] - 0.025, 0, tempArray[3] + 0.2, 2);



    }

    function sortNumbersAscending(arr: number[]) {

        arr.sort((a, b) => a - b); // Sorts in place

    }
    function corrdinateXValuesArray(originalArray: number[], earType: string) {
        if (earType === "left") {
            for (let i = 0; i < originalArray.length; i += 2) {
                leftSortedXValues.push(originalArray[i]);
            }
        } else if (earType === "right") {
            for (let i = 0; i < originalArray.length; i += 2) {
                rightSortedXValues.push(originalArray[i]);
            }
        } else {
            console.log("Invalid ear type provided. Please use 'left' or 'right'.");
        }
    }
    function corrdinateYValueArray(originalArray: number[]) {
        for (let i = 1; i <= originalArray.length; i += 2) {
            sortedYValues.push(originalArray[i]);
        }
    }

    function HairType1Strands() {

    }

    hairPoints = [];

}

function DrawEar(EarInputArray: any[]) {
    earPointCount = EarInputArray[1];
    if (!gl) {
        return;
    }
    gl.uniform3fv(uColor1, [0.988, 0.906, 0.839]);
    gl.uniform3fv(uColor2, [(0.988 * 0.3), (0.906 * 0.3), (0.839 * 0.3)]);
    earMiddle = noseHeight > 1 ? eyeHeight - noseHeight : Math.abs(eyeHeight + noseHeight);

    if (EarInputArray[0] === "left") {
        //bottom
        for (let curvePart = EarInputArray[2]; curvePart <= 1; curvePart += 0.01) {
            curveAnimation(EarInputArray[1], (-1 * LowerEarPosition) - 0.01, noseHeight - 0.03, (-1 * LowerEarPosition) + 0.015, noseHeight,
                1, 1, 1, curvePart, 0, 0, 0, 0, null);
        }

        earLeftPoints.push((-1 * LowerEarPosition) + 0.015, noseHeight);
        earLeftPoints.push((-1 * LowerEarPosition) - 0.01, noseHeight - 0.03);
        hairPoints.push((-1 * LowerEarPosition) - 0.01, noseHeight - 0.03);
        leftEarCurves.push("curve");
        leftEarCurves.push([EarInputArray[1], ((-1 * LowerEarPosition) - 0.01), (noseHeight - 0.03), ((-1 * LowerEarPosition) + 0.015), noseHeight,
            1, 1, 1, EarInputArray[2], 0, 0, 0, 0]);
        for (let curvePart = EarInputArray[3]; curvePart <= 1; curvePart += 0.01) {

            curveAnimation(EarInputArray[1], (-1 * LowerEarPosition) - 0.01, noseHeight - 0.03, (-1 * UpperEarPosition) - 0.08, noseHeight + earMiddle,
                1, 1, 3, curvePart, 0, 0, 0, 0, null);
        }
        earLeftPoints.push((-1 * UpperEarPosition) - 0.08, noseHeight + earMiddle);
        leftEarCurves.push("curve", [EarInputArray[1], ((-1 * LowerEarPosition) - 0.01), (noseHeight - 0.03), ((-1 * UpperEarPosition) - 0.08), (noseHeight + earMiddle),
            1, 1, 3, EarInputArray[3], 0, 0, 0, 0]);

        for (let curvePart = EarInputArray[4]; curvePart <= 1; curvePart += 0.01) {

            curveAnimation(EarInputArray[1], (-1 * UpperEarPosition) - 0.08, noseHeight + earMiddle, (-1 * UpperEarPosition) - 0.1, eyeHeight,
                1, 1, 3, curvePart, 0, 0, 0, 0, null);
        }
        earLeftPoints.push((-1 * UpperEarPosition) - 0.1, eyeHeight);
        hairPoints.push((-1 * UpperEarPosition) - 0.1, eyeHeight);
        leftEarCurves.push("curve", [EarInputArray[1], (-1 * UpperEarPosition) - 0.08, noseHeight + earMiddle, (-1 * UpperEarPosition) - 0.1, eyeHeight,
            1, 1, 3, EarInputArray[4], 0, 0, 0, 0]);

        for (let curvePart = EarInputArray[5]; curvePart <= 1; curvePart += 0.01) {

            curveAnimation(EarInputArray[1], (-1 * UpperEarPosition) - 0.05, eyeHeight + 0.05, (-1 * UpperEarPosition) - 0.1, eyeHeight,
                1, 1, 2, curvePart, 0, 0, 0, 0, null);
        }
        earLeftPoints.push((-1 * UpperEarPosition) - 0.05, eyeHeight + 0.05);
        leftEarCurves.push("curve", [EarInputArray[1], (-1 * UpperEarPosition) - 0.05, eyeHeight + 0.05, (-1 * UpperEarPosition) - 0.1, eyeHeight,
            1, 1, 2, EarInputArray[5], 0, 0, 0, 0]);
        //top
        for (let curvePart = EarInputArray[6]; curvePart <= 1; curvePart += 0.01) {

            curveAnimation(EarInputArray[1], (-1 * UpperEarPosition) - 0.05, eyeHeight + 0.05, (-1 * UpperEarPosition), eyeHeight,
                1, 1, 4, curvePart, 0, 0, 0, 0, null);
        }
        earLeftPoints.push((-1 * UpperEarPosition), eyeHeight);
        leftEarCurves.push("curve", [EarInputArray[1], (-1 * UpperEarPosition) - 0.05, eyeHeight + 0.05, (-1 * UpperEarPosition), eyeHeight,
            1, 1, 4, EarInputArray[6], 0, 0, 0, 0]);
        fillEar("left");
        InnerEarDetails(earLeftPoints, "left");
        leftEarPotentialHairBounds = earLeftPoints.slice(2);
        earLeftPoints = [];



    } else if (EarInputArray[0] === "right") {
        //bottom
        for (let curvePart = EarInputArray[2]; curvePart <= 1; curvePart += 0.01) {
            curveAnimation(EarInputArray[1], (LowerEarPosition) + 0.01, noseHeight - 0.03, (LowerEarPosition) - 0.015, noseHeight,
                1, 1, 3, curvePart, 0, 0, 0, 0, null);
        }
        earRightPoints.push((LowerEarPosition) - 0.015, noseHeight);

        earRightPoints.push((LowerEarPosition) + 0.01, noseHeight - 0.03);
        hairPoints.push((LowerEarPosition) + 0.01, noseHeight - 0.03);
        rightEarCurves.push("curve", [EarInputArray[1], (LowerEarPosition) + 0.01, noseHeight - 0.03, (LowerEarPosition) - 0.015, noseHeight,
            1, 1, 3, EarInputArray[2], 0, 0, 0, 0]);


        for (let curvePart = EarInputArray[3]; curvePart <= 1; curvePart += 0.01) {

            curveAnimation(EarInputArray[1], (LowerEarPosition) + 0.01, noseHeight - 0.03, (UpperEarPosition) + 0.08, noseHeight + earMiddle,
                1, 1, 1, curvePart, 0, 0, 0, 0, null);
        }
        earRightPoints.push((UpperEarPosition) + 0.08, noseHeight + earMiddle);
        rightEarCurves.push("curve", [EarInputArray[1], (LowerEarPosition) + 0.01, noseHeight - 0.03, (UpperEarPosition) + 0.08, noseHeight + earMiddle,
            1, 1, 1, EarInputArray[3], 0, 0, 0, 0]);




        for (let curvePart = EarInputArray[4]; curvePart <= 1; curvePart += 0.01) {

            curveAnimation(EarInputArray[1], (UpperEarPosition) + 0.08, noseHeight + earMiddle, (UpperEarPosition) + 0.1, eyeHeight,
                1, 1, 1, curvePart, 0, 0, 0, 0, null);
        }
        earRightPoints.push((UpperEarPosition) + 0.1, eyeHeight);
        hairPoints.push((UpperEarPosition) + 0.1, eyeHeight);
        rightEarCurves.push("curve", [EarInputArray[1], (UpperEarPosition) + 0.08, noseHeight + earMiddle, (UpperEarPosition) + 0.1, eyeHeight,
            1, 1, 1, EarInputArray[4], 0, 0, 0, 0]);


        for (let curvePart = EarInputArray[5]; curvePart <= 1; curvePart += 0.01) {

            curveAnimation(EarInputArray[1], (UpperEarPosition) + 0.05, eyeHeight + 0.05, (UpperEarPosition) + 0.1, eyeHeight,
                1, 1, 4, curvePart, 0, 0, 0, 0, null);
        }
        earRightPoints.push((UpperEarPosition) + 0.05, eyeHeight + 0.05);
        rightEarCurves.push("curve", [EarInputArray[1], (UpperEarPosition) + 0.05, eyeHeight + 0.05, (UpperEarPosition) + 0.1, eyeHeight,
            1, 1, 4, EarInputArray[5], 0, 0, 0, 0]);


        for (let curvePart = EarInputArray[6]; curvePart <= 1; curvePart += 0.01) {

            curveAnimation(EarInputArray[1], (UpperEarPosition) + 0.05, eyeHeight + 0.05, (UpperEarPosition), eyeHeight,
                1, 1, 2, curvePart, 0, 0, 0, 0, null);
        }
        rightEarCurves.push("curve", [EarInputArray[1], (UpperEarPosition) + 0.05, eyeHeight + 0.05, (UpperEarPosition), eyeHeight,
            1, 1, 2, EarInputArray[6], 0, 0, 0, 0]);


        earRightPoints.push((UpperEarPosition), eyeHeight);
        fillEar("right");
        InnerEarDetails(earRightPoints, "right")
        rightEarPotentialHairBounds = earRightPoints.slice(2);
        earRightPoints = [];


    }
    function fillEar(earside: string) {
        if (earside === "left") {
            if (!gl) {
                return;
            }
            gl.uniform3fv(uColor1, [0.988, 0.906, 0.839]);
            gl.uniform3fv(uColor2, [(0.988 * 0.3), (0.906 * 0.3), (0.839 * 0.3)]);
            triangleAnimation(earLeftPoints[8], earLeftPoints[9], earLeftPoints[10], earLeftPoints[11], earLeftPoints[12], earLeftPoints[13]);
            triangleAnimation(earLeftPoints[0], earLeftPoints[1], earLeftPoints[6], earLeftPoints[7], earLeftPoints[2], earLeftPoints[3]);
            triangleAnimation(earLeftPoints[12], earLeftPoints[13], earLeftPoints[6], earLeftPoints[7], earLeftPoints[0], earLeftPoints[1]);
            triangleAnimation(earLeftPoints[12], earLeftPoints[13], earLeftPoints[8], earLeftPoints[9], earLeftPoints[6], earLeftPoints[7]);
            triangleAnimation(earLeftPoints[6], earLeftPoints[7], earLeftPoints[4], earLeftPoints[5], earLeftPoints[2], earLeftPoints[3]);
        }
        else if (earside === "right") {
            if (!gl) {
                return;
            }
            gl.uniform3fv(uColor1, [0.988, 0.906, 0.839]);
            gl.uniform3fv(uColor2, [(0.988 * 0.3), (0.906 * 0.3), (0.839 * 0.3)]);
            triangleAnimation(earRightPoints[8], earRightPoints[9], earRightPoints[10], earRightPoints[11], earRightPoints[12], earRightPoints[13]);
            triangleAnimation(earRightPoints[0], earRightPoints[1], earRightPoints[6], earRightPoints[7], earRightPoints[2], earRightPoints[3]);
            triangleAnimation(earRightPoints[12], earRightPoints[13], earRightPoints[6], earRightPoints[7], earRightPoints[0], earRightPoints[1]);
            triangleAnimation(earRightPoints[12], earRightPoints[13], earRightPoints[8], earRightPoints[9], earRightPoints[6], earRightPoints[7]);
            triangleAnimation(earRightPoints[6], earRightPoints[7], earRightPoints[4], earRightPoints[5], earRightPoints[2], earRightPoints[3]);
        }



    }
}
function InnerEarDetails(earPointDetails: number[], eartype: string) {
    if (eartype === "left") {
        if (!gl) {
            return;
        }
        gl.uniform3fv(uColor1, [0.1, 0.1, 0.1]);
        gl.uniform3fv(uColor2, [0.1, 0.1, 0.1]);

        for (let point = earPointDetails.length - 1; point >= 9; point -= 2) {
            if (point > 11) {
                curveAnimation(20, earPointDetails[point - 3], earPointDetails[point - 2] - 0.04, earPointDetails[point - 1] - 0.01, earPointDetails[point] - 0.1
                    , 1, 1, 4, 0.3, 0, 0, 0, 0, null);
                curveAnimation(20, earPointDetails[0] - 0.015, earPointDetails[1] - 0.115, earPointDetails[point - 1] - 0.01, earPointDetails[point] - 0.1,
                    1, 1, 1, 0, 0, 0, 0, 0, null);
            }
            else if (point > 9) {
                curveAnimation(20, earPointDetails[point - 1], earPointDetails[point] - 0.04, earPointDetails[point - 3] + 0.01, earPointDetails[point - 2] - 0.04,
                    1, 1, 2, 0.5, 0, 0, 0, 0, null);
            }


        }

        // inner curve
        curveAnimation(20, earPointDetails[10], earPointDetails[11] - 0.18, earPointDetails[12] - 0.01, earPointDetails[13] - 0.1,
            1, 1, 1, 0, 0, 0, 0, 0, null);
        curveAnimation(20, earPointDetails[10], earPointDetails[11] - 0.18, earPointDetails[8] + 0.02, earPointDetails[9] - 0.1,
            1, 1, 3, 0, 0, 0, 0, 0, null);
        //
        curveAnimation(20, earPointDetails[4] - 0.01, earPointDetails[5] + 0.08, earPointDetails[0] - 0.015, earPointDetails[1] - 0.115,
            1, 1, 3, 0, 0, 0, 0, 0, null);
        curveAnimation(20, earPointDetails[4] - 0.01, earPointDetails[5] + 0.08, earPointDetails[0] - 0.04, earPointDetails[1] - 0.115,
            1, 1, 3, 0, 0, 0, 0, 0, null);
        curveAnimation(20, earPointDetails[0] - 0.01, earPointDetails[1] - 0.01, earPointDetails[0] - 0.04, earPointDetails[1] - 0.115,
            1, 1, 3, 0, 0, 0, 0, 0, null);


    } else if (eartype === "right") {
        if (!gl) {
            return;
        }
        gl.uniform3fv(uColor1, [0.1, 0.1, 0.1]);
        gl.uniform3fv(uColor2, [0.1, 0.1, 0.1]);

        for (let point = earPointDetails.length - 1; point >= 9; point -= 2) {
            if (point > 11) {
                curveAnimation(20, earPointDetails[point - 3], earPointDetails[point - 2] - 0.04, earPointDetails[point - 1] + 0.01, earPointDetails[point] - 0.1
                    , 1, 1, 2, 0.3, 0, 0, 0, 0, null);
                curveAnimation(20, earPointDetails[0], earPointDetails[1] - 0.115, earPointDetails[point - 1] + 0.01, earPointDetails[point] - 0.1,
                    1, 1, 3, 0, 0, 0, 0, 0, null);
            }
            else if (point > 9) {
                curveAnimation(20, earPointDetails[point - 1], earPointDetails[point] - 0.04, earPointDetails[point - 3] - 0.01, earPointDetails[point - 2] - 0.04,
                    1, 1, 4, 0.5, 0, 0, 0, 0, null);
            }


        }

        // inner curve
        curveAnimation(20, earPointDetails[10], earPointDetails[11] - 0.18, earPointDetails[12] + 0.01, earPointDetails[13] - 0.1,
            1, 1, 3, 0, 0, 0, 0, 0, null);
        curveAnimation(20, earPointDetails[10], earPointDetails[11] - 0.18, earPointDetails[8] - 0.02, earPointDetails[9] - 0.1,
            1, 1, 1, 0, 0, 0, 0, 0, null);
        //lower inner curve
        curveAnimation(20, earPointDetails[4] + 0.01, earPointDetails[5] + 0.08, earPointDetails[0], earPointDetails[1] - 0.115,
            1, 1, 1, 0, 0, 0, 0, 0, null);
        //first half lower inner curve
        curveAnimation(20, earPointDetails[4] + 0.01, earPointDetails[5] + 0.08, earPointDetails[0] + 0.025, earPointDetails[1] - 0.2,
            1, 1, 1, 0, 0, 0, 0, 0, null);
        //second half upper inner curve
        curveAnimation(20, earPointDetails[0], earPointDetails[1] - 0.12, earPointDetails[0] + 0.025, earPointDetails[1] - 0.2,
            1, 1, 4, 0, 0, 0, 0, 0, null);

    }
}//copies, a, b, h, k)
function DrawFace(FaceInputArray: number[]) {
    if (!gl) {
        return;
    }
    gl.uniform3fv(uColor1, [0.988, 0.906, 0.839]);
    gl.uniform3fv(uColor2, [(0.988 * 0.3), (0.906 * 0.3), (0.839 * 0.3)]);
    hairPoints[0] = 0;
    hairPoints[1] = (FaceInputArray[4] - FaceInputArray[2]);
    elipseAnimation(FaceInputArray[0], FaceInputArray[1], FaceInputArray[2], FaceInputArray[3], FaceInputArray[4]);
    UpperTheta = Math.sinh((eyeHeight - FaceInputArray[4]) / FaceInputArray[2]);
    UpperEarPosition = FaceInputArray[3] + FaceInputArray[1] * Math.cos(UpperTheta);
    LowerTheta = Math.sinh((noseHeight - FaceInputArray[4]) / FaceInputArray[2]);
    LowerEarPosition = FaceInputArray[3] + FaceInputArray[1] * Math.cos(LowerTheta);
    EditFace();

    function EditFace() {
        if (!gl) {
            return;
        }
        gl.uniform3fv(uColor1, [0.1, 0.1, 0.1]);
        gl.uniform3fv(uColor2, [0.1, 0.1, 0.1]);

        // sketch line left check
        for (let startVX = 0, startVY = -0.9, endVX = - 0.46, endVY = -0.44, copies = 0; copies < 30; copies++, startVX -= 0.001, startVY -= 0.001, endVX -= 0.001, endVY -= 0.001) {


            curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 3, 0.48, 0, 0, 0, 0, null);
        }
        for (let startVX = -0.45, startVY = -0.45, endVX = - 0.52, endVY = -0.05, copies = 0; copies < 30; copies++, startVX -= 0.001, startVY -= 0.001, endVX -= 0.001, endVY -= 0.001) {

            if (copies == 0) {
                earLeftPoints.push(endVX, endVY);
            }
            curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 3, 0.7, 0, 0, 0, 0, null);
        }
        // sketch line right check
        for (let startVX = 0, startVY = -0.9, endVX = 0.46, endVY = -0.44, copies = 0; copies < 30; copies++, startVX += 0.001, startVY -= 0.001, endVX += 0.001, endVY -= 0.001) {
            curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 1, 0.5, 0, 0, 0, 0, null);
        }
        for (let startVX = 0.46, startVY = -0.45, endVX = 0.53, endVY = 0.05, copies = 0; copies < 30; copies++, startVX += 0.001, startVY -= 0.001, endVX += 0.001, endVY -= 0.001) {


            if (copies == 0) {
                earRightPoints.push(endVX, endVY);
            }

            curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 1, 0.7, 0, 0, 0, 0, null);
        }
    }

}


function DrawNose(NoseInputArray: number[]) {
    // Drawing the nose using WebGL
    noseHeight = NoseInputArray[3];
    if (!gl) {
        return;
    }
    gl.uniform3fv(uColor1, [0.1, 0.1, 0.1]);
    gl.uniform3fv(uColor2, [0.1, 0.1, 0.1])
    lineAnimation(NoseInputArray[0], NoseInputArray[1], NoseInputArray[2], NoseInputArray[3]);
    lineAnimation(NoseInputArray[4], NoseInputArray[5], NoseInputArray[6], NoseInputArray[7]);
}
function DrawMouth(MouthInputArray: number[]) {
    if (!gl) {
        return;
    }
    gl.uniform3fv(uColor1, [0.1, 0.1, 0.1]);
    gl.uniform3fv(uColor2, [0.1, 0.1, 0.1])
    // middle line
    curveAnimation(MouthInputArray[0], MouthInputArray[1], MouthInputArray[2], MouthInputArray[3], MouthInputArray[4], MouthInputArray[5], MouthInputArray[6], 1, MouthInputArray[8], MouthInputArray[9], MouthInputArray[10], MouthInputArray[11], MouthInputArray[12], null);
    curveAnimation(MouthInputArray[0], MouthInputArray[1], MouthInputArray[2], ((-1) * MouthInputArray[3]), MouthInputArray[4], MouthInputArray[5], MouthInputArray[6], 3, MouthInputArray[8], MouthInputArray[9], MouthInputArray[10], MouthInputArray[11], MouthInputArray[12], null);

    //lower lip
    curveAnimation(MouthInputArray[0], MouthInputArray[1], (MouthInputArray[2] - 0.04), (-1) * (Math.abs(MouthInputArray[3]) - 0.07), (MouthInputArray[4] - 0.05), MouthInputArray[5], MouthInputArray[6], 3, MouthInputArray[8], MouthInputArray[9], MouthInputArray[10], MouthInputArray[11], MouthInputArray[12], null);
    curveAnimation(MouthInputArray[0], MouthInputArray[1], (MouthInputArray[2] - 0.04), (Math.abs(MouthInputArray[3]) - 0.07), (MouthInputArray[4] - 0.05), MouthInputArray[5], MouthInputArray[6], 1, MouthInputArray[8], MouthInputArray[9], MouthInputArray[10], MouthInputArray[11], MouthInputArray[12], null);

}
function DrawEye(EyeInputArray: number[]) {
    DrawWhitesEye(EyeInputArray[0], EyeInputArray[1], EyeInputArray[2], EyeInputArray[3], EyeInputArray[4]);

    //eye iris drawing
    DrawEyeIris((EyeInputArray[0]) / 2, (EyeInputArray[1] * 0.7), EyeInputArray[2], EyeInputArray[3], EyeInputArray[4]);
    //eye shine drawing
    DrawEyeShine((EyeInputArray[0]) * 2.5, (EyeInputArray[1] * 0.2), ((EyeInputArray[3] - (EyeInputArray[1] * 0.2))), ((EyeInputArray[3] + (EyeInputArray[1] * 0.2))), (EyeInputArray[2] + EyeInputArray[4]) * 0.88);

    //eye color drawing
    DrawEyeColor((EyeInputArray[0]) * 1.25, (EyeInputArray[1] * 0.4), EyeInputArray[3], ((EyeInputArray[4] - EyeInputArray[2]) + (EyeInputArray[1] * 0.4)));
    //Left eye lashes drawing
    DrawEyeLashes("left", (EyeInputArray[0] * 0.25), EyeInputArray[3], (EyeInputArray[2] + EyeInputArray[4]), (EyeInputArray[3] - (EyeInputArray[1] * 0.4)), (EyeInputArray[3] + (EyeInputArray[1] * 0.4)), EyeInputArray[4] - EyeInputArray[2], (EyeInputArray[1] + EyeInputArray[3]), (EyeInputArray[4] * 0.5), (EyeInputArray[3] - EyeInputArray[1]), (EyeInputArray[4] + (EyeInputArray[2] * 0.3)));
    //Right eye lashes drawing
    DrawEyeLashes("right", (EyeInputArray[0] * 0.25), EyeInputArray[3], (EyeInputArray[2] + EyeInputArray[4]), (EyeInputArray[3] - (EyeInputArray[1] * 0.4)), (EyeInputArray[3] + (EyeInputArray[1] * 0.4)), EyeInputArray[4] - EyeInputArray[2], (EyeInputArray[1] + EyeInputArray[3]), (EyeInputArray[4] * 0.5), (EyeInputArray[3] - EyeInputArray[1]), (EyeInputArray[4] + (EyeInputArray[2] * 0.3)));




    function DrawWhitesEye(copies: number, a: number, b: number, h: number, k: number) {
        eyeHeight = k;
        const color = [1, 1, 1];
        const colorDim = color.map(c => c * 0.3);
        if (!gl) {
            return;
        }
        gl.uniform3fv(uColor1, color);
        gl.uniform3fv(uColor2, colorDim);
        elipseAnimation(copies, a, b, h, k);
        elipseAnimation(copies, a, b, -h, k);
    }
    function DrawEyeIris(copies: number, a: number, b: number, h: number, k: number) {
        const color = [0, 0, 0];
        if (!gl) {
            return;
        }
        gl.uniform3fv(uColor1, color);
        gl.uniform3fv(uColor2, color);
        elipseAnimation(copies, a, b, h, k);
        elipseAnimation(copies, a, b, -h, k);
        hairPoints.push(h, k, -h, k);
    }
    function DrawEyeShine(copies: number, radius: number, h1: number, h2: number, k: number) {
        if (!gl) {
            return;
        }
        const color = [1, 1, 1];
        const colorDim = color.map(c => c * 0.3);
        gl.uniform3fv(uColor1, color);
        gl.uniform3fv(uColor2, colorDim);
        circleAnimation(copies, radius, h1, k);
        circleAnimation(copies, radius, -h2, k);
    }
    function DrawEyeColor(copies: number, radius: number, h: number, k: number) {
        if (!gl) {
            return;
        }
        const color1 = [0.386, 0.738, 0.990];
        const color2 = color1.map(c => c * 0.5);
        gl.uniform3fv(uColor1, color1);
        gl.uniform3fv(uColor2, color2);
        circleAnimation(copies, radius, h, k);
        circleAnimation(copies, radius, -h, k);
    }



    function DrawEyeLashes(eyeType: string, Copies: number, StartVX1: number, StartVY1: number, LowVX2: number, LowVX3: number, LowVY3: number, EndVX1: number, EndVY1: number, EndVX2: number, EndVY2: number) {
        if (!gl) {
            return;
        }
        gl.uniform3fv(uColor1, [0, 0, 0]);
        gl.uniform3fv(uColor2, [0, 0, 0])

        if (eyeType === "left") {
            //left eyelashes left half curve
            for (let startVX = (-1 * StartVX1), startVY = StartVY1, endVX = (-1 * EndVX1), endVY = EndVY1, copies = 0; copies < Copies; copies++, startVX += 0.001, startVY += 0.001, endVX -= 0.003, endVY += 0.005) {

                curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 2, 0, 0, 0, 0, 0, null);

            }
            //left eyelashes left half line
            for (let startVX = (-1 * (EndVX1 + (Copies * 0.003))), startVY = EndVY1 + (Copies * 0.005), endVX = (-EndVX1), endVY = EndVY1, copies = 0; copies < 10; copies++, startVX -= 0.001, startVY -= 0.005, endVX += 0.0001, endVY -= 0.004) {
                lineAnimation(startVX, startVY, endVX, endVY);
            }
            //left eyelashes right half curve
            for (let startVX = (-1 * StartVX1), startVY = StartVY1, endVX = (-1 * EndVX2), endVY = EndVY2, copies = 0; copies < Copies; copies++, startVX -= 0.0001, startVY += 0.001, endVX += 0.001, endVY += 0.004) {

                curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 4, 0, 0, 0, 0, 0, null);
            }
            //eye upper line
            for (let startVX = (-1 * EndVX2), startVY = (StartVY1 * 1.1), endVX = (-EndVX1), endVY = (StartVY1 * 0.9), copies = 0; copies < Copies; copies++, startVX += 0.001, startVY += 0.001, endVX += 0.001, endVY += 0.001) {
                curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 2, 0, 0, 0, 0, 0, null);
            }
            for (let startVX = (-1 * EndVX2), startVY = (StartVY1 * 1.1), endVX = ((-1 * EndVX2) + (Copies * 0.001)), endVY = StartVY1 - ((StartVY1 - (EndVY2 + (Copies * 0.004))) * 0.2), copies = 0; copies < Copies; copies++, startVX += 0.001, startVY += 0.001, endVX += 0.001, endVY += 0.001) {

                lineAnimation(startVX, startVY, endVX, endVY);

            }
            //eye lower line
            for (let startVX = LowVX2, startVY = LowVY3, endVX = LowVX3, endVY = LowVY3, copies = 0; copies < Copies; copies++, startVX += 0.001, startVY -= 0.001, endVX -= 0.001, endVY -= 0.001) {

                lineAnimation(-startVX, startVY, -endVX, endVY);

            }

        }
        //right eyelashes left half line
        else if (eyeType === "right") {
            for (let startVX = 0.25, startVY = 0.25, endVX = 0.35, endVY = 0.05, copies = 0; copies < 10; copies++, startVX += 0.0001, startVY += 0.001, endVX += 0.003, endVY += 0.005) {

                curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 4, 0, 0, 0, 0, 0, null);
            }
            //right eyelashes left half line

            for (let startVX = 0.38, startVY = 0.1, endVX = 0.33, endVY = 0.02, copies = 0; copies < 10; copies++, startVX += 0.001, startVY -= 0.005, endVX += 0.001, endVY -= 0.001) {
                lineAnimation(startVX, startVY, endVX, endVY);
            }
            //right eyelashes left half curve

            for (let startVX = 0.25, startVY = 0.25, endVX = 0.14, endVY = 0.15, copies = 0; copies < 10; copies++, startVX -= 0.0001, startVY += 0.001, endVX -= 0.001, endVY += 0.004) {

                curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 2, 0, 0, 0, 0, 0, null);
            }
            //eye upper line

            for (let startVX = 0.15, startVY = 0.30, endVX = 0.35, endVY = 0.25, copies = 0; copies < 5; copies++, startVX -= 0.001, startVY += 0.001, endVX += 0.001, endVY += 0.001) {

                curveAnimation(10, startVX, startVY, endVX, endVY, 1, 1, 4, 0, 0, 0, 0, 0, null);
            }
            lineAnimation(0.15, 0.30, 0.12, 0.25);
            //eye lower line

            for (let startVX = 0.21, startVY = -0.05, endVX = 0.29, endVY = -0.05, copies = 0; copies < 10; copies++, startVX -= 0.001, startVY -= 0.001, endVX += 0.001, endVY -= 0.001) {

                lineAnimation(startVX, startVY, endVX, endVY);

            }
        }
    }
}
function DrawEyeBrows(EyeBrowsInputArray: number[]) {
    //right eyebrow line
    if (!gl) {
        return;
    }
    gl.uniform3fv(uColor1, [0, 0, 0]);
    gl.uniform3fv(uColor2, [0, 0, 0]);
    //right eyebrow line

    curveAnimation(EyeBrowsInputArray[0], EyeBrowsInputArray[1], EyeBrowsInputArray[2], EyeBrowsInputArray[3], EyeBrowsInputArray[4], EyeBrowsInputArray[5], EyeBrowsInputArray[6], 1, EyeBrowsInputArray[8], EyeBrowsInputArray[9], EyeBrowsInputArray[10], EyeBrowsInputArray[11], EyeBrowsInputArray[12], null);


    //Left Eye drawing\

    //left eyebrow line
    curveAnimation(EyeBrowsInputArray[0], ((-1) * EyeBrowsInputArray[1]), EyeBrowsInputArray[2], ((-1) * EyeBrowsInputArray[3]), EyeBrowsInputArray[4], EyeBrowsInputArray[5], EyeBrowsInputArray[6], 2, EyeBrowsInputArray[8], EyeBrowsInputArray[9], EyeBrowsInputArray[10], EyeBrowsInputArray[11], EyeBrowsInputArray[12], null);

}
function toggleColor(uColor1: WebGLUniformLocation, uColor2: WebGLUniformLocation, color: number[]) {
    // Set the uniform value
    if (!gl) {
        return;
    }
    gl.uniform3fv(uColor1, color);
    gl.uniform3fv(uColor2, color);
}
function colorHairStrands(linePointsQuantity: number, FirstCurveX: number, SecondCurveX: number, StartY: number, EndY: number, curveType: number) {
    // Function to color hair strands
    if (!gl) {
        return;
    }
    gl.uniform3fv(uColor1, [0.0600, 0.3, 0]);
    gl.uniform3fv(uColor2, [0.0600, 0.3, 0]);
    for (let i: number = 0.01; SecondCurveX > FirstCurveX; SecondCurveX -= 0.01) {
        curveAnimation(linePointsQuantity + 50, SecondCurveX, EndY, FirstCurveX, StartY, 1, 1, curveType, 0, 0, 0, 0, 0, null);
    }
    gl.uniform3fv(uColor1, [0.1, 0.1, 0.1]);
    gl.uniform3fv(uColor2, [0.1, 0.1, 0.1]);
}
function DrawObject(FaceInputArray: number[], LeftEarInputArray: (string | number)[], RightEarInputArray: (string | number)[], HairInputArray: number[], NoseInputArray: number[], MouthInputArray: number[], EyeInputArray: number[], EyeBrowsInputArray: number[]) {

    DrawFace(FaceInputArray);
    DrawEar(LeftEarInputArray);
    DrawEar(RightEarInputArray);
    DrawNose(NoseInputArray);
    DrawMouth(MouthInputArray);
    DrawEye(EyeInputArray);
    DrawEyeBrows(EyeBrowsInputArray);
    DrawHair(HairInputArray);
}
type ShapeObjectInfo = {
    shapeTypeArray: number[];
    coordinate_array: number[];
};

function shapeObject(shapeTypeArray: number[], coordinate_array: number[]): ShapeObjectInfo {
    return {
        shapeTypeArray,
        coordinate_array,
    };
}


export { DrawHair, DrawEar, DrawFace, DrawNose, DrawMouth, DrawEye, DrawEyeBrows, DrawObject };