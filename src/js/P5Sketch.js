import React, { useRef, useEffect } from "react";
import * as p5 from "p5";
import ShuffleArray from "./ShuffleArray.js";

const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.shapeSize = 0;

        p.colourPallete = [
          "#52b947",
          "#f3ec19",
          "#f57e20",
          "#ed1f24",
          "#991b4f",
          "#008080",
        ];

        p.triangles = [];

        p.colours = [];

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.noFill();
            p.noFill();
            p.strokeJoin(p.ROUND);
            p.strokeCap(p.ROUND);
            p.populateTrianglesArray();    
            p.populateColoursArray();    
        };

        p.populateTrianglesArray = () => {
            const sizeLimit = p.height / 8;
            const limitX = p.width + sizeLimit;
            const limitY = p.height + sizeLimit;
            let x = 0 - sizeLimit;
            while(x < limitX){
                let y = 0 - sizeLimit;
                x = x + sizeLimit;
                while(y < limitY){
                    p.triangles.push({
                      x: x,
                      y: y,
                    });
                    y = y + sizeLimit;
                }
            }
        };

        p.populateColoursArray = (inverse = false) => {
            p.colours = [];
            let paletteIndex1 = 0;
            let paletteIndex2 = 0;
            let colourPallete = ShuffleArray(p.colourPallete);
            let black = p.color(0);
            let colour1 = {};
            let colour2 = {};
            for(let i = 0; i < p.triangles.length; i++){
                paletteIndex1 = (i % (colourPallete.length / 2)) * 2;
                paletteIndex2 = paletteIndex1 + 1;
                colour1 = p.color(colourPallete[paletteIndex1]);
                colour2 = p.color(colourPallete[paletteIndex2]);
                p.colours.push({
                  colour1: inverse ? black : colour1,
                  stroke1: inverse ? colour1 : black,
                  colour2: inverse ? black : colour2,
                  stroke2: inverse ? colour2 : black,
                });
            }
        };

        p.colourSwitch = true;

        p.draw = () => {
            const sizeLimit = p.height / 8;
            p.strokeWeight(sizeLimit/16);
            p.background(255);
            p.drawTriangleGrid(p.triangles, sizeLimit, p.shapeSize);
            p.shapeSize++
            p.shapeSize =
              p.shapeSize < sizeLimit * 1 ? p.shapeSize : 0;

            if(p.shapeSize < 1){
                p.populateColoursArray(p.colourSwitch);
                p.colourSwitch = !p.colourSwitch;
            }
        };

        p.drawTriangleGrid = (triangles, sizeLimit, size) => {
            let triangle = {}
            let colours = {};
            for(let i = 0; i < triangles.length; i++){
                triangle = triangles[i];
                colours = p.colours[i];
                
                p.fill(colours.colour1);
                p.stroke(colours.stroke1);
                p.equilateral(triangle.x, triangle.y, size);
                p.fill(colours.colour2);
                p.stroke(colours.stroke2);
                p.equilateral(
                  triangle.x + sizeLimit / 2,
                  triangle.y,
                  size,
                  true
                );
            }
        };

        p.equilateral = (x, y, width, inverted = false) => {
            x = x - width / 2;
            y = inverted ? y - width / 2 : y + width / 2;
            const centerYHelper = inverted ? width / 2 : -width / 2;
            const x1 = x;
            const y1 = y;
            const x2 = x + width / 2;
            const y2 = y + centerYHelper * p.sqrt(3);
            const x3 = x + width;
            const y3 = y;
            p.triangle(x1, y1, x2, y2, x3, y3);
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
