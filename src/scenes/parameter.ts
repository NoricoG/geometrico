
export abstract class Parameter {
    abstract currentValue: number;

    abstract increment(deltaTime: number): number;
}

export class StaticParameter extends Parameter {
    currentValue: number;

    constructor(value: number) {
        super();
        this.currentValue = value;
    }

    increment(_: number): number {
        return this.currentValue;
    }
}

export class AnimatedParameter extends Parameter {
    minValue: number;
    maxValue: number;
    bouncing: boolean;
    speed: number;

    currentValue: number;
    increasing: boolean;

    constructor(minValue: number, maxValue: number, bouncing: boolean, speed: number) {
        super();
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.currentValue = Math.random() * (maxValue - minValue) + minValue;
        this.increasing = Math.random() < 0.5;
        this.bouncing = bouncing;
        this.speed = speed;
    }

    increment(deltaTime: number): number {
        if (this.currentValue <= this.minValue) {
            if (this.bouncing) {
                this.increasing = true
            } else {
                this.currentValue = this.maxValue;
            }
        } else if (this.currentValue >= this.maxValue) {
            if (this.bouncing) {
                this.increasing = false
            } else {
                this.currentValue = this.minValue;
            }
        }

        if (this.increasing) {
            this.currentValue += deltaTime * this.speed;
        } else {
            this.currentValue -= deltaTime * this.speed;
        }

        return this.currentValue;
    }
}
