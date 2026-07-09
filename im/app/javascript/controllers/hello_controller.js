console.log('load: /controllers/hello_controller.js');

import { Controller } from '@hotwired/stimulus';
import { createApp } from 'vue';
import SampleApp from 'services/sample/vue/sample-app';

export default class extends Controller {
  connect() {
    console.log('/controllers/hello_controller.js connect()');

    const all = JSON.parse(this.element.dataset.all);

    console.log(all);

    this.app = createApp(SampleApp, { testValue: all.testValue });
    this.app.mount(this.element);
  }
  disconnect() {
    console.log('/controllers/hello_controller.js disconnect()');

    this.app?.unmount();
  }
}
