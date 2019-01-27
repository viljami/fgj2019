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

    update() {
        this.graphics.clear();
        this.graphics.defaultFillColor = this.model.owner === 'player' ? 0x66ff66 : this.model.owner === 'neutral' ? 0x6666ff : 0xff2222;
        this.circle.setTo(this.circle.x, this.circle.y, this.model.defence / 3 < 5 ? 5 : this.model.defence / 3);
        this.graphics.fillCircleShape(this.circle);
    }

    setupInput() {
        this.inputCircle = new Phaser.Geom.Circle(0, 0, 30);
        this.graphics.setInteractive(this.inputCircle, Phaser.Geom.Circle.Contains);
    }
}

export default Node;
