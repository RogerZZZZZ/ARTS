/**
 * Initialize your data structure here.
 */
var MyHashSet = function() {
    this.mySet = Array.from({length:1000}, x=>[]);
    this.mapFn = function(num){
        return num%1000;
    }
};

MyHashSet.prototype.createNew = function() {
    
}

MyHashSet.prototype.add = function(key) {
    let mapValue = this.mapFn(key);
    let arr = this.mySet[mapValue], index = arr.indexOf(key);
    if(index===-1) arr.push(key);
};

MyHashSet.prototype.remove = function(key) {
    let mapValue = this.mapFn(key);
    let arr = this.mySet[mapValue], index = arr.indexOf(key);
    if(index!==-1) arr.splice(index, 1);
};

MyHashSet.prototype.contains = function(key) {
    let mapValue = this.mapFn(key);
    let arr = this.mySet[mapValue], index = arr.indexOf(key);
    return index!==-1;
};

/** 
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = Object.create(MyHashSet).createNew()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
console.log(Object.create(MyHashSet))
// var obj = Object.create(MyHashSet).createNew()

//  obj.add(1)

var a = Object.create(MyHashSet)
console.log(a.add)
// console.log(obj.contains(1))