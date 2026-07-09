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
    <button @click="count++">
      カウント: {{ count }}
    </button>
    <div>
      testValue: {{ testValue }}
    </div>
  `,
};

export default SampleApp;
