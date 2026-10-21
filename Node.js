
export default class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    setLinkedNode(direction, node) { this[direction] = node; }
}