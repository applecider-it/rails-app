<script setup lang="ts">
interface Props {
  listVals: [number, string][];
  radioVals: [string, string][];
}

const props = defineProps<Props>();

const listVal = defineModel<number>('listVal');
const radioVal = defineModel<string>('radioVal');
const dateTimeVal = defineModel<string>('dateTimeVal');

/** JSからの変更確認 */
const updateByJs = () => {
  listVal.value = 3;
};
</script>

<template>
  <div class="app-form">
    <h4 class="app-h4">defineModel動作確認</h4>

    <div class="mt-5">
      <label for="listVal" class="app-form-label">リスト動作確認</label>
      <select v-model="listVal" id="listVal" class="app-form-input w-auto">
        <option :value="null" key="null">選択してください</option>
        <option v-for="[key, value] in listVals" :key="key" :value="key">
          {{ value }}
        </option>
      </select>
    </div>

    <div class="mt-5">
      <label class="app-form-label">ラジオボタン動作確認</label>
      <div class="space-x-3">
        <label v-for="[key, value] in radioVals" :key="key">
          <input type="radio" :value="key" v-model="radioVal" />
          <span>&nbsp;{{ value }}</span>
        </label>
      </div>
    </div>

    <div class="mt-5">
      <label for="dateTimeVal" class="app-form-label">日時動作確認</label>
      <input
        type="datetime-local"
        v-model="dateTimeVal"
        id="dateTimeVal"
        class="app-form-input w-auto"
      />
    </div>

    <div class="mt-5">
      <button @click="updateByJs" class="app-btn-secondary">JSからの変更確認</button>
    </div>
  </div>
</template>
