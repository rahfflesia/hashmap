class HashMap {
  loadFactor = 0.75;
  array = new Array(16).fill().map(() => new LinkedList());
  capacity = this.array.length;

  hash(key) {
    let hashCode = 0;
    const primeNumber = 37;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }
  set(key, value) {
    const obj = {
      [key]: value,
    };
    let index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.has(key)) {
      let indexToRemove = this.array[index].find(key);
      this.array[index].removeAt(indexToRemove);
    }
    if (this.length() >= Math.ceil(this.capacity * this.loadFactor)) {
      let elements = this.entries();
      let newArray = new Array(this.capacity * 2)
        .fill()
        .map(() => new LinkedList());
      this.capacity = newArray.length;
      this.array = newArray;
      for (let i = 0; i < elements.length; i++) {
        this.set(elements[i][0], elements[i][1]);
      }
    }
    this.array[index].prepend(obj);
  }
  get(key) {
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.array[i].size(); j++) {
        if (this.array[i].at(j).value.hasOwnProperty(key)) {
          return this.array[i].at(j).value[key];
        }
      }
    }
    return null;
  }
  has(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    for (let i = 0; i < this.array[index].size(); i++) {
      if (this.array[index].at(i).value.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  }
  remove(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    for (let i = 0; i < this.array[index].size(); i++) {
      if (this.has(key)) {
        let indexToRemove = this.array[index].find(key);
        this.array[index].removeAt(indexToRemove);
        return true;
      }
    }
    return false;
  }
  length() {
    let acum = 0;
    for (let i = 0; i < this.capacity; i++) {
      acum += this.array[i].size();
    }
    return acum;
  }
  clear() {
    for (let i = 0; i < this.capacity; i++) {
      while (this.array[i].size() > 0) {
        this.array[i].pop();
      }
    }
  }
  keys() {
    let keys = [];
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.array[i].size(); j++) {
        keys.push(Object.entries(this.array[i].at(j).value)[0][0]);
      }
    }
    return keys;
  }
  values() {
    let values = [];
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.array[i].size(); j++) {
        values.push(Object.entries(this.array[i].at(j).value)[0][1]);
      }
    }
    return values;
  }
  entries() {
    let entries = [];
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.array[i].size(); j++) {
        entries.push(Object.entries(this.array[i].at(j).value)[0]);
      }
    }
    return entries;
  }
}

class LinkedList {
  head = null;

  append(value) {
    const tail = new Node(value);
    if (this.size() < 1) {
      this.prepend(value);
    } else {
      const penultimateNode = this.at(this.size() - 1);
      penultimateNode.nextNode = tail;
    }
  }

  prepend(value) {
    this.head = new Node(value, this.getHead());
  }

  size(node = this.head) {
    if (node === null) {
      return 0;
    }
    return 1 + this.size(node.nextNode);
  }
  getHead() {
    return this.head;
  }
  tail(node = this.head) {
    if (this.size() < 1) {
      return -1;
    }
    if (node.nextNode === null) {
      return node;
    }
    return this.tail(node.nextNode);
  }
  // Zero based index
  at(index, node = this.head) {
    if (this.size() < 1) {
      return null;
    }
    let i = 0;
    let currentNode = node;
    while (currentNode !== null) {
      if (i === index) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
      i++;
    }
    return -1;
  }
  pop() {
    if (this.size() < 1) {
      return "Nothing to pop";
    }

    if (this.size() === 1) {
      this.head = null;
      return;
    }

    const penultimateNode = this.at(this.size() - 2);
    penultimateNode.nextNode = null;
  }
  contains(val) {
    for (let i = 0; i < this.size(); i++) {
      if (this.at(i).value === val) {
        return true;
      }
    }
    return false;
  }
  find(key) {
    for (let i = 0; i < this.size(); i++) {
      if (this.at(i).value.hasOwnProperty(key)) {
        return i;
      }
    }
    return null;
  }
  toString() {
    if (this.size() < 1) {
      return "The list is empty";
    }
    let linkedList = "";
    for (let i = 0; i < this.size(); i++) {
      linkedList += `(${this.at(i).value}) -> `;
    }
    linkedList += this.tail().nextNode;
    return linkedList;
  }

  removeAt(index) {
    if (this.size() < 1 || index > this.size() - 1) {
      return null;
    }
    let previousNode;
    let adjacentNode;
    for (let i = 0; i < this.size(); i++) {
      if (index === this.size() - 1) {
        this.pop();
      } else if (index === 0 && index === i) {
        adjacentNode = this.at(i + 1);
        this.head = adjacentNode;
      } else if (index > 0 && index === i) {
        previousNode = this.at(i - 1);
        adjacentNode = this.at(i + 1);
        previousNode.nextNode = adjacentNode;
      }
    }
  }
}

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
console.log(test.array);
