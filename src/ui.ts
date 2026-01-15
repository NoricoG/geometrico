import p5 from "p5";
import { Composition } from "./scenes/base";
import { RandomListColors } from "./colors";

let inMenu = false;

export const UI = {
    isInMenu(): boolean {
        return inMenu;
    },

    setTitle(indicator: string): void {
        document.title = "Geometrico " + indicator;
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
        menu.style.display = "flex";

        const menuSpeed = document.getElementById("menu-speed");
        if (menuSpeed) {
            if (composition.animated) {
                menuSpeed.innerText = "Change animation";
                menuSpeed.style.cursor = "pointer";
                menuSpeed.style.color = "white";
            } else {
                menuSpeed.innerText = "( Not animated )";
                menuSpeed.style.cursor = "not-allowed";
                menuSpeed.style.color = "gray";
            }
        }

        const menuPause = document.getElementById("menu-pause");
        if (menuPause) {
            if (composition.animated) {
                menuPause.innerText = paused ? "Play (or pause)" : "Pause (or play)";
                menuPause.style.cursor = "pointer";
                menuPause.style.color = "white";
            } else {
                menuPause.innerText = "( Not animated )";
                menuPause.style.cursor = "not-allowed";
                menuPause.style.color = "gray";
            }
        }
    },

    hideMenu(): void {
        const menu = document.getElementById("menu");
        if (!menu) {
            return;
        }

        inMenu = false;
        menu.style.display = "none";
    },

    setupMenu(p: p5, composition: Composition, playPause: (playOnly: boolean) => void): void {
        const setupMenuItem = (id: string, handler: () => void): void => {
            const element = document.getElementById(id);
            if (element) {
                element.onclick = () => {
                    handler();
                    UI.hideMenu();
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
