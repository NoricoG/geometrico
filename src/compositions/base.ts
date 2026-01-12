import p5 from "p5";

export abstract class Composition {
    abstract iterationLimit: number;

    abstract drawComposition(p: p5): void;
}

export abstract class Animation extends Composition {
    abstract drawFrame(p: p5, deltaTime: number): void;
}
