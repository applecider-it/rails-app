<script setup lang="ts">
import { useSlideEditor } from '../vue-hook/useSlideEditor';

import Toolbar from './slide-editor/Toolbar.vue';
import Canvas from './slide-editor/Canvas.vue';
import Property from './slide-editor/Property.vue';

const {
  addElement,
  deselect,
  elements,
  selectedId,
  startInteraction,
  selectedElement,
  moveElement,
  deleteSelectedElement,
} = useSlideEditor();
</script>

<template>
  <div
    class="flex flex-col h-screen select-none font-sans bg-slate-100 text-slate-800"
  >
    <!-- ツールバー -->
    <Toolbar :addElement="addElement" v-model:elements="elements" />

    <div class="flex flex-1 overflow-hidden">
      <!-- 編集キャンバスエリア -->
      <Canvas
        :deselect="deselect"
        :elements="elements"
        :selectedId="selectedId"
        :startInteraction="startInteraction"
      />

      <!-- プロパティパネル（右サイドバー） -->
      <Property
        :moveElement="moveElement"
        :deleteSelectedElement="deleteSelectedElement"
        v-model:selectedElement="selectedElement"
      />
    </div>
  </div>
</template>
