class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class Tree {
    constructor(node) {
        this.root = node;
    } 

    //전위 순회
    preOrder(node, array) {
        if(!node) return;

        // process.stdout.write(`${node.value} `);
        array.push(node.value);
        this.preOrder(node.left, array);
        this.preOrder(node.right, array);
    }

    //중위 순회
    inOrder(node, array) {
        if(!node) return;

        this.inOrder(node.left, array);
        // process.stdout.write(`${node.value} `);
        array.push(node.value);
        this.inOrder(node.right, array);
    }

    //후위 순회
    postOrder(node, array) {
        if(!node) return;

        this.postOrder(node.left, array);
        this.postOrder(node.right, array);
        // process.stdout.write(`${node.value} `);
        array.push(node.value);
    }

}

const tree = new Tree(new Node(1));
tree.root.left = new Node(2);
tree.root.left.left = new Node(3);
tree.root.left.right = new Node(4);
tree.root.right = new Node(5);
tree.root.right.left = new Node(6);
tree.root.right.right = new Node(7);

console.log(`preorder: `);
const preorder = [];
tree.preOrder(tree.root, preorder);
console.log(...preorder);
console.log(`inorder: `);
const inorder = [];
tree.inOrder(tree.root, inorder);
console.log(...inorder);
console.log(`postorder: `);
const postorder = [];
tree.postOrder(tree.root, postorder);
console.log(...postorder);

/** 실행결과
preorder: 
1 2 3 4 5 6 7
inorder:
3 2 4 1 6 5 7
postorder:
3 4 2 6 7 5 1 %
*/