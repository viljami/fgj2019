/* global Phaser */
import Path from '../sprites/path';
import GameObjectCollection from '../GameObjectCollection';
import GameInputHandler from '../GameInputHandler'
import WarpartyHandler from '../WarpartyHandler'
import { step } from '../controller';
import { STEP_INTERVAL } from '../config';
import graph from '../model/graph';

const NUMBER = /\d+/;
const update = a => a.update();

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
        this.gameInputHandler = new GameInputHandler(this);
        this.lastStep = 0;
        this.warpartyHandler = new WarpartyHandler(this);
    }

    preload() {

    }

    create(model) {
        this.model = model;
        this.loadGraph(model);
        this.gameInputHandler.setupInput();
    }


    update() {
        const now = Date.now();
        if (now - this.lastStep > STEP_INTERVAL) {
            step(now);
            this.lastStep = now;
        }

        this.warpartyHandler.updateWarParties(this.model, this.nodeMapping);

        this.children.list.forEach(update);
    }

    loadGraph(model) {
        this.nodeMapping = {};
        for (var node of model.nodes) {
            const name = node.name.split(NUMBER)[0];
            var objCtr = GameObjectCollection[name];
            if (!objCtr) {
                throw new Error('Unknown object type ' + name);
            }
            var obj = new objCtr(node, this);
            this.gameInputHandler.setupDrag(node, obj);
            obj.getSprite().setPosition(node.x, node.y);
            this.nodeMapping[node.name] = node;
            obj.getSprite().setDepth(1);
        }
        for (var path of model.paths) {
            var node1 = this.nodeMapping[path.node1];
            var node2 = this.nodeMapping[path.node2];
            var p = new Path(path, this, node1.x, node1.y, node2.x, node2.y);
            this.gameInputHandler.setupPathInput(path, p);
            p.getSprite().setDepth(0);
        }
    }

}

export default GameScene;
