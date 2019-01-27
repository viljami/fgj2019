class Node {
    constructor(model, scene) {
        this.model = model;
    }

    getInputSprite() {
        return this.getSprite();
    }

    setDragHandler(handler) {
        this.getInputSprite().on('pointerdown', function(pointer, gameObject, dragX, dragY) {
            handler(pointer, gameObject, this.model, dragX, dragY);
        }.bind(this));
    }
}

export default Node;
