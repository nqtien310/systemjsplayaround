import $ from 'jquery'

export default class Calculator {
  constructor(container) {
    this.queue     = []
    this.container = container
    this.mode      = "append"
  }

  render = () => {
    this.renderOutput();
    this.renderOperands();
    this.renderOperators();
    this.bindOperandEvents();
    this.bindOperatorEvents();
  }

  bindOperandEvents = () => {
    $(this.container).on("click", ".operand", (e) => {
      let value = $(e.currentTarget).data("value");

      if(this.mode == "append"){
        this.appendOutput(value);
      }else {
        this.output(value);
      }
      this.mode = "append";
    })
  }

  bindOperatorEvents = () => {
    $(this.container).on("click", ".operator", (e) => {
      let op = $(e.currentTarget).data("value");
      this.storeCurrentDigits();

      if(this.isCalculable()){
        let result = this.calculate();
        this.clearQueue();
        this.output(result);
        this.storeCurrentDigits(); //Store the new result
      }

      this.mode = "reset";
      this.storeOperator(op);

    })
  }

  calculate() {
    return eval(this.queue.join(""));
  }


  //
  // Modify queue methods
  //
  //
  storeCurrentDigits() {
    this.addToQueue(parseFloat(this.currentOutput()));
  }
  storeOperator(op) {
    this.addToQueue(op);
  }

  addToQueue(ele) {
    if(this.queue.length == 3){
      throw new TypeError("Queue length exceed 3");
    }
    console.log(`ADDING ${ele} into queue`);
    this.queue.push(ele);
    console.log(`Current queue ${this.queue}`);
  }

  clearQueue() {
    this.queue = []
  }


  isCalculable() {
    console.log(`QUEUE LENGTH: ${this.queue.length}`);
    return this.queue.length == 3
  }

  /*
   * Render methods
   * */
  renderOutput = () => {
    $(this.container).append(` <input id="output" /> `);
    this.renderBreak();
  }

  renderOperands = () => {
    for(let keys of [ [1,2,3], [4,5,6], [7,8,9], [0] ]) {
      for(let key of keys) {
        this.renderBtn(key, {"classes": "operand"});
      }
      this.renderBreak();
    }
  }

  renderOperators = () => {
    for(let key of ['+', '-', '*', '/']) {
      this.renderBtn(key, {"classes": "operator"});
    }
    this.renderBreak();
  }

  renderBtn = (key, opts) => {
    $(this.container).append(`
      <div class='btn ${opts.classes}' data-value="${key}">${key}<div/>
    `)
  }

  renderBreak = () => {
    $(this.container).append(` <div class='break'/> `)
  }

  //
  //Modify output methods
  //

  output = (value) => {
    $("#output").val(value);
  }

  appendOutput = (digit) => {
    let currentOutput = this.currentOutput();
    this.output(`${currentOutput}${digit}`);
  }

  currentOutput = () => {
    return $("#output").val();
  }

  clearOutput() {
    this.output("");
  }
}
