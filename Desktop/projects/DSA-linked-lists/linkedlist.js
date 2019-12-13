class _Node { //'_' deliniates a private class - only accessible in the linked list class
    constructor(value, next, previous) {
        this.value = value;
        this.next = next;
        }
}

class LinkedList {
    constructor() {
        this.head = null; //head starts at null since the list is empty - head indicates the beginning of the list
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }

    insertBefore(item, newItem) {

        let currNode = this.head;

        if (this.head === null) {
            this.insertFirst(item)
        }

        while (currNode.value !== item) {
            if (currNode.next === null) {
                return null;
            }
            //Otherwise, keep looking/scanning
            else {
                currNode = currNode.next;
            }
        }

        currNode.previous = new _Node(newItem, item)
    }

    insertAfter(item, newItem) { //item = t, newItem = d
        let current = this.head;

        while (current !== null) {
            if (current.value === item) {
                let temp = new _Node;
                temp.value = newItem;
                temp.next = current.next;
                if (current == this.end) {
                    this.end = temp;
                }
                current.next = temp
                return
            }
            current = current.next;
        }
    }


    insertLast(item) {
        if (this.head === null) { //if the head is null, that means there are no items in the list, so insert at start
            this.insertFirst(item)
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) { //Keep scanning the list until the end is found, signified by the null head
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null)
        }
    }

    insertAt(item, index) {
        if (index > 0) {
            return false;
        }
        else {
            let temp = new _Node(item);
            let curr = this.head;
            let prev

            if (index === 0) {
                temp.next = head;
                this.head = temp;
            } else {
                let curr = head;
                let it = 0;

                while (it < index) {
                    it ++;
                    prev = curr;
                    curr = curr.next;

                }

                temp.next = curr;
                prev.next = temp
            }
        }
    }

    find(item) {
        //Starting at the head
        let currNode = this.head;
        // If the list is empty
        if (!this.head) {
            return null;
        }
        //Check for the item, moving down the nodes in the list
        while (currNode.value !== item) { //Keep scanning until the value at the node equals the item
            //Return null if you reach the end of the list and the item wasn't found
            if (currNode.next === null) {
                return null;
            }
            //Otherwise, keep looking/scanning
            else {
                currNode = currNode.next;
            }
        }
        return currNode //Return if the value is found
    }

    remove(item) {
        //If the list is empty
        if (!this.head) {
            return null;
        }
        //If the node to be removed is the head, create the next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }

        //Start at the head
        let currNode = this.head;
        //Keep track of previous nodes scanned
        let previousNode = this.head;
        
        while ((currNode !== null) && (currNode.value !== item)) { //while the value hasn't been found yet, or when the current node doesn't exist
            //Save the previous node
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }

}

let display = function(linkedList) {
    console.log(linkedList)
}

let size = function(linkedList) {
    let head = linkedList.head

    let current = head

    let count = 0;

    while(current !== null) {
        count ++;
        current = current.next
    }

    return count
}

let isEmpty = function(linkedList) {
    let head = linkedList.head

    if (head == null) {
        return true 
    }

    return false
}

let findPrevious = function(linkedList, item) {
    let head = linkedList.head;

    let current = head;

    while (current.next.value !== item) {
        current = current.next
    }

    return current
}

let findLast = function(linkedList) {
    let head = linkedList.head;

    let current = head;

    while (current.next !== null) {
        current = current.next;
    }

    return current
}

let printList = function(linkedList) {
    let head = linkedList.head;

    let nodes = [];

    let current = head;

    while (current.next !== null) {
        nodes.push(current)

        current = current.next;
    }

    return nodes;
}


let main = function(items) {

    let SSL = new LinkedList();


    items.forEach(item => {
        SSL.insertLast(item)
    })

    return SSL
}

const items = ['Apollo', 'Boomer', 'Helo', 'Husker', 'Starbuck']

let SSL = main(items)

console.log(SSL)

SSL.insertLast('Tauhida')

console.log(SSL.find('Tauhida'))

SSL.remove('Husker')

