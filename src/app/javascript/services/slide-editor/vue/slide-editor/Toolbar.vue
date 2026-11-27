<script setup lang="ts">
import { ElementType } from '../../types';

const emit = defineEmits<{
  addElement: [type: ElementType];
  save: [];
  load: [needConfirm?: boolean];
}>();

/** CSSクラス用定数 */
const cssClass = {
  btn: 'px-3 py-1.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-300 transition-colors flex items-center gap-1',
};
</script>

<template>
  <header
    class="h-14 bg-white border-b border-slate-200 px-4 flex items-center gap-3 shadow-sm z-10"
  >
    <button @click="emit('addElement', 'text')" :class="cssClass.btn">
      <span>＋</span> テキスト追加
    </button>
    <button @click="emit('addElement', 'shape')" :class="cssClass.btn">
      <span>＋</span> 図形追加
    </button>
    <button @click="emit('save')" :class="cssClass.btn">保存</button>
    <button @click="emit('load')" :class="cssClass.btn">読み込み</button>
  </header>
</template>
