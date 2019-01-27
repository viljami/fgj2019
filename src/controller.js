import graph from './model/graph'

const isTeam = team => ({owner}) => owner === team;
const dist = (n1, n2) => {
  const dx = n2.x - n1.x;
  const dy = n2.y - n1.y;
  return Math.sqrt(dx * dx + dy * dy);
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
  duration: dist(fromNode,toNode)*10,
  endTime: Date.now(),
  id: Phaser.Math.RND.uuid(),
  fromNode,
  toNode
});

export const getNodes = nodeName => graph.nodes.filter(({name}) => name.includes(nodeName));
export const getNode = nodeName => graph.nodes.find(({name}) => name === nodeName);

export const generate = () => {
  getNodes('nest').forEach(n =>
    n.defence += graph.nodes
    .filter(isTeam(n.owner))
    .reduce(addGeneration, 0)
  );
};

export const sendWarParty = (fromNode, toNode) => {
  if (!fromNode.defence) {
    return;
  }

  const path = getPath(fromNode.name, toNode.name);
  if (!path) {
    return;
  }

  const warParty = createWarParty(fromNode, toNode);

  path.parties.push(warParty);
  fromNode.defence = 0;
};

export const fight = ({owner, power, toNode}) => {
  if (owner === toNode.owner) {
    toNode.defence += power;
    return;
  } else if (toNode.defence >= power ) {
    console.log(toNode.owner, owner);
    toNode.defence -= power;
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
    .filter(({startTime, duration}) => now - startTime > duration);
    if (attackerParties.length) {
      attackerParties.forEach(fight);
    }
    b.parties = parties.filter(c => !attackerParties.some(d => d === c));
  }, []);
};

export const isVictory = () =>
  graph.nodes.every(({owner}) => owner === 'player') ||
  (graph.nodes
  .filter(({owner}) => owner === 'computer')
  .every(({defence}) => !defence) &&
  !graph.paths.filter(({parties}) =>
    !parties.every(({owner}) => owner !== 'computer')
  ).length)

export const isDefeat = () =>
  graph.nodes.every(({owner}) => owner === 'computer') ||
  (graph.nodes
  .filter(({owner}) => owner === 'player')
  .every(({defence}) => !defence) &&
  !graph.paths.filter(({parties}) =>
    !parties.every(({owner}) => owner !== 'player')
  ).length);
