export default class View {
  constructor(container, logger) {
    this.container = container;
    this.logger    = logger;

  }

  renderBtn(key) {
    $(this.container).append(`
      <div class='btn ${this.key} ${this.klasses}' data-value="${key}">${key}<div/>
    `)
  }

  renderBreak = () => {
    $(this.container).append(` <div class='break'/> `)
  }

  observe = () => {
    $(this.container).on("click", `.${this.key}`, (e) => {
      let key = $(e.currentTarget).data("value");

      this.logger.info(`CLICK ${key}`);

      $(this.container).trigger({
        type: `calculator:${this.key}:click`,
        key: key
      })
    })
  }
}
