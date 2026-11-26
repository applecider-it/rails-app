import { onMounted, onUnmounted } from 'vue';

export function useEvent(selectedId, deleteSelectedElement) {
  /** キーボードイベントを処理し、Deleteキー押下時に要素を削除する */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      return;
    }

    if (e.key === 'Delete' && selectedId.value) {
      deleteSelectedElement();
    }
  };

  // コンストラクタ、デストラクタ

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}

