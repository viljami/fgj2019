import Node from './node.js';

class Cake extends Node {
    constructor(model, scene) {
        super(model, scene);
        this.model = model;

        this.container = scene.add.container(0, 0);

        this.sprite = scene.add.sprite(0, 0, 'cake');
        this.circle = new Phaser.Geom.Circle(0, 0, this.model.defence || 5);
        this.graphics = scene.add.graphics({ lineStyle: { width: 3, color: 0xff00ff }, fillStyle: { color: 0x00ff00 } });
        this.graphics.fillCircleShape(this.circle);
        this.graphics.alpha = 0.5;
        this.sprite.setDisplaySize(100, 100);

        this.container.add(this.sprite);
        this.container.add(this.graphics);

        this.setupInput();

        this.container.update = this.update.bind(this);
    }

    getInputSprite() {
        return this.graphics;
    }

    setupInput() {
        this.inputCircle = new Phaser.Geom.Circle(0, 0, this.model.defence < 25 ? 25 : this.model.defence);
        this.graphics.setInteractive(this.inputCircle, Phaser.Geom.Circle.Contains);
    }

    getSprite() {
        return this.container;
    }
}

export default Cake;
