import p5 from "p5";

import { Composition } from "./base";

export class DotsComposition extends Composition {
    animated = false;

    iterationLimit = 13;
    branchingFactor = 2;

    constructor(p: p5) {
        super();

        const canvasSize = Math.min(p.windowWidth, p.windowHeight);
        p.createCanvas(canvasSize, canvasSize);

        p.textSize(32);
        p.text("Loading...", 100, 100);
    }
    draw(p: p5, _: number): void {
        p.background(200);

        this.drawNext(p, this.iterationLimit);
        this.drawNext(p, this.iterationLimit);
    }

    drawNext(p: p5, iterations: number): void {
        p.fill(p.color(Math.random() * 255, Math.random() * 255, Math.random() * 255));
        p.circle(Math.random() * p.width, Math.random() * p.height, iterations * 5);

        if (iterations <= 0) {
            return;
        }

        this.drawNext(p, iterations - 1);
        this.drawNext(p, iterations - 1);
    }
}
