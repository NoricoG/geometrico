import p5 from "p5";

import { ListColors, RandomListColors } from "../../colors";
import { Composition } from "../base";

// TODO: make this breath first with some storage to have consistent order
// let smaller shapes overwrite bigger shapes
// TODO: try slowly animated topAngle
export class PythagorasTreeComposition extends Composition {
    animated = false;

    iterationLimit = Math.round(Math.random() * 4) + 12;
    branchingFactor = 2;

    colors: ListColors;

    minSize = 2;

    // 85-95
    topAngle = Math.random() * 10 + 85;

    constructor(p: p5) {
        super();

        this.createCanvas(p, false);

        this.colors = RandomListColors.getRandom(p);
    }

    draw(p: p5, _: number): void {
        var backgroundColor = p.color(0);
        var colorChoice = Math.random();

        if (this.colors.colors.length == 2) {
            if (colorChoice < 0.15)
                backgroundColor = p.color(0);
            else if (colorChoice < 0.30)
                backgroundColor = p.color(255);
            else if (colorChoice < 0.65)
                // only show rectangles
                backgroundColor = this.colors.color();
            else
                // only show squares
                backgroundColor = this.colors.next().color();
        } else {
            if (colorChoice < 0.5)
                backgroundColor = p.color(0);
            else
                backgroundColor = p.color(255);
        }

        p.background(backgroundColor);

        const margin = 0.1;

        const maxWidth = this.canvasWidth * (1 - margin * 2);
        const maxHeight = this.canvasHeight * (1 - margin * 2);

        const rotate = maxHeight / maxWidth > 1;
        const flip = Math.random() < 0.5;

        var size, bottom;
        var x1, y1, x2, y2, x3, y3, x4, y4;

        if (rotate) {
            // show with stem at left growing right
            size = Math.min(maxHeight / 6, maxWidth / 4);
            bottom = this.middleX - size * 2;

            x1 = bottom + size;
            y1 = this.middleY - size / 2;
            x2 = bottom + size;
            y2 = this.middleY + size / 2;
            x3 = bottom;
            y3 = this.middleY + size / 2;
            x4 = bottom;
            y4 = this.middleY - size / 2;

            if (flip) {
                x1 = this.canvasWidth - x1;
                x2 = this.canvasWidth - x2;
                x3 = this.canvasWidth - x3;
                x4 = this.canvasWidth - x4;

                const y1Copy = y1;
                const y3Copy = y3;
                y1 = y2;
                y3 = y4;
                y2 = y1Copy;
                y4 = y3Copy;
            }
        } else {
            // show with stem at bottom growing up
            size = (Math.min(maxWidth / 6, maxHeight / 4));
            bottom = this.middleY + size * 2;

            x1 = this.middleX - size / 2;
            y1 = bottom - size;
            x2 = this.middleX + size / 2;
            y2 = bottom - size;
            x3 = this.middleX + size / 2;
            y3 = bottom;
            x4 = this.middleX - size / 2;
            y4 = bottom;

            if (flip) {
                y1 = this.canvasHeight - y1;
                y2 = this.canvasHeight - y2;
                y3 = this.canvasHeight - y3;
                y4 = this.canvasHeight - y4;

                const x1Copy = x1;
                const x3Copy = x3;
                x1 = x2;
                x3 = x4;
                x2 = x1Copy;
                x4 = x3Copy;


            }
        }

        // TODO: rotate if widthLimited?

        // initial square


        p.fill(this.colors.color());
        p.quad(x1, y1, x2, y2, x3, y3, x4, y4);

        var iterations = this.iterationLimit;
        var trianglesToCreate = [[x1, y1, x2, y2]];
        var rectanglesToCreate = [];
        while (iterations > 0) {
            //triangle
            this.colors = this.colors.next();
            for (const triangle of trianglesToCreate) {
                const [tx1, ty1, tx2, ty2] = triangle;

                const dx = tx2 - tx1;
                const dy = ty2 - ty1;
                const baseLength = Math.sqrt(dx * dx + dy * dy);

                const baseAngle = (180 - this.topAngle) / 2;
                const height = (baseLength / 2) * Math.tan(p.radians(baseAngle));

                // perpendicular direction (rotate base vector 90 degrees counterclockwise)
                const perpX = -dy / baseLength;
                const perpY = dx / baseLength;

                const xTop = (tx1 + tx2) / 2 - perpX * height;
                const yTop = (ty1 + ty2) / 2 - perpY * height;

                p.fill(this.colors.color());
                p.triangle(tx1, ty1, tx2, ty2, xTop, yTop);

                rectanglesToCreate.push([xTop, yTop, tx1, ty1]);
                rectanglesToCreate.push([tx2, ty2, xTop, yTop]);
            }
            trianglesToCreate = [];

            //rectangle
            this.colors = this.colors.next();
            for (const rectangle of rectanglesToCreate) {
                const [rx1, ry1, rx2, ry2] = rectangle;

                const dx = rx2 - rx1;
                const dy = ry2 - ry1;
                const newLength = Math.sqrt(dx * dx + dy * dy);
                const squareAngle = Math.atan2(dy, dx);

                const x4 = rx1;
                const y4 = ry1;
                const x3 = rx2;
                const y3 = ry2;
                const x2 = x3 + newLength * Math.cos(squareAngle + Math.PI / 2);
                const y2 = y3 + newLength * Math.sin(squareAngle + Math.PI / 2);
                const x1 = x4 + newLength * Math.cos(squareAngle + Math.PI / 2);
                const y1 = y4 + newLength * Math.sin(squareAngle + Math.PI / 2);

                p.fill(this.colors.color());
                p.quad(x1, y1, x2, y2, x3, y3, x4, y4);

                trianglesToCreate.push([x2, y2, x1, y1]);
            }
            rectanglesToCreate = [];

            iterations -= 1;
        }
    }
}
