import {sendWarParty, getNode} from './controller';

class GameInputHandler {

    constructor(scene) {
        this.scene = scene;
        this.selectedObject = null;
        this.targetNode = null;
    }

    setupInput() {
        this.scene.input.on('pointerup', function() {
            if (this.selectedObject && this.selectedPath){
                this.scene.march.play();
                sendWarParty(
                    this.selectedObject,
                    getNode(
                        this.selectedPath.node1 === this.selectedObject.name ?
                        this.selectedPath.node2 : this.selectedPath.node1
                    )
                );
            }

            if (this.selectedObject && this.targetNode){
                if (this.selectedObject.name !== this.targetNode.name) {
                    sendWarParty(
                        this.selectedObject,
                        this.targetNode
                    );
                }
            }
            this.selectedObject = null;
        }.bind(this));
    }

    setupDrag(model, obj) {
        obj.setDragHandler(this.onNodeDrag.bind(this));
        obj.getInputSprite().on('pointerover', function() {
            this.targetNode = model;
        }.bind(this));
        obj.getInputSprite().on('pointerout', function() {
            this.targetNode = null;
        }.bind(this));
    }

    onNodeDrag(pointer, gameObject, model, dragX, dragY) {
        this.selectedObject = model;
    }

    setupPathInput(model, obj) {
        obj.getSprite().on('pointerover', function() {
            this.selectedPath = model;
        }.bind(this));
        obj.getSprite().on('pointerout', function() {
            this.selectedPath = null;
        }.bind(this));
    }
}

export default GameInputHandler;
