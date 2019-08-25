const INSTRUCTIONS = Object.freeze([
    'load', 'store', 'read', 'write',
    'add', 'sub', 'mult', 'div', 'mod',
    'jump', 'jzero', 'jgtz', 'halt'
]);

let memory = new Map();