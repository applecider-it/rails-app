<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
// Quill標準のテーマCSSを読み込み
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// HTML文字列を保持する変数
const content = ref('<p>こんにちは！<strong>Quill</strong>へようこそ。</p>');

// HTML表示モードの切り替えフラグ
const isHtmlMode = ref(false);

// モード切り替え関数
const toggleMode = () => {
  isHtmlMode.value = !isHtmlMode.value;
};
</script>

<template>
  <div class="max-w-2xl mx-auto my-6">
    <!-- 切替ボタンとタイトル -->
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-bold">リッチテキストエディター</h2>
      <button
        @click="toggleMode"
        class="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-sm transition-colors"
      >
        {{ isHtmlMode ? 'WYSIWYG表示に戻す' : 'HTMLソースを表示・編集' }}
      </button>
    </div>

    <!-- WYSIWYG エディター（通常表示） -->
    <QuillEditor
      v-if="!isHtmlMode"
      v-model:content="content"
      contentType="html"
      theme="snow"
      toolbar="essential"
    />

    <!-- HTML ソースコード直接編集（HTMLモード時） -->
    <textarea
      v-else
      v-model="content"
      class="w-full h-[250px] p-3 font-mono text-sm bg-gray-900 text-green-400 rounded-sm border border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
      placeholder="HTMLタグを編集できます"
    ></textarea>

    <!-- 確認用：リアルタイムHTML出力（常に下部に表示する場合） -->
    <div class="mt-4 p-4 bg-gray-100 rounded-sm text-xs font-mono break-all">
      <strong>現在のデータ (content):</strong> {{ content }}
    </div>
  </div>
</template>

<style scoped>
/* エディターの最小高さを調整 */
:deep(.ql-container) {
  min-height: 200px;
}
</style>
