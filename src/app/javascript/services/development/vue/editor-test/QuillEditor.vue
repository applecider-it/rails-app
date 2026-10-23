<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
// Quill標準のテーマCSSを読み込み
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// HTML文字列を保持する変数
const content = ref('<p>こんにちは！<strong>Quill</strong>へようこそ。</p>');
</script>

<template>
  <div>
    QuillEditor
  </div>
  <div class="max-w-2xl mx-auto my-6">
    <!-- 
      contentType="html" を指定すると、
      v-model:content でHTML形式の文字列を双方向バインディングできます
    -->
    <QuillEditor
      v-model:content="content"
      contentType="html"
      theme="snow"
      toolbar="essential"
    />

    <!-- 確認用：リアルタイムHTML出力 -->
    <div class="mt-4 p-4 bg-gray-100 rounded text-xs font-mono break-all">
      <strong>出力HTML:</strong> {{ content }}
    </div>
  </div>
</template>

<style scoped>
/* エディターの高さを調整したい場合の指定例 */
:deep(.ql-container) {
  min-height: 200px;
}
</style>
