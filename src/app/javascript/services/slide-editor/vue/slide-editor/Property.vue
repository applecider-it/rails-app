<script setup lang="ts">
import { cssClass } from '../../slide-editor/main';
import { SlideElement } from '../../types';

interface Props {
  moveElement: (position: "front" | "back") => void;
  deleteSelectedElement: () => void;
}

const selectedElement = defineModel<SlideElement | null>('selectedElement');

const props = defineProps<Props>();
</script>

<template>
  <aside
    class="w-64 bg-white border-l border-slate-200 p-4 shadow-lg z-10 flex flex-col gap-4 overflow-y-auto"
  >
    <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider">
      プロパティ
    </h3>

    <div
      v-if="!selectedElement"
      class="text-sm text-slate-400 italic py-4 text-center"
    >
      要素を選択してください
    </div>

    <div v-if="selectedElement" class="flex flex-col gap-4">
      <label class="flex flex-col gap-1.5 text-xs font-semibold text-slate-600">
        表示テキスト
        <input
          v-model="selectedElement.content"
          type="text"
          :class="cssClass.propertyInput"
        />
      </label>

      <label class="flex flex-col gap-1.5 text-xs font-semibold text-slate-600">
        フォントサイズ (px)
        <div class="flex items-center gap-2">
          <input
            v-model.number="selectedElement.fontSize"
            type="number"
            min="8"
            max="120"
            :class="`w-full ${cssClass.propertyInput}`"
          />
          <span class="text-xs text-slate-500">px</span>
        </div>
      </label>

      <label class="flex flex-col gap-1.5 text-xs font-semibold text-slate-600">
        カラー
        <div class="flex gap-2 items-center">
          <input
            v-model="selectedElement.color"
            type="color"
            class="w-8 h-8 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
          />
          <span class="text-xs font-mono text-slate-500 uppercase">{{
            selectedElement.color
          }}</span>
        </div>
      </label>

      <div class="border-t border-slate-100 pt-3 flex flex-col gap-2">
        <span class="text-xs font-semibold text-slate-600 block"
          >レイヤー順序</span
        >
        <div class="grid grid-cols-2 gap-2">
          <button @click="moveElement('front')" :class="cssClass.propertyBtn">
            最前面へ
          </button>
          <button @click="moveElement('back')" :class="cssClass.propertyBtn">
            最背面へ
          </button>
        </div>
      </div>

      <div class="border-t border-slate-100 pt-3">
        <button
          @click="deleteSelectedElement"
          class="w-full py-2 px-3 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded border border-red-200 transition-colors flex items-center justify-center gap-1"
        >
          🗑️ この要素を削除
        </button>
      </div>

      <div class="border-t border-slate-100 pt-3">
        <span class="text-xs font-semibold text-slate-600 block mb-2"
          >位置・サイズ</span
        >
        <div
          class="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-2.5 rounded-md border border-slate-200 text-slate-600"
        >
          <div
            v-for="item in [
              { label: 'X', value: selectedElement.x },
              { label: 'Y', value: selectedElement.y },
              { label: 'W', value: selectedElement.width },
              { label: 'H', value: selectedElement.height },
            ]"
            :key="item.label"
          >
            {{ item.label }}:
            <span class="font-bold text-slate-800">{{
              Math.round(item.value)
            }}</span
            >px
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
