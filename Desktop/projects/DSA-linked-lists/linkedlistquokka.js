class _Node { //'_' deliniates a private class - only accessible in the linked list class
    constructor(value, next, previous) {
        this.value = value;
        this.next = next;
        this.previous = previous;
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
                console.log(currNode)
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


