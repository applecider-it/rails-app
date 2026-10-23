<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import {
  toolbar,
  minifyHtml,
  formatHtml,
  imageCtrl,
  applyTooltips,
  ToolbarModule,
} from '../../quill-editor';

const content = ref(
  '<h1>見出し</h1><p>こんにちは！<strong>Quill</strong>へようこそ。</p><ul><li>項目1</li><li>項目2</li></ul>',
);
const contentHtml = ref('');
const isHtmlMode = ref(false);
const editor = ref<InstanceType<typeof QuillEditor> | null>(null);

watch(contentHtml, (html) => {
  // HTMLモード中の編集を、そのまま content に反映する
  content.value = minifyHtml(html);
});

const toggleMode = async () => {
  if (!isHtmlMode.value) {
    try {
      contentHtml.value = await formatHtml(content.value);
    } catch (e) {
      console.error('HTMLの整形に失敗しました', e);
    }
  } else {
    content.value = minifyHtml(contentHtml.value);
  }
  isHtmlMode.value = !isHtmlMode.value;
};

/** 初期化処理 */
const onReady = () => {
  const toolbar = editor.value?.getQuill().getModule('toolbar') as
    ToolbarModule | undefined;

  applyTooltips(toolbar);
};

// 画像ボタンハンドラー
const imageHandler = () => {
  const quill = editor.value?.getQuill();
  if (!quill) return;

  imageCtrl(quill);
};

const options = {
  modules: {
    toolbar: {
      container: toolbar,
      handlers: { image: imageHandler },
    },
  },
};
</script>

<template>
  <div class="max-w-2xl mx-auto my-6">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-bold">リッチテキストエディター</h2>
      <button
        @click="toggleMode"
        class="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-sm transition-colors"
      >
        {{ isHtmlMode ? 'WYSIWYG表示に戻す' : 'HTMLソースを表示・編集' }}
      </button>
    </div>

    <QuillEditor
      v-if="!isHtmlMode"
      ref="editor"
      v-model:content="content"
      contentType="html"
      theme="snow"
      :options="options"
      @ready="onReady"
    />

    <textarea
      v-else
      v-model="contentHtml"
      class="w-full h-62.5 p-3 font-mono text-sm bg-gray-900 text-green-400 rounded-sm border border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
      placeholder="HTMLタグを編集できます"
    ></textarea>

    <div class="mt-4 p-4 bg-gray-100 rounded-sm text-xs font-mono break-all">
      <strong>現在のデータ (content):</strong> {{ content }}
    </div>
  </div>
</template>

<style scoped>
:deep(.ql-container) {
  min-height: 200px;
}
/* 大きい画像がはみ出さないように */
:deep(.ql-editor img) {
  max-width: 100%;
}
</style>
