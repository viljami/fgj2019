/* global Phaser */
import Node from './node.js';

class Nest extends Node {
    constructor(model, scene) {
        super(model, scene);
        this.model = model;

        this.container = scene.add.container(0, 0);

        this.circle = new Phaser.Geom.Circle(0, 0, model.defence || 5);
        this.graphics = scene.add.graphics({ lineStyle: { width: 3, color: 0xff00ff }, fillStyle: { color: 0x00ff00 } });
        this.graphics.fillCircleShape(this.circle);
        this.sprite = scene.add.sprite(0, 0, 'nestsheet');
        this.graphics.alpha = 0.5;
        this.sprite.setDisplaySize(200, 200);

        this.container.add(this.sprite);
        this.container.add(this.graphics);

        this.setupInput();

        this.container.update = this.update.bind(this);
    }

    update() {
        if (!this.animated) {
            //this.sprite.anims.play('nestanim');
            this.animated = true;
        }
        this.graphics.clear();
        this.graphics.defaultFillColor = this.model.owner === 'player' ? 0x66ff66 : this.model.owner === 'neutral' ? 0x6666ff : 0xff2222;
        this.circle.setTo(this.circle.x, this.circle.y, this.model.defence / 3 < 5 ? 5 : this.model.defence / 3);
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

export default Nest;
