<script setup lang="ts">
/**
 * htmlContent.valueには、HTMLが常に最新の状態で入っています。
 */

import { ref, onBeforeUnmount } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const isCodeView = ref(false);
const htmlContent = ref(
  '<p>こんにちは！<strong>太字</strong>と<em>斜体</em>を試せるエディタです。</p>',
);

const btnClass =
  'px-3 py-1.5 text-sm font-medium rounded border transition-colors';
const btnActiveClass = 'bg-blue-600 text-white border-blue-600';
const btnUnactiveClass =
  'bg-white text-gray-700 border-gray-300 hover:bg-gray-100';

// Tiptapエディタの初期化（boldとitalicのみ許可）
const editor = useEditor({
  content: htmlContent.value,
  extensions: [
    StarterKit.configure({
      // 見出し（H1〜H6）を無効化する
      heading: false,
      // 箇条書きリストを無効化する
      bulletList: false,
      // 番号付きリストを無効化する
      orderedList: false,
      // コードブロックを無効化する
      codeBlock: false,
      // 引用ブロックを無効化する
      blockquote: false,
      // 水平線を無効化する
      horizontalRule: false,
      // 取り消し線を無効化する
      strike: false,
    }),
  ],
  onUpdate: ({ editor }) => {
    htmlContent.value = editor.getHTML();
  },
});

// 表示モードを切り替える関数
const toggleView = () => {
  if (isCodeView.value && editor.value) {
    editor.value.commands.setContent(htmlContent.value);
  }
  isCodeView.value = !isCodeView.value;
};

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div
    class="max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-sm overflow-hidden bg-white"
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
      </div>

      <!-- 表示切り替えボタン -->
      <button
        @click="toggleView"
        class="px-3 py-1.5 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors ml-auto"
        type="button"
      >
        {{ isCodeView ? '✏️ エディターに戻る' : '💻 HTMLを表示' }}
      </button>
    </div>

    <!-- エディタ本体 または HTMLコード表示 -->
    <div class="p-4 min-h-[160px]">
      <EditorContent
        v-if="!isCodeView"
        :editor="editor"
        class="prose max-w-none focus:outline-none min-h-[140px]"
      />
      <textarea
        v-else
        v-model="htmlContent"
        class="w-full min-h-[140px] font-mono text-sm p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="HTMLを入力..."
      ></textarea>
    </div>

    <!-- 確認用：リアルタイムHTML出力 -->
    <div class="mt-4 p-4 bg-gray-100 rounded text-xs font-mono break-all">
      <strong>出力HTML:</strong> {{ htmlContent }}
    </div>
  </div>
</template>

<style scoped>
/* Tiptapが生成するエディタ要素自体のフォーカス枠を消す */
:deep(.tiptap) {
  outline: none;
}
</style>
