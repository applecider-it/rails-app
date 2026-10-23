<script setup lang="ts">
/**
 * htmlContent.valueには、HTMLが常に最新の状態で入っています。
 */

import { ref, onBeforeUnmount, watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { TextStyle, Color } from '@tiptap/extension-text-style';

import { formatHtml } from '@/services/data/html';

interface Props {
  initialValue: string;
  callback: (val: string) => void;
}

const props = defineProps<Props>();

const isCodeView = ref(false);
const htmlContent = ref(props.initialValue);

const btnClass =
  'px-3 py-1.5 text-sm font-medium rounded-sm border transition-colors';
const btnActiveClass = 'bg-blue-600 text-white border-blue-600';
const btnUnactiveClass =
  'bg-white text-gray-700 border-gray-300 hover:bg-gray-100';

watch(htmlContent, (html) => {
  props.callback(html);
});

/** スタイルの変更を有効にするためのカスタムイメージ */
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: 'width: 20rem;',
        parseHTML: (element) => element.getAttribute('style'),
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },
});

// Tiptapエディタの初期化
const editor = useEditor({
  content: htmlContent.value,
  extensions: [
    StarterKit.configure({}),
    CustomImage.configure({}),
    TextStyle,
    Color,
  ],
  onUpdate: async ({ editor }) => {
    htmlContent.value = await formatHtml(editor.getHTML());
  },
});

// 表示モードを切り替える関数
const toggleView = () => {
  if (isCodeView.value && editor.value) {
    editor.value.commands.setContent(htmlContent.value);
  }
  isCodeView.value = !isCodeView.value;
};

// 画像URLを入力して挿入
const addImage = () => {
  if (!editor.value) return;
  const url = window.prompt('画像のURLを入力してください');
  if (!url) return;
  editor.value.chain().focus().setImage({ src: url }).run();
};

// 色の選択肢
const colors = [
  { label: '赤', value: '#dc2626' },
  { label: '青', value: '#2563eb' },
  { label: '緑', value: '#16a34a' },
];

const setColor = (color: string) => {
  editor.value?.chain().focus().setColor(color).run();
};

const resetColor = () => {
  editor.value?.chain().focus().unsetColor().run();
};

onBeforeUnmount(() => {
  editor.value?.destroy();
});
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
          太字 (Bold)
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="[
            btnClass,
            editor.isActive('italic') ? btnActiveClass : btnUnactiveClass,
          ]"
          type="button"
        >
          斜体 (Italic)
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="[
            btnClass,
            editor.isActive('bulletList') ? btnActiveClass : btnUnactiveClass,
          ]"
          type="button"
        >
          箇条書き
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="[
            btnClass,
            editor.isActive('orderedList') ? btnActiveClass : btnUnactiveClass,
          ]"
          type="button"
        >
          番号付き
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
            v-for="c in colors"
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
            色をリセット
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
