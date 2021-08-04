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
}

function solution(priorities, location) {
    let answer = 0;
    const queue = new LinearQueue();
    
    for(let i = 0; i < priorities.length; i++) {
        queue.enqueue([priorities[i], i]);
    }
    
    priorities.sort((a, b) => b - a);
    
    let count = 0;
    while(queue.size > 0) {
        let curr = queue.dequeue();
        if(curr[0] < priorities[count]) {
            queue.enqueue(curr);
        }else {
            count++;
            if(curr[1] === location) return count;
        }
    }
    
    return answer;
}