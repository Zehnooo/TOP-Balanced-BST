import Node from './Node.js';

export default class Tree {
    constructor(arr) {
        const sorted = [...new Set(arr)].sort((a, b) => a - b);
        console.log(sorted);
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

}