import Ant from './sprites/ant';

class WarpartyHandler {

    constructor(scene) {
        this.scene = scene;
        this.parties = {};
    }

    updateWarParties(model, nodeMapping) {
        var graphPartyIds = [];
        for (var path of model.paths) {
            for (var party of path.parties) {
                if (!this.parties[party.id]) {
                    this.parties[party.id] = new Ant({
                        fromNode: nodeMapping[party.fromNode.name],
                        toNode: nodeMapping[party.toNode.name],
                        startTime: party.startTime,
                        duration: party.duration
                    }, this.scene);
                }
                graphPartyIds.push(party.id);
            }
        }
        for (var party in this.parties) {
            if (graphPartyIds.indexOf(party) == -1) {
                this.parties[party].getSprite().destroy();
                delete this.parties[party];
            }
        }
    }
}

export default WarpartyHandler;