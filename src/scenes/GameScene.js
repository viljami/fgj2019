/* global Phaser */
import Path from '../sprites/path';
import GameObjectCollection from '../GameObjectCollection';
import GameInputHandler from '../GameInputHandler'
import WarpartyHandler from '../WarpartyHandler'
import { step, getNode, sendWarParty } from '../controller';
import { STEP_INTERVAL, COMPUTER_INTERVAL } from '../config';


const IS_COMPUTER = /computer/;
const NUMBER = /\d+/;
const update = a => a.update();
const isComputer = ({owner}) => IS_COMPUTER.test(owner);

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
        this.gameInputHandler = new GameInputHandler(this);
        this.lastStep = 0;
        this.computerLastStep = Date.now();
        this.warpartyHandler = new WarpartyHandler(this);
        this.model = null;
    }

    preload() {

    }

    create(model) {
        this.model = model;
        this.loadGraph(model);
        this.gameInputHandler.setupInput();
        var bgm = this.sound.add('bgm', {loop: true});
        bgm.play();
    }


    update() {
        const now = Date.now();
        if (now - this.lastStep > STEP_INTERVAL) {
            step(now);
            this.lastStep = now;
        }

        this.warpartyHandler.updateWarParties(this.model, this.nodeMapping);

        if (now - this.computerLastStep > COMPUTER_INTERVAL) {
            this.computerLastStep = now;
            const nodes = this.model.nodes.filter(isComputer);
            this.model.paths.forEach(a => {
                if (nodes.some(b => a.node1 === b.name) && Math.random() > 0.5) {
                    const n1 = getNode(a.node1);
                    const n2 = getNode(a.node2);
                    if (n2.defence < n1.defence) {
                        sendWarParty(n1, n2);
                    }
                }

                if (nodes.some(b => a.node2 === b.name) && Math.random() > 0.5) {
                    const n1 = getNode(a.node1);
                    const n2 = getNode(a.node2);
                    if (n1.defence < n2.defence) {
                        sendWarParty(n2, n1);
                    }
                }
            }, []);
        }

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
