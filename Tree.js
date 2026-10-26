import Node from './Node.js';

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
}
