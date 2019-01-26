import Node from './node.js';

class Worm extends Node {
    constructor(model, scene) {
        super(model, scene);
        this.model = model;
        this.circle = new Phaser.Geom.Circle(0, 0, this.model.defence || 1);
        this.graphics = scene.add.graphics({ lineStyle: { width: 3, color: 0xff00ff }, fillStyle: { color: 0x00ff00 } });
        this.graphics.fillCircleShape(this.circle);
        this.setupInput();

        this.graphics.update = this.update.bind(this);
    }

    update() {
        this.graphics.clear();
        this.graphics.defaultFillColor = this.model.owner === 'player' ? 0x00ff00 : 0xff0000;
        this.circle.setTo(this.circle.x, this.circle.y, this.model.defence || 1);
        this.graphics.fillCircleShape(this.circle);
    }

    setupInput() {
        var circle = new Phaser.Geom.Circle(0, 0, this.model.defence < 25 ? 25 : this.model.defence);
        this.graphics.setInteractive(circle, Phaser.Geom.Circle.Contains);
    }

    getSprite() {
        return this.graphics;
    }
}

export default Worm;
