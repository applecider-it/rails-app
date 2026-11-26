<script setup lang="ts">
import { cssClass } from '../../main';

interface Props {
  deselect: any;
  elements: any;
  selectedId: any;
  startInteraction: any;
}

const props = defineProps<Props>();
</script>

<template>
  <main class="flex-1 p-6 overflow-auto flex bg-slate-200">
    <div
      class="relative w-200 h-112.5 bg-white shadow-xl rounded-sm overflow-hidden m-auto shrink-0"
      @pointerdown="deselect"
    >
      <!-- スライド要素リスト（配列の後の要素ほど手前に表示されます） -->
      <div
        v-for="(el, index) in elements"
        :key="el.id"
        class="absolute cursor-move flex items-center justify-center border border-transparent box-border"
        :class="{
          'ring-2 ring-blue-500 ring-offset-1': el.id === selectedId,
        }"
        :style="{
          left: `${el.x}px`,
          top: `${el.y}px`,
          width: `${el.width}px`,
          height: `${el.height}px`,
          backgroundColor: el.type === 'shape' ? el.color : 'transparent',
          color: el.type === 'text' ? el.color : '#ffffff',
        }"
        @pointerdown="startInteraction($event, 'drag', el)"
      >
        <!-- テキスト・図形コンテンツ -->
        <div
          class="w-full h-full flex items-center justify-center wrap-break-word px-2 font-medium"
          :style="{ fontSize: `${el.fontSize}px` }"
        >
          {{ el.content }}
        </div>

        <!-- リサイズハンドル -->
        <div
          v-if="el.id === selectedId"
          class="absolute -right-1.5 -bottom-1.5 w-3.5 h-3.5 bg-blue-600 border-2 border-white rounded-full cursor-se-resize shadow-sm"
          @pointerdown="startInteraction($event, 'resize', el)"
        ></div>
      </div>
    </div>
  </main>
</template>
