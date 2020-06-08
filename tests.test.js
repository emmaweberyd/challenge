const topologicalSort = require('./topologicalSort');
const { buildGraph } = require('./solution');

test('builds graph from task', () => {
    const database = require('./database');
    graph = buildGraph(database);
    trueGraph = new Map();
    trueGraph.set('invoices', new Set(['users', 'clients']));
    trueGraph.set('payment_request', new Set(['users']));
    trueGraph.set('line_items', new Set(['invoices']));

    trueGraph.set('users', new Set());
    trueGraph.set('audit_log', new Set());
    trueGraph.set('clients', new Set())

    expect(graph).toEqual(trueGraph);
    expect(graph.size).toEqual(database.length);
});

test('builds graph from empty db to equal empty Map', () => {
    graph = [];
    expect(buildGraph(graph)).toEqual(new Map());
});

// Empty graph
test('sorts empty graph to equal []', () => {
    expect(topologicalSort(new Map())).toEqual([]);
});

// Cyclic graph
test('sorts cyclic graph to equal error', () => {
    graph = new Map();
    graph.set('a', 'b');
    graph.set('b', 'a');

    expect(topologicalSort(graph)).toEqual('No solution: circular dependencies');
});

// Given task
// Also test disconnectivity
test('sorts graph from task to validate order', () => {
    const database = require('./database.json');
    graph = buildGraph(database);
    order = topologicalSort(graph);

    const payment_request = order.indexOf('payment_request');
    const users = order.indexOf('users');
    const clients = order.indexOf('clients');
    const invoices = order.indexOf('invoices');
    const line_items = order.indexOf('line_items');

    // users should come before payment_request
    expect(users).toBeLessThan(payment_request);

    // users should come before invoices
    expect(users).toBeLessThan(invoices);

    // clients should come before invoices
    expect(clients).toBeLessThan(invoices);

    // invoices should come before line_items
    expect(invoices).toBeLessThan(line_items);
});
