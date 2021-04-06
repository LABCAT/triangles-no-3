import React, { useRef, useEffect } from "react";
import * as p5 from "p5";

const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            //p.noLoop();
            //p.noLoop();
        };

        p.shapeSize = 0;

        p.draw = () => {
            const sizeLimit = p.width / 16;
            const limitX = p.width + sizeLimit;
            const limitY = p.height + sizeLimit;
            let x = 0 - sizeLimit;
            while(x < limitX){
                let y = 0 - sizeLimit;
                x = x + sizeLimit;
                while(y < limitY){
                    p.fill(0, 255, 0);
                    p.equilateral(x, y, p.shapeSize);
                    p.fill(0, 0, 255);
                    p.equilateral(x + sizeLimit / 2, y, p.shapeSize, true);
                    y = y + sizeLimit;
                }
            }
            p.shapeSize++
            p.shapeSize = p.shapeSize <= sizeLimit ? p.shapeSize : 0;
        };


        /*
        * function to draw an equilateral triangle with a set width
        * based on x, y co-oridinates that are the center of the triangle
        * @param {Number} x        - x-coordinate that is at the center of triangle
        * @param {Number} y      	- y-coordinate that is at the center of triangle
        * @param {Number} width    - radius of the hexagon
        */
        p.equilateral = (x, y, width, inverted = false) => {
            const x1 = x - width / 2;
            const y1 = y + width / 2;
            const x2 = x;
            const y2 = y - width / 2;
            const x3 = x + width / 2;
            const y3 = y + width / 2;
            if(inverted){
                p.triangle(x1, y1 - width, x2, y2 + width, x3, y3 - width);
            }
            else {
                p.triangle(x1, y1, x2, y2, x3, y3);
            }
        };

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.redraw();
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
        </div>
    );
};

export default P5Sketch;
