import graph from './model/graph'

const isPlayer = ({owner}) => owner === 'player';
const dist = (n1, n2) => {
  const dx = n2.x - n2.x;
  const dy = n2.y - n2.y;
  return Math.sqrt(dx * dx - dy * dy);
};

const addGeneration = (a, b) => a + b.generation;
const getPath = (name1, name2) => graph.paths
  .find(({node1, node2}) =>
    node1 === name1 && node2 === name2 ||
    node1 === name2 && node2 === name1
  );

const createWarParty = (fromNode, toNode) => ({
  owner: fromNode.owner,
  power: fromNode.defence,
  startTime: Date.now(),
  toNode
});

export const getNode = nodeName => graph.nodes.find(({name}) => name === nodeName);

export const generate = () => {
  getNode('nest').defence += graph.nodes
  .filter(isPlayer)
  .reduce(addGeneration, 0);
};

export const sendWarParty = (fromNode, toNode) => {
  const path = getPath(fromNode.name, toNode.name);
  const warParty = createWarParty(fromNode, toNode);
  path.parties.push(warParty);
  fromNode.defence = 0;
  return warParty;
};

export const fight = ({owner, power, toNode}) => {
  if (owner === toNode.owner) {
    toNode.defence += power;
  }

  if (toNode.defence >= power) {
    return;
  }

  toNode.owner = owner;
  toNode.defence = power - toNode.defence;
};

let lastGenerationTime = 0;
export const step = now => {
  if (now - lastGenerationTime > 5000) {
    lastGenerationTime = now;
    generate();
  }

  // warparties at target?
  graph.paths.reduce((a, b) => {
    const {node1, node2, parties} = b;
    const attackerParties = parties
    // .filter(({startTime}) => now - startTime > dist(getNode(node1), getNode(node2)));
    if (attackerParties.length) {
      attackerParties.forEach(fight);
    }
    b.parties = parties.filter(c => !attackerParties.some(d => d === c));
  }, []);
};
