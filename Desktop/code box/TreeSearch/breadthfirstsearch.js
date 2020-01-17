class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        const node = new _Node(data);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last !== null) {
            this.last.next = node;
        }

        this.last = node;
    }

    dequeue() {
        if (this.first === null) {
            return
        }

        let node = this.first;

        this.first = this.first.next;

        if (node === this.last) {
            this.last = null;
        }

        return node.value;

    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        let newNode = new Node(data);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode) //call recursively
            }
        }

        else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode)//recursively continues down the right path
            }
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, key) {
        if (node === null) {
            return null;
        }

        else if (key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        }

        else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        }

        else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if (node.left === null) { //There is a node to the right
                node = node.right;
                return node;
            }

            else if (node.right === null) {
                node = node.left;
                return node;
            }

            let tempNode = this.findMinNode(node.right);
            node.data = tempNode.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
    }

    bfs(tree, values = []) {
        const queue = new Queue();
        const node = tree.root;
        queue.enqueue(node);
        while (queue.length) {
            const node = queue.dequeue();
            values.push(node.value);

            if (node.left) {
                queue.enqueue(node.left);
            }

            if(node.right) {
                queue.enqueue(node.right);
            }
        }

        return values;
    }

}

