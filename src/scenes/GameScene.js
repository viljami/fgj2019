var Path = require('../sprites/path.js').default;
var GameObjectCollection = require('../GameObjectCollection.js')
var Graph = require('../../assets/graph.json');

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {

    }

    create() {
        this.loadGraph(Graph);
    }

    loadGraph(graph) {
        var nodeMapping = {};
        for (var node of graph.nodes) {
            var objCtr = GameObjectCollection[node.name];
            if (!objCtr) {
                throw new Error('Unknown object type ' + node.name);
            }
            var obj = new objCtr(node, this);
        
            obj.getSprite().setPosition(node.x, node.y);
            nodeMapping[node.name] = node;
        }
        for (var path of graph.paths) {
            var node1 = nodeMapping[path.node1];
            var node2 = nodeMapping[path.node2];
            new Path(path, this, node1.x, node1.y, node2.x, node2.y);
        }
    }
}

export default GameScene;
