import Path from '../sprites/path';
import GameObjectCollection from '../GameObjectCollection';
import GameInputHandler from '../GameInputHandler'

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
        this.gameInputHandler = new GameInputHandler(this);
    }

    preload() {

    }

    create(model) {
        this.loadGraph(model);
        this.gameInputHandler.setupInput();
    }

    loadGraph(model) {
        var nodeMapping = {};
        for (var node of model.nodes) {
            var objCtr = GameObjectCollection[node.name];
            if (!objCtr) {
                throw new Error('Unknown object type ' + node.name);
            }
            var obj = new objCtr(node, this);
            this.gameInputHandler.setupDrag(node, obj);
            obj.getSprite().setPosition(node.x, node.y);
            nodeMapping[node.name] = node;
            obj.getSprite().setDepth(1);
        }
        for (var path of model.paths) {
            var node1 = nodeMapping[path.node1];
            var node2 = nodeMapping[path.node2];
            var p = new Path(path, this, node1.x, node1.y, node2.x, node2.y);
            this.gameInputHandler.setupPathInput(path, p);
            p.getSprite().setDepth(0);
        }
    }

}

export default GameScene;
