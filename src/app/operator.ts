export default class OperatorsObserver {
  constructor(container) {
    this.container = container;
  }

  render() {
    for(let key of ['+', '-', '*', '/', '=']) {
      this.renderOperator(key);
    }
    this.renderBreak();
    return this;
  }

  renderOperator(key) {
    $(this.container).append(`
      <div class='btn operator btn-primary' data-value="${key}">${key}<div/>
    `)
  }

  renderBreak = () => {
    $(this.container).append(` <div class='break'/> `)
  }

  observe = () => {
    $(this.container).on("click", ".operator", (e) => {
      let operator = $(e.currentTarget).data("value");
      $(this.container).trigger({
        type: "calculator:operator:click",
        operator: operator
      })
    })
  }
}
