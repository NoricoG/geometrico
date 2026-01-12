import p5 from "p5";

import { Composition } from "./base";

export class DummyComposition extends Composition {
    iterationLimit = 100;

    constructor(p: p5) {
        super();
        const canvasSize = Math.min(p.windowWidth, p.windowHeight);
        p.createCanvas(canvasSize, canvasSize);
    }

    draw(p: p5): void {
        p.background(200);

        this.drawNext(p, this.iterationLimit);
    }

    drawNext(p: p5, iterations: number): void {
        if (iterations <= 0) {
            return;
        }

        console.log(iterations);

        p.text(iterations.toString(), 10 * iterations, 10 * iterations);

        this.drawNext(p, iterations - 1);
    }
}

export class HeavyComposition extends Composition {
    iterationLimit = 14;
    branchingFactor = 2;

    constructor(p: p5) {
        super();
        const canvasSize = Math.min(p.windowWidth, p.windowHeight);
        p.createCanvas(canvasSize, canvasSize);
    }
    draw(p: p5): void {
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
