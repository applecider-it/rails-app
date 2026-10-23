<script setup lang="ts">
import { EditorContent } from '@tiptap/vue-3';
import { useHtmlEditor } from '../tiptap/main';
import Toolbar from './tiptap/Toolbar.vue';

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
  setColor,
  resetColor,
  clearFormat,
} = useHtmlEditor(props.initialValue, props.callback);
</script>

<template>
  <div
    class="border border-gray-300 rounded-lg shadow-xs overflow-hidden bg-white"
  >
    <Toolbar
      :editor="editor"
      :is-code-view="isCodeView"
      @toggle-view="toggleView"
      @add-image="addImage"
      @set-color="setColor"
      @reset-color="resetColor"
      @clear-format="clearFormat"
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
</template>

<style scoped>
:deep(.tiptap) {
  outline: none;
}
</style>
