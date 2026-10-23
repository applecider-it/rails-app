<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import {
  COLORS,
  BLOCK_OPTIONS,
  btnClass,
  btnActiveClass,
  btnUnactiveClass,
} from '../../tiptap/parts';

interface Props {
  editor: Editor | undefined;
  isCodeView: boolean;
  currentBlock: Function;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'toggle-view'): void;
  (e: 'add-image'): void;
  (e: 'set-color', color: string): void;
  (e: 'reset-color'): void;
  (e: 'clear-format'): void;
  (e: 'change-block', value: string): void;
}>();
</script>

<template>
  <div
    class="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200"
  >
    <div v-if="!isCodeView && editor" class="flex gap-2">
      <select
        :value="currentBlock()"
        @change="emit('change-block', ($event.target as HTMLSelectElement).value)"
        class="text-sm border border-gray-300 rounded-sm bg-white text-gray-700"
      >
        <option v-for="o in BLOCK_OPTIONS" :key="o.value" :value="o.value">
          {{ o.label }}
        </option>
      </select>

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
        @click="emit('add-image')"
        :class="[btnClass, btnUnactiveClass]"
        type="button"
      >
        画像
      </button>

      <div class="flex items-center gap-1">
        <button
          v-for="c in COLORS"
          :key="c.value"
          @click="emit('set-color', c.value)"
          :title="c.label"
          class="w-6 h-6 rounded-full border border-gray-300"
          :style="{ backgroundColor: c.value }"
          type="button"
        ></button>

        <input
          type="color"
          class="w-8 h-8 p-0 border border-gray-300 rounded-sm cursor-pointer"
          :value="editor.getAttributes('textStyle').color || '#000000'"
          @input="emit('set-color', ($event.target as HTMLInputElement).value)"
        />

        <button
          @click="emit('reset-color')"
          :class="[btnClass, btnUnactiveClass]"
          type="button"
        >
          色リセット
        </button>
      </div>

      <button
        @click="emit('clear-format')"
        :class="[btnClass, btnUnactiveClass]"
        type="button"
      >
        書式クリア
      </button>
    </div>

    <button
      @click="emit('toggle-view')"
      class="px-3 py-1.5 text-sm font-medium bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300 transition-colors ml-auto"
      type="button"
    >
      {{ isCodeView ? '✏️ エディターに戻る' : '💻 HTMLを表示' }}
    </button>
  </div>
</template>
