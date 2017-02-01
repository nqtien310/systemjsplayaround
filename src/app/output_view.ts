import View from './view'

export default class OutputView extends View{
  render = () => {
    $(this.container).append(` <input id="output" class="form-control"/> `);
    this.output(0, "reset");
    this.renderBreak();
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
