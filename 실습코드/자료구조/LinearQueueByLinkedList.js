class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinearQueue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    enqueue(newValue) {
        const newNode = new Node(newValue);
        if(this.head === null) {
            this.head = this.tail = newNode;
        }else {
            this.tail.next = this.tail = newNode;
        }
        this.size++;
    }

    dequeue() {
        const value = this.head.value;
        this.head = this.head.next;
        this.size--;
        return value;
    }

    peek() {
        return this.head.value;
    }
}

//test
const queue = new LinearQueue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(4);
console.log(queue.dequeue()); //1 
queue.enqueue(8);
console.log(queue.size); // 3
console.log(queue.peek()); //2
console.log(queue.dequeue()) // 2
console.log(queue.dequeue()) // 4