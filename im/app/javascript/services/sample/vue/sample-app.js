const SampleApp = {
  props: {
    testValue: {
      type: String,
    },
  },
  data() {
    return { count: 0 };
  },
  template: `
    <h3>SampleApp</h3>
    <button @click="count++">
      カウント: {{ count }}
    </button>
    <div>
      testValue: {{ testValue }}
    </div>
  `,
};

export default SampleApp;
