import p5 from "p5";

import { Colors, ListColors, RandomListColors } from "../../colors";
import { Composition } from "../base";

export class AppolonianGasketComposition extends Composition {
    animated = false;

    iterationLimit = 40;
    branchingFactor = 3;

    colors: ListColors;

    minSize = 1;
    minStartSize = 15;

    seenKeys: Set<string> = new Set();

    constructor(p: p5) {
        super();

        const square = Math.random() < 0.5;
        this.createCanvas(p, square);

        this.colors = RandomListColors.getRandom(p);
    }


    draw(p: p5, _: number): void {
        p.background(255);

        const boundingRadius = Math.min(this.canvasWidth, this.canvasHeight) / 2.1;
        var nextCircles = this.drawAt(p, this.middleX, this.middleY, boundingRadius, this.colors);

        var nestedIterations = 0;

        while (nextCircles.length > 0 && nestedIterations++ < this.iterationLimit) {
            const nextNextCircles: Circle[] = [];
            for (const c of nextCircles) {
                var currentColors = this.colors.copy();
                for (let i = 0; i < c.depth; i++) {
                    currentColors = currentColors.next();
                }
                nextNextCircles.push(...this.drawAt(p, c.middle.x, c.middle.y, c.radius(), currentColors));
            }
            nextCircles = nextNextCircles;
        }
    }

    drawAt(p: p5, middleX: number, middleY: number, boundingRadius: number, startingColors: Colors): Circle[] {
        // C1 is the large bounding circle (negative curvature)
        // C2 and C3 are inside, tangent to C1 and each other

        const c1 = new Circle(-1 / boundingRadius, new Coord(middleX, middleY), 0);
        const smallRadius = boundingRadius / 2;
        const c2 = new Circle(1 / smallRadius, new Coord(middleX - smallRadius, middleY), 1);
        const c3 = new Circle(1 / smallRadius, new Coord(middleX + smallRadius, middleY), 1);

        c1.draw(p, startingColors.color());
        startingColors = startingColors.next();
        c2.draw(p, startingColors.color());
        c3.draw(p, startingColors.color());

        // find the 2 seed circles (C4 and C5) that fill the two main holes
        const kSum = c1.curvature + c2.curvature + c3.curvature;
        const kProd = Math.sqrt(Math.abs(c1.curvature * c2.curvature + c2.curvature * c3.curvature + c3.curvature * c1.curvature));
        const k4 = kSum + 2 * kProd;

        const zk1 = c1.middle.scale(c1.curvature);
        const zk2 = c2.middle.scale(c2.curvature);
        const zk3 = c3.middle.scale(c3.curvature);
        const sumZK = zk1.add(zk2).add(zk3);
        const rootZK = (zk1.mul(zk2).add(zk2.mul(zk3)).add(zk3.mul(zk1))).sqrt().scale(2);

        // create both seeds
        const c4 = new Circle(k4, sumZK.add(rootZK).div(k4), 2);
        const c5 = new Circle(k4, sumZK.sub(rootZK).div(k4), 2);

        c4.draw(p, startingColors.color());
        c5.draw(p, startingColors.color());
        startingColors = startingColors.next();

        // start recursion from both seeds to fill top and bottom halves
        const ccA = this.generate(p, startingColors.copy(), c1, c2, c4, 0);
        const ccB = this.generate(p, startingColors.copy(), c2, c3, c4, 0);
        const ccC = this.generate(p, startingColors.copy(), c3, c1, c4, 0);

        const ccD = this.generate(p, startingColors.copy(), c1, c2, c5, 0);
        const ccE = this.generate(p, startingColors.copy(), c2, c3, c5, 0);
        const ccF = this.generate(p, startingColors.copy(), c3, c1, c5, 0);

        var nextCircles = [c2, c3, c4, c5, ...ccA, ...ccB, ...ccC, ...ccD, ...ccE, ...ccF]
        // console.log(`Generated ${nextCircles.length}`);
        nextCircles = nextCircles.filter(c => c !== undefined) as Circle[];
        // console.log(`Filtered to ${nextCircles.length} defined`);
        nextCircles = nextCircles.filter(c => c.radius() > this.minStartSize) as Circle[];
        // console.log(`Filtered to ${nextCircles.length} larger`);
        console.log('Returning', nextCircles.length);
        return nextCircles;

    }

