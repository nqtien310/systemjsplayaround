import $ from 'jquery'
import OperandsObserver from './operand'
import OperatorsObserver from './operator'
import OutputView from './output'
import CalculatingQueue from './calculating_queue'
import Logger from './logger'


export default class Calculator {
  constructor(container, opts) {
    this.container = container
    this.mode      = "append"
    this.logger            = new Logger(opts.log);
    this.operandsObserver  = new OperandsObserver(container, this.logger);
    this.operatorsObserver = new OperatorsObserver(container, this.logger);
    this.outputView        = new OutputView(container, this.logger);
    this.queue             = new CalculatingQueue(this.logger);
  }

  init = () => {
    this.bindEvents();
    this.operandsObserver.render().observe();
    this.operatorsObserver.render().observe();
    this.outputView.render();
  }

  bindEvents = () => {
    $(this.container).on("calculator:operand:click", (e) => {
      this.logger.info(`CLICKED ${e.operand}`);
      this.outputView.output(e.operand, this.mode);
      this.mode = "append";
    })

    $(this.container).on("calculator:operator:click", (e) => {
      this.logger.info(`CLICKED ${e.operator}`);
      this.queue.add(this.outputView.currentOutput());

      if(this.queue.isCalculable()){
        let result = this.queue.calculate();
        this.queue.clear();
        this.outputView.output(result, 'reset');
        this.queue.add(this.outputView.currentOutput());
      }

      this.mode = "reset";

      if(e.operator != "="){
        this.queue.add(e.operator);
      }
    })
  }

  setMode = (mode) => {
    this.logger.info(`NEW MODE: ${mode}`)
    this.mode = mode
  }
}
