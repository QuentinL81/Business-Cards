export class ErrorModel {
    constructor(message, code) {
      this.message = message;
      this.code = code;
    }
  
    displayError() {
      console.log(`Error: ${this.message} (Code: ${this.code})`);
    }
  }
  