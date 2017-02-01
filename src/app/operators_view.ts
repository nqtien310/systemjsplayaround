import View from './view'

export default class OperatorsView extends View{
  key = 'operator';
  klasses = 'btn-primary';

  render() {
    for(let key of ['+', '-', '*', '/']) {
      this.renderBtn(key);
    }
    return this;
  }
}
