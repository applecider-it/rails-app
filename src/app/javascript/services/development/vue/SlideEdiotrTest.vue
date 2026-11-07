<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue';

/** スライド上の要素の種類 */
type ElementType = 'text' | 'shape';

/** スライド内の各要素（テキストや図形）のデータ構造 */
interface SlideElement {
  /** 要素の一意識別子 */
  id: string;
  /** 要素の種類（テキストまたは図形） */
  type: ElementType;
  /** X座標 (px) */
  x: number;
  /** Y座標 (px) */
  y: number;
  /** 幅 (px) */
  width: number;
  /** 高さ (px) */
  height: number;
  /** 表示テキストまたはラベル */
  content: string;
  /** カラーコードまたは背景色 */
  color: string;
  /** フォントサイズ (px) */
  fontSize: number;
}

/** スライド上の全要素を管理するリアクティブな配列（後ろにあるほど手前に描画されます） */
const elements = ref<SlideElement[]>([
  {
    id: 'el-1',
    type: 'text',
    x: 50,
    y: 50,
    width: 240,
    height: 60,
    content: 'タイトルテキスト',
    color: '#1e293b',
    fontSize: 24,
  },
  {
    id: 'el-2',
    type: 'shape',
    x: 120,
    y: 130,
    width: 150,
    height: 150,
    content: '図形',
    color: '#3b82f6',
    fontSize: 16,
  },
]);

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

  elements.value = elements.value.filter((el) => el.id !== selectedId.value);
  selectedId.value = null;
};

/** 選択中の要素を指定した方向へ移動する */
const moveElement = (position: 'front' | 'back') => {
  if (!selectedId.value) return;
  const index = elements.value.findIndex((el) => el.id === selectedId.value);

  if (index === -1) return;
  if (position === 'front' && index === elements.value.length - 1) return;
  if (position === 'back' && index === 0) return;

  const [removed] = elements.value.splice(index, 1);
  position === 'front'
    ? elements.value.push(removed)
    : elements.value.unshift(removed);
};

// ドラッグ、リサイズ管理

/** 要素のドラッグ移動を開始する */
const startDrag = (e: PointerEvent, el: SlideElement) => {
  e.stopPropagation();
  selectElement(el.id);

  interactionState.isDragging = true;
  interactionState.startX = e.clientX;
  interactionState.startY = e.clientY;
  interactionState.initialElemX = el.x;
  interactionState.initialElemY = el.y;

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', stopInteraction);
};

/** 要素のリサイズを開始する */
const startResize = (e: PointerEvent, el: SlideElement) => {
  e.stopPropagation();

  interactionState.isResizing = true;
  interactionState.startX = e.clientX;
  interactionState.startY = e.clientY;
  interactionState.initialWidth = el.width;
  interactionState.initialHeight = el.height;

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', stopInteraction);
};

/** ポインター移動時に要素の位置やサイズを更新する */
const onPointerMove = (e: PointerEvent) => {
  if (!selectedElement.value) return;

  const deltaX = e.clientX - interactionState.startX;
  const deltaY = e.clientY - interactionState.startY;

  if (interactionState.isDragging) {
    selectedElement.value.x = interactionState.initialElemX + deltaX;
    selectedElement.value.y = interactionState.initialElemY + deltaY;
  } else if (interactionState.isResizing) {
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
    const json = JSON.parse(JSON.stringify(newVal));
    console.log('【State Updated (Elements)】', json);
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

// 表示用定数

/** ツールバーのボタンのCSSクラス */
const classToolbarBtn =
  'px-3 py-1.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-300 transition-colors flex items-center gap-1';
/** プロパティパネルのボタンのCSSクラス */
const classPropartyBtn =
  'py-1.5 px-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-300 transition-colors';
/** プロパティパネルの入力ボックスのCSSクラス */
const classPropartyInput =
  'px-2.5 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-normal text-slate-800';
</script>

<template>
  <div
    class="flex flex-col h-screen select-none font-sans bg-slate-100 text-slate-800"
  >
    <!-- ツールバー -->
    <header
      class="h-14 bg-white border-b border-slate-200 px-4 flex items-center gap-3 shadow-sm z-10"
    >
      <button @click="addElement('text')" :class="classToolbarBtn">
        <span>＋</span> テキスト追加
      </button>
      <button @click="addElement('shape')" :class="classToolbarBtn">
        <span>＋</span> 図形追加
      </button>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- 編集キャンバスエリア -->
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
            @pointerdown="startDrag($event, el)"
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
              @pointerdown="startResize($event, el)"
            ></div>
          </div>
        </div>
      </main>

      <!-- プロパティパネル（右サイドバー） -->
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
          <label
            class="flex flex-col gap-1.5 text-xs font-semibold text-slate-600"
          >
            表示テキスト
            <input
              v-model="selectedElement.content"
              type="text"
              :class="classPropartyInput"
            />
          </label>

          <label
            class="flex flex-col gap-1.5 text-xs font-semibold text-slate-600"
          >
            フォントサイズ (px)
            <div class="flex items-center gap-2">
              <input
                v-model.number="selectedElement.fontSize"
                type="number"
                min="8"
                max="120"
                :class="`w-full ${classPropartyInput}`"
              />
              <span class="text-xs text-slate-500">px</span>
            </div>
          </label>

          <label
            class="flex flex-col gap-1.5 text-xs font-semibold text-slate-600"
          >
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
              <button @click="moveElement('front')" :class="classPropartyBtn">
                最前面へ
              </button>
              <button @click="moveElement('back')" :class="classPropartyBtn">
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
    </div>
  </div>
</template>
