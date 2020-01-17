class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        const node = new Node(data);

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
            return;
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

  insertNumberNode(data, left = null, right = null) {
    //creating a Node
    //data we pass will act as individual parent Node
    //left and right are subtrees
    let Node = {
      data,
      left,
      right
    };
    //suppose currentNumberNode as a parent node
    //current Num Node value decides position of next value
    //if it goes to left subtree or right subtree
    let currentNumberNode;

    if (!this.root) {
      //if its not a root make it one by passing a Node
      this.root = Node;
    } else {
      //and if its a root now, assign it to currentNumberNode
      currentNumberNode = this.root;
      while (currentNumberNode) {
        //if data is smaller than cuurent data, send it in left subtree
        if (data < currentNumberNode.data) {
          //if current num node don't have Node properties
          //we will assign it node properties
          if (!currentNumberNode.left) {
            currentNumberNode.left = Node;
            break;
          } else {
            //if it has node properties and it is sent by root to left
            //we will make it a left node because it is smaller than root node
            currentNumberNode = currentNumberNode.left;
          }
          //if data is larger than cuurent data, send it in right subtree
        } else if (data > currentNumberNode.data) {
          //if current num node don't have Node properties
          //we will assign it node properties
          if (!currentNumberNode.right) {
            currentNumberNode.right = Node;
            break;
          } else {
            //if it has node properties and it is sent by root to right
            //we will make it a right node because it is larger than root node
            currentNumberNode = currentNumberNode.right;
          }
        } else {
          console.log("Try Different Value");
          break;
        }
      }
    }
  }

  bfs(tree) {
      const queue = new Queue();
      let values = [];
      const node = tree.root;
    
      queue.enqueue(node);

      while (queue.dequeue() !== undefined) {
          const node = queue.dequeue();
          values.push(node.data);

          if (node.left) {
              queue.enqueue(node.left);
          }

          if (node.right) {
              queue.enqueue(node.right);
          }
      }

      return values;
  }

  dfs() {
      let values = [];

      if (this.left) {
          values = this.left.dfs(values);
      }
      values.push(this.data);

      if(this.right) {
          values = this.right.dfs(values);
      }
      return values;
  }
}

let testTree = new BinarySearchTree();

testTree.insertNumberNode(42);
testTree.insertNumberNode(12);
testTree.insertNumberNode(75);
testTree.insertNumberNode(16);
testTree.insertNumberNode(54);
testTree.insertNumberNode(93);
testTree.insertNumberNode(22);
testTree.insertNumberNode(55);
testTree.insertNumberNode(69);

console.log(testTree.dfs());



function binarySearch(array, value, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end);
    if (item == value) {
        return index;
    }
    else if (item < value) {
        return binarySearch(array, value, index + 1, end); //start is now index + 1
    }
    else if (item > value) {
        return binarySearch(array, valuie, start, index - 1); //end is now index - 1
    }
}