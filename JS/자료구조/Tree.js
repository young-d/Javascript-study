class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(value) {
        this.queue[this.rear++] = value;
    }

    dequeue() {
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front++;
        return value;
    }

    size() {
        return this.rear - this.front;
    }
}

class Tree {
    constructor(node) {
        this.root = node;
    } 

    display() {
        //level Order
        const queue = new Queue();
        queue.enqueue(this.root);
        while(queue.size()) {
            const currNode = queue.dequeue();
            console.log(currNode.value);
            if(currNode.left) queue.enqueue(currNode.left);
            if(currNode.right) queue.enqueue(currNode.right);
        }
    }
}

const tree = new Tree(new Node(1));
tree.root.left = new Node(2);
tree.root.left.left = new Node(3);
tree.root.left.right = new Node(4);
tree.root.right = new Node(5);
tree.root.right.left = new Node(6);
tree.root.right.right = new Node(7);

tree.display();