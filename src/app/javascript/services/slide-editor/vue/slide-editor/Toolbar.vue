<script setup lang="ts">
import { cssClass } from '../../slide-editor/main';
import { ElementType } from '../../types';

const emit = defineEmits<{
  addElement: [type: ElementType];
  save: [];
  load: [needConfirm?: boolean];
}>();
</script>

<template>
  <header
    class="h-14 bg-white border-b border-slate-200 px-4 flex items-center gap-3 shadow-sm z-10"
  >
    <button @click="emit('addElement', 'text')" :class="cssClass.toolbarBtn">
      <span>＋</span> テキスト追加
    </button>
    <button @click="emit('addElement', 'shape')" :class="cssClass.toolbarBtn">
      <span>＋</span> 図形追加
    </button>
    <button @click="emit('save')" :class="cssClass.toolbarBtn">保存</button>
    <button @click="emit('load')" :class="cssClass.toolbarBtn">読み込み</button>
  </header>
</template>
