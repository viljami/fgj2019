import makeAnimations from '../helpers/animations';
import graph from '../model/graph';

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({key: 'BootScene'});
    }

    preload() {
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            makeAnimations(this);
            progress.destroy();
            this.scene.start('GameScene', graph);
        });

        this.load.image('bg', 'assets/images/Background_720.jpg');
        this.load.image('ant', 'assets/images/ant.png');
        
        this.load.spritesheet('antsheet', 'assets/images/ant_spritesheet.png', { frameWidth: 500, frameHeight: 500, endFrame: 3 });
        this.load.spritesheet('nestsheet', 'assets/images/Nest3_spritesheet.png', { frameWidth: 500, frameHeight: 500, endFrame: 5 });

        this.load.image('cake', 'assets/images/cake.png');
        this.load.image('candy', 'assets/images/candy.png');
        this.load.image('donut', 'assets/images/donut.png');
        this.load.image('mouse', 'assets/images/mouse.png');
        this.load.image('snake', 'assets/images/snake.png');
        this.load.image('worm', 'assets/images/worm.png');
        this.load.image('trail', 'assets/images/trail.png');
        this.load.image('path', 'assets/images/path.png');
        this.load.image('nestsmall', 'assets/images/nest-small.png');

        this.load.audio('bgm', 'assets/audio/bgm_loop.mp3');
        this.load.audio('march', 'assets/audio/march_loop.mp3');
        this.load.audio('victory', 'assets/audio/victory.mp3');
        this.load.audio('defeat', 'assets/audio/defeat.mp3');

        // Tilemap with a lot of objects and tile-properties tricks
        // this.load.tilemapTiledJSON('map', 'assets/tilemaps/super-mario.json');

        // I load the tiles as a spritesheet so I can use it for both sprites and tiles,
        // Normally you should load it as an image.
        // this.load.spritesheet('tiles', 'assets/images/super-mario.png', {
        //     frameWidth: 16,
        //     frameHeight: 16,
        //     spacing: 2
        // });

        // Beginning of an atlas to replace the spritesheets above. Always use spriteatlases. I use TexturePacker to prepare them.
        // Check rawAssets folder for the TexturePacker project I use to prepare these files.
        // this.load.atlas('mario-sprites', 'assets/mario-sprites.png', 'assets/mario-sprites.json');

        // Sound effects in a audioSprite.
        // this.load.audioSprite('sfx', 'assets/audio/sfx.json', [
        //     'assets/audio/sfx.ogg',
        //     'assets/audio/sfx.mp3'
        // ], {
        //     instances: 4
        // });

        // this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

        // This json contain recorded gamep
        // this.load.json('attractMode', 'assets/json/attractMode.json');
    }
}

export default BootScene;
