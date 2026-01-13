import p5 from "p5";

import { Colors, ListColors, RandomListColors } from "../../colors";
import { Composition } from "../base";


export class Circle4Composition extends Composition {
    animated = false;

    iterationLimit = Math.round(Math.random() * 5 + 5);
    branchingFactor = 4;

    colors: ListColors;

    scaling = Math.random() * 0.05 + 0.45;

    minSize = 5;

    constructor(p: p5) {
        super();

        const fullScreen = Math.random() < 0.5;
        this.createCanvas(p, fullScreen);

        this.colors = RandomListColors.getRandom(p);
    }

    draw(p: p5, _: number): void {
        p.background(this.colors.color());

        const x = this.middleX;
        const y = this.middleY;
        const w = this.canvasWidth;
        const h = this.canvasHeight;

        this.drawNext(p, this.iterationLimit, this.colors.next(), x, y, w, h, true);
    }

    drawNext(p: p5, iterations: number, colors: Colors, x: number, y: number, w: number, h: number, skipDraw: boolean): void {
        if (!skipDraw) {
            p.fill(colors.color());
            p.ellipse(x, y, w, h);
        }

        if (iterations <= 0 || w <= this.minSize || h <= this.minSize) {
            return;
        }

        // top
        var newX = x;
        var newY = y - h / 2;
        var newW = w * this.scaling;
        var newH = h * this.scaling;
        this.drawNext(p, iterations - 1, colors.next(), newX, newY, newW, newH, false);

        // right
        newX = x + w / 2;
        newY = y;
        newW = w * this.scaling;
        newH = h * this.scaling;
        this.drawNext(p, iterations - 1, colors.next(), newX, newY, newW, newH, false);

        // bottom
        newX = x;
        newY = y + h / 2;
        newW = w * this.scaling;
        newH = h * this.scaling;
        this.drawNext(p, iterations - 1, colors.next(), newX, newY, newW, newH, false);

        // left
        newX = x - w / 2;
        newY = y;
        newW = w * this.scaling;
        newH = h * this.scaling;
        this.drawNext(p, iterations - 1, colors.next(), newX, newY, newW, newH, false);
    }
}
