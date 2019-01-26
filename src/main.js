import 'phaser';
// import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import graph from './model/graph';

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [
        // BootScene,
        GameScene
    ]
};

const game = new Phaser.Game(config);
// game.scene.start('BootScene', graph);
game.scene.start('GameScene', graph);
