
export default class Node {
  constructor(node) {
    this.name = node.name;
    this.owner = node.owner;
    this.x = node.x;
    this.y = node.y;
    this.defence = node.defence
    this.generation = node.generation;
    this.spritePath = node.spritePath;
  }
}
