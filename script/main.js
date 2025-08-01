import { Heart } from "./heart.js";
import { TextItem } from "./textItem.js";
import { GridSquare } from "./gridSquare.js";
import { Toggle } from "./toggle.js";
import { SelectionManager } from "./selectionManager.js";
import { ColorPalette } from "./colorPalette.js";
import { KeyHandler } from "./keyHandler.js";

const canvas = document.getElementById("Canvas");
const stage = new createjs.Stage(canvas);
const selectionManager = new SelectionManager(stage);

const heart = new Heart(150, 250);
const text = new TextItem(canvas.width / 2, canvas.height / 2);
const gridSquare = new GridSquare(550, 250);
const allItems = [heart, text, gridSquare];
window.allItems = allItems;
const toggle = new Toggle(600, 20, stage, allItems);

stage.addChild(heart.getDisplayObject());
stage.addChild(text.getDisplayObject());
stage.addChild(gridSquare.getDisplayObject());
stage.addChild(toggle.getDisplayObject());

const colorPalette = new ColorPalette(stage, selectionManager);
window.colorPalette = colorPalette;

stage.enableMouseOver();
stage.mouseMoveOutside = true;

heart.getDisplayObject().on("click", () => {
  if (heart.isDragging.value) return;
  selectionManager.select(heart);
  colorPalette.showForItem(heart);
});

text.getDisplayObject().on("click", () => {
  if (text.isDragging.value) return;
  selectionManager.select(text);
  colorPalette.showForItem(text);
});

gridSquare.getDisplayObject().on("click", () => {
  if (gridSquare.isDragging.value) return;
  selectionManager.select(gridSquare);
  colorPalette.hide();
});

const bgLayer = new createjs.Shape();
bgLayer.graphics
  .beginFill("#ffffff")
  .drawRect(0, 0, canvas.width, canvas.height);
bgLayer.alpha = 0.01; // invisible but clickable
bgLayer.name = "bgLayer";
stage.addChildAt(bgLayer, 0); // always at bottom

stage.on("click", (evt) => {
  // Palette ignore
  if (evt.target.parent === colorPalette.container) return;

  // Sirf background click hone par deselect
  if (evt.target.name === "bgLayer") {
    selectionManager.deselect();
    colorPalette.hide();
  }
});

new KeyHandler(stage, selectionManager, Heart, TextItem, GridSquare);

createjs.Ticker.framerate = 60;
createjs.Ticker.on("tick", stage);
