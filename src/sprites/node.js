class Node {
    constructor(model, scene) {
        this.model = model;
    }

    setDragHandler(handler) {
        this.getSprite().on('pointerdown', function(pointer, gameObject, dragX, dragY) {
            handler(pointer, gameObject, this.model, dragX, dragY);
        }.bind(this));
    }
}

export default Node;
