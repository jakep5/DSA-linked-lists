class HashMapTwo {
    constructor(initialCapacity = 2) {
        this.buckets = new Array(initialCapacity);
        this.collisions = 0;
    }

        set(key, value) {
            const bucketIndex = this.getIndex(key);
            if (this.buckets[bucketIndex]) {
                this.buckets[bucketIndex].push({key, value});
                if (this.buckets[bucketIndex].length > 1) {
                    this.collisions ++;
                } else {
                    this.buckets[bucketIndex] = [{key, value}]
                }
                return this;
            }
        }

        get(key) {
            const bucketIndex = this.getIndex(key);
            for (let arrayIndex = 0; arrayIndex < this.buckets[bucketIndex].length; arrayIndex++) {
                const entry = this.buckets[bucketIndex][arrayIndex];
                if (entry.key === key) {
                    return entry.value;
                }
            }
        }

        hash(key) {
            let hashValue = 0;
            const stringTypeKey = `${key}${typeof key}`;

            for (let index = 0; index < stringTypeKey.length; index++) {
                const charCode = stringTypeKey.charCodeAt(index);
                hashValue += charCode << (index * 8);
            }

            return hashValue;
        }


        getIndex(key) {
            const indexHash = this.hash(key);
            const index = indexHash % this.buckets.length;
            return index;
        }
}

let lotr = new HashMapTwo();

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


console.log(lotr);