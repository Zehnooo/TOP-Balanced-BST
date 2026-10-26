export default class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        if (this.length() === 0) { console.error('Queue is empty'); }
        return this.items.shift();
    }
    length() {
        return this?.items?.length || 0;
    }
    peek() {
        return this?.items[0];
    }
}