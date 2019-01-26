class Path {
    constructor(model, scene, x1, y1, x2, y2) {
        this.model = model;
        this.line = new Phaser.Geom.Line(0, 0, x1, y1, x2, y2);
        this.graphics = scene.add.graphics({ lineStyle: { width: 3, color: 0xff00ff }, fillStyle: { color: 0x00ff00 } });
        this.graphics.strokeLineShape(this.line);
    }

    getSprite() {
        return this.graphics;
    }
}

export default Path;