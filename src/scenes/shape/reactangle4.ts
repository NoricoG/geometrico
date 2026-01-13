import p5 from "p5";

import { Colors, ListColors, RandomListColors } from "../../colors";
import { Composition } from "../base";


export class Rectangle4Composition extends Composition {
    animated = false;

    iterationLimit = Math.round(Math.random() * 5 + 5);
    branchingFactor = 4;

    colors: ListColors;

    minSize = 5;

    constructor(p: p5) {
        super();

        const fullScreen = Math.random() < 0.5;
        this.createCanvas(p, fullScreen);

        this.colors = RandomListColors.getRandom(p);
    }

    draw(p: p5, _: number): void {
        p.background(255);

        const x1 = 0;
        const y1 = 0;
        const x2 = this.canvasWidth;
        const y2 = 0;
        const x3 = this.canvasWidth;
        const y3 = this.canvasHeight;
        const x4 = 0;
        const y4 = this.canvasHeight;

        this.drawNext(p, this.iterationLimit, this.colors, x1, y1, x2, y2, x3, y3, x4, y4);
    }

    drawNext(p: p5, iterations: number, colors: Colors, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): void {
        p.fill(colors.color());
        p.quad(
            Math.round(x1), Math.round(y1),
            Math.round(x2), Math.round(y2),
            Math.round(x3), Math.round(y3),
            Math.round(x4), Math.round(y4)
        );

        if (iterations <= 0 || (Math.abs(x1 - x2) <= this.minSize && Math.abs(y1 - y2) <= this.minSize)) {
            return;
        }

        // top left
        var newX1 = x1;
        var newY1 = y1;
        var newX2 = (x1 + x2) / 2;
        var newY2 = y1;
        var newX3 = (x1 + x2) / 2;
        var newY3 = (y1 + y3) / 2;
        var newX4 = x1;
        var newY4 = (y1 + y3) / 2;
        this.drawNext(p, iterations - 1, colors.copy(), newX1, newY1, newX2, newY2, newX3, newY3, newX4, newY4);

        // top right
        newX1 = (x1 + x2) / 2;
        newY1 = y1;
        newX2 = x2;
        newY2 = y1;
        newX3 = x2;
        newY3 = (y1 + y3) / 2;
        newX4 = (x1 + x2) / 2;
        newY4 = (y1 + y3) / 2;
        this.drawNext(p, iterations - 1, colors.next(), newX1, newY1, newX2, newY2, newX3, newY3, newX4, newY4);

        // bottom right
        newX1 = (x1 + x2) / 2;
        newY1 = (y1 + y3) / 2;
        newX2 = x2;
        newY2 = (y1 + y3) / 2;
        newX3 = x2;
        newY3 = y3;
        newX4 = (x1 + x2) / 2;
        newY4 = y3;
        this.drawNext(p, iterations - 1, colors.copy(), newX1, newY1, newX2, newY2, newX3, newY3, newX4, newY4);

        // bottom left
        newX1 = x1;
        newY1 = (y1 + y3) / 2;
        newX2 = (x1 + x2) / 2;
        newY2 = (y1 + y3) / 2;
        newX3 = (x1 + x2) / 2;
        newY3 = y3;
        newX4 = x1;
        newY4 = y3;
        this.drawNext(p, iterations - 1, colors.next(), newX1, newY1, newX2, newY2, newX3, newY3, newX4, newY4);
    }
}
