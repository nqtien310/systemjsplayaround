export default class CalculatingQueue {
  constructor(logger) {
    this.queue     = []
    this.logger    = logger
  }

  add(ele) {
    if(this.queue.length == 3){
      throw new TypeError("Queue length exceed 3");
    }
    this.queue.push(ele);
    this.logger.info(`CURRENT QUEUE: ${this.queue}`);
  }

  calculate() {
    return eval(this.queue.join(""));
  }

  isCalculable() {
    return this.queue.length == 3;
  }

  clear() {
    this.queue = [];
  }
}
