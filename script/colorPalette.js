export class ColorPalette {
  constructor(stage, selectionManager) {
    this.stage = stage;
    this.selectionManager = selectionManager;

    this.container = new createjs.Container();

    this.container.x = 20;
    this.container.y = 550;
    this.colors = ["red", "purple", "green"];
    this.colorCircles = [];
    this.selectedColor = null;

    this.stage.addChild(this.container);
    // this.stage.setChildIndex(this.container, this.stage.numChildren - 1);

    this.createPalette();
    this.hide();
  }

  createPalette() {
    this.colors.forEach((color, index) => {
      const circle = new createjs.Shape();
      circle.graphics.beginFill(color).drawCircle(0, 0, 15);
      circle.x = index * 50;
      circle.y = 0;
      circle.cursor = "pointer";
      //   circle.name = color;
      //   circle.mouseEnabled = true;

      this.stage.update();

      circle.on("click", () => {
        this.applyColorToSelected(color);
      });

      this.container.addChild(circle);
      this.colorCircles.push(circle);
    });
    this.selectionOutline = new createjs.Shape();
    this.container.addChild(this.selectionOutline);
    this.stage.update();
  }

  setSelectedColor(color) {
    this.selectedColor = color;
    const i = this.colors.indexOf(color);
    // if (i >= 0) {
    //   const target = this.colorCircles[i];
    //   const g = this.selectionOutline.graphics;
    //   g.clear();
    //   g.setStrokeStyle(2)
    //     .beginStroke("blue")
    //     .drawCircle(target.x, target.y, 18);
    // }
    const target = this.colorCircles[i];
    const g = this.selectionOutline.graphics;
    g.clear();
    g.setStrokeStyle(2).beginStroke("blue").drawCircle(target.x, target.y, 18);
  }

  showForItem(item) {
    this.show();

    if (item?.text) {
      this.setSelectedColor(item.text.color);
    } else if (item?.heart) {
      this.setSelectedColor(item.currentFill);
    }
  }

  show() {
    this.container.visible = true;
  }

  hide() {
    this.container.visible = false;
  }

  applyColorToSelected(color) {
    const selected = this.selectionManager.getSelected();

    if (!selected) return;

    const strokeColor =
      this.stage.canvas.style.backgroundColor === "black" ? "white" : "black";

    if (selected.heart) {
      selected.setColor(color, strokeColor);
    } else if (selected.text) {
      selected.setColor(color);
    }

    this.setSelectedColor(color);
    this.stage.update();
  }
}
