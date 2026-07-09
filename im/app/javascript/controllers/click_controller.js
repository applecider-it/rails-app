console.log('load: /controllers/click_controller.js');

import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  onclick() {
    console.log('Clicked!!')
  }
  connect() {
    console.log('/controllers/click_controller.js connect()');
    this.element.textContent = 'Click World!';

    document.addEventListener('click', this.onclick);
  }
  disconnect() {
    console.log('/controllers/click_controller.js disconnect()');

    document.removeEventListener('click', this.onclick);
  }
}
