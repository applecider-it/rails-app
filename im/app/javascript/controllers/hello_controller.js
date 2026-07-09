console.log('load: /controllers/hello_controller.js');

import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    console.log('/controllers/hello_controller.js connect()');
    this.element.textContent = 'Hello World!';
  }
  disconnect() {
    console.log('/controllers/hello_controller.js disconnect()');
  }
}
