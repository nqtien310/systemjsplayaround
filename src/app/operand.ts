export default class OperandsObserver {
  constructor(container) {
    this.container = container;
  }

  render = () => {
    for(let keys of [ [1,2,3], [4,5,6], [7,8,9], [0] ]) {
      for(let key of keys) { this.renderOperand(key); }
      this.renderBreak();
    }
    return this;
  }

  renderOperand = (key) => {
    $(this.container).append(`
      <div class='btn operand btn-default' data-value="${key}">${key}<div/>
    `)
  }

  renderBreak = () => {
    $(this.container).append(` <div class='break'/> `)
  }

  observe = () => {
    $(this.container).on("click", ".operand", (e) => {
      let operand = $(e.currentTarget).data("value");
      $(this.container).trigger({
        type: "calculator:operand:click",
        operand: operand
      })
    })
    return this;
  }
}
