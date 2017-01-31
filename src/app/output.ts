export default class OutputView {
  constructor(container) {
    this.container = container;
  }

  render = () => {
    $(this.container).append(` <input id="output" /> `);
    this.output(0, "reset");
    this.renderBreak();
  }

  renderBreak = () => {
    $(this.container).append(` <div class='break'/> `)
  }

  output = (value, mode) => {
    if(mode == "append" && this.currentOutput() != 0){
      value = `${this.currentOutput()}${value}`;
    }

    $("#output").val(value);
  }

  currentOutput = () => {
    return parseFloat($("#output").val());
  }

  clearOutput() {
    this.output("");
  }
}
