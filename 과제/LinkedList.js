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
        if(this.head === null) return null;
        let currNode = this.head;
        while(currNode.value !== value) {
            currNode = currNode.next;
        }
        return currNode;
    }

    //맨 뒤 노드에 추가
    append(newValue) {
        const newNode = new Node(newValue);
        if(this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        }else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    //중간에 노드 추가
    insert(node, newValue) {
        const newNode = new Node(newValue);
        newNode.next = node.next;
        node.next = newNode;
        if(node.next === this.tail) this.tail = newNode;
        this.size++;
    }

    //삭제
    remove(value) {
        let prevNode = this.head;
        while(prevNode.next.value !== value) {
            prevNode = prevNode.next;
        }

        if(prevNode.next !== null) {
            prevNode.next = prevNode.next.next;
            this.size--;
        }
    }

    //출력
    display() {
        let currNode = this.head;
        let displayString = '[';
        while(currNode !== null) {
            displayString += `${currNode.value}, `;
            currNode = currNode.next;
        }
        displayString = displayString 
            .substr(0, displayString.length - 2);
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
console.log(linkedList.find(2));
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

