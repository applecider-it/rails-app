<script setup lang="ts">
import { cssClass } from '../../main';
import { ElementType, SlideElement } from '../../types';

interface Props {
  addElement: (type: ElementType) => void;
}

const props = defineProps<Props>();

const elements = defineModel<SlideElement[]>('elements');

let saveData = null;

const save = () => {
  // JSONに変換
  const json = JSON.parse(JSON.stringify(elements.value));
  console.log(json);

  saveData = json;
};

const load = () => {
  if (!saveData) {
    console.log('セーブデータなし');
    return;
  }

  console.log(saveData);

  // 再生成しないと、変更が認識されない
  elements.value = JSON.parse(JSON.stringify(saveData));
};
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
    <button @click="save" :class="cssClass.toolbarBtn">保存</button>
    <button @click="load" :class="cssClass.toolbarBtn">読み込み</button>
  </header>
</template>