console.log(SSL.find('Starbuck'))

SSL.insertBefore('Boomer', 'Kinda')

SSL.insertAfter('Boomer', 'Kinda')

console.log(SSL.find('Boomer'))

SSL.insertAt('TestInsert', 3)

console.log(SSL.find('TestInsert'))

SSL.insertBefore('Boomer', 'Athena')

console.log(SSL.find('Apollo'))

SSL.insertAt('Kat', 3)

SSL.insertAfter('Helo', 'Hotdog')

console.log(SSL.find('Hotdog'))

SSL.remove('Tauhida')

console.log(size(SSL))

console.log(SSL)

console.log(findPrevious(SSL, 'Boomer'))

console.log(findLast(SSL))

console.log(printList(SSL))

//Analyze mystery program:

function WhatDoesThisProgramDo(lst) {
    let current = lst.head; //initalizes the search at input linked list head
    while (current !== null) { //while not at the end of the list
        let newNode = current; //
        while (newNode.next !== null) { //while the next node is not empty
            if (newNode.next.value === current.value) { //If the next node's value is the same as the current value
                newNode.next = newNode.next.next; //Change the next node's value to the value of the node after the next node
            }
            else { //ELSE - if the next value in relation to the current node IS NOT the same as the current node's value
                newNode = newNode.next; //Make the current node's value the same as the next node's value
            }
        }
        current = current.next; //When the next node equals null, end the list/create a null node
    }
}

//The above function is trying to make every node in the list the same value/assimilate an entire linked list to all have
//the same values. I believe the time complexity of this function to be O(n)/linear.

//Reverse a list: changing the next pointer of each node to the previous node

let reverseList = function(linkedList) {
    if(!linkedList.head || !linkedList.head.next) {
        return linkedList;
    }

    let current = linkedList.head;

    let nodes = [];

    while (current) {
        nodes.push(current)
        current = current.next
    }

    let reversedLinkedList = new LinkedList()

    reversedLinkedList.head = nodes.pop(); //takes the last node in the nodes array, taken from the linkedlist
    current = reversedLinkedList.head; // current node now equals the head of the reversed list, which is now the same as the last node in original list

    let node = nodes.pop() //node equals the end of the nodes array

    while (node) {
        node.next = null;
        current.next = node; //next value in the reversedLL will be the popped node from the original LL
        
        current = current.next;
        node = nodes.pop() //Pop another node off of the node array
    }
    return reversedLinkedList
}


//3rd from the end:

console.log(printList(SSL))

let thirdFromEnd = function (linkedList) {
    let current = linkedList.head 

    while (current.next.next.next !== null) {
        current = current.next;
    } 

    return current;
}

console.log(thirdFromEnd(SSL))

//Middle of a list:

let middleOfList = function(linkedList) {
    let current = linkedList.head;

    let count = 0;

    while (current.next !== null) {
        current = current.next;
        count ++;
    } 

    let currentTwo = linkedList.head;

    countTwo = 0;

    while (countTwo !== count/2) {
        currentTwo = currentTwo.next;
        countTwo ++;
    }

    return current
}

console.log(middleOfList(SSL))

//Cycle in a list: see if any of the nodes' next nodes point to a node earlier in the list

let cycleList = function(linkedList) {
    let current = linkedList.head;

    let nodes = [];

    while (current.next !== null) {
        while (!nodes.includes(current)) {

            let nodeToAdd = current
            nodes.push(nodeToAdd)
            current = current.next
        }

        return true;
    }

    return false;
}

SSL.insertAfter('Helo', 'Boomer')

console.log(cycleList(SSL))

//Sorting a list:

let sortList = function(linkedList) {

    let size = size(linkedList)

    for (let i = 0; i < size; i++) {
        let currentNode = linkedList.head;
        let next = currentNode.next;
        for (let j = 0; j < size - 1; j++) {
            if (currentNode.value > next.value) {
                let temp = currentNode;
                currentNode = next;
                next = temp;
            }
            currentNode = next;
            next = next.next;
        }
    }
}
