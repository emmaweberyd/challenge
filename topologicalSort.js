/**
 * Sorts a directed asyclic graph according to
 * Kahn's algorithm found here:
 * https://en.wikipedia.org/wiki/Topological_sorting.
 * @param  {Map} adjacencyList Adjacencylist implemented 
 * as a hashmap with sets of neighbour nodes. 
 * @return {Array} Sorted nodes. 
 */
function topologicalSort(adjacencyList) {
    sorted = [];
    nextNodes = [];

    adjacencyList.forEach((neighbours, node) => {
        if (neighbours.size === 0) {
            nextNodes.push(node);
            adjacencyList.delete(node);
        }
    });

    while (nextNodes.length !== 0) {
        currentNode = nextNodes.pop();
        sorted.push(currentNode);

        adjacencyList.forEach((neighbours, node) => {
            if (neighbours.has(currentNode)) {
                adjacencyList.get(node).delete(currentNode);
            }
            if (neighbours.size === 0) {
                nextNodes.push(node);
                adjacencyList.delete(node);
            }
        });
    }

    return adjacencyList.size === 0 ? sorted : 'No solution: circular dependencies';
}

module.exports = topologicalSort;