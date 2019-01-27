class Ant {
    constructor(model, scene) {
        this.model = model;
        this.sprite = scene.add.sprite(this.model.fromNode.x, this.model.fromNode.y, 'ant');
        this.sprite.setDisplaySize(40, 40);
        this.tween = scene.tweens.add({
            targets: this.sprite,
            x: this.model.toNode.x,
            y: this.model.toNode.y,
            ease: 'Power1',
            duration: this.model.duration,
        });
        var angle = Phaser.Math.Angle.Between(this.model.fromNode.x, this.model.fromNode.y, this.model.toNode.x, this.model.toNode.y);
        this.sprite.setAngle(angle * 180/Math.PI);
        this.sprite.setDepth(2);
    }


    getSprite() {
        return this.sprite;
    }
}

export default Ant;