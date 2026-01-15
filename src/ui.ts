import p5 from "p5";
import { Composition } from "./scenes/base";
import { RandomListColors } from "./colors";

let inMenu = false;

export const UI = {
    isInMenu(): boolean {
        return inMenu;
    },

    showMenu(composition: Composition, paused: boolean): void {
        if (UI.isInMenu()) {
            // let menu handle clicks
            return;
        }

        const menu = document.getElementById("menu");
        if (!menu) {
            return;
        }

        inMenu = true;
        menu.classList.add('show');

        const menuSpeed = document.getElementById("menu-speed");
        if (menuSpeed) {
            if (composition.animated) {
                menuSpeed.innerText = "Change animation";
                menuSpeed.classList.remove("disabled");
            } else {
                menuSpeed.innerText = "Not animated";
                menuSpeed.classList.add("disabled");
            }
        }

        const menuPause = document.getElementById("menu-pause");
        if (menuPause) {
            if (composition.animated) {
                menuPause.innerText = paused ? "Play" : "Pause";
                menuPause.classList.remove("disabled");
            } else {
                menuPause.innerText = "Not animated";
                menuPause.classList.add("disabled");
            }
        }
    },

    hideMenu(): void {
        const menu = document.getElementById("menu");
        if (!menu) {
            return;
        }

        inMenu = false;
        menu.classList.remove('show');
    },

    setupMenu(p: p5, composition: Composition, playPause: (playOnly: boolean) => void): void {
        const canvasContainer = document.getElementById("canvas-container");
        if (canvasContainer) {
            canvasContainer.onclick = () => {
                if (UI.isInMenu()) {
                    UI.hideMenu();
                } else {
                    UI.showMenu(composition, p.isLooping() ? false : true);
                };
            }
        }

        const setupMenuItem = (id: string, handler: () => void): void => {
            const element = document.getElementById(id);
            if (element) {
                element.onclick = () => {
                    if (element.classList.contains("disabled")) {
                        return;
                    }
                    UI.hideMenu();
                    handler();
                };
            }
        };

        setupMenuItem("menu-next", () => {
            location.reload();
        });

        setupMenuItem("menu-colors", () => {
            composition.colors = RandomListColors.getRandom(p);
            if (!composition.animated) {
                composition.draw(p, 0);
            }
        });

        setupMenuItem("menu-speed", () => {
            if (!composition.animated) {
                return;
            }
            composition.changeAnimatedParameters();
            playPause(true);
        });

        setupMenuItem("menu-pause", () => {
            playPause(false);
        });

        setupMenuItem("menu-save", () => {
            const randomPart = Math.random().toString(36).substring(2, 10);
            const filename = "geometrico_" + randomPart;
            p.saveCanvas(filename, "png");
        });

        setupMenuItem("menu-close", () => {
        });
    },

    showPauseIndicator(symbol: string): void {
        const indicator = document.getElementById("pause-indicator");
        if (!indicator) {
            return;
        }

        indicator.innerText = symbol;

        indicator.classList.remove("show");
        // this force-restarts the CSS animation
        void indicator.offsetWidth;
        indicator.classList.add("show");
    },
};
