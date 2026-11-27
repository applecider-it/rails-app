<script setup lang="ts">
import type { Toasts, Toast } from '../../types';

defineProps<{
  toasts: Toasts;
}>();

function computedClass(toast: Toast) {
  let colors = ['bg-blue-200', 'border-cyan-900'];

  const otherColors = {
    alert: ['bg-red-200', 'border-amber-800'],
  };

  if (toast.type in otherColors) colors = otherColors[toast.type];

  return [
    'text-sm',
    'border-2',
    'text-black',
    'px-3',
    'py-1',
    'rounded-lg',
    'shadow-lg',
    ...colors,
  ];
}
</script>

<template>
  <TransitionGroup
    name="toast"
    tag="div"
    class="fixed top-4 right-4 z-50 flex flex-col items-end gap-3"
  >
    <div v-for="toast in toasts" :key="toast.id" :class="computedClass(toast)">
      {{ toast.message }}
    </div>
  </TransitionGroup>
</template>

<style scoped>
/* 登場: 右からスライドイン */
.toast-enter-active {
  transition: all 0.5s ease-out;
}
.toast-enter-from {
  transform: translateX(100px);
  opacity: 0;
}

/* 退場: 右へスライドアウト */
.toast-leave-active {
  transition: all 0.5s ease-in;
  position: absolute;
  right: 0;
  white-space: nowrap;
}
.toast-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

/* 他のトーストが上に詰まるときの動き */
.toast-move {
  transition: transform 0.5s ease;
}
</style>
