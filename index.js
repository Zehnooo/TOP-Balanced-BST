import Tree from './Tree.js';

const t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// Test Numbers
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


t.insert(10);
t.insert(100);
t.insert(10000);
t.insert(1000000);
t.insert(11);
t.insert(11);
t.insert(11);
t.insert(24);
t.insert(23);
t.insert(25);


t.deleteItem(67);
t.deleteItem(6345);
t.deleteItem(8);
prettyPrint(t.root);

function log(value){
    console.log(value);
}

const square = (v) => { console.log(v * v); }

t.levelOrderForEach(square);
//t.levelOrderForEach('chicken');