import View from './view'

export default class OperandsView extends View{
  key = 'operand';
  klasses = 'btn-default';

  render = () => {
    for(let keys of [ [1,2,3], [4,5,6], [7,8,9], [0] ]) {
      for(let key of keys) { this.renderBtn(key); }
      this.renderBreak();
    }
    return this;
  }
}
