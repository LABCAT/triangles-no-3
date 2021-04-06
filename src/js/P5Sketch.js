import React, { useRef, useEffect } from "react";
import * as p5 from "p5";

const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.shapeSize = 0;

        p.colours = [
          "#52b947",
          "#f3ec19",
          "#f57e20",
          "#ed1f24",
          "#991b4f",
          "#f57e20",
        ];

        p.triangles = [];

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.noFill();
            p.noFill();
            p.strokeJoin(p.ROUND);
            p.strokeCap(p.ROUND);
            const sizeLimit = p.height / 8;
            const limitX = p.width + sizeLimit;
            const limitY = p.height + sizeLimit;
            let x = 0 - sizeLimit;
            let coloursIndex = 0;
            while(x < limitX){
                let y = 0 - sizeLimit;
                x = x + sizeLimit;
                while(y < limitY){
                    p.triangles.push({
                      x: x,
                      y: y,
                      colour: p.color(p.colours[coloursIndex]),
                      colour2: p.color(p.colours[coloursIndex+1]),
                    });
                    coloursIndex = coloursIndex >= 4 ? 0 : coloursIndex + 2;
                    y = y + sizeLimit;
                }
            }
        };

        p.draw = () => {
            const sizeLimit = p.height / 8;
            p.strokeWeight(sizeLimit/16);
            p.background(255);
            p.drawTriangleGrid(p.triangles, sizeLimit, p.shapeSize);
            p.shapeSize++
            p.shapeSize =
              p.shapeSize < sizeLimit - sizeLimit / 8 ? p.shapeSize : 0;
        };

        p.drawTriangleGrid = (triangles, sizeLimit, size) => {
            let triangle = {}
            for(let i = 0; i < triangles.length; i++){
                triangle = triangles[i];
                p.fill(triangle.colour, 127);
                p.equilateral(triangle.x, triangle.y, size);
                p.fill(triangle.colour2, 127);
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
