class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    //검색
    find(value) {
        let currNode = this.head;
        try {
            while(currNode.value !== value) {
                currNode = currNode.next;
            }
        }catch(e) {
            console.log(`${e.name} :: ${e.message}`);
        }
        return currNode;
    }

    //맨 뒤 노드에 추가
    append(newValue) {
        const newNode = new Node(newValue);
        try {
            if(this.head === null) {
                this.head = newNode;
                this.tail = newNode;
            }else {
                this.tail.next = newNode;
                this.tail = newNode;
            }
            this.size++;
        }catch(e) {
            console.log(`${e.name} :: ${e.message}`);
        }
    }

    //중간에 노드 추가
    insert(node, newValue) {
        const newNode = new Node(newValue);
        try {
            newNode.next = node.next;
            node.next = newNode;
            this.size++;
        }catch(e) {
            console.log(`${e.name} :: ${e.message}`);
        }
        
    }

    //삭제
    remove(value) {
        let prevNode = this.head;
        try {
            while(prevNode.next.value !== value) {
                prevNode = prevNode.next;
            }
    
            if(prevNode.next !== null) {
                prevNode.next = prevNode.next.next;
                this.size--;
            }
        }catch(e) {
            console.log(`${e.name} :: ${e.message}`);
        }
    }

    //출력
    display() {
        let currNode = this.head;
        let displayString = '[';
        try {
            while(currNode !== null) {
                displayString += `${currNode.value}, `;
                currNode = currNode.next;
            }
            displayString = displayString 
                .substr(0, displayString.length - 2);
        }catch(e) {
            console.log(`${e.name} :: ${e.message}`);
        }
        displayString += ']';
        console.log(displayString);
    }

    //리스트 크기
    getSize() {
        return this.size;
    }   

}

//test
const linkedList = new SinglyLinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(5);
linkedList.display(); //[1, 2, 3, 5]
console.log(linkedList.getSize()); //4
console.log(linkedList.find(3)); //Node { value: 3, next: Node { value: 5, next: null } }
linkedList.remove(3);
linkedList.display(); //[1, 2, 5] 
console.log(linkedList.getSize()); //3
linkedList.insert(linkedList.find(2), 10);
linkedList.display(); //[1, 2, 10, 5]
console.log(linkedList.getSize()); //4

