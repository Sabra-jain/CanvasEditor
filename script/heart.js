import { EnableDrag } from "./enableDrag.js";

export class Heart {
  constructor(x, y, fillColor = "red", strokeColor = "black") {
    this.container = new createjs.Container();
    this.container.x = x;
    this.container.y = y;

    this.isDragging = { value: false };

    this.heart = new createjs.Shape();
    this.currentFill = fillColor;
    this.currentStroke = strokeColor;
    this.drawHeart(this.currentFill, this.currentStroke);

    this.container.addChild(this.heart);
    
    this.isSelected = false;
    this.selectionBorder = new createjs.Shape();

    this.enableDrag();
    this.container.addChild(this.selectionBorder);
  }

  drawHeart(fillColor, strokeColor) {
    this.currentFill = fillColor;
    this.currentStroke = strokeColor;
    const g = this.heart.graphics;
    g.clear();
    g.setStrokeStyle(2).beginStroke(this.currentStroke).beginFill(this.currentFill);
    g.moveTo(75, 40);
    g.bezierCurveTo(75, 37, 70, 25, 50, 25);
    g.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    g.bezierCurveTo(20, 80, 40, 102, 75, 120);
    g.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    g.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    g.bezierCurveTo(85, 25, 75, 37, 75, 40);
    g.endFill();
  }

  enableDrag() {
    const d = new EnableDrag(this.container,this.isDragging);
    d.drag();
  }

  select() {
    this.isSelected = true;
    this.drawSelectionBorder();
  }

  deselect() {
    this.isSelected = false;
    this.selectionBorder.graphics.clear();
  }

  drawSelectionBorder() {
    const g = this.selectionBorder.graphics;
    g.clear();
    g.setStrokeStyle(1).beginStroke("blue").drawRect(15, 20, 120, 110);
  }

  getDisplayObject() {
    return this.container;
  }

  setColor(fillColor, strokeColor) {
    this.drawHeart(fillColor, strokeColor);
  }
}
