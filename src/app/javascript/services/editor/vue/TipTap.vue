<script setup lang="ts">
import { EditorContent } from '@tiptap/vue-3';
import { useHtmlEditor } from '../tiptap/main';
import { COLORS, btnClass, btnActiveClass, btnUnactiveClass } from '../tiptap/parts';

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
} = useHtmlEditor(props.initialValue, props.callback);
</script>

<template>
  <div
    class="border border-gray-300 rounded-lg shadow-xs overflow-hidden bg-white"
  >
    <!-- ツールバー ＆ 切り替えボタン -->
    <div
      class="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200"
    >
      <div v-if="!isCodeView && editor" class="flex gap-2">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="[
            btnClass,
            editor.isActive('bold') ? btnActiveClass : btnUnactiveClass,
          ]"
          type="button"
        >
          B
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="[
            btnClass,
            editor.isActive('italic') ? btnActiveClass : btnUnactiveClass,
          ]"
          type="button"
        >
          I
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="[
            btnClass,
            editor.isActive('bulletList') ? btnActiveClass : btnUnactiveClass,
          ]"
          type="button"
        >
          List
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="[
            btnClass,
            editor.isActive('orderedList') ? btnActiveClass : btnUnactiveClass,
          ]"
          type="button"
        >
          Num
        </button>
        <button
          @click="addImage"
          :class="[btnClass, btnUnactiveClass]"
          type="button"
        >
          画像
        </button>
        <div class="flex items-center gap-1">
          <button
            v-for="c in COLORS"
            :key="c.value"
            @click="setColor(c.value)"
            :title="c.label"
            class="w-6 h-6 rounded-full border border-gray-300"
            :style="{ backgroundColor: c.value }"
            type="button"
          ></button>
          <input
            type="color"
            class="w-8 h-8 p-0 border border-gray-300 rounded-sm cursor-pointer"
            :value="editor.getAttributes('textStyle').color || '#000000'"
            @input="setColor(($event.target as HTMLInputElement).value)"
          />
          <button
            @click="resetColor"
            :class="[btnClass, btnUnactiveClass]"
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- 表示切り替えボタン -->
      <button
        @click="toggleView"
        class="px-3 py-1.5 text-sm font-medium bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300 transition-colors ml-auto"
        type="button"
      >
        {{ isCodeView ? '✏️ エディターに戻る' : '💻 HTMLを表示' }}
      </button>
    </div>

    <!-- エディタ本体 または HTMLコード表示 -->
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
/* Tiptapが生成するエディタ要素自体のフォーカス枠を消す */
:deep(.tiptap) {
  outline: none;
}
</style>
