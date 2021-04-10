import React, { useRef, useEffect } from "react";
import "./globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import ShuffleArray from "./ShuffleArray.js";
import audio from "../audio/triangles-no-3.ogg";
import cueSet1 from "./cueSet1.js";
import cueSet2 from "./cueSet2.js";

const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.song = null;

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

        p.triangles2 = [];

        p.colours = [];

        p.cueSet1Completed = [];

        p.cueSet2Completed = [];

        p.setup = () => {
            p.song = p.loadSound(audio);
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.noFill();
            p.noLoop();
            p.strokeJoin(p.ROUND);
            p.strokeCap(p.ROUND);
            p.populateTrianglesArray();    
            p.populateTriangles2Array();    
            p.populateColoursArray();  
             
            p.song.onended(p.logCredits);

            for (let i = 0; i < cueSet1.length; i++) {
              let vars = {
                currentCue: i + 1,
                duration: cueSet1[i].duration,
                durationTicks: cueSet1[i].durationTicks,
              };
              p.song.addCue(cueSet1[i].time, p.executeCueSet1, vars);
            }

            for (let i = 0; i < cueSet2.length; i++) {
              let vars = {
                currentCue: i + 1,
                duration: cueSet2[i].duration,
                durationTicks: cueSet2[i].durationTicks,
              };
              p.song.addCue(cueSet2[i].time, p.executeCueSet2, vars);
            }
        };

        p.populateTrianglesArray = () => {
            const sizeLimit = p.height / 8;
            const limitX = p.width + sizeLimit;
            const limitY = p.height + sizeLimit;
            let x = 0 - sizeLimit * 4;
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

        p.populateTriangles2Array = () => {
            const sizeLimit = p.height / 8;
            //center
            let startX = p.width / 2;
            let startY = p.height / 2;
            p.triangles2[0] = [];
            p.triangles2[0].push({
                x: startX,
                y: startY,
                fill: p.color(255,0,0),
                inverse: false
            });
            p.triangles2[0].push({
                x: startX - sizeLimit / 2,
                y: startY,
                fill: p.color(0,255,0),
                inverse: true
            });
            p.triangles2[0].push({
                x: startX + sizeLimit / 2,
                y: startY,
                fill: p.color(0,255,0),
                inverse: true
            });

            for (let i = 1; i <= 12; i++) {
                p.triangles2[i] = [];
                for (let sides = 1; sides <= 4; sides++) {
                    let topRightX = startX;
                    let topRightY = startY  - (sizeLimit * i);
                    let bottomRightX = startX + (sizeLimit * i);
                    let bottomRightY = startY;
                    let bottomLeftX = startX;
                    let bottomLeftY = startY  + (sizeLimit * i);
                    let topLeftX = startX  - (sizeLimit * i);
                    let topLeftY = startY;
                    for (let step = 0; step < i; step++) {
                        //regular
                        p.triangles2[i].push({
                            x: topRightX + (sizeLimit * step),
                            y: topRightY + (sizeLimit * step),
                            fill: p.color(255,0,0),
                            inverse: false
                        });
                        //inverse
                        p.triangles2[i].push({
                            x: topRightX + (sizeLimit * step) - sizeLimit / 2,
                            y: topRightY + (sizeLimit * step),
                            fill: p.color(0,255,0),
                            inverse: true
                        });
                        p.triangles2[i].push({
                            x: topRightX + (sizeLimit * step) + sizeLimit / 2,
                            y: topRightY + (sizeLimit * step),
                            fill: p.color(0,255,0),
                            inverse: true
                        });
                        //regular
                        p.triangles2[i].push({
                            x: bottomRightX - (sizeLimit * step),
                            y: bottomRightY + (sizeLimit * step),
                            fill: p.color(255,0,0),
                            inverse: false
                        });
                        //inverse
                        p.triangles2[i].push({
                            x: bottomRightX - (sizeLimit * step) - sizeLimit / 2,
                            y: bottomRightY + (sizeLimit * step),
                            fill: p.color(0,255,0),
                            inverse: true
                        });
                        p.triangles2[i].push({
                            x: bottomRightX - (sizeLimit * step) + sizeLimit / 2,
                            y: bottomRightY + (sizeLimit * step),
                            fill: p.color(0,255,0),
                            inverse: true
                        });
                        //regular
                        p.triangles2[i].push({
                            x: bottomLeftX - (sizeLimit * step),
                            y: bottomLeftY - (sizeLimit * step),
                            fill: p.color(255,0,0),
                            inverse: false
                        });
                        //inverse
                        p.triangles2[i].push({
                            x: bottomLeftX - (sizeLimit * step) - sizeLimit / 2,
                            y: bottomLeftY - (sizeLimit * step),
                            fill: p.color(0,255,0),
                            inverse: true
                        });
                        p.triangles2[i].push({
                            x: bottomLeftX - (sizeLimit * step) + sizeLimit / 2,
                            y: bottomLeftY - (sizeLimit * step),
                            fill: p.color(0,255,0),
                            inverse: true
                        });
                        //regular
                        p.triangles2[i].push({
                            x: topLeftX + (sizeLimit * step),
                            y: topLeftY - (sizeLimit * step),
                            fill: p.color(255,0,0),
                            inverse: false
                        });
                        //inverse
                        p.triangles2[i].push({
                            x: topLeftX + (sizeLimit * step) - sizeLimit / 2,
                            y: topLeftY - (sizeLimit * step),
                            fill: p.color(0,255,0),
                            inverse: true
                        });
                        p.triangles2[i].push({
                            x: topLeftX + (sizeLimit * step) + sizeLimit / 2,
                            y: topLeftY - (sizeLimit * step),
                            fill: p.color(0,255,0),
                            inverse: true
                        });
                    }
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

        p.draw = () => {
            
        };

        p.colourSwitch = false;

        p.executeCueSet1 = (vars) => {
          if (!p.cueSet1Completed.includes(vars.currentCue)) {
            p.cueSet1Completed.push(vars.currentCue);
            let sizeLimit = p.height / 8;
            p.strokeWeight(sizeLimit / 16);
            p.clear();
            p.background(255);
            let shapeSize = 0;
            const delayAmount = parseInt(vars.duration * 1000) / sizeLimit;
            for(let i = 0; i < sizeLimit; i++){
              setTimeout(
                  function () {
                      p.drawTriangleGrid(p.triangles, sizeLimit * 4, i);
                  },
                  (delayAmount * i)
              );
            }
            p.populateColoursArray(p.colourSwitch);
            p.colourSwitch = !p.colourSwitch;
          }
        };

        p.executeCueSet2 = (vars) => {
          if (!p.cueSet2Completed.includes(vars.currentCue)) {
            p.cueSet2Completed.push(vars.currentCue);
            p.clear();
            p.background(255);
            p.strokeWeight(p.height / 8 / 32);
            let triangles = {}
            let triangle = {}
            let colourPallete = ShuffleArray(p.colourPallete);
            
            let pointer = vars.currentCue;
            let modulo = 8;
            if(pointer >= 88){
              pointer = pointer - 87;
            }
            else if(pointer >= 75){
              pointer = pointer - 74;
              modulo = 13;
            }
            else if(pointer >= 59){
              pointer = pointer - 58;
            }
            else if(pointer >= 46){
              pointer = pointer - 45;
              modulo = 13;
            }
            else if(pointer >= 30){
              pointer = pointer - 29;
            }
            else if(pointer >= 17){
              pointer = pointer - 16;
              modulo = 13;
            }
            let numOfLoops = pointer % modulo ? pointer % modulo : modulo;
            for(let i = 0; i < numOfLoops; i++){
                triangles = p.triangles2[i];
                for(let i = 0; i < triangles.length; i++){
                    triangle = triangles[i];
                    p.fill(colourPallete[i % 6]);
                    p.stroke(0);
                    p.equilateral(triangle.x, triangle.y, p.height/8, triangle.inverse);
                }
            }
            
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
                
            }
            for(let i = 0; i < triangles.length; i++){
                triangle = triangles[i];
                colours = p.colours[i];
                p.fill(colours.colour2);
                p.stroke(colours.stroke2);
                p.equilateral(
                  triangle.x + sizeLimit / 2,
                  triangle.y + sizeLimit / 8,
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

        p.mousePressed = () => {
          if (p.song.isPlaying()) {
            p.song.pause();
          } else {
            if (
              parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
              p.reset();
            }
            //document.getElementById("play-icon").classList.add("fade-out");
            p.canvas.addClass("fade-in");
            p.song.play();
          }
        };

        p.creditsLogged = false;

        p.logCredits = () => {
          if (
            !p.creditsLogged &&
            parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
          ) {
            p.creditsLogged = true;
            console.log(
              "Music By: http://labcat.nz/",
              "\n",
              "Animation By: https://github.com/LABCAT/triangles-no-3"
            );
            p.song.stop();
          }
        };

        p.reset = () => {
          p.clear();
          p.cueSet1Completed = [];
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
