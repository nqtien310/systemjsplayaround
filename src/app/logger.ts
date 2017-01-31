export default class Logger {
  constructor(log) {
    this.log = log;
  }

  info(mess) {
    if(this.log) {
      console.log(mess);
    }
  }
}
