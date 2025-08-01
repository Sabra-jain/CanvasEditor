export class Toggle {
  constructor(x, y, stage, items) {
    this.container = new createjs.Container();
    this.container.x = x;
    this.container.y = y;
    this.stage = stage;
    this.items = items;
    this.isDark = false;

    this.bg = new createjs.Shape();
    this.drawToggle();

    this.container.cursor = "pointer";
    this.container.on("click", () => {
      this.toggle();
    });
  }

  drawToggle() {
    this.bg.graphics
      .setStrokeStyle(1)
      .beginStroke("black")
      .beginFill("#ccc")
      .drawRoundRect(0, 0, 140, 40, 20);
    this.container.addChild(this.bg);

    this.label = new createjs.Text("Toggle", "20px Poppins", "#000");
    this.label.textAlign = "center";
    this.label.textBaseline = "middle";
    this.label.x = 70;
    this.label.y = 20;
    this.container.addChild(this.label);
  }

  toggle() {
    this.isDark = !this.isDark;
    this.stage.canvas.style.background = this.isDark ? "black" : "white";

    this.items.forEach((item) => {
      if (item.heart) {
        // const fill = "red";
        const strokeColor = this.isDark ? "white" : "black";
        item.setColor(item.currentFill, strokeColor);
      }
      // if(item.gridSquare){
      //     const g = gridSquare.graphics;
      //     const fillColor = cell.fillState === "red" ? "red" : "white";
      //     g.clear()
      //     .setStrokeStyle(1)
      //     .beginStroke(this.isDark ? "white" : "black")
      //     .beginFill(fillColor)
      //     .drawRect(0, 0, 150, 150);

      //     const op = new createjs.Shape();
      //     op.graphics.setStrokeStyle(2).beginStroke("white").drawRect(0,0,150,150);
      // }
      // GridSquare ke liye overlay handle karein
      if (item.gridSquare) {
        if (this.isDark) {
          item.addWhiteBorder();
        } else {
          item.removeWhiteBorder();
        }
      }

      if (item.isSelected) item.select();
    });
  }

  getDisplayObject() {
    return this.container;
  }
}
