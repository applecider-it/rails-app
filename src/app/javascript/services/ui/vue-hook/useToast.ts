import { ref } from 'vue';
import type { Toast } from '../types';

let cnt = 0;

/** トースト用フック */
export function useToast() {
  const toasts = ref<Toast[]>([]);

  /** トースト追加 */
  function showToast(message: string, type: string = 'notice') {
    const id = cnt++;

    toasts.value.push({ id, message, type });

    // 自動削除
    setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id);
    }, 4000);
  }

  return {
    toasts,
    showToast,
  };
}
