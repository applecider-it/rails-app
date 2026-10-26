<script setup lang="ts">
import { onMounted } from 'vue';
import { EditorContent } from '@tiptap/vue-3';
import { useHtmlEditor } from '../tiptap/main';
import Toolbar from './tiptap/Toolbar.vue';
import ImageModal from './tiptap/ImageModal.vue';

interface Props {
  initialValue: string;
  callback: (val: string) => void;
}

const props = defineProps<Props>();

const {
  editor,
  isCodeView,
  htmlContent,
  toggleView,
  addImage,
  currentBlock,
  changeBlock,
  imageModal,
} = useHtmlEditor(props.initialValue, props.callback);

onMounted(() => {
  //addImage(); // 画像処理実装時に有効化すると便利
})
</script>

<template>
  <div
    class="border border-gray-300 rounded-lg shadow-xs overflow-hidden bg-white"
  >
    <Toolbar
      :editor="editor"
      :is-code-view="isCodeView"
      :currentBlock="currentBlock"
      @toggle-view="toggleView"
      @add-image="addImage"
      @change-block="changeBlock"
    />

    <div class="p-4">
      <EditorContent
        v-if="!isCodeView"
        :editor="editor"
        class="prose prose-slate max-w-none focus:outline-hidden h-[300px] overflow-y-auto"
      />
      <textarea
        v-else
        v-model="htmlContent"
        class="w-full h-[300px] resize-none font-mono text-sm p-2 border border-gray-300 rounded-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        placeholder="HTMLを入力..."
      ></textarea>
    </div>
  </div>

  <div>
    <ImageModal :modal="imageModal" />
  </div>
</template>

<style scoped>
:deep(.tiptap) {
  outline: none;
}
:deep(.tiptap > :first-child) {
  margin-top: 0;
}
</style>
