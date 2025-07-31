export class EnableDrag {
  constructor(container,isDragging) {
    this.container = container;
    this.isDragging = isDragging;
  }
  drag() {
    this.container.on("mousedown", (evt) => {
      this.isDragging.value = false;
      evt.currentTarget.offset = {
        x: evt.stageX - this.container.x,
        y: evt.stageY - this.container.y,
      };
    });

    this.container.on("pressmove", (evt) => {
      this.isDragging.value = true;
      this.container.x = evt.stageX - evt.currentTarget.offset.x;
      this.container.y = evt.stageY - evt.currentTarget.offset.y;
    });

    this.container.on("pressup", () => {
      setTimeout(() => (this.isDragging.value = false), 50);
    });
  }
}
