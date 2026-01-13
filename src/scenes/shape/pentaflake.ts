import p5 from "p5";

import { Colors, ListColors, RandomListColors } from "../../colors";
import { Composition } from "../base";


export class PentaflakeComposition extends Composition {
    animated = false;

    iterationLimit = Math.round(Math.random() * 2 + 4);
    branchingFactor = 6;

    colors: ListColors;

    minSize = 5;

    fitInCanvas: boolean;

    constructor(p: p5) {
        super();

        const fullScreen = Math.random() < 0.5;
        this.fitInCanvas = Math.random() < 0.5;
        this.createCanvas(p, fullScreen);

        this.colors = RandomListColors.getRandom(p);
    }

    draw(p: p5, _: number): void {
        if (this.colors.colors.length > 2) {
            p.background(this.colors.color());
        }

        const radiusFactor = this.fitInCanvas ? 0.5 : 1.5;
        const radius = Math.min(this.canvasWidth, this.canvasHeight) / 2 * radiusFactor;

        this.drawNext(p, this.iterationLimit, this.colors.next(), radius, true, this.middleX, this.middleY);
    }

    drawNext(p: p5, iterations: number, colors: Colors, radius: number, skipDraw: boolean, x: number, y: number): void {
        const points: Array<{ x: number, y: number }> = [];
        const angleStep = (2 * Math.PI) / 5;
        for (let i = 0; i < 5; i++) {
            const angle = -Math.PI / 2 + i * angleStep;
            const nextX = x + radius * Math.cos(angle);
            const nextY = y + radius * Math.sin(angle);
            points.push({ x: nextX, y: nextY });
        }

        if (!skipDraw) {
            p.fill(colors.color());
            p.beginShape();
            for (var i = 0; i < points.length; i++) {
                p.vertex(points[i].x, points[i].y);
            }
            p.endShape(p.CLOSE);
        }

        if (iterations <= 0 || radius < this.minSize) {
            return;
        }

        const newRadius = radius * 0.4;

        for (let i = 0; i < points.length; i++) {
            this.drawNext(p, iterations - 1, colors.next(), newRadius, false, points[i].x, points[i].y);
        }
        this.drawNext(p, iterations - 1, colors.next(), newRadius, false, x, y);
    }
}
