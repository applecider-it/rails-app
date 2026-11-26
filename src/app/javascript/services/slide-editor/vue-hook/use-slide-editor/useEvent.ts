import { onMounted, onUnmounted, Ref } from 'vue';

/**
 * イベント管理用Hook
 */
export function useEvent(
  selectedId: Ref<string, string>,
  deleteSelectedElement: () => void,
) {
  /** キーダウンイベント */
  const handleKeyDown = (e: KeyboardEvent) => {
    // 入力関連の場合は無視
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      return;
    }

    // Deleteキー押下時に要素を削除
    if (e.key === 'Delete' && selectedId.value) {
      deleteSelectedElement();
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}
