class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }

        return this._hashTable[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if(loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }

        const index = this._findSlot(key);

        if(!this._hashTable[index]) {
            this.length ++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        };
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;

        this.length = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined) {
                this.set(slot.key, slot.value)
            }
        }
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error')
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }
}



let lotr = new HashMap();

lotr.MAX_LOAD_RATIO = 0.5;
lotr.SIZE_RATIO = 3;

lotr.set('Hobbit', 'Bilbo')
lotr.set('Hobbit', 'Frodo')
lotr.set('Wizard', 'Gandolf')
lotr.set('Human', 'Aragon')
lotr.set('Elf', 'Legolas')
lotr.set('Maiar', 'The Necromancer')
lotr.set('Maiar', 'Sauron')
lotr.set('RingBearer', 'Gollum')
lotr.set('LadyOfLight', 'Galadriel')
lotr.set('HalfElven', 'Arwen')
lotr.set('Ent', 'Treebeard')

console.log(lotr)

console.log(lotr.get('Maiar'))
console.log(lotr.get('Hobbit'))

//What does this thing do?

/* const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
} */

//The output of the above code is 1020;

//4) remove duplicates 

function removeDuplicates(string) {
    let stringArray = string.split('')

    let stringHashMap = new HashMap();

    stringArray.map((char, i) => {
        stringHashMap.set(i, char)
    })

    console.log(stringHashMap)
}

console.log(removeDuplicates('google all that you think can think of'))

function removeDuplicatesTwo(string) {
    let stringArray = string.toLowerCase().split('')

    let result = [];

    stringArray.map(char => {
        if (!result.includes(char)) {
            result.push(char)
        } 
    })

    return result.join('');
}

console.log(removeDuplicatesTwo('google all that you think can think of'))

//5) Any permutation a palindrome:

function hasPalindrome(string) {
    let hash = {};

    let charCount = 0;

    for (let i = 0; i < string.length; i++) {
        let c = string[i];
        if (c === ' ') {
            continue; //Skips the iteration
        }
        if (hash) {
            delete hash[c]
        } else {
            hash[c] = true;
        }
        charCount++;
    }
    if (charCount % 2 === 0) {
        return Object.keys(hash).length === 0;
    } else {
        return Object.keys(hash).length === 1;
    }
}



//7) Hash Map seperate chaining

class HashMapChaining {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    _hashString(key) {
        return key.toString().length % this._capacity;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }

        return this._hashTable[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if(loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }

        const index = this._hashString(key);

        if(!this._hashTable[index]) {
            this.length ++;
        }
        this._hashTable[index].push([key, value, DELETED = false])
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;

        this.length = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined) {
                this.set(slot.key, slot.value)
            }
        }
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error')
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }
}

//6) Anagram grouping:

function anagramGrouping(stringArray) {
    let stringHash = new HashMapChaining();

    stringArray.map((string, i) => {
        stringHash.set(string, i);
    })

    console.log(stringHash)
}

anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])

let testHash = new HashMapChaining();

testHash.set('cat', 2);
testHash.set('rat', 7);
testHash.set('dog', 1);
testHash.set('art', 8);
testHash.set('mat', 6);
testHash.set('bog', 3);

console.log(testHash._hashTable);