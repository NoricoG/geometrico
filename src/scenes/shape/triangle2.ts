import p5 from "p5";

import { Colors, ListColors, RandomListColors } from "../../colors";
import { Composition } from "../base";


export class Triangle2Composition extends Composition {
    animated = false;

    iterationLimit = Math.round(Math.random() * 5 + 5);
    branchingFactor = 2;

    colors: ListColors;

    minSize = 5;

    constructor(p: p5) {
        super();

        this.createCanvas(p, true);

        this.colors = RandomListColors.getRandom(p);
    }

    draw(p: p5, _: number): void {
        p.background(255);

        const halfHeight = (this.canvasHeight / 2) * Math.sqrt(3) / 2;

        const x1 = this.middleX;
        const y1 = this.middleY - halfHeight;
        const x2 = this.canvasWidth;
        const y2 = this.middleY + halfHeight;
        const x3 = 0;
        const y3 = this.middleY + halfHeight;

        this.drawNext(p, this.iterationLimit, this.colors, x1, y1, x2, y2, x3, y3);
    }

    drawNext(p: p5, iterations: number, colors: Colors, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
        p.fill(colors.color());
        p.triangle(
            Math.round(x1), Math.round(y1),
            Math.round(x2), Math.round(y2),
            Math.round(x3), Math.round(y3)
        );

        if (iterations <= 0 || (Math.abs(x1 - x2) <= this.minSize && Math.abs(y1 - y2) <= this.minSize)) {
            return;
        }

        // left triangle
        const leftX1 = (x2 + x3) / 2;
        const leftY1 = (y2 + y3) / 2;
        const leftX2 = x3;
        const leftY2 = y3;
        const leftX3 = x1;
        const leftY3 = y1;

        this.drawNext(p, iterations - 1, colors.next(), leftX1, leftY1, leftX2, leftY2, leftX3, leftY3);

        // right triangle
        const rightX1 = (x2 + x3) / 2;
        const rightY1 = (y2 + y3) / 2;
        const rightX2 = x1;
        const rightY2 = y1;
        const rightX3 = x2;
        const rightY3 = y2;

        this.drawNext(p, iterations - 1, colors.copy(), rightX1, rightY1, rightX2, rightY2, rightX3, rightY3);

    }
}
