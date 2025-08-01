import { EnableDrag } from "./enableDrag.js";

export class TextItem {
  constructor(x, y) {
    this.container = new createjs.Container();
    this.container.x = x;
    this.container.y = y;
    this.text = new createjs.Text("Hello World", "24px Poppins", "purple");
    this.text.textAlign = "center";
    this.text.textBaseline = "middle";

    this.isDragging = { value: false };

    const hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(-65, -15, 130, 25);
    this.text.hitArea = hit;
    this.enableDrag();
    this.container.addChild(this.text);

    this.isSelected = false;
    this.selectionBorder = new createjs.Shape();

    this.container.addChild(this.selectionBorder);
  }

  enableDrag() {
    const d = new EnableDrag(this.container, this.isDragging);
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

    // Text ke around border ke liye measureText
    const width = this.text.getMeasuredWidth();
    const height = this.text.getMeasuredLineHeight();

    g.setStrokeStyle(1)
      .beginStroke("blue")
      .drawRect(-width / 2 - 5, -height / 2 - 5, width + 10, height + 10);
  }

  getDisplayObject() {
    return this.container;
  }

  setColor(fillColor) {
    this.text.color = fillColor;
  }
}
