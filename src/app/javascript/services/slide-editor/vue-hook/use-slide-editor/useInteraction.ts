import { reactive, Ref, ComputedRef } from 'vue';

import { SlideElement, InteractionType } from '../../types';

/**
 * インタラクション管理用Hook
 */
export function useInteraction(
  selectedId: Ref<string, string>,
  selectedElement: ComputedRef<SlideElement>,
) {
  /** 指定したIDの要素を選択状態にする */
  const selectElement = (id: string) => {
    selectedId.value = id;
  };

  /** ドラッグおよびリサイズのインタラクション状態を管理するオブジェクト */
  const interactionState = reactive({
    isDragging: false,
    isResizing: false,
    startX: 0,
    startY: 0,
    initialElemX: 0,
    initialElemY: 0,
    initialWidth: 0,
    initialHeight: 0,
  });

  // ドラッグ、リサイズ管理

  /** インタラクションを開始する */
  const startInteraction = (
    e: PointerEvent,
    type: InteractionType,
    el: SlideElement,
  ) => {
    e.stopPropagation();

    interactionState.startX = e.clientX;
    interactionState.startY = e.clientY;

    if (type === 'drag') {
      // ドラッグの時

      selectElement(el.id);

      interactionState.isDragging = true;
      interactionState.initialElemX = el.x;
      interactionState.initialElemY = el.y;
    } else {
      // リサイズの時

      interactionState.isResizing = true;
      interactionState.initialWidth = el.width;
      interactionState.initialHeight = el.height;
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', stopInteraction);
  };

  /** ポインター移動時に要素の位置やサイズを更新する */
  const onPointerMove = (e: PointerEvent) => {
    if (!selectedElement.value) return;

    const deltaX = e.clientX - interactionState.startX;
    const deltaY = e.clientY - interactionState.startY;

    if (interactionState.isDragging) {
      // ドラッグの時

      selectedElement.value.x = interactionState.initialElemX + deltaX;
      selectedElement.value.y = interactionState.initialElemY + deltaY;
    } else if (interactionState.isResizing) {
      // リサイズの時

      selectedElement.value.width = Math.max(
        40,
        interactionState.initialWidth + deltaX,
      );
      selectedElement.value.height = Math.max(
        20,
        interactionState.initialHeight + deltaY,
      );
    }
  };

  /** ドラッグおよびリサイズのインタラクションを終了する */
  const stopInteraction = () => {
    interactionState.isDragging = false;
    interactionState.isResizing = false;

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', stopInteraction);
  };

  return { startInteraction };
}
