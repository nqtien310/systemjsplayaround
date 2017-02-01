import View from './view'

export default class EqualView extends View{
  key = 'equal';
  klasses = 'btn-primary';

  render() {
    this.renderBtn("=");
    this.renderBreak();
    return this;
  }
}
