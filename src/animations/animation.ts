import p5 from "p5";

export abstract class Animation {
    abstract draw(p: p5, deltaTime: number): void;
}
