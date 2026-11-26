<script setup lang="ts">
import { cssClass } from '../../main';

interface Props {
  addElement: any;
}

const props = defineProps<Props>();
</script>

<template>
  <header
    class="h-14 bg-white border-b border-slate-200 px-4 flex items-center gap-3 shadow-sm z-10"
  >
    <button @click="addElement('text')" :class="cssClass.toolbarBtn">
      <span>＋</span> テキスト追加
    </button>
    <button @click="addElement('shape')" :class="cssClass.toolbarBtn">
      <span>＋</span> 図形追加
    </button>
  </header>
</template>
