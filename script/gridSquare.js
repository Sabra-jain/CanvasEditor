import { EnableDrag } from "./enableDrag.js";

export class GridSquare {
  constructor(x, y) {
    this.container = new createjs.Container();
    this.container.x = x;
    this.container.y = y;
    this.gridSquare = true;
    this.borderOverlay = null;

    this.isDragging = { value: false };
    this.enableDrag();
    this.cellSize = 50;
    this.cells = [];
    this.drawGrid();
    this.selectionBorder = new createjs.Shape();
    this.isSelected = false;
    this.container.addChild(this.selectionBorder);
  }

  drawGrid() {
    for (let row = 0; row < 3; row++) {
      this.cells[row] = [];
      for (let col = 0; col < 3; col++) {
        const cell = new createjs.Shape();
        cell.graphics
          .setStrokeStyle(2)
          .beginStroke("black")
          .beginFill("white")
          .drawRect(0, 0, this.cellSize, this.cellSize);

        cell.x = col * this.cellSize;
        cell.y = row * this.cellSize;
        cell.fillState = "white";
        cell.cursor = "pointer";

        cell.on("click", () => {
          const g = cell.graphics;
          g.clear().setStrokeStyle(2).beginStroke("black");

          if (cell.fillState === "red") {
            g.beginFill("white");
            cell.fillState = "white";
          } else {
            g.beginFill("red");
            cell.fillState = "red";
          }
          g.drawRect(0, 0, this.cellSize, this.cellSize);
        });

        this.container.addChild(cell);
        this.cells[row][col] = cell;
      }
    }
  }

  addWhiteBorder() {
    if (!this.borderOverlay) {
      this.borderOverlay = new createjs.Shape();
      this.borderOverlay.graphics
        .setStrokeStyle(1)
        .beginStroke("white")
        .drawRect(0, 0, 150, 150);

      this.container.addChild(this.borderOverlay);
    }
  }

  // White border remove karne ka method
  removeWhiteBorder() {
    if (this.borderOverlay) {
      this.container.removeChild(this.borderOverlay);
      this.borderOverlay = null;
    }
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
    g.setStrokeStyle(1).beginStroke("blue").drawRect(0, 0, 150, 150);
  }

  getDisplayObject() {
    return this.container;
  }
}
