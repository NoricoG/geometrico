import p5 from "p5";

import { Animation } from "./base";
import { ListColors, RandomListColors } from "../colors";

abstract class SizeComposition {
    colors: ListColors;
    canvasWidth: number;
    canvasHeight: number;
    middleX: number;
    middleY: number;

    abstract initialSize: number;

    currentThickness = 0;

    minShapeSize = 1;
    iterationLimit = 500;

    constructor(p: p5) {
        this.colors = new RandomListColors(p);

        this.canvasWidth = p.windowWidth;
        this.canvasHeight = p.windowHeight;
        p.createCanvas(this.canvasWidth, this.canvasHeight);

        this.middleX = p.windowWidth / 2;
        this.middleY = p.windowHeight / 2;
    }

    set(currentThickness: number) {
        this.currentThickness = currentThickness;
    }

    draw(p: p5): void {
        var size = this.initialSize;

        var iterations = 0;
        this.colors = this.colors.initial();
        while (size > this.minShapeSize && iterations < this.iterationLimit) {
            iterations += 1;

            p.fill(this.colors.color())
            this.drawShape(p, size)

            size -= this.currentThickness

            this.colors = this.colors.next();
        }
    }

    abstract drawShape(p: p5, size: number): void;
}

class SquareSizeComposition extends SizeComposition {
    initialSize: number;

    constructor(p: p5) {
        super(p);

        this.initialSize = Math.max(this.canvasWidth, this.canvasHeight);
    }

    drawShape(p: p5, size: number): void {
        p.quad(
            this.middleX - size, this.middleY - size,
            this.middleX + size, this.middleY - size,
            this.middleX + size, this.middleY + size,
            this.middleX - size, this.middleY + size
        )
    }
}

export class CircleSizeComposition extends SizeComposition {
    initialSize: number;

    constructor(p: p5) {
        super(p);

        this.initialSize = Math.max(this.canvasWidth, this.canvasHeight) * 1.4;
    }

    drawShape(p: p5, size: number): void {
        p.circle(this.middleX, this.middleY, size)
    }
}

class TriangleSizeComposition extends SizeComposition {
    initialSize: number;

    constructor(p: p5) {
        super(p);

        this.initialSize = Math.max(this.canvasWidth, this.canvasHeight) * 2.5;
    }

    drawShape(p: p5, size: number): void {
        const height = size * Math.sqrt(3) / 2;
        p.triangle(
            this.middleX, this.middleY - (2 / 3) * height,
            this.middleX - size / 2, this.middleY + (1 / 3) * height,
            this.middleX + size / 2, this.middleY + (1 / 3) * height
        )
    }
}

abstract class SizeAnimation extends Animation {
    abstract composition: SizeComposition;

    minThickness = 15;
    maxThickness = 50;
    currentThickness = Math.random() * (this.maxThickness - this.minThickness) + this.minThickness;
    thicknessIncreasing = Math.random() < 0.5;
    thicknessDelta = Math.random() * 0.001 + 0.001;

    draw(p: p5, deltaTime: number): void {
        if (this.currentThickness <= this.minThickness) {
            this.thicknessIncreasing = true
        } else if (this.currentThickness >= this.maxThickness) {
            this.thicknessIncreasing = false
        }

        if (this.thicknessIncreasing) {
            this.currentThickness += deltaTime * this.thicknessDelta;
        } else {
            this.currentThickness -= deltaTime * this.thicknessDelta;
        }

        this.composition.set(this.currentThickness);
        this.composition.draw(p);
    }
}

export class SquareSizeAnimation extends SizeAnimation {
    composition: SizeComposition;

    constructor(p: p5) {
        super();

        this.composition = new SquareSizeComposition(p);
    }
}

export class CircleSizeAnimation extends SizeAnimation {
    composition: SizeComposition;

    constructor(p: p5) {
        super();

        this.composition = new CircleSizeComposition(p);
    }

}

export class TriangleSizeAnimation extends SizeAnimation {
    composition: SizeComposition;

    constructor(p: p5) {
        super();

        this.composition = new TriangleSizeComposition(p);
    }
}
