import p5 from "p5";

export abstract class Colors {
    abstract color(): p5.Color;

    abstract copy(): Colors;

    abstract initial(): Colors;

    abstract next(): Colors;
}

export class ListColors extends Colors {
    colors: p5.Color[] = [];
    currentIndex = 0;

    constructor(colors: p5.Color[], currentIndex?: number) {
        super();
        this.colors = colors;
        if (currentIndex == undefined) {
            this.currentIndex = 0;
        } else {
            this.currentIndex = currentIndex;
        }
    }

    color(): p5.Color {
        return this.colors[this.currentIndex];
    }

    copy(): ListColors {
        return new ListColors(this.colors, this.currentIndex);
    }

    next(): ListColors {
        return new ListColors(this.colors, (this.currentIndex + 1) % this.colors.length);
    }

    initial(): ListColors {
        return new ListColors(this.colors, 0);
    }
}

class BlackWhite extends ListColors {
    constructor(p: p5) {
        p.colorMode(p.RGB);
        super([p.color(0, 0, 0), p.color(255, 255, 255)]);
    }
}

class OppositeColors extends ListColors {
    constructor(p: p5) {
        p.colorMode(p.HSB);
        var hue = Math.random() * 360;
        var invHue = (hue + 180) % 360;
        var colors = [
            p.color(hue, 100, 100),
            p.color(invHue, 100, 100),
        ];

        super(colors);
    }
}

class ThreeOppositeColors extends ListColors {
    constructor(p: p5) {
        p.colorMode(p.HSB);
        var hue = Math.random() * 360;
        var hue2 = (hue + 120) % 360;
        var hue3 = (hue + 240) % 360;
        var colors = [
            p.color(hue, 100, 100),
            p.color(hue2, 100, 100),
            p.color(hue3, 100, 100),
        ];

        super(colors);
    }
}

class FourOppositeColors extends ListColors {
    constructor(p: p5) {
        p.colorMode(p.HSB);
        var hue = Math.random() * 360;
        var hue2 = (hue + 90) % 360;
        var hue3 = (hue + 180) % 360;
        var hue4 = (hue + 270) % 360;
        var colors = [
            p.color(hue, 100, 100),
            p.color(hue2, 100, 100),
            p.color(hue3, 100, 100),
            p.color(hue4, 100, 100),
        ];

        super(colors);
    }
}


export class RandomListColors extends ListColors {

    constructor(p: p5) {
        const weightedOptions: (new (p: p5) => ListColors)[] = [
            ...Array(4).fill(BlackWhite),
            ...Array(3).fill(OppositeColors),
            ...Array(2).fill(ThreeOppositeColors),
            ...Array(1).fill(FourOppositeColors),
        ];

        const chosen = weightedOptions[Math.floor(Math.random() * weightedOptions.length)];
        super(new chosen(p).colors);
    }
}
