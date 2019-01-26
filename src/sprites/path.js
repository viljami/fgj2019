class Path {
    constructor(model, scene, x1, y1, x2, y2) {
        this.scene
        this.model = model;
        this.line = new Phaser.Geom.Line(x1, y1, x2, y2);
        this.graphics = scene.add.graphics({ lineStyle: { width: 3, color: 0xff00ff }, fillStyle: { color: 0x00ff00 } });
        this.graphics.strokeLineShape(this.line);
        this.setupInput();
    }

    setupInput() {
        var polygon = new Phaser.Geom.Polygon([
            this.line.x1,
            this.line.y1,
            this.line.x2,
            this.line.y2,
            this.line.x1+1,
            this.line.y1+1,
            this.line.x2+1,
            this.line.y2+1
        ]);
        this.graphics.setInteractive(polygon, Phaser.Geom.Polygon.Contains);
    }

    getSprite() {
        return this.graphics;
    }
}

export default Path;
