import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue';

import { ElementType, SlideElement, InteractionType } from '../types';

import { initailData } from '../data';

export function useSlideEditor() {
  // 変数定義

  /** スライド上の全要素を管理するリアクティブな配列（後ろにあるほど手前に描画されます） */
  const elements = ref<SlideElement[]>(initailData);

  /** 現在選択されている要素のID（未選択の場合は null） */
  const selectedId = ref<string | null>(null);

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

  /** 変更監視用タイマー */
  let watchTimer = null;

  // selectedId管理

  /** 指定したIDの要素を選択状態にする */
  const selectElement = (id: string) => {
    selectedId.value = id;
  };

  /** キャンバスをクリックした際に選択を解除する */
  const deselect = () => {
    selectedId.value = null;
  };

  // 要素管理

  /** 新しい要素（テキストまたは図形）をスライドに追加する */
  const addElement = (type: ElementType) => {
    const newEl: SlideElement = {
      id: `el-${Date.now()}`,
      type,
      x: 100,
      y: 100,
      width: type === 'text' ? 180 : 120,
      height: type === 'text' ? 50 : 120,
      content: type === 'text' ? '新規テキスト' : '四角形',
      color: type === 'text' ? '#000000' : '#10b981',
      fontSize: 18,
    };

    elements.value.push(newEl);
    selectedId.value = newEl.id;
  };

  /** 現在選択されている要素のオブジェクトを返す算出プロパティ */
  const selectedElement = computed(() => {
    if (!selectedId.value) return null;

    return elements.value.find((el) => el.id === selectedId.value) || null;
  });

  /** 現在選択されている要素を削除する */
  const deleteSelectedElement = () => {
    if (!selectedId.value) return;

    if (!confirm('選択中の要素を削除しますか？')) return;

    elements.value = elements.value.filter((el) => el.id !== selectedId.value);

    selectedId.value = null;
  };

  /** 選択中の要素を指定した方向へ移動する */
  const moveElement = (position: 'front' | 'back') => {
    if (!selectedId.value) return;

    // 対象のインデックス取得
    const index = elements.value.findIndex((el) => el.id === selectedId.value);

    // 移動が可能な状態か確認
    if (index === -1) return;
    if (position === 'front' && index === elements.value.length - 1) return;
    if (position === 'back' && index === 0) return;

    // 対象を切り出す
    const [removed] = elements.value.splice(index, 1);

    // 切り出した要素を前後に追加
    position === 'front'
      ? elements.value.push(removed)
      : elements.value.unshift(removed);
  };

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

  // イベント管理

  /** キーボードイベントを処理し、Deleteキー押下時に要素を削除する */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      return;
    }

    if (e.key === 'Delete' && selectedId.value) {
      deleteSelectedElement();
    }
  };

  // 要素全体の変更を監視し、デバッグ用ログを出力するウォッチャー
  watch(
    elements,
    (newVal) => {
      // 変更が入るたびにタイマーをリセットする
      if (watchTimer) clearTimeout(watchTimer);

      watchTimer = setTimeout(() => {
        const json = JSON.parse(JSON.stringify(newVal));
        console.log('【State Updated (Elements)】', json);
      }, 1000);
    },
    { deep: true },
  );

  // 選択IDの変更を監視し、デバッグ用ログを出力するウォッチャー
  watch(selectedId, (newId) => {
    console.log('【Selection Changed】 選択ID:', newId);
  });

  // コンストラクタ、デストラクタ

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  return {
    addElement,
    deselect,
    elements,
    selectedId,
    startInteraction,
    selectedElement,
    moveElement,
    deleteSelectedElement,
  };
}
