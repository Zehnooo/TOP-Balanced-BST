
export default class Tree {
    constructor(arr) {
        this.root = this.#buildTree(arr);
    }
    #buildTree(arr) {
        let sorted = [...new Set(arr)].sort((a, b) => a - b);
        sorted.forEach((value, index) => {
            const currentValue = value;
            const nextValue = sorted[index + 1];
          //  console.log({currentValue, nextValue});
        });
        // middle
        return sorted[Math.floor(sorted.length / 2)];
    }

}