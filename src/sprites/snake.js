import Node from './node.js';

class Snake extends Node {
    constructor(model, scene) {
        super(model, scene);
        this.model = model;
        this.circle = new Phaser.Geom.Circle(0, 0, 10);
        this.graphics = scene.add.graphics({ lineStyle: { width: 3, color: 0xff00ff }, fillStyle: { color: 0x00ff00 } });
        this.graphics.fillCircleShape(this.circle);
        this.setupInput();
    }

    setupInput() {
        var circle = new Phaser.Geom.Circle(0, 0, 10);
        this.graphics.setInteractive(circle, Phaser.Geom.Circle.Contains);
    }

    getSprite() {
        return this.graphics;
    }
}

export default Snake;