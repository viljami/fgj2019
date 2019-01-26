class Snake {
    constructor(model, scene) {
        this.model = model;
        this.circle = new Phaser.Geom.Circle(0, 0, 10);
        this.graphics = scene.add.graphics({ lineStyle: { width: 3, color: 0xff00ff }, fillStyle: { color: 0x00ff00 } });
        this.graphics.fillCircleShape(this.circle);
    }

    getSprite() {
        return this.graphics;
    }
}

export default Snake;