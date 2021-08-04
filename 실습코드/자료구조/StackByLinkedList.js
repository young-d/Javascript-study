class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    push(value) {
        const node = new Node(value);
        node.next = this.top;
        this.top = node;
        this.size++;
    }

    pop() {
        const value = this.top.value;
        this.top = this.top.next;
        this.size--;
        return value;
    }

    size() {
        return this.size;
    }
}

//test
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); //3
stack.push(4);
console.log(stack); //Stack {top: Node { value: 4, next: Node { value: 2, next: [Node] } },size: 3}
console.log(stack.pop()); //4