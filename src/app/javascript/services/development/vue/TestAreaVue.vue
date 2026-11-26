<script setup lang="ts">
/** vueテスト用コンポーネント */

import ModalArea from './test-area-vue/ModalArea.vue';
import UIArea from './test-area-vue/UIArea.vue';
import FormArea from './test-area-vue/FormArea.vue';
import RespondToArea from './test-area-vue/RespondToArea.vue';
import DateArea from './test-area-vue/DateArea.vue';
import AppliArea from './test-area-vue/AppliArea.vue';
import RouterArea from './test-area-vue/RouterArea.vue';
import UploadArea from './test-area-vue/UploadArea.vue';

interface Props {
  formData: any;
}

const props = defineProps<Props>();

const blockStyle = 'border-gray-400 border-2 p-3';
</script>

<template>
  <div class="space-y-4">
    <div :class="blockStyle">
      <UIArea />
    </div>

    <div :class="blockStyle">
      <ModalArea />
    </div>

    <div :class="blockStyle">
      <FormArea
        :listVal="formData.list_val"
        :radioVal="formData.radio_val"
        :dateTimeVal="formData.datetime_val"
        :listVals="formData.list_vals"
        :radioVals="formData.radio_vals"
      />
    </div>

    <div :class="blockStyle">
      <RespondToArea />
    </div>

    <div :class="blockStyle">
      <AppliArea />
    </div>

    <div :class="blockStyle">
      <UploadArea />
    </div>

    <div :class="blockStyle">
      <RouterArea name="test" />
    </div>

    <div :class="blockStyle">
      <DateArea />
    </div>
  </div>
</template>
