//BUBBLE SORT

function swap(array, i, j) { //i is one index, j is the second index
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp; //tmp or array[i]
};

function bubbleSort(array) {
    let swaps = 0;

    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    if (swaps > 0) {
        return bubbleSort(array) //keep returning until no swaps are required
    }
}


//MERGE SORT

function mergeSort(array) {
    if (array.length <= 1) { //mergeSort is repeated until only individual items are present
        return array;
    }

    const middle = Math.floor(array.length / 2); //get the middle index of the array
    let left = array.slice(0, middle) //slice from start to middle
    let right = array.slice(middle, array.length); //slice from middle to end

    left = mergeSort(left); //run mergeSort again with an array half the size
    right = mergeSort(right);

    return merge(left, right, array);
}

//merge function merges the left/right elements in the correct order

function merge(left, right, array) { //utilizes an extra array
    let leftIndex = 0; //all indexes start at zero
    let rightIndex = 0;
    let outputIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) { //while not at the end of either left or right arrays
        if (left[leftIndex] < right[rightIndex]) { //if left value is less than right value at same position
            array[outputIndex++] = left[leftIndex++]; //
        } else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }

    return array;
}


//QUICKSORT

function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }

    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);

    return array;
}

function partition(array, start, end) {
    const pivot = array[end - 1]; //last element is the pivot
    let j = start;

    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }

    swap(array, end - 1, j);
    return j;
}


//BUCKET SORT

function bucketSort(array, bucketSize) {
    if (array.length === 0) {
        return array;
    }

    //Determine minimum and maximum values

    let i;
    let minValue = array[0];
    let maxValue = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        } else if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }

    let DEFAULT_BUCKET_SIZE = 5;
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let buckets = new Array(bucketCount);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //Distrubute the array values into buckets
    for (let i = 0; i < array.length; i++) {
        buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
    }

    //Sort the buckets and place back into input array
    array.length = 0;
    for (let i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);
        for (let j = 0; j < buckets[i].length; j++) {
            array.push(buckets[i][j]);
        }
    }

    return array;
}

function insertionSort(array) {
    let length = array.length;
    for(let i = 0; i < length; i++) {
        let el = array[i];
        let j;

        for (j = i-1; j >= 0 && array[j] > el; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = el;
    }
    return array;
}


//INSERTION SORT (for smaller arrays) 

function insertionSort(array) {
    let length = array.length;
    for(let i = 0; i < length; i++) {
        let el = array[i];
        let j;

        for (j = i-1; j >= 0 && array[j] > el; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = el;
    }
    return array;
}