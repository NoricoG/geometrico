import p5 from "p5";

import { Colors, ListColors, RandomListColors } from "../../colors";
import { Composition } from "../base";


export class PolyflakeComposition extends Composition {
    animated = false;

    // 5-7
    extraCorners = Math.round(Math.random() * 2)
    corners = 5 + this.extraCorners;

    iterationLimit = Math.round(Math.random() * (3 - this.extraCorners) + 4);
    branchingFactor = this.corners;

    colors: ListColors;

    minSize = 5;

    outsideCanvas: boolean;

    constructor(p: p5) {
        super();

        const square = Math.random() < 0.3;
        this.outsideCanvas = !square && Math.random() < 0.8;
        this.createCanvas(p, square);

        this.colors = RandomListColors.getRandom(p);
    }

    draw(p: p5, _: number): void {
        if (this.colors.colors.length > 2) {
            p.background(this.colors.color());
        }

        const radiusFactor = this.outsideCanvas ? 1.5 : 0.5;
        const radius = Math.min(this.canvasWidth, this.canvasHeight) / 2 * radiusFactor;

        this.drawNext(p, this.iterationLimit, this.colors.next(), radius, true, this.middleX, this.middleY);
    }

    drawNext(p: p5, iterations: number, colors: Colors, radius: number, skipDraw: boolean, x: number, y: number): void {
        const points: Array<{ x: number, y: number }> = [];
        const angleStep = (2 * Math.PI) / this.corners;
        for (let i = 0; i < this.corners; i++) {
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
