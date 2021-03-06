class Path {
    constructor(model, scene, x1, y1, x2, y2) {
        this.model = model;
        this.line = new Phaser.Geom.Line(x1, y1, x2, y2);
        var dx = x1-x2;
        var dy = y1-y2;
        var dist = Math.sqrt(dx*dx+dy*dy);
        var scale = 0.25;
        this.sprite = scene.add.tileSprite(x1, y1, dist/scale, 200, 'path');
        var angle = Phaser.Math.Angle.Between(x1, y1, x2, y2);
        this.sprite.angle = angle * 180/Math.PI;
        this.sprite.displayOriginX = 0;
        this.sprite.displayOriginY = 115;
        this.sprite.setScale(scale);
        this.setupInput();
    }

    setupInput() {
        this.sprite.setInteractive();
    }

    getSprite() {
        return this.sprite;
    }
}

export default Path;
