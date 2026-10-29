import Tree from './Tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) { return; }
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


// 1. Create a binary search tree from an array of random numbers with each element having a value less than 100. You can create a function that returns an array of random numbers every time you call it if you wish.
const t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 43, 52, 55, 67, 84, 91]);

// 2. Confirm that the tree is balanced by calling isBalanced().
console.log('2. Balanced Tree: (Expect: true)', t.isBalanced());

// 3. Print out all elements in level, pre, post, and in order.
let values = [];
console.log('3A. Level-Order: '); t.levelOrder((v) => { values.push(v); });
console.log(values); values = [];
console.log('3B. Pre-Order: '); t.preOrder((v) => { values.push(v); });
console.log(values); values = [];
console.log('3C. Post-Order: '); t.postOrder((v) => { values.push(v); });
console.log(values); values = [];
console.log('3D. In-Order: ', ); t.inOrder((v) => { values.push(v); });
console.log(values); values = [];

// 4. Unbalance the tree by adding several numbers whose value is more than 100.
for (let i = 101; i < 108; i++) { console.log('4. Inserting Value: ', i); t.insert(i); }

// 5. Confirm that the tree is unbalanced by calling isBalanced().
console.log('5. Balanced Tree: (Expect: false)', t.isBalanced());

// 6. Balance the tree by calling rebalance().
t.rebalance();

// 7. Confirm that the tree is balanced by calling isBalanced().
console.log('7. Balanced Tree: (Expect: true)', t.isBalanced());

// 8. Print out all elements in level, pre, post, and in order.

console.log('8A. Level-Order: '); t.levelOrder((v) => { values.push(v); });
console.log(values); values = [];
console.log('8B. Pre-Order: '); t.preOrder((v) => { values.push(v); });
console.log(values); values = [];
console.log('8C. Post-Order: '); t.postOrder((v) => { values.push(v);  });
console.log(values); values = [];
console.log('8D. In-Order: '); t.inOrder((v) => { values.push(v); });
console.log(values); values = [];

prettyPrint(t.root);

