var RecentCounter = function() {
  this.queue = [];
};

/** 
* @param {number} t
* @return {number}
*/
RecentCounter.prototype.ping = function(t) {
 this.queue.push(t);
  while(this.queue.length && this.queue[0] < t-3000) {
      this.queue.shift();
  }
  return this.queue.length;
};

/** 
* Your RecentCounter object will be instantiated and called as such:
* var obj = Object.create(RecentCounter).createNew()
* var param_1 = obj.ping(t)
*/