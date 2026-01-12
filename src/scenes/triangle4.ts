import p5 from "p5";

import { Composition } from "./base";
import { Colors, ListColors, RandomListColors } from "../colors";

export class Triangle4Composition extends Composition {
    animated = false;

    iterationLimit = Math.random() * 3 + 5;
    branchingFactor = 4;
    leaves = Math.pow(this.branchingFactor, this.iterationLimit);

    canvasSize: number;
    middleX: number;
    middleY: number;

    colors: ListColors;

    minSize = 5;

    constructor(p: p5) {
        super();

        this.canvasSize = Math.min(p.windowWidth, p.windowHeight);
        p.createCanvas(this.canvasSize, this.canvasSize);

        this.middleX = this.canvasSize / 2;
        this.middleY = this.canvasSize / 2;

        if (this.leaves > 100000) {
            p.textSize(32);
            p.text("Loading...", 100, 100);
        }

        this.colors = new RandomListColors(p);
    }

    draw(p: p5, _: number): void {
        p.background(255);

        const halfHeight = (this.canvasSize / 2) * Math.sqrt(3) / 2;

        const x1 = this.middleX;
        const y1 = this.middleY - halfHeight;
        const x2 = this.canvasSize;
        const y2 = this.middleY + halfHeight;
        const x3 = 0;
        const y3 = this.middleY + halfHeight;

        this.drawNext(p, this.iterationLimit, this.colors, x1, y1, x2, y2, x3, y3);
    }

    drawNext(p: p5, iterations: number, colors: Colors, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
        p.fill(colors.color());
        p.triangle(x1, y1, x2, y2, x3, y3);

        if (iterations <= 0 || (Math.abs(x1 - x2) <= this.minSize && Math.abs(y1 - y2) <= this.minSize)) {
            return;
        }

        // middle triangle
        const middleX1 = (x2 + x3) / 2;
        const middleY1 = (y2 + y3) / 2;
        const middleX2 = (x3 + x1) / 2;
        const middleY2 = (y3 + y1) / 2;
        const middleX3 = (x1 + x2) / 2;
        const middleY3 = (y1 + y2) / 2;

        this.drawNext(p, iterations - 1, colors.copy(), middleX1, middleY1, middleX2, middleY2, middleX3, middleY3);

        // top triangle
        const topX1 = x1;
        const topY1 = y1;
        const topX2 = middleX3;
        const topY2 = middleY3;
        const topX3 = middleX2;
        const topY3 = middleY2;
        this.drawNext(p, iterations - 1, colors.next(), topX1, topY1, topX2, topY2, topX3, topY3);

        // bottom right triangle
        const rightX1 = x2;
        const rightY1 = y2;
        const rightX2 = middleX1;
        const rightY2 = middleY1;
        const rightX3 = middleX3;
        const rightY3 = middleY3;
        this.drawNext(p, iterations - 1, colors.next(), rightX1, rightY1, rightX2, rightY2, rightX3, rightY3);

        // bottom left triangle
        const leftX1 = x3;
        const leftY1 = y3;
        const leftX2 = middleX2;
        const leftY2 = middleY2;
        const leftX3 = middleX1;
        const leftY3 = middleY1;
        this.drawNext(p, iterations - 1, colors.next(), leftX1, leftY1, leftX2, leftY2, leftX3, leftY3);
    }
}
