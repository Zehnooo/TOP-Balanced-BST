import Tree from './Tree.js';

const t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 43, 52, 55, 67, 84, 91]);

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) { return; }
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

t.insert(10);

prettyPrint(t.root);

function log(value){
    console.log(value);
}

const square = (v) => { console.log(v * v); }

/*
t.levelOrder(log);
t.levelOrder(square);
t.levelOrder('chicken');

t.inOrder(log);
 */

//t.postOrder(log);

console.log(t.height(5));