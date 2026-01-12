import p5 from "p5";

export abstract class Composition {
    abstract iterationLimit: number;
    abstract animated: boolean;

    abstract draw(p: p5, deltaTime: number): void;
}
