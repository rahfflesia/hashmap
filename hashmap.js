class HashMap {
  loadFactor = 0.75;
  array = new Array(16).fill().map(() => new LinkedList());
  capacity = this.array.length;

  hash(key) {
    let hashCode = 0;
    const primeNumber = 37;
    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode * primeNumber + key.charCodeAt(i);
    }
    return hashCode;
  }
  set(key, value) {
    const obj = {
      [key]: value,
    };
    const hashCode = this.hash(key);
    let index = hashCode % this.capacity;
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
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.array[i].size(); j++) {
        if (this.array[i].at(j).value.hasOwnProperty(key)) {
          return true;
        }
      }
    }
    return false;
  }
  remove(key) {}
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
  find(val) {
    for (let i = 0; i < this.size(); i++) {
      if (this.at(i).value === val) {
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
}

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

const hash = new HashMap();
hash.set("carrot", "orange");
hash.set("coconut", "brown");
hash.set("apple", "red");
hash.set("grape", "purple");
console.log(hash.array);
console.log(hash.length());
console.log(hash.get("apple"));
console.log(hash.has("coconut"));
console.log(hash.values());
console.log(hash.keys());
console.log(hash.entries());