    // Recursive function to find the next circle tangent to three others
    generate(p: p5, colors: Colors, c1: Circle, c2: Circle, c3: Circle, depth: number): Circle[] {
        if (depth > this.iterationLimit) return [];

        // calculate the new curvature k4 = k1 + k2 + k3 + 2 * sqrt(k1k2 + k2k3 + k3k1)
        const kSum = c1.curvature + c2.curvature + c3.curvature;
        const kProd = Math.sqrt(Math.abs(c1.curvature * c2.curvature + c2.curvature * c3.curvature + c3.curvature * c1.curvature));
        const k4 = kSum + 2 * kProd;

        // stop this recursion if the circle would be smaller than minSize
        if (radius(k4) < this.minSize) return [];

        // only proceed if the new circle is smaller (larger k) than its parents, to stop recursion outwards back to larger circles
        if (k4 <= c1.curvature && k4 <= c2.curvature && k4 <= c3.curvature) return [];

        // calculate the new center position
        const zk1 = c1.middle.scale(c1.curvature);
        const zk2 = c2.middle.scale(c2.curvature);
        const zk3 = c3.middle.scale(c3.curvature);
        const sumZK = zk1.add(zk2).add(zk3);
        const rootZK = (zk1.mul(zk2).add(zk2.mul(zk3)).add(zk3.mul(zk1))).sqrt().scale(2);

        // test both roots (+ and -) but only keep the one that is new and smaller
        const candidates = [
            new Circle(k4, sumZK.add(rootZK).div(k4), depth + 1),
            new Circle(k4, sumZK.sub(rootZK).div(k4), depth + 1)
        ];

        const newCircles: Circle[] = [];

        for (const nextCircle of candidates) {
            // curvature check: must be smaller than parents to stay 'inside'
            // duplicate check: not seen before
            // tangency check: must touch all three parents
            if (nextCircle.curvature > c1.curvature &&
                !this.isDuplicate(nextCircle) &&
                this.isTangent(nextCircle, c1, c2, c3)) {

                nextCircle.draw(p, colors.color());
                newCircles.push(nextCircle);

                this.generate(p, colors.next(), c1, c2, nextCircle, depth + 1);
                this.generate(p, colors.next(), c2, c3, nextCircle, depth + 1);
                this.generate(p, colors.next(), c3, c1, nextCircle, depth + 1);
            }
        }
        return newCircles;
    }

    isDuplicate(c: Circle): boolean {
        // rounded to 2 decimal places to deal with small floating point errors
        const multiplier = 100;

        const x = Math.round(c.middle.x * multiplier);
        const y = Math.round(c.middle.y * multiplier);
        const k = Math.round(c.curvature * multiplier);

        const key = `${x},${y},${k}`;

        if (this.seenKeys.has(key)) {
            return true;
        }

        this.seenKeys.add(key);

        return false;
    }

    isTangent(c: Circle, p1: Circle, p2: Circle, p3: Circle): boolean {
        const parents = [p1, p2, p3];

        for (const p of parents) {
            const distCenter = Math.sqrt(Math.pow(c.middle.x - p.middle.x, 2) + Math.pow(c.middle.y - p.middle.y, 2));
            const rSum = c.radius() + p.radius();
            const rDiff = Math.abs(c.radius() - p.radius());

            // 0.1% tolerance based on radius
            const epsilon = Math.max(rSum, rDiff) * 0.001;

            // must be either externally tangent or internally tangent
            const tangent = Math.abs(distCenter - rSum) < epsilon || Math.abs(distCenter - rDiff) < epsilon;
            if (!tangent) return false;
        }
        return true;
    }

}

class Coord {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Coord) { return new Coord(this.x + other.x, this.y + other.y); }
    sub(other: Coord) { return new Coord(this.x - other.x, this.y - other.y); }
    scale(s: number) { return new Coord(this.x * s, this.y * s); }
    div(s: number) { return new Coord(this.x / s, this.y / s); }

    mul(other: Coord) {
        return new Coord(
            this.x * other.x - this.y * other.y,
            this.x * other.y + this.y * other.x
        );
    }

    sqrt() {
        const m = Math.sqrt(this.x * this.x + this.y * this.y);
        const angle = Math.atan2(this.y, this.x);
        return new Coord(Math.sqrt(m) * Math.cos(angle / 2), Math.sqrt(m) * Math.sin(angle / 2));
    }
}

function radius(curvature: number): number {
    return Math.abs(1 / curvature);
}

class Circle {
    curvature: number;
    middle: Coord;
    depth: number;

    constructor(curvature: number, middle: Coord, depth: number) {
        this.curvature = curvature;
        this.middle = middle;
        this.depth = depth;
    }

    radius(): number {
        return radius(this.curvature);
    }

    diameter(): number {
        return 2 * this.radius();
    }

    draw(p: p5, color: p5.Color) {
        p.fill(color);
        p.circle(this.middle.x, this.middle.y, this.diameter());
    }
}
