class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.rott = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if(this.rott === null) {
            this.root = newNode;
            return;
        }

        let currentNode = this.root;
        while(currentNode !== null) {
            if(currentNode.value < value) {
                if(currentNode.right === null) {

                    currentNode.right = newNode;
                    break;
                }
                currentNode = currentNode.right;
            }else {
                if(currentNode.left === null) {
                    currentNode.left = newNode;
                    break;
                }
                currentNode = currentNode.left;
            }
        }

    }

    has(value) {
        let currentNode = this.root;
        while(currentNode !== null) {
            if(currentNode.value === value) {
                return true;
            }

            if(currentNode.value < value) {
                currentNode = currentNode.right;
            }else {
                currentNode = currentNode.left;
            }
        }

        return false;
    }
}

const tree = new BinarySearchTree();
tree.insert(5);
tree.insert(4);
tree.insert(7);
tree.insert(8);
tree.insert(5);
tree.insert(6);
tree.insert(2);
console.log(tree.has(8)); //true
console.log(tree.has(1)); // false