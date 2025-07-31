export class SelectionManager {
  constructor(stage) {
    this.stage = stage;
    this.selectedItem = null;
  }

  select(item) {
    if (this.selectedItem && this.selectedItem !== item) {
      this.selectedItem.deselect();
    }
    this.selectedItem = item;
    item.select();
  }

  deselect() {
    if (this.selectedItem) {
      this.selectedItem.deselect();
      this.selectedItem = null;
    }
  }

  getSelected() {
    return this.selectedItem;
  }
}
