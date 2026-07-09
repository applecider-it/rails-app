console.log('load: /controllers/hello_controller.js');

import { Controller } from '@hotwired/stimulus';
import { createApp } from 'vue';
import SampleApp2 from 'services/sample/vue/sample-app2';

export default class extends Controller {
  connect() {
    console.log('/controllers/hello2_controller.js connect()');

    const all = JSON.parse(this.element.dataset.all);

    console.log(all);

    this.app = createApp(SampleApp2, { testValue2: all.testValue2 });
    this.app.mount(this.element);
  }
  disconnect() {
    console.log('/controllers/hello2_controller.js disconnect()');

    this.app?.unmount();
  }
}
