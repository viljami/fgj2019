import graph from '../../assets/graph.json';
import Node from './node';
import Path from './path';

class Graph {
  constructor(nodes, paths) {
    this.nodes = nodes.map(a => new Node(a));
    this.paths = paths.map(a => new Path(a));
  }
}

export default new Graph(graph.nodes, graph.paths);
