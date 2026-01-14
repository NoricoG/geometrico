import p5 from "p5";


export abstract class Composition {
    abstract animated: boolean;

    abstract iterationLimit: number;
    abstract branchingFactor: number;

    canvasWidth: number = -1;
    canvasHeight: number = -1;
    middleX: number = -1;
    middleY: number = -1;

    abstract draw(p: p5, deltaTime: number): void;

    createCanvas(p: p5, square: boolean): void {
        this.canvasWidth = p.windowWidth;
        this.canvasHeight = p.windowHeight;

        if (square) {
            this.canvasWidth = Math.min(this.canvasWidth, this.canvasHeight);
            this.canvasHeight = this.canvasWidth;
        }

        this.middleX = this.canvasWidth / 2;
        this.middleY = this.canvasHeight / 2;

        p.createCanvas(this.canvasWidth, this.canvasHeight)
            .parent("canvas-container");
    }

    showLoadingText(p: p5): void {
        const leaves = Math.pow(this.branchingFactor, this.iterationLimit);
        if (leaves > 10000) {
            // round to two digits followed by 0s
            const digits = Math.floor(Math.log10(leaves));
            const scaling = Math.pow(10, digits - 2);
            const leavesRounded = Math.round(leaves / scaling) * scaling;

            const text = `Loading...\n${this.branchingFactor} ^ ${this.iterationLimit}\n${leavesRounded.toLocaleString()}`

            p.textSize(32);
            p.textAlign(p.CENTER, p.CENTER);
            p.fill('lightgray');
            p.text(text, this.middleX, this.middleY);
        }
    }

}
