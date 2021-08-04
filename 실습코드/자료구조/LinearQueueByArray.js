class LinearQueue {
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

    peek() {
        return this.queue[this.front];
    }

    size() {
        return this.rear - this.front;
    }
}

//test
const queue = new LinearQueue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(4);
console.log(queue.dequeue()); //1 
queue.enqueue(8);
console.log(queue.size()); // 3
console.log(queue.peek()); //2
console.log(queue.dequeue()) // 2
console.log(queue.dequeue()) // 4