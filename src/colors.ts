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

class BlackColor extends ListColors {
    constructor(p: p5) {
        p.colorMode(p.HSB);

        var hue = Math.random() * 360;
        // between 100-255 to avoid colors being too dull
        var saturation = Math.random() * 155 + 100;
        // between 50-255 to avoid colors being too dark
        var brightness = Math.random() * 205 + 50;

        var colors: p5.Color[] = [];
        colors.push(p.color(hue, saturation, brightness));
        colors.push(p.color(0, 0, 0));

        super(colors);
    }

}

class WhiteColor extends ListColors {
    constructor(p: p5) {
        p.colorMode(p.HSB);

        var hue = Math.random() * 360;
        // between 100-255 to avoid colors being too dull
        var saturation = Math.random() * 155 + 100;
        // between 50-255 to avoid colors being too dark
        var brightness = Math.random() * 205 + 50;

        var colors: p5.Color[] = [];
        colors.push(p.color(hue, saturation, brightness));
        colors.push(p.color(0, 0, 255));

        super(colors);
    }
}

class BlackWhiteColor extends ListColors {
    constructor(p: p5) {
        p.colorMode(p.HSB);

        var hue = Math.random() * 360;
        // between 100-255 to avoid colors being too dull
        var saturation = Math.random() * 155 + 100;
        // between 50-255 to avoid colors being too dark
        var brightness = Math.random() * 205 + 50;

        var colors: p5.Color[] = [];
        colors.push(p.color(hue, saturation, brightness));
        colors.push(p.color(0, 0, 0));
        colors.push(p.color(0, 0, 255));

        // shuffle colors
        var shuffledColors: p5.Color[] = [];
        while (colors.length > 0) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            shuffledColors.push(colors[randomIndex]);
            colors.splice(randomIndex, 1);
        }

        super(shuffledColors);
    }
}

abstract class GivenRangeHue extends ListColors {
    constructor(p: p5, n: number, hueStart: number, hueRange: number) {
        p.colorMode(p.HSB);

        // between 100-255 to avoid colors being too dull
        var saturation = Math.random() * 155 + 100;
        // between 50-255 to avoid colors being too dark
        var brightness = Math.random() * 205 + 50;

        var firstHue = hueStart + Math.random() * hueRange;
        var colors: p5.Color[] = [];
        for (var i = 0; i < n; i++) {
            var newHue = (firstHue + (hueRange / n) * i) % 360;
            colors.push(p.color(newHue, saturation, brightness));
        }

        super(colors);
    }
}

export class OppositeHue extends GivenRangeHue {
    constructor(p: p5, n: number) {
        super(p, n, 0, 360);
    }
}

export class RangeHue extends GivenRangeHue {
    constructor(p: p5, n: number) {
        var hueStart = Math.random() * 360;
        var minimalRange = Math.min(360, 80 + 5 * n);
        var hueRange = Math.random() * (360 - minimalRange) + minimalRange;
        super(p, n, hueStart, hueRange);
    }
}

class OppositeBrightness extends ListColors {
    constructor(p: p5) {
        p.colorMode(p.HSB);

        var hue = Math.random() * 360;

        // between 100-255 to avoid colors being too dull
        var saturation = Math.random() * 155 + 100;

        // between 30-100 to avoid colors being too dark or too close
        var brightness = Math.random() * 70 + 30;
        var invBrightness = 255 - brightness;

        var colors: p5.Color[] = [];
        colors.push(p.color(hue, saturation, brightness));
        colors.push(p.color(hue, saturation, invBrightness));

        super(colors);
    }
}

class OppositeSaturation extends ListColors {
    constructor(p: p5) {
        p.colorMode(p.HSB);

        var hue = Math.random() * 360;

        // between 50-255 to avoid colors being too dark
        var brightness = Math.random() * 205 + 50;

        // between 20-60 to avoid colors being too gray or too close
        var saturation = Math.random() * 40 + 20;
        var invSaturation = 255 - saturation;

        var colors: p5.Color[] = [];
        colors.push(p.color(hue, saturation, brightness));
        colors.push(p.color(hue, invSaturation, brightness));
        super(colors);
    }
}

export class RandomListColors extends ListColors {
    static getRandom(p: p5): ListColors {
        const weightedOptions: ListColors[] = [
            new BlackWhite(p),
            new BlackColor(p),
            new WhiteColor(p),
            new BlackWhiteColor(p),
            new OppositeHue(p, 2),
            new OppositeHue(p, 3),
            new OppositeHue(p, 4),
            new OppositeHue(p, Math.floor(Math.random() * 5 + 5)), // 5-9 colors
            new OppositeHue(p, Math.floor(Math.random() * 10 + 10)), // 10-19 colors
            new OppositeHue(p, Math.floor(Math.random() * 30 + 20)), // 20-49 colors
            new RangeHue(p, 3),
            new RangeHue(p, 4),
            new RangeHue(p, Math.floor(Math.random() * 5 + 5)), // 5-9 colors
            new RangeHue(p, Math.floor(Math.random() * 10 + 10)), // 10-19 colors
            new OppositeBrightness(p),
            new OppositeSaturation(p),

        ];
        const chosenIndex = Math.floor(Math.random() * weightedOptions.length);
        const chosen = weightedOptions[chosenIndex];
        return chosen;
    }
}
