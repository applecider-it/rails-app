<script setup lang="ts">
/** エディターテスト用コンポーネント */

import QuillEditor from './editor-test/QuillEditor.vue';
import TipTap from './editor-test/TipTap.vue';

const blockStyle = 'border-gray-400 border-2 p-3';
</script>

<template>
  <div class="py-6 border-gray-500 border-2 p-5">
    <div class="mb-6 text-lg">エディター動作確認</div>

    <div class="space-y-4">
      <div :class="blockStyle">
        <div>
          QuillEditor
        </div>
        <QuillEditor />
      </div>

      <div :class="blockStyle">
        <div>
          TipTap
        </div>
        <TipTap />
      </div>
    </div>
  </div>
</template>
