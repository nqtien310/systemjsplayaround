import $ from 'jquery'
import OperandsView from './operands_view'
import OperatorsView from './operators_view'
import EqualView from './equal_view'
import OutputView from './output_view'
import CalculatingQueue from './calculating_queue'
import Logger from './logger'


export default class Calculator {
  constructor(container, opts) {
    this.container = container
    this.outputMode      = "append"
    this.logger          = new Logger(opts.log);
    this.operandsView    = new OperandsView(container, this.logger);
    this.operatorsView   = new OperatorsView(container, this.logger);
    this.equalView       = new EqualView(container, this.logger);
    this.outputView      = new OutputView(container, this.logger);
    this.queue           = new CalculatingQueue(this.logger);
  }

  init = () => {
    this.outputView.render();
    this.operandsView.render().observe();
    this.operatorsView.render().observe();
    this.equalView.render().observe();
    this.bindEvents();
  }

  bindEvents = () => {
    $(this.container).on("calculator:operand:click", (e) => {
      this.outputView.output(e.key, this.outputMode);
      this.setOutputMode("append");
    })

    $(this.container).on("calculator:equal:click", (e) => {
      this.queue.add(this.outputView.currentOutput());

      if(this.queue.isCalculable()){
        this.calculateAndOuput();
      }

      this.setOutputMode("reset");
    })

    $(this.container).on("calculator:operator:click", (e) => {
      this.queue.add(this.outputView.currentOutput());

      if(this.queue.isCalculable()){
        this.calculateAndOuput();
        this.queue.add(this.outputView.currentOutput());
      }

      this.setOutputMode("reset");
      this.queue.add(e.key);
    })
  }

  calculateAndOuput() {
    let result = this.queue.calculate();
    this.outputView.output(result, 'reset');
  }

  setOutputMode = (outputMode) => {
    this.logger.info(`NEW OUTPUT MODE: ${outputMode}`)
    this.outputMode = outputMode
  }
}
