import Node from './node.js';

class Snake extends Node {
    constructor(model, scene) {
        super(model, scene);
        this.model = model;

        this.container = scene.add.container(0, 0);

        this.circle = new Phaser.Geom.Circle(0, 0, this.model.defence || 5);
        this.graphics = scene.add.graphics({ lineStyle: { width: 3, color: 0xff00ff }, fillStyle: { color: 0x00ff00 } });
        this.graphics.fillCircleShape(this.circle);
        this.sprite = scene.add.sprite(0, 0, 'snake');
        this.sprite.setDisplaySize(100, 100);

        this.container.add(this.graphics);
        this.container.add(this.sprite);

        this.setupInput();

        this.container.update = this.update.bind(this);
    }

    update() {
        this.graphics.clear();
        this.graphics.defaultFillColor = this.model.owner === 'player' ? 0x00ff00 : 0xff0000;
        this.circle.setTo(this.circle.x, this.circle.y, this.model.defence / 4 < 5 ? 5 : this.model.defence / 4);
        this.inputCircle.setTo(0, 0, this.model.defence < 25 ? 25 : this.model.defence);
        this.graphics.fillCircleShape(this.circle);
    }

    setupInput() {
        this.inputCircle = new Phaser.Geom.Circle(0, 0, this.model.defence < 25 ? 25 : this.model.defence);
        this.graphics.setInteractive(this.inputCircle, Phaser.Geom.Circle.Contains);
    }

    getSprite() {
        return this.container;
    }

    getInputSprite() {
        return this.graphics;
    }
}

export default Snake;
