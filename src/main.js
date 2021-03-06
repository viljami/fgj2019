import 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import graph from './model/graph';

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 1200,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: false
        }
    },
    scene: [
        BootScene,
        GameScene
    ]
};

const game = new Phaser.Game(config);
// game.scene.start('BootScene', graph);
//game.scene.start('GameScene', graph);
