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
        if (!value) return false;
        if (!this.includes(value)) return false;
        if (this.root === null) return false;
        let prevNode = null;
        let node = this.root;
        let direction = '';

        while (node !== null && node.value !== value) {
            prevNode = node;
            direction = value < node.value ? 'left' : 'right';
            node = node[direction];
        }

        if (node === null) return false;
        if (node.left === null && node.right === null) {
            // if target node is root AND leaf
            if (prevNode === null) this.root = null;
            prevNode[direction] = null;

            return true;
        }

        if (node.left !== null || node.right !== null){
            console.log('fuck');
        }


        return true;
    }
}