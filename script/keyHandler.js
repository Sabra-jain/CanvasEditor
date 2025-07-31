import { EnableDrag } from "./enableDrag.js";

export class KeyHandler {
  constructor(stage, selectionManager, Heart, TextItem, GridSquare) {
    this.stage = stage;
    this.selectionManager = selectionManager;
    this.Heart = Heart;
    this.TextItem = TextItem;
    this.GridSquare = GridSquare;

    this.listen();
  }

  listen() {
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.code === "KeyC") {
        this.cloneSelected();
      }
    });
  }

  cloneSelected() {
    const original = this.selectionManager.getSelected();
    if (!original) return;

    let clone = null;
    const offset = 100;

    if (original.heart) {
      clone = new this.Heart(
        original.container.x + offset,
        original.container.y,
        original.currentFill,
        original.currentStroke
      );
    } else if (original.text) {
      clone = new this.TextItem(
        original.container.x + offset,
        original.container.y
      );
      clone.text.color = original.text.color; // copy text color
    } else if (original.cells) {
      clone = new this.GridSquare(
        original.container.x + offset,
        original.container.y
      );

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const origCell = original.cells[r][c];
          const cloneCell = clone.cells[r][c];

          if (origCell.fillState === "red") {
            cloneCell.graphics
              .clear()
              .setStrokeStyle(1)
              .beginStroke("black")
              .beginFill("red")
              .drawRect(0, 0, 50, 50);
            cloneCell.fillState = "red";
          }
        }
      }
    }

    if (clone) {
      this.stage.addChild(clone.getDisplayObject());
      new EnableDrag(clone.container, clone.isDragging).drag();
      // Register selection click
      clone.getDisplayObject().on("click", () => {
        if (clone.isDragging?.value) return; // drag ignore

        this.selectionManager.select(clone);

        // palette sirf Heart aur Text ke liye kholna hai
        if (clone.heart || clone.text) {
          window.colorPalette.showForItem(clone);
        } else {
          window.colorPalette.hide();
        }
      });

      // Auto select the clone
      this.selectionManager.select(clone);
      window.allItems.push(clone);
    }
  }
}
