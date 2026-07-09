console.log('load: /controllers/about_controller.js');

import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    console.log('/controllers/about_controller.js connect()');
    this.element.textContent = 'About World!';
  }
  disconnect() {
    console.log('/controllers/about_controller.js disconnect()');
  }
}
