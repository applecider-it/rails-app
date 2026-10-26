<script setup lang="ts">
/** モーダルウィンドウ動作確認 */
import Modal from '@/services/ui/vue/popup/Modal.vue';
import { useModal } from '../../vue-hook/useModal';

// Composable の呼び出し
const modal = useModal<string>();

/** モーダルウィンドウを開いて結果を待機する */
const handleOpenModal = async () => {
  // openModal を呼ぶと Promise を返し、閉じるまでここで処理が一時停止します
  const result = await modal.open('');

  if (result !== null) {
    console.log('モーダルで確定された値:', result);
  } else {
    console.log('モーダルがキャンセルされました');
  }
};
</script>

<template>
  <div>
    モーダルウィンドウ動作確認

    <div class="mt-5 space-y-2">
      <div class="space-x-2">
        <button class="app-btn-primary" @click="handleOpenModal">
          モーダルウィンドウ
        </button>
      </div>
      <div>modalValue: {{ modal.value.value }}</div>
    </div>
  </div>

  <Modal :isOpen="modal.isOpen.value" :onClose="modal.onCancel">
    <h2 class="text-xl font-bold mb-2">モーダルタイトル</h2>

    <div class="my-4">
      <textarea
        rows="3"
        cols="40"
        class="w-full border rounded-sm p-2"
        placeholder="What's happening?"
        v-model="modal.value.value"
      />
    </div>

    <button @click="modal.onCommit" class="app-btn-primary mr-2" type="button">
      決定
    </button>

    <button @click="modal.onCancel" class="app-btn-secondary" type="button">
      キャンセル
    </button>
  </Modal>
</template>
