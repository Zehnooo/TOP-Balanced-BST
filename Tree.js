import Node from './Node.js';
import Queue from './Queue.js';

export default class Tree {
    constructor(arr) {
        const sorted = [...new Set(arr)].sort((a, b) => a - b);
        this.root = this.#buildTree(sorted);
    }
    #buildTree(arr) {
        if (arr.length === 0) { return null; }

        let mid = Math.floor(arr.length / 2);

        let node = new Node(arr[mid]);
        node.left = this.#buildTree(arr.slice(0, mid));
        node.right = this.#buildTree(arr.slice(mid + 1));

        return node;
    }
    includes(value) {
        let node = this.root;

        while (node !== null) {
            if (node.value === value) { return true; }
            value < node.value ? node = node.left : node = node.right;
        }
        return false;
    }
    insert(value) {
        // Handle inserting on empty trees
        if (this.root === null) { this.root = new Node(value); return; }

        let node = this.root;
        let lastNode = null;
        let direction = '';

        while (node !== null){
            //exit if dupe value
            if (value === node.value) return;
            lastNode = node;
            direction = value < node.value ? 'left' : 'right';
            node = node[direction];
        }
        // insert new node into correct open spot
        lastNode[direction] = new Node(value);
    }
    deleteItem(value) {
        if (value === undefined || value === null) { console.log('Missing Value'); return false; }
        if (!this.includes(value)) { console.log('Value not found in tree'); return false; }
        if (this.root === null) { console.log("No tree root. Make sure a tree actually exists"); return false; }
        let prevNode = null;
        let node = this.root;
        let direction = '';

        while (node !== null && node.value !== value) {
            prevNode = node;
            direction = value < node.value ? 'left' : 'right';
            node = node[direction];
        }

        if (node === null) return false;

        // If delete target has no children
        if ([node?.left, node?.right].every(n => n === null)) {
            if (prevNode === null) { this.root = null; }
            else { prevNode[direction] = null; }
            return true;
        }

        // If delete target has one child node only
        if (node.left !== null && node.right === null || node.left === null && node.right !== null) {
            // set the previous Node's child to the deletion Target's current child
            const child = node.left !== null ? node.left : node.right;
            prevNode === null ? this.root = child : prevNode[direction] = child;
            return true;
        }

        // If delete target has two child nodes
        if ([node.left, node.right].every(n => n !== null))  {
            const successor = this.successor(node);
            this.deleteItem(successor.value);
            node.value = successor.value;
        }
        return true;
    }

    successor(node) {
        node = node.right;
        while (node !== null && node.left !== null)  {
            node = node.left;
        }
        return node;
    }
    levelOrder(func){
    if (typeof func !== 'function') { throw new Error('Callback is required'); }
    if (this.root === null) return false;

    const res = [];
    const q = new Queue();
    q.enqueue(this.root);

    while (q.length() > 0) {
    let node = q.dequeue();
    res.push(node.value);
    if (node.left) q.enqueue(node.left);
    if (node.right) q.enqueue(node.right);
    }

    res.forEach(v => func(v));
    return true;
    }
    inOrder(func) {
        if (typeof func !== 'function') { throw new Error('Callback is required'); }
        if (this.root === null) return false;

        const res = [];
        this.#inOrderRecur(this.root, res);
        this.#forEach(res, func);
        return true;
    }
    #inOrderRecur(node, res) {
        if (node === null) { return; }
        this.#inOrderRecur(node.left, res);
        res.push(node.value);
        this.#inOrderRecur(node.right, res);
    }
    preOrder(func) {
        if (typeof func !== 'function') { throw new Error('Callback is required'); }
        if (this.root === null) return false;

        const res = [];
        this.#preOrderRecur(this.root, res);
        this.#forEach(res, func);
        return true;
    }
    #preOrderRecur(node, res) {
        if (node === null) { return; }
        res.push(node.value);
        this.#preOrderRecur(node.left, res);
        this.#preOrderRecur(node.right, res);
    }
    postOrder(func) {
        if (typeof func !== 'function') { throw new Error('Callback is required'); }
        if (this.root === null) return false;

        const res = [];
        this.#postOrderRecur(this.root, res);
        this.#forEach(res, func);

        return true;
    }
    #postOrderRecur(node, res) {
        if (node === null) return;
        this.#postOrderRecur(node.left, res);
        this.#postOrderRecur(node.right, res);
        res.push(node.value);
    }
    #forEach(arr, func) { arr.forEach(x => func(x)); }
    height(value) {
        const node = this.#find(value);
        return node === undefined ? undefined : this.#heightRecur(node);
    }
    #heightRecur(node) {
        if (node === null) return -1;

        const leftHeight = this.#heightRecur(node.left);
        const rightHeight = this.#heightRecur(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value) {
        return this.#depthRecur(this.root, value);
    }
    #depthRecur(node, value) {
        if (node === null) return undefined;
        if (node.value === value) return 0;

        let direction = value < node.value ? 'left' : 'right';
        const depth = this.#depthRecur(node[direction], value);

        return depth === undefined ? undefined : depth + 1;
    }

    #find(value) {
        let node = this.root;

        while (node !== null) {
            if (node.value === value) { return node; }
            value < node.value ? node = node.left : node = node.right;
        }

        return undefined;
    }
    isBalanced() {
        const root = this.root;
        if (root === null) { return true; }
        if (root.left === null && root.right === null) { return true; }
        return this.#balancedRecur(root);
    }
    #balancedRecur(node) {
        if (node === null) return true;

        const left =
            node.left === null ? -1 : this.height(node.left.value);

        const right =
            node.right === null ? -1 : this.height(node.right.value);

        if (Math.abs(left - right) > 1) return false;

        return [node.left, node.right].every( c => { return this.#balancedRecur(c); });
    }
    rebalance() {
        const values = [];
        this.inOrder(val => { values.push(val); });
        const root = this.#buildTree(values);
        this.root = root;
        return root !== null;
    }

}
