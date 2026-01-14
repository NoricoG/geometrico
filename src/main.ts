import p5 from "p5";

import { RotatingNestedSquaresAnimation, RotatingNestedTrianglesAnimation, Rotating2Triangle4Animation, Rotating4Triangle4Animation, MarginSquaresAngleAnimation } from "./scenes/parameter/angle";
import { SquareSizeAnimation, CircleSizeAnimation, TriangleSizeAnimation } from "./scenes/parameter/size";

import { AppolonianGasketComposition } from "./scenes/shape/appolonianGasket";
import { Circle4Composition } from "./scenes/shape/circle4";
import { PolyflakeComposition } from "./scenes/shape/polyflake";
import { PythagorasTreeComposition } from "./scenes/shape/pythagorasTree";
import { Rectangle4Composition } from "./scenes/shape/reactangle4";
import { Triangle2Composition } from "./scenes/shape/triangle2";
import { Triangle3Composition } from "./scenes/shape/triangle3";
import { Triangle4Composition } from "./scenes/shape/triangle4";

import { Composition } from "./scenes/base";

function titleIndicator(indicator: string): void {
  document.title = "Geometrico " + indicator;
}

var inMenu = false;

function showMenu(id: string): void {
  inMenu = true;

  const menu = document.getElementById(id);

  if (menu) {
    menu.style.display = "flex";
  }
}

function hideMenu(id: string): void {
  inMenu = false;

  const menu = document.getElementById(id);
  if (menu) {
    menu.style.display = "none";
  }
}

function setupMenus(p: p5): void {
  // reload menu
  const reloadProceed = document.getElementById("reload-proceed")
  if (reloadProceed) {
    reloadProceed.onclick = function () {
      location.reload();
    };
  }
  const reloadClose = document.getElementById("reload-close")
  if (reloadClose) {
    reloadClose.onclick = function () {
      hideMenu("reload-menu");
    };
  }

  // main menu
  const mainSave = document.getElementById("main-save")
  if (mainSave) {
    mainSave.onclick = function () {
      const randomPart = Math.random().toString(36).substring(2, 10);
      const filename = 'geometrico_' + randomPart;
      p.saveCanvas(filename, 'png');
      hideMenu("main-menu");
    };
  }
  const mainClose = document.getElementById("main-close")
  if (mainClose) {
    mainClose.onclick = function () {
      hideMenu("main-menu");
    };
  }
}

function showPauseIndicator(symbol: string): void {
  const indicator = document.getElementById("pause-indicator");
  if (!indicator) {
    return;
  }

  indicator.innerText = symbol;

  indicator.classList.remove('show');
  // this force-restarts the CSS animation
  void indicator.offsetWidth;
  indicator.classList.add('show');
}

function sketch(p: p5) {
  var composition: Composition;

  var pause = false;
  var firstFrameAfterPause = false;
  var gainedFocus = false;

  p.setup = function setup(): void {

    const compositions = [
      AppolonianGasketComposition,
      Circle4Composition,
      PolyflakeComposition, // twice because of variability
      PolyflakeComposition, // twice because of variability
      PythagorasTreeComposition,
      Rectangle4Composition,
      Triangle2Composition,
      Triangle3Composition,
      Triangle4Composition,
    ]
    const animations = [
      SquareSizeAnimation,
      CircleSizeAnimation,
      TriangleSizeAnimation,
      RotatingNestedSquaresAnimation,
      RotatingNestedTrianglesAnimation,
      Rotating2Triangle4Animation,
      Rotating4Triangle4Animation,
      MarginSquaresAngleAnimation,
    ];
    if ((Math.random() < 0.6 || animations.length == 0) && compositions.length > 0) {
      const randomIndex = Math.floor(Math.random() * compositions.length);
      composition = new compositions[randomIndex](p);
    } else {
      const randomIndex = Math.floor(Math.random() * animations.length);
      composition = new animations[randomIndex](p);
    }
    console.log(composition.constructor.name);

    if (composition.animated) {
      titleIndicator("▶");
    } else {
      titleIndicator("◌");
      composition.showLoadingText(p);
    }

    p.noStroke();

    p.frameRate(60);

    setupMenus(p);
  };

  p.draw = function draw(): void {
    // prevent large deltaTime after pausing
    if (firstFrameAfterPause) {
      firstFrameAfterPause = false;
      return;
    }

    if (p.focused && !gainedFocus) {
      gainedFocus = true;
    }

    // only draw when the window is focused, unless never focused before
    if (composition.animated && gainedFocus && !p.focused) {
      return;
    }

    composition.draw(p, p.deltaTime);

    if (!composition.animated) {
      p.noLoop();
      titleIndicator("✔");
    }
  };

  p.mousePressed = function mousePressed() {
    if (!p.mouseButton.left) {
      return;
    }

    const spaceAboveCanvas = (p.windowHeight - p.height) / 2;
    const relativeMouseY = (p.mouseY + spaceAboveCanvas) / p.windowHeight;

    if (relativeMouseY > 2 / 3) {
      if (!composition.animated) {
        showPauseIndicator("❌");
        return;
      }

      if (pause == false) {
        p.noLoop();
        pause = true;
      } else {
        p.loop();
        pause = false;
        firstFrameAfterPause = true;
      }
      showPauseIndicator(pause ? "▐▐" : "▶");

    } else if (!inMenu) {
      if (relativeMouseY > 1 / 3) {
        showMenu("main-menu");
      } else {
        showMenu("reload-menu");
      }
    }
  }
}

new p5(sketch);
