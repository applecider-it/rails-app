const SampleApp2 = {
  props: {
    testValue2: {
      type: String,
    },
  },
  data() {
    return { count: 0 };
  },
  template: `
    <h3>SampleApp2</h3>
    <button @click="count++">
      カウント: {{ count }}
    </button>
    <div>
      testValue2: {{ testValue2 }}
    </div>
  `,
};

export default SampleApp2;
