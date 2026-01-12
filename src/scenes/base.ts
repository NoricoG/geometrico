import p5 from "p5";

export abstract class Composition {
    abstract iterationLimit: number;

    abstract draw(p: p5): void;
}

export abstract class Animation {
    abstract draw(p: p5, deltaTime: number): void;
}
