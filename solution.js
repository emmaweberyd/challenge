const topologicalSort = require('./topologicalSort');

function sortTables(filePath) {
    const database = require(filePath);
    const tableGraph = buildGraph(database);
    return topologicalSort(tableGraph);
}

function buildGraph(database) {
    
    const graph = new Map();

    database.forEach(function (table) {
        graph.set(table.name, new Set(table.columns
            .filter(col => col.foreign_key != null)
            .map(col => col.foreign_key.split('.')[0])
        ));
    });

    return graph;  
}

module.exports = { sortTables, buildGraph };
