class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(value) {
        // this.queue[this.rear++] = value;
        this.queue.push(value);
        this.rear++;
    }

    dequeue() {
        // const value = this.queue[this.front];
        const value = this.queue.find((_, index) => index === this.front);
        delete this.queue[this.front];
        this.front++;
        return value;
    }

    size() {
        return this.rear - this.front;
    }
}

class Node {
    constructor(value = "") {
        this.value = value;
        this.children = new Map();
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(string) {
        let currNode = this.root;

        for (const char of string) {
            if (!currNode.children.has(char)) {
                currNode.children.set(
                    char,
                    new Node(currNode.value + char)
                );
            }

            currNode = currNode.children.get(char);
        }
    }

    findNode(string) {
        let currNode = this.root;

        for (const char of string) {
            if (!currNode.children.has(char)) return false;
            
            currNode = currNode.children.get(char);
        }

        return currNode;
    }

    autoComplete(string) {
        const firstNode = this.findNode(string);

        //Trie에 해당 문자열을 가진 노드가 없다면 빈 값을 반환
        if (!firstNode) return [];
        
        const queue = new Queue();
        const words = [];

        //시작 노드부터 레벨 순회 
        queue.enqueue(firstNode);

        while (queue.size()) {
            let currNode = queue.dequeue();
            console.log(queue, currNode.value);

            //자식 노드가 있으면 자식 노드들의 value를 queue에 넣고, 자식 노드가 없다면 leaf 노드 이므로 value를 반환값에 추가
            if (currNode.children.size) {
                [...currNode.children.values()].map((value) => queue.enqueue(value));
            }else {
                words.push(currNode.value);
            }
        }
        
        return words;
    }
}

const trie = new Trie();
trie.insert("cat");
trie.insert("can");
trie.insert("cookie");
trie.insert("cool");
trie.insert("cobalt");
trie.insert("course");

console.log(trie.autoComplete('coo'));

/*실행결과
[ 'cool', 'cookie', 'cobalt', 'course' ]
*/